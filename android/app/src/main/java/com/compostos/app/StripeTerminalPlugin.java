package com.compostos.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.stripe.stripeterminal.Terminal;
import com.stripe.stripeterminal.external.callable.Callback;
import com.stripe.stripeterminal.external.callable.Cancelable;
import com.stripe.stripeterminal.external.callable.ConnectionTokenCallback;
import com.stripe.stripeterminal.external.callable.ConnectionTokenProvider;
import com.stripe.stripeterminal.external.callable.DiscoveryListener;
import com.stripe.stripeterminal.external.callable.ReaderCallback;
import com.stripe.stripeterminal.external.callable.TerminalListener;
import com.stripe.stripeterminal.external.models.ConnectionConfiguration;
import com.stripe.stripeterminal.external.models.ConnectionStatus;
import com.stripe.stripeterminal.external.models.ConnectionTokenException;
import com.stripe.stripeterminal.external.models.DiscoveryConfiguration;
import com.stripe.stripeterminal.external.models.PaymentStatus;
import com.stripe.stripeterminal.external.models.Reader;
import com.stripe.stripeterminal.external.models.TerminalException;
import com.stripe.stripeterminal.log.LogLevel;

import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import android.Manifest;
import com.getcapacitor.PermissionState;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

import org.json.JSONObject;

@CapacitorPlugin(
    name = "StripeTerminal",
    permissions = {
        @Permission(
            alias = "location",
            strings = { 
                Manifest.permission.ACCESS_FINE_LOCATION, 
                Manifest.permission.ACCESS_COARSE_LOCATION 
            }
        ),
        @Permission(
            alias = "bluetooth",
            strings = { 
                Manifest.permission.BLUETOOTH_SCAN, 
                Manifest.permission.BLUETOOTH_CONNECT,
                Manifest.permission.BLUETOOTH_ADVERTISE
            }
        )
    }
)
public class StripeTerminalPlugin extends Plugin {

    private Cancelable discoveryCancelable;
    private List<Reader> discoveredReaders = new ArrayList<>();
    
    // Backend URL - update this with your ngrok URL
    // Default to localhost for emulator, but should be set via setBackendUrl()
    private String backendUrl = "http://10.0.2.2:4242"; // 10.0.2.2 is localhost from Android emulator

    /**
     * Set the backend URL (e.g., ngrok URL for real device testing)
     */
    @PluginMethod
    public void setBackendUrl(PluginCall call) {
        String url = call.getString("url");
        if (url != null && !url.isEmpty()) {
            this.backendUrl = url;
            android.util.Log.d("StripeTerminal", "🔗 Backend URL set to: " + url);
            call.resolve();
        } else {
            call.reject("URL is required");
        }
    }

    /**
     * Fetch connection token from backend server
     */
    private String fetchConnectionTokenFromBackend() throws Exception {
        android.util.Log.d("StripeTerminal", "🔑 Fetching connection token from: " + backendUrl + "/connection_token");
        
        URL url = new URL(backendUrl + "/connection_token");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);
        conn.setConnectTimeout(10000);
        conn.setReadTimeout(10000);
        
        // Send empty body
        try (OutputStream os = conn.getOutputStream()) {
            os.write("{}".getBytes());
        }
        
        int responseCode = conn.getResponseCode();
        if (responseCode != 200) {
            throw new Exception("Backend returned " + responseCode);
        }
        
        // Read response
        StringBuilder response = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                response.append(line);
            }
        }
        
        // Parse JSON to get secret
        JSONObject json = new JSONObject(response.toString());
        String secret = json.getString("secret");
        
        android.util.Log.d("StripeTerminal", "✅ Got connection token from backend");
        return secret;
    }

    @PluginMethod
    public void initialize(PluginCall call) {
        android.util.Log.d("StripeTerminal", "🚀 Initialize called");
        
        try {
            if (!Terminal.isInitialized()) {
                android.util.Log.d("StripeTerminal", "📱 Terminal not initialized yet, initializing...");
                
                // Connection token provider - fetches REAL tokens from backend
                ConnectionTokenProvider provider = new ConnectionTokenProvider() {
                    @Override
                    public void fetchConnectionToken(ConnectionTokenCallback callback) {
                        android.util.Log.d("StripeTerminal", "🔑 Token requested - fetching from backend...");
                        
                        // Run network request on background thread
                        new Thread(() -> {
                            try {
                                String token = fetchConnectionTokenFromBackend();
                                callback.onSuccess(token);
                            } catch (Exception e) {
                                android.util.Log.e("StripeTerminal", "❌ Failed to fetch token: " + e.getMessage(), e);
                                callback.onFailure(new ConnectionTokenException("Failed to fetch connection token: " + e.getMessage(), e));
                            }
                        }).start();
                    }
                };

                // Create a TerminalListener (required in SDK v5)
                TerminalListener eventListener = new TerminalListener() {
                    // TerminalListener interface methods
                };

                // SDK v5: Terminal.init() with required event listener
                Terminal.init(
                    getContext().getApplicationContext(), 
                    LogLevel.VERBOSE, 
                    provider,
                    eventListener,
                    null
                );
                android.util.Log.d("StripeTerminal", "✅ Terminal initialized successfully");
            } else {
                android.util.Log.d("StripeTerminal", "✅ Terminal already initialized");
            }
            call.resolve();
        } catch (TerminalException e) {
            android.util.Log.e("StripeTerminal", "❌ Failed to initialize Terminal: " + e.getMessage(), e);
            call.reject("Failed to initialize Terminal", e);
        }
    }

    @PluginMethod
    public void discoverReaders(PluginCall call) {
        android.util.Log.d("StripeTerminal", "🔍 discoverReaders called");
        
        if (!Terminal.isInitialized()) {
            android.util.Log.e("StripeTerminal", "❌ Terminal not initialized");
            call.reject("Terminal not initialized");
            return;
        }

        boolean hasLocation = getPermissionState("location") == PermissionState.GRANTED;
        boolean hasBluetooth = getPermissionState("bluetooth") == PermissionState.GRANTED;
        
        android.util.Log.d("StripeTerminal", "📍 Location permission: " + hasLocation);
        android.util.Log.d("StripeTerminal", "📶 Bluetooth permission: " + hasBluetooth);

        if (!hasLocation || !hasBluetooth) {
            android.util.Log.d("StripeTerminal", "⚠️ Requesting permissions...");
            requestPermissionForAliases(new String[]{"location", "bluetooth"}, call, "permissionCallback");
        } else {
            startDiscovery(call);
        }
    }

    @PermissionCallback
    private void permissionCallback(PluginCall call) {
        boolean hasLocation = getPermissionState("location") == PermissionState.GRANTED;
        boolean hasBluetooth = getPermissionState("bluetooth") == PermissionState.GRANTED;
        
        android.util.Log.d("StripeTerminal", "📍 Location after request: " + hasLocation);
        android.util.Log.d("StripeTerminal", "📶 Bluetooth after request: " + hasBluetooth);

        if (hasLocation && hasBluetooth) {
            startDiscovery(call);
        } else {
            android.util.Log.e("StripeTerminal", "❌ Permissions denied");
            call.reject("Location and Bluetooth permissions are required for discovery. Please enable them in App Settings.");
        }
    }

    private void startDiscovery(PluginCall call) {
        android.util.Log.d("StripeTerminal", "🚀 Starting discovery process...");
        
        // Tap to Pay -> TapToPayDiscoveryConfiguration
        DiscoveryConfiguration config = new DiscoveryConfiguration.TapToPayDiscoveryConfiguration(
            true  // isSimulated = true for testing with phone's internal NFC
        );
        
        android.util.Log.d("StripeTerminal", "⚙️ Config created: TapToPayDiscoveryConfiguration (simulated=true)");

        DiscoveryListener listener = new DiscoveryListener() {
            @Override
            public void onUpdateDiscoveredReaders(List<Reader> readers) {
                android.util.Log.d("StripeTerminal", "📡 onUpdateDiscoveredReaders called! Found " + readers.size() + " reader(s)");
                
                discoveredReaders = readers;
                JSObject ret = new JSObject();
                com.getcapacitor.JSArray readersJson = new com.getcapacitor.JSArray();
                
                for (Reader reader : readers) {
                    android.util.Log.d("StripeTerminal", "  📱 Reader: " + reader.getSerialNumber() + " - Type: " + reader.getDeviceType());
                    
                    JSObject readerJson = new JSObject();
                    readerJson.put("serialNumber", reader.getSerialNumber());
                    if (reader.getDeviceType() != null) {
                        readerJson.put("deviceType", reader.getDeviceType().toString());
                    }
                    if (reader.getLocation() != null) {
                         readerJson.put("locationId", reader.getLocation().getId());
                    }
                    readersJson.put(readerJson);
                }
                
                ret.put("readers", readersJson);
                notifyListeners("readersDiscovered", ret);
            }
        };

        Callback statusCallback = new Callback() {
            @Override
            public void onSuccess() {
                android.util.Log.d("StripeTerminal", "✅ Discovery completed successfully");
                call.resolve();
            }

            @Override
            public void onFailure(TerminalException e) {
                android.util.Log.e("StripeTerminal", "❌ Discovery failed: " + e.getMessage(), e);
                call.reject("Discovery failed", e);
            }
        };

        android.util.Log.d("StripeTerminal", "📞 Calling Terminal.discoverReaders()...");
        discoveryCancelable = Terminal.getInstance().discoverReaders(config, listener, statusCallback);
        android.util.Log.d("StripeTerminal", "📋 Discovery request sent, waiting for callbacks...");
    }
    
    @PluginMethod
    public void connectReader(PluginCall call) {
        android.util.Log.d("StripeTerminal", "🔌 connectReader called");
        
        String serialNumber = call.getString("serialNumber");
        if (serialNumber == null) {
            call.reject("Serial number is required");
            return;
        }
        
        android.util.Log.d("StripeTerminal", "🔍 Looking for reader: " + serialNumber);
        
        // Find the reader from discovered list
        Reader readerToConnect = null;
        for (Reader reader : discoveredReaders) {
            if (reader.getSerialNumber().equals(serialNumber)) {
                readerToConnect = reader;
                break;
            }
        }
        
        if (readerToConnect == null) {
            android.util.Log.e("StripeTerminal", "❌ Reader not found: " + serialNumber);
            call.reject("Reader not found");
            return;
        }
        
        final Reader finalReader = readerToConnect;
        android.util.Log.d("StripeTerminal", "📱 Connecting to reader: " + finalReader.getSerialNumber());
        
        // SDK v5 requires ConnectionConfiguration for Tap to Pay
        // Using 3-parameter constructor: locationId, failIfInUse, listener
        // For simulated mode, use a test location ID (cannot be null)
        ConnectionConfiguration connectionConfig = new ConnectionConfiguration.TapToPayConnectionConfiguration(
            "tml_test_simulated_location",  // locationId - test value for simulated mode
            false, // failIfInUse - allow connection even if in use
            null   // TapToPayReaderListener - null for simple case
        );
        
        Terminal.getInstance().connectReader(
            finalReader,
            connectionConfig,
            new ReaderCallback() {
                @Override
                public void onSuccess(Reader reader) {
                    android.util.Log.d("StripeTerminal", "✅ Reader connected successfully!");
                    JSObject ret = new JSObject();
                    ret.put("connected", true);
                    ret.put("serialNumber", reader.getSerialNumber());
                    call.resolve(ret);
                }
                
                @Override
                public void onFailure(TerminalException e) {
                    android.util.Log.e("StripeTerminal", "❌ Failed to connect: " + e.getMessage(), e);
                    call.reject("Failed to connect to reader", e);
                }
            }
        );
    }
    
    @PluginMethod
    public void collectPayment(PluginCall call) {
        android.util.Log.d("StripeTerminal", "💳 collectPayment called");
        
        Double amount = call.getDouble("amount");
        if (amount == null) {
            call.reject("Amount is required");
            return;
        }
        
        // Convert dollars to cents (Stripe uses cents)
        long amountInCents = Math.round(amount * 100);
        String currency = call.getString("currency", "usd");
        
        android.util.Log.d("StripeTerminal", "💰 Collecting payment: $" + amount + " (" + amountInCents + " cents)");
        
        // Check if terminal is connected
        Reader connectedReader = Terminal.getInstance().getConnectedReader();
        if (connectedReader == null) {
            android.util.Log.e("StripeTerminal", "❌ No reader connected");
            call.reject("No reader connected. Please connect a reader first.");
            return;
        }
        
        android.util.Log.d("StripeTerminal", "📱 Connected reader: " + connectedReader.getSerialNumber());
        android.util.Log.d("StripeTerminal", "🎯 Using SIMULATED mode - SDK will simulate card tap");
        
        // In simulated mode, we use the SDK's built-in simulation
        // The SDK creates a simulated PaymentIntent and handles the "card tap" internally
        
        // Create PaymentIntent parameters for simulation
        com.stripe.stripeterminal.external.models.PaymentIntentParameters params = 
            new com.stripe.stripeterminal.external.models.PaymentIntentParameters.Builder()
                .setAmount(amountInCents)
                .setCurrency(currency)
                .build();
        
        android.util.Log.d("StripeTerminal", "📝 Creating PaymentIntent...");
        
        // Step 1: Create PaymentIntent (in simulated mode, this creates a simulated intent)
        Terminal.getInstance().createPaymentIntent(
            params,
            new com.stripe.stripeterminal.external.callable.PaymentIntentCallback() {
                @Override
                public void onSuccess(com.stripe.stripeterminal.external.models.PaymentIntent paymentIntent) {
                    android.util.Log.d("StripeTerminal", "✅ PaymentIntent created: " + paymentIntent.getId());
                    
                    // Step 2: Collect payment method (this triggers the "tap card" flow)
                    android.util.Log.d("StripeTerminal", "💳 Waiting for card tap...");
                    notifyPaymentStatus("waiting_for_card", "Please tap your card");
                    
                    // SDK v5: Use simpler 2-parameter method signature
                    Terminal.getInstance().collectPaymentMethod(
                        paymentIntent,
                        new com.stripe.stripeterminal.external.callable.PaymentIntentCallback() {
                            @Override
                            public void onSuccess(com.stripe.stripeterminal.external.models.PaymentIntent collectedIntent) {
                                android.util.Log.d("StripeTerminal", "✅ Card tapped! Payment method collected");
                                notifyPaymentStatus("processing", "Processing payment...");
                                
                                // Step 3: Confirm the payment
                                android.util.Log.d("StripeTerminal", "🔄 Confirming payment...");
                                
                                Terminal.getInstance().confirmPaymentIntent(
                                    collectedIntent,
                                    new com.stripe.stripeterminal.external.callable.PaymentIntentCallback() {
                                        @Override
                                        public void onSuccess(com.stripe.stripeterminal.external.models.PaymentIntent confirmedIntent) {
                                            android.util.Log.d("StripeTerminal", "✅ Payment confirmed!");
                                            android.util.Log.d("StripeTerminal", "💰 Amount: $" + amount);
                                            
                                            JSObject ret = new JSObject();
                                            ret.put("success", true);
                                            ret.put("amount", amount);
                                            ret.put("paymentIntentId", confirmedIntent.getId());
                                            ret.put("simulated", true);
                                            call.resolve(ret);
                                        }
                                        
                                        @Override
                                        public void onFailure(TerminalException e) {
                                            android.util.Log.e("StripeTerminal", "❌ Confirm failed: " + e.getMessage(), e);
                                            call.reject("Payment confirmation failed: " + e.getMessage(), e);
                                        }
                                    }
                                );
                            }
                            
                            @Override
                            public void onFailure(TerminalException e) {
                                android.util.Log.e("StripeTerminal", "❌ Collect failed: " + e.getMessage(), e);
                                call.reject("Card collection failed: " + e.getMessage(), e);
                            }
                        }
                    );
                }
                
                @Override
                public void onFailure(TerminalException e) {
                    android.util.Log.e("StripeTerminal", "❌ Create PaymentIntent failed: " + e.getMessage(), e);
                    call.reject("Failed to create payment: " + e.getMessage(), e);
                }
            }
        );
    }
    
    private void notifyPaymentStatus(String status, String message) {
        JSObject ret = new JSObject();
        ret.put("status", status);
        ret.put("message", message);
        notifyListeners("paymentStatus", ret);
    }
}

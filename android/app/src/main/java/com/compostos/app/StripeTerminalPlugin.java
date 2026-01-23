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
import com.stripe.stripeterminal.external.callable.TerminalListener;
import com.stripe.stripeterminal.external.models.ConnectionStatus;
import com.stripe.stripeterminal.external.models.ConnectionTokenException;
import com.stripe.stripeterminal.external.models.DiscoveryConfiguration;
import com.stripe.stripeterminal.external.models.PaymentStatus;
import com.stripe.stripeterminal.external.models.Reader;
import com.stripe.stripeterminal.external.models.TerminalException;
import com.stripe.stripeterminal.log.LogLevel;

import java.util.ArrayList;
import java.util.List;

import android.Manifest;
import com.getcapacitor.PermissionState;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

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


    @PluginMethod
    public void initialize(PluginCall call) {
        android.util.Log.d("StripeTerminal", "🚀 Initialize called");
        
        try {
            if (!Terminal.isInitialized()) {
                android.util.Log.d("StripeTerminal", "📱 Terminal not initialized yet, initializing...");
                
                // Connection token provider for SIMULATED mode
                ConnectionTokenProvider provider = new ConnectionTokenProvider() {
                    @Override
                    public void fetchConnectionToken(ConnectionTokenCallback callback) {
                        android.util.Log.d("StripeTerminal", "🔑 Token requested - providing simulated token");
                        callback.onSuccess("pst_test_simulated_token_for_testing");
                    }
                };

                // Create a TerminalListener (required in SDK v5)
                // Using a minimal implementation - we'll log events if they occur
                TerminalListener eventListener = new TerminalListener() {
                    // TerminalListener interface methods will be implemented here
                    // The exact methods depend on the Stripe SDK version
                };

                // SDK v5: Terminal.init() with required event listener
                Terminal.init(
                    getContext().getApplicationContext(), 
                    LogLevel.VERBOSE, 
                    provider,
                    eventListener,  // TerminalListener - required in v5
                    null   // TerminalOfflineListener - optional
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
        // Logic to connect to a reader from discoveredReaders list using serial number
        call.resolve();
    }
}

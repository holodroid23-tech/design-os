package com.compostos.app;

import android.app.Application;
import com.stripe.stripeterminal.TerminalApplicationDelegate;
import com.stripe.stripeterminal.taptopay.TapToPay;

public class StripeTerminalApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        
        // CRITICAL: Check if we're in the Stripe Tap to Pay secure child process
        // The SDK spawns a separate process for NFC transactions, and we must NOT
        // call TerminalApplicationDelegate.onCreate() in that process or we get:
        // "AidlRpcException: Service never connected"
        if (!TapToPay.isInTapToPayProcess()) {
            TerminalApplicationDelegate.onCreate(this);
            android.util.Log.d("StripeTerminal", "✅ Main process - TerminalApplicationDelegate initialized");
        } else {
            android.util.Log.d("StripeTerminal", "🔒 Tap to Pay process - skipping main init");
        }
    }
}

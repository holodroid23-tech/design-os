package com.compostos.app;

import android.app.Application;
import com.stripe.stripeterminal.TerminalApplicationDelegate;
import com.stripe.stripeterminal.taptopay.TapToPay;

public class StripeTerminalApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        
        // Setup Crash Handler to display errors on screen
        final Thread.UncaughtExceptionHandler defaultHandler = Thread.getDefaultUncaughtExceptionHandler();
        Thread.setDefaultUncaughtExceptionHandler((thread, throwable) -> {
            try {
                android.util.Log.e("AppCrash", "Uncaught Exception", throwable);
                android.content.Intent intent = new android.content.Intent(getApplicationContext(), CrashActivity.class);
                intent.setFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK | android.content.Intent.FLAG_ACTIVITY_CLEAR_TASK);
                intent.putExtra("error", android.util.Log.getStackTraceString(throwable));
                startActivity(intent);
                android.os.Process.killProcess(android.os.Process.myPid());
                System.exit(10);
            } catch (Exception e) {
                if (defaultHandler != null) {
                    defaultHandler.uncaughtException(thread, throwable);
                }
            }
        });
        
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

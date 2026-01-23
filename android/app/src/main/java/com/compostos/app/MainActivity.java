package com.compostos.app;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(StripeTerminalPlugin.class);
        super.onCreate(savedInstanceState);
    }
}

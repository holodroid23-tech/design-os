package com.compostos.app;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.ScrollView;
import android.widget.TextView;
import android.graphics.Color;

public class CrashActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        ScrollView scrollView = new ScrollView(this);
        scrollView.setBackgroundColor(Color.RED);
        
        TextView textView = new TextView(this);
        String error = getIntent().getStringExtra("error");
        textView.setText("CRASH DETECTED:\n\n" + (error != null ? error : "Unknown Error"));
        textView.setTextColor(Color.WHITE);
        textView.setPadding(40, 60, 40, 40);
        textView.setTextSize(14);
        textView.setTypeface(android.graphics.Typeface.MONOSPACE);

        scrollView.addView(textView);
        setContentView(scrollView);
    }
}

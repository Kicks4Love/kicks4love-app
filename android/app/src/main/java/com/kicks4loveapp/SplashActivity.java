package com.kicks4loveapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

/**
 * Created by Daniel Zhou on 2017/7/6.
 */
public class SplashActivity extends AppCompatActivity{
    private final String TAG = SplashActivity.this.getClass().getSimpleName();
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent mainIntent = new Intent(this, MainActivity.class);
        Log.d(TAG, "onCreate: starting main activity" );
        startActivity(mainIntent);
        Log.d(TAG, "onCreate: finishing ...");
        finish();
    }
}

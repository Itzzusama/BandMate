package com.bandmate.app

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

class LocationModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    
    companion object {
        private var reactContext: ReactApplicationContext? = null
    }

    init {
        reactContext = context
    }

    override fun getName(): String {
        return "LocationModule"
    }

    @ReactMethod
    fun startLocationService() {
        LocationService.setShouldRestart(true)
        val intent = Intent(reactContext, LocationService::class.java)
        reactContext?.startService(intent)
    }

    @ReactMethod
    fun stopLocationService() {
        LocationService.setShouldRestart(false)
        val intent = Intent(reactContext, LocationService::class.java)
        reactContext?.stopService(intent)
    }

    @ReactMethod
    fun isServiceRunning(callback: Callback) {
        callback.invoke(LocationService.isRunning())
    }
}

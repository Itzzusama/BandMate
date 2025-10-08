// GetCurrentLocation.kt
package com.solagroup.bandmate

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class GetCurrentLocation(private val reactContext: ReactApplicationContext) : 
    ReactContextBaseJavaModule(reactContext), LocationListener {
    
    private var locationManager: LocationManager? = null
    private var isLocationUpdatesStarted = false
    private val handler = Handler(Looper.getMainLooper())
    private var timeoutRunnable: Runnable? = null
    private var currentPromise: Promise? = null
    private var gpsLocationListener: LocationListener? = null
    private var networkLocationListener: LocationListener? = null
    
    companion object {
        private const val TAG = "GetCurrentLocation"
        private const val TIMEOUT_DURATION = 15000L // 15 seconds
        private const val MIN_TIME_BETWEEN_UPDATES = 100L // 100ms
        private const val MIN_DISTANCE_CHANGE_FOR_UPDATES = 0f // 0 meters for immediate response
        private const val LAST_KNOWN_LOCATION_MAX_AGE = 5 * 60 * 1000L // 5 minutes
    }

    override fun getName(): String {
        return "GetCurrentLocation"
    }

    @ReactMethod
    fun getCurrentLocation(promise: Promise) {
        // Prevent multiple simultaneous requests
        if (isLocationUpdatesStarted) {
            promise.reject("LOCATION_REQUEST_IN_PROGRESS", "A location request is already in progress")
            return
        }

        if (!hasLocationPermission()) {
            promise.reject("PERMISSION_DENIED", "Location permission not granted")
            return
        }

        try {
            locationManager = reactContext.getSystemService(Context.LOCATION_SERVICE) as LocationManager
            
            // Check if location services are enabled
            if (!isLocationEnabled()) {
                promise.reject("LOCATION_DISABLED", "Location services are disabled")
                return
            }

            currentPromise = promise
            startLocationUpdates()
            
        } catch (e: Exception) {
            Log.e(TAG, "Error getting location: ${e.message}")
            promise.reject("LOCATION_ERROR", e.message)
        }
    }

    private fun startLocationUpdates() {
        try {
            isLocationUpdatesStarted = true
            
            // Set timeout
            timeoutRunnable = Runnable {
                handleTimeout()
            }
            handler.postDelayed(timeoutRunnable!!, TIMEOUT_DURATION)
            
            // First try to get last known location
            getLastKnownLocation()?.let { location ->
                val locationAge = System.currentTimeMillis() - location.time
                if (locationAge <= LAST_KNOWN_LOCATION_MAX_AGE) {
                    Log.d(TAG, "Using last known location (age: ${locationAge}ms)")
                    handleLocationResult(location)
                    return
                }
            }
            
            // Create location listeners
            gpsLocationListener = object : LocationListener {
                override fun onLocationChanged(location: Location) {
                    Log.d(TAG, "GPS location received: ${location.latitude}, ${location.longitude}")
                    handleLocationResult(location)
                }
                
                override fun onStatusChanged(provider: String?, status: Int, extras: Bundle?) {}
                override fun onProviderEnabled(provider: String) {}
                override fun onProviderDisabled(provider: String) {}
            }
            
            networkLocationListener = object : LocationListener {
                override fun onLocationChanged(location: Location) {
                    Log.d(TAG, "Network location received: ${location.latitude}, ${location.longitude}")
                    handleLocationResult(location)
                }
                
                override fun onStatusChanged(provider: String?, status: Int, extras: Bundle?) {}
                override fun onProviderEnabled(provider: String) {}
                override fun onProviderDisabled(provider: String) {}
            }
            
            // Request location updates from both providers
            if (locationManager?.isProviderEnabled(LocationManager.GPS_PROVIDER) == true) {
                locationManager?.requestLocationUpdates(
                    LocationManager.GPS_PROVIDER,
                    MIN_TIME_BETWEEN_UPDATES,
                    MIN_DISTANCE_CHANGE_FOR_UPDATES,
                    gpsLocationListener!!
                )
                Log.d(TAG, "GPS location updates requested")
            }
            
            if (locationManager?.isProviderEnabled(LocationManager.NETWORK_PROVIDER) == true) {
                locationManager?.requestLocationUpdates(
                    LocationManager.NETWORK_PROVIDER,
                    MIN_TIME_BETWEEN_UPDATES,
                    MIN_DISTANCE_CHANGE_FOR_UPDATES,
                    networkLocationListener!!
                )
                Log.d(TAG, "Network location updates requested")
            }
            
        } catch (e: SecurityException) {
            Log.e(TAG, "Security exception: ${e.message}")
            currentPromise?.reject("PERMISSION_DENIED", "Location permission denied")
            cleanup()
        }
    }

    private fun handleLocationResult(location: Location) {
        if (isLocationUpdatesStarted && currentPromise != null) {
            Log.d(TAG, "Location result: lat=${location.latitude}, lon=${location.longitude}, accuracy=${location.accuracy}")
            
            val locationData = WritableNativeMap().apply {
                putDouble("latitude", location.latitude)
                putDouble("longitude", location.longitude)
                putDouble("accuracy", location.accuracy.toDouble())
                putDouble("altitude", if (location.hasAltitude()) location.altitude else 0.0)
                putDouble("speed", if (location.hasSpeed()) location.speed.toDouble() else 0.0)
                putDouble("heading", if (location.hasBearing()) location.bearing.toDouble() else 0.0)
                putDouble("timestamp", location.time.toDouble())
                putString("provider", location.provider ?: "unknown")
            }
            
            currentPromise?.resolve(locationData)
            
            // Emit event for any listeners
            try {
                reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("locationUpdate", locationData)
            } catch (e: Exception) {
                Log.w(TAG, "Could not emit location event: ${e.message}")
            }
            
            cleanup()
        }
    }

    private fun handleTimeout() {
        if (isLocationUpdatesStarted && currentPromise != null) {
            Log.w(TAG, "Location request timed out")
            
            // Try one more time with last known location
            getLastKnownLocation()?.let { location ->
                Log.d(TAG, "Using stale last known location due to timeout")
                handleLocationResult(location)
                return
            }
            
            currentPromise?.reject("TIMEOUT", "Location request timed out")
            cleanup()
        }
    }

    private fun cleanup() {
        isLocationUpdatesStarted = false
        currentPromise = null
        
        timeoutRunnable?.let { 
            handler.removeCallbacks(it)
            timeoutRunnable = null
        }
        
        try {
            gpsLocationListener?.let { locationManager?.removeUpdates(it) }
            networkLocationListener?.let { locationManager?.removeUpdates(it) }
        } catch (e: SecurityException) {
            Log.e(TAG, "Error removing location updates: ${e.message}")
        }
        
        gpsLocationListener = null
        networkLocationListener = null
    }

    private fun getLastKnownLocation(): Location? {
        if (!hasLocationPermission()) return null
        
        var bestLocation: Location? = null
        
        try {
            val gpsLocation = locationManager?.getLastKnownLocation(LocationManager.GPS_PROVIDER)
            val networkLocation = locationManager?.getLastKnownLocation(LocationManager.NETWORK_PROVIDER)
            
            bestLocation = when {
                gpsLocation != null && networkLocation != null -> {
                    // Choose more recent location, or more accurate if times are close
                    val timeDiff = Math.abs(gpsLocation.time - networkLocation.time)
                    if (timeDiff < 60000) { // If within 1 minute, choose more accurate
                        if (gpsLocation.accuracy < networkLocation.accuracy) gpsLocation else networkLocation
                    } else {
                        if (gpsLocation.time > networkLocation.time) gpsLocation else networkLocation
                    }
                }
                gpsLocation != null -> gpsLocation
                networkLocation != null -> networkLocation
                else -> null
            }
            
            bestLocation?.let {
                Log.d(TAG, "Last known location: provider=${it.provider}, accuracy=${it.accuracy}, age=${System.currentTimeMillis() - it.time}ms")
            }
            
        } catch (e: SecurityException) {
            Log.e(TAG, "Security exception getting last known location: ${e.message}")
        }
        
        return bestLocation
    }

    private fun hasLocationPermission(): Boolean {
        val fineLocation = ActivityCompat.checkSelfPermission(
            reactContext,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
        
        val coarseLocation = ActivityCompat.checkSelfPermission(
            reactContext,
            Manifest.permission.ACCESS_COARSE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
        
        return fineLocation || coarseLocation
    }

    private fun isLocationEnabled(): Boolean {
        return locationManager?.isProviderEnabled(LocationManager.GPS_PROVIDER) == true ||
               locationManager?.isProviderEnabled(LocationManager.NETWORK_PROVIDER) == true
    }

    @ReactMethod
    fun stopLocationService() {
        Log.d(TAG, "Stopping location service")
        cleanup()
    }

    @ReactMethod
    fun isLocationPermissionGranted(promise: Promise) {
        promise.resolve(hasLocationPermission())
    }

    @ReactMethod
    fun isLocationServicesEnabled(promise: Promise) {
        locationManager = reactContext.getSystemService(Context.LOCATION_SERVICE) as LocationManager
        promise.resolve(isLocationEnabled())
    }

    override fun onLocationChanged(location: Location) {
        // This method is not used in our implementation
    }

    override fun onStatusChanged(provider: String?, status: Int, extras: Bundle?) {}
    override fun onProviderEnabled(provider: String) {}
    override fun onProviderDisabled(provider: String) {}

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        cleanup()
    }
}
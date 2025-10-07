package com.bandmate.app

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.os.Build
import android.os.Bundle
import android.os.IBinder
import android.os.Handler
import android.os.Looper
import androidx.core.app.NotificationCompat
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule
import android.content.pm.ServiceInfo
import android.util.Log
import com.bandmate.app.MainActivity
import com.bandmate.app.R

class LocationService : Service() {
    
    companion object {
        private const val CHANNEL_ID = "location_service_channel"
        private const val NOTIFICATION_ID = 1
        private const val LOCATION_INTERVAL = 5000L
        private const val LOCATION_DISTANCE = 10f
        
        private var isServiceRunning = false
        private var shouldRestart = true
        
        fun isRunning(): Boolean = isServiceRunning
        fun setShouldRestart(restart: Boolean) {
            shouldRestart = restart
        }
    }

    private var locationManager: LocationManager? = null
    private var locationListener: LocationListener? = null
    private var handler: Handler? = null
    private var notificationManager: NotificationManager? = null

    override fun onCreate() {
        super.onCreate()
        handler = Handler(Looper.getMainLooper())
        notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
        createNotificationChannel()
        startWithForegroundNotification()
        setupLocationUpdates()
        
        handler?.postDelayed(locationChecker, LOCATION_INTERVAL)
        isServiceRunning = true
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Location Service Channel",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                setShowBadge(false)
                lockscreenVisibility = Notification.VISIBILITY_PUBLIC
                enableVibration(false)
                setSound(null, null)
                description = "Location tracking service"
            }
            notificationManager?.createNotificationChannel(channel)
        }
    }

    private fun startWithForegroundNotification() {
        val notificationIntent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        
        val pendingIntent = PendingIntent.getActivity(
            this,
            0,
            notificationIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val builder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Location Service Active")
            .setContentText("Tracking your location...")
            .setSmallIcon(R.mipmap.ic_launcher)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setCategory(NotificationCompat.CATEGORY_SERVICE)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setOngoing(true)
            .setAutoCancel(false)
            .setContentIntent(pendingIntent)
            .setSound(null)
            .setVibrate(null)
            .setOnlyAlertOnce(true)

        val notification = builder.build()

        try {
            if (Build.VERSION.SDK_INT >= 34) {
                startForeground(NOTIFICATION_ID, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION)
            } else {
                startForeground(NOTIFICATION_ID, notification)
            }
        } catch (e: Exception) {
            Log.e("LocationService", "Error starting foreground service", e)
        }
    }

    private val locationChecker = object : Runnable {
        override fun run() {
            updateLocationRequest()
            handler?.postDelayed(this, LOCATION_INTERVAL)
        }
    }

    private fun updateLocationRequest() {
        locationManager?.let { manager ->
            locationListener?.let { listener ->
                try {
                    manager.removeUpdates(listener)
                    setupLocationUpdates()
                } catch (e: SecurityException) {
                    Log.e("LocationService", "Failed to update location request", e)
                }
            }
        }
    }

    private fun setupLocationUpdates() {
        try {
            locationManager = getSystemService(LOCATION_SERVICE) as LocationManager
            locationListener = object : LocationListener {
                override fun onLocationChanged(location: Location) {
                    Log.d("LocationService", "Location updated: ${location.latitude}, ${location.longitude}")
                    sendLocationToJS(location)
                    updateNotificationWithLocation(location)
                }

                override fun onStatusChanged(provider: String?, status: Int, extras: Bundle?) {}

                override fun onProviderEnabled(provider: String) {}

                override fun onProviderDisabled(provider: String) {}
            }

            locationManager?.let { manager ->
                locationListener?.let { listener ->
                    if (manager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
                        manager.requestLocationUpdates(
                            LocationManager.GPS_PROVIDER,
                            LOCATION_INTERVAL,
                            LOCATION_DISTANCE,
                            listener
                        )
                    }

                    if (manager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {
                        manager.requestLocationUpdates(
                            LocationManager.NETWORK_PROVIDER,
                            LOCATION_INTERVAL,
                            LOCATION_DISTANCE,
                            listener
                        )
                    }
                }
            }
        } catch (e: SecurityException) {
            Log.e("LocationService", "Error in setupLocationUpdates", e)
        }
    }

    private fun updateNotificationWithLocation(location: Location) {
        val builder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Location Service Active")
            .setContentText("Location: %.6f, %.6f".format(location.latitude, location.longitude))
            .setSmallIcon(R.mipmap.ic_launcher)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setCategory(NotificationCompat.CATEGORY_SERVICE)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setOngoing(true)
            .setAutoCancel(false)
            .setSound(null)
            .setVibrate(null)
            .setOnlyAlertOnce(true)

        notificationManager?.notify(NOTIFICATION_ID, builder.build())
    }

    private fun sendLocationToJS(location: Location) {
        try {
            val params: WritableMap = Arguments.createMap().apply {
                putDouble("latitude", location.latitude)
                putDouble("longitude", location.longitude)
            }
            
            val reactApplication = application as ReactApplication
            val reactInstanceManager = reactApplication.reactNativeHost.reactInstanceManager
            val reactContext = reactInstanceManager.currentReactContext

            reactContext?.let { context ->
                context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("locationUpdate", params)
            }
        } catch (e: Exception) {
            Log.e("LocationService", "Error sending location to JS", e)
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d("LocationService", "Service started")
        if (!isServiceRunning) {
            startWithForegroundNotification()
        }
        return START_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d("LocationService", "Service destroyed")
        locationManager?.let { manager ->
            locationListener?.let { listener ->
                manager.removeUpdates(listener)
            }
        }
        handler?.removeCallbacks(locationChecker)
        isServiceRunning = false

        // Only restart if shouldRestart flag is true
        if (shouldRestart) {
            val restartIntent = Intent(this, LocationService::class.java)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                startForegroundService(restartIntent)
            } else {
                startService(restartIntent)
            }
        }
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}

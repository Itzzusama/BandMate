import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import Icons from "../../../../components/Icons";
import CustomText from "../../../../components/CustomText";
import { useIsFocused } from "@react-navigation/native";
import {
  getLocationWithPermission,
  resetLocationRequestState,
} from "../../../../utils/LocationUtils";

const WeatherCard = () => {
  const isFocus = useIsFocused();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Simple delay helper
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Get current location using GooglePlaces location utility
  const getCurrentLocation = async () => {
    try {
      const locationData = await getLocationWithPermission();
      if (locationData) {
        setLocation({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });
        return {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        };
      } else {
        throw new Error("No location data received");
      }
    } catch (error) {
      console.log("Location error:", error);

      // Handle specific error codes like in GooglePlaces
      if (error.code === "LOCATION_REQUEST_IN_PROGRESS") {
        // iOS sometimes reports in-progress; wait, reset, and retry once
        await delay(1200);
        resetLocationRequestState();
        try {
          const retry = await getLocationWithPermission();
          if (retry) {
            setLocation({ latitude: retry.latitude, longitude: retry.longitude });
            return { latitude: retry.latitude, longitude: retry.longitude };
          }
        } catch (e) {
          // fall through to default location below
        }
      }

      // If native module is missing (iOS build/setup), prompt user to open Settings
      // if (error.code === "NATIVE_MODULE_UNAVAILABLE") {
      //   Alert.alert(
      //     "Enable Location",
      //     "Location service is not available. Please grant permission in Settings and ensure location services are enabled.",
      //     [
      //       { text: "Cancel", style: "cancel" },
      //       {
      //         text: "Open Settings",
      //         onPress: () => {
      //           import("react-native").then(({ Linking }) => {
      //             Linking.openSettings();
      //           });
      //         },
      //       },
      //     ]
      //   );
      // }

      // Fallback to default location if GPS fails
      const defaultLocation = { latitude: 34.0522, longitude: -118.2437 };
      setLocation(defaultLocation);
      return defaultLocation;
    }
  };

  // Get city name from coordinates using Google Places API
  const getCityName = async (lat, lng) => {
    try {
      const GOOGLE_PLACES_API_KEY = "AIzaSyB3Tj9fWzywtOncQ7vNjcErxRM5E--WlDA";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_PLACES_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const cityComponent = result.address_components.find((component) =>
          component.types.includes("locality")
        );
        return cityComponent
          ? cityComponent.long_name
          : result.formatted_address.split(",")[0];
      }
      return "Current Location";
    } catch (error) {
      console.log("Geocoding error:", error);
      return "Current Location";
    }
  };

  const fetchWeatherData = async (lat, lng) => {
    try {
      const response = await fetch(`https://wttr.in/${lat},${lng}?format=j1`);
      const data = await response.json();
      // aj se 7 din ka weather
      const weeklyWeather = data.weather.map((day) => ({
        date: day.date,
        maxTemp: day.maxtempC,
        minTemp: day.mintempC,
        sunrise: day.astronomy[0]?.sunrise,
        sunset: day.astronomy[0]?.sunset,
        hourly: day.hourly,
      }));

      // console.log("weather----->",weeklyWeather);

      // Derive current weather from the closest hourly slot for today
      const today = weeklyWeather[0];
      const now = new Date();
      const toSlotValue = (date) => {
        const hours = date.getHours();
        // slots are every 3h: 0,300,600,... map by rounding to nearest previous multiple of 3
        const slotHour = Math.floor(hours / 3) * 3;
        return slotHour * 100;
      };
      const currentSlotValue = toSlotValue(now);
      const nearestHourly = today.hourly.reduce((prev, curr) => {
        const prevDiff = Math.abs(
          parseInt(prev.time || "0", 10) - currentSlotValue
        );
        const currDiff = Math.abs(
          parseInt(curr.time || "0", 10) - currentSlotValue
        );
        return currDiff < prevDiff ? curr : prev;
      }, today.hourly[0]);

      // Resolve city/location name
      const cityName = await getCityName(lat, lng);

      setCurrentWeather({
        temperature: nearestHourly?.tempC ?? today?.maxTemp ?? "--",
        condition: nearestHourly?.weatherDesc?.[0]?.value?.trim?.() || "",
        icon: mapWeatherIcon(nearestHourly?.weatherDesc?.[0]?.value),
        location: cityName,
      });

      // Build 7-day forecast (day label, icon from midday, min/max temps)
      const weekdayFormatter = new Intl.DateTimeFormat(undefined, {
        weekday: "short",
      });

      const preferredSlots = ["1200", "1500", "900", "1800", "600"];

      const weeklyForecastSimple = weeklyWeather.map((dayObj) => {
        const dateObj = new Date(dayObj.date);
        const dayLabel = weekdayFormatter.format(dateObj);
        let hourlyForIcon = dayObj.hourly[0];
        for (const slot of preferredSlots) {
          const found = dayObj.hourly.find((h) => String(h.time) === slot);
          if (found) {
            hourlyForIcon = found;
            break;
          }
        }
        return {
          day: dayLabel,
          icon: mapWeatherIcon(hourlyForIcon?.weatherDesc?.[0]?.value),
          temp: `${dayObj?.minTemp ?? "--"} ${dayObj?.maxTemp ?? "--"}`,
        };
      });

      setForecast(weeklyForecastSimple);
      setLastUpdated(new Date());
      setLoading(false);
      return weeklyWeather;
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("Failed to fetch weather data.");
      setLoading(false);
    }
  };

  const refreshWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      const coords = await getCurrentLocation();
      await fetchWeatherData(coords.latitude, coords.longitude);
    } catch (error) {
      console.log("Refresh error:", error);
      setError("Failed to refresh weather data. Please try again.");
      setLoading(false);
    }
  };

  // Initialize weather data
  useEffect(() => {
    const initializeWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const coords = await getCurrentLocation();
        await fetchWeatherData(coords.latitude, coords.longitude);
      } catch (error) {
        console.log("Initialization error:", error);

        // Handle specific error codes like in GooglePlaces
        let errorMessage =
          "Failed to initialize weather. Please check your location permissions.";

        if (error.code === "LOCATION_REQUEST_IN_PROGRESS") {
          errorMessage =
            "Location request is already in progress. Please wait and try again.";
        } else if (error.code === "PERMISSION_DENIED" || error.code === 1) {
          errorMessage =
            "Location permission is required. Please enable location access in your device settings.";
          // Show alert for permission denied
          Alert.alert("Permission Required", errorMessage, [
            { text: "OK", style: "default" },
            {
              text: "Open Settings",
              onPress: () => {
                import("react-native").then(({ Linking }) => {
                  Linking.openSettings();
                });
              },
            },
          ]);
        } else if (error.code === "TIMEOUT" || error.code === 3) {
          errorMessage =
            "Location request timed out. Please check your GPS and try again.";
        } else if (error.code === "LOCATION_DISABLED" || error.code === 2) {
          errorMessage =
            "Location services are disabled. Please enable them in your device settings.";
        }

        setError(errorMessage);
        setLoading(false);
      }
    };

    if (isFocus) {
      initializeWeather();
    }
  }, [isFocus]);

  // Map weather conditions to icons
  const mapWeatherIcon = (weatherCondition) => {
    const condition = weatherCondition?.toLowerCase() || "";

    if (condition.includes("clear") || condition.includes("sunny"))
      return "sun";
    if (condition.includes("cloud")) return "cloud";
    if (condition.includes("rain") || condition.includes("drizzle"))
      return "cloud-rain";
    if (condition.includes("thunder") || condition.includes("storm"))
      return "cloud-lightning";
    if (condition.includes("snow")) return "cloud-snow";
    if (condition.includes("fog") || condition.includes("mist")) return "cloud";

    return "sun"; // default
  };

  // Get weather icon component
  const getWeatherIcon = (iconName, size = 24, color = "#FFFFFF") => {
    const iconMap = {
      sun: "sun",
      cloud: "cloud",
      "cloud-rain": "cloud-rain",
      "cloud-lightning": "zap",
      "cloud-snow": "cloud-snow",
    };

    return (
      <Icons
        name={iconMap[iconName] || "sun"}
        family="Feather"
        size={size}
        color={color}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.white} />
          <CustomText textStyle={styles.loadingText}>
            Loading weather...
          </CustomText>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <CustomText textStyle={styles.errorText}>{error}</CustomText>
          <TouchableOpacity style={styles.retryButton} onPress={refreshWeather}>
            <CustomText textStyle={styles.retryButtonText}>Retry</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Current Weather Section */}
      <View style={styles.currentWeatherContainer}>
        <CustomText
          fontSize={24}
          lineHeight={24 * 1.4}
          fontFamily={fonts.semiBold}
          label={`${currentWeather?.temperature}°C`}
          color={"#ffffff"}
          marginRight={8}
        />

        <View style={styles.weatherInfoContainer}>
          {getWeatherIcon(currentWeather?.icon, 19, "#FFFFFF")}
          <CustomText
            textStyle={styles.weatherCondition}
            label={currentWeather?.condition}
          />
        </View>

        <CustomText
          textStyle={styles.location}
          label={currentWeather?.location}
          marginLeft={8}
        />
      </View>

      {/* 7-Day Forecast Section (Day | Icon | min max) */}
      <View style={styles.forecastContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.forecastScrollContent}
        >
          {forecast?.map((day, index) => (
            <View key={index} style={styles.forecastItemContainer}>
              <TouchableOpacity style={styles.forecastItem}>
                <CustomText
                  textStyle={styles.dayText}
                  label={day?.day}
                  marginRight={4}
                />
                <View style={styles.forecastIconContainer}>
                  {getWeatherIcon(day.icon, 16, "#fff")}
                </View>
                {day?.temp
                  ?.toString()
                  ?.split(" ")
                  ?.slice(0, 2)
                  .map((t, i) => (
                    <CustomText
                      key={i}
                      textStyle={styles.forecastTemp}
                      label={t}
                      marginLeft={4}
                      color={i === 0 ? "#BBCFDD" : "white"}
                    />
                  ))}
              </TouchableOpacity>
              {index < forecast.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4C80A4",
    borderRadius: 18,
    marginBottom: 8,
    padding: 8,
    minHeight: 78,
  },

  currentWeatherContainer: {
    backgroundColor: "#4A4AFF",
    borderRadius: 12,
    padding: 6,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },

  weatherInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherCondition: {
    fontSize: 12,
    color: "#FFFFFF",
    marginLeft: 8,

    lineHeight: 12 * 1.4,
  },
  location: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: fonts.medium,
    lineHeight: 16 * 1.4,
  },
  forecastItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  forecastItem: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 60,
    // paddingVertical: 8,
    paddingHorizontal: 6,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: "#DDDDDD",
    marginHorizontal: 8,
  },
  dayText: {
    fontSize: 16,
    color: "#BBCFDD",
    fontFamily: fonts.semiBold,
    lineHeight: 16 * 1.4,
  },

  forecastTemp: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: fonts.semiBold,
    lineHeight: 16 * 1.4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: fonts.medium,
    marginTop: 12,
    lineHeight: 16 * 1.4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  errorText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: fonts.medium,
    textAlign: "center",
    lineHeight: 16 * 1.4,

    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: fonts.medium,
    lineHeight: 14 * 1.4,
  },
});

export default WeatherCard;

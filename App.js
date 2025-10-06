import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";
import { StripeProvider } from "@stripe/stripe-react-native";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import {
  PermissionsAndroid,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
  Text,
  View,
} from "react-native";

import BrainBox from "./src/components/BrainBox";
import { HomeSheetProvider } from "./src/context/HomeSheetContext";

import { persistor, store } from "./src/store";
import Navigation from "./src/navigation";

const NetworkErrorScreen = ({ onRetry }) => {
  return (
    <View style={styles.errorContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Error Icon */}
      <View style={styles.iconContainer}>
        <Text style={styles.errorIcon}>📡</Text>
      </View>

      {/* Error Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.errorTitle}>No Internet Connection</Text>
        <Text style={styles.errorSubtitle}>
          Please check your internet connection and try again
        </Text>

        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>• Check your WiFi connection</Text>
          <Text style={styles.bulletPoint}>• Check your mobile data</Text>
          <Text style={styles.bulletPoint}>
            • Try moving to a better signal area
          </Text>
        </View>
      </View>

      {/* Retry Button */}
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}>Retry Connection</Text>
      </TouchableOpacity>

      {/* Continue Without Internet Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          Alert.alert(
            "Limited Functionality",
            "Some features may not work without internet connection.",
            [
              {
                text: "Continue Anyway",
                onPress: () => store.dispatch({ type: "FORCE_OFFLINE_MODE" }),
              },
            ]
          );
        }}
      >
        <Text style={styles.continueButtonText}>Continue Offline</Text>
      </TouchableOpacity>

      {/* Exit Button */}
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => BackHandler.exitApp()}
      >
        <Text style={styles.exitButtonText}>Exit App</Text>
      </TouchableOpacity>
    </View>
  );
};

export const requestPermissionOnDemand = async (permissionType) => {
  if (Platform.OS !== "android") return true;

  try {
    let permission;
    let permissionName;

    switch (permissionType) {
      case "camera":
        permission = PermissionsAndroid.PERMISSIONS.CAMERA;
        permissionName = "Camera";
        break;
      case "phone":
        permission = PermissionsAndroid.PERMISSIONS.CALL_PHONE;
        permissionName = "Phone";
        break;
      case "location":
        permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
        permissionName = "Location";
        break;
      default:
        return false;
    }

    const hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) {
      return true;
    }

    const result = await PermissionsAndroid.request(permission, {
      title: `${permissionName} Permission Required`,
      message: `This feature requires ${permissionName.toLowerCase()} access to work properly.`,
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    });

    return result === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.log("Permission request error:", error);
    return false;
  }
};

export const checkPermissionStatus = async (permissionType) => {
  if (Platform.OS !== "android") return true;

  try {
    let permission;
    switch (permissionType) {
      case "camera":
        permission = PermissionsAndroid.PERMISSIONS.CAMERA;
        break;
      case "phone":
        permission = PermissionsAndroid.PERMISSIONS.CALL_PHONE;
        break;
      case "location":
        permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
        break;
      default:
        return false;
    }

    return await PermissionsAndroid.check(permission);
  } catch (error) {
    console.log("Permission check error:", error);
    return false;
  }
};

const App = () => {
  const linking = {
    prefixes: ["medoczen://", "https://patient-android.medoczen.uk"],
    config: {
      screens: {
        Login: "login",
      },
    },
  };
  const stripeKey =
    "pk_test_51PNjntRrXj8bYHvWmM4xpswZA7FlZ5SLAibKdGaJpmGoY7NnishkRDXlN1cH0hcThSsNkHiqUt4g2zjm27f4O69S0098gYAC7N";

  const [isConnected, setIsConnected] = useState(true);
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);
  const [showNetworkError, setShowNetworkError] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      setShowNetworkError(!state.isConnected);
      setIsCheckingConnection(false);
    });

    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
      setShowNetworkError(!state.isConnected);
      setIsCheckingConnection(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      if (Platform.OS === "android") {
        await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.CALL_PHONE
        );
      }
    } catch (error) {
      console.log("App initialization error:", error);
    }
  };

  const retryConnection = async () => {
    setIsCheckingConnection(true);

    try {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
      setShowNetworkError(!state.isConnected);

      if (!state.isConnected) {
        setTimeout(() => {
          Alert.alert(
            "Still No Connection",
            "You can continue using the app with limited functionality.",
            [
              {
                text: "Continue Offline",
                onPress: () => setShowNetworkError(false),
              },
              { text: "Try Again", onPress: retryConnection },
            ]
          );
        }, 1000);
      }
    } catch (error) {
      console.log("Network retry error:", error);
      Alert.alert(
        "Connection Error",
        "Unable to check network status. Continue with limited functionality?",
        [
          { text: "Yes", onPress: () => setShowNetworkError(false) },
          { text: "Retry", onPress: retryConnection },
        ]
      );
    } finally {
      setIsCheckingConnection(false);
    }
  };

  if (isCheckingConnection) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Text style={styles.loadingText}>Starting app...</Text>
        <Text style={styles.loadingSubText}>Checking connection</Text>
      </View>
    );
  }

  if (showNetworkError) {
    return <NetworkErrorScreen onRetry={retryConnection} />;
  }

  return (
    <StripeProvider publishableKey={stripeKey} urlScheme="your-url-scheme">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer linking={linking}>
              <HomeSheetProvider>
                <BrainBox>
                  <Navigation />
                </BrainBox>
              </HomeSheetProvider>
            </NavigationContainer>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  iconContainer: {
    marginBottom: 30,
  },
  errorIcon: {
    fontSize: 80,
    textAlign: "center",
  },
  contentContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 10,
    textAlign: "center",
  },
  errorSubtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  bulletPoints: {
    alignItems: "flex-start",
  },
  bulletPoint: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 5,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  exitButton: {
    backgroundColor: "#6c757d",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  exitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    fontSize: 18,
    color: "#343a40",
    fontWeight: "bold",
  },
  loadingSubText: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 10,
  },
});

export default App;

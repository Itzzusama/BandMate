import React, { useEffect, useState, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icons from "../components/Icons";
import fonts from "../assets/fonts";

const listeners = new Set();

export const ToastMessage = (message, type = "text") => {
  if (typeof message === "string" && message.trim().length > 0) {
    listeners.forEach((listener) =>
      listener({ message: message.trim(), type }),
    );
  }
};

export const useToast = () => {
  return { showToast: ToastMessage };
};

const ToastItem = ({ toast, index, onDismiss }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(index * 36)).current;

  useEffect(() => {
    Animated.spring(translateYAnim, {
      toValue: index * 36,
      useNativeDriver: true,
      bounciness: 4,
      speed: 12,
    }).start();
  }, [index]);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 6,
        speed: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      dismissToast();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const dismissToast = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss(toast.id);
    });
  };

  const combinedTranslateY = Animated.add(slideAnim, translateYAnim);

  return (
    <Animated.View
      style={[
        styles.toastWrapper,
        {
          opacity: opacityAnim,
          transform: [{ translateY: combinedTranslateY }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={dismissToast}
        style={styles.toastCard}
      >
        <View style={styles.tickContainer}>
          <Icons
            family="Ionicons"
            name="checkmark-sharp"
            size={10}
            color="#FFFFFF"
          />
        </View>
        <Text style={styles.toastText} numberOfLines={3}>
          {toast.message}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (newToast) => {
      const id = Date.now().toString() + Math.random().toString();
      setToasts((prevToasts) => [...prevToasts, { ...newToast, id }]);
    };

    listeners.add(handleToast);
    return () => {
      listeners.delete(handleToast);
    };
  }, []);

  const handleDismiss = (id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <View pointerEvents="box-none" style={styles.container}>
      {toasts.map((toast, index) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          index={index}
          onDismiss={handleDismiss}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : (StatusBar.currentHeight || 24) + 10,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999999,
    elevation: 999999,
  },
  toastWrapper: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    maxWidth: "90%",
  },
  toastCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 99,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    alignSelf: "center",
  },
  tickContainer: {
    width: 16,
    height: 16,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 99,
    backgroundColor: "#64CD75",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  toastText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: fonts.medium,
    textAlign: "center",
  },
});

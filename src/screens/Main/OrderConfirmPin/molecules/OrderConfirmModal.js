import { StyleSheet, View, Alert, Animated } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useEffect, useRef, useState } from "react";

import ErrorComponent from "../../../../components/ErrorComponent";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const OrderConfirmModal = ({
  isVisible,
  onDisable,
  title,
  subtitle,
  btnTitle = "Continue",
  source,
  info,
  herderText,
  btnTitleSecond,
  onPress,
  requestAgain,
}) => {
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
  const spinValue = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef(null);
  const animationRef = useRef(null);

  // Spinner animation
  const startSpinner = () => {
    // Stop any existing animation
    if (animationRef.current) {
      animationRef.current.stop();
    }

    // Reset animation value
    spinValue.setValue(0);

    // Start new animation
    animationRef.current = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000, // 2 seconds for smoother rotation
        useNativeDriver: true,
      })
    );
    animationRef.current.start();
  };

  const stopSpinner = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Timer functionality
  useEffect(() => {
    if (title === "Connecting with Your Chauffeur..." && isVisible) {
      setTimeLeft(60);
      // Start spinner with a small delay to ensure component is mounted
      setTimeout(() => {
        startSpinner();
      }, 100);

      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            stopSpinner();
            showTimeoutAlert();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // Stop spinner when title changes or modal closes
      stopSpinner();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      stopSpinner();
    };
  }, [title, isVisible]);

  const showTimeoutAlert = () => {
    Alert.alert(
      "Request Timeout",
      "Your request time has expired. Would you like to request again or cancel?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            if (onDisable) onDisable?.();
          },
        },
        {
          text: "Request Again",
          onPress: () => {
            requestAgain();
            setTimeLeft(60);
            setTimeout(() => {
              startSpinner();
            }, 100);
            intervalRef.current = setInterval(() => {
              setTimeLeft((prev) => {
                if (prev <= 1) {
                  clearInterval(intervalRef.current);
                  stopSpinner();
                  showTimeoutAlert();
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
          },
        },
      ]
    );
  };
  return (
    <CustomModal
      backdropOpacity={0}
      backdropColor="transparent"
      isChange
      isVisible={isVisible}
      onDisable={onDisable}
    >
      <View
        style={{
          padding: 4,
          width: "95%",
          alignSelf: "center",
          borderRadius: 24,
          marginBottom: 12,
          maxHeight: "100%",
          borderWidth: 1,
          backgroundColor: "#FFFFFF29",
          borderColor: "rgba(255, 255, 255, 0.16)",
        }}
      >
        <BlurView
          style={{
            maxHeight: "100%",
            width: "100%",
            borderRadius: 24,
          }}
          blurType="light"
          blurAmount={26}
          reducedTransparencyFallbackColor="#FFFFFF29"
        />

        <View style={styles.mainContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CustomText
                label={herderText}
                color="#121212A3"
                lineHeight={14 * 1.4}
              />
              <CustomText
                label="move."
                color={COLORS.black}
                fontFamily={fonts.medium}
                lineHeight={14 * 1.4}
              />
            </View>
            {title == "Connecting with Your Chauffeur..." && (
              <CustomText
                label={`${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
                  .toString()
                  .padStart(2, "0")}`}
                fontFamily={fonts.medium}
                textAlign="center"
                fontSize={16}
                lineHeight={16 * 1.4}
              />
            )}
          </View>
          {title == "Connecting with Your Chauffeur..." ? (
            <Animated.View
              style={[styles.iconContainer, { transform: [{ rotate: spin }] }]}
            >
              <ImageFast
                source={source}
                style={styles.icon}
                resizeMode="contain"
              />
            </Animated.View>
          ) : (
            <ImageFast
              source={source}
              style={styles.icon}
              resizeMode="contain"
            />
          )}

          <CustomText
            label={title}
            fontFamily={fonts.semiBold}
            fontSize={22}
            lineHeight={22 * 1.4}
            textAlign="center"
          />
          <CustomText
            label={subtitle}
            fontFamily={fonts.medium}
            color="#121212A3"
            textAlign="center"
            lineHeight={14 * 1.4}
            marginTop={4}
            marginBottom={10}
          />

          <ErrorComponent errorTitle={info} />
          <CustomButton
            title={btnTitle}
            marginTop={16}
            marginBottom={4}
            secondText={btnTitleSecond}
            onPress={onPress}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default OrderConfirmModal;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  icon: {
    height: 116,
    width: 80,
    alignSelf: "center",
  },
  iconContainer: {
    height: 116,
    width: 80,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

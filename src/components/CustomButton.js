import React, { useState } from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Image,
  View,
} from "react-native";

import CustomText from "./CustomText";
import ImageFast from "./ImageFast";

import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import fonts from "../assets/fonts";
import { PNGIcons } from "../assets/images/icons";

const CustomButton = ({
  onPress,
  title,
  disabled,
  loading,
  customStyle,
  customText,
  marginBottom,
  marginTop,
  backgroundColor,
  color,
  width = "100%",
  height = 52,
  borderRadius = 99,
  justifyContent = "center",
  alignItems = "center",
  flexDirection = "row",
  alignSelf = "center",
  fontSize = 17.1429,
  indicatorColor,
  marginRight,
  borderWidth,
  borderColor,
  fontFamily,
  loadingSize,
  mainStyle,
  icon,
  icnWidth,
  icnHeight,
  rightIcon,
  rightIconWidth,
  rightIconHeight,
  isBoarder = false,
  secondBorderColor,
  bgBlur,
  secondText,
  iconColor,
  textTransform,
  leftView,
}) => {
  const [animation] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animation, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        mainStyle,

        {
          transform: [{ scale: animation }],
          width,
          alignSelf,
          marginBottom,
          marginRight,
          borderRadius,
        },
        isBoarder
          ? {
              borderWidth: 1,
              borderColor: borderColor || "#1212127A",
              borderRadius: 100,
            }
          : {},
      ]}
    >
      <TouchableOpacity
        disabled={loading || disabled}
        activeOpacity={0.8}
        style={[
          {
            backgroundColor: disabled
              ? COLORS.authText
              : bgBlur
              ? "transparent"
              : backgroundColor
              ? backgroundColor
              : COLORS.btnColor,
            marginTop,
            width: "100%",
            height: height,
            borderRadius,
            flexDirection,
            alignItems,
            justifyContent,
            borderWidth,
            borderColor,
          },
          customStyle,
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {bgBlur ? (
          <ImageFast
            removeLoading
            source={Images.buttonBg}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 100,
              position: "absolute",
            }}
          />
        ) : null}

        {loading && (
          <ActivityIndicator
            size={loadingSize || 25}
            color={indicatorColor || COLORS.black}
          />
        )}
        {icon && (
          <Image
            source={icon}
            style={{
              width: icnWidth || 20,
              height: icnHeight || 20,
              resizeMode: "contain",
              marginRight: 5,
              tintColor: iconColor,
            }}
          />
        )}

        {!loading && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {leftView && (
              <Image
                source={PNGIcons.sola}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: "contain",
                  marginRight: 5,
                }}
              />
            )}
            <CustomText
              textStyle={customText}
              label={title}
              color={color || COLORS.black}
              fontFamily={fontFamily || fonts.medium}
              fontSize={fontSize}
              lineHeight={fontSize * 1.4}
              textTransform={textTransform || "capitalize"}
            />

            {secondText && (
              <CustomText
                label={secondText}
                color={color || "#AAAAAA"}
                fontSize={12}
                lineHeight={12 * 1.4}
                textTransform="capitalize"
                textAlign={"center"}
              />
            )}
          </View>
        )}

        {rightIcon && (
          <Image
            source={rightIcon}
            style={{
              width: rightIconWidth || 18,
              height: rightIconHeight || 18,
              resizeMode: "contain",
              marginLeft: 5,
              tintColor: COLORS.white,
            }}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CustomButton;

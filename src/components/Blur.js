import React from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "@react-native-community/blur";

const Blur = ({
  blurType = "light",
  blurAmount = 16,
  style,
  borderRadius,
  zIndex,
  borderWidth = 0,
  borderColor = borderColor,
  pointerEvents = "auto",
}) => {
  return (
    <BlurView
      blurType={blurType}
      blurAmount={blurAmount}
      pointerEvents={pointerEvents}
      style={[
        styles.default,
        style,
        {
          borderRadius: borderRadius || 12,
          zIndex,
          borderWidth,
          borderColor,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Blur;

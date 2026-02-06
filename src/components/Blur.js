import React from "react";
import { StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";

const Blur = ({
  blurType = "light",
  blurAmount = 16,
  style,
  borderRadius,
  reducedTransparency,
}) => {
  return (
    <BlurView
      blurType={blurType}
      blurAmount={blurAmount}
      reducedTransparencyFallbackColor={reducedTransparency}
      style={[
        styles.default,
        style,
        {
          borderRadius: borderRadius || 12,
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

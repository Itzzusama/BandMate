import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../utils/COLORS";

const Border = ({
  height = 2,
  bgColor,
  marginTop,
  marginBottom,
  marginVertical,
}) => {
  return (
    <View
      style={[
        styles.border,
        {
          backgroundColor: bgColor || COLORS.lightGray,
          marginTop,
          marginBottom,
          marginVertical,
          height,
        },
      ]}
    />
  );
};

export default Border;

const styles = StyleSheet.create({});

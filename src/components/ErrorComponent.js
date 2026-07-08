import { StyleSheet, View, Text } from "react-native";

import CustomText from "./CustomText";
import Icons from "./Icons";

import fonts from "../assets/fonts";
import { COLORS } from "../utils/COLORS";

const ErrorComponent = ({
  errorTitle,
  color,
  marginBottom,
  alignSelf,
  marginTop,
  secondTitle,
  error,
  color1,
  isValid,
  hideInfo,
  numberOfLines,
  TextWidth,
  infoTop,
  highlight,
  marginLeft,
  font,
}) => {
  return (
    <View
      style={[styles.row, { marginBottom, alignSelf, marginTop, marginLeft }]}
    >
      {hideInfo ? null : (
        <Icons
          family={isValid ? "Ionicons" : error ? "Entypo" : "Feather"}
          name={
            isValid ? "checkmark-circle" : error ? "circle-with-cross" : "info"
          }
          size={12}
          marginRight={4}
          color={color || "rgba(255, 255, 255, 0.64)"}
          marginTop={infoTop || 2}
        />
      )}

      <Text
        numberOfLines={numberOfLines}
        style={{
          fontSize: 12,
          color: color || "rgba(255, 255, 255, 0.64)",
          width: TextWidth,
          textTransform: "none",
          flexShrink: 1,
        }}
      >
        {errorTitle}
        <Text
          style={{
            fontSize: 12,
            fontFamily: font || fonts.medium,
            color: "white",
            width: TextWidth,
            textTransform: "none",
          }}
        >
          {highlight}
        </Text>
      </Text>

      {secondTitle ? (
        <CustomText
          label={secondTitle}
          fontSize={12}
          color={color1 || COLORS.white}
          fontFamily={fonts.medium}
          lineHeight={12 * 1.4}
        />
      ) : null}
    </View>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderRadius: 8,
  },
});

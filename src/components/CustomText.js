import { Text, TouchableOpacity } from "react-native";

import { COLORS } from "../utils/COLORS";
import fonts from "../assets/fonts";

const CustomText = ({
  textStyle,
  fontSize,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft,
  alignSelf,
  fontFamily,
  fontStyle,
  textTransform,
  textAlign,
  label,
  color,
  fontWeight,
  bottom,
  width,
  borderColor,
  borderBottomWidth,
  onPress,
  marginVertical,
  paddingBottom,
  activeOpacity,
  textDecorationLine,
  containerStyle,
  right,
  left,
  numberOfLines,
  children,
  disabled,
  letterSpacing,
  lineHeight,
  marginHorizontal,
}) => {
  const defaultFontSize = fontSize || 14;
  const defaultLineHeight = lineHeight; // 1.4 is a good multiplier for readability
  // const defaultLineHeight = lineHeight || defaultFontSize * 1.4; // 1.4 is a good multiplier for readability

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={!onPress || disabled}
      activeOpacity={activeOpacity || 0.6}
    >
      <Text
        numberOfLines={numberOfLines}
        style={[
          {
            fontSize: defaultFontSize,
            color: color || COLORS.primaryColor,
            marginTop: marginTop || 0,
            marginBottom: marginBottom || 0,
            marginLeft: marginLeft || 0,
            marginRight: marginRight || 0,
            fontFamily: fontFamily || fonts.regular,
            fontStyle: fontStyle,
            lineHeight: defaultLineHeight,
            textAlign: textAlign,
            textTransform: textTransform || "none",
            fontWeight: fontWeight,
            bottom: bottom,
            borderBottomWidth: borderBottomWidth,
            borderColor: borderColor,
            width: width,
            marginVertical: marginVertical,
            marginHorizontal: marginHorizontal,
            paddingBottom: paddingBottom,
            right: right,
            left: left,
            letterSpacing,

            textDecorationLine: textDecorationLine || "none",
            alignSelf: alignSelf,
          },
          textStyle,
        ]}
      >
        {label}
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomText;

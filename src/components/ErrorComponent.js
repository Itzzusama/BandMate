import { StyleSheet, View } from "react-native";

import CustomText from "./CustomText";
import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";
import fonts from "../assets/fonts";

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
}) => {
  return (
    <View style={[styles.row, { marginBottom, alignSelf, marginTop }]}>
      {hideInfo ? null : (
        <Icons
          family={isValid ? "Ionicons" : error ? "Entypo" : "Feather"}
          name={
            isValid ? "checkmark-circle" : error ? "circle-with-cross" : "info"
          }
          size={12}
          marginRight={4}
          color={color || COLORS.white2}
          marginTop={infoTop || 3}
        />
      )}

      <CustomText
        label={errorTitle}
        fontSize={12}
        numberOfLines={numberOfLines}
        color={color || COLORS.white2}
        lineHeight={12 * 1.4}
        width={TextWidth}
        textTransform="none"
      />
      <CustomText
        label={secondTitle}
        fontSize={12}
        color={color1 || COLORS.black}
        fontFamily={fonts.medium}
        lineHeight={12 * 1.4}
      />
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

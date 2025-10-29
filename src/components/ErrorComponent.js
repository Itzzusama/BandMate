import { StyleSheet, View, Text } from "react-native";
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
  isValid,
  hideInfo,
  infoTop,
  textColor,
}) => {
  return (
    <View style={[styles.row, { marginBottom, alignSelf, marginTop }]}>
      {!hideInfo && (
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

      {/* ✅ Single Text node with nested children */}
      <Text style={styles.text}>
        <Text
          style={[
            styles.errorTitle,
            { color: textColor ? textColor : COLORS.white2 },
          ]}
        >
          {errorTitle}
        </Text>
        {secondTitle ? (
          <Text style={styles.secondTitle}> {secondTitle}</Text>
        ) : null}
      </Text>
    </View>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  text: {
    flexShrink: 1,
    flexWrap: "wrap",
  },
  errorTitle: {
    fontSize: 12,
    color: COLORS.white2,
    lineHeight: 12 * 1.4,
    fontFamily: fonts.regular,
  },
  secondTitle: {
    fontSize: 12,
    color: COLORS.white,
    lineHeight: 12 * 1.4,
    fontFamily: fonts.medium,
  },
});

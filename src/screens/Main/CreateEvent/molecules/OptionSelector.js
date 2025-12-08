import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import Icons from "../../../../components/Icons";
import CustomText from "../../../../components/CustomText";
import { TouchableOpacity } from "react-native";
const OptionSelector = ({
  arrow = "down",
  error,
  showSuccessColor,
  placeHolder,
  label,
  onPress,
  value,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={{ flex: 1 }}>
        <CustomText
          label={label}
          color={
            error ? "#EE1045" : showSuccessColor ? "#64CD75" : COLORS.white3
          }
          fontFamily={fonts.medium}
          fontSize={12}
          textTransform={"uppercase"}
          lineHeight={12 * 1.4}
        />
        <CustomText
          label={value || placeHolder}
          color={value ? COLORS.white : COLORS.white3}
          fontFamily={value ? fonts.medium : fonts.regular}
          fontSize={16}
          lineHeight={16 * 1.4}
          marginTop={1}
        />
      </View>
      <View style={{ alignSelf: "center" }}>
        <Icons
          style={{ color: COLORS.white2, fontSize: 20 }}
          family={arrow == "down" ? "Entypo" : "Ionicons"}
          name={arrow == "down" ? "chevron-down" : "chevron-forward-outline"}
        />
      </View>
    </TouchableOpacity>
  );
};

export default OptionSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.inputBg,
    marginBottom: 8,
    height: 56,
    borderRadius: 12,
  },
});

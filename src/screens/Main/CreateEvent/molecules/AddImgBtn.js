import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../utils/COLORS";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";

const AddImgBtn = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.outerRing}
    >
      <View style={styles.innerRing}>
        <Image source={Images.add_camera} style={styles.icon} />
        <CustomText
          label={title}
          color={COLORS.white2}
          fontFamily={fonts.medium}
          lineHeight={8 * 1.2}
          fontSize={8}
        />
      </View>
    </TouchableOpacity>
  );
};

export default AddImgBtn;

const styles = StyleSheet.create({
  outerRing: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    padding: 3,
    alignSelf: "flex-start",
  },
  innerRing: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    borderStyle: "dashed",
    height: 56,
    width: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    tintColor: COLORS.white2,
  },
});

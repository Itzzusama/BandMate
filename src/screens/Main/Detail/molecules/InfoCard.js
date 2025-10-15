import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";

const InfoCard = ({ name, showIcon, type, marginBottom = 20 }) => {
  return (
    <View style={[styles.container, { marginBottom: marginBottom }]}>
      {showIcon && <Image source={PNGIcons.note} style={styles.icon} />}
      <CustomText
        label={name}
        fontFamily={fonts.medium}
        color={COLORS.white}
        fontSize={14}
        lineHeight={14 * 1.4}
        marginBottom={2}
      />
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 18,
    paddingVertical: 3.64,
    paddingHorizontal: 12.8,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  icon: {
    height: 12,
    width: 12,
    tintColor: COLORS.white,
    resizeMode: "contain",
    marginRight: 4,
  },
});

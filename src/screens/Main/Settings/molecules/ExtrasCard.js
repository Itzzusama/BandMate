import React from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomText from "../../.../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import ImageFast from "../../../../components/ImageFast";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import fonts from "../../../../assets/fonts";
const ExtrasCard = ({ onPress }) => {
  return (
    <ImageFast
      source={Images.settings_bg}
      style={styles.card}
      resizeMode={"stretch"}
    >
      <View style={styles.iconRow}>
        <Image source={PNGIcons.rewind} style={styles.icon} />
        <Image source={PNGIcons.star_blue} style={styles.icon} />
        <Image source={PNGIcons.blot} style={styles.icon} />
      </View>

      <View style={styles.container}>
        <CustomText textStyle={styles.title}>Get Extras</CustomText>
        <CustomText textStyle={styles.subtitle}>
          Super Likes, Boosts, Rewinds!
        </CustomText>
      </View>
    </ImageFast>
  );
};

export default ExtrasCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    resizeMode: "contain",
    height: 136,
    marginTop: 8,
  },
  container: {
    paddingVBottom: 16,
    paddingHorizontal: 12,
    justifyContent: "flex-end",
    marginTop: 5,
    flex: 0.55,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 16,
    marginLeft: 12,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: fonts.medium,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 14,
    color: COLORS.white,
    marginTop: 2,
  },
  icon: {
    height: 32,
    width: 32,
    resizeMode: "contain",
  },
});

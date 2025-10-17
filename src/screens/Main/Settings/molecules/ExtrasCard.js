import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import { PNGIcons } from "../../../../assets/images/icons";
import fonts from "../../../../assets/fonts";

const ExtrasCard = ({ onPress }) => {
  return (
    <LinearGradient
      colors={["#FFFFFF14", "#948f8f14", "#FF4B4B", "#575093", "#007BFF"]}
      locations={[0.3867, 0.583, 0.7301, 0.8283, 0.9264]}
      angle={130}
      useAngle={true}
      style={styles.card}
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
    </LinearGradient>
  );
};

export default ExtrasCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 136,
    borderRadius: 14,
    marginTop: 8,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 12,
    marginTop: 16,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginVertical: 12,
    marginHorizontal: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: fonts.medium,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 2,
  },
  icon: {
    height: 28,
    width: 28,
    resizeMode: "contain",
  },
});

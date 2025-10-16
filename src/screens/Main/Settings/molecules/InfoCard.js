import React from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const InfoCard = ({ icon = "sunny-outline", title, subtitle }) => {
  return (
    <View style={styles.card}>
      <Image source={icon} style={styles.icon} />
      <View style={{ marginTop: 12, justifyContent: "flex-end", flex: 1 }}>
        <CustomText textStyle={styles.title}>{title}</CustomText>
        {subtitle && (
          <CustomText textStyle={styles.subtitle}>{subtitle}</CustomText>
        )}
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#121212",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flex: 1,
    height: 136,
  },
  icon: {
    height: 32,
    width: 32,
    resizeMode: "contain",
  },
  title: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: fonts.regular,
    marginTop: 3,
  },
});

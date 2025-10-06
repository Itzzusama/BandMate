import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageFast from "../../../../components/ImageFast";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";

const AchievementCard = ({
  source,
  title,
  sub,
  width = "32%",
  marginTop,
  marginBottom,
}) => {
  return (
    <View style={[styles.card, { width, marginTop, marginBottom }]}>
      <ImageFast
        removeLoading
        source={source || PNGIcons.A1}
        style={{ height: 32, width: 32 }}
      />
      <CustomText
        label={title || "15"}
        fontSize={16}
        lineHeight={16 * 1.4}
        fontFamily={fonts.medium}
      />
      <CustomText
        label={sub || "Bookings"}
        fontSize={12}
        lineHeight={12 * 1.4}
        fontFamily={fonts.medium}
        color={COLORS.gray1}
      />
    </View>
  );
};

export default AchievementCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

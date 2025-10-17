import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const FeedbackSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.spaceBetween}>
        <CustomText
          label={"Our other apps"}
          fontSize={16}
          fontFamily={fonts.medium}
          color={COLORS.black}
          lineHeight={16 * 1.4}
        />
        <TouchableOpacity activeOpacity={0.8} style={styles.rightBtn}>
          <CustomText
            label={"Learn more"}
            fontSize={14}
            fontFamily={fonts.medium}
            color={COLORS.white}
            lineHeight={14 * 1.4}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.spaceBetween, { backgroundColor: COLORS.inputBg }]}>
        <CustomText
          label={"Help us improve BandMate"}
          fontSize={16}
          fontFamily={fonts.medium}
          color={COLORS.white}
          lineHeight={16 * 1.4}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.rightBtn, { backgroundColor: COLORS.white }]}
        >
          <CustomText
            label={"Start now"}
            fontSize={14}
            fontFamily={fonts.medium}
            color={COLORS.black}
            lineHeight={14 * 1.4}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedbackSection;

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  spaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 100,
    backgroundColor: COLORS.btnColor,
    padding: 4,
    paddingLeft: 16,
    marginBottom: 8,
  },
  rightBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 100,
    backgroundColor: "#141416",
  },
});

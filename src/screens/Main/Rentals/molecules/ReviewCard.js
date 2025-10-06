import { StyleSheet, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";

const ReviewCard = () => {
  return (
    <View style={styles.card}>
      {/* Header: Name + verified */}
      <View style={styles.headerRow}>
        <CustomText
          label={"Mokhtar"}
          fontFamily={fonts.medium}
          fontSize={12}
          lineHeight={12 * 1.4}
        />
        <Icons
          family="MaterialCommunityIcons"
          name="check-decagram"
          size={12}
          color={"#247CFF"}
        />
      </View>

      {/* Subheader: rating + star + dot + time */}
      <View style={styles.subHeaderRow}>
        <CustomText
          label={"5.0"}
          fontFamily={fonts.medium}
          fontSize={12}
          lineHeight={12 * 1.4}
        />
        <Icons family="AntDesign" name="star" size={16} color={"#F5B502"} />
        <View style={styles.dot} />
        <CustomText
          label={"4 Days"}
          fontFamily={fonts.medium}
          color={COLORS.gray1}
          fontSize={12}
          lineHeight={12 * 1.4}
        />
      </View>

      {/* Review text */}
      <View style={{ width: "90%" }}>
        <CustomText
          label={
            "The customer service was exceptional! They were prompt, helpful, and resolved my issue quickly."
          }
          fontSize={12}
          color={COLORS.gray1}
          lineHeight={12 * 1.4}
        />
      </View>

      {/* Images placeholders */}
      <View style={styles.imagesRow}>
        <View style={styles.imagePlaceholder} />
        <View style={styles.imagePlaceholder} />
        <View style={styles.imagePlaceholder} />
      </View>

      {/* Useful row */}
      <View style={styles.usefulRow}>
        <CustomText label={"48"} fontSize={10} lineHeight={10 * 1.4} />
        <Icons
          family="Feather"
          name="thumbs-up"
          size={10}
          color={COLORS.gray1}
        />
        <CustomText
          label={"Useful"}
          fontSize={10}
          lineHeight={10 * 1.4}
          color={COLORS.gray1}
        />
      </View>

      {/* Footer row: date and report */}
      <View style={styles.footerRow}>
        <CustomText
          label={"July 18, 2025"}
          fontSize={10}
          lineHeight={10 * 1.4}
          color={COLORS.gray1}
        />
        <View style={styles.reportRow}>
          <CustomText label={"Report"} fontSize={10} lineHeight={10 * 1.4} />
          <Icons family="Feather" name="arrow-up-right" size={10} />
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 16,
    width: 290,
    marginRight: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  subHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
    marginBlock: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
  },
  imagesRow: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 12,
  },
  imagePlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: "#D9D9D9",
    borderRadius: 12,
  },
  usefulRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  reportRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});

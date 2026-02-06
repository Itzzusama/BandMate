import { StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";

const bulletPoints = [
  "8+ hours of non-stop music",
  "3 different stages",
  "Food trucks and vendors",
];

const WhatToExpect = ({ content }) => {
  return (
    <View style={styles.container}>
      <CustomText
        label={"What To Expect There"}
        fontFamily={fonts.semiBold}
        fontSize={22}
        lineHeight={22 * 1.4}
      />

      <CustomText
        label={content}
        fontFamily={fonts.medium}
        fontSize={14}
        lineHeight={14 * 1.4}
        color={COLORS.white2}
      />
    </View>
  );
};

export default WhatToExpect;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
    paddingHorizontal: 7,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 3,
    backgroundColor: COLORS.white2,
    marginRight: 9,
  },
});

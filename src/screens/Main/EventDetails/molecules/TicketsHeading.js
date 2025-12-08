import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";

const TicketsHeading = ({ title, subTitle }) => {
  return (
    <View style={{ paddingHorizontal: 12, paddingTop: 10, paddingBottom: 20 }}>
      <CustomText
        label={title}
        fontFamily={fonts.semiBold}
        fontSize={22}
        lineHeight={22 * 1.4}
      />
      <CustomText
        label={subTitle}
        color={COLORS.white3}
        fontSize={14}
        lineHeight={14 * 1.4}
      />
    </View>
  );
};

export default TicketsHeading;

const styles = StyleSheet.create({});

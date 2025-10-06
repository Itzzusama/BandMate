import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import Divider from "../../../components/Divider";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const PromoCode = () => {
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"My Promo Codes"} />}
    >
      <Divider thickness={4} />

      {[1, 2, 3, 4].map((item, index) => (
        <View key={index} style={styles.container}>
          <CustomText
            label={"WELCOME10"}
            fontSize={16}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
          />
          <CustomText
            label={"-10% on Rentals"}
            color={COLORS.gray2}
            lineHeight={14 * 1.4}
          />
        </View>
      ))}
    </ScreenWrapper>
  );
};

export default PromoCode;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
});

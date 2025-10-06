import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import { COLORS } from "../../../utils/COLORS";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import { Images } from "../../../assets/images";

const FAQNews = () => {
  return (
    <ScreenWrapper
      paddingBottom={0.1}
      headerUnScrollable={() => <Header title={"FAQ"} />}
    >
      <View style={styles.border} />
      <CustomText label={"Question"} fontFamily={fonts.medium} fontSize={18} />
      <CustomInput
        placeholder={"E.g. James"}
        cardInfo={"Maximum characters 0/37"}
      />
      <View style={styles.border} />

      <CustomText label={"Answers"} fontFamily={fonts.medium} fontSize={18} />

      <CustomInput
        placeholder={"E.g. Johansson"}
        multiline
        height={180}
        cardInfo={"Maximum characters 0/37"}
      />
      <View style={styles.border} />
      <CustomButton
        title={"Add A FAQ"}
        icon={Images.plus}
        color={COLORS.primaryColor}
        backgroundColor={COLORS.lightGray}
        borderRadius={12}
        marginTop={8}
        marginBottom={8}
      />

      <View style={styles.border} />
    </ScreenWrapper>
  );
};

export default FAQNews;

const styles = StyleSheet.create({
  border: {
    height: 4,
    backgroundColor: COLORS.lightGray,
    marginVertical: 16,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../utils/COLORS";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/images";

const TeenVC = () => {
  const navigation = useNavigation();
  return (
    <ScreenWrapper
      translucent
      backgroundImage={Images.vcBg}
      headerUnScrollable={() => <Header title={"New Virtual Card"} />}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton
            title={"Order Now"}
            secondText={"$22.00 All Included."}
            onPress={() => navigation.navigate("CardAccess")}
            // onPress={() => navigation.navigate("AddCredits")}
          />
          <CustomButton
            title={"Maybe Later"}
            backgroundColor={COLORS.lightGray}
            color={COLORS.primaryColor}
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    >
      <CustomText
        label={"Label Card"}
        fontSize={24}
        lineHeight={24 * 1.4}
        fontFamily={fonts.semiBold}
        marginTop={32}
      />
      <CustomText
        lineHeight={14 * 1.4}
        label={"Differentiate Virtual Cards with names."}
      />

      <CustomInput
        value={"Personal VC"}
        withLabel={"NAME CARD"}
        marginTop={16}
        cardInfo={"0/20 characters."}
      />
    </ScreenWrapper>
  );
};

export default TeenVC;

const styles = StyleSheet.create({
  footer: {
    paddingBottom:75,
    padding: 12,
    gap: 8,
  },
});

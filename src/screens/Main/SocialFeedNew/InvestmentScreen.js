import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import CountrySelectionCard from "./molecules/CountrySelectionCard";
import Divider from "../../../components/Divider";
import ConditionCard from "./molecules/ConditionCard";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import ErrorComponent from "../../../components/ErrorComponent";
import AgreementCard from "./molecules/AgreementCard";

const InvestmentScreen = () => {
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Invest in PSC"} />}
      footerUnScrollable={() => (
        <View style={{ padding: 12 }}>
          <CustomButton
            title={"I understand and Want To Invest"}
            width="95%"
            marginBottom={12}
          />
        </View>
      )}
    >
      <CustomText
        label={"Define how much you want to invest below"}
        fontSize={24}
        fontFamily={fonts.semiBold}
        marginTop={8}
      />
      <CustomText
        label={
          "This is what you would get if you save your money in these banks. (APY Comparison)"
        }
        fontSize={14}
        color={"rgba(255, 255, 255, 0.64)"}
        marginTop={8}
      />

      <CountrySelectionCard />

      <AgreementCard />

      <ConditionCard />
    </ScreenWrapper>
  );
};

export default InvestmentScreen;

const styles = StyleSheet.create({});

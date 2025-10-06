import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import Header from "../../../../components/Header";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import CustomSwitch from "../../../../components/CustomSwitch";
import ErrorComponent from "../../../../components/ErrorComponent";
import CustomInput from "../../../../components/CustomInput";
import CustomButton from "../../../../components/CustomButton";
import SellerCard from "./SellerCard";

const Conplaint = () => {
  const tabs = [
    {
      id: 1,
      name: "Delivered with Delay",
      subname: "The delivery surpassed the delivery date.",
    },
    {
      id: 2,
      name: "Service Didn’t Match The Offer",
      subname:
        "The offer was clearly promoting a service and it wasn’t respected.",
    },
    {
      id: 3,
      name: "Service Wasn’t fully provided",
      subname: "Only part of the order was delivered.",
    },
    {
      id: 4,
      name: "Seller asked for extra charges",
      subname: "Invalid, unreasonable ask from the seller.",
    },
    {
      id: 5,
      name: "Seller was inappropriate, disrespectful",
      subname:
        "Had an altercation or dispute that went off limit during or after the service was delivered.",
    },
    {
      id: 6,
      name: "Seller damaged my items",
      subname:
        "Found out that one or multiple items were damaged after the service was delivered.",
    },
  ];
  const [switchStates, setSwitchStates] = useState(tabs.map(() => true));

  const toggleSwitch = (index, value) => {
    const updatedSwitchStates = [...switchStates];
    updatedSwitchStates[index] = value;
    setSwitchStates(updatedSwitchStates);
  };
  return (
    <ScreenWrapper
      scrollEnabled
      paddingBottom={20}
      headerUnScrollable={() => <Header title={"Order Issues"} />}
    >
      <CustomText
        fontSize={24}
        fontFamily={fonts.semiBold}
        label={"Seller"}
        lineHeight={24 * 1.4}
        marginBottom={14}
      />

      <SellerCard/>

      <View style={styles.border} />

      <CustomText
        fontSize={22}
        fontFamily={fonts.medium}
        label={"What was the issue?"}
        lineHeight={22 * 1.4}
      />

      {tabs.map((tab, i) => (
        <View key={tab.id || i}>
          <View style={styles.row}>
            <View style={{ width: "75%" }}>
              <CustomText
                label={tab?.name}
                fontSize={16}
                lineHeight={20}
                fontFamily={fonts.medium}
              />
              <CustomText label={tab?.subname} lineHeight={18} fontSize={12} />
            </View>

            <CustomSwitch
              value={switchStates[i]}
              setValue={(val) => toggleSwitch(i, val)}
            />
          </View>

          <ErrorComponent errorTitle={"Minimal rental period"} />
          <View style={styles.border} />
        </View>
      ))}

      <CustomInput
        value={"I have trip sickness and like little vehicle movement."}
        withLabel={"PLEASE PROVIDE MORE DETAILS"}
        multiline
        height={150}
        cardInfo={"0/200 characters."}
      />

      <View style={{ marginTop: 50, marginBottom: 14 }}>
        <CustomButton title={"Confirm & Submit"} marginBottom={8} />
        <CustomButton
          title={"Cancel"}
          backgroundColor={COLORS.lightGray}
          color={COLORS.primaryColor}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Conplaint;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  border: {
    width: "100%",
    height: 1,
    marginVertical: 24,
    backgroundColor: COLORS.lightGray,
  },
});

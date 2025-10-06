import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import Icons from "../../../components/Icons";
import CustomToggle from "../../../components/CustomToggle";
import fonts from "../../../assets/fonts";
import Border from "../../../components/Border";
import ToggleSwitch from "toggle-switch-react-native";
import CustomSwitch from "../../../components/CustomSwitch";

const PaymentSecurity = () => {
  const navigation = useNavigation();
  const [askPin, setAskPin] = useState(false);
  const [rejectCountry, setRejectCountry] = useState(false);

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Payment Security"} />}
    >
      <View style={styles.sectionHeader}>
        <CustomText
          label={"Use PIN code to pay"}
          fontSize={24}
          lineHeight={24 * 1.4}
          fontFamily={fonts.semiBold}
          color={COLORS.black}
        />
        <CustomText
          label={
            "Here you can enable additional checks.\nBut no matter how it is enabled, we will take care of security"
          }
          color={COLORS.gray1}
          lineHeight={12 * 1.6}
        />
      </View>

      {/* Enable PIN */}
      <View style={styles.block}>
        <View style={styles.rowBetween}>
          <CustomText
            label={"Enable PIN code request"}
            fontSize={16}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
          />
          <CustomText
            label={"Your PIN code will be asked when a payment is asked."}
            color={COLORS.gray1}
            lineHeight={14 * 1.6}
          />
        </View>
        <CustomSwitch value={askPin} setValue={setAskPin} />
      </View>

      {/* Define an amount */}
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.defineRow}
        onPress={() => navigation.navigate("DefineAmount")}
      >
        <View>
          <CustomText
            label={"Define an amount"}
            fontSize={16}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
          />
          <CustomText label={"Always ask"} lineHeight={14 * 1.4} />
        </View>

        <Icons
          name={"chevron-right"}
          family={"Feather"}
          size={22}
          color={COLORS.gray2}
        />
      </TouchableOpacity>

      <Border marginVertical={16} />

      {/* Reject payments if the country does not match */}
      <View style={[styles.block]}>
        <View style={styles.rowBetween}>
          <CustomText
            label={"Reject payments if the country does not match"}
            fontSize={16}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
          />
          <CustomText
            label={
              "We will compare the country in which the payment has been tried and where your main device’s location is."
            }
            color={COLORS.gray1}
            fontSize={14}
            lineHeight={14 * 1.6}
          />
        </View>
        <CustomSwitch value={rejectCountry} setValue={setRejectCountry} />
      </View>
    </ScreenWrapper>
  );
};

export default PaymentSecurity;

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 8,
    marginBottom: 32,
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowBetween: {
    width: "75%",
  },
  defineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    marginTop: 16,
  },
});

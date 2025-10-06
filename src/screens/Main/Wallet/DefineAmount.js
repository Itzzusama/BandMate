import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import Icons from "../../../components/Icons";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const OPTIONS = [
  { key: "always", label: "Always Ask" },
  { key: "20", label: "Do not ask up to $20" },
  { key: "40", label: "Do not ask up to $40" },
  { key: "100", label: "Do not ask up to $100" },
  { key: "200", label: "Do not ask up to $200" },
];

const DefineAmount = () => {
  const navigation = useNavigation();
  const [selectedKey, setSelectedKey] = useState(null);
  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      headerUnScrollable={() => <Header title={"Define An Amount"} />}
      footerUnScrollable={() => (
        <CustomButton
          marginBottom={16}
          width="90%"
          title={"Continue"}
          onPress={() => navigation.navigate("PaymentSecurity")}
        />
      )}
    >
      <View style={styles.info}>
        <Icons
          name={"info"}
          family={"Feather"}
          size={16}
          marginRight={8}
          color={COLORS.white}
        />
        <CustomText
          label={
            "Set up your Card Verification code to protect your bank account"
          }
          lineHeight={14 * 1.4}
          color={COLORS.white}
          width={"75%"}
        />
      </View>

      <View style={{ gap: 8 }}>
        {OPTIONS.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => setSelectedKey(item.key)}
          >
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <CustomText
                  label={item.label}
                  fontFamily={fonts.medium}
                  fontSize={16}
                  lineHeight={16 * 1.6}
                />
              </View>
              <Icons
                family="MaterialCommunityIcons"
                name={
                  selectedKey === item.key
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={24}
                color={
                  selectedKey === item.key ? COLORS.darkPurple : COLORS.gray2
                }
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default DefineAmount;

const styles = StyleSheet.create({
  info: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.darkPurple,
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderTopWidth: 1,
    borderColor: "#f6f6f6",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
});

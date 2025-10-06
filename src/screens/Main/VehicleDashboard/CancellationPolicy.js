import { useState } from "react";
import { StyleSheet, View } from "react-native";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomSwitch from "../../../components/CustomSwitch";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { useNavigation } from "@react-navigation/native";

const CancellationPolicy = () => {
  const navigation = useNavigation();

  const tabs = [
    {
      id: 1,
      name: "Flexible",
      subname: "Minimal rental period",
    },
    {
      id: 2,
      name: "Flexible or Non-Refundable",
      subname: "Minimal rental period",
    },
    {
      id: 3,
      name: "Moderate",
      subname: "Minimal rental period",
    },
    {
      id: 4,
      name: "Moderate or Non-Refundable",
      subname: "Minimal rental period",
    },
  ];

  const [switchStates, setSwitchStates] = useState({
    1: true,
    2: true,
    3: true,
    3: true,
  });

  return (
    <ScreenWrapper
      paddingBottom={12}
      headerUnScrollable={() => <Header title={"My Cancellation Policy"} />}
      footerUnScrollable={() => (
        <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
          <CustomButton title={"Confirm"} onPress={() => navigation.goBack()} />
          <CustomButton
            title={"Later"}
            backgroundColor={COLORS.lightGray}
            color={COLORS.primaryColor}
            marginTop={8}
          />
        </View>
      )}
    >
      <CustomText
        label={"Define A Cancellation Policy"}
        fontSize={24}
        fontFamily={fonts.semiBold}
        marginTop={12}
      />
      <CustomText
        label={
          "Users will be expected to follow this policy when booking from you."
        }
        color={COLORS.gray1}
        marginTop={-6}
      />
      {tabs.map((tab, i) => (
        <View
          key={tab.id}
          style={{
            marginTop: i === 0 ? 26 : 0, // Add top margin only for the first item
          }}
        >
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
              value={switchStates[tab.id]}
              setValue={(val) =>
                setSwitchStates((prev) => ({
                  ...prev,
                  [tab.id]: val,
                }))
              }
            />
          </View>

          <ErrorComponent errorTitle={"Minimal rental period"} />
          {i !== tabs.length - 1 && <View style={styles.border} />}
        </View>
      ))}
    </ScreenWrapper>
  );
};

export default CancellationPolicy;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  border: {
    width: "100%",
    height: 1,
    marginVertical: 20,
    backgroundColor: COLORS.lightGray,
  },
});

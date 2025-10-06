import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import ToggleCard from "./molecules/ToggleCard";
import CustomButton from "../../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const AccessibilityFeature = () => {
  const navigation = useNavigation();
  const initialSecurityFeatures = [
    { title: "Elevator", value: true },
    { title: "Wheel Chair Ramp", value: true },
  ];

  const [features, setFeatures] = useState(initialSecurityFeatures);

  const toggleFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures[index].value = !updatedFeatures[index].value;
    setFeatures(updatedFeatures);
  };

  return (
    <ScreenWrapper
      scrollEnabled
      paddingBottom={20}
      headerUnScrollable={() => <Header title={"Equipments"} />}
    >
      <CustomText
        label="Accessibility"
        fontSize={24}
        fontFamily={fonts.semiBold}
        color={COLORS.black}
        marginTop={10}
      />
      <CustomText
        label="You don’t have any messages yet."
        color={COLORS.gray1}
        marginBottom={16}
        marginTop={-6}
      />

      {features.map((item, index) => (
        <ToggleCard
          key={item.title}
          label={item.title}
          switchValue={item.value}
          setSwitchValue={() => toggleFeature(index)}
        />
      ))}
    </ScreenWrapper>
  );
};

export default AccessibilityFeature;

const styles = StyleSheet.create({});

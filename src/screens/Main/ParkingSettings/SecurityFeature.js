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

const SecurityFeature = () => {
  const navigation = useNavigation();
  const initialSecurityFeatures = [
    { title: "Gate", value: true },
    { title: "Manual Barriers", value: true },
    { title: "Automatic Barriers", value: true },
    { title: "Automatic Door", value: true },
    { title: "Emergency Phone", value: true },
    { title: "Fire Extinguisher", value: true },
    { title: "First Aid Medic Kit", value: true },
    { title: "Security Camera(s)", value: true },
    { title: "Security Guard(s)", value: true },
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
        label="Security"
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

      <CustomButton
        title="Accessibility Feature"
        marginTop={24}
        marginBottom={12}
        fontFamily={fonts.medium}
        onPress={() => navigation.navigate("AccessibilityFeature")}
      />
    </ScreenWrapper>
  );
};

export default SecurityFeature;

const styles = StyleSheet.create({});

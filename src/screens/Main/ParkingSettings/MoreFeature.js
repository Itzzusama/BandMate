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

const MoreFeature = () => {
  const navigation = useNavigation();
  const initialSecurityFeatures = [
    { title: "A/C (Air Condition)", value: true },
    {
      title: "Electric Chargers",
      value: true,
      subTitle: "Define Plug Type",
      isChange: true,
    },
    { title: "Sun Shades", value: true },
    { title: "Trash can(s)", value: true },
    { title: "Washing Station", value: true },
    { title: "Repair Tools", value: true },
    {
      title: "Wi-Fi Available",
      value: true,
      subTitle: "Inform password for a smooth customer experience.",
      isChange: true,
    },
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
        label="More Features"
        fontSize={24}
        fontFamily={fonts.medium}
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
          subTitle={item.subTitle}
          isChange={item.isChange}
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

export default MoreFeature;

const styles = StyleSheet.create({});

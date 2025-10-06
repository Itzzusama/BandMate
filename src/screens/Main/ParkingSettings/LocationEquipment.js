import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import ToggleCard from "./molecules/ToggleCard";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const LocationEquipment = () => {
  const navigation = useNavigation();
  const initialSecurityFeatures = [
    {
      id: 1,
      title: "Near Shopping Mall",
      value: true,
      borderBottomWidth: true,
    },
    { id: 2, title: "Near Public Transportation", value: true },
    {
      id: 3,
      title: "Near Cultural Sites Description",
      value: "The Classic Big Tasty is back!",
      withLabel: "GIVE MORE INFORMATION",
      cardInfo: "0/250 characters.",
    },
    { id: 3.1 },
    { id: 4, title: "Near Cultural Sites", value: true },
    {
      id: 5,
      title: "Other Location Info",
      value: "The Classic Big Tasty is back!",
      withLabel: "GIVE MORE INFORMATION",
      cardInfo: "0/250 characters.",
    },
  ];

  const [features, setFeatures] = useState(initialSecurityFeatures);

  const toggleFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures[index].value = !updatedFeatures[index].value;
    setFeatures(updatedFeatures);
  };

  const handleInputChange = (index, text) => {
    const updatedFeatures = [...features];
    updatedFeatures[index].value = text;
    setFeatures(updatedFeatures);
  };

  return (
    <ScreenWrapper
      scrollEnabled
      paddingBottom={20}
      headerUnScrollable={() => <Header title={"Equipments"} />}
      footerUnScrollable={() => (
        <CustomButton
          onPress={() => navigation.navigate("MoreFeature")}
          title={"More Feature"}
          width="90%"
        />
      )}
    >
      <CustomText
        label="Location Features"
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

      {features.map((item, index) =>
        item.id === 3 || item.id === 5 ? (
          <CustomInput
            key={item.id}
            value={item.value}
            onChangeText={(text) => handleInputChange(index, text)}
            withLabel={item.withLabel}
            cardInfo={item.cardInfo}
            multiline
            height={150}
            textAlignVertical={"top"}
          />
        ) : item.id == 3.1 ? (
          <View style={styles.border} />
        ) : (
          <ToggleCard
            key={item.id}
            label={item.title}
            switchValue={item.value}
            setSwitchValue={() => toggleFeature(index)}
            borderBottomWidth={item.borderBottomWidth}
            borderTopWidth={item.borderTopWidth}
          />
        )
      )}
    </ScreenWrapper>
  );
};

export default LocationEquipment;

const styles = StyleSheet.create({
  border: {
    height: 1,
    marginTop: 20,
    backgroundColor: COLORS.lightGray,
  },
});

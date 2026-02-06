import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import AdvanceSettingCard from "./molecules/AdvanceSettingCard";
import { useState } from "react";
import CustomModalGooglePlaces from "../../../components/CustomModalGooglePlaces";
import { useNavigation } from "@react-navigation/native";
const options = [
  {
    id: "currency",
    title: "Set Preferred Currency",
    des: "US Dollars",
  },
  {
    id: "language",
    title: "Set Preferred Language",
    des: "English US",
  },
  {
    id: "addressing",
    title: "Set Preferred Addressing",
    des: "Friendly",
  },
  {
    id: "services",
    title: "Service Providers Preference",
    des: "Both",
  },
  {
    id: "map",
    title: "Map",
    des: "Google Maps",
  },
  {
    id: "unit",
    title: "Units",
    des: "Metric",
  },
  {
    id: "temprature",
    title: "Temperature Scale",
    des: "Celsius (°C)",
  },
  {
    id: "first_DOW",
    title: "First Day of The Week",
    des: "Metric",
  },
  {
    id: "date_format",
    title: "Date Format",
    des: "DD/MM//YYYY",
  },
];
const AdvancedSettings = () => {
  return (
    <ScreenWrapper
      paddingBottom={0.1}
      paddingHorizontal={0.1}
      scrollEnabled
      headerUnScrollable={() => <Header title={"Advanced Settings"} />}
    >
      {options.map((item, index) => (
        <AdvanceSettingCard
          key={index}
          title={item.title}
          des={item.des}
          index={index}
          lastIndex={options.length - 1}
          onPress={() => {}}
        />
      ))}
    </ScreenWrapper>
  );
};

export default AdvancedSettings;

const styles = StyleSheet.create({});

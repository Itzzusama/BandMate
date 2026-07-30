import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AdvanceSettingCard from "./molecules/AdvanceSettingCard";

const defaultOptions = [
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
    des: "Metric (km, m2, kg)",
  },
  {
    id: "temprature",
    title: "Temperature Scale",
    des: "Celsius (°C)",
  },
  {
    id: "first_DOW",
    title: "First Day of The Week",
    des: "Monday",
  },
  {
    id: "date_format",
    title: "Date Format",
    des: "DD/MM//YYYY",
  },
];

const AdvancedSettings = ({ navigation }) => {
  const [selectedValues, setSelectedValues] = useState({
    addressing: "Friendly",
    unit: "Metric (km, m2, kg)",
    temprature: "Celsius (°C)",
    first_DOW: "Monday",
    date_format: "DD/MM//YYYY",
  });

  const handleCardPress = (item) => {
    switch (item.id) {
      case "addressing":
        navigation.navigate("PreferredAddressing", {
          selected: selectedValues.addressing,
          onSelect: (val) =>
            setSelectedValues((prev) => ({ ...prev, addressing: val })),
        });
        break;
      case "unit":
        navigation.navigate("PreferredUnits", {
          selected: selectedValues.unit,
          onSelect: (val) =>
            setSelectedValues((prev) => ({ ...prev, unit: val })),
        });
        break;
      case "temprature":
        navigation.navigate("TemperatureScale", {
          selected: selectedValues.temprature,
          onSelect: (val) =>
            setSelectedValues((prev) => ({ ...prev, temprature: val })),
        });
        break;
      case "first_DOW":
        navigation.navigate("FirstDayOfWeek", {
          selected: selectedValues.first_DOW,
          onSelect: (val) =>
            setSelectedValues((prev) => ({ ...prev, first_DOW: val })),
        });
        break;
      case "date_format":
        navigation.navigate("DateFormat", {
          selected: selectedValues.date_format,
          onSelect: (val) =>
            setSelectedValues((prev) => ({ ...prev, date_format: val })),
        });
        break;
      default:
        break;
    }
  };

  return (
    <ScreenWrapper
      paddingBottom={0.1}
      paddingHorizontal={0.1}
      scrollEnabled
      headerUnScrollable={() => <Header title={"Advanced Settings"} />}
    >
      {defaultOptions.map((item, index) => {
        const description = selectedValues[item.id] || item.des;
        return (
          <AdvanceSettingCard
            key={index}
            title={item.title}
            des={description}
            index={index}
            lastIndex={defaultOptions.length - 1}
            onPress={() => handleCardPress(item)}
          />
        );
      })}
    </ScreenWrapper>
  );
};

export default AdvancedSettings;

const styles = StyleSheet.create({});

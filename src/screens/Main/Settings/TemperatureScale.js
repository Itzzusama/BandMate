import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AdvanceSettingOptionCard from "./molecules/AdvanceSettingOptionCard";

const options = [
  {
    title: "Celsius (°C)",
    des: "E.g. 100km",
  },
  {
    title: "Fahrenheit (°F)",
    des: "E.g. 100mi",
  },
  {
    title: "Kelvin (°K)",
    des: "E.g. 100mi",
  },
  {
    title: "Reaumur (°Re)",
    des: "E.g. 100mi",
  },
  {
    title: "Rankine (°Ra)",
    des: "E.g. 100mi",
  },
];

const TemperatureScale = ({ navigation, route }) => {
  const initialSelected = route?.params?.selected || "Celsius (°C)";
  const [selected, setSelected] = useState(initialSelected);

  const handleSelect = (item) => {
    setSelected(item.title);
    if (route?.params?.onSelect) {
      route.params.onSelect(item.title);
    }
  };

  return (
    <ScreenWrapper
      paddingBottom={0.1}
      paddingHorizontal={0.1}
      scrollEnabled
      headerUnScrollable={() => (
        <Header title={"Temperature Scale"} />
      )}
    >
      {options.map((item, index) => (
        <AdvanceSettingOptionCard
          key={index}
          title={item.title}
          des={item.des}
          index={index}
          lastIndex={options.length - 1}
          isSelected={selected === item.title}
          onPress={() => handleSelect(item)}
        />
      ))}
    </ScreenWrapper>
  );
};

export default TemperatureScale;

const styles = StyleSheet.create({});

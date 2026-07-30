import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AdvanceSettingOptionCard from "./molecules/AdvanceSettingOptionCard";

const options = [
  {
    title: "DD/MM//YYYY",
    des: "E.g. 10/06/2026",
  },
  {
    title: "MM/DD/YYYY",
    des: "E.g. 06/25/2026",
  },
  {
    title: "YYYY/MM/DD",
    des: "E.g. 2026/06/25",
  },
];

const DateFormat = ({ navigation, route }) => {
  const initialSelected = route?.params?.selected || "DD/MM//YYYY";
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
        <Header title={"Date Format"} />
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

export default DateFormat;

const styles = StyleSheet.create({});

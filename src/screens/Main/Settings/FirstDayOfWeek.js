import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AdvanceSettingOptionCard from "./molecules/AdvanceSettingOptionCard";

const options = [
  {
    title: "Monday",
  },
  {
    title: "Saturday",
  },
  {
    title: "Sunday",
  },
];

const FirstDayOfWeek = ({ navigation, route }) => {
  const initialSelected = route?.params?.selected || "Monday";
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
        <Header title={"First Day of The Week"} />
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

export default FirstDayOfWeek;

const styles = StyleSheet.create({});

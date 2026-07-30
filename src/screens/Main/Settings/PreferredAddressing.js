import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AdvanceSettingOptionCard from "./molecules/AdvanceSettingOptionCard";

const options = [
  {
    title: "Friendly",
    des: "E.g. Hi Ana, how was your day?",
  },
  {
    title: "Corporate/Formal",
    des: "E.g. Hello Mr. Johnson, how was your day?",
  },
];

const PreferredAddressing = ({ navigation, route }) => {
  const initialSelected = route?.params?.selected || "Friendly";
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
        <Header title={"Set Preferred Addressing"} />
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

export default PreferredAddressing;

const styles = StyleSheet.create({});

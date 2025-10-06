import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { PNGIcons } from "../../../assets/images/icons";
import VehicleTopCard from "./molecules/VehicleTopCard";
import { COLORS } from "../../../utils/COLORS";
import Header from "../../../components/Header";
import MenuItem from "./molecules/MenuItem";
import { useNavigation } from "@react-navigation/native";

const PolicyAndRules = () => {
  const navigation = useNavigation();

  const array = [
    { id: 1, label: "General Rules", image: PNGIcons.key },
    {
      id: 2,
      label: "Cancellation policy",
      image: PNGIcons.myAvai,
      onPress: () => navigation.navigate("CancellationPolicy"),
    },
  ];
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Tesla Model 3"} />}
    >
      <View style={styles.border} />

      {/* <VehicleTopCard  /> */}

      <View style={styles.border} />

      {array?.map((item, index) => {
        return (
          <MenuItem
            key={index}
            imgSource={item.image}
            label={item.label}
            onCardPress={item?.onPress}
          />
        );
      })}

      <View style={styles.border} />
    </ScreenWrapper>
  );
};

export default PolicyAndRules;

const styles = StyleSheet.create({
  border: {
    height: 4,
    backgroundColor: COLORS.lightGray,
  },
});

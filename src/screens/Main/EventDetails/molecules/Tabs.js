import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["Overview", "Lineup", "Venue"];

  return (
    <View style={styles.row}>
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, isActive && styles.active]}
          >
            <CustomText
              label={tab}
              fontFamily={isActive ? fonts.medium : fonts.regular}
              fontSize={12}
              color={isActive ? COLORS.black : COLORS.white3}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginHorizontal: 12,
    marginVertical: 10,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: COLORS.cardColor,
    borderRadius: 99,
  },
  active: { backgroundColor: COLORS.white },
});
export default Tabs;

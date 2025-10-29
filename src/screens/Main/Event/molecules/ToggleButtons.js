import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";

const ToggleButtons = () => {
  const [selected, setSelected] = useState("Organizer");

  return (
    <View style={styles.container}>
      {["Organizer", "Community"].map((item) => {
        const isSelected = selected === item;
        return (
          <TouchableOpacity
            key={item}
            activeOpacity={0.8}
            style={[styles.btn, isSelected && styles.selectedBtn]}
            onPress={() => setSelected(item)}
          >
            <CustomText
              label={item}
              color={isSelected ? COLORS.black : COLORS.btnColor}
              fontSize={16}
              fontFamily={fonts.medium}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ToggleButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardColor,
    padding: 4,
    borderRadius: 100,
    marginHorizontal: 12,
    marginBottom: 14,
  },
  btn: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  selectedBtn: {
    backgroundColor: COLORS.btnColor,
  },
});

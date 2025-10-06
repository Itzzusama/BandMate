import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import CustomSwitch from "../../../../components/CustomSwitch";

const DayToggleCard = ({
  label1,
  backgroundColor,
  isEnabled,
  setIsEnabled,
  marginBottom
}) => {
  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: backgroundColor || COLORS.inputBg,
          marginBottom
        },
      ]}
    >
      <View>
        <CustomText
          label={label1}
          fontSize={12}
          fontFamily={fonts.medium}
          color={COLORS.gray4}
          textTransform={"uppercase"}
        />
        <CustomText
          label={isEnabled ? "Yes" : "No"}
          fontSize={16}
          fontFamily={fonts.medium}
        />
      </View>
      <CustomSwitch value={isEnabled} setValue={setIsEnabled} />
    </View>
  );
};

export default DayToggleCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    marginBottom: 8,
  },
});

import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const BalanceCard = ({ title, amount, subtitle, isActive = false }) => {
  return (
    <View style={[styles.container, isActive && styles.activeContainer]}>
      <CustomText
        label={title}
        fontFamily={fonts.medium}
        fontSize={18}
        lineHeight={18 * 1.4}
        color={isActive ? COLORS.white : COLORS.primaryColor}
        marginBottom={2}
      />

      <CustomText
        label={amount}
        fontFamily={fonts.medium}
        fontSize={14}
        lineHeight={14 * 1.4}
        color={isActive ? COLORS.white : "#262626"}
      />

      <CustomText
        label={subtitle}
        fontFamily={fonts.medium}
        fontSize={14}
        lineHeight={14 * 1.4}
        color={isActive ? COLORS.lightGray : "#262626"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderRadius: 16,
  },
  activeContainer: {
    backgroundColor: "#444444",
  },
});

export default BalanceCard;

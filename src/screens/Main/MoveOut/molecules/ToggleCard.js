import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import CustomSwitch from "../../../../components/CustomSwitch";

const ToggleCard = ({
  label1,
  backgroundColor,
  isEnabled = true,
  setIsEnabled,
}) => {
  // const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: backgroundColor || COLORS.inputBg,
        },
      ]}
    >
      <View>
        <CustomText
          label={label1}
          fontSize={12}
          lineHeight={12 * 1.4}
          fontFamily={fonts.medium}
          color={COLORS.gray4}
          textTransform="uppercase"
        />
        <CustomText
          label={isEnabled ? "Yes" : "No"}
          fontSize={16}
          lineHeight={16 * 1.4}
          fontFamily={fonts.medium}
        />
      </View>
      <CustomSwitch value={isEnabled} setValue={setIsEnabled} />
    </View>
  );
};

export default ToggleCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 12,
    marginBottom: 8,
    height: 56,
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
  },
});

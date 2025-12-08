import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../utils/COLORS";
import CustomSwitch from "../../../../components/CustomSwitch";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import ErrorComponent from "../../../../components/ErrorComponent";
const SwitchOption = ({
  value,
  setValue,
  lable = "DISABLE FRIENDLY?",
  error = "Offer accessibilty features for disable people.",
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <CustomText
            label={lable}
            fontFamily={fonts.medium}
            fontSize={12}
            textTransform={"uppercase"}
            lineHeight={12 * 1.4}
            color={COLORS.white3}
          />
          <CustomText
            label={value ? "Yes" : "No"}
            color={COLORS.white}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={12 * 1.4}
            marginTop={5}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <CustomSwitch value={value} setValue={setValue} />
        </View>
      </View>
      <ErrorComponent
        errorTitle={error}
        color={COLORS.white3}
        marginBottom={8}
      />
    </>
  );
};

export default SwitchOption;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 8,
    height: 56,
  },
});

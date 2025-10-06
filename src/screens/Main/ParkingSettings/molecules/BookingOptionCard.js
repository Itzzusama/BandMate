import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import CustomSwitch from "../../../../components/CustomSwitch";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import ErrorComponent from "../../../../components/ErrorComponent";
import CustomInput from "../../../../components/CustomInput";

const BookingOptionCard = ({
  label = "Gate",
  subTitle = "Define Plug Type",
  switchValue,
  setSwitchValue,
  borderBottomWidth = true,
  errorTitle,
  onChangeText,
  value,
  multiLine,
  input,
  withLabel,
  height,
}) => {
  return (
    <View
      style={{
        paddingVertical: 12,
        borderColor: COLORS.lightGray,
        borderBottomWidth: borderBottomWidth && 1,
      }}
    >
      <View style={styles.row}>
        <View style={{ width: "80%" }}>
          <CustomText label={label} fontFamily={fonts.medium} fontSize={16} />
          <CustomText
            label={subTitle}
            fontSize={12}
            color={COLORS.gray1}
            marginTop={-4}
            lineHeight={16}
          />
        </View>
        <CustomSwitch value={switchValue || true} setValue={setSwitchValue} />
      </View>

      <ErrorComponent
        errorTitle={errorTitle || "Most customers will pay extra for this."}
        marginBottom={input ? 8 : 4}
      />
      {input && (
        <CustomInput
          value={value}
          onChangeText={onChangeText}
          multiline={multiLine}
          withLabel={withLabel}
          height={height}
        />
      )}
    </View>
  );
};

export default BookingOptionCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderColor: COLORS.lightGray,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

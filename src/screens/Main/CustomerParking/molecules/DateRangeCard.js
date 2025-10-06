import { StyleSheet, View, Image } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import CustomDatePicker from "../../../../components/CustomDatePicker";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import Icons from "../../../../components/Icons";
import ErrorComponent from "../../../../components/ErrorComponent";

const DateRangeCard = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <CustomText
          label={"Custom Rental Period"}
          fontFamily={fonts.medium}
          fontSize={16}
          lineHeight={16 * 1.4}
        />

        <Icons name={"chevron-down"} size={20} />
      </View>
      <CustomDatePicker
        isIcon
        withLabel={"PICKUP DATE"}
        value={startDate}
        setValue={setStartDate}
        marginBottom={4}
      />
      <ErrorComponent
        errorTitle={"These are ETA made available by the Host."}
        marginBottom={8}
      />
      <CustomDatePicker
        isIcon
        withLabel={"RETURNING Date"}
        value={startDate}
        marginBottom={4}
        setValue={setStartDate}
      />
      <ErrorComponent
        marginBottom={8}
        errorTitle={"These are ETA made available by the Host."}
      />
    </View>
  );
};

export default DateRangeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrow: {
    height: 24,
    width: 24,
  },
});

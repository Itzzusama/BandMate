import { StyleSheet, View, Image } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import CustomDatePicker from "../../../../components/CustomDatePicker";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import Icons from "../../../../components/Icons";

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
      <View style={[styles.row, { marginTop: 12 }]}>
        <CustomDatePicker
          isIcon
          withLabel={"PICKUP DATE"}
          value={startDate}
          setValue={setStartDate}
          width={"49%"}
          marginBottom={8}
        />
        <CustomDatePicker
          isIcon
          withLabel={"DROP-OFF"}
          value={endDate}
          setValue={setEndDate}
          width={"49%"}
          marginBottom={8}
          type={"time"}
        />
      </View>
      <View style={[styles.row, { marginTop: 2 }]}>
        <CustomDatePicker
          isIcon
          withLabel={"RETURNING Date"}
          value={startDate}
          setValue={setStartDate}
          width={"49%"}
          marginBottom={8}
        />
        <CustomDatePicker
          isIcon
          withLabel={"DROP-OFF"}
          value={endDate}
          setValue={setEndDate}
          width={"49%"}
          marginBottom={8}
          type={"time"}
        />
      </View>
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


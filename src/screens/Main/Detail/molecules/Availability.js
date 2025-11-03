import { Image, StyleSheet, View } from "react-native";
import React from "react";
import InfoCard from "./InfoCard";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import EditButton from "./EditButton";

const data = ["Weekdays", "Weekends"];

const Availability = ({ myPage }) => {
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <View style={styles.rowContainer}>
        <CustomText
          label="Availability"
          fontFamily={fonts.medium}
          color={COLORS.white}
          fontSize={17}
          lineHeight={17 * 1.4}
        />
        {myPage && <EditButton />}
      </View>

      <View style={styles.row}>
        {data.map((item, index) => (
          <InfoCard key={index} name={item} />
        ))}
      </View>
    </View>
  );
};

export default Availability;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },
});

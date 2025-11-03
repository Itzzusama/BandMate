import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import InfoCard from "./InfoCard";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import EditButton from "./EditButton";

const data = ["Jam Sessions", "Studio time", "Concerts", "Band members"];

const LookingFor = ({ myPage }) => {
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <View style={styles.header}>
        <CustomText
          label="Looking for"
          fontFamily={fonts.medium}
          color={COLORS.white}
          fontSize={17}
          lineHeight={17 * 1.4}
        />
        {myPage && <EditButton />}
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={styles.row}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <InfoCard key={index} name={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default LookingFor;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",

    gap: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 2,
  },
});

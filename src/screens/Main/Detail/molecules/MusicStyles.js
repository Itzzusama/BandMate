import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import InfoCard from "./InfoCard";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";

import EditButton from "./EditButton";
import { useSelector } from "react-redux";

const MusicStyles = ({ myPage, userData }) => {
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <View style={styles.flexRow}>
        <CustomText
          label="Music style"
          fontFamily={fonts.medium}
          color={COLORS.white}
          fontSize={17}
          lineHeight={17 * 1.4}
        />
        {myPage && <EditButton />}
      </View>

      <ScrollView
        contentContainerStyle={styles.row}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {userData?.Genres?.map((item, index) => (
          <InfoCard key={index} name={item} showIcon type="music" />
        ))}
      </ScrollView>
    </View>
  );
};

export default MusicStyles;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",

    gap: 4,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

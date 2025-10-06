import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";

const TripSpotInfo = () => {
  return (
    <View style={styles.card}>
      <CustomText
        lineHeight={14 * 1.4}
        color={"#FFFFFF7A"}
        label={"DID YOU KNOW"}
        fontFamily={fonts.medium}
      />
      <CustomText
        fontSize={20}
        color={COLORS.white}
        lineHeight={20 * 1.4}
        label={
          "Geneva is home to the headquarters of the United Nations in Europe and is where the Red Cross was founded."
        }
        fontFamily={fonts.medium}
      />
    </View>
  );
};

export default TripSpotInfo;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#23342E",
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
});

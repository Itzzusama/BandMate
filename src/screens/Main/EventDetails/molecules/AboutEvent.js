import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";

const AboutEvent = () => {
  return (
    <View style={styles.container}>
      <CustomText
        label={"About This Event"}
        fontFamily={fonts.semiBold}
        fontSize={22}
        lineHeight={22 * 1.4}
      />
      <CustomText
        label={
          "Experience the magic of live music at our Summer Music Festival 2026. This year's lineup features an incredible mix of established and emerging artists across multiple genres. From indie rock to electronic dance music, there's something for every music lover."
        }
        fontFamily={fonts.medium}
        fontSize={14}
        lineHeight={14 * 1.4}
        color={COLORS.white2}
      />
    </View>
  );
};

export default AboutEvent;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingTop: 8,
  },
});

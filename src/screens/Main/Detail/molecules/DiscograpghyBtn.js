import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";

const DiscograpghyBtn = () => {
  return (
    <View style={styles.btn}>
      <CustomText
        label={"See discography"}
        fontSize={11}
        fontFamily={fonts.medium}
        lineHeight={11 * 1.4}
      />
    </View>
  );
};

export default DiscograpghyBtn;

const styles = StyleSheet.create({
  btn: {
    borderColor: COLORS.cardColor,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginVertical: 8,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 99,
  },
});

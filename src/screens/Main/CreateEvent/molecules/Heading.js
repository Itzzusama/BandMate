import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";

const Heading = ({ lable, showIcon = false }) => {
  return (
    <View style={styles.container}>
      {showIcon && <Image source={Images.LocationPin} style={styles.icon} />}

      <CustomText
        label={lable}
        fontFamily={fonts.medium}
        fontSize={18}
        lineHeight={18 * 1.4}
      />
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 16,
  },
  icon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
});

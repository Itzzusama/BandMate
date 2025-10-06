import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Images } from "../../../../assets/images";
import ImageFast from "../../../../components/ImageFast";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const TopCarCard = ({ name, count }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.vehicleItem}>
      <CustomText
        label={name}
        fontSize={10}
        lineHeight={10 * 1.4}
        fontFamily={fonts.medium}
        marginTop={6}
      />
      <CustomText
        label={count}
        fontSize={10}
        lineHeight={10 * 1.4}
        color={COLORS.gray2}
      />
      <ImageFast
        source={Images.carModal3d}
        style={{ height: 56, width: 84, alignSelf: "center" }}
        resizeMode={"contain"}
      />
    </TouchableOpacity>
  );
};

export default TopCarCard;

const styles = StyleSheet.create({
  vehicleItem: {
    width: "23.5%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 8,
    marginRight: 6,
    marginBottom: 6,
  },
});

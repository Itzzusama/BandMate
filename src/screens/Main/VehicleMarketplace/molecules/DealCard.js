import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageFast from "../../../../components/ImageFast";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import { Images } from "../../../../assets/images";
import fonts from "../../../../assets/fonts";

const DealCard = ({ isChange }) => {
  return (
    <View style={{ padding: 12, alignItems: "center" }}>
      <ImageFast
        style={{
          height: isChange ? 128 : 96,
          width: isChange ? 128 : 96,
          borderRadius: 99,
        }}
        source={Images.charity}
      />

      <CustomText
        marginTop={8}
        label={"Event Name"}
        fontFamily={fonts.medium}
        fontSize={12}
        lineHeight={12 * 1.4}
      />
      <CustomText
        label={"& 3 others"}
        fontSize={10}
        color={COLORS.gray1}
        lineHeight={10 * 1.4}
      />
    </View>
  );
};

export default DealCard;

const styles = StyleSheet.create({});

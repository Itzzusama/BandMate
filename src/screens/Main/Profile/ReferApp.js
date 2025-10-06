import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import ImageFast from "../../../components/ImageFast";
import { Images } from "../../../assets/images";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";

const ReferApp = () => {
  return (
    <ScreenWrapper paddingHorizontal={0.1}>
      <ImageFast source={Images.charity} style={styles.image} />
      <View style={styles.mainContainer}>
        <CustomText
          label={"Get $15 off when you refer someone"}
          fontFamily={fonts.semiBold}
          fontSize={18}
          marginTop={12}
        />
        <CustomText
          label={"Friends don't let friends miss out on this first-time offer"}
          fontSize={12}
          marginBottom={12}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ReferApp;

const styles = StyleSheet.create({
  image: {
    height: 240,
    width: "100%",
  },
  mainContainer: {
    paddingHorizontal: 12,
  },
});

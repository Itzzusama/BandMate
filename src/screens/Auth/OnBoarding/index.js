import React from "react";
import { Dimensions, StyleSheet, View, Platform, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { PNGIcons } from "../../../assets/images/icons";

const { width, height } = Dimensions.get("window");
const slideHeight = height / 1.5 - 20;

const OnBoarding = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <ScreenWrapper
        paddingHorizontal={0.1}
        statusBarColor="transparent"
        barStyle="light-content"
        backgroundImage={Images.startBg}
        translucent
      >
        <View style={styles.topContainer}>
          <Image
            source={Images.userPics}
            style={{
              height: 338,
              width: width,
            }}
            resizeMode="stretch"
          />
        </View>

        <View style={styles.container}>
          <View
            style={{
              paddingHorizontal: 12,
              marginBottom: Platform.OS == "android" ? 30 : 26,
            }}
          >
            <Image source={PNGIcons.logo} style={styles.logo} />
            <CustomText
              label={"Where True\nLegends meet"}
              fontSize={30}
              fontFamily={fonts.medium}
              color={COLORS.white}
              lineHeight={27 * 1.4}
              marginBottom={48}
              alignSelf={"center"}
              textAlign={"center"}
            />

            <CustomButton
              title="Continue With Sola"
              backgroundColor={COLORS.white}
              color={COLORS.black}
              marginBottom={10}
              leftView
            />

            <CustomButton
              title="Create an Account"
              isBoarder
              borderColor={"#FFFFFF29"}
              color={COLORS.white}
              backgroundColor={"#FFFFFF14"}
              onPress={() => navigation.navigate("SignUpScreens")}
            />
          </View>
        </View>
      </ScreenWrapper>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000", // keeps background black to avoid flash
  },
  topContainer: {
    width: width,
    alignItems: "center",
    height: 338,
  },
  container: {
    width: width,
    justifyContent: "flex-end",
    height: height - slideHeight + 16,
    padding: 10,
    bottom: 60,
    position: "absolute",
  },
  logo: {
    height: 44,
    width: 44,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 18,
  },
});

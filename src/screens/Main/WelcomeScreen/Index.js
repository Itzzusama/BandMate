import { ImageBackground, Platform, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const userData = useSelector((userData) => userData.users.userData);

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainStack" }],
      });
    }, 2000);
  }, []);

  return (
    <ImageBackground
      source={Images.onBordingBlur}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <ImageFast
          source={Images.logo}
          style={
            Platform.OS == "android"
              ? { height: 28, width: 210, marginBottom: 48 }
              : { height: 36, width: 218, marginBottom: 48 }
          }
          resizeMode="contain"
        />
        <ImageFast
          source={Images.user}
          style={styles.image}
          resizeMode="contain"
        />
        <CustomText
          label={`${
            userData?.nameDisplayPreference === "first" ? "Hi" : "Hello"
          }${
            userData?.nameDisplayPreference === "sur"
              ? userData?.gender === "FEMALE"
                ? "Ms."
                : "Mr."
              : ""
          } ${
            userData?.nameDisplayPreference === "first"
              ? userData?.first_name
              : userData?.sur_name
          }`}
          marginTop={16}
          lineHeight={24 * 1.4}
          fontSize={24}
          fontFamily={fonts.medium}
          color={COLORS.white}
          marginBottom={24}
        />
        <CustomButton
          title=" Welcome back!"
          width={206}
          bgBlur
          height={46}
          textTransform={"default"}

          // onPress={() =>
          //   navigation.reset({
          //     index: 0,
          //     routes: [{ name: "MainStack" }],
          //   })
          // }
        />
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 4,
    padding: 4,
    borderColor: COLORS.white,
  },
});

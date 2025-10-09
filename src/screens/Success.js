import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ScreenWrapper from "../components/ScreenWrapper";
import { PNGIcons } from "../assets/images/icons";
import CustomButton from "../components/CustomButton";
import { COLORS } from "../utils/COLORS";
import CustomText from "../components/CustomText";
import fonts from "../assets/fonts";
import Icons from "../components/Icons";

const Success = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainStack" }],
      });
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenWrapper>
      <View style={styles.alignItems}>
        <Image source={PNGIcons.logo} style={styles.logo} />
      </View>

      <View style={styles.secondContainer}>
        <Icons
          family={"Ionicons"}
          name={"checkmark-circle"}
          size={65}
          color={COLORS.white}
        />

        <CustomText
          label="You’re all set!"
          fontFamily={fonts.semiBold}
          fontSize={32}
          lineHeight={32 * 1.4}
          marginTop={22}
          marginBottom={2}
        />

        <CustomText
          label={"Let’s get some new\ncontracts now."}
          color={COLORS.white2}
          fontSize={15}
          lineHeight={15 * 1.4}
          fontFamily={fonts.medium}
          textAlign={"center"}
          marginBottom={48}
        />

        <CustomButton
          title="Start Matching!"
          backgroundColor={COLORS.white}
          color={COLORS.black}
          marginBottom={8}
          height={44}
          width={213}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "MainStack" }],
            })
          }
        />
      </View>

      <View style={{ flex: 1 }} />
    </ScreenWrapper>
  );
};

export default Success;

const styles = StyleSheet.create({
  logo: {
    height: 44,
    width: 44,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 75,
  },
  secondContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

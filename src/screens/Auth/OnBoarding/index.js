import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { PNGIcons } from "../../../assets/images/icons";
import { OnBoardingImages } from "../../../assets/images/onBoarding";

const { width, height } = Dimensions.get("window");
const slideHeight = height / 1.5 - 20;

const row1 = [
  OnBoardingImages.imag1,
  OnBoardingImages.imag2,
  OnBoardingImages.imag3,
  OnBoardingImages.imag4,
];
const row2 = [
  OnBoardingImages.imag6,
  OnBoardingImages.imag7,
  OnBoardingImages.imag8,
  OnBoardingImages.imag9,
  OnBoardingImages.imag10,
];

const OnBoarding = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateRow1 = useRef(new Animated.Value(0)).current;
  const translateRow2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  // First row animation
  useEffect(() => {
    translateRow1.setValue(0);
    const createAnimation = () => {
      return Animated.sequence([
        Animated.timing(translateRow1, {
          toValue: -width,
          duration: 20000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateRow1, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]);
    };

    Animated.loop(createAnimation()).start();

    return () => {
      translateRow1.stopAnimation();
    };
  }, []);

  useEffect(() => {
    translateRow2.setValue(0);
    const createAnimation = () => {
      return Animated.sequence([
        Animated.timing(translateRow2, {
          toValue: width,
          duration: 20000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateRow2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]);
    };

    Animated.loop(createAnimation()).start();

    return () => {
      translateRow2.stopAnimation();
    };
  }, []);

  const renderImageRow = (images, translateAnim, direction = "left") => {
    const tripleImages = [...images, ...images, ...images];
    const isLeftToRight = direction === "left";

    return (
      <Animated.View
        style={[
          styles.imageRow,
          {
            transform: [{ translateX: translateAnim }],
            flexDirection: isLeftToRight ? "row" : "row-reverse",
          },
        ]}
      >
        {tripleImages.map((img, i) => (
          <Image
            key={i}
            source={img}
            style={styles.carouselImage}
            resizeMode="cover"
          />
        ))}
      </Animated.View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ScreenWrapper
        paddingHorizontal={0.1}
        statusBarColor="transparent"
        barStyle="light-content"
        translucent
        paddingBottom={0.1}
      >
        <LinearGradient
          colors={[
            "#121212",
            "#121212",
            "#121212",
            "#121212",
            "#962402",
            "#962402",
          ]}
          style={styles.gradientBackground}
        >
          <Animated.View
            pointerEvents="none"
            style={[styles.absoluteFill, { opacity: fadeAnim }]}
          >
            <LinearGradient
              colors={["#121212", "#121212", "#121212", "#962402", "#F27800"]}
              useAngle
              angle={144}
              locations={[0, 0.43, 0.69, 0.88, 1]}
              style={styles.gradientBackground}
            />
          </Animated.View>

          <View style={styles.carouselContainer}>
            <View style={styles.imageRowWrapper}>
              {renderImageRow(row1, translateRow1, "left")}
            </View>
            <View style={[styles.imageRowWrapper, { marginTop: 10 }]}>
              {renderImageRow(row2, translateRow2, "right")}
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.contentWrapper}>
              <Image source={PNGIcons.logo} style={styles.logo} />
              <CustomText
                label={"Where True\nLegends meet"}
                fontSize={30}
                fontFamily={fonts.medium}
                color={COLORS.white}
                lineHeight={30 * 1.4}
                alignSelf="center"
                textAlign="center"
                marginBottom={28}
              />

              <CustomButton
                title="Continue With Sola"
                backgroundColor={COLORS.white}
                color={COLORS.black}
                marginBottom={8}
                leftView={<Image source={PNGIcons.sola} style={styles.icon} />}
                onPress={() => navigation.navigate("Login")}
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
        </LinearGradient>
      </ScreenWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  gradientBackground: {
    flex: 1,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  carouselContainer: {
    position: "absolute",
    top: 0,
    width: width,
    height: 340,
    overflow: "hidden",
  },
  imageRowWrapper: {
    height: 160,
    overflow: "hidden",
    position: "relative",
  },
  imageRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  carouselImage: {
    width: 96,
    height: 160,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  container: {
    width: width,
    justifyContent: "flex-end",
    height: height - slideHeight + 16,
    padding: 10,
    bottom: 50,
    position: "absolute",
  },
  contentWrapper: {
    paddingHorizontal: 12,
  },
  logo: {
    height: 44,
    width: 44,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 12,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 8,
  },
});

export default OnBoarding;

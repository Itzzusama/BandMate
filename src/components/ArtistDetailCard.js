import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ImageFast from "./ImageFast";
import CustomText from "./CustomText";
import fonts from "../assets/fonts";
import { COLORS } from "../utils/COLORS";
import { PNGIcons } from "../assets/images/icons";
import { Images } from "../assets/images";
import AuthSlider from "./Auth/AuthSlider";
import Icons from "./Icons";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ArtistDetailCard = () => {
  // --- animation refs ---
  const navigation = useNavigation();
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotateCard = useRef(new Animated.Value(0)).current;
  const gradientOpacity = useRef(new Animated.Value(0)).current;
  const gradientTranslateY = useRef(new Animated.Value(200)).current;
  const [currentGradientColors, setCurrentGradientColors] = useState([
    "transparent",
    "transparent",
  ]);

  const buttonActions = [
    { colors: ["#F41857", "#F4185700"], direction: "left", rotation: -8 }, // red
    { colors: ["#007AFE", "#007AFE00"], direction: "up", rotation: 0 }, // blue
    { colors: ["#1ED760", "#1ED76000"], direction: "right", rotation: 8 }, // green
  ];

  const handleButtonPress = (index) => {
    const action = buttonActions[index];
    setCurrentGradientColors(action.colors);
    gradientTranslateY.setValue(200);

    // Show gradient flash animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(gradientOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(gradientTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(gradientOpacity, {
        toValue: 0.7,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      const animations = [];
      if (action.direction === "left") {
        animations.push(
          Animated.timing(translateX, {
            toValue: -screenWidth * 1.5,
            duration: 400,
            useNativeDriver: true,
          })
        );
        animations.push(
          Animated.timing(rotateCard, {
            toValue: action.rotation,
            duration: 400,
            useNativeDriver: true,
          })
        );
      } else if (action.direction === "right") {
        animations.push(
          Animated.timing(translateX, {
            toValue: screenWidth * 1.5,
            duration: 400,
            useNativeDriver: true,
          })
        );
        animations.push(
          Animated.timing(rotateCard, {
            toValue: action.rotation,
            duration: 400,
            useNativeDriver: true,
          })
        );
      } else if (action.direction === "up") {
        animations.push(
          Animated.timing(translateY, {
            toValue: -screenHeight * 1.5,
            duration: 400,
            useNativeDriver: true,
          })
        );
      }

      Animated.parallel(animations).start(() => {
        setTimeout(() => {
          resetCardPosition();
        }, 100);
      });
    }, 400);
  };

  const resetCardPosition = () => {
    translateX.setValue(0);
    translateY.setValue(0);
    rotateCard.setValue(0);
    gradientOpacity.setValue(0);
    gradientTranslateY.setValue(200);
    setCurrentGradientColors(["transparent", "transparent"]);
  };

  const cardRotation = rotateCard.interpolate({
    inputRange: [-15, 0, 15],
    outputRange: ["-15deg", "0deg", "15deg"],
  });

  return (
    <View>
      <Animated.View
        style={[
          styles.cardWrapper,
          {
            transform: [
              { translateX },
              { translateY },
              { rotate: cardRotation },
            ],
          },
        ]}
      >
        <ImageFast source={Images.artist} style={styles.imgStyle}>
          <LinearGradient
            colors={["#14141499", "#14141440", "#60606000"]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={styles.bottomGradient}
          />
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Image
                source={PNGIcons.tr_back}
                style={{ height: 40, width: 40 }}
              />
            </TouchableOpacity>

            <Image source={PNGIcons.qr} style={{ height: 48, width: 48 }} />
          </View>
          <View style={styles.innerContainer}>
            <CustomText
              label={"Viktor, 28"}
              fontSize={44}
              lineHeight={44 * 1.4}
              fontFamily={fonts.abril}
            />
            <View style={styles.locationRow}>
              <Image source={PNGIcons.pin} style={styles.pinIcon} />
              <CustomText
                label={"Los Angeles, CA"}
                fontSize={12}
                lineHeight={12 * 1.4}
                fontFamily={fonts.medium}
                marginLeft={3}
              />
              <CustomText
                label={"33 km"}
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.white2}
                fontFamily={fonts.medium}
                marginLeft={4}
              />
            </View>
            <View style={styles.genrePill}>
              <Icons
                family={"Ionicons"}
                name={"person-sharp"}
                color={COLORS.white}
                size={9}
              />
              <CustomText
                label={"Solo Artist"}
                fontFamily={fonts.medium}
                fontSize={12}
                lineHeight={12 * 1.4}
                marginLeft={4}
              />
            </View>
            <AuthSlider
              min={1}
              max={4}
              marginBottom={10}
              marginTop={12}
              showLeftSpace
            />
          </View>

          <Animated.View
            style={[
              styles.gradientOverlay,
              {
                opacity: gradientOpacity,
                transform: [{ translateY: gradientTranslateY }],
              },
            ]}
            pointerEvents="none"
          >
            <LinearGradient
              colors={currentGradientColors}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              style={styles.gradientFill}
            />
          </Animated.View>
        </ImageFast>
      </Animated.View>

      <View style={styles.bottomContainer}>
        {[PNGIcons.btn2, PNGIcons.btn3, PNGIcons.btn4]?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleButtonPress(index)}
            activeOpacity={0.8}
          >
            <ImageFast
              source={item}
              removeLoading
              style={[styles.btnStyle, styles.largeBtn]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ArtistDetailCard;

const styles = StyleSheet.create({
  cardWrapper: {
    width: "100%",
  },
  imgStyle: {
    width: "100%",
    height: 390,
    resizeMode: "cover",
  },
  innerContainer: {
    justifyContent: "flex-end",
    flex: 1,
    padding: 12,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  genrePill: {
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 4,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,

    overflow: "hidden",
  },
  gradientFill: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    padding: 12,
    gap: 20,
  },
  btnStyle: {
    resizeMode: "contain",
  },
  largeBtn: {
    height: 48,
    width: 48,
  },

  bottomGradient: {
    ...StyleSheet.absoluteFillObject,

    bottom: 0,
  },
  pinIcon: {
    height: 12,
    width: 12,
    tintColor: COLORS.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 12,
  },
});

import {
  StyleSheet,
  Image,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import ImageFast from "../../../../components/ImageFast";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import { Images } from "../../../../assets/images";
import AuthSlider from "../../../../components/Auth/AuthSlider";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const HomeCard = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotateCard = useRef(new Animated.Value(0)).current;
  const gradientOpacity = useRef(new Animated.Value(0)).current;
  const gradientTranslateY = useRef(new Animated.Value(200)).current; // Start from bottom
  const [currentGradientColors, setCurrentGradientColors] = useState([
    "transparent",
    "transparent",
  ]);

  const buttonActions = [
    {
      colors: ["#FF4B4B", "#FF4B4B00"],
      direction: "left",
      rotation: -15,
    },
    {
      colors: ["#F41857", "#F4185700"],
      direction: "left",
      rotation: -8,
    },
    {
      colors: ["#007AFE", "#007AFE00"],
      direction: "up",
      rotation: 0,
    },
    {
      colors: ["#1ED760", "#1ED76000"],
      direction: "right",
      rotation: 8,
    },
    {
      colors: ["#8400E7", "#8400E700"],
      direction: "right",
      rotation: 15,
    },
  ];

  const handleButtonPress = (index) => {
    const action = buttonActions[index];

    // Set gradient colors
    setCurrentGradientColors(action.colors);

    // Reset gradient position to bottom before animation
    gradientTranslateY.setValue(200);

    // Animate gradient appearance from bottom to top
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

    // Animate card movement after a short delay
    setTimeout(() => {
      const animations = [];

      if (action.direction === "left") {
        animations.push(
          Animated.timing(translateX, {
            toValue: -screenWidth * 1.5,
            duration: 500,
            useNativeDriver: true,
          })
        );
        animations.push(
          Animated.timing(rotateCard, {
            toValue: action.rotation,
            duration: 500,
            useNativeDriver: true,
          })
        );
      } else if (action.direction === "right") {
        animations.push(
          Animated.timing(translateX, {
            toValue: screenWidth * 1.5,
            duration: 500,
            useNativeDriver: true,
          })
        );
        animations.push(
          Animated.timing(rotateCard, {
            toValue: action.rotation,
            duration: 500,
            useNativeDriver: true,
          })
        );
      } else if (action.direction === "up") {
        animations.push(
          Animated.timing(translateY, {
            toValue: -screenHeight * 1.5,
            duration: 500,
            useNativeDriver: true,
          })
        );
      }

      Animated.parallel(animations).start(() => {
        // Reset position after animation (you might want to trigger next card here)
        setTimeout(() => {
          resetCardPosition();
        }, 100);
      });
    }, 500);
  };

  const resetCardPosition = () => {
    // Reset all animations
    translateX.setValue(0);
    translateY.setValue(0);
    rotateCard.setValue(0);
    gradientOpacity.setValue(0);
    gradientTranslateY.setValue(200); // Reset to bottom position
    setCurrentGradientColors(["transparent", "transparent"]);

    // Here you would typically load the next card
    // onNextCard && onNextCard();
  };

  const cardRotation = rotateCard.interpolate({
    inputRange: [-15, 0, 15],
    outputRange: ["-15deg", "0deg", "15deg"],
  });

  return (
    <LinearGradient
      colors={["#1E2C2D", "#121212"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
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
        <ImageFast source={PNGIcons.bandImage} style={styles.image}>
          <View style={styles.innerContainer}>
            <View style={styles.headerRow}>
              <View style={styles.row}>
                <Image source={Images.verifyStar} style={styles.verifyStar} />
                <CustomText
                  label={"VERIFIED SOLO ARTIST"}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  marginLeft={4}
                />
              </View>
              <View style={styles.bg}>
                <CustomText
                  label={"64%"}
                  fontFamily={fonts.semiBold}
                  lineHeight={14 * 1.4}
                />
              </View>
            </View>

            {/* footer */}
            <View>
              <CustomText
                label={"Myles, 27"}
                fontSize={44}
                lineHeight={44 * 1.4}
                fontFamily={fonts.abril}
              />

              <View style={styles.locationRow}>
                <Image source={PNGIcons.pin} style={styles.pinIcon} />
                <CustomText
                  label={"Austin, US"}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  fontFamily={fonts.medium}
                  marginLeft={3}
                />
                <CustomText
                  label={"17 km"}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  color={COLORS.white2}
                  fontFamily={fonts.medium}
                  marginLeft={4}
                />
              </View>

              <CustomText
                label={"528 monthly profile views"}
                fontSize={11}
                fontFamily={fonts.medium}
                marginTop={8}
              />

              <View style={styles.genreRow}>
                <View style={styles.genrePill}>
                  <CustomText
                    label={"Blue"}
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                  />
                </View>
                <View style={styles.genrePill}>
                  <CustomText
                    label={"Rock"}
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                  />
                </View>
                <View style={styles.genrePill}>
                  <CustomText
                    label={"Soul"}
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                  />
                </View>
              </View>

              <View style={styles.footerRow}>
                <CustomText
                  label={
                    "Lead guitarist looking for a band. Into classic rock and blues."
                  }
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  fontFamily={fonts.medium}
                />
                <Image source={PNGIcons.forward} style={styles.forwardIcon} />
              </View>

              <AuthSlider min={1} max={4} marginBottom={20} marginTop={12} />
            </View>
          </View>

          {/* Animated Gradient Overlay */}
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
              start={{ x: 0.5, y: 1 }} // Start from bottom
              end={{ x: 0.5, y: 0 }} // End at top
              style={styles.gradientFill}
            />
          </Animated.View>
        </ImageFast>
      </Animated.View>

      <View style={styles.bottomContainer}>
        {[
          PNGIcons.btn1,
          PNGIcons.btn2,
          PNGIcons.btn3,
          PNGIcons.btn4,
          PNGIcons.btn5,
        ]?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleButtonPress(index)}
            activeOpacity={0.8}
          >
            <ImageFast
              source={item}
              removeLoading
              style={[
                styles.btnStyle,
                index === 0 || index === 4 ? styles.smallBtn : styles.largeBtn,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    marginTop: 16,
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  cardWrapper: {
    width: "100%",
  },
  image: {
    height: 580,
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  innerContainer: {
    padding: 14,
    justifyContent: "space-between",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  verifyStar: {
    height: 24,
    width: 24,
  },
  bg: {
    backgroundColor: "#FFFFFF29",
    borderRadius: 99,
    borderWidth: 1,
    borderColor: COLORS.white3,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  pinIcon: {
    height: 12,
    width: 12,
    tintColor: COLORS.white,
  },
  genreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 12,
  },
  genrePill: {
    borderRadius: 99,
    backgroundColor: "#262626A3",
    padding: 4,
    paddingHorizontal: 12,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  forwardIcon: {
    height: 28,
    width: 28,
    tintColor: COLORS.white2,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    padding: 12,
    gap: 16,
  },
  btnStyle: {
    resizeMode: "contain",
  },
  smallBtn: {
    height: 48,
    width: 48,
  },
  largeBtn: {
    height: 56,
    width: 56,
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200, // Fixed height
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: "hidden",
  },
  gradientFill: {
    flex: 1,
  },
});

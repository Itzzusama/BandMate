import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  PanResponder,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import AuthSlider from "../../../../components/Auth/AuthSlider";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const HomeCard = () => {
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

  // New animated values for gesture handling
  const pan = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;

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

  const handleSwipe = (direction) => {
    let index;
    switch (direction) {
      case "left":
        index = 1; // Using the second left action for swipe left
        break;
      case "right":
        index = 3; // Using the first right action for swipe right
        break;
      case "up":
        index = 2; // Using the up action for swipe up
        break;
      default:
        return;
    }
    handleButtonPress(index);
  };

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
    pan.setValue({ x: 0, y: 0 });
    rotate.setValue(0);
  };

  // PanResponder for gesture handling
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to significant moves to avoid interfering with button presses
        return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        const { dx, dy } = gestureState;
        
        // Update position
        pan.setValue({ x: dx, y: dy });
        
        // Add rotation based on horizontal movement for better visual feedback
        const rotation = dx * 0.1; // Adjust this value for more/less rotation
        rotate.setValue(rotation);
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx, dy, vx, vy } = gestureState;
        const swipeThreshold = 50; // Minimum distance to consider it a swipe
        const velocityThreshold = 0.5; // Minimum velocity to consider it a swipe

        // Check if it's a left swipe
        if (dx < -swipeThreshold || vx < -velocityThreshold) {
          Animated.parallel([
            Animated.timing(pan, {
              toValue: { x: -screenWidth * 2, y: dy },
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(rotate, {
              toValue: -15,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            handleSwipe("left");
          });
        }
        // Check if it's a right swipe
        else if (dx > swipeThreshold || vx > velocityThreshold) {
          Animated.parallel([
            Animated.timing(pan, {
              toValue: { x: screenWidth * 2, y: dy },
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(rotate, {
              toValue: 15,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            handleSwipe("right");
          });
        }
        // Check if it's an upward swipe
        else if (dy < -swipeThreshold || vy < -velocityThreshold) {
          Animated.timing(pan, {
            toValue: { x: dx, y: -screenHeight * 2 },
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            handleSwipe("up");
          });
        }
        // If not a swipe, return to original position
        else {
          Animated.parallel([
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
              friction: 5,
              tension: 40,
            }),
            Animated.spring(rotate, {
              toValue: 0,
              useNativeDriver: true,
              friction: 5,
              tension: 40,
            }),
          ]).start();
        }
      },
    })
  ).current;

  const cardRotation = rotateCard.interpolate({
    inputRange: [-15, 0, 15],
    outputRange: ["-15deg", "0deg", "15deg"],
  });

  // Combine gesture rotation with button press rotation
  const combinedRotate = Animated.add(rotate, rotateCard).interpolate({
    inputRange: [-30, 0, 30],
    outputRange: ["-30deg", "0deg", "30deg"],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.cardWrapper,
          {
            transform: [
              { translateX: Animated.add(pan.x, translateX) },
              { translateY: Animated.add(pan.y, translateY) },
              { rotate: combinedRotate },
            ],
          },
        ]}
      >
        <ImageFast
          source={PNGIcons.bandImage}
          style={styles.image}
          onPress={() => navigation.navigate("Detail")}
        >
          <View style={styles.overlay} />

          <View style={styles.innerContainer}>
            <View style={styles.headerRow}>
              <View style={styles.row}>
                <Image
                  source={Images.verifiedBadge}
                  style={styles.verifyStar}
                />
                <CustomText
                  label={"VERIFIED SOLO ARTIST"}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  marginLeft={8}
                  fontFamily={fonts.medium}
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

              <AuthSlider
                min={1}
                max={3}
                marginBottom={20}
                marginTop={12}
                gap={8}
                height={6}
              />
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
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
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
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 6,
  },
  cardWrapper: {
    width: "100%",
    padding: 4,
    backgroundColor: "#FFFFFF29",
    borderColor: "#FFFFFF29",
    borderRadius: 34,
    borderWidth: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
  image: {
    height: Platform.OS == "ios" ? screenHeight * 0.56 : screenHeight * 0.55,
    width: "100%",
    borderRadius: 32,
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
    height: 22,
    width: 22,
  },
  bg: {
    backgroundColor: "#FFFFFF29",
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "#FFFFFF7A",
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
    width: Platform.OS == "android" ? "100%" : "90%",
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
    height: 200,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: "hidden",
  },
  gradientFill: {
    flex: 1,
  },
});
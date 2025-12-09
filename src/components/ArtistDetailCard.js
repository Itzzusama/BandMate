import { useNavigation } from "@react-navigation/native";
import { useRef, useState, useEffect } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import fonts from "../assets/fonts";
import { PNGIcons } from "../assets/images/icons";
import { COLORS } from "../utils/COLORS";
import CustomText from "./CustomText";
import Icons from "./Icons";
import ImageFast from "./ImageFast";
import { BlurView } from "@react-native-community/blur";
import { useSelector } from "react-redux";
import { getAgeFromDob } from "../utils/constants";
import { getDistance } from "geolib";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ArtistDetailCard = ({
  images,
  color,
  userData,
  myPage,
  getUserProfile,
}) => {
  const navigation = useNavigation();
  console.log(userData);
  const user = useSelector((state) => state?.users?.userData);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotateCard = useRef(new Animated.Value(0)).current;
  const gradientOpacity = useRef(new Animated.Value(0)).current;
  const gradientTranslateY = useRef(new Animated.Value(200)).current;
  const [currentGradientColors, setCurrentGradientColors] = useState([
    "transparent",
    "transparent",
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderAnimation = useRef(new Animated.Value(0)).current;

  const buttonActions = [
    { colors: ["#F41857", "#F4185700"], direction: "left", rotation: -8 }, // red
    { colors: ["#007AFE", "#007AFE00"], direction: "up", rotation: 0 }, // blue
    { colors: ["#1ED760", "#1ED76000"], direction: "right", rotation: 8 }, // green
  ];
  const pointA = {
    latitude: user?.address?.address
      ? user?.address?.location?.coordinates[1]
      : 24.8607,
    longitude: user?.address?.address
      ? user?.address?.location?.coordinates[0]
      : 67.0011,
  };
  const pointB = {
    latitude: userData?.address?.address
      ? userData?.address?.location?.coordinates[1]
      : 31.5204,
    longitude: userData?.address?.address
      ? userData?.address?.location?.coordinates[0]
      : 74.3587,
  };

  const distanceMeters = getDistance(pointA, pointB);

  const distanceKm = distanceMeters / 1000;
  // Auto-advance slider every 3 seconds
  useEffect(() => {
    if (!images || images?.length <= 1) return;

    const interval = setInterval(() => {
      goToNextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImageIndex, images]);

  // Start slider animation when image changes
  useEffect(() => {
    startSliderAnimation();
  }, [currentImageIndex, images]);

  const startSliderAnimation = () => {
    if (!images || images.length <= 1) return;

    // Reset animation
    sliderAnimation.setValue(0);

    // Start the fill animation
    Animated.timing(sliderAnimation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  const goToNextImage = () => {
    if (!images || images.length <= 1) return;

    const nextIndex = (currentImageIndex + 1) % images.length;

    // Update the image index first
    setCurrentImageIndex(nextIndex);

    // Reset and restart slider animation
    sliderAnimation.setValue(0);
    Animated.timing(sliderAnimation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  const handleButtonPress = (index) => {
    console.log(index);
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
    // Reset carousel to first image when card resets
    setCurrentImageIndex(0);
    sliderAnimation.setValue(0);
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
        {/* Image Carousel */}
        {images && images?.length > 0 ? (
          <ImageFast
            source={{ uri: images[currentImageIndex] }}
            style={styles.imgStyle}
          >
            <LinearGradient
              colors={["#14141499", "#14141440", "#60606000"]}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              style={styles.bottomGradient}
            />

            <View style={styles.innerContainer}>
              <CustomText
                label={
                  userData?.role == "solo"
                    ? userData?.display_name +
                      ", " +
                      getAgeFromDob(userData.dob)
                    : userData?.bandName + ", " + getAgeFromDob(userData.dob)
                }
                fontSize={44}
                lineHeight={44 * 1.4}
                fontFamily={fonts.abril}
              />
              <View style={styles.locationRow}>
                <Image source={PNGIcons.pin} style={styles.pinIcon} />
                <CustomText
                  label={userData?.address?.address}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  fontFamily={fonts.medium}
                  marginLeft={3}
                />
                <CustomText
                  label={`${distanceKm.toFixed(1)} km`}
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
                  label={userData?.role == "solo" ? "Solo Artist" : "Band"}
                  fontFamily={fonts.medium}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  marginLeft={4}
                />
              </View>

              {images && images.length > 1 && (
                <View style={styles.sliderContainer}>
                  <View style={styles.sliderTrack}>
                    {Array.from({ length: images.length }).map((_, index) => (
                      <View
                        key={index}
                        style={[
                          styles.block,
                          {
                            backgroundColor: "#FFFFFF17",
                            borderRadius: 99,
                            overflow: "hidden",
                          },
                        ]}
                      >
                        {index === currentImageIndex && (
                          <Animated.View
                            style={[
                              StyleSheet.absoluteFill,
                              {
                                backgroundColor: COLORS.authHeader,
                                width: sliderAnimation.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: ["0%", "100%"],
                                }),
                              },
                            ]}
                          />
                        )}
                        {index < currentImageIndex && (
                          <View
                            style={[
                              StyleSheet.absoluteFill,
                              {
                                backgroundColor: COLORS.authHeader,
                              },
                            ]}
                          />
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              )}
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
        ) : (
          // Fallback if no images provided
          <View style={[styles.imgStyle, { backgroundColor: COLORS.gray }]}>
            <Text>No images available</Text>
          </View>
        )}
      </Animated.View>
      {/* {!myPage && (
        <View style={styles.bottomContainer}>
          {[PNGIcons.btn2, PNGIcons.btn3, PNGIcons.btn4]?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleButtonPress(index)}
            >
              <ImageFast
                source={item}
                removeLoading
                style={[styles.btnStyle, styles.largeBtn]}
              />
            </TouchableOpacity>
          ))}
        </View>
      )} */}
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
  sliderContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  sliderTrack: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 100,
    overflow: "hidden",
    gap: 8,
  },
  block: {
    flex: 1,
    height: 6,
    position: "relative",
  },
});

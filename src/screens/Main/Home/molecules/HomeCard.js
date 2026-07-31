import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";
import { get, post } from "../../../../services/ApiRequest";
import { ToastMessage } from "../../../../utils/ToastMessage";
import { getAgeFromDob } from "../../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../../store/reducer/usersSlice";
import { getDistance } from "geolib";
import { getPalette } from "@somesoap/react-native-image-palette/src";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const HomeCard = ({
  data,
  getUserProfile,
  tab,
  primaryColor,
  setPrimaryColor,
  setProfileData,
}) => {
  const paletteCache = useRef({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.users);
  const [matching, setMatching] = useState(0);
  const [views, setViews] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cards, setCards] = useState([...data]);
  const cardsRef = useRef(cards);
  const sliderAnimation = useRef(new Animated.Value(0)).current;

  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotateCard = useRef(new Animated.Value(0)).current;
  const gradientOpacity = useRef(new Animated.Value(0)).current;
  const gradientTranslateY = useRef(new Animated.Value(200)).current;

  const nextCardScale = useRef(new Animated.Value(0.9)).current;
  const nextCardTranslateY = useRef(new Animated.Value(10)).current;

  const pan = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (data?.length) {
      setCards([...data]);
      setCurrentImageIndex(0);
    }
  }, [data]);

  // Keep cardsRef in sync with cards state for PanResponder closure
  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);
  const [currentGradientColors, setCurrentGradientColors] = useState([
    "transparent",
    "transparent",
  ]);

  const buttonActions = [
    {
      reaction: "rewind",
      colors: ["#FF4B4B", "#FF4B4B00"],
      direction: "left",
      rotation: -15,
    },
    {
      reaction: "dislike",
      colors: ["#F41857", "#F4185700"],
      direction: "left",
      rotation: -8,
    },
    {
      reaction: "superlike",
      colors: ["#007AFE", "#007AFE00"],
      direction: "up",
      rotation: 0,
    },
    {
      reaction: "like",
      colors: ["#1ED760", "#1ED76000"],
      direction: "right",
      rotation: 8,
    },
    {
      reaction: "boost",
      colors: ["#8400E7", "#8400E700"],
      direction: "right",
      rotation: 15,
    },
  ];
  const updatePrimaryColorFromImage = async (imageUri) => {
    if (!imageUri || !setPrimaryColor) return;

    if (paletteCache.current[imageUri]) {
      setPrimaryColor(paletteCache.current[imageUri]);
      return;
    }

    try {
      const palette = await getPalette(imageUri);

      const color =
        palette?.darkVibrant ||
        palette?.vibrant ||
        palette?.dominant ||
        "#131E1F";

      paletteCache.current[imageUri] = color;
      setPrimaryColor(color);
    } catch (error) {
      console.log("Palette error:", error);
      setPrimaryColor("#131E1F");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImageIndex, currentIndex]);

  useEffect(() => {
    startSliderAnimation();
  }, [currentImageIndex, currentIndex]);

  useEffect(() => {
    const profileId = cards?.[0]?._id;
    const firstImage = cards?.[0]?.pictures?.[0];

    if (profileId && firstImage) {
      updatePrimaryColorFromImage(firstImage);
    }
  }, [cards?.[0]]);
  const fetchProfileViews = async (profileId) => {
    try {
      const res = await get("matching/" + profileId);
      if (res?.data?.success) {
        setMatching(res?.data?.data?.compatibilityScore);
        setViews(res?.data?.data?.analytics?.views);
      }
    } catch (error) {
      console.log("Profile views error:", error);
    }
  };
  useEffect(() => {
    if (!cards?.length) return;

    const currentProfileId = cards[0]?._id;
    if (!currentProfileId) return;

    fetchProfileViews(currentProfileId);
  }, [cards[0]]);

  const startSliderAnimation = () => {
    // Reset animation
    sliderAnimation.setValue(0);

    // Start the fill animation
    Animated.timing(sliderAnimation, {
      toValue: 1,
      duration: 3000, // 3 seconds
      useNativeDriver: false,
    }).start();
  };

  const goToNextImage = () => {
    const currentProfile = cards[0];
    const nextIndex =
      (currentImageIndex + 1) % currentProfile?.pictures?.length;

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

  const checkQuotaAvailable = (reaction) => {
    const keyMap = {
      rewind: { key: "rewinds", name: "rewind" },
      superlike: { key: "superLikes", name: "superlike" },
      boost: { key: "boosts", name: "boost" },
    };
    const info = keyMap[reaction];
    if (info) {
      const count = userData?.[info.key] ?? 0;
      if (count <= 0) {
        ToastMessage(`No more ${info.name} available`, "error");
        return false;
      }
    }
    return true;
  };

  const handleSwipe = (direction, swipedProfile) => {
    let reaction;
    switch (direction) {
      case "left":
        reaction = "dislike";
        break;
      case "right":
        reaction = "like";
        break;
      case "up":
        reaction = "superlike";
        break;
      default:
        return;
    }
    if (!checkQuotaAvailable(reaction)) {
      return;
    }
    // Fire API in background, don't await
    handleReaction(reaction, swipedProfile);
    goToNextCard();
  };

  const handleButtonPress = (index) => {
    const action = buttonActions[index];
    const reaction = action.reaction;

    if (!checkQuotaAvailable(reaction)) {
      return;
    }

    // Capture the profile NOW before any state changes
    const profileToReact = cards[0];

    // Set gradient colors
    setCurrentGradientColors(action.colors);

    // Reset gradient position to bottom before animation
    gradientTranslateY.setValue(200);

    // Fire API in background immediately - don't await
    handleReaction(reaction, profileToReact);

    // Animate next card coming forward
    Animated.parallel([
      Animated.timing(nextCardScale, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(nextCardTranslateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

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

    // Animate card flying out immediately
    setTimeout(() => {
      const animations = [];

      if (action.direction === "left") {
        animations.push(
          Animated.timing(translateX, {
            toValue: -screenWidth * 1.5,
            duration: 400,
            useNativeDriver: true,
          }),
        );
        animations.push(
          Animated.timing(rotateCard, {
            toValue: action.rotation,
            duration: 400,
            useNativeDriver: true,
          }),
        );
      } else if (action.direction === "right") {
        animations.push(
          Animated.timing(translateX, {
            toValue: screenWidth * 1.5,
            duration: 400,
            useNativeDriver: true,
          }),
        );
        animations.push(
          Animated.timing(rotateCard, {
            toValue: action.rotation,
            duration: 400,
            useNativeDriver: true,
          }),
        );
      } else if (action.direction === "up") {
        animations.push(
          Animated.timing(translateY, {
            toValue: -screenHeight * 1.5,
            duration: 400,
            useNativeDriver: true,
          }),
        );
      }

      Animated.parallel(animations).start(() => {
        setTimeout(() => {
          goToNextCard();
        }, 100);
      });
    }, 400);
  };

  const handleReaction = async (reaction, profile) => {
    const targetProfile = profile || cards[0];
    const payLoad = {
      toUser: targetProfile?._id,
      interactionType: reaction,
    };

    // Decrement quantity in Redux userData in real-time
    if (reaction === "rewind" || reaction === "superlike" || reaction === "boost") {
      const keyMap = {
        rewind: "rewinds",
        superlike: "superLikes",
        boost: "boosts",
      };
      const key = keyMap[reaction];
      if (key && userData) {
        const currentVal = userData[key] || 0;
        const updatedVal = Math.max(0, currentVal - 1);
        dispatch(setUserData({ ...userData, [key]: updatedVal }));
      }
    }

    try {
      const res = await post("matching/interactions", payLoad);
      setProfileData((prev = []) =>
        prev.filter((p) => p?._id !== targetProfile?._id),
      );
      ToastMessage(
        reaction === "dislike"
          ? "Profile Removed from recommendations"
          : reaction === "rewind"
          ? "Profile rewound successfully"
          : reaction === "superlike"
          ? "Profile superliked successfully"
          : reaction === "boost"
          ? "Profile boosted successfully"
          : "Profile liked successfully",
      );
    } catch (err) {
      console.log(err);
    }
  };

  const goToNextCard = () => {
    setCards((prevCards) => {
      const newCards = [...prevCards];

      const removedCard = newCards.shift();
      newCards.push(removedCard);
      return newCards;
    });
    setCurrentImageIndex(0);

    resetCardPosition();
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
    sliderAnimation.setValue(0);

    // Reset next card animation for next swipe
    nextCardScale.setValue(0.9);
    nextCardTranslateY.setValue(10);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        const { dx, dy } = gestureState;

        pan.setValue({ x: dx, y: dy });

        const rotation = dx * 0.1;
        rotate.setValue(rotation);

        const swipeThreshold = 30;
        if (Math.abs(dx) > swipeThreshold) {
          if (dx < 0) {
            setCurrentGradientColors(["#FF4B4B", "#FF4B4B00"]);
          } else {
            console.log("green----");

            setCurrentGradientColors(["#1ED760", "#1ED76000"]);
          }

          const opacity = Math.min(Math.abs(dx) / 150, 1);
          gradientOpacity.setValue(opacity);
          gradientTranslateY.setValue(0);
        } else {
          gradientOpacity.setValue(0);
          gradientTranslateY.setValue(200);
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        const { dx, dy, vx, vy } = gestureState;
        const swipeThreshold = 50;
        const velocityThreshold = 0.5;

        // Capture the current profile BEFORE any animation or state changes
        const swipedProfile = cardsRef.current[0];

        if (dx < -swipeThreshold || vx < -velocityThreshold) {
          setCurrentGradientColors(["#FF4B4B", "#FF4B4B00"]);
          gradientTranslateY.setValue(200);

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
            handleSwipe("left", swipedProfile);
          });
        } else if (dx > swipeThreshold || vx > velocityThreshold) {
          setCurrentGradientColors(["#1ED760", "#1ED76000"]);
          gradientTranslateY.setValue(200);

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
            handleSwipe("right", swipedProfile);
          });
        }
        // Check if it's an upward swipe
        else if (dy < -swipeThreshold || vy < -velocityThreshold) {
          if (!checkQuotaAvailable("superlike")) {
            gradientOpacity.setValue(0);
            gradientTranslateY.setValue(200);
            setCurrentGradientColors(["transparent", "transparent"]);
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
            return;
          }
          setCurrentGradientColors(["#007AFE", "#007AFE00"]);
          gradientTranslateY.setValue(200);
          Animated.timing(pan, {
            toValue: { x: dx, y: -screenHeight * 2 },
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            handleSwipe("up", swipedProfile);
          });
        }

        // If not a swipe, return to original position
        else {
          // Reset gradient
          gradientOpacity.setValue(0);
          gradientTranslateY.setValue(200);
          setCurrentGradientColors(["transparent", "transparent"]);

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
    }),
  ).current;

  const cardRotation = rotateCard.interpolate({
    inputRange: [-15, 0, 15],
    outputRange: ["-15deg", "0deg", "15deg"],
  });

  const combinedRotate = Animated.add(rotate, rotateCard).interpolate({
    inputRange: [-30, 0, 30],
    outputRange: ["-30deg", "0deg", "30deg"],
    extrapolate: "clamp",
  });

  const currentProfile = cards[0];
  const nextProfile = cards[1];

  const renderCard = (profile, isCurrent = true) => {
    const pointA = {
      latitude: profile?.address?.address
        ? profile?.address?.location?.coordinates[1]
        : 24.8607,
      longitude: profile?.address?.address
        ? profile?.address?.location?.coordinates[0]
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

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate("Detail", {
            images: profile?.pictures,
            profile: profile,
            getUserProfile: getUserProfile,
          })
        }
        style={styles.imageContainer}
      >
        <ImageFast
          source={{ uri: profile?.pictures[isCurrent ? currentImageIndex : 0] }}
          style={styles.image}
        />

        <View style={styles.overlay} />

        <View style={styles.innerContainer}>
          <View style={styles.headerRow}>
            <View style={styles.row}>
              <Image
                source={
                  profile?.premium
                    ? Images.goldenVerified
                    : Images.verifiedBadge
                }
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
                label={matching + "%"}
                fontFamily={fonts.semiBold}
                lineHeight={14 * 1.4}
              />
            </View>
          </View>

          {/* footer */}
          <View>
            <CustomText
              label={
                profile?.role == "solo"
                  ? profile?.display_name
                  : profile?.bandName + ", " + getAgeFromDob(profile?.dob)
              }
              fontSize={44}
              lineHeight={44 * 1.4}
              fontFamily={fonts.abril}
            />

            <View style={styles.locationRow}>
              <Image source={PNGIcons.pin} style={styles.pinIcon} />
              <CustomText
                label={profile?.address?.address || "Location"}
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

            <CustomText
              label={views + " monthly profile views"}
              fontSize={11}
              fontFamily={fonts.medium}
              marginTop={8}
            />
            {profile?.premium && (
              <>
                <CustomText
                  label={"Shares the same passion for"}
                  fontSize={11}
                  fontFamily={fonts.medium}
                  marginTop={8}
                />
                <View style={[styles.genreRow, { marginBottom: 0 }]}>
                  <View
                    style={[
                      styles.genrePill,
                      {
                        borderWidth: 1,
                        borderColor: "#A19375",
                        backgroundColor: "#FFCF83" + 40,
                      },
                    ]}
                  >
                    <CustomText
                      label={"Elvis Presley"}
                      fontFamily={fonts.medium}
                      fontSize={12}
                      lineHeight={12 * 1.4}
                      color={"#FFCF83"}
                    />
                  </View>
                  <View
                    style={[
                      styles.genrePill,
                      {
                        borderWidth: 1,
                        borderColor: "#A19375",
                        backgroundColor: "#FFCF83" + 40,
                      },
                    ]}
                  >
                    <CustomText
                      label={"Michael Jackson"}
                      fontFamily={fonts.medium}
                      fontSize={12}
                      lineHeight={12 * 1.4}
                      color={"#FFCF83"}
                    />
                  </View>
                  <View
                    style={[
                      styles.genrePill,
                      {
                        borderWidth: 1,
                        borderColor: "#A19375",
                        backgroundColor: "#FFCF83" + 40,
                      },
                    ]}
                  >
                    <CustomText
                      label={"& 34 more"}
                      fontFamily={fonts.medium}
                      fontSize={12}
                      lineHeight={12 * 1.4}
                      color={"#FFCF83"}
                    />
                  </View>
                </View>
              </>
            )}

            <View style={styles.genreRow}>
              {profile?.Genres?.map((item, index) => (
                <View style={styles.genrePill} key={index}>
                  <CustomText
                    label={item}
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                  />
                </View>
              ))}
            </View>

            <View style={styles.footerRow}>
              <CustomText
                label={profile?.profile?.bio}
                fontSize={12}
                lineHeight={12 * 1.4}
                fontFamily={fonts.medium}
              />
              <Image source={PNGIcons.forward} style={styles.forwardIcon} />
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                {Array.from({ length: profile?.pictures?.length }).map(
                  (_, index) => (
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
                      {index === currentImageIndex && isCurrent && (
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
                      {index < currentImageIndex && isCurrent && (
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
                  ),
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Animated Gradient Overlay - only for current card */}
        {isCurrent && (
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
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {nextProfile && (
        <Animated.View
          style={[
            styles.cardWrapper,
            styles.nextCard,
            {
              transform: [
                { scale: nextCardScale },
                { translateY: nextCardTranslateY },
              ],
            },
          ]}
        >
          {renderCard(nextProfile, false)}
        </Animated.View>
      )}

      {currentProfile && (
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.cardWrapper,
            styles.currentCard,
            {
              backgroundColor: currentProfile?.premium
                ? "#FFCF83"
                : "#FFFFFF29",
              transform: [
                {
                  translateX: Animated.add(pan.x, translateX),
                },
                {
                  translateY: Animated.add(pan.y, translateY),
                },
                { rotate: combinedRotate },
              ],
            },
          ]}
        >
          {renderCard(currentProfile, true)}
        </Animated.View>
      )}
      {cards?.length > 0 && (
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
                  index === 0 || index === 4
                    ? styles.smallBtn
                    : styles.largeBtn,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
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
    width: "95%",
    padding: 4,
    borderColor: "#FFFFFF29",
    borderRadius: 34,
    borderWidth: 1,
  },
  currentCard: {
    position: "absolute",
    zIndex: 2,
  },
  nextCard: {
    position: "absolute",
    zIndex: 1,
    marginTop: 25,
  },
  imageContainer: {
    height: Platform.OS == "ios" ? screenHeight * 0.56 : screenHeight * 0.55,
    width: "100%",
    borderRadius: 32,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
  },
  innerContainer: {
    padding: 14,
    justifyContent: "space-between",
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    width: Platform.OS == "android" ? "100%" : "95%",
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
    marginTop:
      Platform.OS == "ios"
        ? screenHeight * 0.56 + 30
        : screenHeight * 0.55 + 30,
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

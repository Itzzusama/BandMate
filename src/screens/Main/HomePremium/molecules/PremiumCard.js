import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
import Blur from "../../../../components/Blur";

const IMAGE_CAROUSEL_ITEM_SIZE = 60;
// Tab bar in TabStack is position:absolute with height = 90 + insets.bottom
const TAB_BAR_BASE_HEIGHT = 90;

// ── Carousel geometry (centered, coverflow-style) ─────────────────────────
const SCREEN_WIDTH = Dimensions.get("window").width;
const CAROUSEL_ITEM_MAX_SIZE = 74; // size of the active (middle) item
const CAROUSEL_ITEM_SPACING = 58; // distance between item centers (creates overlap)
const CAROUSEL_SIDE_PADDING = (SCREEN_WIDTH - CAROUSEL_ITEM_SPACING) / 2.2;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ACTION_BUTTONS = [
  { icon: PNGIcons.btn1, color: "#FF4B4B" },
  { icon: PNGIcons.btn2, color: "#F41857" },
  { icon: PNGIcons.btn3, color: "#007AFF" },
  { icon: PNGIcons.btn4, color: "#1ED760" },
  { icon: PNGIcons.btn5, color: "#8400E7" },
];

const PremiumCard = ({
  data,
  getUserProfile,
  tab,
  primaryColor,
  setPrimaryColor,
  setProfileData,
  // Controlled from parent so ScreenWrapper backgroundImage updates in sync
  currentIndex,
  setCurrentIndex,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const insets = useSafeAreaInsets();
  const paletteCache = useRef({});
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.users);

  const [matching, setMatching] = useState(0);
  const [views, setViews] = useState(0);
  const [cards, setCards] = useState([...data]);

  // Slider animation (top progress bar — auto-advance timer)
  const sliderAnimation = useRef(new Animated.Value(0)).current;

  // Carousel scroll tracking (for the centered, size-scaling swipe carousel)
  const carouselRef = useRef(null);
  const carouselScrollX = useRef(new Animated.Value(0)).current;
  const isCarouselDragging = useRef(false);

  // ── Sync data prop ──────────────────────────────────────────────────────
  useEffect(() => {
    if (data?.length) {
      setCards([...data]);
      setCurrentImageIndex(0);
      setCurrentIndex(0);
    }
  }, [data]);

  // ── Restart slider whenever image or user changes ───────────────────────
  useEffect(() => {
    startSliderAnimation();
  }, [currentImageIndex, currentIndex]);

  // ── Extract palette when current user changes ───────────────────────────
  useEffect(() => {
    const firstImage = cards?.[currentIndex]?.pictures?.[0];
    if (firstImage) updatePrimaryColorFromImage(firstImage);
  }, [currentIndex, cards]);

  // ── Fetch match % + profile views when current user changes ────────────
  useEffect(() => {
    if (!cards?.length) return;
    const profileId = cards[currentIndex]?._id;
    if (profileId) fetchProfileViews(profileId);
  }, [currentIndex, cards]);

  // ── Auto-advance image of current user every 3 s ───────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      const profile = cards[currentIndex];
      if (!profile?.pictures?.length) return;
      const next = (currentImageIndex + 1) % profile.pictures.length;
      setCurrentImageIndex(next);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImageIndex, currentIndex, cards]);

  // ── Keep the centered carousel scroll position in sync with currentIndex
  //     (covers taps, like/dislike removing a card, and initial data load) ─
  useEffect(() => {
    if (!carouselRef.current || isCarouselDragging.current) return;
    carouselRef.current.scrollToOffset({
      offset: currentIndex * CAROUSEL_ITEM_SPACING,
      animated: true,
    });
  }, [currentIndex, cards.length]);

  // ── Helpers ─────────────────────────────────────────────────────────────
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
    } catch {
      setPrimaryColor("#131E1F");
    }
  };

  const startSliderAnimation = () => {
    sliderAnimation.setValue(0);
    Animated.timing(sliderAnimation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

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

  const handleReaction = async (reaction, profile) => {
    const targetProfile = profile || cards[currentIndex];
    const payLoad = { toUser: targetProfile?._id, interactionType: reaction };

    if (["rewind", "superlike", "boost"].includes(reaction)) {
      const keyMap = {
        rewind: "rewinds",
        superlike: "superLikes",
        boost: "boosts",
      };
      const key = keyMap[reaction];
      if (key && userData) {
        dispatch(
          setUserData({
            ...userData,
            [key]: Math.max(0, (userData[key] || 0) - 1),
          }),
        );
      }
    }

    try {
      await post("matching/interactions", payLoad);
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

  const buttonActions = [
    { reaction: "rewind" },
    { reaction: "dislike" },
    { reaction: "superlike" },
    { reaction: "like" },
    { reaction: "boost" },
  ];

  const handleButtonPress = (index) => {
    const { reaction } = buttonActions[index];
    if (!checkQuotaAvailable(reaction)) return;
    handleReaction(reaction, cards[currentIndex]);
  };

  // ── Switch to a different user via carousel tap ─────────────────────────
  const switchToUser = (index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    setCurrentImageIndex(0);
  };

  // ── Carousel swipe handlers ──────────────────────────────────────────────
  const handleCarouselScrollBeginDrag = () => {
    isCarouselDragging.current = true;
  };

  const handleCarouselMomentumScrollEnd = (e) => {
    isCarouselDragging.current = false;
    const offsetX = e.nativeEvent.contentOffset.x;
    let newIndex = Math.round(offsetX / CAROUSEL_ITEM_SPACING);
    newIndex = Math.max(0, Math.min(newIndex, cards.length - 1));
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      setCurrentImageIndex(0);
    }
  };

  const getCarouselItemLayout = (_, index) => ({
    length: CAROUSEL_ITEM_SPACING,
    offset: CAROUSEL_ITEM_SPACING * index,
    index,
  });

  // ──────────────────────────────────────────────────────────────────────────
  const currentProfile = cards[currentIndex];
  if (!currentProfile) return null;

  const pointA = {
    latitude: currentProfile?.address?.location?.coordinates?.[1] ?? 24.8607,
    longitude: currentProfile?.address?.location?.coordinates?.[0] ?? 67.0011,
  };
  const pointB = {
    latitude: userData?.address?.location?.coordinates?.[1] ?? 31.5204,
    longitude: userData?.address?.location?.coordinates?.[0] ?? 74.3587,
  };
  const distanceKm = (getDistance(pointA, pointB) / 1000).toFixed(1);

  // Padding that pushes the buttons above the floating tab bar
  const bottomPad = TAB_BAR_BASE_HEIGHT + insets.bottom + 12;

  return (
    // Plain View — no gesture, no swipe
    <View style={styles.fullScreenOverlay}>
      {/* ── Top: image progress slider ──────────────────────────────────── */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderTrack}>
          {Array.from({
            length: currentProfile?.pictures?.length || 1,
          }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.sliderBlock,
                { backgroundColor: "#FFFFFF28", overflow: "hidden" },
              ]}
            >
              {i === currentImageIndex && (
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
              {i < currentImageIndex && (
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: COLORS.authHeader },
                  ]}
                />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* ── Verified badge + match % ────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.row}>
          <Image
            source={
              currentProfile?.premium
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
        <View style={styles.matchBadge}>
          <CustomText
            label={matching + "%"}
            fontFamily={fonts.semiBold}
            fontSize={13}
            lineHeight={13 * 1.4}
          />
        </View>
      </View>

      {/* ── Spacer pushes bottom block down ────────────────────────────── */}
      <View style={styles.spacer} />

      {/* ══════════════════════════════════════════════════════════════════
          BOTTOM BLOCK
          Stack (top → bottom): Text info → User carousel → Action buttons
          paddingBottom clears the floating tab bar
      ══════════════════════════════════════════════════════════════════ */}
      <View style={[styles.bottomBlock, { paddingBottom: bottomPad }]}>
        {/* ── Centered text info ──────────────────────────────────────── */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate("Detail", {
              images: currentProfile?.pictures,
              profile: currentProfile,
              getUserProfile,
            })
          }
          style={styles.textSection}
        >
          {/* Name */}
          <CustomText
            label={
              currentProfile?.role === "solo"
                ? currentProfile?.display_name
                : `${currentProfile?.bandName}, ${getAgeFromDob(
                    currentProfile?.dob,
                  )}`
            }
            fontSize={44}
            lineHeight={44 * 1.2}
            fontFamily={fonts.abril}
            textAlign="center"
          />

          {/* Location + distance */}
          <View style={styles.locationRow}>
            <Image source={PNGIcons.pin} style={styles.pinIcon} />
            <CustomText
              label={currentProfile?.address?.address || "Location"}
              fontSize={13}
              lineHeight={13 * 1.4}
              fontFamily={fonts.medium}
              marginLeft={4}
            />
            <CustomText
              label={`  ${distanceKm} km`}
              fontSize={13}
              lineHeight={13 * 1.4}
              color={COLORS.white2}
              fontFamily={fonts.medium}
            />
          </View>

          {/* Monthly profile views */}
          <CustomText
            label={`${views} monthly profile views`}
            fontSize={12}
            fontFamily={fonts.medium}
            marginTop={5}
            textAlign="center"
          />

          {/* Bio */}
          {!!currentProfile?.profile?.bio && (
            <CustomText
              label={currentProfile.profile.bio}
              fontSize={13}
              lineHeight={13 * 1.5}
              fontFamily={fonts.medium}
              marginTop={5}
              textAlign="center"
              numberOfLines={2}
            />
          )}

          {/* Genre pills */}
          <View style={styles.genreRow}>
            {currentProfile?.Genres?.map((item, i) => (
              <View style={styles.genrePill} key={i}>
                <Blur />
                <CustomText
                  label={item}
                  fontFamily={fonts.medium}
                  fontSize={13}
                  textAlign="center"
                />
              </View>
            ))}
          </View>
        </TouchableOpacity>

        {/* ── User carousel — centered, active user largest, swipeable ── */}
        <View style={styles.carouselContainer}>
          <AnimatedFlatList
            ref={carouselRef}
            data={cards}
            keyExtractor={(item, i) => item?._id || String(i)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
            snapToInterval={CAROUSEL_ITEM_SPACING}
            decelerationRate="fast"
            bounces={true}
            getItemLayout={getCarouselItemLayout}
            initialScrollIndex={currentIndex}
            onScrollBeginDrag={handleCarouselScrollBeginDrag}
            onMomentumScrollEnd={handleCarouselMomentumScrollEnd}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: carouselScrollX } } }],
              { useNativeDriver: true },
            )}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 2) * CAROUSEL_ITEM_SPACING,
                (index - 1) * CAROUSEL_ITEM_SPACING,
                index * CAROUSEL_ITEM_SPACING,
                (index + 1) * CAROUSEL_ITEM_SPACING,
                (index + 2) * CAROUSEL_ITEM_SPACING,
              ];
              const scale = carouselScrollX.interpolate({
                inputRange,
                outputRange: [0.4, 0.62, 1, 0.62, 0.4],
                extrapolate: "clamp",
              });
              const opacity = carouselScrollX.interpolate({
                inputRange,
                outputRange: [0.45, 0.7, 1, 0.7, 0.45],
                extrapolate: "clamp",
              });
              return (
                <TouchableOpacity
                  onPress={() => switchToUser(index)}
                  activeOpacity={0.8}
                  style={styles.carouselItem}
                >
                  <Animated.View
                    style={[
                      styles.carouselImageWrap,
                      { transform: [{ scale }], opacity },
                    ]}
                  >
                    <ImageFast
                      source={{ uri: item?.pictures?.[0] }}
                      style={styles.carouselImage}
                    />
                  </Animated.View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* ── Action buttons — same as Home screen ───────────────────── */}
        <View style={styles.buttonsRow}>
          {ACTION_BUTTONS.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleButtonPress(index)}
              activeOpacity={0.8}
              style={{
                borderWidth: 1,
                borderColor: item.color,
                borderRadius: 999,
                padding: 4,
              }}
            >
              <ImageFast
                source={item.icon}
                removeLoading
                style={[
                  styles.btnStyle,
                  index === 0 || index === 4
                    ? styles.smallBtn
                    : index == 2
                    ? styles.largeBtn
                    : styles.mediumBtn,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default PremiumCard;

const styles = StyleSheet.create({
  // ── Root: full screen, no card, no swipe ────────────────────────────────
  fullScreenOverlay: {
    flex: 1,
    paddingHorizontal: 14,
  },

  // ── Image progress slider ────────────────────────────────────────────────
  sliderContainer: {
    marginTop: 16,
    width: "100%",
  },
  sliderTrack: {
    flexDirection: "row",
    gap: 6,
    borderRadius: 100,
  },
  sliderBlock: {
    flex: 1,
    height: 4,
    borderRadius: 99,
    position: "relative",
  },

  // ── Verified / match row ─────────────────────────────────────────────────
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifyStar: {
    height: 22,
    width: 22,
  },
  matchBadge: {
    backgroundColor: "#FFFFFF29",
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "#FFFFFF7A",
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  // ── Spacer ───────────────────────────────────────────────────────────────
  spacer: { flex: 1 },

  // ── Bottom block ─────────────────────────────────────────────────────────
  bottomBlock: {
    width: "100%",
  },

  // ── Text section ─────────────────────────────────────────────────────────
  textSection: {
    alignItems: "center",
    width: "100%",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  pinIcon: {
    height: 13,
    width: 13,
    tintColor: COLORS.white,
  },
  genreRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
    marginBottom: 2,
  },
  genrePill: {
    borderRadius: 99,
    overflow: "hidden",
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.white4,
  },

  // ── User carousel (centered, active item largest, swipe to change) ──────
  carouselContainer: {
    width: "100%",
    height: CAROUSEL_ITEM_MAX_SIZE + 6,
    marginTop: 14,
    marginBottom: 2,
  },
  carouselContent: {
    paddingHorizontal: CAROUSEL_SIDE_PADDING,
    alignItems: "center",
  },
  carouselItem: {
    width: CAROUSEL_ITEM_SPACING,
    height: CAROUSEL_ITEM_MAX_SIZE + 6,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselImageWrap: {
    width: CAROUSEL_ITEM_MAX_SIZE,
    height: CAROUSEL_ITEM_MAX_SIZE,
    borderRadius: 10,
    overflow: "hidden",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },

  // ── Action buttons ────────────────────────────────────────────────────────
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingTop: 12,
    paddingHorizontal: 4,
    paddingBottom: Platform.OS === "ios" ? 75 : 90,
  },
  btnStyle: {
    resizeMode: "contain",
  },
  smallBtn: {
    height: Platform.OS === "ios" ? 38 : 44,
    width: Platform.OS === "ios" ? 38 : 44,
  },
  mediumBtn: {
    height: Platform.OS === "ios" ? 46 : 52,
    width: Platform.OS === "ios" ? 46 : 52,
  },
  largeBtn: {
    height: Platform.OS === "ios" ? 54 : 52,
    width: Platform.OS === "ios" ? 54 : 52,
  },
});

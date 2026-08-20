import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
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

const IMAGE_CAROUSEL_ITEM_SIZE = 60;
// Tab bar in TabStack is position:absolute with height = 90 + insets.bottom
const TAB_BAR_BASE_HEIGHT = 90;

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
      {/* Dark gradient for readability — heavy at the bottom */}
      <LinearGradient
        colors={[
          "transparent",
          "rgba(0,0,0,0.08)",
          "rgba(0,0,0,0.60)",
          "rgba(0,0,0,0.90)",
        ]}
        locations={[0, 0.25, 0.55, 1]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

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
                <CustomText
                  label={item}
                  fontFamily={fonts.medium}
                  fontSize={13}
                  lineHeight={13 * 1.4}
                  textAlign="center"
                />
              </View>
            ))}
          </View>
        </TouchableOpacity>

        {/* ── User carousel — first photo of EACH user, tap to switch ── */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={cards}
            keyExtractor={(item, i) => item?._id || String(i)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
            renderItem={({ item, index }) => {
              const isActive = index === currentIndex;
              return (
                <TouchableOpacity
                  onPress={() => switchToUser(index)}
                  activeOpacity={0.8}
                  style={[
                    styles.carouselItem,
                    isActive && styles.carouselItemActive,
                  ]}
                >
                  <ImageFast
                    source={{ uri: item?.pictures?.[0] }}
                    style={styles.carouselImage}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* ── Action buttons — same as Home screen ───────────────────── */}
        <View style={styles.buttonsRow}>
          {[
            PNGIcons.btn1,
            PNGIcons.btn2,
            PNGIcons.btn3,
            PNGIcons.btn4,
            PNGIcons.btn5,
          ].map((icon, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleButtonPress(index)}
              activeOpacity={0.8}
              style={{
                borderWidth: 0.5,
                borderColor: COLORS.white2,
                borderRadius: 999,
                padding: 4,
              }}
            >
              <ImageFast
                source={icon}
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
    backgroundColor: "#262626B0",
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#FFFFFF22",
  },

  // ── User carousel (first photo of each user) ─────────────────────────────
  carouselContainer: {
    width: "100%",
    marginTop: 14,
    marginBottom: 2,
  },
  carouselContent: {
    paddingHorizontal: 2,
    gap: 8,
    alignItems: "center",
  },
  carouselItem: {
    width: IMAGE_CAROUSEL_ITEM_SIZE,
    height: IMAGE_CAROUSEL_ITEM_SIZE,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
    opacity: 0.6,
  },
  carouselItemActive: {
    borderColor: COLORS.white,
    opacity: 1,
    transform: [{ scale: 1.1 }],
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

import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Platform, StyleSheet, View } from "react-native";
import { COLORS } from "../utils/COLORS";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const ShimmerBlock = ({ width, height, borderRadius, style }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: borderRadius || 4,
          backgroundColor: COLORS.inputBg,
          opacity,
        },
        style,
      ]}
    />
  );
};

// ─── Tab Skeleton ───────────────────────────────────────────────────────────
const TabSkeleton = () => {
  return (
    <View style={styles.tabContainer}>
      <ShimmerBlock width="46%" height={32} borderRadius={100} />
      <ShimmerBlock width="46%" height={32} borderRadius={100} />
    </View>
  );
};

// ─── Card Skeleton ──────────────────────────────────────────────────────────
const CardSkeleton = () => {
  const cardHeight =
    Platform.OS === "ios" ? screenHeight * 0.56 : screenHeight * 0.55;

  return (
    <View style={styles.cardWrapper}>
      <View style={[styles.cardInner, { height: cardHeight }]}>
        {/* Full card background shimmer */}
        <ShimmerBlock
          width="100%"
          height="100%"
          borderRadius={32}
          style={{ position: "absolute", backgroundColor: COLORS.cardColor }}
        />

        {/* Overlay content */}
        <View style={styles.cardOverlay}>
          {/* Top row: verified badge + match % */}
          <View style={styles.headerRow}>
            <View style={styles.row}>
              <ShimmerBlock width={22} height={22} borderRadius={11} />
              <ShimmerBlock
                width={130}
                height={14}
                borderRadius={6}
                style={{ marginLeft: 8 }}
              />
            </View>
            <ShimmerBlock width={50} height={28} borderRadius={99} />
          </View>

          {/* Bottom section */}
          <View>
            {/* Name */}
            <ShimmerBlock width="70%" height={40} borderRadius={8} />

            {/* Location row */}
            <View style={[styles.row, { marginTop: 6 }]}>
              <ShimmerBlock width={12} height={12} borderRadius={6} />
              <ShimmerBlock
                width={120}
                height={12}
                borderRadius={6}
                style={{ marginLeft: 3 }}
              />
              <ShimmerBlock
                width={50}
                height={12}
                borderRadius={6}
                style={{ marginLeft: 4 }}
              />
            </View>

            {/* Monthly views */}
            <ShimmerBlock
              width={160}
              height={11}
              borderRadius={6}
              style={{ marginTop: 8 }}
            />

            {/* Genre pills */}
            <View style={styles.genreRow}>
              <ShimmerBlock width={70} height={26} borderRadius={99} />
              <ShimmerBlock width={55} height={26} borderRadius={99} />
              <ShimmerBlock width={80} height={26} borderRadius={99} />
            </View>

            {/* Bio row */}
            <View style={styles.footerRow}>
              <ShimmerBlock width="80%" height={12} borderRadius={6} />
              <ShimmerBlock width={28} height={28} borderRadius={6} />
            </View>

            {/* Image slider dots */}
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                <ShimmerBlock width="30%" height={6} borderRadius={99} />
                <ShimmerBlock width="30%" height={6} borderRadius={99} />
                <ShimmerBlock width="30%" height={6} borderRadius={99} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

// ─── Bottom Action Buttons Skeleton ─────────────────────────────────────────
const BottomButtonsSkeleton = () => {
  return (
    <View style={styles.bottomContainer}>
      <ShimmerBlock width={48} height={48} borderRadius={24} />
      <ShimmerBlock width={56} height={56} borderRadius={28} />
      <ShimmerBlock width={56} height={56} borderRadius={28} />
      <ShimmerBlock width={56} height={56} borderRadius={28} />
      <ShimmerBlock width={48} height={48} borderRadius={24} />
    </View>
  );
};

// ─── Main HomeSkeleton ──────────────────────────────────────────────────────
const HomeSkeleton = () => {
  return (
    <View style={styles.container}>
      <TabSkeleton />
      <CardSkeleton />
      <BottomButtonsSkeleton />
    </View>
  );
};

export default HomeSkeleton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },

  // ── Tab ──
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "55%",
    alignSelf: "center",
    height: 40,
    backgroundColor: "#1d1d1d",
    borderRadius: 100,
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginTop: 12,
    gap: 4,
  },

  // ── Card ──
  cardWrapper: {
    width: "95%",
    padding: 4,
    borderColor: COLORS.white4,
    borderRadius: 34,
    borderWidth: 1,
    marginTop: 16,
  },
  cardInner: {
    width: "100%",
    borderRadius: 32,
    overflow: "hidden",
    position: "relative",
  },
  cardOverlay: {
    padding: 14,
    justifyContent: "space-between",
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  genreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 12,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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

  // ── Bottom Buttons ──
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 12,
    gap: 16,
    width: "100%",
  },
});

import React, { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";
import { COLORS } from "../utils/COLORS";

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
      ]),
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

// ─── Top Progress Slider Skeleton ───────────────────────────────────────────
const SliderSkeleton = () => {
  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderTrack}>
        <ShimmerBlock width="23%" height={4} borderRadius={99} />
        <ShimmerBlock width="23%" height={4} borderRadius={99} />
        <ShimmerBlock width="23%" height={4} borderRadius={99} />
        <ShimmerBlock width="23%" height={4} borderRadius={99} />
      </View>
    </View>
  );
};

// ─── Top Header Row Skeleton (Verified badge + Match %) ─────────────────────
const HeaderRowSkeleton = () => {
  return (
    <View style={styles.headerRow}>
      <View style={styles.row}>
        <ShimmerBlock width={22} height={22} borderRadius={11} />
        <ShimmerBlock
          width={135}
          height={14}
          borderRadius={6}
          style={{ marginLeft: 8 }}
        />
      </View>
      <ShimmerBlock width={52} height={26} borderRadius={99} />
    </View>
  );
};

// ─── Bottom Info Section Skeleton ───────────────────────────────────────────
const TextInfoSkeleton = () => {
  return (
    <View style={styles.textSection}>
      {/* Name */}
      <ShimmerBlock width="60%" height={38} borderRadius={8} />

      {/* Location row */}
      <View style={styles.locationRow}>
        <ShimmerBlock width={12} height={12} borderRadius={6} />
        <ShimmerBlock
          width={110}
          height={12}
          borderRadius={6}
          style={{ marginLeft: 4 }}
        />
        <ShimmerBlock
          width={45}
          height={12}
          borderRadius={6}
          style={{ marginLeft: 6 }}
        />
      </View>

      {/* Monthly Views */}
      <ShimmerBlock
        width={150}
        height={12}
        borderRadius={6}
        style={{ marginTop: 8 }}
      />

      {/* Bio */}
      <ShimmerBlock
        width="75%"
        height={12}
        borderRadius={6}
        style={{ marginTop: 8 }}
      />

      {/* Genre Pills */}
      <View style={styles.genreRow}>
        <ShimmerBlock width={70} height={26} borderRadius={99} />
        <ShimmerBlock width={85} height={26} borderRadius={99} />
        <ShimmerBlock width={65} height={26} borderRadius={99} />
      </View>
    </View>
  );
};

// ─── Carousel Avatars Skeleton ──────────────────────────────────────────────
const CarouselSkeleton = () => {
  return (
    <View style={styles.carouselContainer}>
      <ShimmerBlock
        width={42}
        height={42}
        borderRadius={10}
        style={{ opacity: 0.45 }}
      />
      <ShimmerBlock
        width={56}
        height={56}
        borderRadius={12}
        style={{ opacity: 0.7 }}
      />
      <ShimmerBlock width={74} height={74} borderRadius={14} />
      <ShimmerBlock
        width={56}
        height={56}
        borderRadius={12}
        style={{ opacity: 0.7 }}
      />
      <ShimmerBlock
        width={42}
        height={42}
        borderRadius={10}
        style={{ opacity: 0.45 }}
      />
    </View>
  );
};

// ─── Action Buttons Skeleton ────────────────────────────────────────────────
const ActionButtonsSkeleton = () => {
  const BUTTONS = [
    { size: Platform.OS === "ios" ? 38 : 44, color: "#FF4B4B80" },
    { size: Platform.OS === "ios" ? 46 : 52, color: "#F4185780" },
    { size: Platform.OS === "ios" ? 54 : 52, color: "#007AFF80" },
    { size: Platform.OS === "ios" ? 46 : 52, color: "#1ED76080" },
    { size: Platform.OS === "ios" ? 38 : 44, color: "#8400E780" },
  ];

  return (
    <View style={styles.buttonsRow}>
      {BUTTONS.map((btn, index) => (
        <View
          key={index}
          style={{
            borderWidth: 1,
            borderColor: btn.color,
            borderRadius: 999,
            padding: 4,
          }}
        >
          <ShimmerBlock
            width={btn.size}
            height={btn.size}
            borderRadius={btn.size / 2}
          />
        </View>
      ))}
    </View>
  );
};

// ─── Main HomePremiumSkeleton ───────────────────────────────────────────────
const HomePremiumSkeleton = () => {
  return (
    <View style={styles.container}>
      <TabSkeleton />

      <View style={styles.contentOverlay}>
        <SliderSkeleton />
        <HeaderRowSkeleton />

        <View style={styles.spacer} />

        <View style={styles.bottomBlock}>
          <TextInfoSkeleton />
          <CarouselSkeleton />
          <ActionButtonsSkeleton />
        </View>
      </View>
    </View>
  );
};

export default HomePremiumSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 10,
    gap: 4,
  },

  // ── Content Overlay ──
  contentOverlay: {
    flex: 1,
    paddingHorizontal: 14,
  },

  // ── Top Slider ──
  sliderContainer: {
    marginTop: 16,
    width: "100%",
  },
  sliderTrack: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    borderRadius: 100,
  },

  // ── Header Row ──
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

  // ── Spacer ──
  spacer: {
    flex: 1,
  },

  // ── Bottom Block ──
  bottomBlock: {
    width: "100%",
  },
  textSection: {
    alignItems: "center",
    width: "100%",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  genreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
  },

  // ── Carousel ──
  carouselContainer: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 14,
    marginBottom: 2,
  },

  // ── Action Buttons ──
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingTop: 12,
    paddingHorizontal: 4,
    paddingBottom: Platform.OS === "ios" ? 130 : 90,
  },
});

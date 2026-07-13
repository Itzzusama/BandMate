import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { COLORS } from "../utils/COLORS";

const SKELETON_COUNT = 3;

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

const SkeletonCard = ({ index }) => {
  return (
    <View style={styles.container}>
      {/* Left date column */}
      <View style={styles.dateContainer}>
        <ShimmerBlock width={35} height={14} borderRadius={4} />
        <ShimmerBlock
          width={30}
          height={28}
          borderRadius={4}
          style={{ marginTop: 6 }}
        />
      </View>

      {/* Right content area */}
      <View style={styles.rightContainer}>
        {/* Hero image placeholder */}
        <ShimmerBlock
          width="100%"
          height={170}
          borderRadius={8}
          style={{ backgroundColor: COLORS.cardColor }}
        />

        {/* Singer image + buttons row */}
        <View style={styles.actionRow}>
          <ShimmerBlock width={62} height={62} borderRadius={8} />

          <View style={styles.btnRow}>
            <ShimmerBlock width={80} height={50} borderRadius={10} />
            <ShimmerBlock width={65} height={50} borderRadius={10} />
          </View>
        </View>

        {/* "COMING ON" date line */}
        <ShimmerBlock
          width={index % 2 === 0 ? "50%" : "45%"}
          height={14}
          borderRadius={6}
          style={{ marginTop: 8 }}
        />

        {/* Event name line */}
        <ShimmerBlock
          width={index % 2 === 0 ? "80%" : "70%"}
          height={24}
          borderRadius={6}
          style={{ marginTop: 8 }}
        />

        {/* Genre row */}
        <View style={styles.genreRow}>
          <ShimmerBlock width={14} height={14} borderRadius={3} />
          <ShimmerBlock
            width={index % 2 === 0 ? "55%" : "40%"}
            height={12}
            borderRadius={6}
            style={{ marginLeft: 7 }}
          />
        </View>

        {/* Description lines */}
        <ShimmerBlock
          width="100%"
          height={12}
          borderRadius={6}
          style={{ marginTop: 6 }}
        />
        <ShimmerBlock
          width="90%"
          height={12}
          borderRadius={6}
          style={{ marginTop: 4 }}
        />
        <ShimmerBlock
          width={index % 2 === 0 ? "75%" : "60%"}
          height={12}
          borderRadius={6}
          style={{ marginTop: 4 }}
        />

        {/* Tags row */}
        <View style={styles.tagsRow}>
          <ShimmerBlock width={55} height={12} borderRadius={6} />
          <ShimmerBlock
            width={70}
            height={12}
            borderRadius={6}
            style={{ marginLeft: 8 }}
          />
          <ShimmerBlock
            width={80}
            height={12}
            borderRadius={6}
            style={{ marginLeft: 8 }}
          />
          <ShimmerBlock
            width={50}
            height={12}
            borderRadius={6}
            style={{ marginLeft: 8 }}
          />
        </View>
      </View>
    </View>
  );
};

const EventSkeleton = () => {
  return (
    <View style={styles.wrapper}>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <SkeletonCard key={index} index={index} />
      ))}
    </View>
  );
};

export default EventSkeleton;

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 90,
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 4,
    borderTopColor: COLORS.cardColor,
    marginBottom: 10,
  },
  dateContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: 45,
  },
  rightContainer: {
    flex: 1,
    marginLeft: 10,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btnRow: {
    flexDirection: "row",
    gap: 10,
  },
  genreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
});

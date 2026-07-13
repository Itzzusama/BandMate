import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { COLORS } from "../utils/COLORS";

const SKELETON_COUNT = 6;

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

const SkeletonRow = ({ index }) => {
  return (
    <View style={styles.card}>
      {/* Avatar */}
      <ShimmerBlock width={40} height={40} borderRadius={100} />

      {/* Text area */}
      <View style={styles.textBox}>
        {/* Name line */}
        <ShimmerBlock
          width={index % 2 === 0 ? "55%" : "40%"}
          height={14}
          borderRadius={6}
        />
        {/* Message line */}
        <ShimmerBlock
          width={index % 2 === 0 ? "75%" : "60%"}
          height={12}
          borderRadius={6}
          style={{ marginTop: 8 }}
        />
      </View>

      {/* Chevron placeholder */}
      <ShimmerBlock width={20} height={20} borderRadius={4} />
    </View>
  );
};

const ChatSkeleton = () => {
  return (
    <View style={styles.container}>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <SkeletonRow key={index} index={index} />
      ))}
    </View>
  );
};

export default ChatSkeleton;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 90,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardColor,
    paddingHorizontal: 15,
  },
  textBox: {
    flex: 1,
    marginLeft: 12,
  },
});

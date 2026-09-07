import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { COLORS } from "../utils/COLORS";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ─── Shimmer Block Component ────────────────────────────────────────────────
const ShimmerBlock = ({ width, height, borderRadius = 4, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.25, 0.65],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: COLORS.inputBg,
          opacity,
        },
        style,
      ]}
    />
  );
};

// ─── Moments Skeleton ───────────────────────────────────────────────────────
export const MomentsSkeleton = () => {
  return (
    <View style={styles.momentsWrapper}>
      {/* Header row: MOMENTS + PLAY ALL */}
      <View style={styles.momentsHeader}>
        <View style={styles.row}>
          <ShimmerBlock width={75} height={14} borderRadius={4} />
          <ShimmerBlock
            width={18}
            height={14}
            borderRadius={4}
            style={{ marginLeft: 6 }}
          />
        </View>
        <ShimmerBlock width={75} height={14} borderRadius={4} />
      </View>

      {/* Story circular bubbles row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.momentsScrollContent}
      >
        {/* 1st: Add Story bubble */}
        <View style={styles.storyBubbleItem}>
          <View style={styles.addStoryOuterCircle}>
            <ShimmerBlock
              width={64}
              height={64}
              borderRadius={32}
              style={{ backgroundColor: COLORS.cardColor }}
            />
          </View>
          <ShimmerBlock
            width={52}
            height={10}
            borderRadius={3}
            style={{ marginTop: 6 }}
          />
        </View>

        {/* Other Friend Story bubbles */}
        {[1, 2, 3, 4, 5].map((key) => (
          <View key={key} style={styles.storyBubbleItem}>
            <View style={styles.storyOuterRing}>
              <ShimmerBlock
                width={62}
                height={62}
                borderRadius={31}
                style={{ backgroundColor: COLORS.cardColor }}
              />
            </View>
            <ShimmerBlock
              width={54}
              height={10}
              borderRadius={3}
              style={{ marginTop: 6 }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// ─── PostCard Skeleton ──────────────────────────────────────────────────────
export const PostCardSkeleton = ({ marginBottom = 0 }) => {
  return (
    <View style={[styles.postCardContainer, { marginBottom }]}>
      {/* Header: Avatar ring + Name & Username + Follow button + More icon */}
      <View style={styles.postCardHeader}>
        <View style={styles.postCardUserInfo}>
          <View style={styles.postAvatarRing}>
            <ShimmerBlock
              width={34}
              height={34}
              borderRadius={17}
              style={{ backgroundColor: COLORS.cardColor }}
            />
          </View>
          <View style={styles.postCardNameBlock}>
            <ShimmerBlock width={115} height={14} borderRadius={4} />
            <ShimmerBlock
              width={75}
              height={11}
              borderRadius={4}
              style={{ marginTop: 4 }}
            />
          </View>
        </View>
        <View style={styles.postCardHeaderRight}>
          <ShimmerBlock width={64} height={30} borderRadius={8} />
          <ShimmerBlock
            width={26}
            height={26}
            borderRadius={13}
            style={{ marginLeft: 8 }}
          />
        </View>
      </View>

      {/* Hashtags / Topic row */}
      <View style={styles.postCardTagsRow}>
        <ShimmerBlock width={70} height={22} borderRadius={6} />
        <ShimmerBlock width={85} height={22} borderRadius={6} />
        <ShimmerBlock width={60} height={22} borderRadius={6} />
      </View>

      {/* Description lines */}
      <View style={styles.postCardDescription}>
        <ShimmerBlock width="92%" height={13} borderRadius={4} />
        <ShimmerBlock
          width="65%"
          height={13}
          borderRadius={4}
          style={{ marginTop: 5 }}
        />
      </View>

      {/* Media Carousel Box */}
      <View style={styles.postCardMediaContainer}>
        <ShimmerBlock
          width={SCREEN_WIDTH - 24}
          height={SCREEN_WIDTH - 24}
          borderRadius={16}
          style={{ backgroundColor: COLORS.cardColor }}
        />
      </View>

      {/* Pagination dots */}
      <View style={styles.postCardPagination}>
        <ShimmerBlock width={22} height={4} borderRadius={2} />
        <ShimmerBlock width={4} height={4} borderRadius={2} />
        <ShimmerBlock width={4} height={4} borderRadius={2} />
      </View>

      {/* Action buttons row (Upvote, Comment, Repost, Share, Save) */}
      <View style={styles.postCardActionsRow}>
        <ShimmerBlock width={58} height={28} borderRadius={6} />
        <ShimmerBlock width={52} height={28} borderRadius={6} />
        <ShimmerBlock width={52} height={28} borderRadius={6} />
        <ShimmerBlock width={52} height={28} borderRadius={6} />
        <ShimmerBlock width={52} height={28} borderRadius={6} />
      </View>

      {/* Post details: Reacted by, Comment preview, View all, Time ago */}
      <View style={styles.postCardDetails}>
        {/* Reacted by row */}
        <View style={styles.postCardReactedRow}>
          <ShimmerBlock width={16} height={16} borderRadius={8} />
          <ShimmerBlock
            width={140}
            height={12}
            borderRadius={4}
            style={{ marginLeft: 6 }}
          />
        </View>

        {/* Top comment preview */}
        <View style={styles.postCardCommentPreview}>
          <ShimmerBlock width="78%" height={13} borderRadius={4} />
          <ShimmerBlock
            width={14}
            height={14}
            borderRadius={3}
            style={{ marginLeft: 8 }}
          />
        </View>

        {/* View all comments */}
        <ShimmerBlock
          width={130}
          height={13}
          borderRadius={4}
          style={{ marginTop: 6 }}
        />

        {/* Time ago */}
        <ShimmerBlock
          width={65}
          height={11}
          borderRadius={4}
          style={{ marginTop: 4 }}
        />
      </View>

      {/* Bottom subtle divider */}
      <View style={styles.postCardDivider} />
    </View>
  );
};

// ─── Main SocialFeedsSkeleton ───────────────────────────────────────────────
const SocialFeedsSkeleton = ({ showMoments = true }) => {
  return (
    <View style={styles.container}>
      {/* Moments / Stories Row */}
      {showMoments && <MomentsSkeleton />}

      {/* Post Cards List */}
      <PostCardSkeleton />
      <PostCardSkeleton marginBottom={140} />
    </View>
  );
};

export default SocialFeedsSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Moments Styles
  momentsWrapper: {
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.04)",
    marginBottom: 8,
  },
  momentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  momentsScrollContent: {
    paddingHorizontal: 12,
    gap: 12,
  },
  storyBubbleItem: {
    alignItems: "center",
  },
  addStoryOuterCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderStyle: "dashed",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  storyOuterRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },

  // PostCard Styles
  postCardContainer: {
    paddingVertical: 6,
  },
  postCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  postCardUserInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  postAvatarRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  postCardNameBlock: {
    marginLeft: 8,
  },
  postCardHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  postCardTagsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  postCardDescription: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  postCardMediaContainer: {
    alignItems: "center",
    marginHorizontal: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  postCardPagination: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 4,
    marginVertical: 6,
  },
  postCardActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  postCardDetails: {
    paddingHorizontal: 12,
    marginTop: 6,
  },
  postCardReactedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  postCardCommentPreview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  postCardDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginTop: 14,
  },
});

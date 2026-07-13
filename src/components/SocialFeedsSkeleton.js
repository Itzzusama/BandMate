import React, { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, View } from "react-native";
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

// ─── Categories Skeleton ────────────────────────────────────────────────────
const CategoriesSkeleton = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
    >
      {/* Compass icon card */}
      <ShimmerBlock width={38} height={30} borderRadius={10} style={{ marginRight: 4 }} />
      {/* Category pills */}
      <ShimmerBlock width={60} height={30} borderRadius={8} style={{ marginRight: 4 }} />
      <ShimmerBlock width={120} height={30} borderRadius={8} style={{ marginRight: 4 }} />
      <ShimmerBlock width={90} height={30} borderRadius={8} style={{ marginRight: 4 }} />
    </ScrollView>
  );
};

// ─── Moments Skeleton ───────────────────────────────────────────────────────
const MomentsSkeleton = () => {
  return (
    <View style={styles.momentsWrapper}>
      {/* Header row: Social Feed dropdown + icon buttons */}
      <View style={[styles.momentsHeader, { paddingVertical: 0.1, marginBottom: 8 }]}>
        <ShimmerBlock width={130} height={32} borderRadius={99} />
        <View style={styles.momentsIconRow}>
          <ShimmerBlock width={32} height={32} borderRadius={99} />
          <ShimmerBlock width={32} height={32} borderRadius={99} />
        </View>
      </View>

      {/* Sub-header: MOMENTS + PLAY ALL */}
      <View style={styles.momentsHeader}>
        <ShimmerBlock width={80} height={14} borderRadius={6} />
        <ShimmerBlock width={90} height={14} borderRadius={6} />
      </View>

      {/* Moment cards row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.momentsScroll}
      >
        {/* Add moment button */}
        <View style={styles.addMomentSkeleton}>
          <ShimmerBlock width={28} height={28} borderRadius={14} />
        </View>
        {/* Moment cards */}
        <ShimmerBlock
          width={108}
          height={184}
          borderRadius={8}
          style={{ marginRight: 12, backgroundColor: COLORS.cardColor }}
        />
        <ShimmerBlock
          width={108}
          height={184}
          borderRadius={8}
          style={{ marginRight: 12, backgroundColor: COLORS.cardColor }}
        />
        <ShimmerBlock
          width={108}
          height={184}
          borderRadius={8}
          style={{ marginRight: 12, backgroundColor: COLORS.cardColor }}
        />
      </ScrollView>
    </View>
  );
};

// ─── FeedCard Skeleton ──────────────────────────────────────────────────────
const FeedCardSkeleton = () => {
  return (
    <View style={styles.feedCardContainer}>
      {/* Header: avatar + name + follow btn */}
      <View style={styles.feedCardHeader}>
        <View style={styles.feedCardUserInfo}>
          <ShimmerBlock width={32} height={32} borderRadius={16} />
          <View>
            <ShimmerBlock width={100} height={14} borderRadius={6} />
            <ShimmerBlock width={70} height={12} borderRadius={6} style={{ marginTop: 4 }} />
          </View>
        </View>
        <View style={styles.feedCardHeaderRight}>
          <ShimmerBlock width={60} height={30} borderRadius={8} />
          <ShimmerBlock width={32} height={32} borderRadius={99} />
        </View>
      </View>

      {/* Main image area */}
      <View style={styles.feedCardImageBox}>
        <ShimmerBlock
          width="100%"
          height="100%"
          borderRadius={0}
          style={{ backgroundColor: COLORS.cardColor }}
        />
        {/* Tags overlay */}
        <View style={styles.feedCardTagsRow}>
          <ShimmerBlock width={70} height={24} borderRadius={6} />
          <ShimmerBlock width={85} height={24} borderRadius={6} />
        </View>

        {/* Chart info overlay */}
        <View style={styles.feedCardChartInfo}>
          <ShimmerBlock width={180} height={22} borderRadius={8} />
        </View>

        {/* Rank + stats overlay */}
        <View style={styles.feedCardStatsContainer}>
          <View style={styles.feedCardRankRow}>
            <ShimmerBlock width={30} height={20} borderRadius={4} />
            <ShimmerBlock width={110} height={20} borderRadius={4} style={{ marginLeft: 4 }} />
          </View>
          <View style={styles.feedCardSocialStats}>
            <ShimmerBlock width={50} height={14} borderRadius={4} />
            <ShimmerBlock width={50} height={14} borderRadius={4} />
            <ShimmerBlock width={50} height={14} borderRadius={4} />
            <ShimmerBlock width={50} height={14} borderRadius={4} />
          </View>
        </View>

        {/* Footer buttons overlay */}
        <View style={styles.feedCardFooter}>
          <ShimmerBlock width={36} height={36} borderRadius={99} />
          <View style={{ flexDirection: "row", gap: 12 }}>
            <ShimmerBlock width={36} height={36} borderRadius={99} />
            <ShimmerBlock width={36} height={36} borderRadius={99} />
          </View>
        </View>
      </View>
    </View>
  );
};

// ─── PostCard Skeleton ──────────────────────────────────────────────────────
const PostCardSkeleton = ({ marginBottom }) => {
  return (
    <View style={[styles.postCardContainer, { marginBottom }]}>
      {/* Header: avatar + name + follow + dots */}
      <View style={styles.postCardHeader}>
        <View style={styles.postCardUserInfo}>
          <ShimmerBlock width={32} height={32} borderRadius={16} />
          <View>
            <ShimmerBlock width={110} height={14} borderRadius={6} />
            <ShimmerBlock width={75} height={12} borderRadius={6} style={{ marginTop: 4 }} />
          </View>
        </View>
        <View style={styles.postCardHeaderRight}>
          <ShimmerBlock width={60} height={30} borderRadius={8} />
          <ShimmerBlock width={32} height={32} borderRadius={99} />
        </View>
      </View>

      {/* Partnership row */}
      <View style={styles.postCardPartnerRow}>
        <ShimmerBlock width={20} height={20} borderRadius={4} />
        <ShimmerBlock width={140} height={12} borderRadius={6} style={{ marginLeft: 4 }} />
        <ShimmerBlock width={16} height={16} borderRadius={99} style={{ marginLeft: 4 }} />
        <ShimmerBlock width={70} height={12} borderRadius={6} style={{ marginLeft: 4 }} />
      </View>

      {/* Tags row */}
      <View style={styles.postCardTagsRow}>
        <ShimmerBlock width={65} height={24} borderRadius={99} />
        <ShimmerBlock width={65} height={24} borderRadius={99} />
        <ShimmerBlock width={65} height={24} borderRadius={99} />
      </View>

      {/* Main image */}
      <View style={styles.postCardImageWrapper}>
        <ShimmerBlock
          width="100%"
          height="100%"
          borderRadius={12}
          style={{ backgroundColor: COLORS.cardColor }}
        />
      </View>

      {/* Indicators */}
      <View style={styles.postCardIndicatorRow}>
        <ShimmerBlock width={6} height={6} borderRadius={4} />
        <ShimmerBlock width={32} height={6} borderRadius={6} />
        <ShimmerBlock width={6} height={6} borderRadius={4} />
        <ShimmerBlock width={6} height={6} borderRadius={4} />
      </View>

      {/* Action buttons row */}
      <View style={styles.postCardActionsRow}>
        <ShimmerBlock width={52} height={26} borderRadius={4} />
        <ShimmerBlock width={52} height={26} borderRadius={4} />
        <ShimmerBlock width={52} height={26} borderRadius={4} />
        <ShimmerBlock width={52} height={26} borderRadius={4} />
        <ShimmerBlock width={52} height={26} borderRadius={4} />
      </View>

      {/* Post details */}
      <View style={styles.postCardDetails}>
        {/* Reacted row */}
        <View style={styles.postCardReactedRow}>
          <ShimmerBlock width={16} height={16} borderRadius={4} />
          <ShimmerBlock width={180} height={14} borderRadius={6} style={{ marginLeft: 6 }} />
        </View>

        {/* Post description */}
        <ShimmerBlock width="95%" height={14} borderRadius={6} style={{ marginTop: 8 }} />
        <ShimmerBlock width="70%" height={14} borderRadius={6} style={{ marginTop: 4 }} />

        {/* Comment row */}
        <View style={styles.postCardCommentRow}>
          <ShimmerBlock width="85%" height={14} borderRadius={6} />
          <ShimmerBlock width={16} height={16} borderRadius={4} style={{ marginLeft: 6 }} />
        </View>

        {/* View all comments */}
        <ShimmerBlock width={160} height={14} borderRadius={6} style={{ marginTop: 4 }} />

        {/* Time ago */}
        <ShimmerBlock width={80} height={12} borderRadius={6} style={{ marginTop: 4 }} />
      </View>
    </View>
  );
};

// ─── Main SocialFeedsSkeleton ───────────────────────────────────────────────
const SocialFeedsSkeleton = () => {
  return (
    <View style={styles.wrapper}>
      <CategoriesSkeleton />
      <MomentsSkeleton />

      {/* Front Page header row */}
      <View style={styles.frontPageHeader}>
        <ShimmerBlock width={100} height={18} borderRadius={6} />
        <View style={styles.frontPageRight}>
          <ShimmerBlock width={110} height={12} borderRadius={6} />
          <ShimmerBlock width={16} height={16} borderRadius={99} />
        </View>
      </View>

      {/* Horizontal FeedCards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.feedCardsRow}
      >
        <FeedCardSkeleton />
        <FeedCardSkeleton />
      </ScrollView>

      {/* PostCards */}
      <PostCardSkeleton />
      <PostCardSkeleton marginBottom={140} />
    </View>
  );
};

export default SocialFeedsSkeleton;

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 20,
  },

  // ── Categories ──
  categoriesContainer: {
    paddingHorizontal: 12,
    marginTop: 4,
  },

  // ── Moments ──
  momentsWrapper: {
    marginVertical: 14,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.inputBg,
    paddingBottom: 12,
  },
  momentsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 12,
    marginTop: 3,
  },
  momentsIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  momentsScroll: {
    paddingHorizontal: 8,
  },
  addMomentSkeleton: {
    width: 104,
    height: 184,
    backgroundColor: COLORS.black,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderColor: COLORS.inputBg,
    borderWidth: 1,
  },

  // ── FeedCard ──
  feedCardContainer: {
    backgroundColor: COLORS.black,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    width: 320,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    borderBottomWidth: 0,
  },
  feedCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  feedCardUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  feedCardHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  feedCardImageBox: {
    width: 320,
    height: 320,
    position: "relative",
  },
  feedCardTagsRow: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  feedCardChartInfo: {
    position: "absolute",
    bottom: 103,
    left: 12,
  },
  feedCardStatsContainer: {
    position: "absolute",
    bottom: 52,
    left: 12,
    right: 12,
  },
  feedCardRankRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  feedCardSocialStats: {
    flexDirection: "row",
    gap: 9,
    marginTop: 4,
  },
  feedCardFooter: {
    position: "absolute",
    bottom: 10,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // ── PostCard ──
  postCardContainer: {
    backgroundColor: COLORS.black,
    borderTopWidth: 3,
    borderTopColor: COLORS.inputBg,
    paddingTop: 10,
  },
  postCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  postCardUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  postCardHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  postCardPartnerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    paddingHorizontal: 12,
  },
  postCardTagsRow: {
    gap: 4,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 20,
    marginTop: 10,
  },
  postCardImageWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    paddingHorizontal: 12,
  },
  postCardIndicatorRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 9,
    marginHorizontal: 12,
    gap: 8,
  },
  postCardActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  postCardDetails: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 10,
  },
  postCardReactedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  postCardCommentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  // ── Front Page Header ──
  frontPageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  frontPageRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  feedCardsRow: {
    paddingHorizontal: 12,
    gap: 10,
  },
});

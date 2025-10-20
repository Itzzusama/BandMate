import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import ImageFast from "../../../../components/ImageFast";
import { BlurView } from "@react-native-community/blur";
import { Images } from "../../../../assets/images";

const PostCard = ({
  displayName = "Display Name",
  username = "username",
  isVerified = true,
  partnershipWith = "ClubHouse",
  imageSource,
  stats = { likes: "1.4k", comments: "1.5M", shares: "1.5M" },
  reactedBy = "Webflow & 2 friends",
  postTitle = "Automatically detects when trips require...",
  commentUser = "User",
  commentText = "With the most liked comment",
  commentsCount = 919,
  timeAgo = "9 hours ago",
  activeIndex = 0, // ✅ which indicator is active
  totalIndicators = 4, // ✅ how many dots to show
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: "https://placehold.co/100x100" }}
            style={styles.avatar}
          />
          <View>
            <View style={styles.nameRow}>
              <CustomText
                label={displayName}
                fontSize={15}
                color={COLORS.white}
                fontFamily={fonts.semiBold}
              />
              {isVerified && (
                <Icons
                  family="MaterialIcons"
                  name="verified"
                  size={16}
                  color="#1DA1F2"
                />
              )}
            </View>
            <CustomText
              label={username}
              fontSize={13}
              color={COLORS.white3}
              fontFamily={fonts.regular}
            />
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.followButton}>
            <CustomText
              label="Follow"
              fontSize={13}
              fontFamily={fonts.medium}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icons
              family="Entypo"
              name="dots-three-vertical"
              size={16}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Partnership Row */}
      <View style={styles.partnerRow}>
        <Image source={PNGIcons.turn} style={{ height: 20, width: 20 }} />
        <CustomText
          label="in Partnership with"
          fontSize={12}
          color={COLORS.white3}
          marginLeft={4}
          lineHeight={12 * 1.4}
          marginRight={4}
        />
        <View style={styles.partnerBg} />
        <CustomText
          label={partnershipWith}
          fontSize={12}
          color={COLORS.white}
          fontFamily={fonts.semiBold}
          marginLeft={4}
          lineHeight={12 * 1.4}
        />
      </View>

      {/* Image + Blur + Gradient */}
      <View style={styles.imageWrapper}>
        <ImageFast source={imageSource} style={styles.image} resizeMode="cover">
          <View style={styles.bottomOverlay}>
            <LinearGradient
              colors={[
                "transparent",
                "rgba(255,255,255,0.05)",
                "rgba(255,255,255,0.2)",
                "rgba(255,255,255,0.5)",
              ]}
              style={styles.bottomGradient}
            />
          </View>

          {/* Action Buttons on Image */}
          <TouchableOpacity style={styles.usersButton}>
            <Image
              source={PNGIcons.users}
              style={{ height: 16, width: 16, resizeMode: "contain" }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.expandButton}>
            <Icons
              family="MaterialIcons"
              name="repeat"
              size={18}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </ImageFast>
      </View>

      {/* ✅ Indicator Row (below image) */}
      <View style={styles.indicatorContainer}>
        {Array.from({ length: totalIndicators }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.indicatorDot,
              i === activeIndex && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
      <View style={styles.actionsRow}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Image source={PNGIcons.heart} style={styles.reactionIocns} />
            <CustomText
              label={stats.likes}
              fontSize={14}
              color={COLORS.white}
              fontFamily={fonts.medium}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icons
              family="MaterialIcons"
              name="chat-bubble-outline"
              size={20}
              color={COLORS.white}
            />
            <CustomText
              label={stats.comments}
              fontSize={14}
              color={COLORS.white}
              fontFamily={fonts.medium}
              marginLeft={4}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Image source={Images.trending} style={styles.reactionIocns} />
            <CustomText
              label={stats.shares}
              fontSize={14}
              color={COLORS.white}
              fontFamily={fonts.medium}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icons
              family="MaterialIcons"
              name="repeat"
              size={24}
              color={COLORS.white}
            />
            <CustomText
              label={stats.shares}
              fontSize={14}
              color={COLORS.white}
              fontFamily={fonts.medium}
              marginLeft={4}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Image
            source={PNGIcons.save}
            style={[styles.reactionIocns, { marginRight: 0.1 }]}
          />
        </TouchableOpacity>
      </View>
      {/* Post Details */}
      <View style={styles.postDetails}>
        <View style={[styles.partnerRow, { paddingHorizontal: 0 }]}>
          <Image source={PNGIcons.webflow} style={{ height: 16, width: 16 }} />
          <CustomText
            label={`${reactedBy} `}
            fontSize={14}
            fontFamily={fonts.medium}
            marginLeft={6}
          />
          <CustomText
            label={`reacted to this post`}
            fontSize={12}
            color={COLORS.white3}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CustomText
            label={postTitle}
            fontSize={14}
            color={COLORS.white}
            numberOfLines={1}
            ellipsizeMode="tail"
            fontFamily={fonts.medium}
          />
          <CustomText
            label={"more"}
            fontSize={14}
            color={COLORS.white3}
            fontFamily={fonts.medium}
            marginLeft={16}
          />
        </View>

        <View style={[styles.commentRow]}>
          <View style={[styles.commentRow, { flex: 1, marginTop: 0 }]}>
            <CustomText
              label={`${commentUser} `}
              fontSize={14}
              color={COLORS.white}
              fontFamily={fonts.medium}
            />
            <CustomText
              label={`· `}
              fontSize={14}
              color={COLORS.white3}
              fontFamily={fonts.medium}
            />
            <CustomText
              label={`${commentText}`}
              fontSize={14}
              color={COLORS.white}
              fontFamily={fonts.regular}
            />
          </View>

          <Image
            source={PNGIcons.heart}
            style={{ height: 16, width: 16, marginLeft: 6 }}
          />
        </View>

        <TouchableOpacity style={{ marginTop: 4 }}>
          <CustomText
            label={`View all ${commentsCount} comments`}
            fontSize={14}
            color={COLORS.white3}
          />
        </TouchableOpacity>

        <CustomText
          label={timeAgo}
          fontSize={12}
          color={COLORS.white3}
          marginTop={2}
        />
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    borderTopWidth: 3,
    borderTopColor: COLORS.inputBg,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  userInfo: { flexDirection: "row", alignItems: "center", gap: 8 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 21,
    backgroundColor: "#D9D9D9",
  },
  partnerBg: {
    width: 16,
    height: 16,
    borderRadius: 99,
    backgroundColor: "#D9D9D9",
  },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  partnerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    paddingHorizontal: 12,
    paddingBottom: 7,
  },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  followButton: {
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.inputBg,
    borderRadius: 99,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    paddingHorizontal: 12,
  },
  image: {
    width: "100%",
    height: "98%",
    alignSelf: "center",
    borderRadius: 12,
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: "hidden",
  },
  expandButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#f1efef37",
    borderRadius: 20,
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  usersButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#f1efef37",
    borderRadius: 20,
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 9,
    borderBottomColor: "#FFFFFF0A",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginHorizontal: 12,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#222",
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 32,
    borderRadius: 6,
    backgroundColor: "#B6A47E", // beige-gold active color
  },
  postDetails: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 10,
  },
  commentRow: { flexDirection: "row", marginTop: 2 },
  reactionIocns: {
    height: 26,
    width: 26,
    resizeMode: "contain",
    marginRight: 4,
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "45%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  leftActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  actionButton: { flexDirection: "row", alignItems: "center" },
});

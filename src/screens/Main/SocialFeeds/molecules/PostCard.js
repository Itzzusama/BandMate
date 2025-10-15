import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import fonts from "../../../../assets/fonts";
import ImageFast from "../../../../components/ImageFast";
import { BlurView } from "@react-native-community/blur";

const PostCard = ({
  displayName = "Display Name",
  username = "username",
  isVerified = true,
  partnershipWith = "ClubHouse",
  imageSource,
  stats = { likes: "1.4k", comments: "1.5M", views: "1.5M", shares: "1.5M" },
  reactedBy = "Webflow & 2 friends",
  postTitle = "Automatically detects when trips require...",
  commentUser = "User",
  commentText = "With the most liked comment",
  commentsCount = 919,
  timeAgo = "9 hours ago",
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
              size={18}
              color={COLORS.white3}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.partnerRow}>
        <Icons
          family="Feather"
          name="corner-down-right"
          size={14}
          color={COLORS.white3}
        />
        <CustomText
          label="in Partnership with"
          fontSize={12}
          color={COLORS.white3}
          style={{ marginLeft: 4 }}
        />
        <CustomText
          label={partnershipWith}
          fontSize={12}
          color={COLORS.white}
          fontFamily={fonts.semiBold}
          style={{ marginLeft: 4 }}
        />
      </View>
      {/* Image Section */}
      <View style={styles.imageWrapper}>
        <ImageFast source={imageSource} style={styles.image} resizeMode="cover">
          <LinearGradient
            colors={[
              "transparent",
              "rgba(255,255,255,0.05)",
              "rgba(255,255,255,0.7)",
            ]}
            style={styles.whiteBlurOverlay}
          />
          {/* Bottom icons overlay (optional small icons on image) */}
          <TouchableOpacity style={styles.usersButton}>
            <Icons
              family="MaterialIcons"
              name="repeat"
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.expandButton}>
            <Icons
              family="MaterialIcons"
              name="repeat"
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </ImageFast>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icons
              family="AntDesign"
              name="hearto"
              size={20}
              color={COLORS.white}
            />
            <CustomText
              label={stats.likes}
              fontSize={13}
              color={COLORS.white}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icons
              family="Ionicons"
              name="chatbubble-outline"
              size={20}
              color={COLORS.white}
            />
            <CustomText
              label={stats.comments}
              fontSize={13}
              color={COLORS.white}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icons
              family="Feather"
              name="trending-up"
              size={20}
              color={COLORS.white}
            />
            <CustomText
              label={stats.views}
              fontSize={13}
              color={COLORS.white}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icons
              family="Ionicons"
              name="repeat-outline"
              size={20}
              color={COLORS.white}
            />
            <CustomText
              label={stats.shares}
              fontSize={13}
              color={COLORS.white}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Icons
            family="Feather"
            name="bookmark"
            size={20}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>

      {/* Reaction and Comments Section */}
      <View style={styles.postDetails}>
        <CustomText
          label={`${reactedBy} reacted to this post`}
          fontSize={13}
          color={COLORS.white3}
          fontFamily={fonts.medium}
        />

        <View style={{ marginTop: 4 }}>
          <CustomText
            label={postTitle}
            fontSize={14}
            color={COLORS.white}
            numberOfLines={1}
            ellipsizeMode="tail"
            fontFamily={fonts.semiBold}
          />
        </View>

        <View style={styles.commentRow}>
          <CustomText
            label={`${commentUser} `}
            fontSize={13}
            color={COLORS.white}
            fontFamily={fonts.semiBold}
          />
          <CustomText
            label={`· ${commentText}`}
            fontSize={13}
            color={COLORS.white3}
            fontFamily={fonts.regular}
          />
        </View>

        <TouchableOpacity style={{ marginTop: 4 }}>
          <CustomText
            label={`View all ${commentsCount} comments`}
            fontSize={13}
            color={COLORS.white3}
          />
        </TouchableOpacity>

        <CustomText
          label={timeAgo}
          fontSize={11}
          color={COLORS.white3}
          style={{ marginTop: 4 }}
        />
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white3,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  partnerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
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
  },
  image: {
    width: "96%",
    height: "90%",
    alignSelf: "center",
    borderRadius: 12,
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "35%",
  },
  expandButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#FFFFFF29",
    borderRadius: 20,
    padding: 6,
  },
  usersButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#FFFFFF29",
    borderRadius: 20,
    padding: 6,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  postDetails: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 10,
  },
  commentRow: {
    flexDirection: "row",
    marginTop: 2,
  },
  whiteBlurOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "35%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

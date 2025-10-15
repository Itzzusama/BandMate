import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import fonts from "../../../../assets/fonts";
import ImageFast from "../../../../components/ImageFast";
import { PNGIcons } from "../../../../assets/images/icons";
import { Images } from "../../../../assets/images";

const FeedCard = ({
  username = "@username",
  displayName = "Display Name",
  isVerified = true,
  imageSource,
  promo = true,
  sponsored = true,
  weeksOnChart = 2,
  rank = 1,
  percentageGain = "3,240%",
  timeframe = "2H",
  stats = { likes: "1.5M", comments: "1.5M", views: "1.5M", shares: "1.5M" },
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Left Side */}
        <View style={styles.userInfo}>
          <Image
            source={{ uri: "https://placehold.co/100x100" }}
            style={styles.avatar}
          />
          <View>
            <View style={styles.nameContainer}>
              <CustomText
                label={displayName}
                fontSize={14}
                fontFamily={fonts.medium}
                color={COLORS.white}
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
              fontSize={14}
              color={COLORS.white3}
              fontFamily={fonts.regular}
            />
          </View>
        </View>

        {/* Right Side */}
        <View style={styles.headerButtons}>
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

      <View style={styles.imageContainer}>
        <ImageFast
          source={imageSource}
          style={styles.mainImage}
          resizeMode="stretch"
        >
          <LinearGradient
            colors={[
              "rgba(0,0,0,0.1)",
              "rgba(0,0,0,0.2)",
              "rgba(0,0,0,0.7)",
              "rgba(0,0,0,0.9)",
            ]}
            style={styles.gradientOverlay}
          />

          {/* Top Tags */}
          <View style={styles.tagsRow}>
            {promo && (
              <View style={styles.promoTag}>
                <Icons
                  family={"FontAwesome6"}
                  name={"tag"}
                  color={COLORS.white}
                />
                <CustomText
                  label="PROMO"
                  fontSize={11}
                  fontFamily={fonts.medium}
                  color={COLORS.white}
                />
              </View>
            )}
            {sponsored && (
              <View style={styles.sponsoredTag}>
                <CustomText
                  label="SPONSORED"
                  fontSize={11}
                  fontFamily={fonts.medium}
                  color={COLORS.white}
                />
              </View>
            )}
          </View>

          {/* Chart Info */}
          <View style={styles.chartInfo}>
            <Image
              source={PNGIcons.award}
              style={{ height: 12, width: 12, resizeMode: "contain" }}
            />
            <CustomText
              label={`${weeksOnChart} consecutive weeks on the chart`}
              fontSize={10}
              color={COLORS.white}
              fontFamily={fonts.medium}
            />
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            {/* Rank Info */}
            <View style={styles.rankRow}>
              <View style={styles.rankBox}>
                <CustomText
                  label={`#${rank}`}
                  fontSize={12.5}
                  fontFamily={fonts.semiBold}
                  color={"#EE7623"}
                />
              </View>

              <View style={styles.gainBoxRow}>
                <View style={[styles.gainBox, { paddingVertical: 4 }]}>
                  <Icons
                    family="AntDesign"
                    name="caretup"
                    size={12}
                    color="#4CAF50"
                  />
                </View>
                <View style={styles.gainBox}>
                  <CustomText
                    label={`+3,240% IN 2H`}
                    fontSize={12.5}
                    fontFamily={fonts.semiBold}
                    color="#4CAF50"
                  />
                </View>
              </View>
            </View>

            {/* Bottom Stats */}
            <View style={styles.socialStats}>
              <View style={styles.statItem}>
                <Image
                  source={PNGIcons.heart}
                  style={{ height: 13, width: 13, resizeMode: "contain" }}
                />
                <CustomText
                  label={stats.likes}
                  fontSize={12}
                  color={COLORS.white}
                  fontFamily={fonts.medium}
                />
              </View>
              <View style={styles.statItem}>
                <Icons
                  family="MaterialIcons"
                  name="chat-bubble-outline"
                  size={14}
                  color={COLORS.white}
                />
                <CustomText
                  label={stats.comments}
                  fontSize={12}
                  color={COLORS.white}
                  fontFamily={fonts.medium}
                />
              </View>
              <View style={styles.statItem}>
                <Image
                  source={Images.trending}
                  style={{ height: 12, width: 12, resizeMode: "contain" }}
                />
                <CustomText
                  label={stats.shares}
                  fontSize={12}
                  color={COLORS.white}
                  fontFamily={fonts.medium}
                />
              </View>
              <View style={styles.statItem}>
                <Icons
                  family="MaterialIcons"
                  name="repeat"
                  size={14}
                  color={COLORS.white}
                />
                <CustomText
                  label={stats.shares}
                  fontSize={12}
                  color={COLORS.white}
                  fontFamily={fonts.medium}
                />
              </View>
            </View>
          </View>

          {/* Footer Buttons on Image */}
          <View style={styles.footerOnImage}>
            <TouchableOpacity style={styles.footerButton}>
              <Icons
                family="MaterialIcons"
                name="storefront"
                size={22}
                color={COLORS.white}
              />
            </TouchableOpacity>
            <View style={styles.footerRight}>
              <TouchableOpacity style={styles.footerButton}>
                <Icons
                  family="MaterialIcons"
                  name="favorite-border"
                  size={22}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerButton}>
                <Icons
                  family="MaterialIcons"
                  name="add-shopping-cart"
                  size={22}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageFast>
      </View>
    </View>
  );
};

export default FeedCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    width: 320,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    borderBottomWidth: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 21,
    backgroundColor: "#D9D9D9",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
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
  imageContainer: {
    width: 320,
    height: 320,
    aspectRatio: 1,
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  tagsRow: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  promoTag: {
    backgroundColor: "#4347FF",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  sponsoredTag: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chartInfo: {
    position: "absolute",
    bottom: 103,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderColor: "#FFFFFF29",
    borderWidth: 1,
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statsContainer: {
    position: "absolute",
    bottom: 52,
    left: 12,
    right: 12,
  },
  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rankBox: {
    backgroundColor: "#EE762329",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  gainBoxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  gainBox: {
    backgroundColor: "#37B87429",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  socialStats: {
    flexDirection: "row",
    gap: 9,
    marginTop: 4,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerOnImage: {
    position: "absolute",
    bottom: 10,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerRight: {
    flexDirection: "row",
    gap: 12,
  },
  footerButton: {
    padding: 7,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 99,
  },
});

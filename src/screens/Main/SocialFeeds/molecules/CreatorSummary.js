import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const CreatorSummary = ({
  isVisible,
  onClose,
  user,
  onMorePress,
  profileColor,
}) => {
  const navigation = useNavigation();

  const userAvatar = user?.profile?.avatar || user?.avatar;
  const firstName = user?.first_name || user?.firstName || "";
  const lastName =
    user?.sur_name ||
    user?.surname ||
    user?.last_name ||
    user?.lastName ||
    "";
  const displayName =
    `${firstName} ${lastName}`.trim() ||
    user?.displayName ||
    user?.username ||
    "User";
  const username = user?.username || user?.userName || "username";
  const occupation = user?.profile?.occupation || user?.occupation;
  const company = user?.profile?.company || user?.company;
  const degree = user?.profile?.degree || user?.degree;
  const major = user?.profile?.major || user?.major;
  const school = user?.profile?.school || user?.school;
  const location =
    user?.location?.address ||
    user?.profile?.location ||
    user?.location?.city ||
    user?.location?.country;

  const formatCount = (count) => {
    if (!count || count === 0) return "0";
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}k`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  return (
    <CustomModal
      isBlur
      isChange
      isVisible={isVisible}
      onDisable={onClose}
      reducedTransparencyFallbackColor="rgba(0,0,0,0.1)"
    >
      <View
        style={{
          margin: 10,
          borderRadius: 32,
          padding: 4,
          borderWidth: 1,
          overflow: "hidden",
          borderColor: "rgba(255, 255, 255, 0.16)",
        }}
      >
        {/* Blur Layer */}
        <BlurView
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="#FFFFFF29"
          style={[StyleSheet.absoluteFillObject, { borderRadius: 26 }]}
        />
        <View style={styles.modalContainer}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.userSection}>
              <View
                style={{
                  padding: 2,
                  borderColor: profileColor || COLORS.btnColor,
                  borderWidth: 2,
                  borderRadius: 99,
                }}
              >
                {userAvatar ? (
                  <ImageFast
                    source={{ uri: userAvatar }}
                    style={styles.avatar}
                  />
                ) : (
                  <View
                    style={[
                      styles.avatar,
                      {
                        backgroundColor:
                          user?.profile?.profileColor || COLORS.inputBg,
                      },
                    ]}
                  />
                )}
              </View>
              <View style={styles.userInfo}>
                <View style={styles.nameRow}>
                  <CustomText
                    label={displayName}
                    fontFamily={fonts.semiBold}
                    fontSize={16}
                    color={COLORS.white}
                  />
                  {(user?.role === "individual" || user?.isVerified) && (
                    <Image
                      source={Images.verified}
                      style={{ width: 14, height: 14, marginLeft: 4 }}
                    />
                  )}
                  {user?.role === "company" && (
                    <Image
                      source={Images.grayStar}
                      style={{ width: 14, height: 14, marginLeft: 4 }}
                    />
                  )}
                </View>
                <CustomText
                  label={`@${username}`}
                  color={COLORS.white3}
                  fontSize={14}
                />
              </View>
            </View>

            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={onMorePress}
                style={styles.iconButton}
              >
                <Image
                  source={Images.moreIcon}
                  style={[styles.actionIcon, { tintColor: COLORS.white }]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.iconButton}>
                <Image
                  source={Images.crossBg || Images.cross}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Details Section */}
          <View style={styles.detailsSection}>
            {/* Location */}
            {location && (
              <View style={styles.row}>
                <Image
                  source={Images.LocationPin}
                  style={[styles.smallIcon, { tintColor: "#007BFF" }]}
                />
                <CustomText
                  label={location}
                  color={"#007BFF"}
                  fontFamily={fonts.medium}
                />
              </View>
            )}

            {/* Work */}
            {(occupation || company) && (
              <View style={styles.row}>
                <Image
                  source={Images.suitcase}
                  style={[styles.smallIcon, { tintColor: COLORS.white }]}
                />
                {occupation && (
                  <CustomText
                    label={occupation}
                    fontFamily={fonts.medium}
                    fontSize={14}
                    color={COLORS.white}
                  />
                )}
                {occupation && company && (
                  <CustomText
                    label=" at "
                    fontFamily={fonts.medium}
                    fontSize={14}
                    color={COLORS.white3}
                    style={{ marginHorizontal: 4 }}
                  />
                )}
                {company && (
                  <CustomText
                    label={company}
                    fontFamily={fonts.medium}
                    fontSize={14}
                    color={COLORS.white}
                  />
                )}
              </View>
            )}

            {/* Education */}
            {(degree || major || school) && (
              <View style={styles.row}>
                <Image
                  source={Images.educationCap}
                  style={[styles.smallIcon, { tintColor: COLORS.white }]}
                />
                {degree && (
                  <CustomText
                    label={degree}
                    fontFamily={fonts.medium}
                    fontSize={14}
                    color={COLORS.white}
                  />
                )}
                {degree && major && (
                  <CustomText
                    label=" in "
                    fontFamily={fonts.medium}
                    fontSize={14}
                    color={COLORS.white3}
                    style={{ marginHorizontal: 4 }}
                  />
                )}
                {major && (
                  <CustomText
                    label={major}
                    fontFamily={fonts.medium}
                    fontSize={14}
                    color={COLORS.white}
                  />
                )}
                {(degree || major) && school && (
                  <CustomText
                    label=" from "
                    fontFamily={fonts.medium}
                    fontSize={14}
                    color={COLORS.white3}
                    style={{ marginHorizontal: 4 }}
                  />
                )}
                {school && !degree && !major && (
                  <CustomText
                    label={school}
                    fontFamily={fonts.medium}
                    fontSize={14}
                    color={COLORS.white}
                  />
                )}
              </View>
            )}
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <CustomText
                label={formatCount(user?.stats?.upvotes || user?.upvotesCount || 0)}
                fontFamily={fonts.semiBold}
                fontSize={17}
                color={COLORS.white}
              />
              <CustomText label="Likes" color={COLORS.white3} fontSize={12} />
            </View>
            <View style={styles.statItem}>
              <CustomText
                label={formatCount(user?.postsCount || user?.stats?.posts || 0)}
                fontFamily={fonts.semiBold}
                fontSize={17}
                color={COLORS.white}
              />
              <CustomText label="Posts" color={COLORS.white3} fontSize={12} />
            </View>
            <View style={styles.statItem}>
              <CustomText
                label={formatCount(user?.followersCount || user?.stats?.followers?.length || 0)}
                fontFamily={fonts.semiBold}
                fontSize={17}
                color={COLORS.white}
              />
              <CustomText label="Followers" color={COLORS.white3} fontSize={12} />
            </View>
            <View style={styles.statItem}>
              <CustomText
                label={formatCount(user?.subsCount || user?.stats?.following?.length || 0)}
                fontFamily={fonts.semiBold}
                fontSize={17}
                color={COLORS.white}
              />
              <CustomText label="Following" color={COLORS.white3} fontSize={12} />
            </View>
          </View>

          {/* Bio Section */}
          <View style={styles.bioSection}>
            <CustomText
              label={user?.profile?.bio || user?.bio || "No bio available"}
              color={COLORS.white2}
              fontSize={14}
            />
          </View>
        </View>
      </View>
    </CustomModal>
  );
};

export default CreatorSummary;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.black,
    borderRadius: 28,
    width: "100%",
    alignSelf: "center",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: COLORS.inputBg,
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconButton: {
    padding: 4,
    backgroundColor: COLORS.inputBg,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  actionIcon: {
    height: 28,
    width: 28,
  },
  detailsSection: {
    gap: 6,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginRight: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  bioSection: {
    marginBottom: 4,
  },
});

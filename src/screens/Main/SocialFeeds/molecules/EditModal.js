import { BlurView } from "@react-native-community/blur";
import { useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const EditModal = ({
  isVisible,
  onClose,
  displayName,
  username,
  userImage = Images.person,
  postCaption = [],
  isOwner = false,
  onEditPress,
  onReschedulePress,
  onDeletePress,
  onHidePost,
  onHideUserPosts,
  user,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const userAvatar = user?.profile?.avatar || user?.avatar;
  const profileColor = user?.profile?.profileColor || COLORS.inputBg;

  const firstName = user?.first_name || user?.firstName || "";
  const lastName =
    user?.sur_name ||
    user?.surname ||
    user?.last_name ||
    user?.lastName ||
    "";
  const effectiveDisplayName =
    displayName ||
    `${firstName} ${lastName}`.trim() ||
    user?.displayName ||
    user?.username ||
    "Display Name";
  const effectiveUsername =
    username || user?.username || user?.userName || "username";

  // Owner options data
  const ownerOptions = [
    {
      id: "edit",
      icon: Images.editBg || Images.edit,
      title: "Edit Post",
      subtitle: "Fine tune before publishing",
      onPress: () => {
        onClose();
        if (onEditPress) onEditPress();
      },
    },
    {
      id: "reschedule",
      icon: Images.clockBg || Images.clock,
      title: "Reschedule",
      subtitle: "Edit date & time",
      onPress: () => {
        onClose();
        if (onReschedulePress) onReschedulePress();
      },
    },
  ];

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
              {userAvatar ? (
                <ImageFast source={{ uri: userAvatar }} style={styles.avatar} />
              ) : (
                <View
                  style={[styles.avatar, { backgroundColor: profileColor }]}
                />
              )}
              <View style={styles.userInfo}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CustomText
                    label={effectiveDisplayName}
                    fontFamily={fonts.medium}
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
                  label={`@${effectiveUsername}`}
                  color={COLORS.white3}
                  fontSize={14}
                />
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image
                source={Images.crossBg || Images.cross}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Options Section */}
          {isOwner ? (
            /* Owner Options */
            <View style={styles.optionsSection}>
              {ownerOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionRow}
                  onPress={option.onPress}
                >
                  <View style={styles.optionLeft}>
                    <Image source={option.icon} style={styles.optionIcon} />
                    <View>
                      <CustomText
                        label={option.title}
                        fontFamily={fonts.medium}
                        fontSize={15}
                        color={COLORS.white}
                      />
                      <CustomText
                        label={option.subtitle}
                        color={COLORS.white3}
                        fontSize={14}
                      />
                    </View>
                  </View>
                  <Image
                    source={Images.forwardIcon}
                    style={styles.forwardIcon}
                  />
                </TouchableOpacity>
              ))}

              {/* Delete Post - Red */}
              <TouchableOpacity
                style={styles.reportRow}
                onPress={() => {
                  onClose();
                  Alert.alert(
                    "Delete Post",
                    "Are you sure you want to delete this post? This action cannot be undone.",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => {
                          if (onDeletePress) onDeletePress();
                        },
                      },
                    ],
                  );
                }}
              >
                <View style={styles.reportLeft}>
                  <Image source={Images.reportBg} style={styles.reportIcon} />
                  <View>
                    <CustomText
                      label="Delete post"
                      fontFamily={fonts.medium}
                      fontSize={15}
                      color="rgba(238, 16, 69, 1)"
                    />
                    <CustomText
                      label="Cannot recover after deletion"
                      color={COLORS.white3}
                      fontSize={14}
                    />
                  </View>
                </View>
                <Image source={Images.forwardIcon} style={styles.forwardIcon} />
              </TouchableOpacity>
            </View>
          ) : (
            /* Non-Owner Options */
            <>
              <View style={styles.optionsSection}>
                {/* Hide this post option */}
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => {
                    setSelectedOption("hidePost");
                    onHidePost && onHidePost();
                    onClose();
                  }}
                >
                  <View style={styles.optionLeft}>
                    <Image
                      source={Images.hideBg || Images.hide}
                      style={styles.optionIcon}
                    />
                    <View>
                      <CustomText
                        label="Hide this post"
                        fontFamily={fonts.medium}
                        fontSize={14}
                        color={COLORS.white}
                      />
                      <CustomText
                        label="Hide User's post"
                        color={COLORS.white3}
                        fontSize={14}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      selectedOption === "hidePost" &&
                        styles.radioButtonSelected,
                    ]}
                  >
                    {selectedOption === "hidePost" && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>

                {/* Hide User's posts option */}
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => {
                    setSelectedOption("hideUser");
                    onHideUserPosts && onHideUserPosts();
                    onClose();
                  }}
                >
                  <View style={styles.optionLeft}>
                    <Image
                      source={Images.hideBg || Images.hide}
                      style={styles.optionIcon}
                    />
                    <View>
                      <CustomText
                        label="Hide User's posts"
                        fontFamily={fonts.medium}
                        fontSize={14}
                        color={COLORS.white}
                      />
                      <CustomText
                        label="Hide User's future posts"
                        color={COLORS.white3}
                        fontSize={14}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      styles.radioButton,
                      selectedOption === "hideUser" &&
                        styles.radioButtonSelected,
                    ]}
                  >
                    {selectedOption === "hideUser" && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Report Section */}
              <TouchableOpacity
                style={styles.reportRow}
                onPress={() => {
                  Alert.alert(
                    "Report Post",
                    "This post will be hidden and reported to admin",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Confirm",
                        onPress: () => {
                          onHidePost && onHidePost();
                          onClose();
                        },
                      },
                    ],
                  );
                }}
              >
                <View style={styles.reportLeft}>
                  <Image source={Images.reportBg} style={styles.reportIcon} />
                  <View>
                    <CustomText
                      label="Report this post"
                      fontFamily={fonts.medium}
                      fontSize={15}
                      color="rgba(238, 16, 69, 1)"
                    />
                    <CustomText
                      label="Reports are anonymous"
                      color={COLORS.white3}
                      fontSize={14}
                    />
                  </View>
                </View>
                <Image source={Images.forwardIcon} style={styles.forwardIcon} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </CustomModal>
  );
};

export default EditModal;

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
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBg,
    paddingBottom: 16,
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
  closeButton: {
    padding: 4,
    backgroundColor: COLORS.inputBg,
    borderRadius: 20,
  },
  closeIcon: {
    height: 32,
    width: 32,
    tintColor: COLORS.white,
  },
  optionsSection: {
    marginTop: 12,
    gap: 4,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionIcon: {
    height: 40,
    width: 40,
    tintColor: COLORS.white,
    marginRight: 10,
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.white3,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: COLORS.btnColor,
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.btnColor,
  },
  reportRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  reportLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  reportIcon: {
    height: 40,
    width: 40,
    tintColor: "rgba(238, 16, 69, 1)",
    marginRight: 10,
  },
  forwardIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.white3,
  },
});

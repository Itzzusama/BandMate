import { BlurView } from "@react-native-community/blur";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";

const SummaryMore = ({
  isVisible,
  onClose,
  onViewProfile,
  onSendMessage,
  onRemoveFriend,
  onReportPost,
  userId,
  isFollowing,
}) => {
  const { userData } = useSelector((state) => state.users);

  const menuOptions = [
    ...(userData?._id !== userId
      ? [
          {
            id: "sendMessage",
            icon: Images.commentReply,
            label: "Send a message",
            onPress: () => {
              onClose();
              if (onSendMessage) onSendMessage();
            },
            showArrow: true,
          },
        ]
      : []),

    {
      id: "viewProfile",
      icon: Images.commentEye,
      label: "View profile",
      onPress: () => {
        onClose();
        if (onViewProfile) onViewProfile();
      },
      showArrow: true,
    },

    ...(userData?._id !== userId
      ? [
          {
            id: "removeFriend",
            icon: Images.commentFriend,
            label: isFollowing ? "Unfollow User" : "Follow User",
            onPress: () => {
              onClose();
              if (onRemoveFriend) onRemoveFriend();
            },
            showArrow: true,
          },
        ]
      : []),
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
          margin: 12,
          borderRadius: 30,
          padding: 5,
          borderWidth: 1,
          overflow: "hidden",
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          borderColor: "rgba(255, 255, 255, 0.22)",
        }}
      >
        <View style={styles.modalContainer}>
          {/* Menu Options */}
          <View style={styles.optionsSection}>
            {menuOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionRow}
                onPress={option.onPress}
              >
                <View style={styles.optionLeft}>
                  <Image
                    source={option.icon}
                    style={[styles.optionIcon, { tintColor: COLORS.white }]}
                  />
                  <View style={styles.optionTextContainer}>
                    <CustomText
                      label={option.label}
                      fontFamily={fonts.medium}
                      fontSize={15}
                      color={COLORS.white}
                    />
                  </View>
                </View>
                {option.showArrow && (
                  <Image
                    source={Images.forwardIcon}
                    style={[
                      styles.forwardIcon,
                      { tintColor: COLORS.white3 },
                    ]}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Report Section */}
          {userData?._id !== userId && (
            <TouchableOpacity
              style={styles.reportRow}
              onPress={() => {
                onClose();
                if (onReportPost) onReportPost();
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
                    marginTop={2}
                  />
                </View>
              </View>
              <Image
                source={Images.forwardIcon}
                style={[
                  styles.forwardIcon,
                  { tintColor: "rgba(238, 16, 69, 1)" },
                ]}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </CustomModal>
  );
};

export default SummaryMore;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.black,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    width: "100%",
    alignSelf: "center",
    padding: 16,
  },
  optionsSection: {
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
    height: 36,
    width: 36,
    tintColor: COLORS.white,
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  forwardIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.white3,
  },
  reportRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 8,
  },
  reportLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  reportIcon: {
    height: 36,
    width: 36,
    tintColor: "rgba(238, 16, 69, 1)",
    marginRight: 12,
  },
});

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
          margin: 10,
          borderRadius: 32,
          padding: 4,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.16)",
        }}
      >
        <BlurView
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="#FFFFFF29"
          style={[StyleSheet.absoluteFillObject, { borderRadius: 26 }]}
        />
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
        </View>
      </View>
    </CustomModal>
  );
};

export default SummaryMore;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.black,
    borderRadius: 28,
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
});

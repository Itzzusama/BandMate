import { BlurView } from "@react-native-community/blur";
import { useCallback } from "react";
import {
  Clipboard,
  Image,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { post } from "../../../../services/ApiRequest";
import { COLORS } from "../../../../utils/COLORS";
import { ToastMessage } from "../../../../utils/ToastMessage";

const ShareModal = ({
  isVisible,
  onClose,
  postImage,
  username,
  date,
  onShareToStory,
  onCopyLink,
  onShareExternally,
  postId,
  urlPrefix = "bandmate://post/",
  shouldTrackShare = true,
  shareMessage,
}) => {
  const postUrl = `${urlPrefix}${postId}`;
  const externalShareMessage =
    shareMessage || `Check out this post on BandMate: ${postUrl}`;

  const trackShare = async () => {
    if (!shouldTrackShare || !postId) return;
    try {
      await post(`posts/${postId}/repost`, {
        type: "share",
      });
    } catch (e) {
      console.log("Error tracking share:", e);
    }
  };

  const renderBackdrop = useCallback(
    () => (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={StyleSheet.absoluteFill}
      >
        <BlurView
          pointerEvents="none"
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.1)"
          style={StyleSheet.absoluteFill}
        />
        <View pointerEvents="none" style={styles.backdropDim} />
      </TouchableOpacity>
    ),
    [onClose],
  );

  const handleCopyLink = async () => {
    onClose();
    ToastMessage("Copying link...", "info");
    try {
      await trackShare();
      Clipboard.setString(postUrl);
      ToastMessage("Link copied to clipboard", "success");
      if (onCopyLink) onCopyLink();
    } catch (error) {
      console.error("Error copying link:", error);
    }
  };

  const handleShareToStory = () => {
    onClose();
    ToastMessage("Sharing to story...", "info");
    if (onShareToStory) onShareToStory();
  };

  const handleShareExternally = async () => {
    onClose();
    ToastMessage("Opening share menu...", "info");
    try {
      await trackShare();
      Clipboard.setString(postUrl);
      const result = await Share.share({
        message: externalShareMessage,
        url: postUrl,
      });
      if (onShareExternally) onShareExternally(result);
    } catch (error) {
      console.error("Error sharing externally:", error);
    }
  };

  return (
    <CustomModal
      isBlur
      isChange
      isVisible={isVisible}
      onDisable={onClose}
      customBackdrop={renderBackdrop()}
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
        {/* Blur Layer */}
        <BlurView
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="#FFFFFF29"
          style={[StyleSheet.absoluteFillObject, { borderRadius: 26 }]}
        />
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <CustomText
              label="What Do You Want To Do?"
              fontFamily={fonts.semiBold}
              fontSize={16}
              color={COLORS.white}
            />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icons
                name="close"
                family="AntDesign"
                color={COLORS.white}
                size={16}
              />
            </TouchableOpacity>
          </View>

          {/* Post Preview */}
          <View style={styles.previewContainer}>
            <Image
              source={
                typeof postImage === "string" ? { uri: postImage } : postImage
              }
              style={styles.previewImage}
              resizeMode="cover"
            />
            <CustomText
              label="Post"
              fontFamily={fonts.medium}
              marginTop={12}
              color={COLORS.white}
            />
            <CustomText label={`By ${username}`} color={COLORS.white3} />
            <CustomText label={date} color={COLORS.white3} fontSize={12} />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleShareToStory}
            >
              <View style={styles.iconCircle}>
                <Image source={Images.shareTo} style={styles.icon} />
              </View>
              <CustomText
                label="Share To"
                fontFamily={fonts.medium}
                fontSize={16}
                color={COLORS.white3}
                marginTop={8}
              />
              <CustomText
                label="Story"
                fontFamily={fonts.medium}
                fontSize={16}
                color={COLORS.white3}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleCopyLink}
            >
              <View style={styles.iconCircle}>
                <Image source={Images.copy} style={styles.icon} />
              </View>
              <CustomText
                label="Copy Link"
                fontFamily={fonts.medium}
                fontSize={16}
                color={COLORS.white3}
                marginTop={8}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleShareExternally}
            >
              <View style={styles.iconCircle}>
                <Image source={Images.shareUp} style={styles.icon} />
              </View>
              <CustomText
                label="Externally"
                fontFamily={fonts.medium}
                fontSize={16}
                color={COLORS.white3}
                marginTop={8}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomModal>
  );
};

export default ShareModal;

const styles = StyleSheet.create({
  backdropDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.64)",
  },
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
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
    backgroundColor: COLORS.inputBg,
    borderRadius: 20,
  },
  previewContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: COLORS.gray,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  actionItem: {
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 99,
    backgroundColor: COLORS.inputBg,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 32,
    width: 32,
    tintColor: COLORS.white,
  },
});

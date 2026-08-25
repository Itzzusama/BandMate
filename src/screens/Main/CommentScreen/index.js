import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import BottomSheetComponent from "../../../components/BottomSheetComponent";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import UploadImageCustom from "../../../components/UploadImageCustom";
import { del, get, post, put } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { ToastMessage } from "../../../utils/ToastMessage";
import { uploadAndGetUrl } from "../../../utils/constants";
import CommentModal from "./molecules/CommentModal";

const CommentScreen = ({ route }) => {
  const navigation = useNavigation();
  const sheetRef = useRef(null);
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const item = route?.params?.item || {};
  const postId = item?._id || route?.params?.postId;

  // Comments state
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("mostRecent");

  // Comment input state
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const inputRef = useRef(null);

  const { userData } = useSelector((state) => state.users);
  const snapPoints = useMemo(() => ["55%", "70%", "100%"], []);

  const emojiData = useMemo(
    () => [
      {
        char: "😀",
        url: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/lottie.json",
      },
      {
        char: "😂",
        url: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f602/lottie.json",
      },
      {
        char: "😍",
        url: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60d/lottie.json",
      },
      {
        char: "🥲",
        url: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f972/lottie.json",
      },
      {
        char: "😎",
        url: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60e/lottie.json",
      },
      {
        char: "🤯",
        url: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f92f/lottie.json",
      },
      {
        char: "😭",
        url: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/lottie.json",
      },
    ],
    []
  );

  // Fetch comments
  const fetchComments = useCallback(async () => {
    if (!postId) return;
    try {
      setLoading(true);
      const res = await get(`posts/${postId}/comment?sortBy=${sortBy}`);
      if (res?.data?.success) {
        setComments(res?.data?.data || []);
      }
    } catch (e) {
      console.log("Error fetching comments:", e);
    } finally {
      setLoading(false);
    }
  }, [postId, sortBy]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Reply handler
  const handleReply = useCallback((comment) => {
    setReplyingTo(comment);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const cancelReply = useCallback(() => {
    setReplyingTo(null);
  }, []);

  // Image attachment
  const handleImageSelected = async (image) => {
    try {
      setShowImagePicker(false);
      setIsUploadingImage(true);
      const url = await uploadAndGetUrl(image);
      if (url) {
        setSelectedImageUrl(url);
      }
    } catch (e) {
      console.log("Error uploading image:", e);
      ToastMessage("Failed to upload image", "error");
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Send comment or reply
  const handleSendComment = async () => {
    if ((!commentText.trim() && !selectedImageUrl) || isSubmitting) return;

    setIsSubmitting(true);
    try {
      let endpoint = `posts/${postId}/comment`;
      let payload = {
        comment: commentText.trim(),
        image: selectedImageUrl,
      };

      if (replyingTo?._id) {
        endpoint = `posts/${postId}/comment/${replyingTo._id}/reply`;
      }

      const res = await post(endpoint, payload);
      if (res?.data?.success) {
        setCommentText("");
        setSelectedImageUrl(null);
        setReplyingTo(null);
        Keyboard.dismiss();
        fetchComments();
      } else {
        ToastMessage("Failed to post comment", "error");
      }
    } catch (e) {
      console.log("Error posting comment:", e);
      ToastMessage("Failed to post comment", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Like reaction on comment or reply
  const handleLikeReaction = async (comment, isReply = false, parentCommentId = null) => {
    if (!postId || !comment?._id) return;
    try {
      const endpoint = isReply
        ? `posts/${postId}/comment/${parentCommentId}/reply/${comment._id}/reaction`
        : `posts/${postId}/comment/${comment._id}/reaction`;

      await put(endpoint, { reaction: "like" });
      fetchComments();
    } catch (e) {
      console.log("Error liking comment:", e);
    }
  };

  // Delete comment
  const handleDeleteComment = async (comment) => {
    if (!postId || !comment?._id) return;
    try {
      await del(`posts/${postId}/comment/${comment._id}`);
      ToastMessage("Comment deleted");
      fetchComments();
    } catch (e) {
      console.log("Error deleting comment:", e);
      ToastMessage("Failed to delete comment", "error");
    }
  };

  // Hide comment
  const handleHideComment = async (comment) => {
    if (!comment?._id) return;
    try {
      await post("hide/comment", { commentId: comment._id });
      ToastMessage("Comment hidden");
      setComments((prev) => prev.filter((c) => c._id !== comment._id));
    } catch (e) {
      console.log("Error hiding comment:", e);
    }
  };

  // Hide user comments
  const handleHideUserComments = async (user) => {
    if (!user?._id) return;
    try {
      await post("hide/user-comment", { userId: user._id });
      ToastMessage(`Hidden all comments from ${user?.username || "user"}`);
      setComments((prev) => prev.filter((c) => c?.user?._id !== user._id));
    } catch (e) {
      console.log("Error hiding user comments:", e);
    }
  };

  // Report comment
  const handleReportComment = async (comment) => {
    if (!comment?._id) return;
    try {
      await post("report/comment", { commentId: comment._id });
      ToastMessage("Comment reported to admin", "success");
      setComments((prev) => prev.filter((c) => c._id !== comment._id));
    } catch (e) {
      console.log("Error reporting comment:", e);
    }
  };

  const handleEmojiPress = (emojiChar) => {
    setCommentText((prev) => prev + emojiChar);
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      {/* Background Overlay */}
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      />

      {/* Input Container (Fixed above bottom) */}
      <View style={[styles.inputContainer, { bottom: Platform.OS === "ios" ? 100 : 80 }]}>
        {/* Reply Indicator Bar */}
        {replyingTo && (
          <View style={styles.replyIndicator}>
            <View style={styles.replyIndicatorLeft}>
              <CustomText
                label={`Replying to @${
                  replyingTo?.user?.username ||
                  replyingTo?.user?.firstName ||
                  "user"
                }`}
                fontSize={13}
                color={COLORS.white}
                fontFamily={fonts.medium}
              />
            </View>
            <TouchableOpacity onPress={cancelReply}>
              <Image
                source={Images.commentCross || Images.cross}
                style={{ width: 18, height: 18, tintColor: COLORS.white3 }}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Input Bar Row */}
        <View style={[styles.inputRow, { marginTop: replyingTo ? 6 : 0 }]}>
          <View style={styles.inputWrapper}>
            {selectedImageUrl ? (
              <View style={{ position: "relative", marginRight: 6 }}>
                <ImageFast
                  source={{ uri: selectedImageUrl }}
                  style={styles.previewImageInline}
                />
                <TouchableOpacity
                  style={styles.removeImageBtnInline}
                  onPress={() => setSelectedImageUrl(null)}
                >
                  <Icons name="close" family="Ionicons" size={12} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            ) : null}

            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder={
                replyingTo
                  ? `Reply to @${replyingTo?.user?.username || "user"}...`
                  : "Add a comment..."
              }
              placeholderTextColor={COLORS.white3}
              value={commentText}
              onChangeText={setCommentText}
              multiline
              maxLength={500}
            />

            {/* Camera / Upload Image button */}
            <TouchableOpacity
              onPress={() => setShowImagePicker(true)}
              disabled={isUploadingImage}
            >
              {isUploadingImage ? (
                <ActivityIndicator size="small" color={COLORS.btnColor} />
              ) : (
                <Image
                  source={Images.commentCam || Images.camera}
                  style={{
                    height: 22,
                    width: 22,
                    marginHorizontal: 4,
                    tintColor: COLORS.white3,
                  }}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          </View>

          {/* Send Button */}
          <TouchableOpacity
            onPress={handleSendComment}
            style={[
              styles.sendBtn,
              ((!commentText.trim() && !selectedImageUrl) || isSubmitting) &&
                styles.sendBtnDisabled,
            ]}
            disabled={(!commentText.trim() && !selectedImageUrl) || isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Icons
                name="arrow-right"
                family="Feather"
                size={18}
                color={COLORS.white}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Animated Emoji Strip */}
        <View style={styles.emojiStripContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.emojiStripContent}
          >
            {emojiData.map((emoji, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={styles.emojiItem}
                onPress={() => handleEmojiPress(emoji.char)}
                activeOpacity={0.7}
              >
                <LottieView
                  source={{ uri: emoji.url }}
                  autoPlay
                  loop
                  style={{ width: 32, height: 32 }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Bottom Sheet Component */}
      <View
        style={{
          height: screenHeight,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        <BottomSheetComponent
          ref={sheetRef}
          snapPoints={snapPoints}
          enableScrollView={false}
          enableDynamicSizing={false}
          initialIndex={0}
          enablePanDownToClose={false}
        >
          <View style={styles.sheetHeader}>
            <CustomText
              fontFamily={fonts.semiBold}
              label={`${comments.length || 0} Comment${
                comments.length !== 1 ? "s" : ""
              }`}
              fontSize={18}
              color={COLORS.white}
            />
            <TouchableOpacity onPress={handleClose}>
              <ImageFast
                source={Images.commentCross || Images.cross}
                style={styles.closeIcon}
                tintColor={COLORS.white}
              />
            </TouchableOpacity>
          </View>
          <CommentModal
            isBottom
            comments={comments}
            loading={loading}
            post={item}
            onReply={handleReply}
            onLike={handleLikeReaction}
            userData={userData}
            onTabChange={(tabMode) => setSortBy(tabMode)}
            onHideComment={handleHideComment}
            onDeleteComment={handleDeleteComment}
            onHideUserComments={handleHideUserComments}
            onReportComment={handleReportComment}
            currentTab={
              sortBy === "mostLiked" ? 0 : sortBy === "mostRecent" ? 1 : null
            }
          />
        </BottomSheetComponent>
      </View>

      {/* Image Picker Modal */}
      <UploadImageCustom
        imageModal={showImagePicker}
        setImageModal={setShowImagePicker}
        handleChange={handleImageSelected}
        handleCapture={handleImageSelected}
        onDelete={() => {}}
      />
    </ScreenWrapper>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingBottom: 4,
    paddingTop: 8,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: COLORS.black,
  },
  closeIcon: {
    width: 28,
    height: 28,
  },
  inputContainer: {
    position: "absolute",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 14,
    zIndex: 999,
    backgroundColor: "transparent",
  },
  replyIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    marginBottom: 4,
  },
  replyIndicatorLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minHeight: 46,
    maxHeight: 46,
    borderRadius: 99,
    backgroundColor: COLORS.inputBg,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 6,
    color: COLORS.white,
    fontFamily: fonts.regular,
    padding: 0,
  },
  sendBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: COLORS.btnColor,
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
  previewImageInline: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  removeImageBtnInline: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -6,
    right: -6,
  },
  emojiStripContainer: {
    marginTop: 6,
  },
  emojiStripContent: {
    paddingHorizontal: 4,
  },
  emojiItem: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
});

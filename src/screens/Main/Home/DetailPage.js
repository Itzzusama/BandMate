import { BlurView } from "@react-native-community/blur";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import Blur from "../../../components/Blur";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import UploadImageCustom from "../../../components/UploadImageCustom";
import { del, get, post, put } from "../../../services/ApiRequest";
import { setUserData } from "../../../store/reducer/usersSlice";
import { COLORS } from "../../../utils/COLORS";
import { uploadAndGetUrl } from "../../../utils/constants";
import { ToastMessage } from "../../../utils/ToastMessage";
import CommentModal from "../CommentScreen/molecules/CommentModal";
import EditModal from "../SocialFeeds/molecules/EditModal";
import PostCard from "../SocialFeeds/molecules/PostCard";

const DetailPage = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const routeItem = route?.params?.item || {};
  const postId = route?.params?.postId || routeItem._id || routeItem.id;
  const [item, setItem] = useState(routeItem);
  const author = item?.author || {};

  const userData = useSelector((state) => state.users.userData);

  const isOwner = (author._id || author.id) === (userData?._id || userData?.id);
  const [showModal, setShowModal] = useState(false);

  // Post data mapping
  const authorFirstName =
    author.first_name ||
    author.firstName ||
    author.profile?.first_name ||
    author.profile?.firstName ||
    "";
  const authorLastName =
    author.sur_name ||
    author.surname ||
    author.last_name ||
    author.lastName ||
    author.profile?.sur_name ||
    author.profile?.surname ||
    author.profile?.last_name ||
    author.profile?.lastName ||
    "";
  const authorFullName = `${authorFirstName} ${authorLastName}`.trim();
  const displayName =
    authorFullName ||
    author.displayName ||
    author.profile?.displayName ||
    author.name ||
    author.username ||
    author.userName ||
    "Display Name";
  const username = author.username || author.userName || "username";
  const description = item?.description || "";
  const images = item?.images || [];
  const hashtags = item?.hashtags || [];
  const topic = item?.topic || "Crypto";
  const likesCount = item?.stats?.upvotes || item?.upvotes?.length || 0;
  const commentsCount = item?.stats?.comments || 0;
  const repostsCount = item?.stats?.reposts || item?.stats?.repots || 0;
  const stats = item?.stats || {};
  const createdAt = item?.createdAt || "";
  const profileColor = author?.profile?.profileColor || COLORS.inputBg;

  const getTimeAgo = useCallback((dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return `${Math.floor(seconds / 604800)} weeks ago`;
  }, []);

  const timeAgo = getTimeAgo(createdAt);

  const fetchPostData = useCallback(async () => {
    if (!postId) return;
    try {
      const response = await get(`posts/${postId}`);
      if (response?.data?.success) {
        setItem(response.data.data);
      }
    } catch (err) {
      console.log("Error fetching post data:", err);
    }
  }, [postId]);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  // Comments state
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("mostRecent");

  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const isFollowingUser = useMemo(() => {
    const authorId = author?._id || author?.id;
    if (!authorId) return false;

    if (userData?.stats?.following) {
      return userData.stats.following.includes(authorId);
    }

    return (
      author?.stats?.followers?.includes(userData?._id || userData?.id) || false
    );
  }, [
    userData?.stats?.following,
    author?._id,
    author?.id,
    userData?._id,
    userData?.id,
  ]);

  const handleFollowPress = async () => {
    const userId = author?._id || author?.id;
    if (!userId || isOwner) return;

    const currentlyFollowing = isFollowingUser;
    try {
      const updatedFollowing = currentlyFollowing
        ? (userData?.stats?.following || []).filter((id) => id !== userId)
        : [...(userData?.stats?.following || []), userId];

      dispatch(
        setUserData({
          ...userData,
          stats: {
            ...userData.stats,
            following: updatedFollowing,
          },
        }),
      );

      const authorName = displayName || "User";
      if (currentlyFollowing) {
        await del(`relationships/unfollow/${userId}`);
        ToastMessage(`Unfollowed ${authorName}`);
      } else {
        await post(`relationships/follow/${userId}`);
        ToastMessage(`You are now following ${authorName}`, "success");
      }
    } catch (err) {
      console.log("Error following/unfollowing:", err);
      dispatch(setUserData(userData));
    }
  };

  const handleDeletePost = async () => {
    const pId = item?._id || item?.id;
    if (!pId) return;
    try {
      const response = await del(`posts/${pId}`);
      if (response?.data?.success) {
        ToastMessage("Post deleted successfully", "success");
        navigation.goBack();
      } else {
        ToastMessage(
          response?.data?.message || "Failed to delete post",
          "error",
        );
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      ToastMessage("Error deleting post", "error");
    }
  };

  const [keyboardHeight] = useState(new Animated.Value(0));
  const inputRef = useRef(null);

  // Noto animated emoji list
  const emojiData = [
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
    {
      char: "🔥",
      url: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/lottie.json",
    },
    {
      char: "❤️",
      url: "https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/lottie.json",
    },
    {
      char: "👍",
      url: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f44d/lottie.json",
    },
  ];

  const handleEmojiPress = (emojiChar) => {
    setCommentText((prev) => (prev || "") + emojiChar);
    inputRef.current?.focus();
  };

  const fetchComments = useCallback(
    async (sortParam = sortBy) => {
      const pId = item?._id || item?.id;
      if (!pId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await get(`posts/${pId}/comment?sort=${sortParam}`);

        if (response?.data?.success && response?.data?.data?.comments) {
          setComments(response.data.data?.comments);
        } else {
          setError("Failed to fetch comments");
        }
      } catch (err) {
        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [item, sortBy],
  );

  const handleTabChange = (tabIndex) => {
    const currentTabIndex =
      sortBy === "mostLiked" ? 0 : sortBy === "mostRecent" ? 1 : -1;

    if (currentTabIndex === tabIndex) {
      setSortBy("");
      fetchComments("");
    } else {
      const sortParam = tabIndex === 0 ? "mostLiked" : "mostRecent";
      setSortBy(sortParam);
      fetchComments(sortParam);
    }
  };

  useEffect(() => {
    if (item?.privacy?.comment !== false) {
      fetchComments("");
    } else {
      setComments([]);
      setLoading(false);
    }
  }, [isFocused, item?.privacy?.comment]);

  // Keyboard listeners
  useEffect(() => {
    const keyboardShowEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const keyboardHideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardShow = Keyboard.addListener(keyboardShowEvent, (event) => {
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
        useNativeDriver: false,
      }).start();
    });

    const keyboardHide = Keyboard.addListener(keyboardHideEvent, (event) => {
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, [keyboardHeight]);

  const handleReply = useCallback((comment) => {
    setReplyingTo(comment);
    inputRef.current?.focus();
  }, []);

  const handleCancelReply = useCallback(() => {
    setReplyingTo(null);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingComment(null);
    setCommentText("");
  }, []);

  const handleImagePick = useCallback(() => {
    setShowImagePicker(true);
  }, []);

  const handleImageSelected = async (result) => {
    setShowImagePicker(false);
    setIsUploadingImage(true);
    try {
      const url = await uploadAndGetUrl(result);
      if (url) {
        setSelectedImageUrl(url);
      }
    } catch (err) {
      ToastMessage("Failed to upload image", "error");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = useCallback(() => {
    setSelectedImageUrl(null);
  }, []);

  const handleViewProfile = useCallback(
    (user) => {
      navigation.navigate("Detail", { userId: user?._id || user?.id });
    },
    [navigation],
  );

  const handleSendMessage = useCallback(
    (user) => {
      const uFirst = user?.first_name || user?.firstName || "";
      const uLast =
        user?.sur_name ||
        user?.surname ||
        user?.last_name ||
        user?.lastName ||
        "";
      navigation.navigate("InboxScreen", {
        recipientId: user?._id || user?.id,
        recipientName: `${uFirst} ${uLast}`.trim() || user?.username || "User",
        otherUser: user,
      });
    },
    [navigation],
  );

  const handleEditComment = useCallback((comment) => {
    setEditingComment(comment);
    setCommentText(comment?.comment || "");
    inputRef.current?.focus();
  }, []);

  const handleDeleteComment = useCallback(
    async (comment) => {
      const pId = item?._id || item?.id;
      if (!pId || !comment?._id) return;

      const previousComments = [...comments];

      // Optimistic update
      setComments((prev) =>
        prev
          .map((c) => {
            if (c._id === comment._id) return null;
            if (c.replies?.length > 0) {
              return {
                ...c,
                replies: c.replies.filter((r) => r._id !== comment._id),
                stats: {
                  ...c.stats,
                  replies: c.replies.some((r) => r._id === comment._id)
                    ? Math.max(0, (c.stats?.replies || 0) - 1)
                    : c.stats?.replies,
                },
              };
            }
            return c;
          })
          .filter(Boolean),
      );

      try {
        const response = await del(`posts/${pId}/comment/${comment._id}`);
        if (response?.data?.success) {
          ToastMessage("Comment deleted successfully");
        } else {
          setComments(previousComments);
          ToastMessage("Failed to delete comment", "error");
        }
      } catch (err) {
        console.error("Error deleting comment:", err);
        setComments(previousComments);
        ToastMessage("Error deleting comment", "error");
      }
    },
    [item, comments],
  );

  const handleSendComment = useCallback(async () => {
    const pId = item?._id || item?.id;
    if (
      (!commentText?.trim() && !selectedImageUrl) ||
      !pId ||
      isSubmitting ||
      isUploadingImage
    ) {
      return;
    }

    const currentCommentText = commentText.trim();
    const currentReplyingTo = replyingTo;
    const currentEditingComment = editingComment;
    const currentImageUrl = selectedImageUrl;
    const tempId = Date.now().toString();

    // Check if single emoji to send Lottie url
    const matchingEmoji = emojiData.find((e) => e.char === currentCommentText);
    const finalCommentContent = matchingEmoji
      ? matchingEmoji.url
      : currentCommentText;

    // Handle Edit Case
    if (currentEditingComment) {
      try {
        setIsSubmitting(true);
        const response = await put(
          `posts/${pId}/comment/${currentEditingComment._id}`,
          {
            comment: finalCommentContent,
          },
        );

        if (response?.data?.success && response?.data?.data) {
          const updatedComment = {
            ...response.data.data,
            user: {
              ...(currentEditingComment?.user || {}),
              ...(response.data.data?.user || {}),
            },
          };

          setComments((prev) =>
            prev.map((c) => {
              if (c._id === currentEditingComment._id) return updatedComment;
              if (c.replies?.length > 0) {
                return {
                  ...c,
                  replies: c.replies.map((r) =>
                    r._id === currentEditingComment._id ? updatedComment : r,
                  ),
                };
              }
              return c;
            }),
          );

          ToastMessage("Comment updated successfully");
          setEditingComment(null);
          setCommentText("");
          Keyboard.dismiss();
        } else {
          ToastMessage("Failed to update comment", "error");
        }
      } catch (err) {
        console.error("Error updating comment:", err);
        ToastMessage("Error updating comment", "error");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Optimistic Comment Object for New Comment/Reply
    const userFirstName = userData?.first_name || userData?.firstName || "Me";
    const userLastName =
      userData?.sur_name ||
      userData?.surname ||
      userData?.last_name ||
      userData?.lastName ||
      "";
    const optimisticComment = {
      _id: tempId,
      comment: finalCommentContent,
      ...(currentImageUrl && {
        attachment: {
          url: currentImageUrl,
          type: "image",
        },
      }),
      user: {
        first_name: userFirstName,
        firstName: userFirstName,
        sur_name: userLastName,
        lastName: userLastName,
        username: userData?.username || "me",
        profile: {
          avatar: userData?.profile?.avatar || "",
          profileColor: userData?.profile?.profileColor || COLORS.inputBg,
        },
      },
      createdAt: new Date().toISOString(),
      isPosting: true,
      stats: {
        likes: 0,
        replies: 0,
      },
      replies: [],
    };

    // Update UI immediately (Optimistic)
    if (currentReplyingTo) {
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment._id === currentReplyingTo._id) {
            return {
              ...comment,
              replies: [...(comment.replies || []), optimisticComment],
              stats: {
                ...comment.stats,
                replies: (comment.stats?.replies || 0) + 1,
              },
            };
          }
          return comment;
        }),
      );
    } else {
      setComments((prevComments) => [optimisticComment, ...prevComments]);
    }

    // Clear input immediately for better UX
    setCommentText("");
    setSelectedImageUrl(null);
    setReplyingTo(null);
    Keyboard.dismiss();

    try {
      setIsSubmitting(true);

      const requestBody = {
        comment: finalCommentContent,
      };

      if (currentImageUrl) {
        requestBody.attachment = {
          url: currentImageUrl,
          type: "image",
        };
      }

      if (currentReplyingTo) {
        requestBody.parentCommentId = currentReplyingTo._id;
      }

      const response = await post(`posts/${pId}/comment`, requestBody);

      if (response?.data?.success && response?.data?.data) {
        const newComment = response.data.data;

        if (currentReplyingTo) {
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment._id === currentReplyingTo._id ? newComment : comment,
            ),
          );
        } else {
          setComments((prevComments) =>
            prevComments.map((c) => (c._id === tempId ? newComment : c)),
          );
        }
      } else {
        rollback();
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      rollback();
    } finally {
      setIsSubmitting(false);
    }

    function rollback() {
      if (currentReplyingTo) {
        setComments((prevComments) =>
          prevComments.map((comment) => {
            if (comment._id === currentReplyingTo._id) {
              return {
                ...comment,
                replies: (comment.replies || []).filter(
                  (r) => r._id !== tempId,
                ),
                stats: {
                  ...comment.stats,
                  replies: Math.max(0, (comment.stats?.replies || 0) - 1),
                },
              };
            }
            return comment;
          }),
        );
      } else {
        setComments((prevComments) =>
          prevComments.filter((c) => c._id !== tempId),
        );
      }
    }
  }, [
    commentText,
    item,
    isSubmitting,
    replyingTo,
    userData,
    editingComment,
    emojiData,
    selectedImageUrl,
    isUploadingImage,
  ]);

  const handleLikeReaction = async (comment) => {
    const pId = item?._id || item?.id;
    if (!pId || !comment?._id || !userData?._id) return;

    const myId = String(userData._id);
    const isLiked = (comment.reactions || []).some((r) => {
      const rId = String(
        r?.userId ||
          r?.user?._id ||
          r?._id ||
          r?.id ||
          (typeof r === "string" ? r : ""),
      );
      return rId === myId;
    });
    const previousComments = [...comments];

    // Optimistically update the comments state
    const updatedComments = comments.map((c) => {
      if (c._id === comment._id) {
        return {
          ...c,
          reactions: isLiked
            ? (c.reactions || []).filter((r) => {
                const rId = String(
                  r?.userId ||
                    r?.user?._id ||
                    r?._id ||
                    r?.id ||
                    (typeof r === "string" ? r : ""),
                );
                return rId !== myId;
              })
            : [...(c.reactions || []), myId],
          stats: {
            ...c.stats,
            likes: isLiked
              ? Math.max(0, (c.stats?.likes || 0) - 1)
              : (c.stats?.likes || 0) + 1,
          },
        };
      }

      if (c.replies?.length > 0) {
        return {
          ...c,
          replies: c.replies.map((r) => {
            if (r._id === comment._id) {
              return {
                ...r,
                reactions: isLiked
                  ? (r.reactions || []).filter((id) => {
                      const rId = String(
                        id?.userId ||
                          id?.user?._id ||
                          id?._id ||
                          id?.id ||
                          (typeof id === "string" ? id : ""),
                      );
                      return rId !== myId;
                    })
                  : [...(r.reactions || []), myId],
                stats: {
                  ...r.stats,
                  likes: isLiked
                    ? Math.max(0, (r.stats?.likes || 0) - 1)
                    : (r.stats?.likes || 0) + 1,
                },
              };
            }
            return r;
          }),
        };
      }

      return c;
    });

    setComments(updatedComments);

    try {
      const res = await post(`posts/${pId}/reaction/${comment._id}`, {
        reaction: "like",
      });
      if (!res?.data?.success) {
        setComments(previousComments);
      }
    } catch (err) {
      console.error("Error liking comment:", err);
      setComments(previousComments);
    }
  };

  const handleCommentPress = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleHideComment = async (comment) => {
    if (!comment?._id) return;
    try {
      const response = await post("hide/comment", { commentId: comment._id });
      if (response?.data?.success) {
        ToastMessage("Comment hidden successfully", "success");
        setComments((prev) =>
          prev
            .map((c) => {
              if (c._id === comment._id) return null;
              if (c.replies?.length > 0) {
                return {
                  ...c,
                  replies: c.replies.filter((r) => r._id !== comment._id),
                };
              }
              return c;
            })
            .filter(Boolean),
        );
      }
    } catch (err) {
      console.log("handleHideComment error", err);
    }
  };

  const handleHideUserComments = async (user) => {
    const authorId = user?._id || user?.id;
    if (!authorId) return;
    try {
      const response = await post("hide/comment", { authorId });
      if (response?.data?.success) {
        ToastMessage("User's comments hidden successfully", "success");
        setComments((prev) =>
          prev
            .filter((c) => (c.user?._id || c.user?.id) !== authorId)
            .map((c) => {
              if (c.replies?.length > 0) {
                return {
                  ...c,
                  replies: c.replies.filter(
                    (r) => (r.user?._id || r.user?.id) !== authorId,
                  ),
                };
              }
              return c;
            }),
        );
      }
    } catch (err) {
      console.log("handleHideUserComments error", err);
    }
  };

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      statusBarColor={COLORS.black}
      scrollEnabled
      headerUnScrollable={() => (
        <View style={[styles.rowBetween, { paddingBottom: 10 }]}>
          {/* Left Section */}
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Image
                source={Images.back}
                style={{ height: 24, width: 24, tintColor: COLORS.white }}
              />
            </TouchableOpacity>
            <View
              style={{
                padding: 4,
                borderColor: profileColor,
                borderWidth: 2,
                borderRadius: 99,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Detail", {
                    userId: author?._id || author?.id,
                  })
                }
                style={styles.avatar}
              >
                {author?.profile?.avatar || author?.avatar ? (
                  <ImageFast
                    source={{ uri: author?.profile?.avatar || author?.avatar }}
                    style={{ width: "100%", height: "100%", borderRadius: 99 }}
                  />
                ) : (
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 99,
                      backgroundColor: profileColor,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <CustomText label={displayName} color={COLORS.white} />
                {(author?.role === "individual" || author?.isVerified) && (
                  <Image source={Images.verified} style={styles.verifiedIcon} />
                )}
                {author?.role === "company" && (
                  <Image
                    source={Images.grayStar || Images.goldenStar}
                    style={styles.verifiedIcon}
                  />
                )}
              </View>
              <CustomText label={`@${username}`} color={COLORS.white3} />
            </View>
          </View>

          {/* Right Section */}
          <View
            style={[
              styles.row,
              {
                width: !isOwner ? "28%" : undefined,
                justifyContent: "flex-end",
              },
            ]}
          >
            {!isOwner && (
              <CustomButton
                title={isFollowingUser ? "Following" : "Follow"}
                width={isFollowingUser ? "80%" : "64%"}
                onPress={handleFollowPress}
                height={32}
                borderRadius={8}
                fontSize={14}
                backgroundColor={COLORS.inputBg}
                color={COLORS.white}
              />
            )}
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Image
                source={Images.moreIcon}
                style={[styles.moreIcon, { tintColor: COLORS.white }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      footerUnScrollable={() =>
        item?.privacy?.comment !== false && (
          <Animated.View
            style={[
              styles.inputContainer,
              {
                marginBottom:
                  Platform.OS === "android" && Platform.Version < 35
                    ? 0
                    : keyboardHeight,
              },
            ]}
          >
            <View>
              {/* Reply Indicator */}
              {replyingTo && (
                <BlurView
                  style={styles.replyBlur}
                  blurType="dark"
                  blurAmount={3}
                  reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.1)"
                >
                  <View style={styles.replyIndicator}>
                    <View style={styles.replyIndicatorLeft}>
                      <Icons
                        name="corner-down-right"
                        family="Feather"
                        size={14}
                        color={COLORS.white3}
                      />
                      <CustomText
                        label="Replying to "
                        fontSize={12}
                        color={COLORS.white3}
                        marginLeft={6}
                      />
                      {replyingTo?.comment?.startsWith(
                        "https://fonts.gstatic.com/s/e/notoemoji/latest/",
                      ) ? (
                        <LottieView
                          source={{ uri: replyingTo.comment }}
                          autoPlay
                          loop
                          style={{ width: 20, height: 20, marginLeft: 4 }}
                        />
                      ) : (
                        <CustomText
                          label={replyingTo?.comment || "user"}
                          fontSize={12}
                          color={COLORS.white3}
                        />
                      )}
                    </View>
                    <Animated.View>
                      <Icons
                        name="x"
                        family="Feather"
                        size={16}
                        color={COLORS.white3}
                        onPress={handleCancelReply}
                      />
                    </Animated.View>
                  </View>
                </BlurView>
              )}

              {/* Editing Indicator */}
              {editingComment && (
                <BlurView
                  style={styles.replyBlur}
                  blurType="dark"
                  blurAmount={3}
                  reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.1)"
                >
                  <View style={styles.replyIndicator}>
                    <View style={styles.replyIndicatorLeft}>
                      <Icons
                        name="edit-3"
                        family="Feather"
                        size={14}
                        color={COLORS.white3}
                      />
                      <CustomText
                        label="Editing comment "
                        fontSize={12}
                        color={COLORS.white3}
                        marginLeft={6}
                      />
                    </View>
                    <Animated.View>
                      <Icons
                        name="x"
                        family="Feather"
                        size={16}
                        color={COLORS.white3}
                        onPress={handleCancelEdit}
                      />
                    </Animated.View>
                  </View>
                </BlurView>
              )}

              {/* Input Container */}
              <View style={styles.inputRow}>
                <Image
                  source={Images.CommentEmojie}
                  style={{ height: 44, width: 44, marginRight: 6 }}
                />
                <View style={[styles.inputWrapper, { overflow: "hidden" }]}>
                  <Blur blurAmount={3} blurType="dark" />
                  <TextInput
                    ref={inputRef}
                    value={commentText}
                    style={styles.input}
                    placeholder="Type message"
                    placeholderTextColor={COLORS.white3}
                    onChangeText={setCommentText}
                    multiline
                    maxLength={500}
                    editable={!isSubmitting}
                  />

                  {selectedImageUrl ? (
                    <View style={{ position: "relative" }}>
                      <ImageFast
                        source={{ uri: selectedImageUrl }}
                        style={styles.previewImageInline}
                        isView
                      />
                      <TouchableOpacity
                        onPress={handleRemoveImage}
                        style={styles.removeImageBtnInline}
                      >
                        <Icons
                          name="x"
                          family="Feather"
                          size={10}
                          color={COLORS.white}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={handleImagePick}
                      disabled={isUploadingImage}
                    >
                      {isUploadingImage ? (
                        <ActivityIndicator
                          size="small"
                          color={COLORS.white}
                          style={{ marginHorizontal: 8 }}
                        />
                      ) : (
                        <Image
                          resizeMode="contain"
                          source={Images.commentCam}
                          style={{
                            height: 22,
                            width: 22,
                            marginHorizontal: 8,
                            tintColor: COLORS.white3,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                </View>

                <TouchableOpacity
                  onPress={handleSendComment}
                  style={[
                    styles.sendBtn,
                    ((!commentText?.trim() && !selectedImageUrl) ||
                      isSubmitting) &&
                      styles.sendBtnDisabled,
                  ]}
                  disabled={
                    (!commentText?.trim() && !selectedImageUrl) || isSubmitting
                  }
                >
                  <Blur blurAmount={12} blurType="dark" />
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    <Icons
                      name={"arrow-right"}
                      family={"Feather"}
                      size={18}
                      color={COLORS.white}
                    />
                  )}
                </TouchableOpacity>
              </View>

              {/* Horizontal emoji strip below inputRow */}
              <BlurView
                style={{
                  position: "absolute",
                  height: 125,
                  bottom: -30,
                  zIndex: -1,
                  width: "120%",
                  left: -10,
                  right: -10,
                }}
                blurType="dark"
                blurAmount={1}
                reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.1)"
              />
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
          </Animated.View>
        )
      }
    >
      <View style={styles.container}>
        {/* Post Card - same design & functionality, without gestures */}
        <PostCard
          disableGesture
          isChange={false}
          item={item}
          displayName={displayName}
          username={username}
          description={description}
          images={images}
          hashtags={hashtags}
          topic={topic}
          likesCount={likesCount}
          commentsCount={commentsCount}
          repostsCount={repostsCount}
          stats={stats}
          timeAgo={timeAgo}
          upvotes={item?.upvotes || []}
          downvotes={item?.downvotes || []}
          onCommentPress={handleCommentPress}
          isBack
          cardPress={false}
          showHeader={false}
          isDetail
        />

        {/* Comments header */}
        <View style={styles.commentsHeader}>
          <CustomText
            fontFamily={fonts.semiBold}
            label={`${comments.length || 0} Comment${
              comments.length !== 1 ? "s" : ""
            }`}
            fontSize={20}
            lineHeight={20 * 1.4}
            color={COLORS.white}
          />
          {loading && <ActivityIndicator size="small" color={COLORS.white} />}
        </View>

        {/* Comments list (CommentModal functionality) */}
        {item?.privacy?.comment !== false ? (
          <View style={styles.commentsContainer}>
            <CommentModal
              comments={comments}
              loading={loading}
              post={item}
              onReply={handleReply}
              onLike={handleLikeReaction}
              userData={userData}
              onTabChange={handleTabChange}
              currentTab={
                sortBy === "mostLiked" ? 0 : sortBy === "mostRecent" ? 1 : null
              }
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
              onViewProfile={handleViewProfile}
              onSendMessage={handleSendMessage}
              onHideComment={handleHideComment}
              onHideUserComments={handleHideUserComments}
              isBottomSheet={false}
              onReportComment={() => {
                ToastMessage("Comment reported");
              }}
            />
            {error && (
              <CustomText
                label={error}
                fontSize={14}
                color={COLORS.subtitle}
                marginTop={8}
              />
            )}
          </View>
        ) : (
          <View style={styles.commentDisable}>
            <CustomText
              label={"User has disabled comments for this post"}
              fontSize={14}
              color={COLORS.white3}
              marginTop={8}
            />
          </View>
        )}

        {/* Input Container (from CommentScreen) */}
        <UploadImageCustom
          imageModal={showImagePicker}
          setImageModal={setShowImagePicker}
          handleChange={handleImageSelected}
          handleCapture={handleImageSelected}
          onDelete={() => {}}
        />
        <EditModal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          displayName={displayName}
          username={username}
          postCaption={description}
          isOwner={isOwner}
          user={item?.author}
          onEditPress={() => {
            setShowModal(false);
            setTimeout(() => {
              navigation.navigate("PublishPost", {
                editMode: true,
                postData: item,
              });
            }, 700);
          }}
          onReschedulePress={() => {
            setShowModal(false);
            setTimeout(() => {
              navigation.navigate("PublishPost", {
                editMode: true,
                postData: item,
              });
            }, 700);
          }}
          onDeletePress={() => {
            setShowModal(false);
            handleDeletePost();
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    paddingBottom: 50,
  },
  commentsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  commentsContainer: {
    flex: 1,
    paddingBottom: 60,
  },
  commentDisable: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  inputContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    zIndex: 999,
    backgroundColor: "transparent",
  },
  replyBlur: {
    backgroundColor: "transparent",
    borderRadius: 12,
    marginBottom: 4,
  },
  replyIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
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
    minHeight: 48,
    maxHeight: 48,
    borderRadius: 99,
    backgroundColor: COLORS.inputBg,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    color: COLORS.white,
    fontFamily: fonts.regular,
    padding: 0,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sendBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 99,
    backgroundColor: COLORS.buttonColor,
    overflow: "hidden",
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
  previewImageInline: {
    width: 40,
    height: 40,
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
  emojiStripContent: {
    paddingHorizontal: 4,
  },
  emojiItem: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  emojiText: {
    textAlign: "center",
  },
  rowBetween: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 4,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 99,
    backgroundColor: COLORS.inputBg,
  },
  userInfo: {
    marginLeft: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedIcon: {
    height: 14,
    width: 14,
    marginLeft: 4,
  },
  moreIcon: {
    height: 32,
    width: 32,
    marginLeft: 8,
  },
  backButton: {
    borderRadius: 99,
    backgroundColor: COLORS.inputBg,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    overflow: "hidden",
  },
});

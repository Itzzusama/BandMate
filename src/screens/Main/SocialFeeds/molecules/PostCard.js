import { useNavigation } from "@react-navigation/native";
import { getPalette } from "@somesoap/react-native-image-palette";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Video from "react-native-video";
import { useDispatch, useSelector } from "react-redux";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import { FullScreenSvg, Tags } from "../../../../assets/svgs";
import Blur from "../../../../components/Blur";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import ProgressiveBlur from "../../../../components/ProgressiveBlur";
import { del, post } from "../../../../services/ApiRequest";
import { setUserData } from "../../../../store/reducer/usersSlice";
import { COLORS } from "../../../../utils/COLORS";
import { ToastMessage } from "../../../../utils/ToastMessage";
import CreatorSummary from "./CreatorSummary";
import EditModal from "./EditModal";
import RepostModal from "./RepostModal";
import ShareModal from "./ShareModal";
import SummaryMore from "./SummaryMore";
import ViewerModal from "./ViewerModal";

const screenWidth = Dimensions.get("window").width;
const SWIPE_LOCK_THRESHOLD = 4;

const isVideoUrl = (url) => {
  if (!url || typeof url !== "string") return false;
  return !!url.match(/\.(mp4|mov|avi|mkv|webm|flv|wmv|m4v)(\?.*)?$/i);
};

const formatCount = (count) => {
  if (!count || count === 0) return "0";
  if (count < 1000) return count.toString();
  if (count < 1000000) return `${(count / 1000).toFixed(1)}k`;
  return `${(count / 1000000).toFixed(1)}M`;
};

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const PostCard = ({
  item,
  displayName,
  username,
  isVerified,
  partnershipWith,
  imageSource,
  images = [],
  hashtags = [],
  stats = {},
  reactedBy,
  postTitle,
  description,
  commentUser = "User",
  commentText = "With the most liked comment",
  commentsCount,
  timeAgo,
  upvotes = [],
  downvotes = [],
  savedCount,
  marginBottom,
  shouldPlay = true,
  showHeader = true,
  isDetail = false,
  cardPress = true,
  disableGesture = false,
  isBack = false,
  isChange = false,
  isVideo = false,
  topic,
  likesCount,
  repostsCount,
  setPagerScrollEnabled,
  onSwipeLeft,
  onSwipeRight,
  onCommentPress,
  onDeletePress,
  onEditPress,
  onHidePost,
  onHideUserPosts,
  onVoteUpdate,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);

  // Author details
  const author = item?.author || {};
  const firstName = author.first_name || author.firstName || "";
  const lastName =
    author.sur_name ||
    author.surname ||
    author.last_name ||
    author.lastName ||
    "";
  const authorFullName = `${firstName} ${lastName}`.trim();
  const authorUsername = author?.username || author.userName || "";

  const effectiveDisplayName =
    displayName || authorFullName || authorUsername || "Display Name";
  const effectiveUsername = authorUsername || username || "username";
  const effectiveIsVerified =
    isVerified !== undefined
      ? isVerified
      : author.role === "individual" ||
        author.role === "company" ||
        author.isVerified;
  const authorAvatar = author.profile?.avatar || author.avatar;
  const authorProfileColor = author.profile?.profileColor || COLORS.inputBg;
  const isOwner = author._id === userData?._id;

  // Parent / Repost Author details
  const parentAuthor =
    item?.parentPost?.author ||
    item?.parentPostId?.author ||
    item?.parentPost?.user ||
    item?.parentPostId?.user ||
    item?.parentAuthor ||
    item?.originalAuthor ||
    (typeof item?.parentPost === "object" &&
    (item?.parentPost?.first_name ||
      item?.parentPost?.firstName ||
      item?.parentPost?.username)
      ? item?.parentPost
      : null) ||
    (typeof item?.parentPostId === "object" &&
    (item?.parentPostId?.first_name ||
      item?.parentPostId?.firstName ||
      item?.parentPostId?.username)
      ? item?.parentPostId
      : null);

  const parentFirstName =
    parentAuthor?.first_name ||
    parentAuthor?.firstName ||
    parentAuthor?.profile?.first_name ||
    parentAuthor?.profile?.firstName ||
    "";
  const parentLastName =
    parentAuthor?.sur_name ||
    parentAuthor?.surname ||
    parentAuthor?.last_name ||
    parentAuthor?.lastName ||
    parentAuthor?.profile?.sur_name ||
    parentAuthor?.profile?.surname ||
    parentAuthor?.profile?.last_name ||
    parentAuthor?.profile?.lastName ||
    "";
  const parentFullName = `${parentFirstName} ${parentLastName}`.trim();

  const parentDisplayName =
    parentFullName ||
    parentAuthor?.first_name + " " + parentAuthor?.last_name ||
    "User";

  const parentAvatar =
    parentAuthor?.profile?.avatar ||
    parentAuthor?.avatar ||
    parentAuthor?.profilePicture;

  // Media list calculation
  const mediaList = useMemo(() => {
    if (images && images.length > 0) return images;
    if (item?.images && item.images.length > 0) return item.images;
    if (imageSource) {
      return typeof imageSource === "string" ? [imageSource] : [imageSource];
    }
    return [];
  }, [images, item?.images, imageSource]);

  // Only real hashtags (no topic mixed in)
  const effectiveHashtags = useMemo(() => {
    const list = hashtags?.length > 0 ? hashtags : item?.hashtags || [];
    return list
      .map((tag) => {
        const tagStr = typeof tag === "string" ? tag : tag?.tag || "";
        if (!tagStr) return "";
        return tagStr.startsWith("#") ? tagStr : `#${tagStr}`;
      })
      .filter((t) => t.length > 1);
  }, [hashtags, item?.hashtags]);

  // Description / Captions
  const descriptionArray = useMemo(() => {
    const raw = description || item?.description || postTitle;
    if (Array.isArray(raw)) {
      return raw.filter((d) => typeof d === "string" && d.trim().length > 0);
    }
    if (typeof raw === "string" && raw.trim().length > 0) {
      return [raw];
    }
    return [];
  }, [description, item?.description, postTitle]);

  const effectiveDescription = useMemo(() => {
    if (descriptionArray.length > 0) return descriptionArray[0];
    if (typeof description === "string") return description;
    if (typeof item?.description === "string") return item.description;
    return postTitle || "";
  }, [descriptionArray, description, item?.description, postTitle]);

  // Time ago
  const effectiveTimeAgo = useMemo(() => {
    if (timeAgo) return timeAgo;
    if (item?.createdAt) return moment(item.createdAt).fromNow();
    return "Just now";
  }, [timeAgo, item?.createdAt]);

  // Counts & Stats
  const effectiveCommentsCount =
    commentsCount !== undefined ? commentsCount : item?.stats?.comments || 0;
  const effectiveSharesCount = stats?.shares || item?.stats?.shares || 0;
  const effectiveRepostsCount = stats?.reposts || item?.stats?.reposts || 0;
  const initialSavedCount =
    savedCount !== undefined ? savedCount : item?.stats?.saved || 0;

  // State Management
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentDescIndex, setCurrentDescIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isTruncated, setIsTruncated] = useState(false);
  const [bgColor, setBgColor] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showRepostModal, setShowRepostModal] = useState(false);
  const [showCreatorSummary, setShowCreatorSummary] = useState(false);
  const [showSummaryMore, setShowSummaryMore] = useState(false);
  const [showViewerModal, setShowViewerModal] = useState(false);

  // Video State
  const [mutedVideos, setMutedVideos] = useState({});
  const [videoReady, setVideoReady] = useState({});
  const [videoProgress, setVideoProgress] = useState({});
  const videoRefs = useRef([]);

  // Upvote / Downvote State
  const [localUpvotes, setLocalUpvotes] = useState(
    item?.upvotes || upvotes || [],
  );
  const [localDownvotes, setLocalDownvotes] = useState(
    item?.downvotes || downvotes || [],
  );

  // Save State
  const [isSaved, setIsSaved] = useState(false);
  const [localSaves, setLocalSaves] = useState(initialSavedCount);

  // Horizontal Swipe Animation State
  const translateX = useRef(new Animated.Value(0)).current;
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef(false);
  const swipeDecided = useRef(false);
  const lastDx = useRef(0);
  const mediaCarouselGestureActive = useRef(false);

  useEffect(() => {
    if (item && userData?._id) {
      const myId = String(userData._id);
      const savedList = item?.saved || [];
      const saved =
        Array.isArray(savedList) &&
        savedList.some((s) => {
          const sId = String(
            s?.userId ||
              s?.user?._id ||
              s?._id ||
              s?.id ||
              (typeof s === "string" ? s : ""),
          );
          return sId === myId;
        });
      setIsSaved(Boolean(saved));
    }
  }, [item?._id, item?.saved, userData?._id]);

  useEffect(() => {
    setLocalSaves(
      typeof initialSavedCount === "number"
        ? initialSavedCount
        : item?.stats?.saved ||
            (Array.isArray(item?.saved) ? item.saved.length : 0),
    );
  }, [item?._id, initialSavedCount, item?.stats?.saved]);

  useEffect(() => {
    setLocalUpvotes(item?.upvotes || upvotes || []);
    setLocalDownvotes(item?.downvotes || downvotes || []);
  }, [item?._id]);

  // Follow State (derived from Redux & local override for 0ms instant toggle)
  const [localFollowOverride, setLocalFollowOverride] = useState(null);

  const isFollowingUser = useMemo(() => {
    if (typeof localFollowOverride === "boolean") {
      return localFollowOverride;
    }

    const targetUserId = String(
      (typeof author === "string" ? author : author?._id || author?.id) ||
        (typeof item?.author === "string"
          ? item.author
          : item?.author?._id || item?.author?.id) ||
        "",
    );
    if (!targetUserId) return false;

    const followingList = userData?.stats?.following;
    // When followingList is available in Redux (array), trust it as primary source of truth
    if (Array.isArray(followingList)) {
      return followingList.some((f) => {
        const fId = String(typeof f === "string" ? f : f?._id || f?.id || "");
        return fId === targetUserId;
      });
    }

    // Fallback ONLY if userData.stats.following is not defined at all
    const followersList =
      author?.stats?.followers || item?.author?.stats?.followers;
    if (Array.isArray(followersList)) {
      const myId = String(userData?._id || userData?.id || "");
      return followersList.some((f) => {
        const fId = String(typeof f === "string" ? f : f?._id || f?.id || "");
        return fId === myId;
      });
    }

    return false;
  }, [
    localFollowOverride,
    userData?.stats?.following,
    author,
    item?.author,
    userData?._id,
    userData?.id,
  ]);

  // Extract Dynamic Background Glow Palette
  useEffect(() => {
    const currentMedia = mediaList[currentImageIndex];
    const uri =
      typeof currentMedia === "string"
        ? currentMedia
        : item?.thumbnail || currentMedia?.uri;
    if (!uri || isVideoUrl(uri)) return;

    getPalette(uri)
      .then((palette) => {
        if (palette?.vibrant) {
          setBgColor(palette.vibrant);
        }
      })
      .catch(() => {});
  }, [currentImageIndex, mediaList, item?.thumbnail]);

  // Follow / Unfollow Handler (Instant 0ms UI shift & Background API)
  const handleFollowPress = async () => {
    const targetUserId = String(
      (typeof author === "string" ? author : author?._id || author?.id) ||
        (typeof item?.author === "string"
          ? item.author
          : item?.author?._id || item?.author?.id) ||
        "",
    );
    if (!targetUserId || isOwner) return;

    const nextFollowState = !isFollowingUser;
    setLocalFollowOverride(nextFollowState);
    setShowSummaryMore(false);

    const authorName = firstName || effectiveDisplayName || "User";

    // Optimistic Redux update
    const currentFollowing = Array.isArray(userData?.stats?.following)
      ? userData.stats.following
      : [];

    const updatedFollowing = nextFollowState
      ? [...currentFollowing, targetUserId]
      : currentFollowing.filter((id) => {
          const fId = String(
            typeof id === "string" ? id : id?._id || id?.id || "",
          );
          return fId !== targetUserId;
        });

    dispatch(
      setUserData({
        ...userData,
        stats: {
          ...(userData?.stats || {}),
          following: updatedFollowing,
        },
      }),
    );

    if (nextFollowState) {
      ToastMessage(`You are now following ${authorName}`, "success");
    } else {
      ToastMessage(`Unfollowed ${authorName}`);
    }

    try {
      if (nextFollowState) {
        await post(`relationships/follow/${targetUserId}`);
      } else {
        await del(`relationships/unfollow/${targetUserId}`);
      }
    } catch (error) {
      console.log("Error following/unfollowing:", error);
      setLocalFollowOverride(!nextFollowState);
      dispatch(setUserData(userData));
      ToastMessage("Failed to update follow status", "error");
    }
  };

  // Upvote / Downvote Helpers
  const hasUpvoted = useCallback(() => {
    const myId = String(userData?._id || userData?.id || "");
    if (!myId) return false;
    return localUpvotes.some((vote) => {
      const vId = String(
        vote?.userId ||
          vote?.user?._id ||
          vote?.user?.id ||
          vote?._id ||
          vote?.id ||
          (typeof vote === "string" ? vote : ""),
      );
      return vId === myId;
    });
  }, [localUpvotes, userData?._id, userData?.id]);

  const hasDownvoted = useCallback(() => {
    const myId = String(userData?._id || userData?.id || "");
    if (!myId) return false;
    return localDownvotes.some((vote) => {
      const vId = String(
        vote?.userId ||
          vote?.user?._id ||
          vote?.user?.id ||
          vote?._id ||
          vote?.id ||
          (typeof vote === "string" ? vote : ""),
      );
      return vId === myId;
    });
  }, [localDownvotes, userData?._id, userData?.id]);

  // Upvote / Downvote Vote Handler (Instant Optimistic & Background API)
  const handleVote = useCallback(
    async (reactionType = "upvote") => {
      const postId = item?._id || item?.id;
      if (!postId) return;

      const myId = String(userData?._id || userData?.id || "");
      const isUpvote = reactionType === "upvote";
      const currentlyUpvoted = hasUpvoted();
      const currentlyDownvoted = hasDownvoted();

      const prevUpvotes = localUpvotes;
      const prevDownvotes = localDownvotes;

      // Instant optimistic UI update
      if (isUpvote) {
        if (currentlyUpvoted) {
          setLocalUpvotes((prev) =>
            prev.filter((v) => {
              const vId = String(
                v?.userId ||
                  v?.user?._id ||
                  v?._id ||
                  v?.id ||
                  (typeof v === "string" ? v : ""),
              );
              return vId !== myId;
            }),
          );
        } else {
          setLocalUpvotes((prev) => [
            ...prev.filter((v) => {
              const vId = String(
                v?.userId ||
                  v?.user?._id ||
                  v?._id ||
                  v?.id ||
                  (typeof v === "string" ? v : ""),
              );
              return vId !== myId;
            }),
            { userId: myId, reaction: "upvote" },
          ]);
          if (currentlyDownvoted) {
            setLocalDownvotes((prev) =>
              prev.filter((v) => {
                const vId = String(
                  v?.userId ||
                    v?.user?._id ||
                    v?._id ||
                    v?.id ||
                    (typeof v === "string" ? v : ""),
                );
                return vId !== myId;
              }),
            );
          }
        }
      } else {
        if (currentlyDownvoted) {
          setLocalDownvotes((prev) =>
            prev.filter((v) => {
              const vId = String(
                v?.userId ||
                  v?.user?._id ||
                  v?._id ||
                  v?.id ||
                  (typeof v === "string" ? v : ""),
              );
              return vId !== myId;
            }),
          );
        } else {
          setLocalDownvotes((prev) => [
            ...prev.filter((v) => {
              const vId = String(
                v?.userId ||
                  v?.user?._id ||
                  v?._id ||
                  v?.id ||
                  (typeof v === "string" ? v : ""),
              );
              return vId !== myId;
            }),
            { userId: myId, reaction: "downvote" },
          ]);
          if (currentlyUpvoted) {
            setLocalUpvotes((prev) =>
              prev.filter((v) => {
                const vId = String(
                  v?.userId ||
                    v?.user?._id ||
                    v?._id ||
                    v?.id ||
                    (typeof v === "string" ? v : ""),
                );
                return vId !== myId;
              }),
            );
          }
        }
      }

      // Background API execution (no blocking or feed reload)
      try {
        const response = await post(`posts/${postId}/reaction`, {
          reaction: reactionType,
        });
        if (!response?.data?.success) {
          setLocalUpvotes(prevUpvotes);
          setLocalDownvotes(prevDownvotes);
          ToastMessage("Failed to update vote", "error");
        }
      } catch (error) {
        console.error("Error voting:", error);
        setLocalUpvotes(prevUpvotes);
        setLocalDownvotes(prevDownvotes);
        ToastMessage("Failed to update vote", "error");
      }
    },
    [
      item?._id,
      item?.id,
      hasUpvoted,
      hasDownvoted,
      userData?._id,
      userData?.id,
      localUpvotes,
      localDownvotes,
    ],
  );

  // Save / Bookmark Handler
  const handleSaveToggle = async () => {
    const postId = item?._id || item?.id;
    if (!postId) return;

    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    setLocalSaves((prev) => (newSavedState ? prev + 1 : Math.max(0, prev - 1)));

    if (newSavedState) {
      ToastMessage("Post saved to bookmarks", "success");
    } else {
      ToastMessage("Removed from bookmarks");
    }

    try {
      if (newSavedState) {
        await post("saved", { postId: postId });
      } else {
        await del(`saved/${postId}`);
      }
    } catch (error) {
      console.log("Error saving post:", error);
      setIsSaved(!newSavedState);
      setLocalSaves((prev) =>
        !newSavedState ? prev + 1 : Math.max(0, prev - 1),
      );
      ToastMessage("Failed to update save status", "error");
    }
  };

  // Video helpers
  const handleVideoProgress = useCallback((index, data) => {
    setVideoProgress((prev) => ({
      ...prev,
      [index]: {
        currentTime: data.currentTime,
        duration: data.seekableDuration || data.playableDuration,
      },
    }));
  }, []);

  const toggleMute = useCallback(() => {
    setMutedVideos((prev) => ({
      ...prev,
      [currentImageIndex]: !prev[currentImageIndex],
    }));
  }, [currentImageIndex]);

  const isCurrentVideoMuted = () => {
    return mutedVideos[currentImageIndex] || false;
  };

  // Image height calculation based on size aspect ratio
  const getImageHeight = () => {
    const sizeString = item?.size || "1:1 ratio";
    const aspectRatio = sizeString.replace(" ratio", "").trim();

    switch (aspectRatio) {
      case "16:9":
        return screenWidth * (9 / 16);
      case "4:3":
        return screenWidth * (3 / 4);
      case "1:1":
      default:
        return screenWidth - 24;
    }
  };

  // Dynamic border radius for carousel items
  const getBorderRadiusStyle = (index) => {
    const cardWidth = screenWidth - 24;
    const scrollProg = scrollOffset / cardWidth;
    const currIdx = Math.round(scrollProg);
    const isScrolling = Math.abs(scrollProg - currIdx) > 0.01;

    if (!isScrolling) {
      return {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
      };
    }

    if (index === Math.floor(scrollProg)) {
      return {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 0,
      };
    } else if (index === Math.ceil(scrollProg)) {
      return {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 16,
      };
    }

    return {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    };
  };

  // Carousel Scroll Handler
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    setScrollOffset(contentOffsetX);
    const cardWidth = screenWidth - 24;
    const index = Math.round(contentOffsetX / cardWidth);
    if (index >= 0 && index < mediaList.length && index !== currentImageIndex) {
      setCurrentImageIndex(index);
    }
  };

  // Description Scroll Handler
  const handleDescScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const cardWidth = screenWidth - 28;
    const index = Math.round(contentOffsetX / cardWidth);
    if (
      index >= 0 &&
      index < descriptionArray.length &&
      index !== currentDescIndex
    ) {
      setCurrentDescIndex(index);
    }
  };

  // Comment Handler
  const handleCommentPress = useCallback(() => {
    if (item?.privacy?.comment === false) {
      ToastMessage("User has disabled comment on this post", "error");
      return;
    }
    const postPayload = {
      displayName: effectiveDisplayName,
      username: effectiveUsername,
      description: effectiveDescription,
      images: mediaList,
      likesCount: localUpvotes.length,
      commentsCount: effectiveCommentsCount,
      repostsCount: effectiveRepostsCount,
      timeAgo: effectiveTimeAgo,
    };

    if (onCommentPress) {
      onCommentPress(item, postPayload);
    } else {
      navigation.navigate("DetailPage", {
        item,
        postId: item?._id || item?.id,
        postData: postPayload,
      });
    }
  }, [
    item,
    effectiveDisplayName,
    effectiveUsername,
    effectiveDescription,
    mediaList,
    localUpvotes.length,
    effectiveCommentsCount,
    effectiveRepostsCount,
    effectiveTimeAgo,
    onCommentPress,
    navigation,
  ]);

  const handleCardPress = useCallback(() => {
    if (isDetail || cardPress === false) return;
    navigation.navigate("DetailPage", {
      item,
      postId: item?._id || item?.id,
    });
  }, [isDetail, cardPress, navigation, item]);

  // Horizontal Swipe Gestures
  const completeHorizontalSwipe = useCallback(
    (dx) => {
      const threshold = screenWidth * 0.35;

      if (dx > threshold) {
        Animated.spring(translateX, {
          toValue: screenWidth,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }).start(() => {
          translateX.setValue(0);
          handleCommentPress();
        });
      } else if (dx < -threshold) {
        Animated.spring(translateX, {
          toValue: -screenWidth,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }).start(() => {
          translateX.setValue(0);
          if (onSwipeLeft) {
            onSwipeLeft();
          } else {
            setShowShareModal(true);
          }
        });
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }).start();
      }
    },
    [screenWidth, translateX, onSwipeRight, onSwipeLeft, onCommentPress],
  );

  const resetSwipeFlags = useCallback(() => {
    isHorizontalSwipe.current = false;
    swipeDecided.current = false;
    lastDx.current = 0;
  }, []);

  const onMediaCarouselTouchStart = useCallback(() => {
    if (mediaList.length <= 1) return;
    mediaCarouselGestureActive.current = true;
    translateX.stopAnimation();
    translateX.setValue(0);
  }, [mediaList.length, translateX]);

  const onCardTouchStart = useCallback(
    (e) => {
      if (isDetail || disableGesture || mediaCarouselGestureActive.current)
        return;
      const { pageX, pageY } = e.nativeEvent;
      touchStartX.current = pageX;
      touchStartY.current = pageY;
      isHorizontalSwipe.current = false;
      swipeDecided.current = false;
      lastDx.current = 0;
      translateX.stopAnimation();
      translateX.setValue(0);
      setPagerScrollEnabled?.(false);
    },
    [isDetail, disableGesture, setPagerScrollEnabled, translateX],
  );

  const onCardTouchMove = useCallback(
    (e) => {
      if (isDetail || disableGesture || mediaCarouselGestureActive.current)
        return;
      const { pageX, pageY } = e.nativeEvent;
      const dx = pageX - touchStartX.current;
      const dy = pageY - touchStartY.current;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      lastDx.current = dx;

      if (!swipeDecided.current) {
        if (absDx > SWIPE_LOCK_THRESHOLD || absDy > SWIPE_LOCK_THRESHOLD) {
          isHorizontalSwipe.current = absDx > absDy;
          swipeDecided.current = true;
          if (!isHorizontalSwipe.current) {
            translateX.setValue(0);
          }
        } else if (absDx > absDy) {
          translateX.setValue(dx);
          return;
        }
      }

      if (isHorizontalSwipe.current) {
        translateX.setValue(dx);
      }
    },
    [isDetail, disableGesture, translateX],
  );

  const onCardTouchEnd = useCallback(
    (e) => {
      if (isDetail || disableGesture) return;

      if (mediaCarouselGestureActive.current) {
        mediaCarouselGestureActive.current = false;
        setPagerScrollEnabled?.(true);
        resetSwipeFlags();
        return;
      }

      setPagerScrollEnabled?.(true);

      const { pageX, pageY } = e.nativeEvent;
      const dx = pageX - touchStartX.current;
      const dy = pageY - touchStartY.current;

      if (isHorizontalSwipe.current) {
        completeHorizontalSwipe(lastDx.current || dx);
      }

      resetSwipeFlags();
    },
    [
      isDetail,
      disableGesture,
      setPagerScrollEnabled,
      completeHorizontalSwipe,
      resetSwipeFlags,
    ],
  );

  const onCardTouchCancel = useCallback(() => {
    if (isDetail || disableGesture) return;

    if (mediaCarouselGestureActive.current) {
      mediaCarouselGestureActive.current = false;
      setPagerScrollEnabled?.(true);
      resetSwipeFlags();
      return;
    }

    setPagerScrollEnabled?.(true);
    if (isHorizontalSwipe.current) {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    }
    resetSwipeFlags();
  }, [
    isDetail,
    disableGesture,
    setPagerScrollEnabled,
    translateX,
    resetSwipeFlags,
  ]);

  // Formatted Text Rendering (mentions & hashtags)
  const renderFormattedDescription = (text) => {
    if (!text) return null;
    const stringText = typeof text === "string" ? text : String(text);
    return stringText.split(/(\s+)/).map((part, idx) => {
      if (part.startsWith("@")) {
        return (
          <Text
            key={idx}
            style={{ color: COLORS.btnColor, fontFamily: fonts.semiBold }}
          >
            {part.substring(1)}{" "}
          </Text>
        );
      }
      if (part.startsWith("#")) {
        return (
          <Text
            key={idx}
            style={{ color: COLORS.btnColor, fontFamily: fonts.semiBold }}
          >
            {part}{" "}
          </Text>
        );
      }
      return (
        <Text key={idx} style={{ color: COLORS.white2 }}>
          {part}{" "}
        </Text>
      );
    });
  };

  const isCurrentMediaVideo =
    mediaList[currentImageIndex] && isVideoUrl(mediaList[currentImageIndex]);

  // Reacted by user data
  const topFriendLike = item?.friendLikes?.[0];
  const friendName =
    topFriendLike?.first_name ||
    topFriendLike?.firstName ||
    topFriendLike?.username;
  const friendAvatar = topFriendLike?.profile?.avatar || topFriendLike?.avatar;

  // Top Comment Data
  const topCommentAuthor = item?.topComment?.author;
  const topCommentUserName =
    topCommentAuthor?.first_name ||
    topCommentAuthor?.firstName ||
    topCommentAuthor?.username ||
    commentUser;
  const topCommentContent =
    item?.topComment?.content || item?.topComment?.text || commentText;

  return (
    <View style={{ marginBottom }}>
      {/* 1. SWIPE LEFT INDICATOR (Share Your Thoughts) */}
      <Animated.View
        style={[
          styles.swipeLeftIndicator,
          {
            opacity: translateX.interpolate({
              inputRange: [0, screenWidth * 0.1],
              outputRange: [0, 1],
              extrapolate: "clamp",
            }),
            transform: [
              {
                scale: translateX.interpolate({
                  inputRange: [0, screenWidth * 0.1],
                  outputRange: [0.5, 1],
                  extrapolate: "clamp",
                }),
              },
              {
                translateX: translateX.interpolate({
                  inputRange: [0, screenWidth / 1],
                  outputRange: [0, screenWidth / 2 - 100],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.swipeIndicatorContent}>
          <Image source={Images.thoughts} style={styles.swipeIcon} />
          <CustomText
            label="Share Your Thoughts"
            color={COLORS.white}
            fontSize={12}
          />
        </View>
      </Animated.View>

      {/* 2. SWIPE RIGHT INDICATOR (Share It With Others) */}
      <Animated.View
        style={[
          styles.swipeRightIndicator,
          {
            opacity: translateX.interpolate({
              inputRange: [-screenWidth * 0.1, 0],
              outputRange: [1, 0],
              extrapolate: "clamp",
            }),
            transform: [
              {
                scale: translateX.interpolate({
                  inputRange: [-screenWidth * 0.1, 0],
                  outputRange: [1, 0.5],
                  extrapolate: "clamp",
                }),
              },
              {
                translateX: translateX.interpolate({
                  inputRange: [-screenWidth / 1, 0],
                  outputRange: [-(screenWidth / 2 - 100), 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.swipeIndicatorContent}>
          <Image
            source={Images.globeShare || Images.thoughts}
            style={styles.swipeIcon}
          />
          <CustomText
            label="Share It With Others"
            color={COLORS.white}
            fontSize={12}
          />
        </View>
      </Animated.View>

      {/* 3. MAIN CARD CONTAINER (Animated Translation) */}
      <Animated.View
        style={[
          styles.mainContainer,
          {
            transform: [{ translateX }],
          },
        ]}
        onTouchStart={
          !isDetail && !disableGesture ? onCardTouchStart : undefined
        }
        onTouchMove={!isDetail && !disableGesture ? onCardTouchMove : undefined}
        onTouchEnd={!isDetail && !disableGesture ? onCardTouchEnd : undefined}
        onTouchCancel={
          !isDetail && !disableGesture ? onCardTouchCancel : undefined
        }
      >
        <TouchableOpacity
          activeOpacity={0.95}
          disabled={isDetail || cardPress === false}
          onPress={handleCardPress}
        >
          <View>
            {/* HEADER */}
            {showHeader && (
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.userInfo}
                  activeOpacity={0.8}
                  onPress={() => setShowCreatorSummary(true)}
                >
                  <View
                    style={{
                      padding: 2,
                      borderColor: authorProfileColor || COLORS.btnColor,
                      borderWidth: 2,
                      borderRadius: 99,
                    }}
                  >
                    {authorAvatar ? (
                      <ImageFast
                        source={{ uri: authorAvatar }}
                        style={styles.avatar}
                      />
                    ) : (
                      <View
                        style={[
                          styles.avatar,
                          { backgroundColor: authorProfileColor },
                        ]}
                      />
                    )}
                  </View>
                  <View style={styles.nameBlock}>
                    <View style={styles.nameRow}>
                      <CustomText
                        label={effectiveDisplayName}
                        fontSize={15}
                        color={COLORS.white}
                        fontFamily={fonts.semiBold}
                      />
                      {effectiveIsVerified && (
                        <Image
                          source={Images.verified}
                          style={{ width: 14, height: 14, marginLeft: 4 }}
                        />
                      )}
                      {author?.role === "company" && (
                        <Image
                          source={Images.grayStar}
                          style={{ width: 14, height: 14, marginLeft: 4 }}
                        />
                      )}
                    </View>
                    <CustomText
                      label={`${effectiveUsername}`}
                      fontSize={13}
                      color={COLORS.white3}
                    />
                  </View>
                </TouchableOpacity>

                <View style={styles.headerRight}>
                  {!isOwner && (
                    <TouchableOpacity
                      style={[
                        styles.followButton,
                        isFollowingUser && {
                          backgroundColor: COLORS.cardColor,
                        },
                      ]}
                      onPress={handleFollowPress}
                      activeOpacity={0.8}
                    >
                      <CustomText
                        label={isFollowingUser ? "Following" : "Follow"}
                        fontSize={13}
                        fontFamily={fonts.medium}
                        color={COLORS.white}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => setShowModal(true)}
                    activeOpacity={0.7}
                  >
                    <Icons
                      family="Entypo"
                      name="dots-three-vertical"
                      size={16}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* REPOSTED FROM ROW */}
            {item?.parentPostId || item?.parentPost ? (
              <View style={styles.partnerRow}>
                <Image
                  source={Images.arrowNext || PNGIcons.turn}
                  style={{ height: 16, width: 16, tintColor: COLORS.white3 }}
                />
                <CustomText
                  label="Reposted from"
                  fontSize={12}
                  color={COLORS.white3}
                  marginLeft={4}
                  lineHeight={12 * 1.4}
                  marginRight={4}
                />
                {parentAvatar ? (
                  <ImageFast
                    source={{ uri: parentAvatar }}
                    style={styles.partnerBg}
                  />
                ) : (
                  <View style={styles.partnerBg} />
                )}
                <CustomText
                  label={parentDisplayName}
                  fontSize={12}
                  color={COLORS.white}
                  fontFamily={fonts.semiBold}
                  marginLeft={4}
                  lineHeight={12 * 1.4}
                />
              </View>
            ) : partnershipWith || item?.sponsoredBy?.length > 0 ? (
              <View style={styles.partnerRow}>
                <Image
                  source={PNGIcons.turn}
                  style={{ height: 18, width: 18 }}
                />
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
                  label={
                    partnershipWith || item?.sponsoredBy?.[0] || "BandMate"
                  }
                  fontSize={12}
                  color={COLORS.white}
                  fontFamily={fonts.semiBold}
                  marginLeft={4}
                  lineHeight={12 * 1.4}
                />
              </View>
            ) : null}

            {/* HASHTAGS ROW (Pure hashtags with Tags SVG) */}
            {effectiveHashtags.length > 0 && (
              <View style={styles.wrapper}>
                {effectiveHashtags.map((tag, index) => (
                  <View key={index} style={styles.tagBg}>
                    <Tags width={12} height={12} color={COLORS.white3} />
                    <CustomText
                      label={`${tag}`}
                      fontSize={12}
                      color={COLORS.white3}
                      fontFamily={fonts.medium}
                      marginLeft={2}
                    />
                  </View>
                ))}
              </View>
            )}

            {/* LOOKING FOR INVESTMENT BADGE */}
            {(item?.lookingForInvestment ||
              item?.isInvestment ||
              item?.tag === "investment") && (
              <View style={styles.investmentCard}>
                <CustomText
                  label="LOOKING FOR INVESTMENT"
                  fontSize={10}
                  fontFamily={fonts.semiBold}
                  color="rgba(255, 255, 255, 0.64)"
                />
              </View>
            )}

            {/* DESCRIPTION SECTION (Multi-slide / Single) */}
            {descriptionArray.length > 1 ? (
              <View
                style={{ paddingHorizontal: 14, marginTop: 8, marginBottom: 4 }}
              >
                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={handleDescScroll}
                  scrollEventThrottle={16}
                  style={{ width: screenWidth - 28 }}
                >
                  {descriptionArray.map((desc, idx) => (
                    <View key={idx} style={{ width: screenWidth - 28 }}>
                      <CustomText
                        color={COLORS.white}
                        fontSize={14}
                        lineHeight={20}
                        numberOfLines={!isDetail ? 2 : undefined}
                      >
                        {renderFormattedDescription(desc)}
                      </CustomText>
                    </View>
                  ))}
                </ScrollView>

                <View style={[styles.rowBetween, { marginTop: 4 }]}>
                  {isTruncated ? (
                    <CustomText
                      color={COLORS.btnColor}
                      label="Read full post..."
                      fontFamily={fonts.medium}
                      fontSize={13}
                    />
                  ) : (
                    <View />
                  )}
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 75,
                      backgroundColor: COLORS.inputBg,
                    }}
                  >
                    <CustomText
                      label={`${currentDescIndex + 1}/${
                        descriptionArray.length
                      }`}
                      fontFamily={fonts.medium}
                      fontSize={10}
                      color={COLORS.white3}
                    />
                  </View>
                </View>
              </View>
            ) : descriptionArray.length === 1 ? (
              <View
                style={{ paddingHorizontal: 14, marginTop: 8, marginBottom: 4 }}
              >
                <CustomText
                  color={COLORS.white}
                  fontSize={14}
                  lineHeight={20}
                  numberOfLines={!isDetail ? 3 : undefined}
                >
                  {renderFormattedDescription(descriptionArray[0])}
                </CustomText>
              </View>
            ) : null}

            {/* PALETTE GLOW BACKGROUND */}
            {bgColor ? (
              <View
                style={[
                  styles.glowBg,
                  {
                    backgroundColor: bgColor,
                    shadowColor: bgColor,
                    top: "28%",
                    height: "44%",
                  },
                ]}
              />
            ) : null}

            {/* IMAGE / VIDEO MEDIA CAROUSEL */}
            <View
              style={styles.imageWrapper}
              onTouchStart={
                mediaList.length > 1 ? onMediaCarouselTouchStart : undefined
              }
            >
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={screenWidth - 24}
                snapToAlignment="center"
                disableIntervalMomentum={true}
                style={{ width: screenWidth - 24 }}
              >
                {mediaList.map((mediaUri, index) => {
                  const isVideo = isVideoUrl(mediaUri);
                  return (
                    <View
                      key={index}
                      style={[
                        {
                          width: screenWidth - 24,
                          height: getImageHeight(),
                          overflow: "hidden",
                        },
                        getBorderRadiusStyle(index),
                      ]}
                    >
                      {isVideo ? (
                        <View style={{ flex: 1 }}>
                          <Video
                            ref={(ref) => (videoRefs.current[index] = ref)}
                            source={{ uri: mediaUri }}
                            style={[
                              styles.image,
                              {
                                height: getImageHeight(),
                                width: screenWidth - 24,
                              },
                              getBorderRadiusStyle(index),
                            ]}
                            resizeMode="cover"
                            repeat
                            paused={!shouldPlay || index !== currentImageIndex}
                            muted={mutedVideos[index] || false}
                            controls={false}
                            ignoreSilentSwitch="obey"
                            playInBackground={false}
                            playWhenInactive={false}
                            onProgress={(data) =>
                              handleVideoProgress(index, data)
                            }
                            poster={item?.thumbnail}
                            posterResizeMode="cover"
                            onReadyForDisplay={() =>
                              setVideoReady((prev) => ({
                                ...prev,
                                [index]: true,
                              }))
                            }
                          />
                          {!videoReady[index] && (
                            <View
                              style={[
                                StyleSheet.absoluteFill,
                                getBorderRadiusStyle(index),
                                { backgroundColor: COLORS.black },
                              ]}
                            >
                              <View style={styles.videoOverlay}>
                                <ActivityIndicator
                                  size="small"
                                  color={COLORS.white}
                                />
                              </View>
                            </View>
                          )}
                          <View style={styles.videoOverlay}>
                            <Image
                              source={Images.playIcon || Images.playbutton}
                              style={styles.playIcon}
                            />
                          </View>
                        </View>
                      ) : (
                        <ImageFast
                          source={
                            typeof mediaUri === "string"
                              ? { uri: mediaUri }
                              : mediaUri
                          }
                          style={[
                            styles.image,
                            {
                              height: getImageHeight(),
                              width: screenWidth - 24,
                            },
                            getBorderRadiusStyle(index),
                          ]}
                          resizeMode="cover"
                        />
                      )}

                      {/* Top Progressive Blur */}
                      <View
                        style={styles.topBlurContainer}
                        pointerEvents="none"
                      >
                        <ProgressiveBlur
                          intensity={80}
                          direction="top"
                          tint="light"
                          height={60}
                          imageUri={mediaUri}
                          style={{
                            borderTopLeftRadius:
                              getBorderRadiusStyle(index).borderTopLeftRadius,
                            borderTopRightRadius:
                              getBorderRadiusStyle(index).borderTopRightRadius,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                          }}
                        />
                      </View>

                      {/* Bottom Progressive Blur */}
                      <View
                        style={styles.bottomBlurContainer}
                        pointerEvents="none"
                      >
                        <ProgressiveBlur
                          intensity={80}
                          direction="bottom"
                          tint="light"
                          height={60}
                          imageUri={mediaUri}
                          style={{
                            borderBottomLeftRadius:
                              getBorderRadiusStyle(index)
                                .borderBottomLeftRadius,
                            borderBottomRightRadius:
                              getBorderRadiusStyle(index)
                                .borderBottomRightRadius,
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                          }}
                        />
                      </View>

                      {/* Overlay Tag Chip on Video */}
                      {isCurrentMediaVideo && effectiveHashtags.length > 0 && (
                        <View style={styles.cardBg}>
                          <Blur />
                          <CustomText
                            label={`${effectiveHashtags[0]}`}
                            fontSize={12}
                            color={COLORS.white}
                            fontFamily={fonts.medium}
                          />
                        </View>
                      )}

                      {/* Bottom Overlay Controls */}
                      <View style={styles.mediaOverlayControls}>
                        {/* Left Overlay Control */}
                        {isCurrentMediaVideo ? (
                          <TouchableOpacity
                            onPress={toggleMute}
                            style={styles.mediaMuteBtn}
                          >
                            <Blur />
                            <Icons
                              name={
                                isCurrentVideoMuted()
                                  ? "volume-up"
                                  : "volume-off"
                              }
                              family="MaterialIcons"
                              size={16}
                              color={COLORS.white}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={styles.repostButton}
                            onPress={() => setShowViewerModal(true)}
                          >
                            <Blur />
                            <Image
                              source={Images.friend || PNGIcons.users}
                              style={{ height: 16, width: 16 }}
                            />
                          </TouchableOpacity>
                        )}

                        {/* Right Overlay Control */}
                        {isCurrentMediaVideo ? (
                          <View
                            style={{ alignItems: "flex-end", paddingRight: 4 }}
                          >
                            <View style={styles.videoTimerBadge}>
                              <Blur />
                              <CustomText
                                label={
                                  videoProgress[currentImageIndex]
                                    ? formatTime(
                                        videoProgress[currentImageIndex]
                                          .currentTime,
                                      )
                                    : "0:00"
                                }
                                fontFamily={fonts.medium}
                                fontSize={12}
                              />
                            </View>
                          </View>
                        ) : item?.parentPostId ? (
                          <TouchableOpacity
                            style={styles.repostButton}
                            onPress={() => setShowRepostModal(true)}
                          >
                            <Blur />
                            <Image
                              source={Images.repostWhite || Images.repost}
                              style={{
                                height: 14,
                                width: 14,
                                tintColor: COLORS.white,
                              }}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={styles.repostButton}
                            onPress={() => setShowShareModal(true)}
                          >
                            <Blur />
                            <FullScreenSvg />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>

            {/* DYNAMIC PAGINATION INDICATOR DOTS */}
            {mediaList.length > 1 && (
              <View style={styles.rowSwipper}>
                {mediaList.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      index === currentImageIndex
                        ? [
                            styles.activeIndicator,
                            { backgroundColor: bgColor || COLORS.btnColor },
                          ]
                        : styles.inactiveIndicator,
                      index === currentImageIndex && styles.activeWidth,
                    ]}
                  />
                ))}
              </View>
            )}

            {/* ACTION BUTTONS ROW (Upvote, Downvote, Comment, Share, Repost, Save) */}
            <View style={styles.rowButtons}>
              {/* UPVOTE BUTTON */}
              <TouchableOpacity
                onPress={() =>
                  item?.privacy?.upvote === false
                    ? ToastMessage(
                        "User has disabled upvoting on this post",
                        "error",
                      )
                    : handleVote("upvote")
                }
                onStartShouldSetResponder={() => true}
                style={[
                  styles.rowbtn,
                  hasUpvoted() && {
                    backgroundColor: COLORS.white,
                  },
                ]}
              >
                <Image
                  source={Images.arrowUp}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: hasUpvoted() ? COLORS.black : COLORS.white,
                  }}
                />
                <CustomText
                  label={formatCount(localUpvotes.length)}
                  fontFamily={fonts.medium}
                  fontSize={12}
                  marginRight={4}
                  color={hasUpvoted() ? COLORS.black : COLORS.white}
                />
              </TouchableOpacity>

              {/* DOWNVOTE BUTTON */}
              <TouchableOpacity
                onPress={() =>
                  item?.privacy?.upvote === false
                    ? ToastMessage(
                        "User has disabled downvoting on this post",
                        "error",
                      )
                    : handleVote("downvote")
                }
                onStartShouldSetResponder={() => true}
                style={[
                  styles.rowbtn,
                  hasDownvoted() && {
                    backgroundColor: COLORS.white,
                  },
                ]}
              >
                <CustomText
                  label={formatCount(localDownvotes.length)}
                  fontFamily={fonts.medium}
                  fontSize={12}
                  marginLeft={4}
                  color={hasDownvoted() ? COLORS.black : COLORS.white}
                />
                <Image
                  source={Images.arrowDown}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: hasDownvoted() ? COLORS.black : COLORS.white,
                  }}
                />
              </TouchableOpacity>

              {/* COMMENT BUTTON */}
              <TouchableOpacity
                onPress={handleCommentPress}
                onStartShouldSetResponder={() => true}
                style={styles.rowbtn}
              >
                <Image
                  source={Images.chat}
                  style={{
                    height: 16,
                    width: 16,
                    marginLeft: 3,
                    tintColor: COLORS.white,
                  }}
                />
                <CustomText
                  label={formatCount(effectiveCommentsCount)}
                  fontFamily={fonts.medium}
                  fontSize={12}
                  marginRight={4}
                  color={COLORS.white}
                />
              </TouchableOpacity>

              {/* SHARE BUTTON */}
              <TouchableOpacity
                onPress={() =>
                  item?.privacy?.share === false
                    ? ToastMessage(
                        "User has disabled share on this post",
                        "error",
                      )
                    : setShowShareModal(true)
                }
                onStartShouldSetResponder={() => true}
                style={styles.rowbtn}
              >
                <Image
                  source={Images.arrowUpRight}
                  style={{ height: 16, width: 16, tintColor: COLORS.white }}
                />
                <CustomText
                  label={formatCount(effectiveSharesCount)}
                  fontFamily={fonts.medium}
                  fontSize={12}
                  marginRight={4}
                  color={COLORS.white}
                />
              </TouchableOpacity>

              {/* REPOST BUTTON */}
              <TouchableOpacity
                style={styles.rowbtn}
                onPress={() =>
                  item?.privacy?.repost === false
                    ? ToastMessage(
                        "User has disabled repost on this post",
                        "error",
                      )
                    : setShowRepostModal(true)
                }
                onStartShouldSetResponder={() => true}
              >
                <Image
                  source={Images.repost}
                  style={{
                    height: 16,
                    width: 16,
                    marginLeft: 4,
                    tintColor: COLORS.white,
                  }}
                />
                <CustomText
                  label={formatCount(effectiveRepostsCount)}
                  fontFamily={fonts.medium}
                  fontSize={12}
                  marginRight={4}
                  color={COLORS.white}
                />
              </TouchableOpacity>

              {/* SAVE BUTTON */}
              <TouchableOpacity
                onPress={() =>
                  item?.privacy?.save === false
                    ? ToastMessage(
                        "User has disabled save on this post",
                        "error",
                      )
                    : handleSaveToggle()
                }
                onStartShouldSetResponder={() => true}
                style={[
                  styles.rowbtn,
                  isSaved && { backgroundColor: COLORS.white },
                ]}
              >
                <Image
                  source={Images.savePlus}
                  style={[
                    {
                      height: 13,
                      width: 13,
                      marginLeft: 4,
                      tintColor: isSaved ? COLORS.black : COLORS.white,
                    },
                  ]}
                />
                <CustomText
                  label={formatCount(localSaves)}
                  fontFamily={fonts.medium}
                  fontSize={12}
                  marginRight={4}
                  color={isSaved ? COLORS.black : COLORS.white}
                />
              </TouchableOpacity>
            </View>

            {/* POST DETAILS (Reacted by, Most Liked Comment, View all comments, Time ago) */}
            <View style={styles.postDetails}>
              {/* Reacted by Row */}
              {(friendName ||
                reactedBy ||
                (localUpvotes.length > 0 && item?.friendLikes?.length > 0)) && (
                <View
                  style={[
                    styles.partnerRow,
                    { paddingHorizontal: 0, marginTop: 2 },
                  ]}
                >
                  {friendAvatar ? (
                    <ImageFast
                      source={{ uri: friendAvatar }}
                      style={{
                        height: 16,
                        width: 16,
                        borderRadius: 99,
                        marginRight: 4,
                      }}
                    />
                  ) : (
                    <Image
                      source={PNGIcons.webflow || Images.person}
                      style={{ height: 16, width: 16, marginRight: 4 }}
                    />
                  )}
                  <CustomText
                    label={`${
                      friendName ||
                      reactedBy ||
                      `${formatCount(localUpvotes.length)} people`
                    } `}
                    fontSize={14}
                    fontFamily={fonts.medium}
                    marginLeft={2}
                  />
                  <CustomText
                    label="reacted to this post"
                    fontSize={12}
                    color={COLORS.white3}
                  />
                </View>
              )}

              {/* Most Liked Comment Preview */}
              {topCommentContent ? (
                <TouchableOpacity
                  style={[styles.commentRow, { marginTop: 6 }]}
                  activeOpacity={0.7}
                  onPress={handleCommentPress}
                >
                  <View style={[styles.commentRow, { flex: 1 }]}>
                    <CustomText
                      label={`${topCommentUserName} `}
                      fontSize={14}
                      color={COLORS.white}
                      fontFamily={fonts.medium}
                    />
                    <View
                      style={{
                        height: 3,
                        width: 3,
                        backgroundColor: "#FFFFFF29",
                        borderRadius: 99,
                        marginHorizontal: 4,
                      }}
                    />
                    <CustomText
                      label={topCommentContent}
                      fontSize={14}
                      color={COLORS.white}
                      fontFamily={fonts.regular}
                    />
                  </View>

                  <Image
                    source={Images.heart}
                    style={{ height: 16, width: 16, marginLeft: 6 }}
                  />
                </TouchableOpacity>
              ) : null}

              {/* View All Comments Link */}
              {effectiveCommentsCount > 0 && (
                <TouchableOpacity
                  style={{ marginTop: 4 }}
                  activeOpacity={0.8}
                  onPress={handleCommentPress}
                >
                  <CustomText
                    label={`View all ${formatCount(
                      effectiveCommentsCount,
                    )} comments`}
                    fontSize={14}
                    color={COLORS.white3}
                  />
                </TouchableOpacity>
              )}

              {/* Time Ago */}
              <CustomText
                label={effectiveTimeAgo}
                fontSize={12}
                color={COLORS.white3}
                marginTop={2}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* MODALS */}
      <EditModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        displayName={effectiveDisplayName}
        username={effectiveUsername}
        user={author}
        isOwner={isOwner}
        onEditPress={() => {
          if (onEditPress) {
            onEditPress(item);
          } else {
            navigation.navigate("PublishPost", {
              editMode: true,
              postData: item,
            });
          }
        }}
        onDeletePress={() => {
          if (onDeletePress) {
            onDeletePress(item?._id);
          }
        }}
        onHidePost={() => {
          if (onHidePost) {
            onHidePost(item?._id);
          }
        }}
        onHideUserPosts={() => {
          if (onHideUserPosts) {
            onHideUserPosts(author._id);
          }
        }}
      />

      <ShareModal
        isVisible={showShareModal}
        onClose={() => setShowShareModal(false)}
        postImage={mediaList[0] || item?.thumbnail || Images.person}
        username={effectiveUsername}
        date={effectiveTimeAgo}
        postId={item?._id}
        onShareToStory={async () => {
          try {
            const url = mediaList[0] || item?.thumbnail || "";
            const mediaType = isVideoUrl(url) ? "video" : "image";
            await Promise.all([
              post(`posts/${item?._id}/repost`, { type: "share" }),
              post("stories", {
                media: { url, type: mediaType },
                status: "active",
                postId: item?._id,
              }),
            ]);
            setShowShareModal(false);
            ToastMessage("Post shared to story successfully", "success");
          } catch (error) {
            console.log("Error sharing to story:", error);
            ToastMessage("Failed to share to story", "error");
          }
        }}
      />

      <RepostModal
        isVisible={showRepostModal}
        onClose={() => setShowRepostModal(false)}
        postImage={mediaList[0] || item?.thumbnail || Images.person}
        username={effectiveUsername}
        date={effectiveTimeAgo}
        item={item}
      />

      <CreatorSummary
        isVisible={showCreatorSummary}
        onClose={() => setShowCreatorSummary(false)}
        user={author}
        profileColor={authorProfileColor}
        onMorePress={() => {
          setShowCreatorSummary(false);
          setTimeout(() => {
            setShowSummaryMore(true);
          }, 400);
        }}
      />

      <SummaryMore
        isVisible={showSummaryMore}
        onClose={() => setShowSummaryMore(false)}
        userId={author._id}
        isFollowing={isFollowingUser}
        onViewProfile={() => {
          setShowSummaryMore(false);
          try {
            navigation.navigate("Detail", { userId: author._id });
          } catch (e) {}
        }}
        onSendMessage={() => {
          setShowSummaryMore(false);
          try {
            navigation.navigate("InboxScreen", { otherUser: author });
          } catch (e) {}
        }}
        onRemoveFriend={handleFollowPress}
      />

      <ViewerModal
        isVisible={showViewerModal}
        onDisable={() => setShowViewerModal(false)}
        viewersCount={item?.stats?.views || 0}
        postId={item?._id}
      />
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  mainContainer: {
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
  nameBlock: {
    marginLeft: 2,
  },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  partnerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    paddingHorizontal: 14,
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
    borderRadius: 16,
    overflow: "hidden",
    paddingHorizontal: 12,
    marginTop: 4,
  },
  glowBg: {
    position: "absolute",
    left: 12,
    right: 12,
    borderRadius: 16,
    opacity: 0.8,
    shadowOpacity: 0.9,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 50,
  },
  image: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  topBlurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    zIndex: 1,
  },
  bottomBlurContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    zIndex: 1,
  },
  mediaOverlayControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  mediaMuteBtn: {
    paddingHorizontal: 10,
    height: 32,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 99,
    overflow: "hidden",
  },
  videoTimerBadge: {
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 99,
    paddingVertical: 6,
    overflow: "hidden",
    marginRight: 6,
  },
  videoOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 16,
  },
  playIcon: {
    width: 44,
    height: 44,
    tintColor: "rgba(255,255,255,0.8)",
  },
  rowSwipper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 8,
    alignSelf: "center",
  },
  indicator: {
    height: 6,
    borderRadius: 99,
  },
  activeWidth: {
    width: 30,
  },
  activeIndicator: {
    width: 30,
  },
  inactiveIndicator: {
    width: 6,
    backgroundColor: "#FFFFFF29",
  },
  postDetails: {
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 10,
  },
  commentRow: { flexDirection: "row", alignItems: "center" },
  wrapper: {
    gap: 4,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginTop: 6,
  },
  tagBg: {
    backgroundColor: COLORS.inputBg,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 99,
    paddingLeft: 8,
    paddingRight: 10,
    height: 24,
  },
  cardBg: {
    backgroundColor: "rgba(18, 18, 18, 0.44)",
    paddingLeft: 6,
    paddingRight: 7.5,
    borderRadius: 99,
    position: "absolute",
    overflow: "hidden",
    top: 14,
    height: 24,
    left: 14,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  investmentCard: {
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "rgba(55, 184, 116, 0.48)",
    marginTop: 8,
    height: 20,
    marginHorizontal: 14,
  },
  repostButton: {
    height: 32,
    width: 32,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
    overflow: "hidden",
  },
  rowbtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF0A",
    paddingRight: 6,
    paddingLeft: 6,
    paddingVertical: 4,
    borderRadius: 4,
    width: "15.5%",
    height: 28,
  },
  rowButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    justifyContent: "space-between",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  swipeRightIndicator: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -25 }],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: -10,
  },
  swipeLeftIndicator: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -25 }],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: -10,
  },
  swipeIndicatorContent: {
    alignItems: "center",
  },
  swipeIcon: {
    height: 70,
    width: 70,
    tintColor: COLORS.white,
  },
});

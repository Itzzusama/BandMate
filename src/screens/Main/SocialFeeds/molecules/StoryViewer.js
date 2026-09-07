import { useIsFocused, useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  DeviceEventEmitter,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import AnimatedReanimated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Video from "react-native-video";
import { useDispatch, useSelector } from "react-redux";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import Blur from "../../../../components/Blur";
import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { del, post } from "../../../../services/ApiRequest";
import { setUserData } from "../../../../store/reducer/usersSlice";
import { COLORS } from "../../../../utils/COLORS";
import { ToastMessage } from "../../../../utils/ToastMessage";

const { width, height } = Dimensions.get("window");

const EMOJI_MAPPING = {
  "😀": "grinning",
  "😂": "joy",
  "😍": "heart_eyes",
  "🥲": "smiling_face_with_tear",
  "😎": "sunglasses",
  "🤯": "exploding_head",
  "😭": "sob",
  "🔥": "fire",
  "❤️": "love",
  "👍": "like",
};

const REACTION_TO_EMOJI = Object.fromEntries(
  Object.entries(EMOJI_MAPPING).map(([emoji, reaction]) => [reaction, emoji]),
);

// Noto animated emoji list (same pattern used in CommentScreen)
const EMOJI_DATA = [
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

const EMOJI_URLS = Object.fromEntries(EMOJI_DATA.map((e) => [e.char, e.url]));

const getLiveStreamObject = (item) =>
  typeof item?.liveStreamId === "object"
    ? item?.liveStreamId
    : item?.liveStream || item?.liveStreamData || item?.stream || {};

const getLiveStreamDbId = (item, liveStreamPayload) =>
  (typeof item?.liveStreamId === "object"
    ? item?.liveStreamId?._id ||
      item?.liveStreamId?.id ||
      item?.liveStreamId?.liveStreamId
    : item?.liveStreamId) ||
  liveStreamPayload?._id ||
  liveStreamPayload?.id ||
  "";

const getLiveStreamMeetingId = (liveStreamPayload, fallbackId) =>
  liveStreamPayload?.meetingId ||
  liveStreamPayload?.metadata?.roomId ||
  liveStreamPayload?.roomId ||
  liveStreamPayload?.liveId ||
  fallbackId ||
  "";

const getLiveAuthor = (item, liveStreamPayload) =>
  liveStreamPayload?.author ||
  liveStreamPayload?.user ||
  liveStreamPayload?.userId ||
  item?.userInfo?.user?.[0] ||
  {};

const StoryViewer = ({
  route,
  userStories: userStoriesProp,
  initialUserIndex: initialUserIndexProp,
  isMyStory: isMyStoryProp,
  onClose,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const { userData } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // Support both navigation-screen (route.params) and direct-prop (modal) usage
  const userStories =
    userStoriesProp !== undefined
      ? userStoriesProp
      : route?.params?.userStories ?? [];
  const initialUserIndex =
    initialUserIndexProp !== undefined
      ? initialUserIndexProp
      : route?.params?.initialUserIndex ?? 0;
  const isMyStoryParam =
    isMyStoryProp !== undefined
      ? isMyStoryProp
      : route?.params?.isMyStory ?? false;

  const flatStories = useMemo(() => {
    let flattened = [];
    userStories?.forEach((user, uIdx) => {
      (user?.stories || []).forEach((story, sIdx) => {
        flattened.push({
          ...story,
          userIndex: uIdx,
          storyIndex: sIdx,
          userInfo: user,
          totalStories: (user?.stories || []).length,
        });
      });
    });
    return flattened;
  }, [userStories]);

  const initialGlobalIndex = useMemo(() => {
    const targetIdx = Number(initialUserIndex) || 0;
    const idx = flatStories.findIndex((s) => s.userIndex === targetIdx);
    return idx >= 0 ? idx : 0;
  }, [flatStories, initialUserIndex]);

  const [currentIndex, setCurrentIndex] = useState(initialGlobalIndex);

  useEffect(() => {
    if (initialGlobalIndex >= 0 && initialGlobalIndex < flatStories.length) {
      setCurrentIndex(initialGlobalIndex);
    }
  }, [initialGlobalIndex, flatStories.length]);

  const [isPaused, setIsPaused] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [videoReady, setVideoReady] = useState(false);
  const pausedProgress = useRef(0);
  const videoRef = useRef(null);
  const emojiRefs = useRef([]);
  const [flyingEmoji, setFlyingEmoji] = useState(null);
  const flyX = useRef(new Animated.Value(0)).current;
  const flyY = useRef(new Animated.Value(0)).current;
  const flyScale = useRef(new Animated.Value(0.85)).current;
  const flyOpacity = useRef(new Animated.Value(0)).current;
  // Per-story optimistic reaction cache
  const reactionCacheRef = useRef(new Map());
  const reactionPostingRef = useRef(new Set());
  const [reactionCounts, setReactionCounts] = useState(() => {
    return Object.keys(EMOJI_MAPPING).reduce((acc, emoji) => {
      acc[emoji] = {
        count: 0,
        scaleAnim: new Animated.Value(1),
      };
      return acc;
    }, {});
  });

  const progressAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  const currentItem = flatStories[currentIndex];
  const circleProgress = useSharedValue(0);

  const isFollowingUser = useMemo(() => {
    const authorId = currentItem?.userInfo?.user?.[0]?._id;
    if (!authorId) return false;
    if (userData?.stats?.following) {
      return userData.stats.following.includes(authorId);
    }
    return false;
  }, [userData?.stats?.following, currentItem?.userInfo?.user?.[0]?._id]);

  const handleFollowPress = async () => {
    const userId = currentItem?.userInfo?.user?.[0]?._id;
    if (!userId) return;

    const currentlyFollowing = isFollowingUser;

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

    const authorName = currentItem?.userInfo?.user?.[0]?.firstName || "User";
    try {
      if (currentlyFollowing) {
        await del(`relationships/unfollow/${userId}`);
        ToastMessage(`Unfollowed ${authorName}`);
      } else {
        await post(`relationships/follow/${userId}`);
        ToastMessage(`You are now following ${authorName}`, "success");
      }
    } catch (error) {
      console.log("Error following/unfollowing:", error);
      dispatch(setUserData(userData));
    }
  };

  // Initialize reaction counts when current item changes
  useEffect(() => {
    if (!currentItem?._id) return;

    const storyId = currentItem._id;
    const cached = reactionCacheRef.current.get(storyId);

    const baseCounts = {};
    Object.entries(EMOJI_MAPPING).forEach(([emoji, reactionKey]) => {
      baseCounts[emoji] = currentItem?.stats?.reactions?.[reactionKey] || 0;
    });

    let nextSelectedEmoji = cached?.selectedEmoji ?? null;
    if (!nextSelectedEmoji && currentItem.peopleReact && userData?._id) {
      const userReactObj = currentItem.peopleReact.find(
        (r) => r.userId === userData._id,
      );
      if (userReactObj) {
        nextSelectedEmoji = REACTION_TO_EMOJI[userReactObj.reaction];
      }
    }
    setSelectedEmoji(nextSelectedEmoji);

    setReactionCounts((prev) => {
      const next = { ...prev };
      Object.keys(EMOJI_MAPPING).forEach((emoji) => {
        next[emoji] = {
          ...prev[emoji],
          count:
            typeof cached?.counts?.[emoji] === "number"
              ? cached.counts[emoji]
              : baseCounts[emoji],
        };
      });
      return next;
    });
  }, [currentItem, userData]);

  // Animation Logic
  useEffect(() => {
    if (!currentItem) return;

    const trackView = async () => {
      try {
        if (currentItem._id) {
          DeviceEventEmitter.emit("STORY_VIEWED", { storyId: currentItem._id });
          const url = `stories/${currentItem?._id}/view`;
          await post(url);
        }
      } catch (error) {
        console.log("Error tracking story view:", error);
      }
    };
    trackView();

    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }

    progressAnim.setValue(0);
    pausedProgress.current = 0;
    setVideoReady(false);

    if (!isPaused) {
      startProgressAnimation();
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, [currentIndex, currentItem]);

  useEffect(() => {
    if (!currentItem) return;
    if (currentItem?.media?.type === "video" && videoReady && !isPaused) {
      startProgressAnimation();
    }
  }, [videoReady]);

  useEffect(() => {
    if (!currentItem) return;

    if (isPaused) {
      if (animationRef.current) {
        animationRef.current.stop();
        // @ts-ignore
        pausedProgress.current = progressAnim._value;
        animationRef.current = null;
      }
    } else {
      if (currentItem?.media?.type === "video") {
        if (videoReady) {
          startProgressAnimation();
        }
      } else {
        startProgressAnimation();
      }
    }
  }, [isPaused]);

  useEffect(() => {
    if (!isFocused) {
      setIsPaused(true);
      if (animationRef.current) {
        animationRef.current.stop();
        // @ts-ignore
        pausedProgress.current = progressAnim._value;
        animationRef.current = null;
      }
    } else {
      setIsPaused(false);
    }
  }, [isFocused]);

  const startProgressAnimation = () => {
    const duration =
      currentItem?.media?.type === "video"
        ? (currentItem?.media?.duration || 15) * 1000
        : currentItem?.postId?._id
        ? 5000
        : 5000;

    const currentProgress = pausedProgress.current;
    const remainingDuration = duration * (1 - currentProgress);

    animationRef.current = Animated.timing(progressAnim, {
      toValue: 1,
      duration: remainingDuration,
      useNativeDriver: false,
    });

    animationRef.current.start(({ finished }) => {
      if (finished && isFocused) {
        goToNext();
      }
    });
  };

  // --- CUBE GESTURE VARIABLES & LOGIC ---
  const currentUIndex = useSharedValue(initialUserIndex || 0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleGoBack = useCallback(() => {
    if (onClose) {
      onClose();
    } else if (isFocused) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  }, [isFocused, navigation, onClose]);

  const SWIPE_THRESHOLD = width * 0.35;
  const PERSPECTIVE = 1000;

  const resetTranslate = useCallback(() => {
    translateX.value = 0;
  }, []);

  const handleSwipeToUser = useCallback(
    (uIdx) => {
      const flatIdx = flatStories.findIndex((s) => s.userIndex === uIdx);
      if (flatIdx !== -1) setCurrentIndex(flatIdx);
    },
    [flatStories],
  );

  const triggerCubeScrollToNextUser = useCallback(() => {
    if (currentUIndex.value < (userStories?.length || 0) - 1) {
      translateX.value = withTiming(-width, { duration: 220 }, () => {
        currentUIndex.value += 1;
        runOnJS(resetTranslate)();
        runOnJS(handleSwipeToUser)(currentUIndex.value);
      });
    } else {
      if (onClose) {
        onClose();
      } else if (isFocused) {
        if (navigation.canGoBack()) navigation.goBack();
      }
    }
  }, [
    userStories,
    currentUIndex,
    translateX,
    navigation,
    isFocused,
    resetTranslate,
    handleSwipeToUser,
    onClose,
  ]);

  const triggerCubeScrollToPrevUser = useCallback(() => {
    if (currentUIndex.value > 0) {
      translateX.value = withTiming(width, { duration: 220 }, () => {
        currentUIndex.value -= 1;
        runOnJS(resetTranslate)();
        runOnJS(handleSwipeToUser)(currentUIndex.value);
      });
    } else {
      if (onClose) {
        onClose();
      } else if (isFocused) {
        if (navigation.canGoBack()) navigation.goBack();
      }
    }
  }, [
    currentUIndex,
    translateX,
    navigation,
    isFocused,
    resetTranslate,
    handleSwipeToUser,
    onClose,
  ]);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;

      if (e.translationY > 0) {
        const progress = Math.min(e.translationY / 150, 1);
        circleProgress.value = progress;
      }
    })
    .onEnd(() => {
      if (circleProgress.value >= 1) {
        runOnJS(handleGoBack)();
      } else {
        circleProgress.value = withTiming(0);
      }

      const next =
        translateX.value < -SWIPE_THRESHOLD &&
        currentUIndex.value < (userStories?.length || 0) - 1;

      const prev =
        translateX.value > SWIPE_THRESHOLD && currentUIndex.value > 0;

      if (next) {
        translateX.value = withTiming(-width, { duration: 220 }, () => {
          currentUIndex.value += 1;
          runOnJS(resetTranslate)();
          runOnJS(handleSwipeToUser)(currentUIndex.value);
        });
      } else if (prev) {
        translateX.value = withTiming(width, { duration: 220 }, () => {
          currentUIndex.value -= 1;
          runOnJS(resetTranslate)();
          runOnJS(handleSwipeToUser)(currentUIndex.value);
        });
      } else {
        translateX.value = withTiming(0, { duration: 200 });
      }
    });

  const mainAnimatedStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      transform: [],
    };
  });

  const goToNext = useCallback(() => {
    const curr = flatStories[currentIndex];
    const nextItem = flatStories[currentIndex + 1];
    if (nextItem && nextItem.userIndex === curr?.userIndex) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
    } else {
      triggerCubeScrollToNextUser();
    }
  }, [currentIndex, flatStories, triggerCubeScrollToNextUser]);

  const goToPrev = useCallback(() => {
    const curr = flatStories[currentIndex];
    const prevItem = flatStories[currentIndex - 1];
    if (prevItem && prevItem.userIndex === curr?.userIndex) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
    } else {
      triggerCubeScrollToPrevUser();
    }
  }, [currentIndex, flatStories, triggerCubeScrollToPrevUser]);

  const handlePress = useCallback(
    (evt) => {
      const { locationX } = evt.nativeEvent;
      if (locationX < width / 2) {
        goToPrev();
      } else {
        goToNext();
      }
    },
    [goToPrev, goToNext],
  );

  const handleEmojiPress = useCallback(
    async (emoji, index, pressEvent) => {
      const reactionType = EMOJI_MAPPING[emoji];

      if (!reactionType || !currentItem?._id) return;
      const storyId = currentItem._id;
      if (reactionPostingRef.current.has(storyId)) return;
      if (selectedEmoji === emoji) return;

      try {
        reactionPostingRef.current.add(storyId);

        const prevSelected = selectedEmoji;
        setSelectedEmoji(emoji);

        setReactionCounts((prev) => {
          const next = { ...prev };

          if (prevSelected && next[prevSelected]) {
            next[prevSelected] = {
              ...next[prevSelected],
              count: Math.max(0, (next[prevSelected]?.count || 0) - 1),
            };
          }

          next[emoji] = {
            ...next[emoji],
            count: (next[emoji]?.count || 0) + 1,
          };

          const countsSnapshot = {};
          Object.keys(EMOJI_MAPPING).forEach((e) => {
            countsSnapshot[e] = next[e]?.count || 0;
          });
          reactionCacheRef.current.set(storyId, {
            selectedEmoji: emoji,
            counts: countsSnapshot,
          });

          return next;
        });

        const url1 = `stories/${currentItem._id}/reactions`;
        await post(url1, { reaction: reactionType });

        DeviceEventEmitter.emit("STORY_REACTED", {
          storyId: currentItem._id,
          reaction: reactionType,
          emoji: emoji,
          userId: userData?._id,
        });

        Animated.sequence([
          Animated.timing(reactionCounts[emoji].scaleAnim, {
            toValue: 1.3,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(reactionCounts[emoji].scaleAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();

        const url = EMOJI_URLS[emoji];
        const node = emojiRefs.current?.[index];
        if (url) {
          const FLY_SIZE = 80;
          const endX = width / 2 - FLY_SIZE / 2;
          const endY = height / 2 - FLY_SIZE / 2;

          const runFly = (startX, startY) => {
            setFlyingEmoji({ url, size: FLY_SIZE, key: Date.now().toString() });
            flyX.setValue(startX);
            flyY.setValue(startY);
            flyScale.setValue(0.85);
            flyOpacity.setValue(1);

            Animated.parallel([
              Animated.timing(flyX, {
                toValue: endX,
                duration: 1000,
                useNativeDriver: true,
              }),
              Animated.timing(flyY, {
                toValue: endY,
                duration: 1000,
                useNativeDriver: true,
              }),
              Animated.sequence([
                Animated.timing(flyScale, {
                  toValue: 1.25,
                  duration: 800,
                  useNativeDriver: true,
                }),
                Animated.timing(flyScale, {
                  toValue: 1,
                  duration: 800,
                  useNativeDriver: true,
                }),
              ]),
              Animated.sequence([
                Animated.delay(500),
                Animated.timing(flyOpacity, {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: true,
                }),
              ]),
            ]).start(() => {
              setFlyingEmoji(null);
            });
          };

          if (node?.measureInWindow) {
            node.measureInWindow((x, y, w, h) => {
              runFly(x + w / 2 - FLY_SIZE / 2, y + h / 2 - FLY_SIZE / 2);
            });
          } else {
            const pageX = pressEvent?.nativeEvent?.pageX;
            const pageY = pressEvent?.nativeEvent?.pageY;
            if (typeof pageX === "number" && typeof pageY === "number") {
              runFly(pageX - FLY_SIZE / 2, pageY - FLY_SIZE / 2);
            }
          }
        }
      } catch (error) {
        console.log("Error posting reaction:", error);
      } finally {
        if (currentItem?._id) {
          reactionPostingRef.current.delete(currentItem._id);
        }
      }
    },
    [currentItem, reactionCounts, selectedEmoji],
  );

  const renderProgressBars = useCallback(() => {
    if (!currentItem) return null;
    const { storyIndex, totalStories } = currentItem;

    return (
      <View style={styles.progressBarContainer}>
        {Array.from({ length: totalStories || 1 }).map((_, idx) => {
          return (
            <View key={idx} style={styles.progressBarBackground}>
              {idx === storyIndex ? (
                <Animated.View
                  style={[
                    styles.progressBarForeground,
                    {
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0%", "100%"],
                      }),
                    },
                  ]}
                />
              ) : (
                <View
                  style={[
                    styles.progressBarForeground,
                    { width: idx < storyIndex ? "100%" : "0%" },
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  }, [currentItem, progressAnim]);

  const renderStoryItem = useCallback(
    ({ item, isCurrentBlock = true }) => {
      const isCurrentItem =
        flatStories[currentIndex] === item && isCurrentBlock;
      const liveStreamPayload = getLiveStreamObject(item);
      const liveStreamId = getLiveStreamDbId(item, liveStreamPayload);
      const liveAuthor = getLiveAuthor(item, liveStreamPayload);
      const liveProfile = liveAuthor?.profile || {};
      const liveDisplayName =
        liveProfile?.displayName ||
        liveAuthor?.displayName ||
        [liveAuthor?.firstName, liveAuthor?.lastName]
          .filter(Boolean)
          .join(" ") ||
        liveAuthor?.firstName ||
        liveAuthor?.name ||
        liveStreamPayload?.title ||
        "Live Stream";
      const liveUsernameRaw =
        liveAuthor?.username || liveStreamPayload?.username || "live";
      const liveUsername = String(liveUsernameRaw).startsWith("@")
        ? String(liveUsernameRaw)
        : `@${liveUsernameRaw}`;
      const liveAvatar =
        liveProfile?.avatar ||
        liveProfile?.friendImage ||
        liveProfile?.cover ||
        liveProfile?.matchingImages?.[0] ||
        liveAuthor?.avatar ||
        liveAuthor?.profileImage ||
        "";
      const liveProfileColor = liveProfile?.profileColor || COLORS.red1;
      const liveMeetingId = getLiveStreamMeetingId(
        liveStreamPayload,
        liveStreamId,
      );
      const isLiveStreamEnded =
        liveStreamPayload?.status === "ended" ||
        liveStreamPayload?.isLive === false ||
        Boolean(liveStreamPayload?.endedAt);
      const normalizedLivePayload =
        liveStreamPayload && typeof liveStreamPayload === "object"
          ? {
              ...liveStreamPayload,
              _id: liveStreamPayload?._id || liveStreamId,
              liveStreamId,
              meetingId: liveStreamPayload?.meetingId || liveMeetingId,
              author: liveStreamPayload?.author || liveAuthor,
              user: liveStreamPayload?.user || liveAuthor,
              userId: liveStreamPayload?.userId || liveAuthor,
            }
          : { _id: liveStreamId, liveStreamId, meetingId: liveMeetingId };

      return (
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.storyItemContainer,
            {
              width: width,
              height: height,
            },
          ]}
          onPress={handlePress}
          onLongPress={() => setIsPaused(true)}
          onPressOut={() => setIsPaused(false)}
          delayLongPress={200}
        >
          {liveStreamId ? (
            <View style={styles.liveStoryCard}>
              <View style={[styles.viewPostContainer, styles.topBorder]}>
                <View
                  style={[
                    styles.liveAvatarRing,
                    { borderColor: liveProfileColor },
                  ]}
                >
                  {liveAvatar ? (
                    <ImageFast
                      source={{ uri: liveAvatar }}
                      style={styles.avatar1}
                    />
                  ) : (
                    <View
                      style={[
                        styles.avatar1,
                        { backgroundColor: liveProfileColor },
                      ]}
                    />
                  )}
                </View>
                <View style={styles.userInfo1}>
                  <View style={styles.nameRow1}>
                    <CustomText
                      label={liveDisplayName}
                      color={COLORS.black}
                      fontSize={12}
                      numberOfLines={1}
                      width={150}
                    />
                    {(liveAuthor?.role == "individual" ||
                      liveProfile?.isVerified ||
                      liveProfile?.isPro) && (
                      <ImageFast
                        source={Images.verified}
                        style={styles.verifiedIcon}
                      />
                    )}
                    {liveAuthor?.role == "company" && (
                      <ImageFast
                        source={Images.grayStar}
                        style={styles.verifiedIcon}
                      />
                    )}
                  </View>
                  <CustomText
                    label={liveUsername}
                    color={COLORS.authText}
                    fontSize={10}
                    numberOfLines={1}
                  />
                </View>
              </View>

              <View style={styles.livePreviewContainer}>
                {item?.media?.type == "video" ? (
                  <Video
                    source={{ uri: item.media.url }}
                    style={styles.storyImage}
                    paused={true}
                    repeat={false}
                    playInBackground={false}
                    playWhenInactive={false}
                  />
                ) : (
                  <ImageFast
                    source={{ uri: item?.media?.url || liveAvatar }}
                    style={styles.storyImage}
                  />
                )}
                <View style={styles.livePreviewOverlay}>
                  <View style={styles.liveBadge}>
                    <View style={styles.liveDot} />
                    <CustomText
                      label={"LIVE"}
                      color={COLORS.white}
                      fontSize={10}
                      fontFamily={fonts.bold}
                    />
                  </View>
                  <CustomText
                    label={liveStreamPayload?.title || "Live Stream"}
                    color={COLORS.white}
                    fontSize={18}
                    fontFamily={fonts.bold}
                    numberOfLines={2}
                    textStyle={styles.liveTitleText}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.viewPostContainer, styles.bottomBorder]}
                activeOpacity={0.7}
                onPress={(event) => {
                  event?.stopPropagation?.();
                  if (isLiveStreamEnded) {
                    ToastMessage("Live stream ended", "error");
                    return;
                  }
                  try {
                    navigation.navigate("ViewStream", {
                      liveStreamId: String(liveStreamId),
                      meetingId: liveMeetingId ? String(liveMeetingId) : "",
                      userName: userData?.username || "Viewer",
                      item: JSON.stringify(normalizedLivePayload),
                    });
                  } catch (e) {
                    ToastMessage("Live stream preview unavailable", "info");
                  }
                }}
              >
                <CustomText
                  label={"View Live Stream"}
                  color={COLORS.black}
                  fontSize={12}
                  fontFamily={fonts.medium}
                />
                <Image
                  source={Images.forwardIcon}
                  style={{ height: 20, width: 20, tintColor: COLORS.black }}
                />
              </TouchableOpacity>
              <CustomText
                label={liveUsername}
                fontSize={12}
                fontFamily={fonts.medium}
                marginTop={10}
              />
            </View>
          ) : item?.postId?._id ? (
            <View
              style={{
                justifyContent: "center",
                height: 350,
                width: "80%",
                borderRadius: 12,
              }}
            >
              <View style={[styles.viewPostContainer, styles.topBorder]}>
                <View
                  style={{
                    padding: 3,
                    borderColor:
                      item?.postId?.userId?.profile?.profileColor ||
                      COLORS.buttonColor,
                    borderWidth: 2,
                    borderRadius: 99,
                  }}
                >
                  {item?.postId?.userId?.profile?.avatar ? (
                    <ImageFast
                      source={{ uri: item?.postId?.userId?.profile?.avatar }}
                      style={styles.avatar1}
                    />
                  ) : (
                    <View
                      style={[
                        styles.avatar1,
                        {
                          backgroundColor:
                            item?.postId?.userId?.profile?.profileColor ||
                            COLORS.cardColor,
                        },
                      ]}
                    />
                  )}
                </View>
                <View style={styles.userInfo1}>
                  <View style={styles.nameRow1}>
                    <CustomText
                      label={item?.postId?.userId?.firstName}
                      color={COLORS.black}
                      fontSize={12}
                    />
                    {item?.postId?.userId?.role == "individual" && (
                      <ImageFast
                        source={Images.verified}
                        style={styles.verifiedIcon}
                      />
                    )}
                    {item?.postId?.userId?.role == "company" && (
                      <ImageFast
                        source={Images.grayStar}
                        style={styles.verifiedIcon}
                      />
                    )}
                  </View>
                  <CustomText
                    label={`@${item?.postId?.userId?.username}`}
                    color={COLORS.authText}
                    fontSize={10}
                  />
                </View>
              </View>

              {item?.media?.type == "video" ? (
                <Video
                  ref={isCurrentItem ? videoRef : null}
                  source={{ uri: item.media.url }}
                  style={styles.storyImage}
                  paused={true}
                  repeat={false}
                  playInBackground={false}
                  playWhenInactive={false}
                />
              ) : (
                <ImageFast
                  source={{ uri: item?.media?.url }}
                  style={styles.storyImage}
                />
              )}
              <TouchableOpacity
                style={[styles.viewPostContainer, styles.bottomBorder]}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("DetailPage", {
                    postId: item?.postId?._id,
                    item: item?.postId,
                  });
                }}
              >
                <CustomText
                  label={"View Post"}
                  color={COLORS.black}
                  fontSize={12}
                  fontFamily={fonts.medium}
                />
                <Image
                  source={Images.forwardIcon}
                  style={{ height: 20, width: 20, tintColor: COLORS.black }}
                />
              </TouchableOpacity>
              <CustomText
                label={`@${item?.postId?.userId?.username}`}
                fontSize={12}
                fontFamily={fonts.medium}
                marginTop={10}
              />
            </View>
          ) : item?.media?.type === "video" ? (
            <Video
              ref={isCurrentItem ? videoRef : null}
              source={{ uri: item.media.url }}
              style={styles.storyImage}
              paused={isPaused || !isCurrentItem || !isFocused}
              repeat={false}
              playInBackground={false}
              playWhenInactive={false}
              onReadyForDisplay={() => {
                if (isCurrentItem) {
                  setVideoReady(true);
                }
              }}
            />
          ) : (
            <ImageFast
              source={{ uri: item?.media?.url }}
              style={styles.storyImage}
            />
          )}
        </TouchableOpacity>
      );
    },
    [
      currentIndex,
      flatStories,
      handlePress,
      isFocused,
      isPaused,
      navigation,
      userData?.username,
    ],
  );

  const CubePage = useCallback(
    ({ index }) => {
      const animatedStyle = useAnimatedStyle(() => {
        const progress = currentUIndex.value - translateX.value / width;
        const relative = index - progress;

        const rotateY = interpolate(
          relative,
          [-1, 0, 1],
          [-90, 0, 90],
          Extrapolate.CLAMP,
        );

        const translate = relative * width;
        const pivot = relative > 0 ? -width / 2 : width / 2;

        return {
          transform: [
            { perspective: PERSPECTIVE },
            { translateX: translate },
            { translateX: pivot },
            { rotateY: `${rotateY}deg` },
            { translateX: -pivot },
          ],
        };
      });

      let itemToRender = null;
      let isCurrentBlock = flatStories[currentIndex]?.userIndex === index;

      if (isCurrentBlock) {
        itemToRender = flatStories[currentIndex];
      } else {
        itemToRender = flatStories.find((s) => s.userIndex === index);
      }

      if (!itemToRender) return null;

      return (
        <AnimatedReanimated.View
          style={[
            { ...StyleSheet.absoluteFillObject, width: width },
            animatedStyle,
          ]}
        >
          {renderStoryItem({ item: itemToRender, isCurrentBlock })}
        </AnimatedReanimated.View>
      );
    },
    [currentIndex, flatStories, currentUIndex, translateX, renderStoryItem],
  );

  if (!currentItem) return null;

  const { userInfo } = currentItem;

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar barStyle="light-content" />

      <AnimatedReanimated.View style={mainAnimatedStyle}>
        <GestureDetector gesture={gesture}>
          <View style={{ flex: 1, overflow: "hidden" }}>
            {userStories?.map((user, index) => (
              <CubePage key={`cube-${index}`} index={index} />
            ))}
          </View>
        </GestureDetector>

        {flyingEmoji && (
          <Animated.View
            pointerEvents="none"
            key={flyingEmoji.key}
            style={[
              styles.flyingEmoji,
              {
                width: flyingEmoji.size,
                height: flyingEmoji.size,
                opacity: flyOpacity,
                transform: [
                  { translateX: flyX },
                  { translateY: flyY },
                  { scale: flyScale },
                ],
              },
            ]}
          >
            <LottieView
              source={{ uri: flyingEmoji.url }}
              autoPlay
              loop
              style={{ width: "100%", height: "100%" }}
            />
          </Animated.View>
        )}

        {!isMyStoryParam && (
          <View style={[styles.overlayContainer, { bottom: insets.bottom }]}>
            <View style={styles.emojiStripContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.emojiStripContent}
              >
                {EMOJI_DATA.map((emojiObj, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.emojiButtonContainer,
                      { width: selectedEmoji === emojiObj.char ? 70 : 48 },
                    ]}
                    activeOpacity={0.7}
                    disabled={selectedEmoji === emojiObj.char}
                    ref={(r) => {
                      emojiRefs.current[idx] = r;
                    }}
                    onPress={(e) => handleEmojiPress(emojiObj.char, idx, e)}
                  >
                    <View
                      style={[
                        styles.emojiButton,
                        {
                          width: selectedEmoji === emojiObj.char ? 60 : 40,
                        },
                        selectedEmoji === emojiObj.char && {
                          backgroundColor: COLORS.white,
                        },
                      ]}
                    >
                      {selectedEmoji !== emojiObj.char && (
                        <Blur blurAmount={10} style={StyleSheet.absoluteFill} />
                      )}
                      <View style={styles.emojiContent}>
                        <LottieView
                          source={{ uri: emojiObj.url }}
                          autoPlay
                          loop
                          style={{ width: 28, height: 28 }}
                        />
                        {selectedEmoji === emojiObj.char && (
                          <Animated.View
                            style={[
                              styles.countContainer,
                              {
                                transform: [
                                  {
                                    scale:
                                      reactionCounts[emojiObj.char]
                                        ?.scaleAnim || 1,
                                  },
                                ],
                              },
                            ]}
                          >
                            <CustomText
                              label={
                                reactionCounts[
                                  emojiObj.char
                                ]?.count?.toString() || "0"
                              }
                              fontFamily={fonts.medium}
                              color={COLORS.black}
                            />
                          </Animated.View>
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {renderProgressBars()}
          </View>
        )}

        {isMyStoryParam && (
          <View style={[styles.overlayContainer, { bottom: insets.bottom }]}>
            {renderProgressBars()}
          </View>
        )}

        <View style={[styles.overlayContainer, { top: insets.top }]}>
          <View style={styles.headerRow}>
            <View style={styles.leftHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleGoBack}
              >
                <Blur />
                <Image source={Images.back} style={styles.backIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.userInfo}
                activeOpacity={0.8}
                onPress={() => {
                  try {
                    navigation.navigate("UserProfile", {
                      userId: currentItem?.userInfo?.user?.[0]?._id,
                    });
                  } catch (e) {
                    navigation.navigate("TabStack", { screen: "Profile" });
                  }
                }}
              >
                <View style={styles.avatarContainer}>
                  {userInfo?.user?.[0]?.profile?.avatar ? (
                    <ImageFast
                      source={{ uri: userInfo.user[0].profile.avatar }}
                      style={styles.avatar}
                    />
                  ) : (
                    <View
                      style={[
                        styles.avatar,
                        {
                          backgroundColor:
                            userInfo?.user?.[0]?.profile?.profileColor ||
                            COLORS.buttonColor,
                        },
                      ]}
                    />
                  )}
                </View>
                <View style={styles.userTexts}>
                  <View style={styles.nameRow}>
                    <CustomText
                      label={
                        `${userInfo?.user?.[0]?.firstName || ""} ${
                          userInfo?.user?.[0]?.lastName || ""
                        }`.trim() ||
                        userInfo?.username ||
                        "User"
                      }
                      color={COLORS.white}
                      fontFamily={fonts.semiBold}
                      fontSize={14}
                    />
                    <Image
                      source={Images.verified}
                      style={styles.verifiedIcon}
                    />
                  </View>
                  <CustomText
                    label={`@${
                      userInfo?.username?.toLowerCase() || "username"
                    }`}
                    color={COLORS.gray48 || COLORS.gray1}
                    fontSize={12}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.rightHeader}>
              {!isMyStoryParam && (
                <CustomButton
                  title={isFollowingUser ? "Following" : "Follow"}
                  width={isFollowingUser ? 88 : 72}
                  height={32}
                  borderRadius={8}
                  fontSize={14}
                  backgroundColor={"rgba(255, 255, 255, 0.2)"}
                  color={COLORS.white}
                  bgBlur
                  onPress={handleFollowPress}
                />
              )}
            </View>
          </View>
        </View>
      </AnimatedReanimated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  storyItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  storyImage: {
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  progressBarContainer: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 12,
  },
  progressBarBackground: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 99,
    overflow: "hidden",
  },
  progressBarForeground: {
    height: "100%",
    backgroundColor: COLORS.white,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  userTexts: {
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  verifiedIcon: {
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  moreButton: {
    height: 32,
    width: 32,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  moreIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    tintColor: COLORS.white,
  },
  backIcon: {
    height: 24,
    width: 24,
  },
  emojiStripContainer: {
    marginBottom: 20,
  },
  emojiStripContent: {
    paddingHorizontal: 4,
    gap: 12,
  },
  emojiButton: {
    width: 40,
    height: 40,
    borderRadius: 99,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  emojiButtonContainer: {
    width: 48,
    height: 48,
    borderRadius: 99,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.16)",
  },
  emojiContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  countContainer: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  flyingEmoji: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  viewPostContainer: {
    height: 40,
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  topBorder: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bottomBorder: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: "space-between",
  },
  liveStoryCard: {
    justifyContent: "center",
    height: 350,
    width: "80%",
    borderRadius: 12,
  },
  liveAvatarRing: {
    padding: 3,
    borderWidth: 2,
    borderRadius: 99,
  },
  livePreviewContainer: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: COLORS.black,
  },
  livePreviewOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "rgba(0, 0, 0, 0.22)",
  },
  liveBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.red1,
  },
  liveDot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
  liveTitleText: {
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  avatar1: {
    height: 22,
    width: 22,
    borderRadius: 99,
  },
  userInfo1: {
    marginLeft: 8,
  },
  nameRow1: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedIcon: {
    height: 14,
    width: 14,
    marginLeft: 4,
  },
});

export default StoryViewer;

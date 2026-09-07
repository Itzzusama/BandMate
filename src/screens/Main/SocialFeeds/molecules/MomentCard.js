import { useNavigation } from "@react-navigation/native";
import { getPalette } from "@somesoap/react-native-image-palette";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  DeviceEventEmitter,
  Dimensions,
  Easing,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Svg, { Circle } from "react-native-svg";
import { useSelector } from "react-redux";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { selectStoryUploadStatus } from "../../../../store/reducer/appSlice";
import { COLORS } from "../../../../utils/COLORS";
import StoryViewer from "./StoryViewer";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const staticStyles = StyleSheet.create({
  storyBorder: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  heroContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    overflow: "hidden",
  },
  gestureRoot: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

// ─────────────────────────────────────────────
// Story Border Component
// ─────────────────────────────────────────────
const StoryBorder = ({
  segments = 1,
  size = 72,
  color = COLORS.buttonColor || COLORS.btnColor,
  segmentColors = [],
}) => {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const gapAngle = segments === 1 ? 0 : 10;
  const totalGapAngle = gapAngle * segments;
  const segmentAngle = (360 - totalGapAngle) / segments;
  const segmentLength = (segmentAngle / 360) * circumference;

  return (
    <Svg width={size} height={size} style={staticStyles.storyBorder}>
      {Array.from({ length: segments }).map((_, index) => {
        const rotateAngle = -86 + index * (360 / segments);
        return (
          <Circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={segmentColors[index] || color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${segmentLength} ${
              circumference - segmentLength
            }`}
            strokeLinecap="round"
            rotation={rotateAngle}
            origin={`${size / 2}, ${size / 2}`}
          />
        );
      })}
    </Svg>
  );
};

// ─────────────────────────────────────────────
// Animated Plus Border Component
// ─────────────────────────────────────────────
const AnimatedPlusBorder = ({ size = 72 }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    rotateAnim.setValue(0);
    const anim = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[staticStyles.storyBorder, { transform: [{ rotate: rotation }] }]}
    >
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={COLORS.buttonColor || COLORS.btnColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeLinecap="round"
        />
      </Svg>
    </Animated.View>
  );
};

const getRandomColor = (id) => {
  const fallbackColors = [
    "#FFB3BA",
    "#FFD1BA",
    "#FFD8A8",
    "#FDFD97",
    "#E5FFB3",
    "#AAF0D1",
    "#9EE09E",
    "#A7C7E7",
    "#9EC1CF",
    "#E3E4FA",
    "#CC99C9",
    "#B1907F",
  ];
  if (!id) return fallbackColors[0];
  const index =
    String(id)
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    fallbackColors.length;
  return fallbackColors[index];
};

// ─────────────────────────────────────────────
// MomentItem
// ─────────────────────────────────────────────
const MomentItem = ({
  item,
  index,
  navigation,
  handleStoryPress,
  openStoryViewer,
  myStories,
}) => {
  const touchableRef = useRef(null);
  const [dynamicColor, setDynamicColor] = useState("#FFFFFF0A");
  const { userData } = useSelector((state) => state.users);
  const storyUploadStatus = useSelector(selectStoryUploadStatus);
  const currentUserId = userData?._id;

  const user = index === 0 ? userData : item?.user?.[0] || item?.user || item;
  const profilePic = user?.profile?.avatar || user?.profilePicture;
  const userId = user?._id || user?.userId;

  useEffect(() => {
    if (profilePic) {
      getPalette(profilePic)
        .then((palette) => {
          setDynamicColor(
            palette?.vibrant || palette?.dominant || getRandomColor(userId),
          );
        })
        .catch(() => setDynamicColor(getRandomColor(userId)));
    } else {
      setDynamicColor(getRandomColor(userId));
    }
  }, [profilePic, userId]);

  const measureAndOpen = useCallback(
    (params) => {
      let executed = false;
      const timeout = setTimeout(() => {
        if (!executed) {
          executed = true;
          openStoryViewer(params, null);
        }
      }, 50);

      if (touchableRef.current?.measure) {
        touchableRef.current.measure((x, y, width, height, pageX, pageY) => {
          if (!executed) {
            executed = true;
            clearTimeout(timeout);
            if (
              pageX !== undefined &&
              pageY !== undefined &&
              width > 0 &&
              height > 0
            ) {
              openStoryViewer(params, { x: pageX, y: pageY, width, height });
            } else {
              openStoryViewer(params, null);
            }
          }
        });
      } else {
        if (!executed) {
          executed = true;
          clearTimeout(timeout);
          openStoryViewer(params, null);
        }
      }
    },
    [openStoryViewer],
  );

  const storiesCount =
    index === 0 ? myStories?.stories?.length || 0 : item?.stories?.length || 0;

  const handleMyStoryPress = () => {
    if (storiesCount > 0) {
      measureAndOpen({
        userStories: [
          {
            ...myStories,
            username: "My Story",
            userImage: {
              uri: userData?.profile?.avatar || userData?.profilePicture,
            },
            user: [userData],
          },
        ],
        initialUserIndex: 0,
        isMyStory: true,
      });
    } else {
      navigation.navigate("CameraScreen");
    }
  };

  const allSegmentColors = useMemo(() => {
    const currentStories = index === 0 ? myStories?.stories : item?.stories;
    if (!currentStories || currentStories.length === 0) return [];
    return currentStories.map((story) =>
      story?.views?.includes(currentUserId) ? COLORS.white4 : dynamicColor,
    );
  }, [index, myStories, item, currentUserId, dynamicColor]);

  return (
    <TouchableOpacity
      ref={touchableRef}
      activeOpacity={0.6}
      onPress={() => {
        if (index === 0) {
          handleMyStoryPress();
        } else {
          handleStoryPress(item, index, touchableRef);
        }
      }}
      onLongPress={() => {
        if (index === 0) {
          navigation.navigate("CameraScreen");
        }
      }}
      style={styles.cardWrapper}
    >
      <View style={styles.storyContainer}>
        {index === 0 && storyUploadStatus === "uploading" ? (
          <AnimatedPlusBorder size={72} />
        ) : storiesCount > 0 ? (
          <StoryBorder
            segments={storiesCount}
            size={72}
            color={dynamicColor}
            segmentColors={allSegmentColors}
          />
        ) : (
          index === 0 && (
            <View style={styles.card}>
              <Icons
                name={"plus"}
                family={"Feather"}
                color={COLORS.white}
                size={30}
              />
            </View>
          )
        )}

        {index !== 0 || storiesCount > 0 ? (
          <View
            style={[
              styles.imageContainer,
              {
                backgroundColor: COLORS.black,
                borderColor: COLORS.black,
              },
            ]}
          >
            {profilePic ? (
              <ImageFast
                source={{ uri: profilePic }}
                style={styles.cardImage}
                resizeMode={"cover"}
              />
            ) : (
              <View
                style={[
                  styles.cardImage,
                  { backgroundColor: getRandomColor(userId) },
                ]}
              />
            )}
          </View>
        ) : null}

        {index === 0 &&
          (storyUploadStatus === "uploading" ||
            storyUploadStatus === "success" ||
            storiesCount > 0) && (
            <View
              pointerEvents="none"
              style={[
                styles.card,
                {
                  position: "absolute",
                  borderWidth: 0,
                  backgroundColor: "transparent",
                  zIndex: 10,
                },
              ]}
            >
              <View style={styles.overlay} />
              <Icons
                name={"plus"}
                family={"Feather"}
                color={COLORS.white}
                size={30}
              />
            </View>
          )}
      </View>
    </TouchableOpacity>
  );
};

// ─────────────────────────────────────────────
// StoryViewerModal — custom hero-expand modal
// ─────────────────────────────────────────────
const ANIM_DURATION_OPEN = 250;
const ANIM_DURATION_CLOSE = 160;

const StoryViewerModal = ({ visible, params, originRect, onClose }) => {
  const scaleX = useRef(new Animated.Value(1)).current;
  const scaleY = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const [modalMounted, setModalMounted] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const getStartTransform = useCallback(() => {
    if (!originRect || !originRect.width || !originRect.height) {
      return { tx: 0, ty: 0, sx: 0.9, sy: 0.9 };
    }
    const cardCenterX = originRect.x + originRect.width / 2;
    const cardCenterY = originRect.y + originRect.height / 2;
    const screenCenterX = SCREEN_WIDTH / 2;
    const screenCenterY = SCREEN_HEIGHT / 2;
    return {
      tx: cardCenterX - screenCenterX,
      ty: cardCenterY - screenCenterY,
      sx: Math.max(0.1, originRect.width / SCREEN_WIDTH),
      sy: Math.max(0.1, originRect.height / SCREEN_HEIGHT),
    };
  }, [originRect]);

  const animateOpen = useCallback(() => {
    const { tx, ty, sx, sy } = getStartTransform();

    scaleX.setValue(sx);
    scaleY.setValue(sy);
    translateX.setValue(tx);
    translateY.setValue(ty);
    backdropOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(scaleX, {
        toValue: 1,
        duration: ANIM_DURATION_OPEN,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleY, {
        toValue: 1,
        duration: ANIM_DURATION_OPEN,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: ANIM_DURATION_OPEN,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: ANIM_DURATION_OPEN,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(40),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: ANIM_DURATION_OPEN - 40,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [
    getStartTransform,
    scaleX,
    scaleY,
    translateX,
    translateY,
    backdropOpacity,
  ]);

  const animateClose = useCallback(
    (callback) => {
      const { tx, ty, sx, sy } = getStartTransform();

      Animated.parallel([
        Animated.timing(scaleX, {
          toValue: sx,
          duration: ANIM_DURATION_CLOSE,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: sy,
          duration: ANIM_DURATION_CLOSE,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: tx,
          duration: ANIM_DURATION_CLOSE,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: ty,
          duration: ANIM_DURATION_CLOSE,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: ANIM_DURATION_CLOSE,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(callback);
    },
    [
      getStartTransform,
      scaleX,
      scaleY,
      translateX,
      translateY,
      backdropOpacity,
    ],
  );

  useEffect(() => {
    if (visible) {
      setModalMounted(true);
      requestAnimationFrame(() => {
        setContentVisible(true);
        animateOpen();
      });
    } else if (modalMounted) {
      animateClose(() => {
        setContentVisible(false);
        setModalMounted(false);
      });
    }
  }, [visible]);

  const handleClose = useCallback(() => {
    animateClose(() => {
      setContentVisible(false);
      setModalMounted(false);
      onClose();
    });
  }, [animateClose, onClose]);

  if (!modalMounted) return null;

  return (
    <Modal
      visible={modalMounted}
      transparent
      statusBarTranslucent
      hardwareAccelerated
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "black", opacity: backdropOpacity },
        ]}
      />

      <Animated.View
        style={[
          staticStyles.heroContainer,
          {
            transform: [{ translateX }, { translateY }, { scaleX }, { scaleY }],
          },
        ]}
        renderToHardwareTextureAndroid
        shouldRasterizeIOS
      >
        {contentVisible && (
          <GestureHandlerRootView style={staticStyles.gestureRoot}>
            <StoryViewer
              userStories={params.userStories}
              initialUserIndex={params.initialUserIndex}
              isMyStory={params.isMyStory}
              onClose={handleClose}
            />
          </GestureHandlerRootView>
        )}
      </Animated.View>
    </Modal>
  );
};

// ─────────────────────────────────────────────
// MomentCard
// ─────────────────────────────────────────────
const MomentCard = ({ storiesData, myStoriesData }) => {
  const navigation = useNavigation();
  const [localStoriesData, setLocalStoriesData] = useState(storiesData || []);
  const [localMyStoriesData, setLocalMyStoriesData] = useState(
    myStoriesData || [],
  );
  const { userData } = useSelector((state) => state.users);
  const currentUserId = userData?._id;

  const [storyViewerVisible, setStoryViewerVisible] = useState(false);
  const [storyViewerParams, setStoryViewerParams] = useState({
    userStories: [],
    initialUserIndex: 0,
    isMyStory: false,
  });
  const [originRect, setOriginRect] = useState(null);

  useEffect(() => {
    setLocalStoriesData(storiesData || []);
  }, [storiesData]);

  useEffect(() => {
    setLocalMyStoriesData(myStoriesData || []);
  }, [myStoriesData]);

  useEffect(() => {
    const viewSub = DeviceEventEmitter.addListener(
      "STORY_VIEWED",
      ({ storyId }) => {
        const updateStories = (list) =>
          (list || []).map((user) => ({
            ...user,
            stories: (user.stories || []).map((s) => {
              if (s._id === storyId && !s.views?.includes(currentUserId)) {
                return { ...s, views: [...(s.views || []), currentUserId] };
              }
              return s;
            }),
          }));
        setLocalStoriesData((prev) => updateStories(prev));
        setLocalMyStoriesData((prev) => updateStories(prev));
      },
    );

    const reactSub = DeviceEventEmitter.addListener(
      "STORY_REACTED",
      ({ storyId, reaction, userId }) => {
        const updateReactions = (list) =>
          (list || []).map((user) => ({
            ...user,
            stories: (user.stories || []).map((s) => {
              if (s._id === storyId) {
                const nextStats = { ...s.stats };
                nextStats.reactions = {
                  ...nextStats.reactions,
                  [reaction]: (nextStats.reactions?.[reaction] || 0) + 1,
                };

                const nextPeopleReact = [...(s.peopleReact || [])];
                const existingIdx = nextPeopleReact.findIndex(
                  (r) => r.userId === userId,
                );
                if (existingIdx !== -1) {
                  const oldReaction = nextPeopleReact[existingIdx].reaction;
                  if (nextStats.reactions[oldReaction] > 0) {
                    nextStats.reactions[oldReaction] -= 1;
                  }
                  nextPeopleReact[existingIdx] = {
                    ...nextPeopleReact[existingIdx],
                    reaction,
                  };
                } else {
                  nextPeopleReact.push({ userId, reaction });
                }

                return { ...s, stats: nextStats, peopleReact: nextPeopleReact };
              }
              return s;
            }),
          }));
        setLocalStoriesData((prev) => updateReactions(prev));
        setLocalMyStoriesData((prev) => updateReactions(prev));
      },
    );

    return () => {
      viewSub.remove();
      reactSub.remove();
    };
  }, [currentUserId]);

  const openStoryViewer = useCallback((params, rect) => {
    setStoryViewerParams(params);
    setOriginRect(rect || null);
    setStoryViewerVisible(true);
  }, []);

  const closeStoryViewer = useCallback(() => {
    setStoryViewerVisible(false);
  }, []);

  const normalizedMyStories = useMemo(() => {
    if (!localMyStoriesData) return null;
    if (Array.isArray(localMyStoriesData)) {
      if (localMyStoriesData[0]?.stories) {
        return localMyStoriesData[0];
      }
      if (
        localMyStoriesData.length > 0 &&
        (localMyStoriesData[0]?.media || localMyStoriesData[0]?._id)
      ) {
        return {
          _id: "my-stories",
          user: [userData],
          stories: localMyStoriesData,
        };
      }
    }
    if (localMyStoriesData?.stories) {
      return localMyStoriesData;
    }
    return localMyStoriesData?.[0] || null;
  }, [localMyStoriesData, userData]);

  const data = useMemo(() => {
    const apiStories = (localStoriesData || []).map((item) => ({
      ...item,
      type: "story",
      username:
        item.user?.[0]?.username ||
        item.user?.username ||
        item.username ||
        "User",
      userImage: {
        uri:
          item.user?.[0]?.profile?.avatar ||
          item.user?.[0]?.profilePicture ||
          item.user?.profilePicture,
      },
    }));
    return [{ type: "add" }, ...apiStories];
  }, [localStoriesData]);

  const handleStoryPress = useCallback(
    (item, index, touchableRef) => {
      if (item.type === "story" && item.stories && item.stories.length > 0) {
        const validStories = data.filter(
          (d) => d.type === "story" && d.stories && d.stories.length > 0,
        );
        let initialIndex = validStories.findIndex(
          (s) =>
            (s._id && item._id && s._id === item._id) ||
            (s.userId && item.userId && s.userId === item.userId) ||
            (s.user?.[0]?._id &&
              item.user?.[0]?._id &&
              s.user[0]._id === item.user[0]._id),
        );
        if (initialIndex === -1) {
          initialIndex = validStories.indexOf(item);
        }
        if (initialIndex === -1) {
          initialIndex = 0;
        }

        const params = {
          userStories: validStories,
          initialUserIndex: initialIndex,
          isMyStory: false,
        };

        if (touchableRef?.current?.measure) {
          let executed = false;
          const timeout = setTimeout(() => {
            if (!executed) {
              executed = true;
              openStoryViewer(params, null);
            }
          }, 50);

          touchableRef.current.measure((x, y, width, height, pageX, pageY) => {
            if (!executed) {
              executed = true;
              clearTimeout(timeout);
              if (
                pageX !== undefined &&
                pageY !== undefined &&
                width > 0 &&
                height > 0
              ) {
                openStoryViewer(params, { x: pageX, y: pageY, width, height });
              } else {
                openStoryViewer(params, null);
              }
            }
          });
        } else {
          openStoryViewer(params, null);
        }
      }
    },
    [data, openStoryViewer],
  );

  const handlePlayAll = () => {
    const validStories = data.filter(
      (d) => d.type === "story" && d.stories && d.stories.length > 0,
    );
    if (validStories.length > 0) {
      openStoryViewer(
        {
          userStories: validStories,
          initialUserIndex: 0,
          isMyStory: false,
        },
        null,
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.row, styles.spaceBetween]}>
        <View style={styles.row}>
          <CustomText
            label={"MOMENTS"}
            color={COLORS.white3}
            fontFamily={fonts.medium}
            fontSize={14}
            lineHeight={14 * 1.4}
          />
          <CustomText
            label={(storiesData?.length || 0).toString()}
            color={COLORS.white}
            fontFamily={fonts.medium}
            fontSize={14}
            marginLeft={4}
          />
        </View>
        <TouchableOpacity
          style={styles.row}
          onPress={handlePlayAll}
          activeOpacity={0.8}
        >
          <Icons
            name={"controller-play"}
            family={"Entypo"}
            color={"#FFFFFF29"}
            size={16}
          />
          <CustomText
            label={"PLAY ALL"}
            color={COLORS.white}
            fontFamily={fonts.medium}
            fontSize={14}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(_, i) => `moment-${i}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <MomentItem
            item={item}
            index={index}
            navigation={navigation}
            handleStoryPress={handleStoryPress}
            openStoryViewer={openStoryViewer}
            myStories={normalizedMyStories}
          />
        )}
      />

      <StoryViewerModal
        visible={storyViewerVisible}
        params={storyViewerParams}
        originRect={originRect}
        onClose={closeStoryViewer}
      />
    </View>
  );
};

export default React.memo(MomentCard);

const styles = StyleSheet.create({
  mainContainer: {
    padding: 12,
    paddingBottom: 0.1,
    backgroundColor: COLORS.black,
    marginBottom: 10,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 4 },
  spaceBetween: { justifyContent: "space-between" },
  listContent: { gap: 10, marginTop: 16 },
  cardWrapper: {
    position: "relative",
  },
  card: {
    padding: 12,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: "#FFFFFF0A",
    backgroundColor: "transparent",
    height: 72,
    width: 72,
    alignItems: "center",
    justifyContent: "center",
  },
  storyContainer: {
    height: 72,
    width: 72,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  storyBorder: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  imageContainer: {
    height: 64,
    width: 64,
    borderRadius: 99,
    overflow: "hidden",
    borderWidth: 3,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(44, 44, 44, 0.4)",
    borderRadius: 99,
  },
  heroContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    overflow: "hidden",
  },
  gestureRoot: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

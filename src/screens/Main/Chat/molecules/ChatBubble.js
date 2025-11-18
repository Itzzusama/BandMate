import moment from "moment";
import { StyleSheet, View, Animated, TouchableOpacity } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useState, useRef, useEffect } from "react";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";
import { PNGIcons } from "../../../../assets/images/icons";
import { formatDate } from "../../../../utils/constants";
import SoundPlayer from "react-native-sound-player";
import Video from "react-native-video";
import VideoPlayer from "react-native-video-player";
import SimpleVideoPlayer from "./SimpleVideoPlayer";
const ChatBubble = ({ isSender, item, onReply, onReact }) => {
  const message = item;
  const bg = isSender ? "#FFFFFF0A" : "#FFFFFF1F";
  const messageTime = moment(item.createdAt).format("h:mm A");

  const translateX = useRef(new Animated.Value(0)).current;
  const [showReply, setShowReply] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showCurrentTime, setShowCurrentTime] = useState(false);
  const intervalRef = useRef(null);

  const [waveAnimValues] = useState(
    Array(13)
      .fill(0)
      .map(() => new Animated.Value(2))
  );

  // pick best source for media (URL from backend OR localUri)
  const voiceSource =
    item?.attachment?.url || item?.attachment?.localUri || null;
  const imageSource =
    item?.attachment?.url || item?.attachment?.localUri || null;
  const videoSource =
    item?.attachment?.url || item?.attachment?.localUri || null;

  useEffect(() => {
    const finishedSub = SoundPlayer.addEventListener(
      "FinishedPlaying",
      ({ success }) => {
        if (success) {
          setIsPlaying(false);
          clearInterval(intervalRef.current);
          setShowCurrentTime(false);
          setCurrentTime(0);

          waveAnimValues.forEach((val) => {
            Animated.timing(val, {
              toValue: 2,
              duration: 200,
              useNativeDriver: false,
            }).start();
          });
        }
      }
    );

    return () => {
      finishedSub.remove();
      clearInterval(intervalRef.current);
      SoundPlayer.stop();
    };
  }, []);

  const togglePlay = async () => {
    if (!voiceSource) return;

    if (isPlaying) {
      SoundPlayer.stop();
      setIsPlaying(false);
      clearInterval(intervalRef.current);
      setShowCurrentTime(false);
      setCurrentTime(0);
    } else {
      try {
        SoundPlayer.stop();
        await SoundPlayer.playUrl(voiceSource);

        setIsPlaying(true);
        setShowCurrentTime(true);

        const info = await SoundPlayer.getInfo();
        setDuration(info.duration || item.duration || 0);

        intervalRef.current = setInterval(async () => {
          try {
            const info = await SoundPlayer.getInfo();
            setCurrentTime(info.currentTime);

            if (info.currentTime >= info.duration) {
              setIsPlaying(false);
              clearInterval(intervalRef.current);
              setShowCurrentTime(false);
              setCurrentTime(0);
            }
          } catch (e) {}
        }, 500);
      } catch (err) {
        console.log("Cannot play the file", err);
      }
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        waveAnimValues.forEach((val) => {
          Animated.timing(val, {
            toValue: Math.random() * 15 + 2,
            duration: 200,
            useNativeDriver: false,
          }).start();
        });
      }, 200);
    } else {
      waveAnimValues.forEach((val) => {
        Animated.timing(val, {
          toValue: 2,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePanGesture = (event) => {
    const { translationX } = event.nativeEvent;
    if (translationX > 50 && !showReply) {
      setShowReply(true);
      onReply && onReply(item);
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else if (translationX < -50 && showReply) {
      setShowReply(false);
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      translateX.setValue(translationX);
    }
  };

  const handlePanStateChange = (event) => {
    if (
      event.nativeState === State.END ||
      event.nativeState === State.CANCELLED
    ) {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const timeLabel = showCurrentTime
    ? `${formatTime(currentTime)} / ${formatTime(duration)}`
    : formatTime(duration || item.duration || item.attachment?.duration);

  // sending state helpers
  const isPending = item?.isPending;
  const isFailed = item?.sendFailed;

  const renderReplyPreview = () => {
    if (!item.replyTo) return null;
    const reply = item.replyTo;

    return (
      <View style={styles.replyWrapper}>
        <CustomText
          label={
            reply.type === "text"
              ? reply.content
              : reply?.attachment?.filename ||
                (reply.type === "voice" ? "Voice message" : "Media message")
          }
          fontSize={12}
          color={COLORS.white}
          numberOfLines={1}
        />
      </View>
    );
  };

  return (
    <PanGestureHandler
      onGestureEvent={handlePanGesture}
      onHandlerStateChange={handlePanStateChange}
    >
      <Animated.View
        style={[
          styles.mainContainer,
          isSender ? styles.sender : styles.receiver,
          { transform: [{ translateX }] },
        ]}
      >
        {/* CONTENT */}

        {item.type === "voice" ? (
          <View style={[styles.voiceWrapper, { backgroundColor: bg }]}>
            <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
              <Icons
                name={isPlaying ? "pause" : "play-arrow"}
                family="MaterialIcons"
                size={24}
                color={COLORS.white}
              />
            </TouchableOpacity>

            <View style={styles.waveformAndDuration}>
              <View style={styles.waveformContainer}>
                {waveAnimValues.map((val, idx) => (
                  <Animated.View
                    key={idx}
                    style={[styles.waveBar, { height: val }]}
                  />
                ))}
              </View>
              <CustomText
                label={timeLabel}
                fontSize={12}
                color={COLORS.white2}
                marginTop={5}
                marginBottom={5}
                fontFamily={fonts.medium}
              />
            </View>

            {renderReplyPreview()}
          </View>
        ) : item.type === "image" && imageSource ? (
          <View style={styles.mediaWrapper}>
            {renderReplyPreview()}
            <ImageFast
              source={{ uri: imageSource }}
              style={styles.imageStyle}
              resizeMode="cover"
            />
          </View>
        ) : item.type === "file" &&
          item?.attachment?.mimetype === "video/mp4" &&
          videoSource ? (
          <View style={styles.mediaWrapper}>
            {renderReplyPreview()}
            <SimpleVideoPlayer videoSource={videoSource} />
          </View>
        ) : (
          <View style={[styles.messageContainer, { backgroundColor: bg }]}>
            {renderReplyPreview()}
            <CustomText
              label={item?.content}
              lineHeight={14 * 1.4}
              fontFamily={fonts.medium}
              color={COLORS.white}
            />
          </View>
        )}

        {/* ACTIONS FOR RECEIVER */}
        {!isSender && (
          <View style={styles.row}>
            {[
              {
                name: "like",
                image:
                  message?.metadata?.reactionCount > 0
                    ? PNGIcons.heartFill
                    : Images.ChatLike,
              },
              { name: "Reply", image: Images.Reply },
              { name: "Copy", image: Images.CopytoClipBorad },
              { name: "", image: Images.RequestWhite },
              { name: "", image: Images.ChatInfo },
            ].map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.iconContainer,
                  {
                    paddingVertical: index === 4 ? 6 : 8,
                    paddingHorizontal: index === 4 ? 6 : 12,
                  },
                ]}
                activeOpacity={0.6}
                onPress={() => {
                  if (action?.name === "like") onReact && onReact(message);
                  else if (action?.name === "Reply") {
                    setShowReply(true);
                    onReply && onReply(message);
                  }
                }}
              >
                <ImageFast
                  source={action.image}
                  style={index === 4 ? styles.icon2 : styles.icon}
                />
                {action?.name?.length > 0 && (
                  <CustomText
                    label={action?.name}
                    fontSize={12}
                    fontFamily={fonts.regular}
                    color={COLORS.white}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* STATUS ROW FOR SENDER */}
        {isSender && (
          <View style={styles.row}>
            {isPending && !isFailed ? (
              <Icons
                name="clock"
                family="Feather"
                size={12}
                color={COLORS.subtitle}
              />
            ) : isFailed ? (
              <Icons
                name="alert-circle"
                family="Feather"
                size={12}
                color="red"
              />
            ) : (
              <Icons name={"checkmark-done-sharp"} color={"#A19375"} />
            )}

            <CustomText
              fontSize={12}
              lineHeight={14 * 1.4}
              alignSelf={"flex-end"}
              color={"rgba(255, 255, 255, 0.48)"}
              label={messageTime + " - " + formatDate(item?.createdAt)}
            />
            <View style={styles.line} />
            <Icons
              size={12}
              name={"lock-outline"}
              family="MaterialIcons"
              color={COLORS.subtitle}
            />
          </View>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  mainContainer: { marginBottom: 10, alignItems: "flex-end" },
  messageContainer: {
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
    maxWidth: "80%",
  },
  sender: { alignItems: "flex-end", alignSelf: "flex-end" },
  receiver: { alignItems: "flex-start", alignSelf: "flex-start" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    marginTop: 7,
  },
  line: {
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    width: 1,
    height: 12,
  },
  icon: { height: 12, width: 12 },
  icon2: { height: 16, width: 16 },
  iconContainer: {
    backgroundColor: "#FFFFFF0A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 100,
  },
  voiceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 12,
    maxWidth: "60%",
  },
  playButton: { paddingRight: 6, marginBottom: 7 },
  waveformAndDuration: { flex: 0.5 },
  waveformContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 25,
    width: "100%",
  },
  waveBar: {
    width: 2,
    height: 2,
    backgroundColor: COLORS.white2,
    borderRadius: 1,
    marginHorizontal: 1,
  },
  mediaWrapper: {
    width: 280,
    height: 240,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    marginVertical: 5,
    borderWidth: 2,
    borderColor: COLORS.btnColor,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  videoStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: "#000",
  },
  replyWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.btnColor,
    marginBottom: 4,
    borderRadius: 4,
  },
});

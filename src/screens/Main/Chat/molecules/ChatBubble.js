import moment from "moment";
import { StyleSheet, View, Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useState, useRef } from "react";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const ChatBubble = ({ isSender, item, onReply }) => {
  const bg = isSender ? "#FFFFFF0A" : "#FFFFFF1F";
  const messageTime = moment(item.createdAt).format("h:mm A");
  const translateX = useRef(new Animated.Value(0)).current;
  const [showReply, setShowReply] = useState(false);

  const Actions = [
    { name: "like", image: Images.ChatLike },
    { name: "Reply", image: Images.Reply },
    { name: "Copy", image: Images.CopytoClipBorad },
    { name: "", image: Images.RequestWhite },
    { name: "", image: Images.ChatInfo },
  ];

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
    if (event.nativeEvent.oldState === State.ACTIVE) {
      // When gesture ends, spring back to original position
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
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
        <View
          style={[
            styles.messageContainer,
            {
              backgroundColor: bg,
            },
          ]}
        >
          <CustomText
            label={item?.content}
            lineHeight={14 * 1.4}
            fontFamily={fonts.medium}
            color={COLORS.white}
          />
        </View>

        {!isSender && (
          <View style={styles.row}>
            {Actions.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.iconContainer,
                  {
                    paddingVertical: index == 4 ? 6 : 8,
                    paddingHorizontal: index == 4 ? 6 : 12,
                  },
                ]}
              >
                <ImageFast
                  source={item.image}
                  style={index == 4 ? styles.icon2 : styles.icon}
                />
                {item?.name?.length > 0 && (
                  <CustomText
                    label={item?.name}
                    fontSize={12}
                    fontFamily={fonts.regular}
                    color={COLORS.white}
                  />
                )}
              </View>
            ))}
          </View>
        )}

        {isSender && (
          <View style={styles.row}>
            <Icons name={"checkmark-done-sharp"} color={"#A19375"} />
            <CustomText
              fontSize={12}
              lineHeight={14 * 1.4}
              alignSelf={"flex-end"}
              color={"rgba(255, 255, 255, 0.48)"}
              label={"04:45 pm - Mar 12, 2025"}
            />
            <View style={styles.line} />
            <Icons
              size={12}
              name={"lock-outline"}
              color={COLORS.subtitle}
              family={"MaterialIcons"}
            />
          </View>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 10,
    alignItems: "flex-end",
  },
  messageContainer: {
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
    maxWidth: "80%",
  },
  sender: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  receiver: {
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },
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
  icon: {
    height: 12,
    width: 12,
  },
  icon2: {
    height: 16,
    width: 16,
  },
  iconContainer: {
    backgroundColor: "#FFFFFF0A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 100,
  },
});

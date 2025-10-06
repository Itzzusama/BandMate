/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { useSocket } from "../../../components/SocketProvider";
import { get } from "../../../services/ApiRequest";
import ChatFooter from "./molecules/ChatFooter";
import ChatHeader from "./molecules/ChatHeader";
import ChatBubble from "./molecules/ChatBubble";
import { formatDate, formatRelativeDate } from "../../../utils/constants";
import { Images } from "../../../assets/images";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import ListHeader from "./molecules/ListHeader";

const InboxScreen = ({ route }) => {
  const { socket } = useSocket();
  const flatListRef = useRef(null);
  const { userData } = useSelector((state) => state.users);
  const userId = userData?._id;

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const recipientId = route?.params?.recipientId;
  const recipientName = route?.params?.recipientName || "Chat";

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await get(`conversations/${recipientId}/messages`);

      if (res?.data?.success) {
        setMessages(res?.data.messages);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("new:message", (data) => {
      flatListRef?.current?.scrollToEnd({ animated: true });
      if (data?.message) {
        setMessages((prev = []) => [data?.message, ...prev]);
      }
    });

    socket.on("message:error", (err) => {
      console.log("Send failed:", err);
    });

    return () => {
      socket.off("new:message");
      socket.off("send:message");
      socket.off("message:error");
    };
  }, [socket, recipientId, fetchMessages]);

  const sendMsg = () => {
    if (!inputText.trim() || !socket) return;

    const tempId = `temp_${Date.now()}`;
    const tempMessage = {
      clientId: tempId,
      content: inputText,
      senderId: { _id: userId },
      timestamp: new Date().toISOString(),
      isPending: true,
    };

    setInputText("");

    setMessages((prev = []) => [tempMessage, ...prev]);

    // const payload = {
    //   participant_id: recipientId,
    //   content: tempMessage.content,
    // };

    // socket.emit("send:message", payload);
  };

  const isUserMessage = (msg) => {
    const senderId = msg?.senderId?._id;
    return senderId === userId;
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={10}
      headerUnScrollable={() => (
        <ChatHeader source={Images.user} title={recipientName || "Chat"} />
      )}
      footerUnScrollable={() => (
        <ChatFooter
          setInputText={setInputText}
          sendMessage={sendMsg}
          inputText={inputText}
        />
      )}
    >
      <ListHeader />
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size={45} color={COLORS.white} />
        </View>
      ) : (
        <FlatList
          inverted
          ref={flatListRef}
          data={messages}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item, i) => item._id || i.toString()}
          renderItem={({ item, index }) => {
            const previousItem = messages[index + 1];
            const showDate =
              !previousItem ||
              formatDate(item.timestamp) !==
                formatDate(previousItem?.timestamp);
            return (
              <>
                <ChatBubble item={item} isSender={true} />
                {showDate && (
                  <View style={styles.timeBox}>
                    <CustomText
                      fontSize={12}
                      lineHeight={12 * 1.4}
                      // label={formatRelativeDate(item?.timestamp)}
                      label={"Tuesday June 11, 2025"}
                    />
                  </View>
                )}
              </>
            );
          }}
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    paddingBottom: 10,
  },
  timeBox: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 100,
    marginBottom: 10,
    alignSelf: "center",
    paddingHorizontal: 8,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InboxScreen;

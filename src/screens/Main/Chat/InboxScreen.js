/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Images } from "../../../assets/images";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useSocket } from "../../../components/SocketProvider";
// import { get } from "../../../services/ApiRequest"; // API commented out for static data
import { COLORS } from "../../../utils/COLORS";
import { formatDate } from "../../../utils/constants";
import ChatBubble from "./molecules/ChatBubble";
import ChatFooter from "./molecules/ChatFooter";
import ChatHeader from "./molecules/ChatHeader";
import ListHeader from "./molecules/ListHeader";

const InboxScreen = ({ route }) => {
  const { socket } = useSocket();
  const flatListRef = useRef(null);
  const { userData } = useSelector((state) => state.users);
  const userId = userData?._id;

  const [loading, setLoading] = useState(false);
  const [replyMessage, setReplyMessage] = useState(null);
  const [messages, setMessages] = useState([
    {
      _id: "m5",
      content: "Sounds good. See you there!",
      senderId: { _id: "me" },
      isSender: true,
      timestamp: "2025-06-11T16:52:00.000Z",
    },
    {
      _id: "m4",
      content:
        "The Romans, who adopted many Greek beliefs, associated owls with Minerva",
      senderId: { _id: "42" },
      isSender: false,
      timestamp: "2025-06-11T16:50:00.000Z",
    },
    {
      _id: "m3",
      content: "Are you free tonight?",
      senderId: { _id: "42" },
      isSender: false,
      timestamp: "2025-06-11T16:45:00.000Z",
    },
    {
      _id: "m2",
      content: "Yep, I’m around.",
      senderId: { _id: "me" },
      isSender: true,
      timestamp: "2025-06-11T16:40:00.000Z",
    },
    {
      _id: "m1",
      content: "Hey Marcus!",
      senderId: { _id: "42" },
      isSender: false,
      timestamp: "2025-06-11T16:35:00.000Z",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const recipientId = route?.params?.recipientId;
  const recipientName = route?.params?.recipientName || "Chat";

  // const fetchMessages = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await get(`conversations/${recipientId}/messages`);
  //
  //     if (res?.data?.success) {
  //       setMessages(res?.data.messages);
  //     } else {
  //       setMessages([]);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching messages:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
  }, [socket, recipientId]);

  const handleReply = (message) => {
    setReplyMessage(message);
  };

  const clearReply = () => {
    setReplyMessage(null);
  };

  const sendMsg = () => {
    if (!inputText.trim() || !socket) return;

    const tempId = `temp_${Date.now()}`;
    const tempMessage = {
      clientId: tempId,
      content: inputText,
      senderId: { _id: userId },
      timestamp: new Date().toISOString(),
      isPending: true,
      isSender: true,
      replyTo: replyMessage?._id,
    };

    setInputText("");
    setReplyMessage(null);

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

  // useEffect(() => {
  //   // Fetch messages from API (disabled - using static seed data)
  //   fetchMessages();
  // }, []);

  return (
    <ScreenWrapper
      scrollEnabled
      statusBarColor="rgba(38, 38, 38, 0.64)"
      paddingHorizontal={12}
      headerUnScrollable={() => (
        <ChatHeader source={Images.user} title={"Catie, 24" || "Chat"} />
      )}
      footerUnScrollable={() => (
        <ChatFooter
          setInputText={setInputText}
          sendMessage={sendMsg}
          inputText={inputText}
          replyMessage={replyMessage}
          onClearReply={clearReply}
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
                <ChatBubble
                  item={item}
                  isSender={item?.isSender ?? isUserMessage(item)}
                  onReply={handleReply}
                />
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
    backgroundColor: COLORS.primaryColor,
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

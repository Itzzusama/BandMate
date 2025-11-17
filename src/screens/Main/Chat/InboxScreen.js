import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Images } from "../../../assets/images";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useSocket } from "../../../components/SocketProvider";
import { COLORS } from "../../../utils/COLORS";
import { formatDate } from "../../../utils/constants";
import ChatBubble from "./molecules/ChatBubble";
import ChatFooter from "./molecules/ChatFooter";
import ChatHeader from "./molecules/ChatHeader";
import ListHeader from "./molecules/ListHeader";
import { get } from "../../../services/ApiRequest";

const InboxScreen = ({ route }) => {
  const { socket } = useSocket();
  const flatListRef = useRef(null);
  const { userData } = useSelector((state) => state.users);

  const userId = userData?._id;

  const [loading, setLoading] = useState(false);
  const [replyMessage, setReplyMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const recipientId = route?.params?.recipientId;
  const conversationId = route?.params?.conversationId;
  const recipientName = route?.params?.recipientName || "Chat";

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await get(`conversations/${conversationId}/messages`);

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
  }, [socket, recipientId]);

  const handleReply = (message) => {
    console.log(message);
    setReplyMessage(message);
  };

  const clearReply = () => {
    setReplyMessage(null);
  };

  const sendMsg = ({ type = "text", attachment, content, duration }) => {
    console.log(type);
    if (!socket) return;
    if (type == "text" && !inputText.trim()) return;

    const tempId = `temp_${Date.now()}`;
    const tempMessage = {
      clientId: tempId,
      content: inputText,
      senderId: { _id: userId },
      createdAt: new Date().toISOString(),
      isPending: true,
      isSender: true,
      replyTo: replyMessage?.id,
      type: type,
      attachment: attachment,
      duration: duration,
    };

    setInputText("");
    setReplyMessage(null);

    setMessages((prev = []) => [tempMessage, ...prev]);

    const payload = {
      participant_id: recipientId,
      content: tempMessage.content,
      type: type, //"text", "image", "voice", "file"
      attachment: attachment ? attachment : null,
      duration: duration ? duration : null,
      dimensions: type == "image" ? { height: 240, width: 280 } : null,
      conversationType: "private", //"private", "group", "matching"
      ...(replyMessage?.id ? { replyTo: replyMessage?.id } : {}),
    };
    console.log(payload);
    socket.emit(
      replyMessage?.id ? "reply:message" : "send:message",
      payload,
      (res) => {
        console.log(res);
        if (res.success) {
          console.log("sent");
          setMessages((prev) => {
            return [...prev, res.message];
          });
        } else {
          console.log("---", res?.message);
        }
      }
    );
  };
  const onReact = (message) => {
    if (!message?.id) return;

    const payload = {
      messageId: message.id,
      emoji: ":heart:",
    };

    setMessages((prev) => {
      const existing = [...prev];
      const index = existing.findIndex((m) => m.id === message.id);
      if (index === -1) return prev;

      const target = existing[index];
      const currentCount = target?.metadata?.reactionCount || 0;
      const newCount = currentCount + 1;

      existing[index] = {
        ...target,
        metadata: {
          ...(target.metadata || {}),
          reactionCount: newCount,
        },
      };

      return [...existing];
    });

    socket.emit("react:message", payload, (res) => {
      if (res.success) {
        const updatedCount = res?.reactionCount ?? 0;
        setMessages((prev) => {
          const existing = [...prev];
          const index = existing.findIndex((m) => m.id === message.id);
          if (index === -1) return prev;

          const target = existing[index];
          existing[index] = {
            ...target,
            metadata: {
              ...(target.metadata || {}),
              reactionCount: updatedCount,
            },
          };
          return [...existing];
        });
      } else {
        console.log("Reaction failed:", res?.message);
      }
    });
  };

  const isUserMessage = (msg) => {
    const senderId = msg?.senderId?._id;
    return senderId === userId;
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  console.log(messages);
  return (
    <ScreenWrapper
      scrollEnabled
      statusBarColor="rgba(38, 38, 38, 0.64)"
      paddingHorizontal={12}
      headerUnScrollable={() => (
        <ChatHeader source={Images.user} title={recipientName || "Chat"} />
      )}
      footerUnScrollable={() => (
        <ChatFooter
          setInputText={setInputText}
          sendMessage={sendMsg}
          inputText={inputText}
          replyMessage={replyMessage}
          onClearReply={clearReply}
          name={recipientName}
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
              formatDate(item?.createdAt) !==
                formatDate(previousItem?.createdAt);
            return (
              <>
                <ChatBubble
                  item={item}
                  isSender={item?.isSender ?? isUserMessage(item)}
                  onReply={handleReply}
                  onReact={onReact}
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

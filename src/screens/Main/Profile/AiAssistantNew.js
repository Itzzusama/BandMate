import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import Footer from "../Chat/molecules/Footer";
import { post } from "../../../services/ApiRequest";
import ChatHeader from "../Chat/molecules/ChatHeader";
import { Images } from "../../../assets/images";
import ChatFooter from "../Chat/molecules/ChatFooter";
import { PNGIcons } from "../../../assets/images/icons";

const SuggestionCard = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.suggestionCard}
    >
      <Image source={PNGIcons.stars} style={{ width: 17, height: 18 }} />
      <CustomText
        label={title}
        fontSize={16}
        lineHeight={16 * 1.4}
        marginTop={5}
        color={COLORS.subtitle}
      />
    </TouchableOpacity>
  );
};

const AiAssistantNew = ({ route }) => {
  const flatListRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [pad, setPad] = useState(false);

  // useEffect(() => {
  //   const saved = [
  //     {
  //       _id: "welcome-1",
  //       role: "assistant",
  //       content: "Hi! I'm your AI assistant. How can I help today?",
  //     },
  //   ];
  //   setMessages(saved);
  // }, []);

  const sendMessage = async () => {
    const text = inputText.trim();
    if (!text) return;
    const userMsg = {
      _id: String(Date.now()),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [userMsg, ...prev]);
    setInputText("");
    try {
      const res = await post("ai/chat", { message: text });
      const reply = res?.data?.reply || "Sorry, I could not process that.";
      const aiMsg = {
        _id: String(Date.now() + 1),
        role: "assistant",
        content: reply,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [aiMsg, ...prev]);
    } catch (e) {
      const aiMsg = {
        _id: String(Date.now() + 2),
        role: "assistant",
        content: "Something went wrong. Please try again.",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [aiMsg, ...prev]);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === "user";
    return (
      <View>
        <CustomText
          label={""}
          color="#818898"
          fontSize={12}
          marginTop={5}
          alignSelf={isUser ? "flex-end" : "flex-start"}
        />
        <View
          style={[
            styles.messageContainer,
            isUser ? styles.userMessage : styles.otherMessage,
          ]}
        >
          <CustomText
            label={item.content}
            color={COLORS.white}
            lineHeight={22}
          />
        </View>
      </View>
    );
  };

  const suggestions = [
    "Lo-fi beats to study while crying",
    "Summarize my last trip expenses",
    "What's my wallet balance today?",
  ];

  return (
    <ScreenWrapper
      paddingHorizontal={10}
      headerUnScrollable={() => (
        <ChatHeader title={"Marcus"} source={Images.user} showIcons={false} />
      )}
      footerUnScrollable={() => <ChatFooter showChatFeatures={false} />}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        inverted
        showsVerticalScrollIndicator={false}
        renderItem={renderMessage}
        keyExtractor={(_, i) => i.toString()}
        style={styles.messageList}
        ListFooterComponent={
          <View style={styles.suggestionsRow}>
            {suggestions.map((s, idx) => (
              <SuggestionCard
                key={idx}
                title={s}
                onPress={() => setInputText(s)}
              />
            ))}
          </View>
        }
      />
    </ScreenWrapper>
  );
};

export default AiAssistantNew;

const styles = StyleSheet.create({
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    maxWidth: "70%",
    padding: 14,
    borderRadius: 15,
    marginTop: 15,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.primaryColor,
    borderTopRightRadius: 0,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primaryColor,
    borderTopLeftRadius: 0,
  },
  suggestionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 0,
  },
  suggestionCard: {
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: COLORS.lightGray,
    marginRight: 10,
    width: 200,
    height: 120,
    paddingVertical: 16,
  },
});

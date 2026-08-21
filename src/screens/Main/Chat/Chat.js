import { useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import ChatSkeleton from "../../../components/ChatSkeleton";
import TopTab from "../../../components/TopTab";
import { COLORS } from "../../../utils/COLORS";
import ConversationBox from "./molecules/ConversationBox";
import { useEffect } from "react";
import { get } from "../../../services/ApiRequest";
import { useSelector } from "react-redux";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import NoDataFound from "../../../components/NoDataFound";

const tabs = ["", "1 on 1", "Groups", "Matches"];
const PindedData = [
  {
    _id: 1,
    otherUser: {
      _id: 2,
      name: "John Doe",
    },

    lastMessage: { type: "text", _id: 3, content: "Hello, how are you?" },
  },
  {
    _id: 2,
    otherUser: {
      _id: 42,
      name: "John Doe",
    },

    lastMessage: {
      type: "text",
      _id: 332,
      content: "What is the price of the car?",
    },
  },
];

const requestData = [
  {
    _id: 1,
    isRequest: true,
    otherUser: {
      _id: 2,
      name: "Viktor Sola",
    },

    lastMessage: { type: "text", _id: 3, content: "Heyy, how are you Julian?" },
  },
  {
    _id: 2,
    isRequest: true,
    otherUser: {
      _id: 42,
      name: "Dani",
    },

    lastMessage: {
      type: "text",
      _id: 332,
      content: "Hey, would you be available for...",
    },
  },
];
const Chat = () => {
  const [tab, setTab] = useState(0);
  const isFocus = useIsFocused();
  const { userData } = useSelector((state) => state.users);
  const userId = userData?._id;
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const getChats = async () => {
    setLoading(true);
    try {
      const res = await get(
        `conversations/${userId}?page=1&limit=20&minimal=false`,
      );
      if (res?.data?.success) {
        setChatData(res?.data?.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    console.log("Chat mounted");
  }, []);

  useEffect(() => {
    console.log("UserId:", userId);
  }, [userId]);
  useEffect(() => {
    if (!userId) return;

    const unsubscribe = navigation.addListener("focus", () => {
      console.log("🔥 Chat screen focused");
      getChats();
    });

    return unsubscribe;
  }, [navigation, userId]);
  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      headerUnScrollable={() => <Header title="Inbox" />}
      scrollEnabled
    >
      <View>
        <TopTab
          rounded
          tab={tab}
          marginTop={5}
          tabNames={tabs}
          images={[Images.Bag]}
          setTab={setTab}
          fontFamily={fonts.medium}
          scrollViewPaddingHorizontal={12}
          activeTintColor={COLORS.primaryColor}
          inactiveTintColor="#A19375"
        />
      </View>

      <Divider thickness={5} marginVertical={9} />

      {/* <View style={styles.headerSection}>
        <View style={styles.row}>
          <View style={styles.row}>
            <ImageFast
              source={Images.PinItem}
              resizeMode={"contain"}
              style={{ height: 16, width: 16 }}
            />
            <CustomText
              fontSize={16}
              label="Pinned"
              fontFamily={fonts.medium}
            />
          </View>
          <CustomText
            fontSize={16}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
            label={requestData.length}
          />
        </View>
        <TouchableOpacity>
          <Icons
            size={22}
            family="Entypo"
            name="chevron-down"
            color={COLORS.subtitle}
          />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={PindedData}
          renderItem={({ item }) => <ConversationBox item={item} />}
        />
      </View>

      <Divider thickness={5} marginVertical={0} />

      <View style={[styles.headerSection, { marginTop: 10 }]}>
        <View style={styles.row}>
          <CustomText
            fontSize={16}
            label="Requests Received"
            fontFamily={fonts.medium}
          />
          <CustomText
            fontSize={16}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
            label={requestData.length}
          />
        </View>
        <TouchableOpacity>
          <Icons
            size={22}
            family="Entypo"
            name="chevron-down"
            color={COLORS.subtitle}
          />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={requestData}
          renderItem={({ item }) => <ConversationBox item={item} />}
        />
      </View>

      <Divider thickness={5} marginVertical={0} /> */}

      <View style={[styles.headerSection, { marginTop: 10 }]}>
        <View style={styles.row}>
          <View style={styles.row}>
            <ImageFast
              source={Images.MyChat}
              resizeMode={"contain"}
              style={{ height: 13, width: 13 }}
            />
            <CustomText
              fontSize={16}
              label="My Chats"
              fontFamily={fonts.medium}
            />
          </View>
          <CustomText
            fontSize={16}
            color={COLORS.subtitle}
            label={chatData.length}
            fontFamily={fonts.medium}
          />
        </View>
        <TouchableOpacity>
          <Icons
            size={22}
            family="Entypo"
            name="chevron-down"
            color={COLORS.subtitle}
          />
        </TouchableOpacity>
      </View>
      {loading && <ChatSkeleton />}
      <View style={{ paddingBottom: 90, flex: 1 }}>
        <FlatList
          data={chatData}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <ConversationBox item={item} isChat={true} />
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Chat;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
    paddingHorizontal: 15,
    paddingBottom: 8,
  },
});

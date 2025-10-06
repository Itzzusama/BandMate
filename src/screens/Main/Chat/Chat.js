import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTab from "../../../components/TopTab";
import { COLORS } from "../../../utils/COLORS";
import ConversationBox from "./molecules/ConversationBox";

const tabs = ["Trips", "Shippings", "Parkings", "Rentals", "Tours"];

const Chat = () => {
  const [tab, setTab] = useState(0);

  const requestData = [
    {
      _id: 1,
      otherUser: {
        _id: 2,
        name: "John Doe",
      },
      lastMessage: {
        _id: 3,
        content: "Hello, how are you?",
      },
    },
    {
      _id: 2,
      otherUser: {
        _id: 42,
        name: "John Doe",
      },
      lastMessage: {
        _id: 332,
        content: "What is the price of the car?",
      },
    },
  ];

  const chatData = [
    {
      _id: 1,
      otherUser: {
        _id: 2,
        name: "John Doe",
      },
      lastMessage: {
        _id: 3,
        content: "Hello, how are you?",
      },
    },
    {
      _id: 2,
      otherUser: {
        _id: 42,
        name: "John Doe",
      },
      lastMessage: {
        _id: 332,
        content: "What is the price of the car?",
      },
    },
    {
      _id: 3,
      otherUser: {
        _id: 42,
        name: "John Doe",
      },
      lastMessage: {
        _id: 332,
        content: "What is the price of the car?",
      },
    },
  ];

  return (
    <ScreenWrapper
    backgroundColor="rgba(246,246,246,0.9)"
      paddingHorizontal={0.1}
      headerUnScrollable={() => <Header title="Inbox" onHelpPress={() => ""} />}
    >
      <View style={{}}>
        <TopTab
          rounded
          tab={tab}
          marginTop={5}
          tabNames={tabs}
          setTab={setTab}
          fontFamily={fonts.medium}
          scrollViewPaddingHorizontal={12}
        />
      </View>
      <Divider thickness={5} marginVertical={9} />
      <View style={styles.headerSection}>
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
      <Divider thickness={5} marginVertical={0} />
      <View style={[styles.headerSection, { marginTop: 10 }]}>
        <View style={styles.row}>
          <CustomText
            fontSize={16}
            label="My Chats"
            fontFamily={fonts.medium}
          />
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
      <View>
        <FlatList
          data={chatData}
          renderItem={({ item }) => <ConversationBox item={item} />}
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
    borderBottomColor: COLORS.lightGray,
    paddingHorizontal: 15,
    paddingBottom: 8,
  },
});

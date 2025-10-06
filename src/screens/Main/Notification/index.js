import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import Header from "../../../components/Header";
import TopTabWithBG from "../../../components/TopTabWithBG";
import CustomText from "../../../components/CustomText";
import CustomButton from "../../../components/CustomButton";
import CustomCheckBox from "../../../components/CustomCheckBox";
import ImageFast from "../../../components/ImageFast";
import Icons from "../../../components/Icons";
import { COLORS } from "../../../utils/COLORS";
import { Images } from "../../../assets/images";
import NotificationCard from "./NotificationCard";
import fonts from "../../../assets/fonts";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTab from "../../../components/TopTab";
import Divider from "../../../components/Divider";

const NOTIFICATIONS = {
  today: [
    {
      id: 1,
      username: "Username",
      desc: "Notification description",
      type: "paid",
      amount: 15,
      time: "1 hour ago",
    },
    {
      id: 2,
      username: "Username",
      desc: "Notification description",
      type: "received",
      amount: 15,
      time: "1 hour ago",
    },
  ],
  yesterday: [
    {
      id: 3,
      username: "Username",
      desc: "Notification description",
      type: "normal",
      amount: 15,
      time: "1 hour ago",
    },
    {
      id: 4,
      username: "Username",
      desc: "Notification description",
      type: "normal",
      amount: 15,
      time: "1 hour ago",
    },
  ],
  more: [
    {
      id: 5,
      username: "Username",
      desc: "Notification description",
      type: "normal",
      amount: 15,
      time: "1 hour ago",
    },
    {
      id: 6,
      username: "Username",
      desc: "Notification description",
      type: "normal",
      amount: 15,
      time: "1 hour ago",
    },
  ],
};

const Notification = ({ navigation }) => {
  const [tab, setTab] = useState(0);
  const [readAll, setReadAll] = useState(true);

  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <View style={styles.headerRow}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Icons
              name="chevron-back"
              family="Ionicons"
              size={22}
              color={COLORS.primaryColor}
              style={styles.backIcon}
              onPress={() => navigation.goBack()}
            />
            <CustomText
              label="Notifications"
              fontFamily={fonts.semiBold}
              fontSize={22}
              style={{ marginLeft: 8 }}
            />
          </View>
          <TouchableOpacity style={styles.readAllBtn}>
            <CustomText
              label="Read All"
              fontSize={14}
              color={COLORS.primaryColor}
              fontFamily={fonts.medium}
              marginRight={4}
            />
            <ImageFast source={Images.msg} style={{ height: 16, width: 16 }} />
          </TouchableOpacity>
        </View>
      )}
    >
      <TopTab
        tab={tab}
        setTab={setTab}
        tabNames={["General", "System", "Promo"]}
        rounded
        scrollViewPaddingHorizontal={12}
      />
      <Divider thickness={5} marginVertical={8} />
      <View style={styles.dateRow}>
        <ImageFast source={Images.calender} style={{ height: 24, width: 24 }} />
        <CustomText
          label="12 July, 2025"
          fontSize={16}
          color={COLORS.primaryColor}
          fontFamily={fonts.medium}
          marginLeft={8}
        />
        <Icons
          name="chevron-right"
          family="Feather"
          size={18}
          color={COLORS.primaryColor}
          style={{ marginLeft: "auto" }}
        />
      </View>
      <View style={styles.allGoodBox}>
        <CustomText
          label="All Good!"
          fontSize={18}
          color={COLORS.white}
          fontFamily={fonts.semiBold}
          style={styles.allGoodTitle}
          marginBottom={6}
        />
        <View style={styles.allGoodContent}>
          <ImageFast source={Images.tick} style={styles.checkIcon} />
          <View style={{ flex: 1 }}>
            <CustomText
              label="You're up to date"
              color={COLORS.gray}
              fontFamily={fonts.medium}
              lineHeight={14 * 1.4}
            />
            <CustomText
              label="Come Back Later For More Updates"
              color={COLORS.primaryColor}
              fontSize={16}
              fontFamily={fonts.medium}
            />
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 12 }}>
        <CustomText
          label="Today"
          fontSize={18}
          marginBottom={12}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
          style={styles.sectionTitle}
        />
        {NOTIFICATIONS.today.map((item) => (
          <NotificationCard key={item.id} {...item} />
        ))}
        <CustomText
          label="Yesterday"
          fontFamily={fonts.medium}
          fontSize={18}
          marginBottom={12}
          lineHeight={18 * 1.4}
          style={styles.sectionTitle}
        />
        {NOTIFICATIONS.yesterday.map((item) => (
          <NotificationCard key={item.id} {...item} />
        ))}
        <CustomText
          label="More Than 3 Days Ago"
          fontFamily={fonts.medium}
          fontSize={18}
          marginBottom={12}
          lineHeight={18 * 1.4}
          style={styles.sectionTitle}
        />
        {NOTIFICATIONS.more.map((item) => (
          <NotificationCard key={item.id} {...item} />
        ))}
        <View style={{ height: 24 }} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 18,
    marginTop: 4,
  },
  backIcon: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 99,
    padding: 8,
    marginRight: 8,
  },
  readAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderRadius: 99,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 8,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    marginBottom: 10,
    paddingVertical: 6,
  },
  allGoodBox: {
    backgroundColor: COLORS.darkPurple,
    marginHorizontal: 0,
    marginBottom: 16,
    padding: 12,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderTopColor: COLORS.lightGray,
    borderBottomColor: COLORS.lightGray,
  },
  allGoodTitle: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  allGoodContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    // marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    gap: 12,
  },
  checkIcon: {
    width: 32,
    height: 32,
    // marginRight: 12,
  },
  sectionTitle: {
    marginLeft: 12,
    marginTop: 16,
    marginBottom: 8,
  },
});

export default Notification;

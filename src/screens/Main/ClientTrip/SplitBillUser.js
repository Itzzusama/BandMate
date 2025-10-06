import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import TopTab from "../../../components/TopTab";
import Icons from "../../../components/Icons";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const tabs = ["Friends", "Contacts"];

const friends = [
  { _id: "101", name: "John", phone: "+4112312345" },
  { _id: "102", name: "Michael", phone: "+4112312346" },
  { _id: "103", name: "Emma", phone: "+4112312347" },
  { _id: "104", name: "Sophia", phone: "+4112312348" },
  { _id: "105", name: "Daniel", phone: "+4112312349" },
];

const SplitBillUser = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState([]);
  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <View style={{ paddingHorizontal: 12 }}>
          <Header
            title="Split The Bill"
            rightIcon={
              <TouchableOpacity style={styles.headerIcon}>
                <Icons
                  size={20}
                  name="search"
                  color={COLORS.subtitle}
                  family="MaterialIcons"
                />
              </TouchableOpacity>
            }
          />
        </View>
      )}
      footerUnScrollable={() => (
        <View
          style={{ padding: 12, marginBottom: Platform.OS == "ios" ? 18 : 12 }}
        >
          <CustomButton
            title="Split The Bill"
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    >
      <View style={styles.row1}>
        <TopTab
          rounded
          tabNames={tabs}
          tab={selectedTab}
          setTab={setSelectedTab}
          fontFamily={fonts.medium}
        />
        <View style={styles.row}>
          <TouchableOpacity style={styles.iconBox}>
            <CustomText label="ID" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox} onPress={() => navigation.navigate("QrScanner") }>
            <Icons name="qr-code-2" family="MaterialIcons" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <Divider thickness={4} marginVertical={9} />
      <View style={[styles.row, { marginBottom: 10, paddingHorizontal: 12 }]}>
        <CustomText
          fontSize={18}
          label="Contacts"
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
        />
        <CustomText
          label="107"
          fontSize={18}
          lineHeight={18 * 1.4}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
        />
      </View>
      <View style={{ paddingHorizontal: 12 }}>
        <FlatList
          data={friends}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.friendCard}
              onPress={() => {
                if (selectedUser?.includes(item._id)) {
                  setSelectedUser(
                    selectedUser?.filter((id) => id !== item._id)
                  );
                } else {
                  setSelectedUser([...selectedUser, item._id]);
                }
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ImageFast
                  source={Images.user}
                  style={styles.avatar}
                  resizeMode="contain"
                />
                <View>
                  <CustomText
                    fontSize={16}
                    lineHeight={16 * 1.4}
                    label={item.name}
                    fontFamily={fonts.medium}
                  />
                  <CustomText
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    color="#1212127A"
                    label={item.phone}
                    fontFamily={fonts.medium}
                  />
                </View>
              </View>
              <Icons
                family="MaterialCommunityIcons"
                name={
                  selectedUser?.includes(item._id)
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={24}
                color={
                  selectedUser?.includes(item._id)
                    ? COLORS.darkPurple
                    : COLORS.gray2
                }
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default SplitBillUser;

const styles = StyleSheet.create({
  headerIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 12,
  },
  friendCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 8,
    height: 56,
    width: "100%",
    marginBottom: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

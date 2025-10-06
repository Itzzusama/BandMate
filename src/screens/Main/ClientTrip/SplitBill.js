import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTab from "../../../components/TopTab";
import { COLORS } from "../../../utils/COLORS";

const tabs = ["Friends", "Contacts"];

const friends = [
  { _id: "101", name: "John" },
  { _id: "102", name: "Michael" },
  { _id: "103", name: "Emma" },
  { _id: "104", name: "Sophia" },
  { _id: "105", name: "Daniel" },
  { _id: "106", name: "Daniel" },
];

const SplitBill = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
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
          <TouchableOpacity style={styles.iconBox}>
            <Icons name="qr-code-2" family="MaterialIcons" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <Divider thickness={4} marginVertical={9} />
      <View style={styles.row}>
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
      <FlatList
        data={friends}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={styles.friendCard}>
            <ImageFast
              source={Images.user}
              style={styles.avatar}
              resizeMode="contain"
            />
            <CustomText
              fontSize={12}
              label="Viktor"
              fontFamily={fonts.medium}
            />
          </View>
        )}
      />
    </ScreenWrapper>
  );
};

export default SplitBill;

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
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  friendCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 12,
    height: 80,
    width: "32%",
    marginBottom: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});

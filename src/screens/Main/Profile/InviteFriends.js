import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const InviteFriends = () => {
  const [email, setEmail] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);

  const toggleFriendSelection = (friendId) => {
    setSelectedFriends((prevSelected) => {
      if (prevSelected.includes(friendId)) {
        return prevSelected.filter((id) => id !== friendId);
      } else {
        return [...prevSelected, friendId];
      }
    });
  };

  const friends = [
    {
      id: 1,
      name: "Abraham Bilguire",
      email: "abcd@gmail.com",
    },
    {
      id: 2,
      name: "Abraham Bilguire",
      email: "abcd@gmail.com",
    },
  ];

  const renderFriendItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => toggleFriendSelection(item.id)}
      style={styles.card}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ImageFast
          source={Images.placeholderUser}
          style={styles.img}
          resizeMode="contain"
        />
        <View style={{ marginLeft: 12 }}>
          <CustomText
            label={item.name}
            fontSize={16}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
            marginBottom={2}
          />
          <CustomText
            label={item.email}
            lineHeight={14 * 1.4}
            fontFamily={fonts.regular}
            color={COLORS.gray}
          />
        </View>
      </View>

      <Icons
        family="MaterialCommunityIcons"
        name={
          selectedFriends.includes(item.id)
            ? "radiobox-marked"
            : "radiobox-blank"
        }
        size={24}
        color={
          selectedFriends.includes(item.id) ? COLORS.darkPurple : COLORS.gray2
        }
      />
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header title="My Friends" textColor={COLORS.black} />
      )}
      footerUnScrollable={() => (
        <View style={{ paddingHorizontal: 12, marginBottom: 34 }}>
          <CustomButton
            title="Confirm"
            // onPress={}
          />
          <CustomButton
            title="Cancel"
            backgroundColor={COLORS.inputBg}
            marginTop={16}
            color={COLORS.black}
            // onPress={}
          />
        </View>
      )}
    >
      <CustomText
        label="Invite Friends"
        fontSize={24}
        lineHeight={24 * 1.4}
        fontFamily={fonts.bold}
        marginTop={16}
      />
      <CustomText
        label="You don’t have any messages yet."
        fontSize={14}
        lineHeight={14 * 1.4}
        fontFamily={fonts.medium}
        color={COLORS.gray}
        marginBottom={15}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <CustomInput
          placeholder="Enter an Email Address"
          value={email}
          setValue={setEmail}
          borderRadius={12}
          width="79%"
          height={48}
          marginBottom={0.1}
        />
        <CustomButton
          title="Send"
          width="18.5%"
          borderRadius={16}
          height={48}
          backgroundColor={COLORS.low}
          color={COLORS.blue}
          // onPress={}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          borderBottomColor: "#1212120A",
          borderBottomWidth: 1,
          paddingBottom: 20,
          marginBottom: 20,
        }}
      >
        <Icons family="EvilIcons" name="exclamation" size={20} />
        <CustomText
          label="An email will be sent to the recipient to join the organization on move."
          fontSize={14}
          fontFamily={fonts.medium}
          color={COLORS.gray}
        />
      </View>

      <CustomText
        label="All My Friends"
        fontSize={20}
        lineHeight={20 * 1.4}
        marginBottom={15}
        fontFamily={fonts.bold}
      />

      <FlatList
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFriendItem}
        // contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
};

export default InviteFriends;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: COLORS.inputBg,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  img: {
    width: 40,
    height: 40,
  },
});

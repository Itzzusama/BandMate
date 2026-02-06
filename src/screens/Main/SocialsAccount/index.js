import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomInput from "../../../components/CustomInput";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { SocialsIcons } from "../../../assets/images/socialsIcons";
import { COLORS } from "../../../utils/COLORS";
import Icons from "../../../components/Icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const accounts = [
  {
    img: SocialsIcons.spotify,
    name: "Spotify",
    des: "Artist Name",
    key: "Spotify",
  },
  {
    img: SocialsIcons.soundCloud,
    name: "SoundCloud",
    des: "Artist Name",
    key: "SoundCloud",
  },
  {
    img: SocialsIcons.insta,
    name: "Instagram",
    des: "Profile",
    key: "Instagram",
  },
  {
    img: SocialsIcons.tiktok,
    name: "TikTok",
    des: "Profile",
    key: "TikTok",
  },
  {
    img: SocialsIcons.youtube,
    name: "YouTube",
    des: "Channel",
    key: "YouTube",
  },
];
const SocialsAccount = () => {
  const navigation = useNavigation();

  const user = useSelector((state) => state.users.userData);
  const socialLinks = user?.profile?.socialLinks || {};
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Header
          title={"Add Your Socials"}
          fontFamily={fonts.abril}
          fontSize={24}
        />
      )}
    >
      <CustomInput
        height={44}
        search
        placeholder={"Spotify, SoundCloud, Instagram..."}
        marginTop={20}
      />
      <CustomText
        label={"All Platforms"}
        fontFamily={fonts.medium}
        fontSize={18}
        marginTop={14}
        marginBottom={10}
      />
      <FlatList
        data={accounts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          const isConnected =
            socialLinks[item.key] && socialLinks[item.key].trim() !== "";

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.container,
                styles.row,
                { borderBottomWidth: index === accounts.length - 1 ? 0 : 1 },
              ]}
              onPress={() => {
                if (item.name === "Spotify") {
                  // spotify flow
                } else if (item.name === "SoundCloud") {
                  // soundcloud flow
                } else {
                  navigation.navigate("AddAccount", {
                    name: item.name,
                    img: item?.img,
                  });
                }
              }}
            >
              <View style={[styles.row, { gap: 12, flex: 1 }]}>
                <Image source={item.img} style={styles.icon} />
                <View>
                  <View style={styles.row}>
                    <CustomText
                      label={item.name}
                      fontSize={15}
                      fontFamily={fonts.medium}
                      marginRight={4}
                    />
                    <Icons
                      family="Ionicons"
                      name={
                        isConnected
                          ? "checkmark-circle-sharp"
                          : "checkmark-circle-outline"
                      }
                      color={isConnected ? COLORS.green1 : COLORS.white3}
                      size={16}
                    />
                  </View>

                  <CustomText
                    label={item.des}
                    fontSize={12}
                    fontFamily={fonts.medium}
                    color={COLORS.white2}
                    marginTop={2}
                  />
                </View>
              </View>

              <Icons
                family="Ionicons"
                name="chevron-forward-outline"
                size={20}
                color={COLORS.white2}
              />
            </TouchableOpacity>
          );
        }}
      />
    </ScreenWrapper>
  );
};

export default SocialsAccount;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: COLORS.inputBg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 40,
    width: 40,
  },
});

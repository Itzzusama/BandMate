import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";

import GameCard from "./molecules/GameCard";
import ItemCard from "./molecules/ItemCard";
import JoinUs from "./molecules/JoinUs";
import PromoCard from "./molecules/PromoCard";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import { get } from "../../../services/ApiRequest";
import {
  setVTCBusiness,
  setVTCIndependent,
} from "../../../store/reducer/usersSlice";
import { COLORS } from "../../../utils/COLORS";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.users);
  const { totalWalletBalance } = useSelector((state) => state.users);

  const vault = [
    {
      id: 1,
      name: "My Friends",
      desc: "Invite and manage your Friends with ease.",
      image: Images.Frinends,
      onPress: () => navigation.navigate("MyFriends"),
    },
    {
      id: 2,
      name: "My Wallet",
      // onPress: () => navigation.navigate("MyProfile"),
      onPress: () => navigation.navigate("MyWallet"),
      desc: "Transfer, receive, and review your transactions.",
      image: Images.WalletIcon,
    },
    {
      id: 3,
      name: "My Promo Codes",
      onPress: () => navigation.navigate("PromoCode"),
      desc: "See all active promo codes you have.",
      image: Images.Promo,
    },
  ];

  const security = [
    {
      id: 0,
      name: "Quick Selections",
      desc: "Define your Home, Workplace, etc.",
      onPress: () => navigation.navigate("QuickSelection"),
      image: Images.HelpCenter,
    },
    {
      id: 1,
      name: "Security",
      desc: "Add layers of security on your account.",
      image: Images.Security,
      onPress: () => navigation.navigate("Security"),
    },
    {
      id: 2,
      name: "Help Center",
      desc: "Learn all you need to enhance your experience.",
      image: Images.HelpCenter,
    },
    {
      id: 3,
      name: "Community",
      onPress: () => navigation.navigate("Community"),
      desc: "See how you could help those in need.",
      image: Images.Community,
    },
    {
      id: 4,
      name: "App Languages",
      onPress: () => navigation.navigate("Community"),
      desc: "Setup your most comfortable language",
      image: Images.Earth,
    },
    {
      id: 5,
      name: "Preferences",
      desc: "Further fine tune your experience.",
      image: Images.Preferences,
      onPress: () => navigation.navigate("Preferences"),
    },
    {
      id: 6,
      name: "App Auto Update",
      isSwitch: true,
      image: Images.AppUpdate,
    },
    {
      id: 7,
      name: "Enable VTC",
      isSwitch: false,
      image: Images.AppUpdate,
      onPress: () => navigation.navigate("VTCChauffeur"),
    },
  ];

  const games = [
    {
      id: 1,
      name: "Joker",
      type: "Social Media",
    },
    {
      id: 2,
      name: "Joker",
      type: "Joker",
    },
    {
      id: 3,
      name: "Joker",
      type: "Joker",
    },
    {
      id: 4,
      name: "Joker",
      type: "Joker",
    },
    {
      id: 5,
      name: "Joker",
      type: "Joker",
    },
  ];

  const fetchVTCData = async () => {
    try {
      const [independentRes, businessRes] = await Promise.all([
        get("vtc/driver-profile"),
        get("vtc/business-profile"),
      ]);

      if (independentRes?.data?.success) {
        dispatch(setVTCIndependent(independentRes.data.data));
      }

      if (businessRes?.data?.success) {
        dispatch(setVTCBusiness(businessRes.data.data));
      }
    } catch (error) {
      console.log("❌ Error fetching VTC data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchVTCData();
    }, [])
  );

  return (
    <ScreenWrapper
      scrollEnabled
      paddingBottom={0.1}
      headerUnScrollable={() => (
        <Header
          title={"My Profile"}
          textColor={COLORS.black}
          onHelpPress={() => console.log("pressed")}
        />
      )}
    >
      <View style={styles.top}>
        <CustomButton
          title={"Settings"}
          backgroundColor={COLORS.lightGray}
          color={COLORS.black}
          fontSize={14}
          width={82}
          height={32}
        />
        <CustomButton
          title={"AI Assistant"}
          backgroundColor={COLORS.white}
          color={COLORS.gray1}
          width={106}
          fontSize={14}
          height={32}
          onPress={() => navigation.navigate("AiAssistant")}
        />
      </View>

      <CustomText
        label={"Welcome back!"}
        fontSize={18}
        fontFamily={fonts.medium}
        marginTop={20}
        marginBottom={8}
      />
      <View style={styles.profileWrapper}>
        <View style={styles.story}>
          <ImageBackground
            source={Images.buzz}
            style={styles.icon}
            resizeMode="contain"
          >
            <TouchableOpacity
              style={styles.iconBox}
              activeOpacity={0.6}
              onPress={() => navigation.navigate("QrScreen")}
            >
              <Icons name="qr-code-2" family="MaterialIcons" size={20} />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.info}>
          <CustomText
            label={
              userData?.nameDisplayPreference === "sur"
                ? userData?.sur_name || "Viktor"
                : userData?.first_name || "Sola"
            }
            fontSize={18}
            fontFamily={fonts.medium}
          />
          <View style={styles.ratingRow}>
            <View style={styles.ratingBadge}>
              <Icons
                name="star"
                family="AntDesign"
                size={12}
                color={COLORS.black}
              />
              <CustomText
                label="5.0"
                fontSize={12}
                fontFamily={fonts.semiBold}
                color={COLORS.black}
                marginLeft={5}
                marginTop={3}
              />
            </View>
            <CustomText
              label="125 Reviews"
              fontSize={12}
              fontFamily={fonts.regular}
              color={"#121212CC"}
            />
          </View>
          <View style={[styles.ratingRow, { marginTop: 7 }]}>
            <Icons
              name="mark-email-read"
              family="MaterialIcons"
              size={16}
              color={COLORS.black}
            />
            <CustomText
              label={`${userData?.email}` || "vsola@sola-group.ch"}
              fontSize={14}
              lineHeight={14 * 1.4}
              textDecorationLine={"underline"}
              fontFamily={fonts.medium}
              color={COLORS.black}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          activeOpacity={0.6}
          style={styles.edit}
        >
          <Icons
            name="mode-edit"
            family="MaterialIcons"
            size={20}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={Images.bgProfile}
        style={styles.adBg}
        imageStyle={{ borderRadius: 15 }}
      >
        <View
          style={{ flexDirection: "column", justifyContent: "space-between" }}
        >
          <CustomText
            label="move."
            fontSize={20}
            fontFamily={fonts.medium}
            color={COLORS.white}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                marginTop: 32,
              }}
            >
              <CustomText
                label={totalWalletBalance}
                fontSize={28}
                fontFamily={fonts.semiBold}
                color={COLORS.white}
                lineHeight={28 * 1.4}
              />
              <CustomText
                label="Cr"
                fontSize={24}
                fontFamily={fonts.medium}
                color={COLORS.white}
                lineHeight={24 * 1.4}
              />
            </View>

            <CustomText
              label="Sola credits balance"
              fontSize={12}
              fontFamily={fonts.medium}
              color={COLORS.white}
              lineHeight={12}
              marginTop={6}
              marginBottom={10}
            />
          </View>
        </View>

        <View style={styles.arrowIcon}>
          <Icons
            name="arrow-up-right"
            family="Feather"
            size={24}
            color={COLORS.black}
          />
        </View>
      </ImageBackground>

      <CustomButton
        title={"Swift to Pro"}
        width={131}
        height={32}
        marginTop={24}
        backgroundColor={COLORS.lightGray}
        color={COLORS.primaryColor}
        fontSize={16}
        marginBottom={24}
        rightIcon={Images.Question}
      />

      <CustomText
        label={"Earn Rewards"}
        fontSize={18}
        fontFamily={fonts.medium}
        marginBottom={16}
        lineHeight={21}
      />

      <PromoCard isInvite={() => navigation.navigate("InviteFriends")} />

      <CustomText
        label={"My Vault"}
        fontSize={18}
        fontFamily={fonts.medium}
        marginTop={20}
        marginBottom={16}
        lineHeight={21}
      />

      <View style={styles.card}>
        <ItemCard data={vault} />
      </View>

      <CustomText
        label={"Settings"}
        fontSize={18}
        fontFamily={fonts.medium}
        marginTop={20}
        marginBottom={16}
        lineHeight={21}
      />

      <View style={styles.card}>
        <ItemCard data={security} />
      </View>

      <JoinUs />

      <CustomText
        label={"Our Apps"}
        fontSize={18}
        fontFamily={fonts.medium}
        marginBottom={16}
        marginTop={20}
        lineHeight={21}
      />

      <View style={styles.card}>
        <GameCard data={games} />
      </View>

      <CustomText
        label={"Our Games"}
        fontSize={18}
        fontFamily={fonts.medium}
        marginTop={20}
        marginBottom={16}
        lineHeight={21}
      />

      <View style={styles.card}>
        <GameCard data={games} />
      </View>


    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 16,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 15,
  },
  story: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.inputBg,
    padding: 3,
    borderColor: COLORS.inputBg,
    borderWidth: 2,
    borderRadius: 99,
    marginRight: 10,
  },
  profileWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.inputBg,
    borderRadius: 16,
  },
  icon: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: COLORS.inputBg,
  },
  edit: {
    height: 48,
    width: 48,
    borderRadius: 99,
    backgroundColor: COLORS.inputBg,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingBadge: {
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 6,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  adBg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    paddingVertical: 20,
    marginTop: 20,
    height: 140,
  },
  arrowIcon: {
    backgroundColor: COLORS.white,
    width: 56,
    height: 56,
    padding: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    borderRadius: 8,
    height: 32,
    width: 32,
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

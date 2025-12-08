import { StyleSheet, View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import { PNGIcons } from "../../../assets/images/icons";
import Icons from "../../../components/Icons";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import CopyrightFooter from "../../../components/CopyrightFooter";

import Header from "./molecules/Header";
import UsersInfo from "./molecules/UsersInfo";
import InfoCard from "./molecules/InfoCard";
import ExtrasCard from "./molecules/ExtrasCard";
import SettingOptions from "./molecules/SettingOptions";
import PreferencesOptions from "./molecules/PreferencesOptions";
import CommunityOptions from "./molecules/CommunityOptions";
import RateApp from "./molecules/RateApp";
import FeedbackSection from "./molecules/FeedbackSection";
import { logout } from "../../../store/reducer/AuthConfig";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearSpotifyTokens } from "../../../store/reducer/spotifyAuthSlice";

const Settings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.userData);

  return (
    <ScreenWrapper
      paddingBottom={0.1}
      scrollEnabled
      headerUnScrollable={() => <Header />}
    >
      <UsersInfo />
      <View style={styles.row}>
        <InfoCard
          icon={PNGIcons.tire}
          title="Free Tier"
          subtitle="Your Plan"
          onPress={() => navigation.navigate("Plans")}
        />
        <InfoCard
          icon={PNGIcons.add_user}
          title="Invite Friends"
          subtitle="Earn Benefits & more!"
        />
      </View>
      <ExtrasCard />
      <CustomText
        label={"Settings"}
        fontSize={24}
        lineHeight={24 * 1.4}
        fontFamily={fonts.abril}
        marginTop={20}
        marginBottom={18}
      />
      <SettingOptions />
      <CustomText
        label={"Preferences"}
        fontSize={24}
        lineHeight={24 * 1.4}
        fontFamily={fonts.abril}
        marginTop={12}
        marginBottom={18}
      />
      <PreferencesOptions />
      <CustomText
        label={"Community"}
        fontSize={24}
        lineHeight={24 * 1.4}
        fontFamily={fonts.abril}
        marginTop={12}
        marginBottom={10}
      />
      <CommunityOptions />
      <RateApp />
      <FeedbackSection />
      <CustomButton
        title={"Logout"}
        backgroundColor={COLORS.cardColor}
        marginBottom={8}
        fontSize={16}
        onPress={async () => {
          dispatch(logout());
          await AsyncStorage.clear();
          dispatch(clearSpotifyTokens());
          navigation.reset({
            index: 0,
            routes: [{ name: "AuthStack" }],
          });
        }}
        color={COLORS.white}
        leftView={
          <Icons
            family={"MaterialIcons"}
            name={"logout"}
            color={COLORS.white}
            size={20}
            style={{ marginRight: 8 }}
          />
        }
      />
      <CustomButton
        title={"Close my account"}
        backgroundColor={"#EE1045"}
        color={COLORS.white}
        textTransform={"none"}
        fontSize={16}
        leftView={
          <Icons
            family={"MaterialCommunityIcons"}
            name={"delete-forever-outline"}
            color={COLORS.white}
            size={20}
            style={{ marginRight: 8 }}
          />
        }
      />
      <CopyrightFooter />
    </ScreenWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },
});

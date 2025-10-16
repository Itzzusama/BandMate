import { StyleSheet, View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";
import Header from "./molecules/Header";
import UsersInfo from "./molecules/UsersInfo";
import InfoCard from "./molecules/InfoCard";
import { PNGIcons } from "../../../assets/images/icons";
import ExtrasCard from "./molecules/ExtrasCard";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { SettingIcons } from "../../../assets/images/settingIcons";
import SettingOptions from "./molecules/SettingOptions";
const Settings = () => {
  const navigation = useNavigation();

  return (
    <ScreenWrapper
      paddingBottom={0.1}
      scrollEnabled
      headerUnScrollable={() => <Header />}
      backgroundColor="#080808"
    >
      <UsersInfo />
      <View style={styles.row}>
        <InfoCard icon={PNGIcons.tire} title="Free Tier" subtitle="Your Plan" />
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
        marginTop={18}
        marginBottom={18}
      />
      <SettingOptions />
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

import { Image, ScrollView, StyleSheet, View, Pressable } from "react-native";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import { SocialsIcons } from "../../../../assets/images/socialsIcons";
import EditButton from "./EditButton";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const data = [
  {
    name: "Instagram",
    img: SocialsIcons.insta,
    gradient: ["#2b201b", "#241c21", "#1c1626"],
  },
  {
    name: "TikTok",
    img: SocialsIcons.tiktok,
    gradient: ["#132a2a", "#1e1f23", "#2a141c"],
  },
  {
    name: "YouTube",
    img: SocialsIcons.youtube,
    gradient: ["#2f1111", "#231f1f"],
  },
  {
    name: "Spotify",
    img: SocialsIcons.spotify,
    gradient: ["#13261f", "#0f1b17", "#0b1411"],
  },
  {
    name: "SoundCloud",
    img: SocialsIcons.soundCloud,
    gradient: ["#2a1a12", "#1f1714", "#141313"],
  },
];

const AddedSocialAccounts = ({ myPage, userData }) => {
  const navigation = useNavigation();

  const socialLinks = userData?.profile?.socialLinks || {};

  const filteredData = data.filter(
    (item) => socialLinks[item.name] && socialLinks[item.name].trim() !== ""
  );

  if (!filteredData.length) return null;

  return (
    <View style={{ marginBottom: 14 }}>
      <View style={styles.flexRow}>
        <CustomText
          label={`${
            userData?.role === "solo"
              ? userData?.display_name
              : userData?.bandName
          }'s Socials`}
          fontFamily={fonts.medium}
          color={COLORS.white}
          fontSize={17}
        />
        {myPage && (
          <EditButton onPress={() => navigation.navigate("SocialsAccount")} />
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {filteredData.map((item, index) => (
          <LinearGradient
            key={index}
            colors={item.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View
              style={{ flex: 1, padding: 12, justifyContent: "space-between" }}
            >
              <Image source={item.img} style={styles.icon} />
              <CustomText
                label={item.name}
                fontFamily={fonts.medium}
                fontSize={18}
                color={COLORS.white}
                letterSpacing={-0.5}
              />
            </View>
          </LinearGradient>
        ))}
      </ScrollView>
    </View>
  );
};

export default AddedSocialAccounts;

const styles = StyleSheet.create({
  row: {
    gap: 2,
    paddingHorizontal: 12,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: 12,
  },
  card: {
    width: 138,
    height: 180,
    borderRadius: 12,

    borderWidth: 1,
    borderColor: COLORS.inputBg,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
});

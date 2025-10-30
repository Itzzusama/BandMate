import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTab from "../../../components/TopTab";
import { COLORS } from "../../../utils/COLORS";
import FollowingRow from "./molecules/FollowingRow";
import HomeHeader from "./molecules/HomeHeader";
import InvestFuture from "./molecules/InvestFuture";
import MomentCard from "./molecules/MomentCard";
import PostCard from "./molecules/PostCard";
import ReelCard from "./molecules/ReelCard";
import TendingTopic from "./molecules/TendingTopic";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SocialFeedNew = () => {
  const navigation = useNavigation();
  const [tab, setTab] = useState(0);

  const sections = [
    { component: <FollowingRow /> },
    { divider: true, props: { marginVertical: 0, thickness: 1 } },
    // { component: <SearchRow /> },
    // { divider: true, props: { marginVertical: 0, thickness:1 } },
    { component: <MomentCard /> },
    { divider: true, props: { marginBottom: 8, thickness: 1 } },
    {
      component: (
        <InvestFuture onPress={() => navigation.navigate("InvestmentScreen")} />
      ),
    },
    { divider: true, props: { marginVertical: 0, thickness: 1 } },
    { component: <TendingTopic /> },
    {
      divider: true,
      props: { marginVertical: 0, marginBottom: 8, thickness: 1 },
    },
    {
      component: (
        <PostCard onCommentPress={() => navigation.navigate("CommentScreen")} />
      ),
    },
    { divider: true, props: { marginBottom: 12, marginTop: 8, thickness: 4 } },
    { component: <PostCard isVideo /> },
    {
      divider: true,
      props: { marginBottom: 12, marginTop: 8, thickness: 4 },
    },
    { component: <PostCard isChange /> },
    { divider: true, props: { marginBottom: 12, marginTop: 8, thickness: 4 } },
    { component: <PostCard /> },
    { divider: true, props: { marginBottom: 12, marginTop: 8, thickness: 1 } },
    {
      component: (
        <CustomText
          label={"From now on you will only see posts from unfollowed users"}
          alignSelf={"center"}
          fontSize={18}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
          textAlign={"center"}
        />
      ),
    },

    { divider: true, props: { marginBottom: 12, marginTop: 8, thickness: 1 } },
    { component: <ReelCard /> },
    { divider: true, props: { marginBottom: 12, marginTop: 8, thickness: 1 } },
    { component: <PostCard /> },
    { divider: true, props: { marginBottom: 12, marginTop: 8, thickness: 1 } },
    { component: <PostCard /> },
    { divider: true, props: { marginBottom: 12, marginTop: 8, thickness: 1 } },
    { component: <PostCard /> },
    { divider: true, props: { marginBottom: 12, marginTop: 8, thickness: 1 } },
    { component: <PostCard /> },
    { divider: true, props: { marginBottom: 12, marginTop: 8, thickness: 1 } },
    { component: <PostCard /> },
  ];

  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      statusBarColor="#181818"
      scrollEnabled
      headerUnScrollable={() => (
        <View
          style={{
            backgroundColor: "#181818",
            paddingTop:10
          }}
        >
          <HomeHeader title={"Home"} />

          <View style={[styles.row, { backgroundColor: "#181818" }]}>
            <ImageFast
              source={Images.compassBg}
              style={{ width: 36, height: 32 }}
            />
            <TopTab
              rounded
              tab={tab}
              setTab={setTab}
              borderRadius={8}
              tabNames={["Technology", "Politics", "Sports", "Music"]}
            />
          </View>
        </View>
      )}
    >
      {sections.map((item, index) => (
        <View key={index}>
          {item.component}
          {item.divider && <Divider {...(item.props || {})} />}
        </View>
      ))}
    </ScreenWrapper>
  );
};

export default SocialFeedNew;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
});
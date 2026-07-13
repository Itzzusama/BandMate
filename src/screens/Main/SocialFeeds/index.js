import { useState, useEffect } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import fonts from "../../../assets/fonts";
import { FeedsImages } from "../../../assets/images/FeedsImages";
import { EventImages } from "../../../assets/images/eventImages";
import { PNGIcons } from "../../../assets/images/icons";
import CustomText from "../../../components/CustomText";
import ScreenWrapper from "../../../components/ScreenWrapper";
import SocialFeedsSkeleton from "../../../components/SocialFeedsSkeleton";
import { COLORS } from "../../../utils/COLORS";
import Categories from "./molecules/Categories";
import FeedCard from "./molecules/FeedCard";
import Header from "./molecules/Header";
import Moments from "./molecules/Moments";
import PostCard from "./molecules/PostCard";
const SocialFeeds = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      paddingBottom={0.1}
      scrollEnabled
      headerUnScrollable={() => <Header />}
    >
      {loading ? (
        <SocialFeedsSkeleton />
      ) : (
        <>
          <Categories />
          <Moments />
          <View
            style={[styles.row, { paddingHorizontal: 12, marginBottom: 12 }]}
          >
            <View style={{ flex: 1 }}>
              <CustomText
                label={"Front Page"}
                fontSize={18}
                fontFamily={fonts.medium}
                lineHeight={18 * 1.4}
              />
            </View>
            <View style={styles.row}>
              <CustomText
                label={"GLOBAL RANKING"}
                fontSize={12}
                fontFamily={fonts.semiBold}
                color={COLORS.white3}
              />
              <Pressable style={styles.forwardIcon}>
                <Image source={PNGIcons.forward} style={styles.icon} />
              </Pressable>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.feedRow}
          >
            <FeedCard
              username="username1"
              displayName="Display Name 1"
              isVerified={true}
              imageSource={FeedsImages.feed_img}
              promo={true}
              sponsored={true}
              weeksOnChart={2}
              rank={1}
              percentageGain={3240}
              timeframe="2H"
              stats={{
                likes: "1.5M",
                comments: "1.5M",
                shares: "1.5M",
                saves: "1.5M",
              }}
            />

            <FeedCard
              username="username2"
              displayName="Display Name 2"
              isVerified={false}
              imageSource={EventImages.eventImg}
              promo={true}
              sponsored={true}
              weeksOnChart={5}
              rank={2}
              percentageGain={1500}
              timeframe="1D"
              stats={{
                likes: "2.1M",
                comments: "1.2M",
                shares: "900K",
                saves: "600K",
              }}
            />
          </ScrollView>
          <PostCard
            username="username"
            displayName="Display Name"
            isVerified={true}
            partnershipWith="ClubHouse"
            imageSource={FeedsImages.imageBG}
            stats={{
              likes: "1.4k",
              comments: "1.5M",
              shares: "1.5M",
              saves: "1.5M",
            }}
            postTitle="Automatically detects when trips require..."
            commentUser="User"
            commentText="With the most liked comment"
            commentsCount={919}
            timeAgo="9 hours ago"
          />
          <PostCard
            username="username"
            displayName="Display Name"
            isVerified={true}
            partnershipWith="ClubHouse"
            imageSource={FeedsImages.post}
            stats={{
              likes: "1.4k",
              comments: "1.5M",
              shares: "1.5M",
              saves: "1.5M",
            }}
            postTitle="Automatically detects when trips require..."
            commentUser="User"
            commentText="With the most liked comment"
            commentsCount={919}
            timeAgo="9 hours ago"
            marginBottom={140}
          />
        </>
      )}
    </ScreenWrapper>
  );
};

export default SocialFeeds;

const styles = StyleSheet.create({
  feedRow: {
    paddingHorizontal: 12,
    gap: 10, // spacing between cards
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  forwardIcon: {
    height: 16,
    width: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,

    backgroundColor: COLORS.inputBg,
  },
  icon: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    tintColor: COLORS.btnColor,
  },
});

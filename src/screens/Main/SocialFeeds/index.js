import { StyleSheet, View, ScrollView } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "./molecules/Header";
import Categories from "./molecules/Categories";
import Moments from "./molecules/Moments";
import FeedCard from "./molecules/FeedCard";
import { FeedsImages } from "../../../assets/images/FeedsImages";
import { EventImages } from "../../../assets/images/eventImages";
import PostCard from "./molecules/PostCard";
const SocialFeeds = () => {
  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      paddingBottom={0.1}
      scrollEnabled
      headerUnScrollable={() => <Header />}
    >
      <Categories />
      <Moments />

      {/* Horizontal Scroll for Feed Cards */}
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
      />
    </ScreenWrapper>
  );
};

export default SocialFeeds;

const styles = StyleSheet.create({
  feedRow: {
    paddingHorizontal: 8,
    gap: 10, // spacing between cards
  },
});

import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  DeviceEventEmitter,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import fonts from "../../../assets/fonts";
import { EventImages } from "../../../assets/images/eventImages";
import { FeedsImages } from "../../../assets/images/FeedsImages";
import { PNGIcons } from "../../../assets/images/icons";
import CustomText from "../../../components/CustomText";
import ScreenWrapper from "../../../components/ScreenWrapper";
import SocialFeedsSkeleton from "../../../components/SocialFeedsSkeleton";
import { del, get, post } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { ToastMessage } from "../../../utils/ToastMessage";
import Categories from "./molecules/Categories";
import FeedCard from "./molecules/FeedCard";
import Header from "./molecules/Header";
import Moments from "./molecules/Moments";
import PostCard from "./molecules/PostCard";

const SocialFeeds = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch posts from API
  const fetchPosts = useCallback(async (isRefresh = false, category = selectedCategory) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      }
      let endpoint = "posts?&type=post";
      if (category) {
        endpoint += `&topic=${encodeURIComponent(category)}`;
      }

      const response = await get(endpoint);
      if (response?.data?.success && Array.isArray(response?.data?.data)) {
        setPosts(response.data.data);
      } else if (Array.isArray(response?.data)) {
        setPosts(response.data);
      }
    } catch (error) {
      console.log("Error fetching posts in SocialFeeds:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Listen to post upload or repost completion to auto-refresh
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      "uploadCompleted",
      () => {
        fetchPosts(true);
      }
    );
    return () => {
      subscription.remove();
    };
  }, [fetchPosts]);

  // Pull to refresh handler
  const onRefresh = useCallback(() => {
    fetchPosts(true);
  }, [fetchPosts]);

  // Category select handler
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setLoading(true);
    fetchPosts(false, cat);
  };

  // Delete post handler
  const handleDeletePost = useCallback(async (postId) => {
    try {
      const response = await del(`posts/${postId}`);
      if (response?.data?.success) {
        ToastMessage("Post deleted successfully", "success");
        setPosts((prev) => prev.filter((p) => p._id !== postId));
      } else {
        ToastMessage("Failed to delete post", "error");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      ToastMessage("Failed to delete post", "error");
    }
  }, []);

  // Edit post handler
  const handleEditPost = useCallback(
    (postItem) => {
      navigation.navigate("PublishPost", {
        editMode: true,
        postData: postItem,
      });
    },
    [navigation]
  );

  // Hide post handler
  const handleHidePost = useCallback(async (postId) => {
    try {
      const response = await post("hide/post", { postId });
      if (response?.data?.success) {
        ToastMessage("Post hidden successfully", "success");
        setPosts((prev) => prev.filter((p) => p._id !== postId));
      }
    } catch (error) {
      console.error("Error hiding post:", error);
    }
  }, []);

  // Hide user posts handler
  const handleHideUserPosts = useCallback(async (userId) => {
    try {
      const response = await post("hide/user-post", { userId });
      if (response?.data?.success) {
        ToastMessage("User posts hidden successfully", "success");
        setPosts((prev) => prev.filter((p) => p?.author?._id !== userId));
      }
    } catch (error) {
      console.error("Error hiding user posts:", error);
    }
  }, []);

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      paddingBottom={0.1}
      scrollEnabled
      headerUnScrollable={() => <Header />}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={COLORS.btnColor}
          colors={[COLORS.btnColor]}
        />
      }
    >
      {loading ? (
        <SocialFeedsSkeleton />
      ) : (
        <>
          <Categories
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
          <Moments />

          {/* Front Page Header */}
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

          {/* Front Page Horizontal Feed */}
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

          {/* Post Feed List */}
          {posts.length > 0 ? (
            posts.map((postItem, index) => (
              <PostCard
                key={postItem._id || index}
                item={postItem}
                images={postItem.images}
                hashtags={postItem.hashtags}
                topic={postItem.topic}
                stats={postItem.stats}
                upvotes={postItem.upvotes || []}
                savedCount={postItem.stats?.saved || 0}
                commentsCount={postItem.stats?.comments || 0}
                onDeletePress={handleDeletePost}
                onEditPress={handleEditPost}
                onHidePost={handleHidePost}
                onHideUserPosts={handleHideUserPosts}
                onVoteUpdate={() => fetchPosts(false)}
                marginBottom={index === posts.length - 1 ? 140 : 0}
              />
            ))
          ) : (
            <>
              {/* Fallback demo cards if database has 0 posts */}
              <PostCard
                displayName="Display Name"
                username="username"
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
                displayName="Display Name"
                username="username"
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
        </>
      )}
    </ScreenWrapper>
  );
};

export default SocialFeeds;

const styles = StyleSheet.create({
  feedRow: {
    paddingHorizontal: 12,
    gap: 10,
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

import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { DeviceEventEmitter, RefreshControl, StyleSheet } from "react-native";
import { FeedsImages } from "../../../assets/images/FeedsImages";
import Divider from "../../../components/Divider";
import ScreenWrapper from "../../../components/ScreenWrapper";
import SocialFeedsSkeleton from "../../../components/SocialFeedsSkeleton";
import { useSelector } from "react-redux";
import { selectStoryUploadStatus } from "../../../store/reducer/appSlice";
import { del, get, post } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { ToastMessage } from "../../../utils/ToastMessage";
import Header from "./molecules/Header";
import MomentCard from "./molecules/MomentCard";
import PostCard from "./molecules/PostCard";

const SocialFeeds = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const storyUploadStatus = useSelector(selectStoryUploadStatus);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [storiesData, setStoriesData] = useState([]);
  const [myStoriesData, setMyStoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isFirstLoadRef = useRef(true);

  // Fetch stories from API
  const getStories = useCallback(async () => {
    try {
      const response = await get("stories");
      setStoriesData(response.data?.data || response.data || []);
    } catch (error) {
      console.log("getStories error in SocialFeeds:", error);
    }
  }, []);

  const getMyStories = useCallback(async () => {
    try {
      const response = await get("stories/me");
      setMyStoriesData(response.data?.data || response.data || []);
    } catch (error) {
      console.log("getMyStories error in SocialFeeds:", error);
    }
  }, []);

  // Fetch posts from API
  const fetchPosts = useCallback(
    async (isRefresh = false, category = selectedCategory) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else if (isFirstLoadRef.current && posts.length === 0) {
          setLoading(true);
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
        isFirstLoadRef.current = false;
      }
    },
    [selectedCategory, posts.length],
  );

  // Fetch all metadata and stories
  const fetchMetaData = useCallback(async () => {
    try {
      await Promise.all([getStories(), getMyStories()]);
    } catch (error) {
      console.log("fetchMetaData error in SocialFeeds:", error);
    }
  }, [getMyStories, getStories]);

  // Run fetch on screen focus
  useEffect(() => {
    if (isFocused) {
      fetchPosts(false);
      fetchMetaData();
    }
  }, [isFocused, fetchPosts, fetchMetaData]);

  // Refetch stories when story upload status becomes success or idle
  useEffect(() => {
    if (storyUploadStatus === "success" || storyUploadStatus === "idle") {
      fetchMetaData();
    }
  }, [storyUploadStatus, fetchMetaData]);

  // Listen to upload / post events to auto-refresh
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      "uploadCompleted",
      () => {
        fetchPosts(true);
        fetchMetaData();
      },
    );
    return () => {
      subscription.remove();
    };
  }, [fetchPosts, fetchMetaData]);

  // Pull to refresh handler
  const onRefresh = useCallback(() => {
    fetchPosts(true);
    fetchMetaData();
  }, [fetchPosts, fetchMetaData]);

  // Category select handler
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    if (posts.length === 0) {
      setLoading(true);
    }
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
    [navigation],
  );

  // Hide post handler
  const handleHidePost = useCallback(async (postId) => {
    try {
      const response = await post("hide/post", { postId });
      if (response?.data?.success) {
        ToastMessage("Post hidden successfully", "success");
        setPosts((prev) => prev.filter((p) => p._id !== postId));
      } else {
        ToastMessage("Failed to hide post", "error");
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
      } else {
        ToastMessage("Failed to hide user posts", "error");
      }
    } catch (error) {
      console.error("Error hiding user posts:", error);
    }
  }, []);

  const handleOpenComments = useCallback(
    (postItem, postData) => {
      navigation.navigate("DetailPage", {
        item: postItem,
        postId: postItem?._id || postItem?.id,
        postData,
      });
    },
    [navigation],
  );

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      paddingBottom={0.1}
      scrollEnabled
      translucent
      headerUnScrollable={() => (
        <Header
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={COLORS.btnColor}
          colors={[COLORS.btnColor]}
        />
      }
    >
      {loading && posts.length === 0 ? (
        <SocialFeedsSkeleton />
      ) : (
        <>
          {/* Moments / Stories Section */}
          <MomentCard storiesData={storiesData} myStoriesData={myStoriesData} />

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
                onCommentPress={handleOpenComments}
                onDeletePress={handleDeletePost}
                onEditPress={handleEditPost}
                onHidePost={handleHidePost}
                onHideUserPosts={handleHideUserPosts}
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

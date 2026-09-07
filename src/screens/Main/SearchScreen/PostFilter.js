import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { SocialFeedSvg } from "../../../assets/svgs";
import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import SocialFeedsSkeleton from "../../../components/SocialFeedsSkeleton";
import { del, get, post } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { ToastMessage } from "../../../utils/ToastMessage";
import PostCard from "../SocialFeeds/molecules/PostCard";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const PostFilter = ({ route }) => {
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const scrollRef = useRef(null);

  const hashtag = route.params?.hashtag;
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const fetchPosts = useCallback(async (isRefreshing = false) => {
    try {
      if (isRefreshing || isFirstLoad || posts.length === 0) {
        setRefreshing(true);
      } else {
        setRefreshing(false);
      }

      let endpoint = "posts?&type=post";
      if (hashtag) {
        endpoint += `&hashtags=${encodeURIComponent(hashtag)}`;
      }

      const response = await get(endpoint);
      if (response?.data?.success && Array.isArray(response?.data?.data)) {
        setPosts(response.data.data);
      } else if (Array.isArray(response?.data)) {
        setPosts(response.data);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching filtered posts:", err);
    } finally {
      setRefreshing(false);
      setIsFirstLoad(false);
    }
  }, [hashtag, isFirstLoad, posts.length]);

  useEffect(() => {
    fetchPosts(true);
  }, [fetchPosts, isFocus]);

  const onRefresh = useCallback(() => {
    fetchPosts(true);
  }, [fetchPosts]);

  const handleDeletePost = async (postId) => {
    try {
      const api = `posts/${postId}`;
      const response = await del(api);

      if (response?.data?.success) {
        ToastMessage("Post Deleted Successfully", "success");
        setPosts((prevPosts) =>
          prevPosts.filter((item) => item._id !== postId),
        );
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditPost = (item) => {
    navigation.navigate("CreatePost", {
      editMode: true,
      postData: item,
    });
  };

  const handleHidePost = async (postId) => {
    try {
      const response = await post("hide/post", { postId });
      if (response?.data?.success) {
        ToastMessage("Post hidden successfully", "success");
        setPosts((prev) => prev.filter((p) => p._id !== postId));
      }
    } catch (error) {
      console.log("handleHidePost error", error);
    }
  };

  const handleHideUserPosts = async (authorId) => {
    try {
      const response = await post("hide/post", { authorId });
      if (response?.data?.success) {
        ToastMessage("User posts hidden successfully", "success");
        setPosts((prev) => prev.filter((p) => p.author?._id !== authorId));
      }
    } catch (error) {
      console.log("handleHideUserPosts error", error);
    }
  };

  const handleOpenComments = (postItem, postData) => {
    navigation.navigate("DetailPage", {
      item: postItem,
      postId: postItem?._id || postItem?.id,
      postData,
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <PostCard
        key={item._id || index}
        item={item}
        images={item.images}
        hashtags={item.hashtags}
        topic={item.topic}
        stats={item.stats}
        upvotes={item.upvotes || []}
        savedCount={item.stats?.saved || 0}
        commentsCount={item.stats?.comments || 0}
        onCommentPress={handleOpenComments}
        onDeletePress={handleDeletePost}
        onEditPress={handleEditPost}
        onHidePost={handleHidePost}
        onHideUserPosts={handleHideUserPosts}
        marginBottom={index === posts.length - 1 ? 140 : 0}
      />
    );
  };

  const renderListEmpty = () => {
    if (refreshing && isFirstLoad) {
      return (
        <View>
          <SocialFeedsSkeleton showMoments={false} />
        </View>
      );
    }

    return (
      <View style={styles.noDataContainer}>
        <SocialFeedSvg
          height={80}
          width={80}
          color={COLORS.gray4}
          marginBottom={10}
        />
        <CustomText
          label="No Posts"
          fontSize={32}
          fontFamily={fonts.BoldItalic}
          color={COLORS.white}
          marginTop={12}
          fontStyle={"italic"}
        />
        <CustomText
          label="There are no posts to show right now."
          fontFamily={fonts.medium}
          color={COLORS.gray1}
        />
      </View>
    );
  };

  return (
    <ScreenWrapper paddingHorizontal={0.1}>
      <Header title={hashtag ? `#${hashtag}` : "Posts"} />
      <FlatList
        ref={scrollRef}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id || index.toString()}
        ListEmptyComponent={renderListEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing && !isFirstLoad}
            onRefresh={onRefresh}
            tintColor={COLORS.white}
          />
        }
        contentContainerStyle={posts.length === 0 && { flex: 1 }}
      />
    </ScreenWrapper>
  );
};

export default PostFilter;

const styles = StyleSheet.create({
  noDataContainer: {
    height: SCREEN_HEIGHT / 1.5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

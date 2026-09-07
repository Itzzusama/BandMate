import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useCallback, useMemo } from "react";
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator } from "react-native";
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
import { get } from "../../../services/ApiRequest";

const Home = () => {
  const navigation = useNavigation();
  const [tab, setTab] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = async (isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await get("posts", {
        page: 1,
        limit: 20,
      });

      console.log("Home Posts API Response:", response);

      if (response?.data?.success && response?.data?.data) {
        setPosts(response.data.data);
      } else {
        setError("Failed to fetch posts");
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    fetchPosts(true);
  }, []);

  // Format time ago
  const getTimeAgo = useCallback((dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return `${Math.floor(seconds / 604800)} weeks ago`;
  }, []);

  // Format numbers (1000 -> 1k, 1000000 -> 1M)
  const formatCount = useCallback((count) => {
    if (!count || count === 0) return "0";
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}k`;
    return `${(count / 1000000).toFixed(1)}M`;
  }, []);

  // Insert ReelCard and unfollowed text at specific positions
  const processedPosts = useMemo(() => {
    if (posts.length === 0) return [];
    
    const result = [];
    posts.forEach((post, index) => {
      // Add the post with random isChange prop
      result.push({
        type: 'post',
        data: post,
        isChange: Math.random() > 0.7, // 30% chance of being isChange
        isVideo: Math.random() > 0.8, // 20% chance of being video
      });

      // After 2nd post, add ReelCard
      if (index === 1) {
        result.push({ type: 'reelCard' });
      }

      // After 4th post, add unfollowed text
      if (index === 3) {
        result.push({ type: 'unfollowedText' });
      }
    });

    return result;
  }, [posts]);

  const renderListHeader = useCallback(() => (
    <>
      <FollowingRow />
      <Divider marginVertical={0} thickness={1} />
      <MomentCard />
      <Divider marginBottom={8} thickness={1} />
      <InvestFuture onPress={() => navigation.navigate("InvestmentScreen")} />
      <Divider marginVertical={0} thickness={1} />
      <TendingTopic />
      <Divider marginVertical={0} marginBottom={8} thickness={4} />
    </>
  ), [navigation]);

  const renderItem = useCallback(({ item, index }) => {
    if (item.type === 'reelCard') {
      return (
        <>
          <Divider marginBottom={12} marginTop={8} thickness={4} />
          <ReelCard />
          <Divider marginBottom={12} marginTop={8} thickness={4} />
        </>
      );
    }

    if (item.type === 'unfollowedText') {
      return (
        <>
          <Divider marginBottom={12} marginTop={8} thickness={1} />
          <CustomText
            label={"From now on you will only see posts from unfollowed users"}
            alignSelf={"center"}
            fontSize={18}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
            textAlign={"center"}
          />
          <Divider marginBottom={12} marginTop={8} thickness={1} />
        </>
      );
    }

    // Render post
    const post = item.data;
    const author = post?.author || {};
    const displayName = `${author.firstName || ""} ${author.lastName || ""}`.trim() || "Display Name";
    const username = author.username || "username";
    const description = post?.description || "";
    const images = post?.images || [];
    const hashtags = post?.hashtags || [];
    const topic = post?.topic || "Crypto";
    const likesCount = post?.likesCount || 0;
    const commentsCount = post?.commentsCount || 0;
    const repostsCount = post?.repostsCount || 0;
    const stats = post?.stats || {};
    const createdAt = post?.createdAt || "";
    const timeAgo = getTimeAgo(createdAt);

    return (
      <>
        <PostCard
          displayName={displayName}
          username={username}
          description={description}
          images={images}
          hashtags={hashtags}
          topic={topic}
          likesCount={likesCount}
          commentsCount={commentsCount}
          repostsCount={repostsCount}
          stats={stats}
          timeAgo={timeAgo}
          formatCount={formatCount}
          isChange={item.isChange}
          onCommentPress={() => navigation.navigate("DetailPage")}
        />
        <Divider marginBottom={12} marginTop={8} thickness={index === 0 ? 4 : 1} />
      </>
    );
  }, [navigation, getTimeAgo, formatCount]);

  const renderListEmpty = useCallback(() => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.buttonColor} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <CustomText
            label={error}
            color={COLORS.subtitle}
            fontSize={16}
            textAlign={"center"}
          />
        </View>
      );
    }

    return (
      <View style={styles.centerContainer}>
        <CustomText
          label={"No posts found"}
          color={COLORS.subtitle}
          fontSize={16}
          textAlign={"center"}
        />
      </View>
    );
  }, [loading, error]);

  const keyExtractor = useCallback((item, index) => {
    if (item.type === 'post') return item.data._id;
    return `${item.type}-${index}`;
  }, []);

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      statusBarColor="#181818"
      scrollEnabled
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={COLORS.buttonColor}
          colors={[COLORS.buttonColor]}
        />
      }
      headerUnScrollable={() => (
        <View
          style={{
            backgroundColor: "#181818",
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
      <FlatList
        data={processedPosts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderListEmpty}
        scrollEnabled={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        initialNumToRender={5}
        windowSize={10}
      />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    minHeight: 200,
  },
});

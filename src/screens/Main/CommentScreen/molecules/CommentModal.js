import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import Divider from "../../../../components/Divider";
import ImageFast from "../../../../components/ImageFast";
import TopTab from "../../../../components/TopTab";
import { put } from "../../../../services/ApiRequest";
import { COLORS } from "../../../../utils/COLORS";
import CommentSkeleton from "../../SocialFeeds/molecules/CommentSkeleton";
import CommentOption from "./CommentOption";

const hasLikedReaction = (reactions, userId) => {
  if (!Array.isArray(reactions) || !userId) return false;
  return reactions.some((reaction) => {
    if (!reaction) return false;
    if (typeof reaction === "string" || typeof reaction === "number") {
      return String(reaction) === String(userId);
    }
    const reactionUserId =
      reaction?.user?._id ??
      reaction?.user?.id ??
      reaction?.userId ??
      reaction?._id ??
      reaction?.id;
    const reactionType = reaction?.reaction ?? "like";
    return (
      String(reactionUserId ?? "") === String(userId) &&
      String(reactionType).toLowerCase() === "like"
    );
  });
};

const CommentItem = ({ item, onReply, onLongPress, onLike, userData }) => {
  const [showReplies, setShowReplies] = useState(false);
  const replies = item?.replies || [];
  const hasReplies = replies.length > 0;

  const profileColor = item?.user?.profile?.profileColor;
  const isLiked = hasLikedReaction(item?.reactions, userData?._id);
  const firstName = item?.user?.first_name || item?.user?.firstName || "User";
  const username = item?.user?.username || "username";
  const userAvatar = item?.user?.profile?.avatar || item?.user?.avatar;

  return (
    <TouchableOpacity
      style={styles.commentContainer}
      activeOpacity={0.7}
      onLongPress={() => onLongPress(item)}
    >
      {/* User Info Row */}
      <View style={styles.userRow}>
        <View style={styles.leftSection}>
          {userAvatar ? (
            <ImageFast source={{ uri: userAvatar }} style={styles.avatar} />
          ) : (
            <View
              style={[
                styles.avatar,
                { backgroundColor: profileColor || COLORS.inputBg },
              ]}
            />
          )}

          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <CustomText
                label={firstName}
                fontSize={14}
                color={COLORS.white}
                fontFamily={fonts.medium}
              />
              <View
                style={{
                  height: 4,
                  width: 4,
                  borderRadius: 99,
                  backgroundColor: COLORS.inputBg,
                }}
              />
              <View style={styles.authorBadge}>
                <CustomText
                  label={`@${username.toLowerCase()}`}
                  fontSize={12}
                  color={COLORS.white3}
                />
              </View>
              {item?.isAuthor && (
                <CustomText
                  label="❤️ By author"
                  fontSize={12}
                  color={COLORS.white}
                />
              )}
            </View>
          </View>
        </View>

        <View style={styles.userRowRight}>
          <CustomText
            label={moment(item?.createdAt).fromNow()}
            fontSize={12}
            color={COLORS.white3}
          />
          {item?.isPinned && (
            <Image
              source={Images.commentPin}
              style={[styles.pinnedIcon, { tintColor: COLORS.white }]}
            />
          )}
        </View>
      </View>

      {/* Comment Body */}
      <View style={{ marginLeft: 40, marginTop: 4 }}>
        <CustomText
          label={item?.comment || item?.text}
          fontSize={14}
          color={COLORS.white}
          lineHeight={20}
        />

        {/* Attached Image */}
        {item?.image ? (
          <View style={styles.attachmentRow}>
            <ImageFast
              source={{ uri: item.image }}
              style={styles.attachmentImage}
              resizeMode="cover"
            />
          </View>
        ) : null}

        {/* Action Row: Likes & Reply */}
        <View style={[styles.statsRow, { marginTop: 8 }]}>
          <View style={styles.statsLeft}>
            {/* Likes count & Heart toggle */}
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => onLike && onLike(item)}
              activeOpacity={0.7}
            >
              <Image
                source={
                  isLiked
                    ? Images.heartFill || Images.heart
                    : Images.heart
                }
                style={[
                  styles.statIcon,
                  isLiked && { tintColor: COLORS.red },
                ]}
              />
              <CustomText
                label={`${item?.reactions?.length || 0}`}
                fontSize={12}
                color={isLiked ? COLORS.red : COLORS.white3}
                marginLeft={4}
              />
            </TouchableOpacity>

            {/* Reply Button */}
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => onReply && onReply(item)}
              activeOpacity={0.7}
            >
              <Image
                source={Images.commentReply}
                style={[styles.statIcon, { tintColor: COLORS.white3 }]}
              />
              <CustomText
                label="Reply"
                fontSize={12}
                color={COLORS.white3}
                marginLeft={4}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Toggle Nested Replies */}
        {hasReplies && (
          <TouchableOpacity
            style={{ marginTop: 8 }}
            onPress={() => setShowReplies(!showReplies)}
            activeOpacity={0.7}
          >
            <CustomText
              label={
                showReplies
                  ? "— Hide replies"
                  : `— View ${replies.length} ${
                      replies.length === 1 ? "reply" : "replies"
                    }`
              }
              fontSize={12}
              color={COLORS.btnColor}
              fontFamily={fonts.medium}
            />
          </TouchableOpacity>
        )}

        {/* Nested Replies List */}
        {showReplies && hasReplies && (
          <View style={styles.repliesWrapper}>
            {replies.map((reply, index) => (
              <ReplyItem
                key={reply._id || reply.id || index}
                item={reply}
                onReply={() => onReply && onReply(item)}
                onLike={() => onLike && onLike(reply, true, item._id)}
                userData={userData}
                onLongPress={() => onLongPress && onLongPress(reply)}
              />
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const ReplyItem = ({ item, onReply, onLike, userData, onLongPress }) => {
  const isLiked = hasLikedReaction(item?.reactions, userData?._id);
  const firstName = item?.user?.first_name || item?.user?.firstName || "User";
  const username = item?.user?.username || "username";
  const userAvatar = item?.user?.profile?.avatar || item?.user?.avatar;

  return (
    <TouchableOpacity
      style={styles.replyContainer}
      activeOpacity={0.7}
      onLongPress={onLongPress}
    >
      <View style={styles.userRow}>
        <View style={styles.leftSection}>
          {userAvatar ? (
            <ImageFast source={{ uri: userAvatar }} style={styles.replyAvatar} />
          ) : (
            <View
              style={[
                styles.replyAvatar,
                {
                  backgroundColor:
                    item?.user?.profile?.profileColor || COLORS.inputBg,
                },
              ]}
            />
          )}
          <View style={{ marginLeft: 8 }}>
            <View style={styles.replyHeader}>
              <CustomText
                label={firstName}
                fontSize={13}
                color={COLORS.white}
                fontFamily={fonts.medium}
              />
              <CustomText
                label={` @${username.toLowerCase()}`}
                fontSize={12}
                color={COLORS.white3}
              />
            </View>
          </View>
        </View>

        <CustomText
          label={moment(item?.createdAt).fromNow()}
          fontSize={11}
          color={COLORS.white3}
        />
      </View>

      <View style={{ marginLeft: 36, marginTop: 2 }}>
        <CustomText
          label={item?.comment || item?.text}
          fontSize={13}
          color={COLORS.white}
          lineHeight={18}
        />

        {item?.image ? (
          <View style={[styles.attachmentRow, { marginTop: 6 }]}>
            <ImageFast
              source={{ uri: item.image }}
              style={[styles.attachmentImage, { width: 90, height: 90 }]}
              resizeMode="cover"
            />
          </View>
        ) : null}

        <View style={[styles.statsRow, { marginTop: 6 }]}>
          <View style={styles.statsLeft}>
            <TouchableOpacity
              style={styles.statItem}
              onPress={onLike}
              activeOpacity={0.7}
            >
              <Image
                source={
                  isLiked
                    ? Images.heartFill || Images.heart
                    : Images.heart
                }
                style={[
                  styles.statIcon,
                  { width: 12, height: 12 },
                  isLiked && { tintColor: COLORS.red },
                ]}
              />
              <CustomText
                label={`${item?.reactions?.length || 0}`}
                fontSize={11}
                color={isLiked ? COLORS.red : COLORS.white3}
                marginLeft={4}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statItem}
              onPress={onReply}
              activeOpacity={0.7}
            >
              <CustomText
                label="Reply"
                fontSize={11}
                color={COLORS.white3}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CommentModal = ({
  comments: initialComments = [],
  loading = false,
  post,
  onReply,
  onLike,
  userData,
  onTabChange,
  isBottomSheet = true,
  isBottom = false,
  marginBottom = 0,
  currentTab = 0,
  onHideComment,
  onDeleteComment,
  onHideUserComments,
  onReportComment,
  onEditComment,
  onViewProfile,
  onSendMessage,
}) => {
  const [tab, setTab] = useState(currentTab !== null ? currentTab : 0);
  const [comments, setComments] = useState(initialComments || []);
  const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const tabNames = ["Most likes", "Most recent"];
  const listRef = useRef(null);

  const handlePinComment = async (comment) => {
    const postId = post?._id;
    const commentId = comment?._id;
    if (!postId || !commentId) return;

    const newPinStatus = !comment.isPinned;
    try {
      await put(`posts/${postId}/comment/${commentId}`, {
        isPinned: newPinStatus,
      });

      setComments((prev) => {
        const updated = prev.map((c) =>
          c._id === commentId ? { ...c, isPinned: newPinStatus } : c
        );
        return updated.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
      });
    } catch (e) {
      console.log("Error pinning comment:", e);
    }
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (onTabChange) {
      onTabChange(newTab === 0 ? "mostLiked" : "mostRecent");
    }
  };

  useEffect(() => {
    setComments(initialComments || []);
  }, [initialComments]);

  useEffect(() => {
    if (currentTab !== null) {
      setTab(currentTab);
    }
  }, [currentTab]);

  const handleLongPress = (comment) => {
    setSelectedComment(comment);
    setIsOptionModalVisible(true);
  };

  const handleCloseOptionModal = () => {
    setIsOptionModalVisible(false);
    setSelectedComment(null);
  };

  return (
    <View style={[styles.container, { marginBottom }]}>
      {/* Top Tabs */}
      <TopTab
        tab={tab}
        setTab={handleTabChange}
        tabNames={tabNames}
        rounded
        marginTop={8}
        height={28}
        paddingHorizontal={10}
        scrollViewPaddingHorizontal={12}
      />
      <Divider marginVertical={10} thickness={1} color={COLORS.inputBg} />

      {/* Comments List */}
      {isBottomSheet ? (
        <BottomSheetFlatList
          ref={listRef}
          data={comments}
          keyExtractor={(item) => item._id || item.id}
          renderItem={({ item }) => (
            <CommentItem
              item={item}
              onReply={onReply}
              onLongPress={handleLongPress}
              onLike={onLike}
              userData={userData}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingBottom: isBottom ? 550 : 30,
            },
          ]}
          ListEmptyComponent={
            loading ? (
              <View>
                {[1, 2, 3, 4, 5].map((i) => (
                  <CommentSkeleton key={i} />
                ))}
              </View>
            ) : (
              <View style={{ paddingVertical: 40, alignItems: "center" }}>
                <CustomText
                  label="No comments yet"
                  fontSize={16}
                  color={COLORS.white3}
                />
              </View>
            )
          }
        />
      ) : (
        <FlashList
          ref={listRef}
          data={comments}
          keyExtractor={(item) => item._id || item.id}
          renderItem={({ item }) => (
            <CommentItem
              item={item}
              onReply={onReply}
              onLongPress={handleLongPress}
              onLike={onLike}
              userData={userData}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingBottom: isBottom ? 600 : 30,
            },
          ]}
          ListEmptyComponent={
            loading ? (
              <View>
                {[1, 2, 3, 4, 5].map((i) => (
                  <CommentSkeleton key={i} />
                ))}
              </View>
            ) : (
              <View style={{ paddingVertical: 40, alignItems: "center" }}>
                <CustomText
                  label="No comments yet"
                  fontSize={16}
                  color={COLORS.white3}
                />
              </View>
            )
          }
        />
      )}

      {/* Comment Options Modal */}
      <CommentOption
        isVisible={isOptionModalVisible}
        onClose={handleCloseOptionModal}
        displayName={
          selectedComment?.user?.first_name ||
          selectedComment?.user?.firstName ||
          "User"
        }
        username={selectedComment?.user?.username || "username"}
        userImage={selectedComment?.user?.profile?.avatar || null}
        profileColor={selectedComment?.user?.profile?.profileColor}
        commentText={selectedComment?.comment || selectedComment?.text || ""}
        isVerified={selectedComment?.user?.isVerified}
        isOwner={selectedComment?.user?._id === userData?._id}
        isPinned={selectedComment?.isPinned}
        onPinComment={() => {
          handleCloseOptionModal();
          handlePinComment(selectedComment);
        }}
        onEditComment={() => {
          handleCloseOptionModal();
          onEditComment && onEditComment(selectedComment);
        }}
        onDeleteComment={() => {
          handleCloseOptionModal();
          onDeleteComment && onDeleteComment(selectedComment);
        }}
        onHideComment={() => {
          handleCloseOptionModal();
          onHideComment && onHideComment(selectedComment);
        }}
        onHideUserComments={() => {
          handleCloseOptionModal();
          onHideUserComments && onHideUserComments(selectedComment?.user);
        }}
        onReportComment={() => {
          handleCloseOptionModal();
          onReportComment && onReportComment(selectedComment);
        }}
      />
    </View>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 14,
  },
  commentContainer: {
    marginBottom: 12,
    paddingBottom: 10,
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userRowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pinnedIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: COLORS.inputBg,
  },
  userInfo: {
    marginLeft: 8,
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  authorBadge: {
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 99,
  },
  attachmentRow: {
    marginTop: 8,
  },
  attachmentImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsLeft: {
    flexDirection: "row",
    gap: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statIcon: {
    width: 14,
    height: 14,
    tintColor: COLORS.white3,
  },
  repliesWrapper: {
    marginTop: 10,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.inputBg,
    gap: 8,
  },
  replyContainer: {
    paddingBottom: 6,
  },
  replyAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.inputBg,
  },
  replyHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
});

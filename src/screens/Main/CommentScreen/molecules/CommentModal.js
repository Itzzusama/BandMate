import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import LottieView from "lottie-react-native";
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
  const styles = createStyles();
  const [showReplies, setShowReplies] = useState(false);
  const replies = item?.replies || [];
  const hasReplies = replies.length > 0;

  const profileColor = item?.user?.profile?.profileColor || COLORS.inputBg;
  const isLiked = hasLikedReaction(item?.reactions, userData?._id);

  const firstName =
    item?.user?.first_name || item?.user?.firstName || "User";
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
            <View style={[styles.avatar, { backgroundColor: profileColor }]} />
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
          {item?.isPinned && (
            <Image
              source={Images.commentPin}
              style={[styles.pinnedIcon, { tintColor: COLORS.white }]}
            />
          )}
          <CustomText
            label={moment(item?.createdAt).fromNow()}
            fontSize={14}
            color={COLORS.white3}
          />
        </View>
      </View>

      {/* Images if available */}
      {item?.images?.length > 0 && (
        <View style={styles.imagesRow}>
          {item?.images?.map((img, idx) => (
            <View key={img?.id || idx} style={styles.imageContainer}>
              <View style={styles.imagePlaceholder}>
                {img?.isGif && (
                  <View style={styles.gifBadge}>
                    <CustomText
                      label="GIF"
                      fontSize={16}
                      color={COLORS.white}
                      fontFamily={fonts.semiBold}
                    />
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Attachment image */}
      {(item?.attachment?.url || item?.image) && (
        <View style={styles.attachmentRow}>
          <ImageFast
            isView
            source={{ uri: item?.attachment?.url || item?.image }}
            style={styles.attachmentImage}
          />
        </View>
      )}

      {/* Comment Text or Animated Emoji */}
      {item.comment?.startsWith(
        "https://fonts.gstatic.com/s/e/notoemoji/latest/",
      ) ? (
        <LottieView
          source={{ uri: item.comment }}
          autoPlay
          loop
          style={{ width: 40, height: 40, marginTop: 4 }}
        />
      ) : (
        <CustomText
          label={item.comment}
          fontSize={14}
          color={COLORS.white}
          marginTop={6}
        />
      )}

      {/* Action Row or Posting Status */}
      {item?.isPosting ? (
        <CustomText
          label="posting..."
          fontSize={12}
          color={COLORS.white3}
          marginTop={4}
          marginBottom={8}
        />
      ) : (
        <>
          {/* Reply Text */}
          <TouchableOpacity onPress={() => onReply(item)}>
            <CustomText
              label="Reply"
              fontSize={14}
              color={COLORS.white3}
              marginTop={2}
              marginBottom={6}
            />
          </TouchableOpacity>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statsLeft}>
              <TouchableOpacity
                style={styles.statItem}
                onPress={() => onLike && onLike(item)}
                activeOpacity={0.7}
              >
                <Image
                  source={isLiked ? Images.heartFill : Images.whiteHeart}
                  style={[
                    styles.statIcon,
                    { tintColor: COLORS.white3 },
                    isLiked && { tintColor: COLORS.red },
                  ]}
                />

                <CustomText
                  label={`${(item?.stats?.likes ?? item?.reactions?.length ?? 0).toLocaleString()} like${
                    (item?.stats?.likes ?? item?.reactions?.length ?? 0) == 1
                      ? ""
                      : "s"
                  }`}
                  fontSize={12}
                  color={isLiked ? COLORS.red : COLORS.white}
                  marginLeft={4}
                  fontFamily={fonts.medium}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.statItem}
                onPress={() => hasReplies && setShowReplies((prev) => !prev)}
                activeOpacity={hasReplies ? 0.7 : 1}
                disabled={!hasReplies}
              >
                <Image
                  source={Images.whiteComment}
                  style={[styles.statIcon, { tintColor: COLORS.white3 }]}
                />
                <CustomText
                  label={`${(item?.stats?.replies ?? replies.length).toLocaleString()} replies`}
                  fontSize={12}
                  color={COLORS.white}
                  fontFamily={fonts.medium}
                  marginLeft={4}
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {showReplies && hasReplies && (
        <View style={styles.repliesWrapper}>
          {replies?.map((reply, index) => (
            <ReplyItem
              key={reply?._id || reply?.id || index}
              item={reply}
              onReply={onReply}
              onLike={onLike}
              userData={userData}
            />
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const ReplyItem = ({ item, onReply, onLike, userData }) => {
  const styles = createStyles();
  const isLiked = hasLikedReaction(item?.reactions, userData?._id);

  const firstName =
    item?.user?.first_name || item?.user?.firstName || "User";
  const username = item?.user?.username || "username";
  const userAvatar = item?.user?.profile?.avatar || item?.user?.avatar;

  return (
    <View style={styles.replyContainer}>
      <View style={styles.replyUserRow}>
        {userAvatar ? (
          <ImageFast
            source={{ uri: userAvatar }}
            style={styles.replyAvatar}
          />
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
        <View style={{ flex: 1, marginLeft: 8 }}>
          <View style={styles.replyHeader}>
            <CustomText
              label={firstName}
              fontSize={13}
              color={COLORS.white}
              fontFamily={fonts.medium}
            />
            <CustomText
              label={` @${username.toLowerCase()}`}
              fontSize={11}
              color={COLORS.white3}
              marginLeft={6}
            />
          </View>
          <CustomText
            label={moment(item?.createdAt).fromNow()}
            fontSize={11}
            color={COLORS.white3}
            marginTop={2}
          />
        </View>
      </View>

      {/* Comment Text or Animated Emoji */}
      {item.comment?.startsWith(
        "https://fonts.gstatic.com/s/e/notoemoji/latest/",
      ) ? (
        <LottieView
          source={{ uri: item.comment }}
          autoPlay
          loop
          style={{ width: 40, height: 40, marginTop: 4 }}
        />
      ) : (
        <CustomText
          label={item?.comment}
          fontSize={13}
          color={COLORS.white}
          marginTop={6}
        />
      )}

      {/* Attachment image for reply */}
      {(item?.attachment?.url || item?.image) && (
        <View style={styles.attachmentRow}>
          <ImageFast
            source={{ uri: item?.attachment?.url || item?.image }}
            style={styles.attachmentImage}
          />
        </View>
      )}

      {item?.isPosting ? (
        <CustomText
          label="posting..."
          fontSize={11}
          color={COLORS.white3}
          marginTop={4}
        />
      ) : (
        <View style={[styles.statsRow, { marginTop: 8 }]}>
          <View style={styles.statsLeft}>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => onLike && onLike(item)}
              activeOpacity={0.7}
            >
              <Image
                source={isLiked ? Images.heartFill : Images.whiteHeart}
                style={[
                  styles.statIcon,
                  { tintColor: COLORS.white3 },
                  isLiked && { tintColor: COLORS.red },
                ]}
              />
              <CustomText
                label={`${(item?.stats?.likes ?? item?.reactions?.length ?? 0).toLocaleString()} likes`}
                fontSize={11}
                color={isLiked ? COLORS.red : COLORS.white}
                marginLeft={4}
                fontFamily={fonts.medium}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const CommentModal = ({
  comments: initialComments = [],
  loading = false,
  onReply,
  onLike,
  userData,
  post,
  onTabChange,
  currentTab = null,
  onEditComment,
  onDeleteComment,
  onViewProfile,
  onSendMessage,
  onReportComment,
  onHideComment,
  onHideUserComments,
  isBottomSheet = true,
  marginBottom = 0,
  isBottom = false,
}) => {
  const styles = createStyles();
  const [tab, setTab] = useState(currentTab !== null ? currentTab : 0);
  const [comments, setComments] = useState(initialComments || []);
  const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const tabNames = ["Most likes", "Most recent"];
  const listRef = useRef(null);

  const handlePinComment = async (comment) => {
    const postId = post?._id || post?.id;
    const commentId = comment?._id || comment?.id;
    if (!postId || !commentId) return;

    const newPinStatus = !comment.isPinned;

    try {
      const response = await put(`posts/${postId}/comment/${commentId}`, {
        isPinned: newPinStatus,
        comment: comment.comment,
      });

      if (response?.data?.success) {
        setComments((prev) => {
          let updatedComments = prev.map((c) => {
            if (c._id === commentId) {
              return { ...c, isPinned: newPinStatus };
            }
            if (newPinStatus && c.isPinned) {
              return { ...c, isPinned: false };
            }
            return c;
          });

          if (newPinStatus) {
            const pinned = updatedComments.find((c) => c._id === commentId);
            const remaining = updatedComments.filter(
              (c) => c._id !== commentId,
            );
            return [pinned, ...remaining];
          }

          return updatedComments;
        });
      }
    } catch (error) {
      console.error("Error pinning/unpinning comment:", error);
    }
  };

  const handleTabChange = (newTab) => {
    if (onTabChange) {
      onTabChange(newTab);
    }
  };

  useEffect(() => {
    const prevLength = comments.length;
    const nextLength = initialComments?.length || 0;
    setComments(initialComments || []);

    if (nextLength > prevLength && prevLength > 0) {
      setTimeout(() => {
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    }
  }, [initialComments]);

  useEffect(() => {
    if (currentTab !== null) {
      setTab(currentTab);
    } else {
      setTab(-1);
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
        marginTop={12}
        height={28}
        paddingHorizontal={10}
        scrollViewPaddingHorizontal={12}
      />
      <Divider marginVertical={12} thickness={1} color={COLORS.inputBg} />

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
        commentText={selectedComment?.comment || ""}
        isVerified={selectedComment?.user?.isVerified}
        userData={userData}
        commentUserId={selectedComment?.user?._id || selectedComment?.user?.id}
        isPinned={selectedComment?.isPinned}
        onPinComment={() => {
          handleCloseOptionModal();
          handlePinComment(selectedComment);
        }}
        onReply={() => {
          handleCloseOptionModal();
          onReply && onReply(selectedComment);
        }}
        onViewProfile={() => {
          handleCloseOptionModal();
          onViewProfile && onViewProfile(selectedComment?.user);
        }}
        onSendMessage={() => {
          handleCloseOptionModal();
          onSendMessage && onSendMessage(selectedComment?.user);
        }}
        onHideComment={() => {
          handleCloseOptionModal();
          onHideComment && onHideComment(selectedComment);
        }}
        onHideUserComments={() => {
          handleCloseOptionModal();
          onHideUserComments && onHideUserComments(selectedComment?.user);
        }}
        onRemoveFriend={() => {
          handleCloseOptionModal();
        }}
        onReportComment={() => {
          handleCloseOptionModal();
          onReportComment && onReportComment(selectedComment);
        }}
        onEditComment={() => {
          handleCloseOptionModal();
          onEditComment && onEditComment(selectedComment);
        }}
        onWhoCanInteract={() => {
          handleCloseOptionModal();
        }}
        onDeleteComment={() => {
          handleCloseOptionModal();
          onDeleteComment && onDeleteComment(selectedComment);
        }}
      />
    </View>
  );
};

export default CommentModal;

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.black,
    },
    listContent: {
      paddingHorizontal: 12,
    },
    commentContainer: {
      marginBottom: 12,
      paddingBottom: 12,
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
      width: 24,
      height: 24,
      tintColor: COLORS.white,
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
    imagesRow: {
      flexDirection: "row",
      gap: 8,
      marginTop: 12,
    },
    imageContainer: {
      width: 112,
      height: 112,
    },
    imagePlaceholder: {
      width: "100%",
      height: "100%",
      backgroundColor: COLORS.inputBg,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    gifBadge: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
    },
    attachmentRow: {
      marginTop: 12,
    },
    attachmentImage: {
      width: 112,
      height: 112,
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
      marginTop: 12,
      paddingLeft: 25,
      borderLeftWidth: 1,
      borderLeftColor: COLORS.inputBg,
      gap: 12,
    },
    replyContainer: {
      paddingBottom: 8,
    },
    replyUserRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    replyAvatar: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: COLORS.inputBg,
    },
    replyHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
  });

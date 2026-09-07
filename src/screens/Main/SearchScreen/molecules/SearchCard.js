import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import Divider from "../../../../components/Divider";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const SearchCard = ({
  isChange,
  user,
  following,
  onFollow,
  onUnfollow,
  isRequestsTab,
  onAccept,
  onReject,
  isAccepting,
  isRejecting,
  item,
  onPress,
}) => {
  const navigation = useNavigation();

  if (!user && isChange) return null;

  const userFirstName =
    user?.first_name ||
    user?.firstName ||
    user?.profile?.first_name ||
    user?.profile?.firstName ||
    "";
  const userLastName =
    user?.sur_name ||
    user?.surname ||
    user?.last_name ||
    user?.lastName ||
    user?.profile?.sur_name ||
    user?.profile?.surname ||
    user?.profile?.last_name ||
    user?.profile?.lastName ||
    "";
  const userFullName =
    `${userFirstName} ${userLastName}`.trim() ||
    user?.displayName ||
    user?.profile?.displayName ||
    user?.name ||
    user?.username ||
    user?.userName ||
    "User";

  const postTopic = item?.tag || "Topic";
  const postStats = item?.stats?.impressions || 0;
  const postDaily = item?.count || 0;

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          paddingVertical: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ImageFast
          source={
            isChange
              ? user?.profile?.avatar
                ? { uri: user.profile.avatar }
                : user?.profilePicture
                ? { uri: user?.profilePicture }
                : undefined
              : Images.PostDemo
          }
          style={{
            height: 56,
            width: 56,
            borderRadius: isChange ? 99 : 12,
            backgroundColor:
              isChange && !user?.profile?.avatar && !user?.profilePicture
                ? user?.profile?.profileColor || COLORS.inputBg
                : undefined,
          }}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={isChange && styles.row}>
            <CustomText
              label={isChange ? userFullName : postTopic}
              fontFamily={fonts.medium}
              fontSize={14}
              color={COLORS.white}
            />
            {isChange && (
              <View style={[styles.row, { gap: 2 }]}>
                {user?.role === "individual" && (
                  <Image
                    source={Images.verified}
                    style={{ height: 14, width: 14 }}
                  />
                )}
                {user?.role === "company" && (
                  <Image
                    source={Images.goldenStar}
                    style={{ height: 12, width: 12 }}
                  />
                )}
                <View
                  style={[
                    styles.userContainer,
                    { backgroundColor: COLORS.inputBg },
                  ]}
                >
                  <CustomText
                    label={
                      isChange
                        ? `@${user?.username || user?.userName || "user"}`
                        : "12.5K posts"
                    }
                    color={COLORS.gray1}
                    fontSize={10}
                  />
                </View>
              </View>
            )}
          </View>
          <View style={styles.row}>
            {isChange && (
              <CustomText
                label={user?.occupation?.jobTitle || "Member"}
                fontSize={12}
                color={COLORS.gray1}
              />
            )}
            {isChange && (
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: COLORS.gray1,
                  },
                ]}
              />
            )}

            <CustomText
              label={
                isChange ? `${user?.followersCount || 0}` : `${postStats} posts`
              }
              fontSize={isChange ? 10 : 12}
              color={COLORS.gray1}
            />
            {isChange && (
              <Image
                source={Images.friendGray}
                style={[
                  styles.icon,
                  {
                    tintColor: COLORS.white,
                  },
                ]}
              />
            )}
          </View>
          {isChange ? (
            <View style={styles.row}>
              {user?.industry?.slice(0, 3).map((industry, index) => (
                <View style={styles.row} key={index}>
                  <CustomText
                    label={industry}
                    fontSize={10.2}
                    color={COLORS.gray1}
                    textTransform={"capitalize"}
                  />
                  {index < 2 && (
                    <View
                      style={[
                        styles.dot,
                        {
                          backgroundColor: COLORS.gray1,
                        },
                      ]}
                    />
                  )}
                </View>
              ))}
            </View>
          ) : (
            <CustomText
              label={`${postDaily} total posts`}
              fontSize={12}
              color={COLORS.gray1}
            />
          )}
        </View>
        {isChange ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            {isRequestsTab ? (
              <>
                {isRejecting ? (
                  <ActivityIndicator size="small" color={COLORS.btnColor} />
                ) : (
                  <ImageFast
                    removeLoading
                    onPress={() => onReject?.(user?._id, userFullName)}
                    source={Images.crossBg}
                    style={styles.actionIcon}
                  />
                )}
                {isAccepting ? (
                  <ActivityIndicator size="small" color={COLORS.btnColor} />
                ) : (
                  <ImageFast
                    removeLoading
                    onPress={() => onAccept?.(user?._id, userFullName)}
                    source={Images.plusGrayBg}
                    style={styles.actionIcon}
                  />
                )}
              </>
            ) : (
              <>
                <ImageFast
                  removeLoading
                  onPress={() =>
                    navigation.navigate("InboxScreen", {
                      recipientId: user?._id,
                      recipientName: userFullName,
                      otherUser: user,
                    })
                  }
                  source={Images.MyChat}
                  style={styles.messageIcon}
                />
                <ImageFast
                  removeLoading
                  onPress={() => {
                    if (following) {
                      onUnfollow?.(user?._id, userFullName);
                    } else {
                      onFollow?.(user?._id, userFullName);
                    }
                  }}
                  source={following ? Images.unFollowButton : Images.plusGrayBg}
                  style={styles.actionIcon}
                />
              </>
            )}
          </View>
        ) : (
          <Icons
            name={"chevron-forward-outline"}
            family={"Ionicons"}
            color={COLORS.gray1}
            size={22}
          />
        )}
      </TouchableOpacity>
      <Divider marginVertical={8} />
    </>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  userContainer: {
    padding: 4,
    backgroundColor: COLORS.inputBg,
    borderRadius: 99,
    marginLeft: 2,
  },
  icon: {
    height: 12,
    width: 12,
  },
  dot: {
    height: 4,
    width: 4,
    backgroundColor: COLORS.gray1,
    borderRadius: 99,
    marginHorizontal: 4,
  },
  actionIcon: {
    height: 40,
    width: 40,
  },
  messageIcon: {
    height: 22,
    width: 22,
    marginRight: 4,
  },
});

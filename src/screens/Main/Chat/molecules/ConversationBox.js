import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const ConversationBox = ({ item }) => {
  const navigation = useNavigation();

  const otherUser = item?.otherUser;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("InboxScreen", {
          recipientId: otherUser?._id,
          recipientName: otherUser?.name,
        })
      }
    >
      <ImageFast
        source={Images.ChatUserProfile}
        style={item?.isRequest ? styles.avatarRequest : styles.avatar}
      />
      <View style={styles.textBox}>
        <View>
          {item?.isRequest && item?._id === 1 && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.requestbadge}>
                  <CustomText
                    fontSize={12}
                    label="Looking for Jam Session"
                    fontFamily={fonts.medium}
                    numberOfLines={1}
                    color={COLORS.white}
                  />
                </View>
                <View style={styles.turn}>
                  <CustomText
                    label={"Your Turn"}
                    fontSize={10}
                    alignSelf={"flex-end"}
                    numberOfLines={1}
                    color={COLORS.white}
                    fontFamily={fonts.semiBold}
                  />
                </View>
              </View>
            </>
          )}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <CustomText
                  fontSize={16}
                  label={otherUser?.name}
                  fontFamily={fonts.medium}
                />
                {item?.isRequest && item?._id === 1 && (
                  <>
                    <ImageFast
                      source={Images.GreyVerified}
                      resizeMode={"contain"}
                      style={styles.verified}
                    />
                    <ImageFast
                      source={Images.PscStart}
                      resizeMode={"contain"}
                      style={styles.verified}
                    />
                  </>
                )}
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                {item?.isRequest && item?._id === 1 && (
                  <View style={styles.Newdot} />
                )}
                <CustomText
                  color={COLORS.white3}
                  fontFamily={fonts.medium}
                  label={item?.lastMessage?.content}
                />
                {item?.isRequest && item?._id === 1 && (
                  <>
                    <View style={styles.separatDot} />
                    <Icons
                      name={"checkmark-done"}
                      family={"Ionicons"}
                      size={11}
                      color={COLORS.white}
                    />
                  </>
                )}
              </View>
            </View>
            {item?.isRequest && item?._id === 1 && (
              <View>
                <CustomText
                  label={"10:55 PM"}
                  fontSize={12}
                  alignSelf={"flex-end"}
                  numberOfLines={1}
                  color={COLORS.white3}
                  fontFamily={fonts.medium}
                />
                <View style={styles.count}>
                  <CustomText
                    label={"12"}
                    fontSize={10}
                    alignSelf={"flex-end"}
                    numberOfLines={1}
                    color={COLORS.white}
                    fontFamily={fonts.medium}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.row}>
        {!item?.isRequest && (
          <View style={styles.badge}>
            <CustomText
              label={10}
              fontSize={10}
              numberOfLines={1}
              color={COLORS.white}
              fontFamily={fonts.medium}
            />
          </View>
        )}

        {!item?.isRequest && (
          <TouchableOpacity>
            <Icons
              size={20}
              family={"Entypo"}
              name={"chevron-right"}
              color={COLORS.white3}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ConversationBox;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#262626",
    paddingHorizontal: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  avatarRequest: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#1ED760",
  },

  textBox: {
    flex: 1,
    marginLeft: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EE1045",
  },

  requestbadge: {
    backgroundColor: "#262626",
    borderRadius: 4,
    paddingHorizontal: 4,
    alignSelf: "flex-start",
  },

  verified: {
    height: 12,
    width: 12,
  },

  Newdot: {
    width: 8,
    height: 8,
    borderRadius: 3,
    backgroundColor: "#A19375",
  },
  separatDot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: "#FFFFFF7A",
  },

  yourTurn: {
    backgroundColor: "#262626",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 100,
    alignSelf: "flex-end",
  },

  count: {
    backgroundColor: "#FFFFFF29",
    padding: 2,
    borderRadius: 2,
    alignSelf: "flex-end",
    marginTop: 5,
  },

  turn: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 100,
    alignSelf: "flex-end",
    backgroundColor: "#262626",
  },
});

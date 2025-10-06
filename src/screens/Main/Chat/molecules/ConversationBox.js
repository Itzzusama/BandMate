import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";
import Icons from "../../../../components/Icons";

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
      <ImageFast source={Images.user} style={styles.avatar} />
      <View style={styles.textBox}>
        <View>
          <CustomText
            fontSize={16}
            lineHeight={16 * 1.4}
            label={otherUser?.name}
            fontFamily={fonts.medium}
          />
          <CustomText
            lineHeight={14 * 1.4}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
            label={item?.lastMessage?.content}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.badge}>
            <CustomText
              label={10}
              fontSize={10}
              numberOfLines={1}
              color={COLORS.white}
              lineHeight={10 * 1.4}
              fontFamily={fonts.medium}
            />
          </View>
          <TouchableOpacity>
            <Icons
              size={20}
              family={"Entypo"}
              name={"chevron-right"}
              color={COLORS.subtitle}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ConversationBox;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },

  textBox: {
    flex: 1,
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
});

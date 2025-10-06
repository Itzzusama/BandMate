import moment from "moment";
import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import Icons from "../../../../components/Icons";

const ChatBubble = ({ isSender, item }) => {
  const bg = isSender ? COLORS.lightGray : COLORS.black;
  const messageTime = moment(item.createdAt).format("h:mm A");

  return (
    <View
      style={[styles.mainContainer, isSender ? styles.sender : styles.receiver]}
    >
      <View style={[styles.messageContainer, { backgroundColor: bg }]}>
        <CustomText
          label={item?.content}
          lineHeight={14 * 1.4}
          fontFamily={fonts.medium}
          color={isSender ? COLORS.black : COLORS.white}
        />
      </View>
      <View style={styles.row}>
        <Icons name={"checkmark-done-sharp"} />
        <CustomText
          fontSize={12}
          lineHeight={14 * 1.4}
          alignSelf={"flex-end"}
          color={COLORS.subtitle}
          label={"04:45 pm - Mar 12, 2025"}
        />
        <View style={styles.line} />
        <Icons
          size={12}
          name={"lock-outline"}
          color={COLORS.subtitle}
          family={"MaterialIcons"}
        />
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 10,
    alignItems: "flex-end",
  },
  messageContainer: {
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
    maxWidth: "70%",
  },
  sender: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  receiver: {
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    marginTop: 7,
  },
  line: {
    backgroundColor: "rgba(18, 18, 18, 0.16)",
    width: 1,
    height: 12,
  },
});

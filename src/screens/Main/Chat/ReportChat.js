import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import CustomButton from "../../../components/CustomButton";

const InfoBox = ({ title }) => (
  <View style={styles.info}>
    <Icons name={"info"} family={"Feather"} size={12} color={COLORS.subtitle} />
    <CustomText
      fontSize={12}
      label={title}
      lineHeight={12 * 1.4}
      textTransform={"none"}
      color={COLORS.subtitle}
    />
  </View>
);

const ReportChat = () => {
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Submit a report"} />}
    >
      <View style={styles.topRow}>
        <View style={styles.stepBox}>
          <CustomText label={"1"} fontFamily={fonts.medium} fontSize={12} />
        </View>
        <View style={styles.line} />
        <View style={styles.stepBox}>
          <CustomText label={"2"} fontFamily={fonts.medium} fontSize={12} />
        </View>
      </View>
      <CustomText
        fontSize={16}
        label={"Author"}
        lineHeight={1.4 * 16}
        fontFamily={fonts.medium}
      />
      <View style={styles.userBox}>
        <ImageFast source={Images.user1} style={styles.avatar} />
        <View>
          <CustomText
            fontSize={16}
            label={"User name"}
            lineHeight={1.4 * 16}
            fontFamily={fonts.semiBold}
          />
          <CustomText
            lineHeight={1.4 * 14}
            label={"Solo Artist"}
            color={COLORS.subtitle}
          />
        </View>
      </View>
      <CustomText
        fontSize={16}
        lineHeight={1.4 * 16}
        textTransform={"none"}
        label={"Select a reason"}
        fontFamily={fonts.medium}
      />
      <View style={styles.dropdown}>
        <View>
          <CustomText
            fontSize={16}
            lineHeight={1.4 * 16}
            label={"Adult content"}
            fontFamily={fonts.medium}
          />
          <CustomText
            lineHeight={1.4 * 14}
            color={COLORS.subtitle}
            label={"Inappropriate images/videos shared."}
          />
        </View>
        <TouchableOpacity>
          <Icons name={"chevron-down"} family={"Entypo"} size={22} />
        </TouchableOpacity>
      </View>
      <InfoBox
        title={"Please select the reason that suits better the situation."}
      />
      <CustomText
        fontSize={16}
        marginTop={15}
        label={"Add a Note"}
        textTransform={"none"}
        lineHeight={1.4 * 16}
        fontFamily={fonts.semiBold}
      />
      <TextInput
        multiline
        style={styles.input}
        cursorColor={COLORS.black}
        placeholder={"e.g. Here is exactly what happened..."}
      />
      <InfoBox title={"Maximum 0/500 characters."} />
      <InfoBox title={"Please motivate the reason for your report."} />
      <CustomText
        fontSize={16}
        marginTop={15}
        lineHeight={1.4 * 16}
        textTransform={"none"}
        label={"Are you human?"}
        fontFamily={fonts.semiBold}
      />
      <ImageFast source={Images.humanVerification} style={styles.hand} />
      <CustomButton title={"Confirm"} marginTop={"25%"} />
      <CustomText
        fontSize={12}
        marginTop={10}
        marginBottom={20}
        alignSelf={"center"}
        lineHeight={12 * 1.4}
        textTransform={"none"}
        color={COLORS.subtitle}
        label={"🤝 Thank you for keeping move a safe space."}
      />
    </ScreenWrapper>
  );
};

export default ReportChat;

const styles = StyleSheet.create({
  stepBox: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
  },
  topRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    columnGap: 10,
    marginTop: 7,
    marginBottom: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 15,
  },
  userBox: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dropdown: {
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightGray,
    paddingVertical: 8,
  },
  info: {
    alignItems: "center",
    flexDirection: "row",
    columnGap: 5,
    marginTop: 6,
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    height: 104,
    paddingHorizontal: 12,
    textAlignVertical: "top",
    paddingVertical: 5,
    marginTop: 12,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  hand: {
    width: 64,
    height: 64,
    marginTop: 10,
  },
  footer: {
    paddingHorizontal: 12,
    marginBottom: 10,
  },
});

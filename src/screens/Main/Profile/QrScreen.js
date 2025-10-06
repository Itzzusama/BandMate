import { StyleSheet, Image, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../utils/COLORS";
import { Images } from "../../../assets/images";
import ImageFast from "../../../components/ImageFast";
import { useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import { PNGIcons } from "../../../assets/images/icons";

const QrScreen = () => {
  const { userData } = useSelector((state) => state.users);

  return (
    <ScreenWrapper headerUnScrollable={() => <Header title={"Qr Code"} />}>
      <CustomText
        label={
          userData?.nameDisplayPreference === "sur"
            ? userData?.sur_name || "Viktor"
            : userData?.first_name || "Sola"
        }
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        alignSelf={"center"}
        marginTop={18}
      />

      <View style={styles.usernamePill}>
        <CustomText
          label={userData?._id || "username"}
          fontSize={12}
          color={COLORS.primaryColor}
        />
        <ImageFast
          removeLoading
          source={Images.copy}
          style={{ width: 14, height: 14, marginLeft: 6 }}
        />
      </View>

      <View style={styles.imgBg}>
        <ImageFast source={Images.UserDemo} style={styles.userImage} />
        <View style={styles.qrBg}>
          <QRCode value={(userData?._id || "").toString()} size={156} />
        </View>
      </View>

      <View style={styles.footer}>
        <ImageFast
          removeLoading
          source={PNGIcons.copyLink}
          style={styles.icon}
        />
        <ImageFast
          removeLoading
          source={PNGIcons.shareBg}
          style={styles.icon}
        />
        <ImageFast removeLoading source={PNGIcons.chatBg} style={styles.icon} />
      </View>
    </ScreenWrapper>
  );
};

export default QrScreen;

const styles = StyleSheet.create({
  imgBg: {
    padding: 12,
    backgroundColor: COLORS.lightGray,
    borderRadius: 32,
    gap: 8,
    alignSelf: "center",
  },
  userImage: {
    height: 216,
    width: 216,
    borderRadius: 24,
  },
  qrBg: {
    height: 216,
    width: 216,
    borderRadius: 24,
    padding: 26,
    backgroundColor: COLORS.white,
  },
  footer: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  icon: {
    height: 48,
    width: 48,
  },
  usernamePill: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    height: 28,
    borderRadius: 99,
    paddingHorizontal: 12,
    marginTop: 16,
    marginBottom: 24,
  },
});

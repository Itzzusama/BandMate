import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Images } from "../../../../assets/images";
import { Image } from "react-native";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomButton from "../../../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import ImageFast from "../../../../components/ImageFast";
const UsersInfo = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.users.userData);

  return (
    <View style={styles.container}>
      <ImageFast
        isView
        source={user?.pictures[0] ? { uri: user?.pictures[0] } : Images.user}
        style={styles.avatar}
      />
      <CustomText
        label={`Hi ${
          user?.role == "solo" ? user?.display_name : user?.bandName || "Victor"
        }`}
        fontFamily={fonts.medium}
        fontSize={32}
        lineHeight={32 * 1.4}
        marginTop={10}
      />
      <View style={styles.row}>
        <CustomText
          label={`Hi ${
            user?.role == "solo"
              ? user?.display_name
              : user?.bandName || "username"
          }`}
          fontFamily={fonts.medium}
          lineHeight={14 * 1.4}
          color={COLORS.white3}
          marginRight={4}
        />
        <Image source={PNGIcons.scan} style={styles.icon} />
      </View>
      <CustomButton
        title={"View My Page"}
        width={128}
        height={40}
        onPress={() =>
          navigation.navigate("Detail", {
            myPage: true,
            images: user?.pictures?.length > 0 ? user?.pictures : [Images.user],
          })
        }
        backgroundColor={COLORS.cardColor}
        marginTop={20}
        customText={{
          fontSize: 14,
          fontFamily: fonts.medium,
          color: COLORS.btnColor,
        }}
      />
    </View>
  );
};

export default UsersInfo;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    paddingVertical: 32,
    alignItems: "center",
  },
  avatar: {
    height: 85,
    width: 85,
    borderRadius: 99,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  icon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
});

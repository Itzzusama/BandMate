import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";

const ProfileCard = () => {
  return (
    <View style={styles.profileWrapper}>
      <View style={styles.story}>
        <ImageBackground
          source={Images.buzz}
          style={styles.icon}
          resizeMode="contain"
        >
          <TouchableOpacity
            style={styles.iconBox}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("QrScreen")}
          >
            <Icons name="qr-code-2" family="MaterialIcons" size={20} />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={styles.info}>
        <CustomText
          label={"Victor Sola"}
          fontSize={18}
          fontFamily={fonts.medium}
        />
        <View style={styles.ratingRow}>
          <View style={styles.ratingBadge}>
            <Icons
              name="star"
              family="AntDesign"
              size={12}
              color={COLORS.black}
            />
            <CustomText
              label="5.0"
              fontSize={12}
              fontFamily={fonts.semiBold}
              color={COLORS.black}
              marginLeft={5}
              marginTop={3}
            />
          </View>
          <CustomText
            label="125 Reviews"
            fontSize={12}
            fontFamily={fonts.regular}
            color={"#121212CC"}
          />
        </View>
        <View style={[styles.ratingRow, { marginTop: 7 }]}>
          <Icons
            name="mark-email-read"
            family="MaterialIcons"
            size={16}
            color={COLORS.black}
          />
          <CustomText
            label={"vsola@sola-group.ch"}
            fontSize={14}
            lineHeight={14 * 1.4}
            textDecorationLine={"underline"}
            fontFamily={fonts.medium}
            color={COLORS.black}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("EditProfile")}
        activeOpacity={0.6}
        style={styles.edit}
      >
        <Icons
          name="mode-edit"
          family="MaterialIcons"
          size={20}
          color={COLORS.black}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 16,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 15,
  },
  story: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.inputBg,
    padding: 3,
    borderColor: COLORS.inputBg,
    borderWidth: 2,
    borderRadius: 99,
    marginRight: 10,
  },
  profileWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
  },
  icon: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: COLORS.inputBg,
  },
  edit: {
    height: 48,
    width: 48,
    borderRadius: 99,
    backgroundColor: COLORS.inputBg,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingBadge: {
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 6,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  adBg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    paddingVertical: 20,
    marginTop: 20,
    height: 140,
  },
  arrowIcon: {
    backgroundColor: COLORS.white,
    width: 56,
    height: 56,
    padding: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: {
    borderRadius: 8,
    height: 32,
    width: 32,
    backgroundColor: "white",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

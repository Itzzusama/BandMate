import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { PNGIcons } from "../../../assets/images/icons";
import { COLORS } from "../../../utils/COLORS";
import Icons from "../../../components/Icons";
import CustomSwitch from "../../../components/CustomSwitch";

const Security = () => {
  const navigation = useNavigation();
  const tabs = [
    {
      id: 1,
      name: "Change Password",
      onPress: () => navigation.navigate("ChangePassword"),
    },
    {
      id: 2,
      name: "Change PIN Code",
      onPress: () => navigation.navigate("ChangePinCode"),
    },
  ];
  const tabs1 = [
    {
      id: 1,
      name: "Login",
      sub: "When entering the app",
      onPress: () => navigation.navigate("ReferApp"),
    },
    {
      id: 2,
      name: "Payments",
      sub: "When proceeding with payments",
      onPress: () => navigation.navigate("ReferApp"),
    },
    {
      id: 3,
      name: "Chat",
      sub: "When entering the Chat section",
      onPress: () => navigation.navigate("ReferApp"),
    },
  ];
  return (
    <ScreenWrapper headerUnScrollable={() => <Header title={"Security"} />}>
      <View style={styles.bg}>
        {tabs.map((tab, i) => (
          <View>
            <TouchableOpacity
              onPress={tab?.onPress}
              key={i}
              activeOpacity={0.9}
              style={styles.card}
            >
              <Image
                source={PNGIcons.idCard}
                style={{ height: 32, width: 32 }}
              />

              <View style={[styles.textContainer, { marginHorizontal: 12 }]}>
                <CustomText
                  label={tab?.name}
                  fontSize={18}
                  lineHeight={18 * 1.4}
                  fontFamily={fonts.medium}
                />
              </View>

              <View style={styles.rightIcon}>
                <Icons
                  name="chevron-right"
                  family="Entypo"
                  size={22}
                  color={COLORS.gray}
                />
              </View>
            </TouchableOpacity>
            {!(i === tabs.length - 1) && (
              <View
                style={{
                  marginHorizontal: -16,
                  borderWidth: 1,
                  borderColor: COLORS.inputBg,
                }}
              />
            )}
          </View>
        ))}
      </View>

      <CustomText
        label={"Use My PIN Code For"}
        fontSize={18}
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
      />

      {tabs1.map((tab, index) => (
        <View key={index} style={styles.card1}>
          <View style={styles.textContainer}>
            <CustomText
              label={tab?.name}
              fontSize={16}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
            />
            <CustomText
              label={tab?.sub}
              fontSize={14}
              lineHeight={14 * 1.4}
              fontFamily={fonts.medium}
              color={COLORS.gray2}
            />
          </View>

          <CustomSwitch value bgColor={COLORS.darkPurple} />
        </View>
      ))}
    </ScreenWrapper>
  );
};

export default Security;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.inputBg,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  bg2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: COLORS.inputBg,
    padding: 14,
    borderRadius: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  card1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
  icon: {
    backgroundColor: COLORS.low,
    width: 32,
    height: 32,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  rightIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});

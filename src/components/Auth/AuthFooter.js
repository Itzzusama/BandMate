import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../CustomButton";
import CustomText from "../CustomText";
import Icons from "../Icons";

import { PNGIcons } from "../../assets/images/icons";
import { COLORS } from "../../utils/COLORS";
import fonts from "../../assets/fonts";

const AuthFooter = ({
  onPress,
  marginTop,
  onBackPress,
  isMain,
  title,
  btnTitle,
  loading,
  btnLoading,
  marginBottom,
  btnDisabled,
  secondText,
  btnSize,
  btnFamily,
  titleSize = 14,
  isCalender = false,
  isBoarder,
  secondBorderColor,
  btnBackgroundColor,
  textColor,
  iconColor = COLORS.primaryColor,
  iconBackgroundColor,
  paddingHorizontal,
  backImage,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.mainContainer,
        { marginTop, marginBottom, paddingHorizontal: paddingHorizontal },
      ]}
    >
      <View style={styles.row}>
        <TouchableOpacity
          onPress={
            onBackPress
              ? onBackPress
              : () => navigation.canGoBack() && navigation.goBack()
          }
          style={[styles.backButton, { backgroundColor: COLORS.inputBg }]}
        >
          <Image
            source={backImage || PNGIcons.ovalBack}
            style={{ height: 48, width: 48 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <CustomButton
          title={btnTitle || "Continue"}
          width={isCalender ? "70%" : "84%"}
          onPress={onPress}
          loading={loading || btnLoading}
          disabled={btnDisabled}
          secondText={secondText}
          fontSize={btnSize || 14}
          fontFamily={btnFamily}
          isBoarder={isBoarder}
          backgroundColor={btnBackgroundColor}
          secondBorderColor={secondBorderColor}
        />
        {isCalender ? (
          <TouchableOpacity
            style={[styles.backButton, { marginRight: 0, marginLeft: 8 }]}
          >
            <Image
              source={PNGIcons.calender}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View
        style={[
          styles.row,
          { alignSelf: "center", marginVertical: 10, marginTop: 6 },
        ]}
      >
        {!isMain && (
          <Icons
            name={"info"}
            family={"Feather"}
            size={16}
            marginRight={4}
            color={COLORS.gray2}
          />
        )}

        {isMain ? (
          <CustomText
            label={title}
            color={textColor || COLORS.gray5}
            fontSize={titleSize}
            lineHeight={titleSize * 1.4}
            fontFamily={fonts.medium}
            textAlign="center"
          />
        ) : (
          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.regular,
              color: COLORS.gray2,
              lineHeight: 20,
            }}
          >
            {`By pressing "`}
            <Text style={styles.darkText}> Continue</Text>
            {`" you agree with`}
            <Text style={[styles.darkText]}> BandMate </Text>
            <Text
              style={[styles.darkText, { textDecorationLine: "underline" }]}
            >
              TOS.
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
};

export default AuthFooter;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 12,
    shadowColor: "#121212",
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  backButton: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
    marginRight: 8,
    backgroundColor: COLORS.inputBg,
  },
  darkText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: COLORS.primaryColor,
  },
});

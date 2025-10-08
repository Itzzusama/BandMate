import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomText from "./CustomText";
import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";
import fonts from "../assets/fonts";
import { PNGIcons } from "../assets/images/icons";
import CustomButton from "./CustomButton";

const Header = ({
  title,
  hideBackArrow,
  onBackPress,
  textColor,
  backgroundColor,
  marginTop,
  fontFamily,
  marginBottom,
  textAlign,
  isClear,
  onClearPress,
  onHelpPress,
  rightIcon,
  borderWidth,
  borderColor,
  iconBackgroundColor,
  isImage,
  onCartPress,
  paddingTop,
  secondText,
  btnTitle,
  btn,
}) => {
  const navigation = useNavigation();

  const canGoBack = () => {
    try {
      return navigation.canGoBack();
    } catch (error) {
      console.log("canGoBack error:", error);
      return false;
    }
  };

  const handleGoBack = () => {
    try {
      if (canGoBack()) {
        navigation.goBack();
      }
    } catch (error) {
      console.log("goBack error:", error);
    }
  };

  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor,
          marginTop,
          marginBottom,
          paddingTop: paddingTop || 18,
        },
      ]}
    >
      <View style={styles.row}>
        {hideBackArrow ? null : (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.backIcon,
              {
                backgroundColor: iconBackgroundColor || COLORS.inputBg,
                borderWidth,
                borderColor,
              },
            ]}
            onPress={onBackPress ? onBackPress : handleGoBack}
          >
            <Icons
              name="keyboard-arrow-left"
              family="MaterialIcons"
              size={20}
              color={textColor || COLORS.primaryColor}
            />
          </TouchableOpacity>
        )}
        {isImage && (
          <Image
            source={isImage}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              marginRight: 16,
            }}
          />
        )}

        <CustomText
          label={title}
          color={textColor ? textColor : COLORS.white}
          fontFamily={fontFamily || fonts.semiBold}
          textTransform="capitalize"
          textAlign={textAlign}
          fontSize={24}
          lineHeight={24 * 1.4}
        />

        <View
          style={{
            backgroundColor: COLORS.btnColor,
            height: 20,
            width: 20,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 6,
            borderRadius: 99,
          }}
        >
          <CustomText
            label={secondText}
            color={COLORS.black}
            fontFamily={fonts.medium}
            textAlign={textAlign}
            lineHeight={14 * 1.4}
          />
        </View>
      </View>
      <View style={styles.row}>
        {onHelpPress ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onHelpPress}
            style={styles.help}
          >
            <CustomText
              label="Help"
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={16 * 1.4}
              marginRight={6}
              marginTop={-3}
            />
            <Icons name="help-circle" family="Feather" size={18} />
          </TouchableOpacity>
        ) : onCartPress ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onCartPress}
            style={styles.cart}
          >
            <CustomText
              label="My Cart"
              fontWeight={500}
              color={COLORS.black}
              lineHeight={14 * 1.4}
              fontFamily={fonts.semiBold}
            />
            <Image
              source={PNGIcons.bag}
              tintColor={COLORS.black}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        ) :null}
        {isClear ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onClearPress}
            style={styles.clear}
          >
            <CustomText
              label={btnTitle||"Clear All"}
              color={COLORS.btnColor}
              fontFamily={fonts.medium}
              fontSize={14}
              lineHeight={14 * 1.4}
            />
          </TouchableOpacity>
        ) : null}
        {rightIcon}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  backIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  help: {
    flexDirection: "row",
    alignContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: COLORS.inputBg,
    borderRadius: 100,
  },
  cart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    padding: 10,
    backgroundColor: COLORS.inputBg,
    borderRadius: 100,
  },

  clear: {
    backgroundColor: "#1D1D1A",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 100,
    height: 32,
  },
});

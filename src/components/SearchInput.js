import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Icons from "./Icons";
import fonts from "../assets/fonts";
import { PNGIcons } from "../assets/images/icons";
import { COLORS } from "../utils/COLORS";
import CustomText from "./CustomText";
import { Images } from "../assets/images";

const SearchInput = ({
  placeholder,
  value,
  onChangeText,
  maxLength,
  marginBottom,
  isFocus,
  isBlur,
  autoFocus,
  ref,
  marginTop,
  isBack,
  onPress,
  editable,
  elevation,
  withLabel,
  isCross,
  CrossPress,
  CrossPressBack,
  isChange,
  CameraPress,
  borderRadius = 99,
  isClear,
  source,
  height,
  width,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();

  const handleFocus = () => {
    setIsFocused(true);
    isFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    isBlur?.();
  };

  const showInnerCross = isCross && value?.trim()?.length > 0;

  return (
    <View style={{ flexDirection: "row", alignItems: "center", width, gap: 8 }}>
      {withLabel && (
        <CustomText
          label={withLabel}
          fontFamily={fonts.medium}
          fontSize={18}
          marginBottom={4}
        />
      )}
      <View
        style={[
          styles.mainContainer,
          {
            marginBottom,
            marginTop,
            borderColor: isFocused ? COLORS.white : COLORS.inputBg,
            elevation,
            borderRadius,
            height: height || 46,
          },
        ]}
      >
        {isBack && (
          <Icons
            family="Ionicons"
            name="arrow-back-outline"
            color={COLORS.white}
            size={25}
            style={{ marginRight: 10 }}
            onPress={() => navigation.goBack()}
          />
        )}

        {/* Search Icon */}
        <TouchableOpacity
          disabled
          style={styles.searchIcon}
          activeOpacity={0.6}
          onPress={onPress}
        >
          <Icons
            family="Ionicons"
            name="search"
            color={COLORS.white3}
            size={20}
          />
        </TouchableOpacity>

        {/* Input */}
        <TextInput
          ref={ref}
          placeholder={placeholder}
          style={[
            styles.input,
            {
              fontFamily: value ? fonts.medium : fonts.regular,
            },
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          cursorColor={COLORS.btnColor}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          placeholderTextColor={COLORS.white3}
          autoFocus={autoFocus}
          editable={editable}
        />

        {/* Inner Cross when text is present */}
        {showInnerCross && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={CrossPress || (() => onChangeText?.(""))}
          >
            <Image
              source={PNGIcons.crossBg || Images.crossGray}
              style={{ height: 22, width: 22 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {/* Optional Camera button */}
        {isChange && CameraPress && (
          <TouchableOpacity
            onPress={CameraPress}
            style={styles.inlineIcon}
            activeOpacity={0.6}
          >
            <Icons
              family="Feather"
              name="camera"
              size={22}
              color={COLORS.gray1}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* External Back / Cross button if CrossPressBack is supplied */}
      {isCross && CrossPressBack && (
        <TouchableOpacity
          onPress={CrossPressBack}
          style={{ overflow: "hidden", borderRadius: 99 }}
        >
          <Image
            source={source || Images.crossBg}
            style={{
              height: 44,
              width: 44,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.cardColor,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 48,
    borderRadius: 12,

    flex: 1,
  },
  input: {
    flex: 1,
    height: "100%",
    padding: 0,
    margin: 0,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: COLORS.primaryColor,
    marginLeft: 5,
  },
  searchIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  inlineIcon: {
    marginLeft: 5,
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.cardColor,
  },
});

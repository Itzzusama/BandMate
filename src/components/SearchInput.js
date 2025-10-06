import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
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
  isChange, // 🔹 new prop
  CameraPress, // 🔹 optional handler
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

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            borderColor: isFocused ? COLORS.primaryColor : "#F2F2F2",
            elevation,
          },
        ]}
      >
        {isBack && (
          <Icons
            family="Ionicons"
            name="arrow-back-outline"
            color="#0F1621"
            size={25}
            style={{ marginRight: 10 }}
            onPress={() => navigation.goBack()}
          />
        )}

        {/* Search Icon */}
        <TouchableOpacity
          disabled
          style={[
            styles.searchIcon,
            isChange && {
              backgroundColor: COLORS.darkPurple,
              width: 36,
              height: 36,
              borderRadius: 99,
              marginRight: 10,
              marginLeft: -5,
            },
          ]}
          activeOpacity={0.6}
          onPress={onPress}
        >
          <Icons
            family="Feather"
            name="search"
            color={isChange ? "#fff" : COLORS.primaryColor}
            size={20}
          />
        </TouchableOpacity>

        {/* Input */}
        <TextInput
          ref={ref}
          placeholder={placeholder}
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          placeholderTextColor={COLORS.gray2}
          autoFocus={autoFocus}
          editable={editable}
        />

        {/* If isChange is true → show Cross + Camera inside */}
        {isChange && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isCross && (
              <TouchableOpacity onPress={CrossPress} activeOpacity={0.6}>
                <Image
                  source={PNGIcons.crossBg}
                  style={{ height: 22, width: 22, marginTop: 2 }}
                />
              </TouchableOpacity>
            )}
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
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.inputBg,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 46,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: COLORS.gray1,
    flex: 1,
  },
  input: {
    flex: 1,
    height: "100%",
    padding: 0,
    margin: 0,
    fontFamily: fonts.medium,
    fontSize: 16,
    color: COLORS.primaryColor,
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
    backgroundColor: COLORS.lightGray,
  },
});

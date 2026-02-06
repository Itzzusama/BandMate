import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import CustomText from "./CustomText";
import Icons from "./Icons";
import ImageFast from "./ImageFast";

import fonts from "../assets/fonts";
import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import ErrorComponent from "./ErrorComponent";
import React from "react";

const CustomInput = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
  multiline,
  maxLength,
  placeholderTextColor = COLORS.gray2,
  editable,
  textAlignVertical,
  marginBottom,
  height = 56,
  autoCapitalize,
  error,
  isFocus,
  isBlur,
  width,
  onEndEditing,
  autoFocus,
  ref,
  borderRadius,
  marginTop,
  withLabel,
  labelColor,
  borderColor = COLORS.inputBg,
  search,
  isSwitch,
  cardInfo,
  isClear,
  paddingVertical,
  Isicon,
  iconSrc,
  returnKeyType,
  onSubmitEditing,
  isValid,
  paddingBottom = 0,
  backgroundColor,
  showErrorMessage = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [showSuccessColor, setShowSuccessColor] = useState(false);

  const [prevError, setPrevError] = useState(error);

  const handleFocus = () => {
    setIsFocused(true);
    isFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    isBlur?.();
  };

  useEffect(() => {
    if (prevError && !error) {
      setShowSuccessColor(true);
      const timer = setTimeout(() => {
        setShowSuccessColor(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
    setPrevError(error);
  }, [error]);

  return (
    <View style={{ width: width || "100%" }}>
      <View
        style={{
          marginBottom: marginBottom || 8,
          paddingBottom: withLabel ? 6 : paddingBottom,
          marginTop,
          height: height ? height : multiline ? 180 : 70,
          width: "100%",
          borderRadius: borderRadius || 12,
          paddingLeft: 12,
          justifyContent: withLabel ? "flex-start" : "center",
          backgroundColor: error
            ? "#EE10450A"
            : showSuccessColor
            ? "#64CD750A"
            : backgroundColor
            ? backgroundColor
            : COLORS.inputBg,
          borderColor: error
            ? "#EE1045"
            : showSuccessColor
            ? "#64CD75"
            : borderColor,
          borderWidth: error ? 1 : 0,
        }}
      >
        {withLabel && (
          <CustomText
            label={withLabel}
            color={
              labelColor ||
              (error ? "#EE1045" : showSuccessColor ? "#64CD75" : COLORS.white3)
            }
            fontFamily={fonts.medium}
            fontSize={12}
            textTransform={"uppercase"}
            marginTop={8}
            lineHeight={12 * 1.4}
          />
        )}
        <View style={[styles.mainContainer]}>
          {search ? (
            <Icons
              family="MaterialIcons"
              name="search"
              size={26}
              color={COLORS.white2}
            />
          ) : null}

          <TextInput
            ref={ref}
            cursorColor="#A19375"
            placeholder={placeholder}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            style={[
              styles.input,
              {
                width: secureTextEntry ? "91%" : isSwitch ? "80%" : "99%",
                paddingVertical: paddingVertical,
                paddingLeft: search ? 8 : 0,
                color: error
                  ? "#EE1045"
                  : showSuccessColor
                  ? "#64CD75"
                  : COLORS.white,
                fontFamily: value ? fonts.medium : fonts.regular,
              },
            ]}
            secureTextEntry={
              secureTextEntry ? (hidePass ? true : false) : false
            }
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value ?? ""}
            onChangeText={(t) => onChangeText?.(t)}
            keyboardType={keyboardType}
            multiline={multiline}
            onEndEditing={onEndEditing}
            maxLength={maxLength}
            placeholderTextColor={
              error
                ? "#EE1045"
                : showSuccessColor
                ? "#64CD75"
                : placeholderTextColor
            }
            editable={editable ?? true}
            textAlignVertical={multiline ? "top" : textAlignVertical}
            autoCapitalize={autoCapitalize}
            autoFocus={autoFocus}
          />
          {/* {isSwitch && (
              <CustomSwitch
                value={switchValue}
                setValue={setSwitchValue}
                marginRight={12}
              />
          )} */}
          {isClear && value?.length > 0 && (
            <ImageFast
              source={Images.clear}
              resizeMode="contain"
              style={{
                width: 22,
                height: 22,
                marginRight: 10,
              }}
              onPress={() => {
                onChangeText?.("");
                isClear?.();
              }}
            />
          )}
        </View>
        {secureTextEntry && (
          <Icons
            name={hidePass ? "eye" : "eye-off"}
            family={"Ionicons"}
            color={COLORS.gray2}
            style={{
              position: "absolute",
              right: 17,
              top: 17,
              width: 22,
              height: 22,
              zIndex: 999,
            }}
            size={22}
            onPress={() => setHidePass(!hidePass)}
          />
        )}
        {Isicon ? (
          <View
            style={{
              backgroundColor: iconSrc ? "#A1937529" : "transparent",
              height: 32,
              width: 32,
              borderRadius: 100,
              position: "absolute",
              right: 10,
              zIndex: 999,
              top: withLabel ? 12 : 17,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageFast
              resizeMode={"contain"}
              source={iconSrc || Images.Arrow}
              style={{
                width: iconSrc ? 16 : 6,
                height: iconSrc ? 16 : 11,
              }}
            />
          </View>
        ) : null}
      </View>
      {cardInfo && <ErrorComponent errorTitle={cardInfo} />}
      {showErrorMessage && error && (
        <ErrorComponent
          errorTitle={error}
          color="#EE1045"
          error={error}
          marginBottom={6}
          font={fonts.regular}
        />
      )}
    </View>
  );
};

export default React.memo(CustomInput);

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  input: {
    height: "100%",
    padding: 0,
    margin: 0,
    fontFamily: fonts.medium,
    fontSize: 16,
    color: COLORS.white,
    flex: 1,
  },
});

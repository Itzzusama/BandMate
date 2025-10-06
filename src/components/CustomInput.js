import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import CustomText from "./CustomText";
import Icons from "./Icons";
import ImageFast from "./ImageFast";

import fonts from "../assets/fonts";
import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import ErrorComponent from "./ErrorComponent";

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
  height = 48,
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
            : COLORS.inputBg,
          borderColor: error
            ? "#EE1045CC"
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
              (error
                ? "#EE1045CC"
                : showSuccessColor
                ? "#64CD75"
                : COLORS.subtitle)
            }
            fontFamily={fonts.medium}
            fontSize={12}
            textTransform={"uppercase"}
            marginTop={4}
            lineHeight={12 * 1.4}
          />
        )}
        <View style={[styles.mainContainer]}>
          {search ? (
            <Icons
              family="MaterialIcons"
              name="search"
              size={26}
              color={COLORS.subtitle}
            />
          ) : null}

          <TextInput
            ref={ref}
            cursorColor="blue"
            placeholder={placeholder}
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
                  : COLORS.black,
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
                backgroundColor: COLORS.white,
              }}
              onPress={() => {
                onChangeText?.("");
                isClear?.();
              }}
            />
          )}
        </View>
        {secureTextEntry && (
          <ImageFast
            source={!hidePass ? Images.eye : Images.eyeLine}
            resizeMode="contain"
            style={{
              position: "absolute",
              right: 17,
              width: 16,
              height: 16,
              tintColor: "red",
            }}
            onPress={() => setHidePass(!hidePass)}
          />
        )}
        {Isicon ? (
          <View
            style={{
              backgroundColor: "#4347FF29",
              height: 32,
              width: 32,
              borderRadius: 100,
              position: "absolute",
              right: 10,
              zIndex: 999,
              top: withLabel ? 7 : 17,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageFast
              resizeMode={"contain"}
              source={Images.ChatBlue}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
        ) : null}
      </View>
      {cardInfo && <ErrorComponent errorTitle={cardInfo} />}
      {error && (
        <ErrorComponent
          errorTitle={error}
          color="#EE1045"
          error={error}
          marginBottom={8}
        />
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginBottom: -4,
  },
  input: {
    height: "100%",
    padding: 0,
    margin: 0,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: COLORS.white,
    flex: 1,
  },
});

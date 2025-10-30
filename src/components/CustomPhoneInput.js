import { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import CustomText from "./CustomText";
import Icons from "./Icons";
import ImageFast from "./ImageFast";
import fonts from "../assets/fonts";
import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import { COUNTRIES as COUNTRIES_DATA } from "../utils/COUNTRIES";
import CountryBottomSheet from "./CountryBottomSheet";
import CountryFlag from "react-native-country-flag";
const COUNTRIES = COUNTRIES_DATA.map((country) => ({
  code: country.code,
  dialCode: country.dialCode,
  name: country.name,
  flag: country.emoji,
})).sort((a, b) => a.name.localeCompare(b.name));

const CustomPhoneInput = ({
  value = "",
  setValue,
  withLabel,
  onEndEditing,
  error,
  showCheck,
  labelColor,
  isChange = false,
  marginBottom,
  defaultCode = "US",
  height = 56,
  borderRadius,
  marginTop,
  width,
  placeholder = "XXX XXX XX",
  onValidationChange,
  isIcon,
  rightIcon,
  rightIconSource,
  rightIconStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuccessColor, setShowSuccessColor] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(() => {
    if (value && value.trim()) {
      for (const country of COUNTRIES) {
        if (value.startsWith(country.dialCode)) {
          return country;
        }
      }
    }
    const foundCountry = COUNTRIES.find(
      (country) => country.code === defaultCode
    );
    return (
      foundCountry || {
        code: "US",
        dialCode: "+1",
        name: "United States",
        flag: "🇺🇸",
      }
    );
  });

  const [phoneNumber, setPhoneNumber] = useState(() => {
    if (value && value.trim()) {
      for (const country of COUNTRIES) {
        if (value.startsWith(country.dialCode)) {
          return value.replace(country.dialCode, "").trim();
        }
      }
      return value.trim();
    }
    return "";
  });

  const inputRef = useRef();

  useEffect(() => {
    if (value && value.trim()) {
      for (const country of COUNTRIES) {
        if (value.startsWith(country.dialCode)) {
          const phoneOnly = value.replace(country.dialCode, "").trim();
          setSelectedCountry(country);
          setPhoneNumber(phoneOnly);
          return;
        }
      }
      setPhoneNumber(value.trim());
    } else {
      setPhoneNumber("");
    }
  }, [value]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    onEndEditing && onEndEditing();
  };

  const validatePhoneNumber = (fullNumber) => {
    const phoneOnly = fullNumber.replace(selectedCountry.dialCode, "").trim();
    const cleanedPhone = phoneOnly.replace(/[^\d]/g, "");
    const isValid = cleanedPhone.length >= 7 && cleanedPhone.length <= 15;
    setShowSuccessColor(isValid);
    onValidationChange && onValidationChange(isValid);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    const fullNumber = `${country.dialCode}${phoneNumber}`.trim();
    setValue(fullNumber);
    validatePhoneNumber(fullNumber);
    setBottomSheetVisible(false);
  };

  const handlePhoneChange = (text) => {
    const cleaned = text.replace(/[^\d\s-]/g, "");
    setPhoneNumber(cleaned);
    const fullNumber = `${selectedCountry.dialCode}${cleaned}`.trim();
    setValue(fullNumber);
    validatePhoneNumber(fullNumber);
  };

  return (
    <View style={{ width: width || "100%" }}>
      <View
        style={[
          styles.container,
          {
            marginBottom: error ? 5 : marginBottom || 15,
            marginTop,
            height,
            width: isChange ? "auto" : "100%",
            borderRadius: borderRadius || 10,
            backgroundColor: error
              ? "#EE10450A"
              : showSuccessColor
              ? "#64CD750A"
              : COLORS.inputBg,
            borderColor: error
              ? "#EE1045CC"
              : showSuccessColor
              ? "#64CD75"
              : COLORS.inputBg,
          },
        ]}
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
                : COLORS.white2)
            }
            fontFamily={fonts.medium}
            fontSize={12}
            lineHeight={12 * 1.4}
            textTransform="uppercase"
            marginTop={5}
          />
        )}

        <View style={styles.inputWrapper}>
          <TouchableOpacity
            style={styles.countrySelector}
            onPress={() => !isChange && setBottomSheetVisible(true)}
            disabled={isChange}
          >
            <View style={styles.flagWrapper}>
              <CountryFlag
                isoCode={selectedCountry.code.toLowerCase()}
                style={styles.flagImage}
              />
            </View>
            <CustomText
              label={selectedCountry.dialCode}
              fontSize={16}
              fontFamily={fonts.medium}
              color={
                error ? "#EE1045" : showSuccessColor ? "#64CD75" : COLORS.white
              }
              marginLeft={6}
              marginRight={6}
            />
          </TouchableOpacity>

          <TextInput
            ref={inputRef}
            style={[
              styles.phoneInput,
              {
                top: phoneNumber ? 0 : 1,
                fontFamily: phoneNumber ? fonts.medium : fonts.regular,
                color: error
                  ? "#EE1045"
                  : showSuccessColor
                  ? "#64CD75"
                  : COLORS.white,
              },
            ]}
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            placeholder={placeholder}
            placeholderTextColor={COLORS.white2}
            keyboardType="phone-pad"
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={15}
          />
        </View>
      </View>

      {isIcon ? (
        <View
          style={{
            backgroundColor: "#4347FF29",
            height: 32,
            width: 32,
            borderRadius: 100,
            position: "absolute",
            right: 10,
            zIndex: 999,
            top: withLabel ? 14 : 17,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageFast
            resizeMode="contain"
            source={Images.PhoneBlue}
            style={{ width: 20, height: 20 }}
          />
        </View>
      ) : (
        showCheck &&
        value?.length > selectedCountry.dialCode.length && (
          <Icons
            family={error ? "Entypo" : "AntDesign"}
            name={error ? "circle-with-cross" : "checkcircle"}
            size={20}
            color={error ? COLORS.red : COLORS.green}
            style={{
              position: "absolute",
              right: 15,
              zIndex: 999,
              top: withLabel ? 30 : 17,
            }}
            onPress={
              error
                ? () => {
                    setValue(selectedCountry.dialCode);
                    setPhoneNumber("");
                  }
                : undefined
            }
          />
        )
      )}

      {/* ✅ Country Picker Bottom Sheet */}
      <CountryBottomSheet
        isVisible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        selectedCountry={selectedCountry}
        onCountrySelect={handleCountrySelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    justifyContent: "center",
    paddingTop: 3,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 6,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 16 * 1.4,

    height: "100%",
    paddingVertical: 0,
    paddingBottom: 6,
  },
  flagWrapper: {
    width: 16,
    height: 16,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -2,
  },

  flagImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});

export default CustomPhoneInput;

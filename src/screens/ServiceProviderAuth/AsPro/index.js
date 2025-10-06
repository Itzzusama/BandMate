import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import AuthHeader from "../../../components/Auth/AuthHeader";
import CountryBottomSheet from "../../../components/CountryBottomSheet";
import CustomButton from "../../../components/CustomButton";
import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomInput from "../../../components/CustomInput";
import CustomPhoneInput from "../../../components/CustomPhoneInput";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import FileAttachmentCard from "./molecules/FileAttachmentCard";

const AsPro = () => {
  const navigation = useNavigation();
  const tabs = ["Independent", "Business"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const init = {
    businessName: "",
    country: null,
    phoneNumber: "+1",
    email: "",
    website: "",
    kbis: "",
    tinVat: "",
    dateOfIncorporation: null,
    businessSize: "",
    // Company address
    addressCountry: null,
    state: "",
    city: "",
    zipCode: "",
    street: "",
    streetNumber: "",
    buildingNumber: "",
    floor: "",
  };

  // Country bottom sheet visibility states
  const [showCountrySheet, setShowCountrySheet] = useState(false);
  const [showAddressCountrySheet, setShowAddressCountrySheet] = useState(false);

  // Initial state for validation errors
  const inits = {
    businessNameError: "",
    countryError: "",
    phoneNumberError: "",
    emailError: "",
    websiteError: "",
    kbisError: "",
    tinVatError: "",
    dateOfIncorporationError: "",
    businessSizeError: "",
    // Company address errors
    addressCountryError: "",
    stateError: "",
    cityError: "",
    zipCodeError: "",
    streetError: "",
    streetNumberError: "",
    buildingNumberError: "",
    floorError: "",
  };

  const [errors, setErrors] = useState(inits);
  const [state, setState] = useState(init);

  // Country options for dropdown
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "France",
    "Germany",
    "Spain",
    "Italy",
    "Australia",
    "Japan",
    "China",
  ];

  // Business size options
  const businessSizes = [
    "1-3 business days",
    "4-10 business days",
    "11-50 business days",
    "51-100 business days",
    "100+ business days",
  ];

  // Form validation
  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};

      if (!state.businessName) {
        newErrors.businessNameError = "Please enter your business name";
      }

      if (!state.country || !state.country.code) {
        newErrors.countryError = "Please select your country of incorporation";
      }

      if (!state.phoneNumber || state.phoneNumber === "+1") {
        newErrors.phoneNumberError = "Please enter your phone number";
      }

      if (!state.email) {
        newErrors.emailError = "Please enter your email address";
      } else if (!/^\S+@\S+\.\S+$/.test(state.email)) {
        newErrors.emailError = "Please enter a valid email address";
      }

      if (!state.kbis) {
        newErrors.kbisError = "Please enter your KBIS";
      }

      if (!state.tinVat) {
        newErrors.tinVatError = "Please enter your TIN/VAT";
      }

      if (!state.dateOfIncorporation) {
        newErrors.dateOfIncorporationError =
          "Please select date of incorporation";
      }

      if (!state.businessSize) {
        newErrors.businessSizeError = "Please select your business size";
      }

      // Company address validation
      if (!state.addressCountry || !state.addressCountry.code) {
        newErrors.addressCountryError = "Please select your country";
      }

      if (!state.city) {
        newErrors.cityError = "Please enter your city";
      }

      if (!state.zipCode) {
        newErrors.zipCodeError = "Please enter your ZIP code";
      }

      if (!state.street) {
        newErrors.streetError = "Please enter your street";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  }, [state]);

  const handleSubmit = () => {
    if (errorCheck()) {
      // Navigate to next screen
      navigation.navigate("SellingAVehicle");
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <View style={{ paddingHorizontal: 15 }}>
          <AuthHeader title="Register as Pro" isback step={1} totalSteps={6} />
        </View>
      )}
    >
      <View style={styles.tabsStyles}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedTab(tab)}
            style={[
              styles.tabButton,
              selectedTab === tab && { backgroundColor: COLORS.black },
            ]}
          >
            <CustomText
              label={tab}
              color={selectedTab === tab ? COLORS.white : COLORS.black}
              fontSize={14}
              fontFamily={fonts.medium}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Business Information Section */}
      <CustomText
        label={"Business’ Details"}
        color={COLORS.black}
        fontSize={24}
        fontFamily={fonts.semiBold}
        marginTop={20}
      />
      <CustomText
        label={
          "Please inform your business details as detailed on your official business papers/documents."
        }
        color={COLORS.subtitle}
        fontSize={14}
        marginBottom={20}
        fontFamily={fonts.regular}
      />

      <View style={{ marginBottom: errors.countryError ? 5 : 15 }}>
        <CustomText
          label={"General Details"}
          color={COLORS.black}
          fontSize={18}
          fontFamily={fonts.medium}
        />
        <CustomText
          label="INCORPORATED IN"
          fontFamily={fonts.medium}
          marginBottom={8}
        />
        <TouchableOpacity
          style={[
            styles.countrySelector,
            { borderColor: errors.countryError ? COLORS.red : "transparent" },
          ]}
          onPress={() => setShowCountrySheet(true)}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {state.country && (
              <Image
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 4,
                  marginRight: 10,
                }}
                source={{
                  uri: `https://flagcdn.com/w40/${state.country.code.toLowerCase()}.png`,
                }}
                resizeMode="contain"
              />
            )}
            <CustomText
              label={state.country ? state.country.label : "Select country"}
              color={state.country ? COLORS.black : COLORS.inputLabel}
            />
          </View>
        </TouchableOpacity>
        {errors.countryError && (
          <CustomText
            label={errors.countryError}
            color={COLORS.red}
            fontFamily={fonts.semiBold}
            fontSize={10}
            marginBottom={15}
          />
        )}
      </View>

      <CountryBottomSheet
        visible={showCountrySheet}
        onClose={() => setShowCountrySheet(false)}
        selectedCountry={state.country}
        onSelectCountry={(country) => setState({ ...state, country })}
      />
      <Divider />
      <CustomInput
        withLabel="BUSINESS NAME"
        placeholder="Enter your business name"
        value={state.businessName}
        onChangeText={(text) => setState({ ...state, businessName: text })}
        error={errors.businessNameError}
      />

      <CustomPhoneInput
        withLabel="PHONE NUMBER"
        value={state.phoneNumber}
        setValue={(value) => setState({ ...state, phoneNumber: value })}
        error={errors.phoneNumberError}
      />

      <CustomInput
        withLabel="EMAIL"
        placeholder="Enter your email address"
        value={state.email}
        onChangeText={(text) => setState({ ...state, email: text })}
        error={errors.emailError}
      />

      <CustomInput
        withLabel="WEBSITE"
        placeholder="Enter your website (optional)"
        value={state.website}
        onChangeText={(text) => setState({ ...state, website: text })}
      />

      <CustomInput
        withLabel="KBIS"
        placeholder="Enter your KBIS"
        value={state.kbis}
        onChangeText={(text) => setState({ ...state, kbis: text })}
        error={errors.kbisError}
      />

      <CustomInput
        withLabel="TIN/VAT"
        placeholder="Enter your TIN/VAT"
        value={state.tinVat}
        onChangeText={(text) => setState({ ...state, tinVat: text })}
        error={errors.tinVatError}
      />

      <CustomDatePicker
        withLabel="DATE OF INCORPORATION"
        value={state.dateOfIncorporation}
        setValue={(date) => setState({ ...state, dateOfIncorporation: date })}
        error={errors.dateOfIncorporationError}
        labelColor={COLORS.black}
        type="date"
        maxDate={new Date()}
      />

      <CustomDropdown
        withLabel="BUSINESS SIZE"
        placeholder="Select business size"
        data={businessSizes}
        value={state.businessSize}
        setValue={(value) => setState({ ...state, businessSize: value })}
        error={errors.businessSizeError}
        isSearch
      />

      {/* Company Address Section */}
      <CustomText
        label={"Company's Address"}
        color={COLORS.black}
        fontSize={18}
        fontFamily={fonts.semiBold}
        marginTop={10}
        marginBottom={10}
      />

      <View style={{ marginBottom: errors.addressCountryError ? 5 : 15 }}>
        <CustomText
          label="COUNTRY"
          fontFamily={fonts.medium}
          marginBottom={8}
        />
        <TouchableOpacity
          style={[
            styles.countrySelector,
            {
              borderColor: errors.addressCountryError
                ? COLORS.red
                : "transparent",
            },
          ]}
          onPress={() => setShowAddressCountrySheet(true)}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {state.addressCountry && (
              <Image
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 4,
                  marginRight: 10,
                }}
                source={{
                  uri: `https://flagcdn.com/w40/${state.addressCountry.code.toLowerCase()}.png`,
                }}
                resizeMode="contain"
              />
            )}
            <CustomText
              label={
                state.addressCountry
                  ? state.addressCountry.label
                  : "Select country"
              }
              color={state.addressCountry ? COLORS.black : COLORS.inputLabel}
            />
          </View>
        </TouchableOpacity>
        {errors.addressCountryError && (
          <CustomText
            label={errors.addressCountryError}
            color={COLORS.red}
            fontFamily={fonts.semiBold}
            fontSize={10}
            marginBottom={15}
          />
        )}
      </View>

      <CountryBottomSheet
        visible={showAddressCountrySheet}
        onClose={() => setShowAddressCountrySheet(false)}
        selectedCountry={state.addressCountry}
        onSelectCountry={(country) =>
          setState({ ...state, addressCountry: country })
        }
      />

      <CustomInput
        withLabel="STATE"
        placeholder="Enter your state"
        value={state.state}
        onChangeText={(text) => setState({ ...state, state: text })}
        error={errors.stateError}
      />

      <CustomInput
        withLabel="CITY"
        placeholder="Enter your city"
        value={state.city}
        onChangeText={(text) => setState({ ...state, city: text })}
        error={errors.cityError}
      />

      <CustomInput
        withLabel="ZIP CODE"
        placeholder="Enter your ZIP code"
        value={state.zipCode}
        onChangeText={(text) => setState({ ...state, zipCode: text })}
        error={errors.zipCodeError}
      />

      <CustomInput
        withLabel="STREET"
        placeholder="Enter your street"
        value={state.street}
        onChangeText={(text) => setState({ ...state, street: text })}
        error={errors.streetError}
      />

      <CustomInput
        withLabel="STREET NUMBER"
        placeholder="Enter your street number"
        value={state.streetNumber}
        onChangeText={(text) => setState({ ...state, streetNumber: text })}
        error={errors.streetNumberError}
      />

      <CustomInput
        withLabel="BUILDING NUMBER"
        placeholder="Enter your building number"
        value={state.buildingNumber}
        onChangeText={(text) => setState({ ...state, buildingNumber: text })}
        error={errors.buildingNumberError}
      />

      <CustomInput
        withLabel="FLOOR"
        placeholder="Enter your floor"
        value={state.floor}
        onChangeText={(text) => setState({ ...state, floor: text })}
        error={errors.floorError}
      />

      <Divider />
      <CustomText
        label={"Legal Documents"}
        color={COLORS.black}
        fontSize={18}
        fontFamily={fonts.semiBold}
        marginTop={10}
        marginBottom={10}
      />

      <FileAttachmentCard />

      <Divider />
      <CustomText
        label={"Véhicules"}
        color={COLORS.black}
        fontSize={18}
        fontFamily={fonts.semiBold}
        marginTop={10}
        marginBottom={10}
      />
      <FileAttachmentCard />
      <FileAttachmentCard />
      <FileAttachmentCard />

      <CustomButton title={"Continue"} onPress={handleSubmit} marginTop={32} />
      <CustomButton
        title={"Later"}
        backgroundColor={"#1212120A"}
        marginTop={10}
        color={COLORS.black}
        marginBottom={30}
        onPress={() => navigation.goBack()}
      />
    </ScreenWrapper>
  );
};

export default AsPro;

const styles = StyleSheet.create({
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
  },
  tabsStyles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.inputBg,
    borderRadius: 50,
    padding: 5,
    marginTop: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginHorizontal: 5,
  },
});

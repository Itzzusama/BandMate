// Simplified and optimized SellingAVehicle.js

import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthHeader from "../../../components/Auth/AuthHeader";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import CustomDropdown from "../../../components/CustomDropdown";
import CountryBottomSheet from "../../../components/CountryBottomSheet";
import CustomButton from "../../../components/CustomButton";
import Divider from "../../../components/Divider";
import FileAttachmentCard from "./molecules/FileAttachmentCard";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const brandsWithModels = [
  { brand: "Toyota", models: ["Corolla", "Camry"] },
  { brand: "Honda", models: ["Civic", "Accord"] },
  { brand: "Suzuki", models: ["Alto", "Swift"] },
];

const carColors = [
  "White",
  "Black",
  "Silver",
  "Grey",
  "Blue",
  "Red",
  "Green",
  "Yellow",
  "Brown",
  "Maroon",
  "Gold",
];

const carConditions = ["Excellent", "Good", "Average", "Poor", "Damaged"];

const SellingAVehicle = () => {
  const navigation = useNavigation();

  const initialState = {
    country: null,
    state: "",
    city: "",
    zipCode: "",
    brand: "",
    model: "",
    color: "",
    condition: "",
    price: "",
  };

  const initialErrors = {
    country: "",
    state: "",
    city: "",
    zipCode: "",
    brand: "",
    model: "",
    color: "",
    condition: "",
    price: "",
  };

  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [showCountrySheet, setShowCountrySheet] = useState(false);

  const brandOptions = brandsWithModels.map((item) => item.brand);
  const modelOptions =
    brandsWithModels.find((b) => b.brand === state.brand)?.models || [];

  const validate = () => {
    const newErrors = {};
    if (!state.country || !state.country.code)
      newErrors.country = "Please select your country";
    if (!state.state) newErrors.state = "Please enter your state";
    if (!state.city) newErrors.city = "Please enter your city";
    if (!state.zipCode) newErrors.zipCode = "Please enter your ZIP code";
    if (!state.brand) newErrors.brand = "Please select your car brand";
    if (!state.model) newErrors.model = "Please select your car model";
    if (!state.color) newErrors.color = "Please select your car color";
    if (!state.condition) newErrors.condition = "Please select condition";
    if (!state.price) newErrors.price = "Please enter car price";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      navigation.navigate("NextScreen");
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <View style={{ paddingHorizontal: 15 }}>
          <AuthHeader
            title="Create A Vehicle"
            isback
            step={2}
            totalSteps={6}
            subtitle="Enter your vehicle details"
          />
        </View>
      )}
    >
      <CustomText
        label="Vehicle General Info"
        fontSize={24}
        fontFamily={fonts.semiBold}
        color={COLORS.black}
        marginTop={20}
      />
      <CustomText
        label="Please inform your vehicle details as detailed on your official vehicle papers/documents."
        fontSize={14}
        fontFamily={fonts.regular}
        color={COLORS.subtitle}
        marginBottom={20}
      />

      {/* Country Selector */}
      <CustomText
        label="REGISTERED IN"
        fontFamily={fonts.medium}
        marginBottom={5}
      />
      <TouchableOpacity
        style={[
          styles.countrySelector,
          { borderColor: errors.country ? COLORS.red : "transparent" },
        ]}
        onPress={() => setShowCountrySheet(true)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {state.country && (
            <Image
              source={{
                uri: `https://flagcdn.com/w40/${state.country.code.toLowerCase()}.png`,
              }}
              style={{
                height: 20,
                width: 20,
                marginRight: 10,
                borderRadius: 4,
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
      {errors.country && (
        <CustomText
          label={errors.country}
          color={COLORS.red}
          fontSize={10}
          fontFamily={fonts.semiBold}
          marginBottom={15}
        />
      )}

      <CountryBottomSheet
        visible={showCountrySheet}
        onClose={() => setShowCountrySheet(false)}
        selectedCountry={state.country}
        onSelectCountry={(country) => setState({ ...state, country })}
      />

      <CustomInput
        withLabel="STATE"
        value={state.state}
        onChangeText={(text) => setState({ ...state, state: text })}
        error={errors.state}
        marginBottom={8}
      />
      <CustomInput
        withLabel="CITY"
        value={state.city}
        onChangeText={(text) => setState({ ...state, city: text })}
        error={errors.city}
        marginBottom={1}
      />

      <Divider marginVertical={16} />

      <CustomDropdown
        placeholder="Select your car brand"
        data={brandOptions}
        value={state.brand}
        error={errors.brand}
        marginBottom={8}
        setValue={(value) => setState({ ...state, brand: value, model: "" })}
      />

      <CustomDropdown
        placeholder="Select your car model"
        data={modelOptions}
        value={state.model}
        marginBottom={8}
        error={errors.model}
        setValue={(value) => setState({ ...state, model: value })}
      />

      <CustomDropdown
        placeholder="Select your car color"
        marginBottom={8}
        data={carColors}
        value={state.color}
        error={errors.color}
        setValue={(value) => setState({ ...state, color: value })}
      />

      <CustomInput
        withLabel="PLATE NUMBER"
        placeholder="Enter your car plate number"
        value={state.zipCode}
        onChangeText={(text) => setState({ ...state, zipCode: text })}
        marginBottom={8}
        error={errors.zipCode}
      />

      <CustomDropdown
        placeholder="Select your car current state"
        data={carConditions}
        marginBottom={8}
        value={state.condition}
        error={errors.condition}
        setValue={(value) => setState({ ...state, condition: value })}
      />

      <Divider />

      <CustomInput
        withLabel="PRICE"
        keyboardType="numeric"
        placeholder="Enter Car Price"
        value={state.price}
        onChangeText={(text) => setState({ ...state, price: text })}
        error={errors.price}
      />

      <Divider />
      <FileAttachmentCard />

      <CustomButton title="Continue" onPress={handleSubmit} marginTop={32} />
      <CustomButton
        title="Later"
        backgroundColor="#1212120A"
        marginTop={10}
        color={COLORS.black}
        marginBottom={30}
        onPress={() => navigation.goBack()}
      />
    </ScreenWrapper>
  );
};

export default SellingAVehicle;

const styles = StyleSheet.create({
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    marginBottom: 8,
  },
});

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import CustomDropdown from "../../../components/CustomDropdown";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthSlider from "../../../components/Auth/AuthSlider";
import CustomButton from "../../../components/CustomButton";
import GooglePlaces from "../../../components/GooglePlaces";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";

import { PNGIcons } from "../../../assets/images/icons";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const Parking = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    country: { code: "dz", label: "Algérie" },
    address: "Address",
    vehicleType: "Cars",
    locationType: "Indoor",
    parkingType: "Individual Garage",
    heightWarning: "2",
    parkingNumber: "14",
  });

  const [Country, setCountry] = useState("");

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const vehicleTypes = [
    { title: "Sedan", _id: "Comfortable for 4 people" },
    { title: "SUV", _id: "Spacious and powerful" },
    {
      title: "Hatchback",
      _id: "Compact and fuel-efficient",
    },
    {
      title: "Convertible",
      _id: "Stylish open-top drive",
    },
    {
      title: "Pickup Truck",
      _id: "Perfect for hauling cargo",
    },
    { title: "Van", _id: "Ideal for groups and families" },
    { title: "Electric", _id: "Eco-friendly driving" },
  ];
  const parkingType = [
    { title: "Parking With Roof", _id: "7 models" },
    { title: "Open Parking", _id: "5 models" },
    {
      title: "Underground Parking",
      _id: "3 models",
    },
    { title: "Valet Parking", _id: "2 models" },
    { title: "Covered Garage", _id: "4 models" },
    { title: "Street Parking", _id: "6 models" },
    { title: "Private Parking", _id: "1 model" },
  ];
  const locationTypes = [
    "Indoor",
    "Outdoor",
    "Urban",
    "Rural",
    "Suburban",
    "Mountain",
    "Beach",
    "Forest",
    "Desert",
    "Waterfront",
    "Underground",
    "Rooftop",
    "Garden",
    "Stadium",
    "Warehouse",
    "Office",
    "Home",
    "Café",
    "Mall",
    "Park",
  ];

  const dropdownFields = [
    {
      field: "vehicleType",
      label: "MEANT FOR VEHICLE TYPE",
      value: formData.vehicleType,
      data: vehicleTypes,
      placeholder: "Select vehicle type",
    },
    {
      field: "locationType",
      label: "LOCATION TYPE",
      value: formData.locationType,
      data: locationTypes,
      placeholder: "Select location type",
    },
    {
      field: "parkingType",
      label: "PARKING TYPE",
      value: formData.parkingType,
      data: parkingType,
      placeholder: "Select parking type",
    },
  ];

  const inputFields = [
    {
      field: "heightWarning",
      label: "HEIGHT WARNING (M)",
      value: formData.heightWarning,
      placeholder: "Enter height warning",
    },
    {
      field: "parkingNumber",
      label: "PARKING NUMBER",
      value: formData.parkingNumber,
      placeholder: "Enter parking number",
    },
  ];

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title="New Parking Spot" />}
    >
      <AuthSlider min={1} max={2} marginTop={1} marginBottom={18} />

      <View style={styles.container}>
        <CustomText
          label="Parking Spot Details"
          fontSize={24}
          fontFamily={fonts.semiBold}
          color={COLORS.black}
        />
        <CustomText
          label="Please inform your vehicle details as detailed on your official vehicle papers/documents."
          color={COLORS.gray1}
          marginBottom={16}
          marginTop={-6}
        />

        <GooglePlaces
          withLabel="REGISTERED IN"
          value={Country}
          setValue={setCountry}
          data={[1, 2, 3]}
          placeholder="Algérie"
          marginBottom={4}
        />

        <View style={styles.border} />

        {dropdownFields.map((item, index) => (
          <CustomDropdown
            key={index}
            withLabel={item.label}
            value={item.value}
            setValue={(value) => handleInputChange(item.field, value)}
            data={item.data}
            placeholder={item.placeholder}
            marginBottom={8}
            disabled={item.disabled}
            onPress={item.onPress}
          />
        ))}

        {inputFields.map((item, index) => (
          <CustomInput
            key={index}
            withLabel={item.label}
            value={item.value}
            onChangeText={(text) => handleInputChange(item.field, text)}
            placeholder={item.placeholder}
            marginBottom={8}
          />
        ))}

        <View style={styles.border} />

        <TouchableOpacity
          style={styles.attachmentButton}
          onPress={() => navigation.navigate("ParkingMedia")}
        >
          <Image
            source={PNGIcons.plus || Images.plus}
            style={styles.plusIcon}
          />
          <View style={{ alignItems: "center" }}>
            <CustomText label="PDF only. 20MB." fontSize={12} />
            <CustomText
              label="Join Proof of Lease/Ownership"
              fontSize={16}
              fontFamily={fonts.medium}
              marginTop={-4}
            />
          </View>
        </TouchableOpacity>

        <CustomButton
          title="Continue"
          marginTop={24}
          marginBottom={12}
          fontFamily={fonts.medium}
          onPress={() => navigation.navigate("ParkingSettings")}
        />
        <CustomButton
          title="Save As Draft"
          backgroundColor={COLORS.lightGray}
          color={COLORS.black}
          fontFamily={fonts.medium}
          marginBottom={24}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Parking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  border: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 16,
  },
  attachmentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    marginTop: 6,
    justifyContent: "center",
  },
  plusIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});

import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import fonts from "../../../assets/fonts";
import CountryBottomSheet from "../../../components/CountryBottomSheet";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomModalGooglePlaces from "../../../components/CustomModalGooglePlaces";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import SearchInput from "../../../components/SearchInput";
import { post } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { COUNTRIES } from "../../../utils/constants";
import { ToastMessage } from "../../../utils/ToastMessage";

const UserAddress = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addressData } = route.params || {};

  const [Address, setAddress] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [googlePlacesModal, setGooglePlacesModal] = useState(false);

  useEffect(() => {
    if (addressData) {
      // Set latitude and longitude from addressData
      if (addressData.latitude) {
        setLatitude(addressData.latitude);
      }
      if (addressData.longitude) {
        setLongitude(addressData.longitude);
      }

      // Handle direct properties from addressData (like from Google Places or route params)
      if (addressData.address) {
        setAddress(addressData.address);
        // Parse street info from full address if needed
        const addressParts = addressData.address.split(", ");
        if (addressParts.length > 0) {
          const streetMatch = addressParts[0].match(/(\d+)?\s*(.+)/);
          if (streetMatch) {
            setStreetNumber(streetMatch[1] || "");
            setStreetName(streetMatch[2] || "");
          } else {
            setStreetName(addressParts[0] || "");
          }
        }
      }

      if (addressData.city) {
        setCity(addressData.city);
      }

      if (addressData.state) {
        // State is available but we don't have a state field in the form
        // You might want to add it to the form or use it for validation
      }

      if (addressData.zipCode) {
        setZipCode(addressData.zipCode);
      }

      if (addressData.country) {
        const foundCountry = COUNTRIES.find(
          (country) =>
            country.label.toLowerCase() === addressData.country.toLowerCase()
        );
        setSelectedCountry(
          foundCountry || { label: addressData.country, code: "US" }
        );
      }

      // Fallback: Handle legacy currentAddress string parsing
      if (!addressData.address && addressData.currentAddress) {
        const addressParts = addressData.currentAddress.split(", ") || [];
        if (addressParts.length >= 4) {
          const [street, cityPart, statePart, countryPart] = addressParts;
          const streetMatch = street.match(/(\d+)?\s*(.+)/);
          if (streetMatch) {
            setStreetNumber(streetMatch[1] || "");
            setStreetName(streetMatch[2] || "");
          } else {
            setStreetName(street || "");
          }
          setCity(cityPart || "");
          const stateMatch = statePart?.match(/([A-Za-z\s]+)\s+(\d+)/);
          if (stateMatch) {
            setZipCode(stateMatch[2]);
          }
          if (countryPart) {
            const foundCountry = COUNTRIES.find(
              (country) =>
                country.label.toLowerCase() === countryPart.toLowerCase()
            );
            setSelectedCountry(
              foundCountry || { label: countryPart, code: "US" }
            );
          }
        }
      }

      // Use address components if available (legacy support)
      if (addressData.addressComponents) {
        const components = addressData.addressComponents;
        if (components.city && !addressData.city) setCity(components.city);
        if (components.zipCode && !addressData.zipCode)
          setZipCode(components.zipCode);
        if (components.country && !addressData.country) {
          const foundCountry = COUNTRIES.find(
            (country) =>
              country.label.toLowerCase() === components.country.toLowerCase()
          );
          setSelectedCountry(
            foundCountry || { label: components.country, code: "US" }
          );
        }
      }
    }
  }, [addressData]);

  const handleLocationSelect = (location) => {
    setAddress(location?.address);
    if (location.latitude) setLatitude(location.latitude);
    if (location.longitude) setLongitude(location.longitude);
    if (location.city) setCity(location.city);
    if (location.country) {
      const foundCountry = COUNTRIES.find(
        (country) =>
          country.label.toLowerCase() === location.country.toLowerCase()
      );
      setSelectedCountry(
        foundCountry || { label: location.country, code: "US" }
      );
    }
    if (location.zipCode) setZipCode(location.zipCode);

    const addressParts = location.address.split(",");
    if (addressParts.length > 0) {
      const streetInfo = addressParts[0].trim();
      const streetMatch = streetInfo.match(/^(\d+)\s+(.+)$/);
      if (streetMatch) {
        setStreetNumber(streetMatch[1]);
        setStreetName(streetMatch[2]);
      } else {
        setStreetName(streetInfo);
      }
    }
  };

  const handleSaveAddress = async () => {
    setErrors({});

    const newErrors = {};
    if (!streetName) newErrors.streetNameError = "Street name is required";
    if (!city) newErrors.cityError = "City is required";
    if (!zipCode) newErrors.zipCodeError = "Zip code is required";
    if (!selectedCountry) newErrors.addressCountryError = "Country is required";
    if (!latitude)
      newErrors.latitudeError = "Location coordinates are required";
    if (!longitude)
      newErrors.longitudeError = "Location coordinates are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const body = {
        data: {
          streetName,
          streetNumber,
          buildingNumber,
          city,
          zipCode,
          country: selectedCountry.label,
          title: title,
          latitude: latitude,
          longitude: longitude,
        },
      };
      const res = await post("map-searches", body);
      console.log(res?.data);

      if (res?.data?.success) {
        ToastMessage("Address saved successfully", "success");
        navigation.navigate("QuickSelection");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <>
          <Header title="Grandma’s House" />
        </>
      )}
      footerUnScrollable={() => (
        <>
          <CustomButton
            title="Save"
            width="95%"
            onPress={handleSaveAddress}
            marginBottom={16}
          />
          <CustomButton
            title="Delete Place"
            width="95%"
            color={COLORS.red}
            onPress={handleSaveAddress}
            // icon={Images.deleteIcon}
            marginBottom={20}
            backgroundColor={'#1212120A'}
          />
        </>
      )}
    >
      <CustomText
        label="Place Details"
        fontFamily={fonts.medium}
        fontSize={24}
        lineHeight={24 * 1.4}
        color={COLORS.black}
        marginBottom={8}
        marginTop={20}
      />
      <CustomText
        label="Please inform the details of this place."
        fontFamily={fonts.medium}
        fontSize={14}
        color={COLORS.subtitle}
        lineHeight={14 * 1.4}
      />

      <CustomInput
        height={56}
        placeholder="Title"
        withLabel={"Title"}
        value={title}
        onChangeText={setTitle}
        marginTop={22}
      />

      <CustomText
        label="Address"
        fontFamily={fonts.medium}
        fontSize={18}
        lineHeight={24 * 1.4}
        marginTop={12}
        marginBottom={12}
        color={COLORS.black}
      />

      <SearchInput
        placeholder={"Search for an Address"}
        editable={false}
        value={Address}
        CrossPress={() => navigation.goBack()}
        onPress={() => setGooglePlacesModal(true)}
      />

      <View
        style={{
          marginBottom: errors.addressCountryError ? 5 : 16,
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={[
            styles.countrySelector,
            {
              borderColor: errors.addressCountryError
                ? COLORS.red
                : "transparent",
            },
          ]}
          onPress={() => setShowCountryModal(true)}
        >
          <CustomText
            label="COUNTRY"
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.medium}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {selectedCountry && (
              <Image
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 4,
                  marginRight: 10,
                }}
                source={{
                  uri: `https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`,
                }}
                resizeMode="contain"
              />
            )}
            <CustomText
              label={selectedCountry ? selectedCountry.label : "Select country"}
              color={selectedCountry ? COLORS.black : COLORS.inputLabel}
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
      <CustomInput
        withLabel={"City"}
        placeholder="City *"
        height={56}
        value={city}
        onChangeText={setCity}
        marginBottom={8}
        error={errors.cityError}
      />
      <CustomInput
        withLabel={"ZIP CODE"}
        placeholder="Zip Code *"
        value={zipCode}
        height={56}
        onChangeText={setZipCode}
        keyboardType="numeric"
        marginBottom={8}
        error={errors.zipCodeError}
      />

      <CustomInput
        withLabel={"STREET NAME"}
        placeholder="Street Name *"
        value={streetName}
        height={56}
        onChangeText={setStreetName}
        marginBottom={8}
        error={errors.streetNameError}
      />

      <CustomInput
        withLabel={"Street Number"}
        placeholder="Street.."
        value={streetNumber}
        height={56}
        onChangeText={setStreetNumber}
        keyboardType="numeric"
        marginBottom={8}
      />

      <CustomInput
        withLabel={"Building Number"}
        placeholder="Building.."
        value={buildingNumber}
        height={56}
        onChangeText={setBuildingNumber}
        keyboardType="numeric"
        marginBottom={20}

      />

      <CountryBottomSheet
        visible={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        selectedCountry={selectedCountry}
        onSelectCountry={(country) => {
          setSelectedCountry(country);
          setShowCountryModal(false);
          if (errors.addressCountryError) {
            setErrors({ ...errors, addressCountryError: null });
          }
        }}
      />

      <CustomModalGooglePlaces
        isVisible={googlePlacesModal}
        onClose={() => setGooglePlacesModal(false)}
        onLocationSelect={handleLocationSelect}
      />
    </ScreenWrapper>
  );
};

export default UserAddress;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countrySelector: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    minHeight: 56,
    marginTop: 10,
    justifyContent: "center",
  },
});

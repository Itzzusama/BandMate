import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import fonts from "../../../assets/fonts";
import { PNGIcons } from "../../../assets/images/icons";
import CustomModalGooglePlaces from "../../../components/CustomModalGooglePlaces";
import SearchInput from "../../../components/SearchInput";
import { COLORS } from "../../../utils/COLORS";
import { getLocationWithPermission } from "../../../utils/LocationUtils";

const GOOGLE_API_KEY = "AIzaSyB3Tj9fWzywtOncQ7vNjcErxRM5E--WlDA";

const PicLocation = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isCustom = route.params?.isCustom;

  const mapViewRef = useRef(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [addressComponents, setAddressComponents] = useState({
    state: null,
    city: null,
    zipCode: null,
    country: null,
    streetNumber: null,
    streetName: null,
    buildingNumber: null,
  });

  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [googlPlacesModal, setgooglPlacesModal] = useState(false);
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 25.2854,
    longitude: 51.531,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  // Extract address components from Google Places API response
  const extractAddressComponents = (addressComponents) => {
    const components = {
      state: null,
      city: null,
      zipCode: null,
      country: null,
      streetNumber: null,
      streetName: null,
      buildingNumber: null,
    };

    addressComponents.forEach((component) => {
      const types = component.types;

      if (types.includes("administrative_area_level_1")) {
        components.state = component.long_name;
      } else if (
        types.includes("locality") ||
        types.includes("administrative_area_level_2")
      ) {
        components.city = component.long_name;
      } else if (types.includes("postal_code")) {
        components.zipCode = component.long_name;
      } else if (types.includes("country")) {
        components.country = component.long_name;
      } else if (types.includes("street_number")) {
        components.streetNumber = component.long_name;
      } else if (types.includes("route")) {
        components.streetName = component.long_name;
      } else if (types.includes("subpremise")) {
        components.buildingNumber = component.long_name;
      }
    });

    return components;
  };

  const fetchPlaceName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      const locationData = await response.json();

      if (locationData.results.length > 0) {
        const result = locationData.results[0];
        const components = extractAddressComponents(result.address_components);
        return {
          address: result.formatted_address,
          components: components,
        };
      }
    } catch (error) {
      console.error("Error fetching place name:", error);
    }
    return {
      address: null,
      components: {
        state: null,
        city: null,
        zipCode: null,
        country: null,
        streetNumber: null,
        streetName: null,
        buildingNumber: null,
      },
    };
  };

  const handleRegionChangeComplete = async (region) => {
    setCurrentRegion({
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    const locationData = await fetchPlaceName(
      region.latitude,
      region.longitude
    );
    if (locationData.address) {
      setCurrentAddress(locationData.address);
      setAddressComponents(locationData.components);
    }
  };

  // Get current location on component mount
  useEffect(() => {
    const getCurrentLocation = async () => {
      setIsLoadingLocation(true);
      try {
        const locationData = await getLocationWithPermission();

        const newRegion = {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          latitudeDelta: 0.05, // Zoom in more
          longitudeDelta: 0.05,
        };

        setCurrentRegion(newRegion);

        // Animate map to current location
        if (mapViewRef.current) {
          mapViewRef.current.animateToRegion(newRegion, 1000);
        }

        // Get address for current location
        const locationDetails = await fetchPlaceName(
          locationData.latitude,
          locationData.longitude
        );
        if (locationDetails.address) {
          setCurrentAddress(locationDetails.address);
          setAddressComponents(locationDetails.components);
        }
      } catch (error) {
        console.error("Error getting current location:", error);
        Alert.alert(
          "Location Error",
          "Could not get your current location. Please check your location settings.",
          [{ text: "OK" }]
        );
      } finally {
        setIsLoadingLocation(false);
      }
    };

    getCurrentLocation();
  }, []);

  const handleConfirmAddress = () => {
    if (isCustom) {
      // Pass address data to UserAddress screen
      const addressData = {
        address: currentAddress,
        latitude: currentRegion.latitude,
        longitude: currentRegion.longitude,
        ...addressComponents,
      };
      navigation.navigate("UserAddress", { addressData });
    } else {
      navigation.goBack();
    }
    // Get the callback functions from route params
    // const {
    //   setValue,
    //   setLatLong,
    //   setState,
    //   setCity,
    //   setZipCode,
    //   setCountry,
    //   shouldOpenModalOnReturn,
    // } = route.params || {};

    // const locationData = {
    //   latitude: currentRegion.latitude,
    //   longitude: currentRegion.longitude,
    //   address: currentAddress,
    //   ...addressComponents,
    // };

    // if (setValue) setValue(currentAddress);
    // if (setLatLong)
    //   setLatLong({
    //     latitude: currentRegion.latitude,
    //     longitude: currentRegion.longitude,
    //   });

    // if (setState) setState(addressComponents.state);
    // if (setCity) setCity(addressComponents.city);
    // if (setZipCode) setZipCode(addressComponents.zipCode);
    // if (setCountry) setCountry(addressComponents.country);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper
      translucent
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <>
          <View style={styles.header}>
            <SearchInput
              placeholder={"Search location..."}
              isCross
              editable={false}
              CrossPress={() => navigation.goBack()}
              onPress={() => setgooglPlacesModal(true)}
            />
          </View>
        </>
      )}
      footerUnScrollable={() => (
        <View style={styles.btnBox}>
          <View style={styles.setLocation}>
            <CustomText
              label="SET ADDRESS"
              color={COLORS.subtitle}
              fontFamily={fonts.medium}
              fontSize={12}
              lineHeight={12 * 1.4}
              marginBottom={5}
            />
            {isLoadingLocation ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={COLORS.black} />
              </View>
            ) : (
              <CustomText
                label={currentAddress || "Location not available"}
                fontFamily={fonts.medium}
                fontSize={16}
                lineHeight={16 * 1.4}
              />
            )}
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.backIcon}
              onPress={handleBackPress}
            >
              <Icons
                name="keyboard-arrow-left"
                family="MaterialIcons"
                size={26}
                color={COLORS.primaryColor}
              />
            </TouchableOpacity>
            <CustomButton
              title={isCustom ? "Set Location" : "Confirm Address"}
              width="82%"
              height={48}
              onPress={handleConfirmAddress}
            />
          </View>
          {isCustom ? (
            <CustomText
              label={
                "The easiest and most affordable way to reach your destination."
              }
              fontFamily={fonts.medium}
              marginTop={8}
              textAlign={"center"}
              color={COLORS.subtitle}
              fontSize={12}
              lineHeight={16 * 1.2}
            />
          ) : null}
        </View>
      )}
    >
      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          ref={mapViewRef}
          provider={PROVIDER_GOOGLE}
          mapType="standard"
          initialRegion={currentRegion}
          onRegionChangeComplete={handleRegionChangeComplete}
        />
        <View style={styles.markerFixed}>
          <Image source={PNGIcons.mapPin} style={styles.marker} />
        </View>
      </View>

      <CustomModalGooglePlaces
        isVisible={googlPlacesModal}
        onClose={() => setgooglPlacesModal(false)}
        onLocationSelect={(location) => {
          const newRegion = {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          };
          setCurrentRegion(newRegion);
          setCurrentAddress(location.address);

          // Extract and store address components
          setAddressComponents({
            state: location.state,
            city: location.city,
            zipCode: location.zipCode,
            country: location.country,
            streetNumber: location.streetNumber,
            streetName: location.streetName,
            buildingNumber: location.buildingNumber,
          });

          if (mapViewRef.current) {
            mapViewRef.current.animateToRegion(newRegion, 1000);
          }

          // Close the modal
          setgooglPlacesModal(false);
        }}
      />
    </ScreenWrapper>
  );
};

export default PicLocation;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  backIcon: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.lightGray,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  header: {
    marginTop: 56,
    padding: 12,
  },
  marker: {
    height: 45,
    width: 45,
    resizeMode: "contain",
  },
  btnBox: {
    padding: 12,
    marginBottom: 38,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    bottom: 0,
    width: "100%",
    backgroundColor: COLORS.white,
    marginTop: -30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  setLocation: {
    backgroundColor: "#1212120A",
    padding: 12,
    marginBottom: 24,
    borderRadius: 12,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

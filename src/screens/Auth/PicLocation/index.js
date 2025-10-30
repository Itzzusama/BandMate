import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  View,
} from "react-native";

import CustomModalGooglePlaces from "../../../components/CustomModalGooglePlaces";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";

import { getLocationWithPermission } from "../../../utils/LocationUtils";
import { PNGIcons } from "../../../assets/images/icons";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const GOOGLE_API_KEY = "AIzaSyB3Tj9fWzywtOncQ7vNjcErxRM5E--WlDA";
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#212121" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#282828" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#181818" }],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#2c2c2c" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#202020" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8a8a8a" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3d3d3d" }],
  },
];
const PicLocation = () => {
  const currentLocation = useSelector((state) => state.users.location);
  const navigation = useNavigation();
  const route = useRoute();
  const isCustom = route.params?.isCustom;
  const item = route.params?.item;

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
      navigation.replace("UserAddress", { addressData, item });
    } else {
      //   navigation.goBack();
      navigation.navigate("Success");
      const {
        setValue,
        setLatLong,
        setState,
        setCity,
        setZipCode,
        setCountry,
      } = route.params || {};
      if (setValue) setValue(currentAddress);
      if (setLatLong)
        setLatLong({
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
        });

      if (setState) setState(addressComponents.state);
      if (setCity) setCity(addressComponents.city);
      if (setZipCode) setZipCode(addressComponents.zipCode);
      if (setCountry) setCountry(addressComponents.country);
    }
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
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={{
                width: "87%",
                height: 44,
                backgroundColor: COLORS.cardColor,
                borderRadius: 100,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 12,
              }}
              onPress={handleBackPress}
              activeOpacity={0.7}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icons
                  family="MaterialIcons"
                  name="search"
                  size={26}
                  color={COLORS.white2}
                />
                <CustomText
                  label="Search location..."
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  color={COLORS.gray2}
                  fontFamily={fonts.medium}
                  marginLeft={8}
                />
              </View>

              {/* <ImageFast
                source={Images.clear}
                resizeMode="contain"
                style={{
                  width: 22,
                  height: 22,
                }}
                removeLoading
              /> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.crossContainer}
              onPress={handleBackPress}
              activeOpacity={0.7}
            >
              <Image source={PNGIcons.cross} style={styles.cross} />
            </TouchableOpacity>
          </View>
        </>
      )}
      footerUnScrollable={() => (
        <View style={styles.btnBox}>
          <View style={styles.setLocation}>
            <CustomText
              label="SET ADDRESS"
              color={COLORS.white2}
              fontFamily={fonts.medium}
              fontSize={12}
              lineHeight={12 * 1.4}
              marginBottom={5}
            />
            {isLoadingLocation ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={COLORS.white} />
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
          <AuthFooter
            isMain
            title={
              "The easiest and most affordable way to reach your destination."
            }
            btnTitle={isCustom ? "Set Location" : "Confirm Address"}
            marginBottom={-15}
            marginTop={-12}
            onPress={handleConfirmAddress}
            textColor={COLORS.white2}
          />
        </View>
      )}
    >
      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          ref={mapViewRef}
          provider={PROVIDER_GOOGLE}
          customMapStyle={darkMapStyle}
          mapType="standard"
          initialRegion={{
            latitude: currentLocation?.latitude || 32.1475636,
            longitude: currentLocation?.longitude || 74.19141239999999,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
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

  marker: {
    height: 45,
    width: 45,
    resizeMode: "contain",
    tintColor: COLORS.btnColor,
  },
  btnBox: {
    padding: 12,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    bottom: 0,
    width: "100%",
    backgroundColor: COLORS.black,
    marginTop: -30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  setLocation: {
    backgroundColor: COLORS.cardColor,
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginTop: 56,
    padding: 12,
  },
  crossContainer: {
    borderRadius: 100,
    backgroundColor: COLORS.cardColor,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  cross: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: COLORS.white2,
  },
});

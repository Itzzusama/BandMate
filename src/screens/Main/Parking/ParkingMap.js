import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";

import CustomModalGooglePlaces from "../../../components/CustomModalGooglePlaces";
import BottomSheetComponent from "../../../components/BottomSheetComponent";
import CustomMarketPlace from "../../../components/CustomMarketPlace";
import LocationHeader from "../../../components/LocationHeader";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";

import ParkingCard from "./molecules/ParkingCard";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const { width } = Dimensions.get("window");

const ParkingMap = ({ navigation }) => {
  const mapRef = useRef(null);
  const sheetRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);
  const lastScrollIndex = useRef(0);
  const [isVisible, setIsVisible] = useState(false);

  const openSheet = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  const array = [
    {
      price: 120,
      latitude: 40.7128,
      longitude: -74.006,
    },
    {
      price: 70,
      latitude: 34.0522,
      longitude: -118.2437,
    },
    {
      price: 40,
      latitude: 41.8781,
      longitude: -87.6298,
    },
    {
      price: 50,
      latitude: 29.7604,
      longitude: -95.3698,
    },
    {
      price: 90,
      latitude: 25.7617,
      longitude: -80.1918,
    },
  ];

  // Calculate card dimensions
  const cardWidth = width - 130 + 10; // card width + marginRight from WarehouseCard
  const scrollTimeoutRef = useRef(null);

  const handleScroll = useCallback(
    (event) => {
      const scrollX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(scrollX / cardWidth);

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce the state update
      scrollTimeoutRef.current = setTimeout(() => {
        if (
          newIndex !== lastScrollIndex.current &&
          newIndex >= 0 &&
          newIndex < array.length
        ) {
          lastScrollIndex.current = newIndex;
          setActiveScrollIndex(newIndex);
        }
      }, 50);
    },
    [array.length, cardWidth]
  );

  const handleScrollEnd = useCallback(
    (event) => {
      const scrollX = event.nativeEvent.contentOffset.x;
      const targetIndex = Math.round(scrollX / cardWidth);
      const clampedIndex = Math.max(0, Math.min(targetIndex, array.length - 1));

      // Only update active index - let snapToInterval handle the snapping
      setActiveScrollIndex(clampedIndex);
      lastScrollIndex.current = clampedIndex;
    },
    [array.length, cardWidth]
  );

  const fitMapToMarkers = useCallback(() => {
    if (array.length === 0 || !mapRef.current) return;

    const latitudes = array.map((item) => item.latitude);
    const longitudes = array.map((item) => item.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;
    const deltaLat = (maxLat - minLat) * 1.5;
    const deltaLng = (maxLng - minLng) * 1.5;

    const newRegion = {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: Math.max(deltaLat, 0.05),
      longitudeDelta: Math.max(deltaLng, 0.05),
    };

    mapRef.current.animateToRegion(newRegion, 1000);
  }, [array]);

  const initialRegion = {
    latitude: 37.0902,
    longitude: -95.7129,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const handleMapReady = useCallback(() => {
    openSheet();
    setTimeout(() => {
      fitMapToMarkers();
    }, 500);
  }, [fitMapToMarkers]);

  const handleCardPress = useCallback(
    (index) => {
      setActiveScrollIndex(index);
      lastScrollIndex.current = index;

      // Scroll to the selected card
      if (scrollViewRef?.current) {
        const scrollPosition = index * cardWidth;
        scrollViewRef.current.scrollTo({
          x: scrollPosition,
          animated: true,
        });
      }
    },
    [cardWidth]
  );

  const handleMarkerPress = useCallback(
    (index) => {
      setActiveScrollIndex(index);
      lastScrollIndex.current = index;

      if (scrollViewRef.current) {
        const scrollPosition = index * cardWidth;
        scrollViewRef.current.scrollTo({
          x: scrollPosition,
          animated: true,
        });
      }
    },
    [cardWidth]
  );

  const AnimatedMarker = memo(({ item, index, isActive }) => {
    const markerStyle = useMemo(
      () => [
        styles.marker,
        {
          backgroundColor: isActive ? COLORS.black : COLORS.white,
        },
      ],
      [isActive]
    );

    const textColor = useMemo(
      () => (isActive ? COLORS.white : COLORS.black),
      [isActive]
    );

    return (
      <View style={markerStyle}>
        <CustomText
          label={`$${item.price}`}
          fontSize={11}
          fontFamily={fonts.semiBold}
          lineHeight={11 * 1.4}
          color={textColor}
        />
      </View>
    );
  });

  const handleLocationSelect = (location) => {
    // setAddress(location?.address);
    // if (location.latitude) setLatitude(location.latitude);
    // if (location.longitude) setLongitude(location.longitude);
    // if (location.city) setCity(location.city);
    // if (location.country) {
    //   const foundCountry = COUNTRIES.find(
    //     (country) =>
    //       country.label.toLowerCase() === location.country.toLowerCase()
    //   );
    //   setSelectedCountry(
    //     foundCountry || { label: location.country, code: "US" }
    //   );
    // }
    // if (location.zipCode) setZipCode(location.zipCode);
    // const addressParts = location.address.split(",");
    // if (addressParts.length > 0) {
    //   const streetInfo = addressParts[0].trim();
    //   const streetMatch = streetInfo.match(/^(\d+)\s+(.+)$/);
    //   if (streetMatch) {
    //     setStreetNumber(streetMatch[1]);
    //     setStreetName(streetMatch[2]);
    //   } else {
    //     setStreetName(streetInfo);
    //   }
    // }
    navigation.navigate("RentalVehical");
  };
  return (
    <ScreenWrapper
      translucent={isVisible ? false : true}
      paddingHorizontal={0.1}
    >
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        mapType="standard"
        style={styles.map}
        initialRegion={initialRegion}
        onMapReady={handleMapReady}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={true}
        rotateEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
      >
        {array.map((item, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            onPress={() => handleMarkerPress(i)}
          >
            <AnimatedMarker
              item={item}
              index={i}
              isActive={activeScrollIndex === i}
            />
          </Marker>
        ))}
      </MapView>
      <LocationHeader isVisible={() => setIsVisible(true)} />
      <View style={styles.cardContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
          snapToInterval={cardWidth}
          snapToAlignment="start"
          decelerationRate="fast"
        >
          {array.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleCardPress(i)}
              activeOpacity={0.8}
            >
              <ParkingCard
                price={item.price}
                isActive={activeScrollIndex === i}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <BottomSheetComponent
        ref={sheetRef}
        snapPoints={["13%", "50%", "75%"]}
        initialIndex={-1}
        onChange={(index) => console.log(index)}
        enablePanDownToClose={false}
      >
        <View style={{ paddingHorizontal: 12 }}>
          <CustomText
            color={COLORS.black}
            fontFamily={fonts.semiBold}
            label={"+1,027 Vehicles"}
            fontSize={20}
            lineHeight={20 * 1.4}
          />
        </View>
        <CustomMarketPlace cars={false} />
      </BottomSheetComponent>

      <CustomModalGooglePlaces
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onLocationSelect={handleLocationSelect}
      />
    </ScreenWrapper>
  );
};

export default ParkingMap;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContainer: {
    position: "absolute",
    bottom: 130,
    left: 0,
    right: 0,
    paddingLeft: 12,
  },
  marker: {
    height: 28,
    width: 43,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});

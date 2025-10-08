import { memo, useCallback, useRef, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import BottomSheetComponent from "../../../components/BottomSheetComponent";
import CustomMarketPlace from "../../../components/CustomMarketPlace";
import CustomModalGooglePlaces from "../../../components/CustomModalGooglePlaces";
import CustomText from "../../../components/CustomText";
import LocationHeader from "../../../components/LocationHeader";
import ScreenWrapper from "../../../components/ScreenWrapper";


import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";

const { width } = Dimensions.get("window");

const RrentalMap = ({ navigation }) => {
  const mapRef = useRef(null);
  const sheetRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);
  const lastScrollIndex = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const isScrollingRef = useRef(false);

  const openSheet = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
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

  const cardWidth = width - 24 + 10;

  const handleScroll = useCallback(
    (event) => {
      const scrollX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(scrollX / cardWidth);

      // Set scrolling flag
      isScrollingRef.current = true;

      // Update active index with debounce
      if (
        newIndex !== lastScrollIndex.current &&
        newIndex >= 0 &&
        newIndex < array.length
      ) {
        lastScrollIndex.current = newIndex;
        setActiveScrollIndex(newIndex);
      }
      isScrollingRef.current = false;
    },
    [array.length, cardWidth]
  );

  const handleScrollEnd = useCallback(
    (event) => {
      const scrollX = event.nativeEvent.contentOffset.x;
      const targetIndex = Math.round(scrollX / cardWidth);
      const clampedIndex = Math.max(0, Math.min(targetIndex, array.length - 1));

      setActiveScrollIndex(clampedIndex);
      lastScrollIndex.current = clampedIndex;
      isScrollingRef.current = false;
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

  const scrollToCard = useCallback(
    (index) => {
      if (scrollViewRef?.current && !isScrollingRef.current) {
        const scrollPosition = index * cardWidth;
        scrollViewRef.current.scrollTo({
          x: scrollPosition,
          animated: true,
        });
      }
    },
    [cardWidth]
  );

  const handleCardPress = useCallback(
    (index) => {
      if (index === activeScrollIndex) return; // Prevent unnecessary updates

      setActiveScrollIndex(index);
      lastScrollIndex.current = index;
      scrollToCard(index);
    },
    [cardWidth, activeScrollIndex, scrollToCard]
  );

  const handleMarkerPress = useCallback(
    (index) => {
      if (index === activeScrollIndex) return; // Prevent unnecessary updates

      setActiveScrollIndex(index);
      lastScrollIndex.current = index;
      scrollToCard(index);
    },
    [cardWidth, activeScrollIndex, scrollToCard]
  );

  const AnimatedMarker = memo(
    ({ item, index, isActive }) => {
      return (
        <View
          style={[
            styles.marker,
            {
              backgroundColor: isActive ? COLORS.black : COLORS.white,
              borderWidth: 1,
              borderColor: isActive ? COLORS.black : "#E0E0E0",
            },
          ]}
        >
          <CustomText
            label={`${item.price}`}
            fontSize={11}
            fontFamily={fonts.semiBold}
            lineHeight={11 * 1.4}
            color={isActive ? COLORS.white : COLORS.black}
          />
        </View>
      );
    },
    (prevProps, nextProps) => {
      // Custom comparison function to ensure re-render when isActive changes
      return (
        prevProps.isActive === nextProps.isActive &&
        prevProps.item.price === nextProps.item.price
      );
    }
  );

  const handleLocationSelect = (location) => {
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
            tracksViewChanges={false}
            key={`marker-${i}-${
              activeScrollIndex === i ? "active" : "inactive"
            }`}
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
              {/* <Card price={item.price} isActive={activeScrollIndex === i} /> */}
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

export default RrentalMap;

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

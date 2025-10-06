import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useCallback, useRef, useState } from "react";
import {
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";

import Header from "./molecules/Header";
import Card from "./molecules/Card";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const { width } = Dimensions.get("window");

const MarketplaceMap = () => {
  const mapRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);
  const lastScrollIndex = useRef(0);

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

  const handleScroll = useCallback(
    (event) => {
      const scrollX = event.nativeEvent.contentOffset.x;
      const cardWidth = width - 24;
      const newIndex = Math.round(scrollX / cardWidth);

      if (
        newIndex !== lastScrollIndex.current &&
        newIndex >= 0 &&
        newIndex < array.length
      ) {
        lastScrollIndex.current = newIndex;
        setActiveScrollIndex(newIndex);
      }
    },
    [array.length]
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
    setTimeout(() => {
      fitMapToMarkers();
    }, 500);
  }, [fitMapToMarkers]);

  const handleCardPress = useCallback((index) => {
    setActiveScrollIndex(index);
    lastScrollIndex.current = index;
  }, []);

  const handleMarkerPress = useCallback((index) => {
    setActiveScrollIndex(index);
    lastScrollIndex.current = index;

    if (scrollViewRef.current) {
      const cardWidth = width - 24;
      const scrollPosition = index * cardWidth;
      scrollViewRef.current.scrollTo({
        x: scrollPosition,
        animated: true,
      });
    }
  }, []);

  const AnimatedMarker = ({ item, index }) => {
    const isActive = activeScrollIndex === index;

    return (
      <View
        style={[
          styles.marker,
          {
            backgroundColor: isActive ? COLORS.black : COLORS.white,
          },
        ]}
      >
        <CustomText
          label={`$${item.price}`}
          fontSize={11}
          fontFamily={fonts.semiBold}
          lineHeight={11 * 1.4}
          color={isActive ? COLORS.white : COLORS.black}
        />
      </View>
    );
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header />}
      translucent
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
            // tracksViewChanges={false}
            key={i}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            onPress={() => handleMarkerPress(i)}
          >
            <AnimatedMarker item={item} index={i} />
          </Marker>
        ))}
      </MapView>
      <View style={styles.cardContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={32}
        >
          {array.map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleCardPress(i)}
              activeOpacity={0.8}
            >
              <Card price={item.price} isActive={activeScrollIndex === i} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default MarketplaceMap;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 1000,
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

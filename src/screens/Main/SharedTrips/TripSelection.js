import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import BottomSheetComponent from "../../../components/BottomSheetComponent";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";

import VehicleCard from "../Dashboard/molecules/VehicleCard";

import fonts from "../../../assets/fonts";

const TripSelection = () => {
  const sheetRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: 38.7946,
    longitude: 106.5348,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  const array = [
    {
      title: "Book Instantly",
      subtitle: "Book a Chauffeur instlantly to get you where you need to be.",
      cost: "From $15",
    },
    {
      title: "Book Hourly",
      subtitle:
        "Book an hour-long trip and make as much stops as you need. Recommended for shopping or sightseeing",
      cost: "From $15",
    },
    {
      title: "Reserve for later",
      subtitle:
        "Schedule trips in advance for you or with your friends on a specific date and time.",
      cost: "From $15",
    },
    {
      title: "Shared Trips",
      subtitle:
        "Cars, buses, boats, airplanes tickets. Find trips near your pick-up location and your drop-off location. Share the trip with your friends or other users on a specific date and time.",
      cost: "From $15",
    },
  ];

  const openSheet = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  return (
    <ScreenWrapper translucent paddingHorizontal={0.1}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType="terrain"
        style={styles.map}
        region={region}
        onMapReady={openSheet}
      />
      <BottomSheetComponent
        ref={sheetRef}
        snapPoints={["13%", "50%", "75%"]}
        initialIndex={-1}
        onChange={(index) => console.log(index)}
        enablePanDownToClose={false}
      >
        <View style={{ paddingHorizontal: 10, paddingBottom: 40 }}>
          <CustomText
            label={"When"}
            fontSize={24}
            fontFamily={fonts.semiBold}
            marginBottom={14}
            marginTop={8}
          />
          {array.map((item, index) => (
            <VehicleCard
              key={index}
              title={item.title}
              subHeading={item.subtitle}
              cost={item.cost}
              onPress={item.onPress}
            />
          ))}
        </View>
      </BottomSheetComponent>
    </ScreenWrapper>
  );
};

export default TripSelection;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

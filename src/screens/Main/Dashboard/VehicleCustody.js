import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import BottomSheetComponent from "../../../components/BottomSheetComponent";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";

import VehicleCard from "./molecules/VehicleCard";

import fonts from "../../../assets/fonts";

const VehicleCustody = () => {
  const sheetRef = useRef();
  const navigation = useNavigation();

  const [region, setRegion] = useState({
    latitude: 38.7946,
    longitude: 106.5348,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  const array = [
    {
      title: "I have my own vehicle",
      subtitle: "A well maintained vehicle ready to go.",
    },
    {
      title: "Rent a vehicle",
      subtitle:
        "A great alternative to buying a vehicle, cost-effective and highly flexible",
      cost: "From $450/mo",
      onPress: () => navigation.navigate("CarRental"),
    },
    {
      title: "Buy a vehicle",
      subtitle:
        "Want to own your own vehicle. Browse more than thousands of vehicle on the built-in vehicle marketplace and find the perfect fit for your needs.",
      cost: "From $3,500",
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
        style={StyleSheet.absoluteFillObject}
        region={region}
        onMapReady={openSheet}
      />
      <BottomSheetComponent
        ref={sheetRef}
        snapPoints={["20%", "50%", "75%"]}
        initialIndex={-1}
        onChange={(index) => console.log(index)}
        enablePanDownToClose={false}
      >
        <View style={{ paddingHorizontal: 10, paddingBottom: 40 }}>
          <CustomText
            label={"Do you Own A Vehicle"}
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

export default VehicleCustody;

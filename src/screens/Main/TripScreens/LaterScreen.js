import { useCallback, useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import BottomSheetComponent from "../../../components/BottomSheetComponent";
import ScreenWrapper from "../../../components/ScreenWrapper";
import VehicleCard from "../Dashboard/molecules/VehicleCard";
import CustomText from "../../../components/CustomText";

import { setVisibleBottomSheet } from "../../../store/reducer/bottomSheetSlice";
import fonts from "../../../assets/fonts";

const LaterScreen = () => {
  const dispatch = useDispatch();
  const sheetRef = useRef(null);
  const openSheet = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);
  const [region, setRegion] = useState({
    latitude: 38.7946,
    longitude: 106.5348,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  const array = [
    {
      title: "Appointments",
      subtitle: "Before and after appointments",
      cost: "From $450/mo",
    },
    {
      title: "Landing with Plane",
      subtitle: "Your Chauffeur is ready when you land",
      cost: "From $450/mo",
    },
  ];
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setVisibleBottomSheet(true));
    }, 100);

    return () => clearTimeout(timer);
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
        snapPoints={["13%", "50%", "75%"]}
        initialIndex={-1}
        onChange={(index) => console.log(index)}
        enablePanDownToClose={false}
      >
        <View style={{ paddingHorizontal: 10, paddingBottom: 40 }}>
          <CustomText
            label={"Reserve for later"}
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

export default LaterScreen;

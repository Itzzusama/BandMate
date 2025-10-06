import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import StepOneModal from "./StepOneModal";
import StepTwoModal from "./StepTwoModal";
import TipModal from "./TipModal";

const RatingStepOne = () => {
  const mapRef = useRef(null);

  const [firstModal, setFirstModal] = useState(true);
  const [SecondModal, setSecondModal] = useState(false);
  const [tipModal, setTipModal] = useState(false);

  const [region, setRegion] = useState({
    latitude: 37.0902,
    longitude: -95.7129,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  return (
    <ScreenWrapper translucent paddingHorizontal={0.1}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        mapType="terrain"
        style={styles.map}
        region={region}
        onMapReady={() => {
          mapRef.current?.animateToRegion(
            {
              latitude: 38.7946,
              longitude: 106.5348,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            },
            1000
          );
        }}
      />

      <StepOneModal
        isVisible={firstModal}
        onPress={() => {
          setFirstModal(false),
            setTimeout(() => {
              setSecondModal(true);
            }, 700);
        }}
        onDisable={() => setFirstModal(false)}
      />
      <StepTwoModal
        isVisible={SecondModal}
        onPress={() => {
          setSecondModal(false),
            setTimeout(() => {
              setTipModal(true);
            }, 700);
        }}
        onDisable={() => setSecondModal(false)}
      />
      <TipModal
        isVisible={tipModal}
        onPress={() => {
          setTipModal(false),
            setTimeout(() => {
              setFirstModal(true);
            }, 700);
        }}
        onDisable={() => setTipModal(false)}
      />
    </ScreenWrapper>
  );
};

export default RatingStepOne;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

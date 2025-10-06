import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useMemo, useRef, useState } from "react";
import {
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  View,
} from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Icons from "../../../components/Icons";

import SelectLuggageModal from "./SelectLuggageModal";

import { addDurationToNow } from "../../../utils/constants";
import { PNGIcons } from "../../../assets/images/icons";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const { height } = Dimensions.get("window");

const PickupOptions = ({ route }) => {
  const mapRef = useRef(null);
  const tripData = route?.params?.tripData;
  const totalDuration = useSelector((state) => state.users.totalDuration);
  const selectedVehicle = useSelector((state) => state.users.selectedVehicle);
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState(0);
  const [isLuggageModalVisible, setIsLuggageModalVisible] = useState(false);
  const [selectedLuggageCount, setSelectedLuggageCount] = useState(0);

  const handleNavigate = () => {
    setIsLuggageModalVisible(false);
    setTimeout(() => {
      navigation.navigate("TripCheckout", {
        tripData: tripData,
        extraLuggage: selectedLuggageCount,
        pickupFrom: isSelected,
      });
    }, 500);
  };
  const initialRegion = useMemo(
    () => ({
      latitude: tripData?.startAddress?.lat || 32.1475636,
      longitude: tripData?.startAddress?.long || 74.19141239999999,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    }),
    [tripData?.startAddress?.lat, tripData?.startAddress?.long]
  );
  return (
    <ScreenWrapper translucent paddingHorizontal={0.1}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        region={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
      >
        {/* Stop Markers */}
        {tripData?.startAddress?.lat && tripData?.startAddress?.long ? (
          <Marker
            // tracksViewChanges={false}
            coordinate={{
              latitude: tripData?.startAddress?.lat,
              longitude: tripData?.startAddress?.long,
            }}
          >
            <Image
              source={PNGIcons.fromMarker}
              style={styles.fromMarker}
              resizeMode="contain"
            />
          </Marker>
        ) : null}
      </MapView>
      <View style={styles.modalContainer}>
        <View style={styles.greeBanner}>
          <View style={styles.row}>
            <ImageFast
              source={Images.WhiteDiscount}
              style={{ width: 14, height: 14 }}
            />
            <CustomText
              label="Get benefits & Discounts"
              color={COLORS.white}
              lineHeight={14 * 1.4}
              marginLeft={4}
            />
          </View>
          <CustomText
            label="move+"
            color={COLORS.white}
            lineHeight={14 * 1.4}
            textTransform="none"
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.detailsContainer}>
            <CustomText
              label="Pickup options"
              color={COLORS.black}
              fontSize={20}
              lineHeight={20 * 1.4}
              fontFamily={fonts.semiBold}
            />
            <CustomText
              label={tripData?.startAddress?.address || ""}
              color="#121212A3"
              lineHeight={14 * 1.4}
              fontFamily={fonts.medium}
              marginBottom={8}
            />
            <View style={styles.row}>
              <CustomText
                label={addDurationToNow(totalDuration)}
                color={COLORS.black}
                fontSize={20}
                lineHeight={20 * 1.4}
                fontFamily={fonts.semiBold}
              />
              <CustomText
                label="(ETA)"
                color="#121212A3"
                fontSize={16}
                lineHeight={16 * 1.4}
                fontFamily={fonts.medium}
              />
            </View>
            <View style={styles.selectedContainer}>
              {["at the curb", "at the doorstep", "at the reception"].map(
                (item, i) => (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.9}
                    onPress={() => setIsSelected(item)}
                    style={[
                      styles.row,
                      styles.border,
                      { borderBottomWidth: i == 2 ? 0 : 1 },
                    ]}
                  >
                    <Icons
                      family="MaterialCommunityIcons"
                      name={
                        isSelected === item
                          ? "radiobox-marked"
                          : "radiobox-blank"
                      }
                      size={28}
                      color={
                        isSelected === item ? COLORS.darkPurple : COLORS.gray2
                      }
                    />

                    <CustomText
                      label={item}
                      color={COLORS.black}
                      fontSize={16}
                      lineHeight={16 * 1.4}
                      marginLeft={8}
                      fontFamily={fonts.medium}
                    />
                  </TouchableOpacity>
                )
              )}
            </View>
            <AuthFooter
              btnSize={16}
              btnDisabled={!isSelected}
              btnTitle="Confirm Pickup"
              isMain
              title="The easiest and most affordable way to reach your destination."
              titleSize={10}
              onPress={() => {
                if (
                  selectedVehicle?.GeneralPricing?.Luggage?.model == "Limited"
                ) {
                  setIsLuggageModalVisible(true);
                } else {
                  handleNavigate();
                }
              }}
            />
          </View>
        </ScrollView>
      </View>
      <SelectLuggageModal
        isVisible={isLuggageModalVisible}
        onDisable={() => setIsLuggageModalVisible(false)}
        selectedLuggageCount={selectedLuggageCount}
        setSelectedLuggageCount={setSelectedLuggageCount}
        handleNavigate={handleNavigate}
        selectedVehicle={selectedVehicle}
      />
    </ScreenWrapper>
  );
};

export default PickupOptions;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    height: height / 2,
    bottom: 0,
    position: "absolute",
  },
  map: {
    width: "100%",
    height: "60%",
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    flexGrow: 1,
    width: "100%",
  },
  greeBanner: {
    backgroundColor: "#37B874",
    width: "100%",
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  selectedContainer: {
    marginTop: 18,
    backgroundColor: "#1212120A",
    borderRadius: 12,
    marginBottom: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#1212120A",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  fromMarker: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
});

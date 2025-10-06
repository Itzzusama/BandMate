import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import React, { useRef, useState } from "react";

import CustomCheckbox from "../../../components/CustomCheckBox";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomButton from "../../../components/CustomButton";
import CustomSwitch from "../../../components/CustomSwitch";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import TripCard from "../../../components/TripCard";
import Divider from "../../../components/Divider";
import Icons from "../../../components/Icons";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const TripCheckout = ({ route }) => {
  const navigation = useNavigation();

  const selectedVehicle = useSelector((state) => state.users.selectedVehicle);
  const foodAndBeverage = useSelector((state) => state.users.foodAndBeverage);
  const foodPrice = foodAndBeverage?.reduce(
    (total, item) =>
      total + Number(item?.quantity || 0) * Number(item?.unitPrice || 0),
    0
  );

  // Preserve initial params to avoid losing them on navigation back
  const initialParamsRef = useRef({
    tripData: route?.params?.tripData,
    extraLuggage: route?.params?.extraLuggage,
    pickupFrom: route?.params?.pickupFrom,
  });

  const tripData = route?.params?.tripData ?? initialParamsRef.current.tripData;
  const extraLuggage =
    route?.params?.extraLuggage ?? initialParamsRef.current.extraLuggage;
  const pickupFrom =
    route?.params?.pickupFrom ?? initialParamsRef.current.pickupFrom;
  const totalDistance = tripData?.totalDistance?.reduce(
    (acc, curr) => acc + curr,
    0
  );

  const [give1Percent, setGive1Percent] = useState(false);
  const [plantTrees, setPlantTrees] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [usedPricePerKm, setUsedPricePerKm] = useState(0);
  const [Company, setCompany] = useState(false);
  const [Round, setRound] = useState(false);
  const [tourists, setTourists] = useState({
    passengers:
      (tripData?.adults || 0) +
        (tripData?.children || 0) +
        (tripData?.infants || 0) || 0,
    luggage: extraLuggage || 0,
  });

  const touristSelectionData = [
    {
      title: "How many passengers",
      disc: `Currently: ${tourists.passengers || 0} passengers`,
      value: tourists.passengers,
      onPlusPress: () => handleIncrement("passengers"),
      onMinusPress: () => handleDecrement("passengers"),
    },
    {
      title: "Do you need extra luggage?",
      disc: `Currently: ${tourists.luggage || 0} extra luggage - `,
      value: tourists.luggage,
      onPlusPress: () => handleIncrement("luggage"),
      onMinusPress: () => handleDecrement("luggage"),
    },
  ];

  const handleIncrement = (type) => {
    setTourists((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleDecrement = (type) => {
    if (tourists[type] > 0) {
      setTourists((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
      }));
    }
    if (type === "adult" && tourists.adult <= 1) {
      setTourists((prev) => ({
        ...prev,
        adult: 1,
      }));
    }
  };

  // Price calculation function
  const calculateTotalPrice = () => {
    const currentDate = new Date();
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const currentHour = currentDate.getHours();
    const isNight = currentHour >= 18 || currentHour < 6;

    let pricePerKm = 0;
    if (isWeekend && isNight) {
      pricePerKm =
        (totalDistance || 0) <= 10
          ? selectedVehicle?.GeneralPricing?.ppkmless10kmWeekendNight || 0
          : selectedVehicle?.GeneralPricing?.ppkmgrater10kmWeekendNight || 0;
    } else if (isWeekend) {
      pricePerKm =
        (totalDistance || 0) <= 10
          ? selectedVehicle?.GeneralPricing?.ppkmless10kmWeekend || 0
          : selectedVehicle?.GeneralPricing?.ppkmgrater10kmWeekend || 0;
    } else if (isNight) {
      pricePerKm =
        (totalDistance || 0) <= 10
          ? selectedVehicle?.GeneralPricing?.ppkmless10kmNight || 0
          : selectedVehicle?.GeneralPricing?.ppkmgrater10kmNight || 0;
    } else {
      pricePerKm =
        (totalDistance || 0) <= 10
          ? selectedVehicle?.GeneralPricing?.ppkmless10km || 0
          : selectedVehicle?.GeneralPricing?.ppkmgrater10km || 0;
    }

    setUsedPricePerKm(pricePerKm || 0);

    const baseAndDistance =
      (selectedVehicle?.GeneralPricing?.basePrice || 0) +
      (totalDistance || 0) * (pricePerKm || 0);

    const passengerPrice =
      (tourists.passengers || 0) *
      (selectedVehicle?.GeneralPricing?.Passengers?.price || 0);
    const luggagePrice =
      (tourists.luggage || 0) *
      (selectedVehicle?.GeneralPricing?.Luggage?.price || 0);

    let baseAmount = baseAndDistance + passengerPrice + luggagePrice;
    baseAmount = baseAmount - 5.0; // Discount
    baseAmount = baseAmount + 1.5; // Service fee

    setBasePrice(baseAmount);

    let finalAmount = baseAmount;

    // Add 1% for give1Percent
    if (give1Percent) {
      finalAmount += baseAmount * 0.01;
    }

    // Add 1% for plantTrees
    if (plantTrees) {
      finalAmount += baseAmount * 0.01;
    }

    setTotalPrice(((finalAmount || 0) + (foodPrice || 0)).toFixed(2));
  };

  // Update price when dependencies change
  React.useEffect(() => {
    calculateTotalPrice();
  }, [
    totalDistance,
    tourists,
    give1Percent,
    plantTrees,
    selectedVehicle,
    foodPrice,
  ]);

  return (
    <ScreenWrapper translucent paddingHorizontal={0.1}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType="terrain"
        style={StyleSheet.absoluteFillObject}
        region={{
          latitude: 38.7946,
          longitude: 106.5348,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      />
      <View style={styles.overlay} />
      <View style={styles.modalContainer}>
        <View style={styles.greeBanner}>
          <ImageFast
            source={Images.WhiteDiscount}
            style={{ width: 14, height: 14 }}
          />
          <CustomText
            label="Save by using move+"
            color={COLORS.white}
            fontFamily={fonts.regular}
            fontSize={14}
          />
        </View>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <TripCard
            width="100%"
            mainImageStyle={{ width: 350, height: 150 }}
            item={selectedVehicle}
            totalDistance={tripData?.totalDistance?.reduce(
              (acc, curr) => acc + curr,
              0
            )}
          />
          <Divider thickness={4} />

          {touristSelectionData?.map((item, i) => (
            <View
              key={i}
              style={[
                styles.row,
                {
                  marginBottom: 16,
                  paddingHorizontal: 12,
                  borderBottomWidth: i == 0 ? 1 : 0,
                  paddingBottom: i == 0 ? 12 : 0,
                  borderColor: "#1212120A",
                },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <CustomText
                    label={item.title}
                    color={COLORS.black}
                    fontSize={16}
                    lineHeight={16 * 1.4}
                    fontFamily={fonts.medium}
                  />
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <CustomText
                      label={item.disc}
                      color="#1212127A"
                      fontSize={12}
                      lineHeight={12 * 1.4}
                      fontFamily={fonts.medium}
                    />
                    {i == 1 && (
                      <CustomText
                        label={
                          tourists.luggage > 0
                            ? `$${
                                selectedVehicle?.GeneralPricing?.Luggage
                                  ?.price || 0
                              } per luggage`
                            : "Free"
                        }
                        color="#4347FF"
                        fontSize={10}
                        lineHeight={10 * 1.4}
                        fontFamily={fonts.medium}
                      />
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.touristSelectionContainer}>
                {item.value == 0 ? (
                  <View style={{ width: 32, height: 32 }} />
                ) : (
                  <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => item.onMinusPress()}
                  >
                    <Icons
                      name="minus"
                      family="Feather"
                      size={20}
                      color={COLORS.black}
                    />
                  </TouchableOpacity>
                )}
                <CustomText
                  label={item?.value?.toString()}
                  color={COLORS.black}
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.medium}
                />
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => item.onPlusPress()}
                >
                  <Icons
                    name="plus"
                    family="Feather"
                    size={20}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {selectedVehicle?.FoodAndBeverage?.length ? (
            <>
              <Divider thickness={4} marginVertical={0.1} />
              <CustomButton
                title="Select Food & Beverage"
                marginBottom={16}
                marginTop={16}
                width="90%"
                onPress={() => navigation.navigate("TripAdOns")}
              />
            </>
          ) : null}

          <Divider thickness={4} marginVertical={0.1} />

          <View style={styles.checkboxContainer}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <ImageFast
                source={Images.GiveTip}
                style={{ width: 24, height: 24 }}
              />
              <View>
                <CustomText
                  label="Give 1% of your trip"
                  color={COLORS.black}
                  fontSize={14}
                  lineHeight={14 * 1.4}
                  fontFamily={fonts.medium}
                />
                <CustomText
                  label="To Children in Croatia"
                  color={"#1212127A"}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  fontFamily={fonts.medium}
                />
              </View>
            </View>
            <Icons
              family="MaterialCommunityIcons"
              name={give1Percent ? "radiobox-marked" : "radiobox-blank"}
              size={28}
              color={give1Percent ? COLORS.darkPurple : COLORS.gray2}
              onPress={() => setGive1Percent(!give1Percent)}
            />
          </View>

          <View style={[styles.checkboxContainer, { borderBottomWidth: 0 }]}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <ImageFast
                source={Images.PlantTree}
                style={{ width: 24, height: 24 }}
              />
              <View>
                <CustomText
                  label="1% goes to planting trees worldwide!"
                  color="#04724D"
                  fontSize={14}
                  lineHeight={14 * 1.4}
                  fontFamily={fonts.medium}
                />
                <CustomText
                  label="With this trip you plan 10 trees"
                  color="#1212127A"
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  fontFamily={fonts.medium}
                />
              </View>
            </View>
            <Icons
              family="MaterialCommunityIcons"
              name={plantTrees ? "radiobox-marked" : "radiobox-blank"}
              size={28}
              color={plantTrees ? COLORS.darkPurple : COLORS.gray2}
              onPress={() => setPlantTrees(!plantTrees)}
            />
          </View>

          <View style={styles.detailsContainer}>
            <CustomText
              label="Trip details"
              color={COLORS.black}
              fontSize={20}
              lineHeight={20 * 1.4}
              fontFamily={fonts.semiBold}
            />
            <View style={styles.invoice}>
              <View style={styles.row}>
                <CustomText
                  label="Subtotal"
                  color="#1212127A"
                  fontSize={14}
                  lineHeight={14 * 1.4}
                  fontFamily={fonts.regular}
                />
                <CustomText
                  label={`$${(usedPricePerKm * totalDistance || 0).toFixed(2)}`}
                  color={COLORS.black}
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.regular}
                />
              </View>
              <Divider marginVertical={16} thickness={1} />

              <View style={styles.row}>
                <CustomText
                  label={`Distance (${totalDistance?.toFixed()}km*$${
                    usedPricePerKm || 0
                  })`}
                  color="#1212127A"
                  fontSize={14}
                  lineHeight={14 * 1.4}
                  fontFamily={fonts.regular}
                />
                <CustomText
                  label={`$${(
                    (totalDistance || 0) * (usedPricePerKm || 0)
                  ).toFixed(2)}`}
                  color={COLORS.black}
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.regular}
                />
              </View>
              <Divider marginVertical={16} thickness={1} />
              <View style={styles.row}>
                <CustomText
                  label={`Passengers (${tourists.passengers}*$${
                    selectedVehicle?.GeneralPricing?.Passengers?.price || 0
                  })`}
                  color="#1212127A"
                  fontSize={14}
                  lineHeight={14 * 1.4}
                  fontFamily={fonts.regular}
                />
                <CustomText
                  label={`$${(
                    (tourists.passengers || 0) *
                    (selectedVehicle?.GeneralPricing?.Passengers?.price || 0)
                  ).toFixed(2)}`}
                  color={COLORS.black}
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.regular}
                />
              </View>
              <Divider marginVertical={16} thickness={1} />

              <View style={styles.row}>
                <CustomText
                  label={"Discount"}
                  color="#1212127A"
                  fontSize={14}
                  lineHeight={14 * 1.4}
                  fontFamily={fonts.regular}
                />
                <CustomText
                  label={"- $5.00"}
                  color="#37B874"
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.regular}
                />
              </View>
              <Divider marginVertical={16} thickness={1} />

              <View style={styles.row}>
                <CustomText
                  label={"Service fee"}
                  color="#1212127A"
                  fontSize={14}
                  lineHeight={14 * 1.4}
                  fontFamily={fonts.regular}
                />
                <CustomText
                  label={"$1.50"}
                  color="#1212127A"
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.regular}
                />
              </View>
              {give1Percent ? (
                <>
                  <Divider marginVertical={16} thickness={1} />
                  <View style={styles.row}>
                    <CustomText
                      label={"Support communities (1%)"}
                      color="#1212127A"
                      fontSize={14}
                      lineHeight={14 * 1.4}
                      fontFamily={fonts.regular}
                    />
                    <CustomText
                      label={`$${(basePrice * 0.01).toFixed(2)}`}
                      color={COLORS.black}
                      fontSize={16}
                      lineHeight={16 * 1.4}
                      fontFamily={fonts.regular}
                    />
                  </View>
                </>
              ) : null}

              {plantTrees ? (
                <>
                  <Divider marginVertical={16} thickness={1} />
                  <View style={styles.row}>
                    <CustomText
                      label={"Plant trees (1%)"}
                      color={"#1212127A"}
                      fontSize={14}
                      lineHeight={14 * 1.4}
                      fontFamily={fonts.regular}
                    />
                    <CustomText
                      label={`$${(basePrice * 0.01).toFixed(2)}`}
                      color={"#04724D"}
                      fontSize={16}
                      lineHeight={16 * 1.4}
                      fontFamily={fonts.regular}
                    />
                  </View>
                </>
              ) : null}

              <View style={[styles.row, { marginTop: 24, marginBottom: 24 }]}>
                <CustomText
                  label={"Total"}
                  color={COLORS.black}
                  fontSize={20}
                  lineHeight={20 * 1.4}
                  fontFamily={fonts.semiBold}
                />
                <CustomText
                  label={`$${totalPrice}`}
                  color={COLORS.black}
                  fontSize={20}
                  lineHeight={20 * 1.4}
                  fontFamily={fonts.semiBold}
                />
              </View>

              <CustomText
                label={
                  "move is a technology platform that facilitates connections between clients and independent, third-party drivers. move does not employ drivers, does not set prices, and does not determine acceptance of ride requests. Drivers have full discretion over their pricing and which trips they choose to accept. All transportation services are provided solely by these independent providers under direct agreement with clients; move does not participate in or assume responsibility for any part of the transportation transaction. Payments are made directly between clients and drivers. No employment, partnership, or agency relationship exists or is implied between move and any driver. move bears no liability for the acts, omissions, or disputes arising from rides booked via the platform. Each party is responsible for compliance with all applicable laws and regulations."
                }
                fontFamily={fonts.regular}
                fontSize={12}
                // marginBottom={105}
                color="#1212127A"
              />
            </View>
          </View>
          <View style={styles.footer}>
            <View style={[styles.row]}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <View style={styles.companyCheckbox}>
                  <CustomCheckbox value={Company} onValueChange={setCompany} />
                </View>
                <View style={styles.line} />
                <ImageFast
                  source={Images.visa}
                  resizeMode="contain"
                  style={{ width: 30, height: 20 }}
                />
                <View>
                  <CustomText
                    label={"Company"}
                    fontSize={16}
                    fontFamily={fonts.medium}
                    lineHeight={16 * 1.4}
                    color={COLORS.black}
                  />
                  <CustomText
                    label={"80,750.00 credits"}
                    fontSize={12}
                    fontFamily={fonts.medium}
                    lineHeight={12 * 1.4}
                    color="#1212127A"
                  />
                </View>
              </View>
              <Icons name={"chevron-right"} family={"Entypo"} size={20} />
            </View>
            <View style={[styles.row, { marginTop: 8 }]}>
              <CustomText
                label={"Round-up price"}
                fontSize={16}
                fontFamily={fonts.medium}
                lineHeight={16 * 1.4}
              />
              <CustomSwitch value={Round} setValue={setRound} />
            </View>
            <AuthFooter
              btnSize={16}
              btnTitle="Confirm & Pay"
              secondText={`$${totalPrice} All Included.`}
              // onPress={() => navigation.navigate("TripAdOns")}
              onPress={() =>
                navigation.navigate("OrderConfirmPin", {
                  tripData: tripData,
                  pickupFrom,
                  tourists,
                  totalPrice,
                  give1Percent,
                  plantTrees,
                })
              }
            />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default TripCheckout;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 120,
  },
  line: {
    width: 1,
    height: 40,
    backgroundColor: "#1212120A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#121212A3",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    top: 120,
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    flexGrow: 1,
    width: "100%",
  },
  icon: {
    height: 16,
    width: 16,
  },

  greeBanner: {
    backgroundColor: "#37B874",
    width: "100%",
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    gap: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttons: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#1212120A",
  },

  touristSelectionContainer: {
    width: "26%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    paddingVertical: 12,
    borderBottomColor: "#1212120A",
  },
  detailsContainer: {
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  invoice: {
    paddingVertical: 12,
  },

  companyCheckbox: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: "#1212120A",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

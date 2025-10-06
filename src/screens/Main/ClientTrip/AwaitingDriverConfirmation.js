import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Share,
  View,
  Image,
} from "react-native";

import CustomModalGooglePlaces from "../../../components/CustomModalGooglePlaces";
import BottomSheetComponent from "../../../components/BottomSheetComponent";
import { useSocket } from "../../../components/SocketProvider";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomModal from "../../../components/CustomModal";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import AppLoader from "../../../components/AppLoader";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";

import TripPaymentMethod from "./molecules/TripPaymentMethod";
import SelectedTripFoods from "./molecules/SelectedTripFoods";
import AwatingTripCard from "./molecules/AwatingTripCard";
import TripVehicleInfo from "./molecules/TripVehicleInfo";
import TripPassangers from "./molecules/TripPassangers";
import TripPromoCode from "./molecules/TripPromoCode";
import TripActions from "./molecules/TripActions";
import TripSummary from "./molecules/TripSummary";
import TripCarouge from "./molecules/TripCarouge";
import TripCharity from "./molecules/TripCharity";
import TripInvoice from "./molecules/TripInvoice";
import ShareTrip from "./molecules/ShareTrip";
import TripSpots from "./molecules/TripSpots";
import TripSteps from "./molecules/TripSteps";
import TripTip from "./molecules/TripTip";

import { calculateRoadDistanceAndTime } from "../../../utils/LocationUtils";
import { ToastMessage } from "../../../utils/ToastMessage";
import { PNGIcons } from "../../../assets/images/icons";
import { get, put } from "../../../services/ApiRequest";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const AwaitingDriverConfirmation = ({ route }) => {
  const sheetRef = useRef(null);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const { socket, isConnected } = useSocket();
  const userData = useSelector((state) => state.users.userData);
  const orderId = route?.params?.orderId;
  const isShipping = route?.params?.isShipping;
  const [tipPrice, setTipPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState({});
  const [isColorSignalModal, setIsColorSignalModal] = useState(false);
  const [routeCoords, setRouteCoords] = useState([]);
  const [isAddStepModal, setIsAddStepModal] = useState(false);
  const [addStopLoading, setAddStopLoading] = useState(false);

  let vehicle = orderData?.Vehicle;
  let user = orderData?.user;
  let acceptedBy = orderData?.acceptedBy;
  let metadata = orderData?.metadata;

  // Memoized coordinates from metadata
  const startCoords = useMemo(() => {
    if (!metadata?.order?.startAddress) return null;
    return {
      latitude: metadata.order.startAddress.lat,
      longitude: metadata.order.startAddress.long,
    };
  }, [metadata?.order?.startAddress]);

  const endCoords = useMemo(() => {
    if (!metadata?.order?.endAddress) return null;
    return {
      latitude: metadata.order.endAddress.lat,
      longitude: metadata.order.endAddress.long,
    };
  }, [metadata?.order?.endAddress]);

  const validStops = useMemo(() => {
    const steps = metadata?.order?.steps || [];
    return steps?.map((stop) => ({ latitude: stop.lat, longitude: stop.long }));
  }, [metadata?.order?.steps]);

  // Polyline decode function
  const decode = useCallback((polyline) => {
    const points = [];
    let index = 0;
    const len = polyline.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return points;
  }, []);

  // Get route from Google Directions API
  const getRoute = useCallback(async () => {
    if (!startCoords || !endCoords) {
      console.log("Invalid coordinates");
      return;
    }

    try {
      const origin = `${startCoords.latitude},${startCoords.longitude}`;
      const destination = `${endCoords.latitude},${endCoords.longitude}`;

      let waypoints = "";
      if (metadata?.order?.steps?.length > 0) {
        const validWaypointStrings = metadata.order.steps.map(
          (coord) => `${coord.lat},${coord.long}`
        );
        waypoints = `&waypoints=${validWaypointStrings.join("|")}`;
      }

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}${waypoints}&key=AIzaSyB3Tj9fWzywtOncQ7vNjcErxRM5E--WlDA`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK" && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const points = decode(route.overview_polyline.points);
        setRouteCoords(points);

        setTimeout(() => {
          fitMapToCoordinates();
        }, 1000);
      } else {
        console.log("API Error:", data.status);
      }
    } catch (error) {
      console.error("Route error:", error);
    }
  }, [startCoords, endCoords, metadata?.order?.steps, decode]);

  // Fit map to show all coordinates
  const fitMapToCoordinates = useCallback(() => {
    if (!mapRef.current || !startCoords || !endCoords) return;

    const coordinates = [startCoords, endCoords];

    if (validStops.length > 0) {
      coordinates.push(...validStops);
    }

    if (coordinates.length > 0) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 100,
          right: 50,
          bottom: 350,
          left: 50,
        },
        animated: true,
      });
    }
  }, [startCoords, endCoords, validStops]);

  // Initial region for map
  const initialRegion = useMemo(() => {
    if (startCoords) {
      return {
        latitude: startCoords.latitude,
        longitude: startCoords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }
    return {
      latitude: 37.7749,
      longitude: -122.4194,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }, [startCoords]);

  const getOrderData = async () => {
    try {
      const res = await get(`orders/${orderId}`);
      setOrderData(res?.data?.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  // Get route when coordinates are available
  useEffect(() => {
    if (startCoords && endCoords && !loading) {
      getRoute();
    }
  }, [startCoords, endCoords, loading, getRoute]);

  // Open bottom sheet after component mounts and data is loaded
  useEffect(() => {
    if (orderData?._id) {
      setTimeout(() => {
        sheetRef.current?.snapToIndex(1);
      }, 1000);
    }
  }, [loading, orderData]);

  // customer socket emit
  const onAddRating = () => {
    if (socket && isConnected && userData?.role == "user") {
      socket.emit(
        "order:ratting",
        {
          orderId,
          ratting: {
            ploiteness: true,
            cleanliness: false,
            professionalism: true,
            recommended: false,
            pricing: true,
            comment: "Best Vehicle",
          },
        },
        (data) => {
          console.log("===============order:ratting:res", data);
        }
      );
    }
  };

  // customer socket emit
  const onAddTip = (tip) => {
    if (socket && isConnected && userData?.role == "user") {
      socket.emit(
        "order:update",
        {
          orderId,
          tip: tip || 0,
        },
        (response) => {
          ToastMessage("Tip Added Successfully", "success");
        }
      );
    }
  };

  // driver socket emit
  const onCompleteTrip = () => {
    if (socket && isConnected && userData?.role != "user") {
      socket.emit(
        "rider:order:complete",
        {
          orderId,
        },
        (response) => {
          console.log("============order:complete:res", response);
          ToastMessage("Tip Complete Successfully", "success");
          navigation.replace("TabStack");
        }
      );
    }
  };
  const onCancelTrip = () => {
    if (socket && isConnected && userData?.role == "user") {
      socket.emit(
        "order:cancel",
        {
          orderId,
          reason: "Create a New Trip",
        },
        (response) => {
          ToastMessage("Tip Cancel Successfully", "success");
          navigation.replace("TabStack");
        }
      );
    }
  };

  // driver socket listen
  useEffect(() => {
    if (socket && isConnected && userData?.role != "user") {
      socket.on("rider:order:status", (data) => {
        if (data?.status === "Added tip") {
          ToastMessage(data?.message, "success");
        } else if (data?.status === "cancelled") {
          ToastMessage(data?.message, "success");
          navigation.replace("TabStack");
        }
      });
      return () => {
        socket.off("rider:order:status");
      };
    }
  }, [socket, isConnected]);

  // customer socket listen
  useEffect(() => {
    if (socket && isConnected && userData?.role == "user") {
      socket.on("order:status", (data) => {
        if (data?.status == "completed") {
          ToastMessage("Order Completed From Driver", "success");
          navigation.replace("TabStack");
        }
      });
      return () => {
        socket.off("rider:order:status");
      };
    }
  }, [socket, isConnected]);

  const calculatePrice = (distanceKm = 0) => {
    setAddStopLoading(true);
    const currentDate = new Date();
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

    const currentHour = currentDate.getHours();
    const isNight = currentHour >= 18 || currentHour < 6;
    // Guard against missing pricing
    const pricing = vehicle?.GeneralPricing || {};

    let pricePerKm = 0;
    const withinTenKm = distanceKm <= 10;

    if (isWeekend && isNight) {
      pricePerKm = withinTenKm
        ? pricing.ppkmless10kmWeekendNight || 0
        : pricing.ppkmgrater10kmWeekendNight || 0;
    } else if (isWeekend) {
      pricePerKm = withinTenKm
        ? pricing.ppkmless10kmWeekend || 0
        : pricing.ppkmgrater10kmWeekend || 0;
    } else if (isNight) {
      pricePerKm = withinTenKm
        ? pricing.ppkmless10kmNight || 0
        : pricing.ppkmgrater10kmNight || 0;
    } else {
      pricePerKm = withinTenKm
        ? pricing.ppkmless10km || 0
        : pricing.ppkmgrater10km || 0;
    }

    const distancePrice = distanceKm * pricePerKm;
    return distancePrice;
  };

  const handleLocationSelect = async (location) => {
    const oldLastStep =
      metadata?.order?.steps[metadata?.order?.steps.length - 1];
    const newStepsArray = [
      {
        address: oldLastStep.address,
        lat: oldLastStep.lat,
        long: oldLastStep.long,
      },
      {
        address: location.address,
        lat: location.latitude,
        long: location.longitude,
      },
      {
        address: metadata.order.startAddress.address,
        lat: metadata.order.startAddress.lat,
        long: metadata.order.startAddress.long,
      },
    ];

    let totalDistance = [];
    let totalTime = [];

    for (let i = 0; i < newStepsArray.length - 1; i++) {
      const currentLocation = newStepsArray[i];
      const nextLocation = newStepsArray[i + 1];

      if (
        currentLocation.lat &&
        currentLocation.long &&
        nextLocation.lat &&
        nextLocation.long &&
        !isNaN(currentLocation.lat) &&
        !isNaN(currentLocation.long) &&
        !isNaN(nextLocation.lat) &&
        !isNaN(nextLocation.long)
      ) {
        try {
          const result = await calculateRoadDistanceAndTime(
            {
              lat: parseFloat(currentLocation.lat),
              long: parseFloat(currentLocation.long),
            },
            {
              lat: parseFloat(nextLocation.lat),
              long: parseFloat(nextLocation.long),
            }
          );
          totalDistance.push(result?.distanceKm || 0);
          totalTime.push(result?.timeInMinutes || 0);
        } catch (error) {
          console.log(`Error calculating distance ${i} to ${i + 1}:`, error);
          totalDistance.push(0);
          totalTime.push(0);
        }
      } else {
        console.log(`Invalid coordinates for ${i} to ${i + 1}`);
        totalDistance.push(0);
        totalTime.push(0);
      }
    }

    const oldTotalDistance = metadata?.order?.totalDistance?.slice(0, -1) || [];
    const oldTotalTime = metadata?.order?.totalTime?.slice(0, -1) || [];
    const addedDistanceKm = totalDistance.reduce(
      (sum, d) => sum + (Number(d) || 0),
      0
    );
    const extraPrice = calculatePrice(addedDistanceKm);
    let newMetadata = {
      ...metadata,
      order: {
        ...metadata?.order,
        steps: [
          ...metadata?.order?.steps,
          {
            address: location.address,
            lat: location.latitude,
            long: location.longitude,
          },
        ],
        totalDistance: [...oldTotalDistance, ...totalDistance],
        totalTime: [...oldTotalTime, ...totalTime],
      },
      extraData: {
        extraPrice: (metadata?.extraData?.extraPrice || 0) + extraPrice,
        extraDistance:
          (metadata?.extraData?.extraDistance || 0) + addedDistanceKm,
      },
    };

    const body = { metadata: newMetadata };
    console.log("===========body", body);
    try {
      const res = await put(`orders/${orderId}`, body);
      console.log("===========res", res.data);
      getOrderData();
      setAddStopLoading(false);
    } catch (error) {
      setAddStopLoading(false);
    }
  };

  if (loading) return <AppLoader isVisible={loading} />;

  return (
    <ScreenWrapper paddingHorizontal={0.1} translucent>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
      >
        {/* Start Location Marker */}
        {startCoords && (
          <Marker
            coordinate={startCoords}
            title="Start Location"
            description={metadata?.order?.startAddress?.address}
          >
            <Image
              source={PNGIcons.marker1}
              style={styles.marker1Icon}
              resizeMode="contain"
            />
          </Marker>
        )}

        {/* Intermediate Stops Markers */}
        {metadata?.order?.steps?.map((stop, index) => (
          <Marker
            key={`stop_${index}`}
            coordinate={{
              latitude: stop.lat,
              longitude: stop.long,
            }}
            title={`Stop ${index + 1}`}
            description={stop.address || ""}
          >
            <Image
              source={PNGIcons.marker2}
              style={styles.marker2Icon}
              resizeMode="contain"
            />
          </Marker>
        ))}

        {/* End Location Marker */}
        {endCoords && (
          <Marker
            coordinate={endCoords}
            title="Destination"
            description={metadata?.order?.endAddress?.address}
          >
            <Image
              source={PNGIcons.marker1}
              style={styles.marker1Icon}
              resizeMode="contain"
            />
          </Marker>
        )}

        {/* Route Polyline */}
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor={COLORS.blue}
            strokeWidth={4}
          />
        )}
      </MapView>
      <BottomSheetComponent
        ref={sheetRef}
        snapPoints={["13.5%", "50%", "80%"]}
        initialIndex={1}
        onChange={(index) => console.log(index)}
        enablePanDownToClose={false}
        contentContainerStyle={{
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
        }}
        handleVisible={false}
        handleStyle={{
          backgroundColor: "red",
          margin: 0,
          padding: 0,
        }}
      >
        <View style={styles.modalContainer}>
          <AwatingTripCard data={metadata} />
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
            {isShipping ? null : (
              <>
                <Divider thickness={4} marginVertical={0} />
                <View style={styles.card}>
                  <TripVehicleInfo vehicle={vehicle} acceptedBy={acceptedBy} />
                </View>
              </>
            )}

            <View style={styles.card}>
              <TripSummary data={metadata} />
            </View>
            {isShipping ? (
              <>
                <View
                  style={{
                    width: "100%",
                    height: 160,
                    backgroundColor: "#EE1045",
                    padding: 12,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CustomText
                    fontSize={16}
                    lineHeight={16 * 1.4}
                    label="Your delivery code"
                    fontFamily={fonts.medium}
                    color="#FFFFFFA3"
                  />
                  <CustomText
                    fontSize={48}
                    lineHeight={48 * 1.4}
                    label="1958"
                    fontFamily={fonts.semiBold}
                    color="#FFFFFF"
                  />
                  <CustomText
                    fontSize={16}
                    lineHeight={16 * 1.4}
                    label={`Share this code with your driver upon\nDelivery`}
                    fontFamily={fonts.medium}
                    textAlign="center"
                    color="#FFFFFFA3"
                  />
                </View>

                <View style={styles.card}>
                  <TripVehicleInfo />
                </View>
              </>
            ) : null}

            <View style={styles.review}>
              <CustomText
                fontSize={12}
                color="#fff"
                lineHeight={12 * 1.4}
                fontFamily={fonts.medium}
                label="+  SEE MORE REVIEWS"
              />
              <Icons
                size={24}
                color="#fff"
                family="Entypo"
                name="chevron-small-down"
              />
            </View>

            <Divider thickness={isShipping ? 0 : 4} marginVertical={0.1} />
            {isShipping ? (
              <View
                style={{
                  backgroundColor: "#F6F6F6",
                  width: "100%",
                  height: 60,
                  padding: 10,
                  justifyContent: "space-between",
                }}
              >
                <CustomText
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  label="JULIANNA"
                  fontFamily={fonts.medium}
                  color="#121212A3"
                />
                <CustomText
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  label="“The ride was just blasteful.”"
                  fontFamily={fonts.medium}
                />
              </View>
            ) : null}

            <View style={styles.card}>
              <TripActions
                isShipping={isShipping}
                onColorSignalPress={() => setIsColorSignalModal(true)}
                onShareTripStatusPress={() =>
                  Share.share({
                    message: "Check out my trip",
                    url: "https://www.google.com",
                  })
                }
              />
            </View>
            {isShipping ? (
              <ImageFast
                source={Images.monotize}
                resizeMode="cover"
                style={{ width: "100%", height: 230 }}
              />
            ) : null}

            <View style={styles.card}>
              <View style={[styles.row1]}>
                <View style={[styles.rowItem, { gap: 2 }]}>
                  <CustomText
                    fontSize={16}
                    lineHeight={16 * 1.4}
                    label={"Pickup & Drop-off"}
                    fontFamily={fonts.semiBold}
                  />
                  <ImageFast
                    source={Images.StopHeart}
                    style={{ width: 16, height: 16 }}
                  />
                </View>
                <TouchableOpacity>
                  <Icons
                    size={28}
                    family={"Entypo"}
                    color={COLORS.black}
                    name={"chevron-small-down"}
                  />
                </TouchableOpacity>
              </View>
              <TripSteps
                vehicle={vehicle}
                orderData={orderData?.metadata?.order}
                startAddress={orderData?.metadata?.order?.startAddress}
                endAddress={orderData?.metadata?.order.endAddress}
                steps={orderData?.metadata?.order?.steps || []}
                metadata={metadata}
                onAddPress={() => setIsAddStepModal(true)}
                loading={addStopLoading}
              />
            </View>

            <View style={styles.card}>
              <SelectedTripFoods
                data={metadata?.foodAndBeverage}
                vehicle={vehicle}
                metadata={metadata}
                orderId={orderId}
                getOrderData={getOrderData}
              />
            </View>

            <View style={styles.card}>
              <TripPassangers />
            </View>

            <View style={styles.card}>
              <TripCarouge />
            </View>

            <View style={styles.card}>
              <TripSpots />
            </View>

            <View style={styles.card}>
              <TripCharity
                give1Percent={metadata?.give1Percent}
                plantTrees={metadata?.plantTrees}
              />
            </View>

            <View style={styles.card}>
              <TripPaymentMethod />
            </View>

            <View style={styles.card}>
              <TripPromoCode />
            </View>
            {userData?.role == "user" ? (
              <View style={styles.card}>
                <TripTip
                  totalPrice={orderData?.totalPrice}
                  onAddTip={onAddTip}
                  tip={tipPrice}
                  setTip={setTipPrice}
                />
              </View>
            ) : null}

            <View style={styles.card}>
              <TripInvoice />
            </View>

            <View style={styles.card}>
              <ShareTrip />
            </View>
            <View style={styles.footer}>
              {userData?.role != "user" ? (
                <CustomButton
                  fontSize={16}
                  title="Complete Trip"
                  marginBottom={10}
                  onPress={onCompleteTrip}
                />
              ) : null}

              {userData?.role == "user" ? (
                <CustomButton
                  fontSize={16}
                  color={COLORS.red}
                  title="Cancel Trip"
                  backgroundColor="#1212120A"
                  secondText="Will imply a 50% Cancellation fee"
                  onPress={onCancelTrip}
                />
              ) : null}

              <CustomText
                fontSize={10}
                marginTop={10}
                alignSelf="center"
                textAlign="center"
                lineHeight={10 * 1.4}
                color={COLORS.subtitle}
                fontFamily={fonts.medium}
                label="The easiest and most affordable way to reach your destination."
              />
            </View>
          </ScrollView>
        </View>
      </BottomSheetComponent>
      <CustomModal
        isVisible={isColorSignalModal}
        onDisable={() => setIsColorSignalModal(false)}
      >
        <View
          style={{
            backgroundColor: "#E1FF00",
            width: "100%",
            height: "100%",
            paddingTop: Platform.OS == "ios" ? 30 : 0,
          }}
        >
          <Header
            title="Back"
            iconBackgroundColor="#1212120A"
            onBackPress={() => setIsColorSignalModal(false)}
          />
        </View>
      </CustomModal>
      <CustomModalGooglePlaces
        isVisible={isAddStepModal}
        onClose={() => setIsAddStepModal(false)}
        onLocationSelect={handleLocationSelect}
      />
    </ScreenWrapper>
  );
};

export default AwaitingDriverConfirmation;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.inputBg,
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
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    width: "100%",
  },
  review: {
    backgroundColor: "#776A3D",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderTopWidth: 1,
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.inputBg,
  },
  marker1Icon: {
    width: 32,
    height: 32,
  },
  marker2Icon: {
    width: 24,
    height: 24,
  },
});

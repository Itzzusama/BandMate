import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import BottomSheetComponent from "../../../components/BottomSheetComponent";
import TripVehicleSelection from "../../../components/TripVehicleSelection";
import { useSocket } from "../../../components/SocketProvider";
import ScreenWrapper from "../../../components/ScreenWrapper";

import InstantTripModal from "./molecules/InstantTripModal";

import { setTotalDistance as setReduxTotalDistance } from "../../../store/reducer/usersSlice";
import { PNGIcons } from "../../../assets/images/icons";
import { COLORS } from "../../../utils/COLORS";

const MapSteps = ({ route }) => {
  const mapRef = useRef(null);
  const sheetRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const tripData = route?.params?.tripData || {};
  const isShipping = route?.params?.isShipping || false;
  const { socket, isConnected } = useSocket();
  const [vehicles, setVehicles] = useState([]);

  const memoizedTripData = useMemo(
    () => tripData,
    [
      tripData.startAddress?.lat,
      tripData.startAddress?.long,
      tripData.endAddress?.lat,
      tripData.endAddress?.long,
      tripData.steps ? tripData.steps : [],
    ]
  );

  const startLocation = memoizedTripData.startAddress?.address;
  const endLocation = memoizedTripData.endAddress?.address;

  const startCoords = useMemo(
    () => ({
      latitude: memoizedTripData.startAddress?.lat,
      longitude: memoizedTripData.startAddress?.long,
    }),
    [memoizedTripData.startAddress?.lat, memoizedTripData.startAddress?.long]
  );

  const endCoords = useMemo(
    () => ({
      latitude: memoizedTripData.endAddress?.lat,
      longitude: memoizedTripData.endAddress?.long,
    }),
    [memoizedTripData.endAddress?.lat, memoizedTripData.endAddress?.long]
  );

  const [routeCoords, setRouteCoords] = useState([]);
  const [totalDistance, setTotalDistance] = useState("");
  const [totalDuration, setTotalDuration] = useState("");
  const [isLoadingRoute, setIsLoadingRoute] = useState(true);

  const validStops = useMemo(() => {
    const steps = memoizedTripData.steps || [];
    return steps?.map((stop) => ({ latitude: stop.lat, longitude: stop.long }));
  }, [memoizedTripData.steps]);

  const getRoute = useCallback(async () => {
    if (!startCoords || !endCoords || !startCoords || !endCoords) {
      console.log("Invalid coordinates");
      return;
    }

    try {
      const origin = `${startCoords.latitude},${startCoords.longitude}`;
      const destination = `${endCoords.latitude},${endCoords.longitude}`;
      const validWaypointStrings = memoizedTripData?.steps?.map(
        (coord) => `${coord.lat},${coord.long}`
      );
      const waypoints = `&waypoints=${validWaypointStrings.join("|")}`;
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}${waypoints}&key=AIzaSyB3Tj9fWzywtOncQ7vNjcErxRM5E--WlDA`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK" && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const points = decode(route.overview_polyline.points);
        setRouteCoords(points);

        const calculatedDistance = route.legs.reduce(
          (acc, leg) => acc + leg.distance.value,
          0
        );
        setTotalDistance(calculatedDistance);
        dispatch(setReduxTotalDistance(calculatedDistance));
        setTotalDuration(
          route.legs.reduce((acc, leg) => acc + leg.duration.value, 0)
        );

        setTimeout(() => {
          fitMapToCoordinates();
        }, 1000);
      } else {
        console.log("API Error:", data.status);
      }
    } catch (error) {
      console.error("Route error:", error);
    }
  }, [startCoords, endCoords, memoizedTripData.steps]);

  const fitMapToCoordinates = useCallback(() => {
    if (!mapRef.current) return;

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

  useEffect(() => {
    if (startCoords && endCoords) {
      getRoute();
    }
  }, [getRoute, startCoords, endCoords]);

  useEffect(() => {
    if (socket && isConnected) {
      socket.on("vehicle:availability", (data) => {
        console.log("===========data", data);
        if (data?.vehicles?.length) {
          setVehicles(data?.vehicles || []);
          setIsLoadingRoute(false);
          setTimeout(() => {
            sheetRef.current?.snapToIndex(1);
          }, 500);
        } else {
          setIsLoadingRoute(false);
          setTimeout(() => {
            navigation.goBack();
          }, 500);
        }
      });
      return () => {
        socket.off("vehicle:availability");
      };
    }
  }, [socket, isConnected]);

  const initialRegion = useMemo(
    () => ({
      latitude: startCoords?.latitude || 32.1475636,
      longitude: startCoords?.longitude || 74.19141239999999,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    }),
    [startCoords?.latitude, startCoords?.longitude]
  );

  return (
    <ScreenWrapper
      backgroundColor={COLORS.white}
      paddingHorizontal={0.1}
      translucent
    >
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
      >
        <Marker
          // tracksViewChanges={false}
          coordinate={startCoords}
          title="Start Location"
          description={startLocation}
        >
          <Image
            source={PNGIcons.marker1}
            style={styles.marker1Icon}
            resizeMode="contain"
          />
        </Marker>

        {memoizedTripData?.steps?.map((stop, index) => (
          <Marker
            // tracksViewChanges={false}
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

        <Marker
          coordinate={endCoords}
          title="Destination"
          description={endLocation}
        >
          <Image
            source={PNGIcons.marker1}
            style={styles.marker1Icon}
            resizeMode="contain"
          />
        </Marker>

        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor={COLORS.blue}
            strokeWidth={4}
          />
        )}
      </MapView>

      {isLoadingRoute ? (
        <InstantTripModal
          isVisible={isLoadingRoute}
          onDisable={() => setIsLoadingRoute(false)}
          title={isShipping ? "Shipping" : "Instant Trip"}
          desc={
            isShipping ? "Searching For Shipping" : "Searching For Chauffeurs"
          }
        />
      ) : null}
      <BottomSheetComponent
        ref={sheetRef}
        snapPoints={["15%", "50%", "80%"]}
        initialIndex={-1}
        onChange={(index) => console.log(index)}
        enablePanDownToClose={false}
      >
        <TripVehicleSelection
          vehicles={vehicles}
          totalDistance={totalDistance}
          tripTotalDuration={totalDuration}
          tripData={tripData}
          isLoading={isLoadingRoute}
          isShipping={isShipping}
          overAllDistance={tripData?.totalDistance?.reduce(
            (acc, curr) => acc + curr,
            0
          )}
        />
      </BottomSheetComponent>
    </ScreenWrapper>
  );
};

export default MapSteps;

const styles = StyleSheet.create({
  marker1Icon: {
    width: 32,
    height: 32,
  },
  marker2Icon: {
    width: 24,
    height: 24,
  },
});

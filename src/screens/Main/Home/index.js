import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback, useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { Image, StyleSheet, View } from "react-native";

import BottomSheetComponent from "../../../components/BottomSheetComponent";
import ClientTripModal from "../../../components/ClientTripModal";
import ProviderModaltype from "../../../components/ProviderModal";
import IntantTripModal from "../../../components/IntantTripModal";
import { useSocket } from "../../../components/SocketProvider";
import ScreenWrapper from "../../../components/ScreenWrapper";
import GroundModal from "../../../components/GroundModal";
import QRCodeModal from "../../../components/QRCodeModal";
import AppLoader from "../../../components/AppLoader";
import HomeSheet from "../../../components/HomeSheet";
import When from "../../../components/When";

import SelectServiceModal from "./molecules/SelectServiceModal";
import RightContainer from "./molecules/RightContainer";
import HomeHeader from "./molecules/HomeHeader";
import Search from "./molecules/Search";
import Online from "./molecules/Online";
import Card from "./molecules/Card";
import Tab from "./molecules/Tab";

import { setLocation } from "../../../store/reducer/usersSlice";
import { PNGIcons } from "../../../assets/images/icons";
import useLocation from "../../../utils/useLocation";
import { get } from "../../../services/ApiRequest";
import { useHomeSheet } from "../../../context/HomeSheetContext";

const Home = ({ navigation }) => {
  const { socket, isConnected } = useSocket();
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const homeSheetRef = useRef(null);
  const {
    openHomeSheet: setHomeSheetOpen,
    closeHomeSheet: setHomeSheetClosed,
  } = useHomeSheet();

  const handleHomeSheetChange = useCallback(
    (index) => {
      console.log("handleHomeSheetChange", index);
      if (index >= 1) {
        setHomeSheetOpen();
      } else {
        setHomeSheetClosed();
      }
    },
    [setHomeSheetOpen, setHomeSheetClosed]
  );

  const openHomeSheet = useCallback(() => {
    homeSheetRef.current?.snapToIndex(2);
  }, []);
  const locationData = useSelector((state) => state.users.location);
  const userData = useSelector((state) => state.users.userData);
  const { getCurrentLocation: getCurrentLocationHook } = useLocation();
  const getLocation = async () => {
    const location = await getCurrentLocationHook();
    if (location) {
      dispatch(setLocation(location));
    }
  };

  const [tab, setTab] = useState(0);
  const [serviceModal, setServiceModal] = useState(false);
  const [whenModal, setWhenModal] = useState(false);

  const [qrCodeModal, setQrCodeModal] = useState(false);
  const [ProviderModal, setProviderModal] = useState(false);
  const [groundModal, setGroundModal] = useState(false);
  const [ClientTrip, setClientTrip] = useState(false);
  const [isLoadingActiveOrder, setIsLoadingActiveOrder] = useState(true);
  const [request, setRequest] = useState({});
  const [region, setRegion] = useState({
    latitude: locationData?.latitude || 38.7946,
    longitude: locationData?.longitude || 106.5348,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    const newRegion = {
      latitude: locationData?.latitude || 38.7946,
      longitude: locationData?.longitude || 106.5348,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    };

    setRegion(newRegion);

    if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 1000);
    }
    setIsLoadingLocation(false);
  };

  useEffect(() => {
    if (userData?.role == "user") {
      setTab(0);
    } else {
      setTab(1);
    }
  }, [userData]);

  useEffect(() => {
    if (locationData?.latitude && locationData?.longitude) {
      setRegion({
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });
    }
  }, [locationData]);

  useEffect(() => {
    if (socket && isConnected && tab == 1) {
      socket.on("rider:order:request", (data) => {
        setRequest(data);
      });
      socket.on("rider:order:status", (data) => {
        setRequest({});
      });
      return () => {
        socket.off("rider:order:request");
        socket.off("rider:order:status");
      };
    }
  }, [socket, isConnected]);

  const onRejectRequest = () => {
    if (socket && isConnected && request?.orderId) {
      socket.emit(
        "rider:order:rejected",
        { orderId: request.orderId },
        (response) => {
          setRequest({});
        }
      );
    }
  };
  const acceptRequest = () => {
    if (socket && isConnected && request?.orderId) {
      socket.emit(
        "rider:order:accepted",
        { orderId: request.orderId },
        (response) => {
          setRequest({});
          setTimeout(() => {
            navigation.navigate("AwaitingDriverConfirmation", {
              orderId: request.orderId,
            });
          }, 500);
        }
      );
    }
  };

  const getActiveOrder = async () => {
    try {
      const res = await get(`orders/active-orders`);
      setTimeout(() => {
        setIsLoadingActiveOrder(false);
      }, 1000);
      if (res?.data?.data?.length) {
        navigation.replace("AwaitingDriverConfirmation", {
          orderId: res?.data?.data[0]?._id,
        });
      }
    } catch (error) {
      setTimeout(() => {
        setIsLoadingActiveOrder(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getActiveOrder();
  }, []);

  if (isLoadingActiveOrder) {
    return <AppLoader isVisible={isLoadingActiveOrder} />;
  }
  return (
    <ScreenWrapper
      backgroundImage={PNGIcons.test}
      translucent
      paddingHorizontal={0.1}
      paddingBottom={0.1}
    >
      {region.latitude && region.longitude && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          mapType="standard"
          style={styles.map}
          region={region}
          onMapReady={() => {
            mapRef.current?.animateToRegion(
              {
                latitude: locationData?.latitude || 38.7946,
                longitude: locationData?.longitude || 106.5348,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
              },
              1000
            );
          }}
        />
      )}

      <HomeHeader />
      <Image source={PNGIcons.currentLocation} style={styles.currentLocation} />
      <Tab tab={tab} setTab={setTab} />
      {tab == 1 ? <RightContainer /> : null}

      <View
        style={[
          styles.bottomContainer,
          { bottom: tab == 1 ? 80 + insets.bottom : insets.bottom },
        ]}
      >
        <Search
          tab={tab}
          onLocationPress={getCurrentLocation}
          loading={isLoadingLocation}
          onSearchPress={openHomeSheet}
        />
        {tab == 1 ? (
          <Online />
        ) : (
          <View style={styles.cardContainer}>
            <Card
              title="People"
              icon={PNGIcons.car1}
              onCardPress={() => navigation.navigate("YourTripsScreen")}
            />
            <Card
              title="Goods"
              icon={PNGIcons.car2}
              onCardPress={() => navigation.navigate("YourTripsScreen")}
            />
            <Card
              title="Deliveries"
              icon={PNGIcons.car3}
              onCardPress={() => navigation.navigate("YourTripsScreen")}
            />
          </View>
        )}
      </View>

      <BottomSheetComponent
        ref={homeSheetRef}
        snapPoints={["1%", "50%", "100%"]}
        initialIndex={-1}
        onChange={handleHomeSheetChange}
        enablePanDownToClose
      >
        <HomeSheet
          homeSheetRef={homeSheetRef}
          onTripPress={() => {
            homeSheetRef.current?.close();
            setTimeout(() => {
              navigation.navigate("YourTripsScreen");
            }, 500);
          }}
          onWareHousePress={() => {
            homeSheetRef.current?.close();
            setTimeout(() => {
              navigation.navigate("WareHouses");
            }, 500);
          }}
          onShippingPress={() => {
            homeSheetRef.current?.close();
            setTimeout(() => {
              navigation.navigate("MoveOut");
            }, 500);
          }}
          actionClick={() => {
            homeSheetRef.current?.close();
            setTimeout(() => {
              setProviderModal(true);
            }, 500);
          }}
          onMarketplacePress={() => {
            homeSheetRef.current?.close();
            setTimeout(() => {
              navigation.navigate("VehicleMarketplace");
            }, 500);
          }}
          ParkingMapPress={() => {
            homeSheetRef.current?.close();
            setTimeout(() => {
              navigation.navigate("ParkingMap");
            }, 500);
          }}
        />
      </BottomSheetComponent>

      <SelectServiceModal
        isVisible={serviceModal}
        onClose={() => setServiceModal(false)}
        onCardPress={() => {
          setTimeout(() => {
            setServiceModal(false);
          }, 2000);
        }}
      />

      <IntantTripModal
        isVisible={request?.orderId}
        onTripCancel={onRejectRequest}
        onPress={acceptRequest}
        orderDetails={request}
      />

      <When
        isVisible={whenModal}
        onDisable={() => setWhenModal(false)}
        onPress={() => setWhenModal(false)}
        onCardPress={() => {
          setWhenModal(false);
          setTimeout(() => {
            navigation.navigate("YourTripsScreen");
          }, 500);
        }}
      />

      <QRCodeModal
        isVisible={qrCodeModal}
        onDisable={() => setQrCodeModal(false)}
        onPress={() => setQrCodeModal(false)}
        title="Instant Trip"
        amount={"$11.05"}
        message={"Confirm details with the Customer before starting."}
      />

      <ProviderModaltype
        isVisible={ProviderModal}
        onDisable={() => setProviderModal(false)}
        actionClick={() => {
          setProviderModal(false);
          setTimeout(() => {
            setWhenModal(true);
          }, 1000);
        }}
        title="Pick your providers"
      />

      <GroundModal
        isVisible={groundModal}
        onDisable={() => setGroundModal(false)}
        onPress={() => setGroundModal(false)}
      />

      <ClientTripModal
        isVisible={ClientTrip}
        onDisable={() => setClientTrip(false)}
        onPress={() => setClientTrip(false)}
      />

      {/* <WeightModal
        isVisible={false}
        onClose={() => {}}
      /> */}
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  currentLocation: {
    width: 48,
    height: 48,
    position: "absolute",
    resizeMode: "contain",
    top: "45%",
    left: "45%",
  },
  bottomContainer: {
    position: "absolute",
    padding: 12,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 12,
    marginBottom: 90,
  },

  locationItem: {
    padding: 15,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  address: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    marginBottom: 8,
  },
  coordContainer: {
    backgroundColor: "#F0F8FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  coords: {
    fontSize: 10,
    color: "#2196F3",
    fontWeight: "500",
  },
  closeIcn: {
    height: 40,
    zIndex: 9999999,
    position: "absolute",
  },
});

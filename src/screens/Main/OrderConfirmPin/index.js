import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";

import { useSocket } from "../../../components/SocketProvider";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomText from "../../../components/CustomText";
import OTPComponent from "../../../components/OTP";
import Header from "../../../components/Header";

import OrderConfirmModal from "./molecules/OrderConfirmModal";

import { PNGIcons } from "../../../assets/images/icons";
import { post } from "../../../services/ApiRequest";
import fonts from "../../../assets/fonts";

const OrderConfirmPin = ({ route }) => {
  const { socket, isConnected } = useSocket();
  const navigation = useNavigation();

  const totalPrice = route?.params?.totalPrice;
  const pickupFrom = route?.params?.pickupFrom;
  const tripData = route?.params?.tripData;
  const tourists = route?.params?.tourists;
  const give1Percent = route?.params?.give1Percent;
  const plantTrees = route?.params?.plantTrees;

  const selectedExterior = useSelector((state) => state.users.selectedExterior);
  const selectedVehicle = useSelector((state) => state.users.selectedVehicle);
  const foodAndBeverage = useSelector((state) => state.users.foodAndBeverage);
  const selectedComfort = useSelector((state) => state.users.selectedComfort);
  const totalDistance = useSelector((state) => state.users.totalDistance);
  const totalDuration = useSelector((state) => state.users.totalDuration);
  const loginValue = useSelector((state) => state.users.loginValue);
  const isEmail = useSelector((state) => state.users.isEmail);
  const selectedAccessibility = useSelector(
    (state) => state.users.selectedAccessibility
  );

  const [otp, setOtp] = useState("");
  const [isMap, setMap] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [createdRequest, setCreatedRequest] = useState({});

  const onContinuePress = async () => {
    const socketId = await AsyncStorage.getItem("socketId");
    try {
      if (!otp) {
      } else {
        setLoading(true);
        const res = await post("auth/login", {
          ...(isEmail ? { email: loginValue } : { phone: loginValue }),
          pin: otp,
        });
        if (res?.data) {
          const body = {
            totalprice: totalPrice,
            orderId: tripData?.orderId,
            vehicleId: selectedVehicle?._id,
            pickupFrom: pickupFrom,
            totalDistence: totalDistance || 0,
            currency: "CHF",
            metadata: {
              extraLuggage: tourists?.luggage || 0,
              extraPassengers: tourists?.passengers || 0,
              foodAndBeverage: foodAndBeverage || [],
              selectedComfort: selectedComfort || [],
              selectedExterior: selectedExterior || [],
              selectedAccessibility: selectedAccessibility || [],
              totalDuration: totalDuration || 0,
              totalDistance: totalDistance || 0,
              give1Percent: give1Percent || false,
              plantTrees: plantTrees || false,
            },
            socketId: socketId,
          };
          if (socket && isConnected) {
            socket.emit("order:create", body, (response) => {
              setCreatedRequest(response);
              setMap(true);
            });
          }
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const requestAgain = () => {
    if (socket && isConnected) {
      socket.emit(
        "order:request",
        { orderId: createdRequest?.orderId },
        (response) => {}
      );
    }
  };

  const modalData = [
    {
      id: 0,
      herderText: "Safe with ",
      title: "Connecting with Your Chauffeur...",
      subtitle: "Just a moment, please.",
      btnTitle: "Cancel Request",
      btnTitleSecond: "You won't be charged",
      source: PNGIcons.modalIcon1,
    },
    {
      id: 1,
      herderText: "No fees with ",
      title: "Ordered Successfully",
      subtitle:
        "Funds are not debited yet. Only when the Trip is confirmed they will be deducted from your balance.",
      btnTitle: "Continue",
      source: PNGIcons.modalIcon2,
    },
    {
      id: 2,
      herderText: "Safer with ",
      title: "Make Trips Safer",
      subtitle:
        "We care about your comfort and your safety at all time. That's why Trips are recorded on both ends to protect & provide you with a stress-free experience.",
      btnTitle: "I acknowledge and agree",
      source: PNGIcons.modalIcon3,
    },
    {
      id: 3,
      herderText: "Premium rides with ",
      title: "Respectful means enjoyable",
      subtitle:
        "Remember to remain respectful at all time, Chauffeurs are Humans too.",
      btnTitle: "Continue",
      source: PNGIcons.modalIcon4,
    },
    {
      id: 4,
      herderText: "Trip ",
      title: "Trip Rejected",
      subtitle:
        "Your trip has been rejected by the rider. Please try booking another trip.",
      btnTitle: "Done",
      source: PNGIcons.modalIcon2,
    },
  ];

  const handleModalButtonPress = () => {
    console.log("=========modalIndex", modalIndex);

    if (modalIndex === 0) {
      if (socket && isConnected) {
        socket.emit(
          "order:request:cancel",
          { orderId: createdRequest?.orderId },
          (response) => {
            handleRejectedModalDone();
          }
        );
      }
    } else if (modalIndex === 3) {
      setModalIndex(false);
      setTimeout(() => {
        navigation.navigate("AwaitingDriverConfirmation");
      }, 1000);
    } else if (modalIndex == 1 || modalIndex == 2) {
      setModalIndex(false);
      setTimeout(() => {
        setModalIndex(modalIndex + 1);
      }, 1000);
    }
  };

  const handleModalDisable = () => {
    if (modalIndex == 1 || modalIndex == 2) {
      setModalIndex(false);
      setTimeout(() => {
        setModalIndex(modalIndex + 1);
      }, 1000);
    }
  };

  const handleRejectedModalDone = () => {
    setMap(false);
    setModalIndex(false);
    setTimeout(() => {
      navigation.replace("TabStack");
    }, 1000);
  };

  useEffect(() => {
    if (socket && isConnected) {
      socket.on("order:status", (data) => {
        console.log("==========data", data);

        if (data?.status === "confirmed") {
          setModalIndex(false);
          setTimeout(() => {
            setModalIndex(1);
          }, 1000);
        } else if (data?.status === "rejected_by_rider") {
          setModalIndex(false);
          setTimeout(() => {
            setModalIndex(4);
          }, 1000);
        }
      });
      return () => {
        socket.off("order:status");
      };
    }
  }, [socket, isConnected]);

  return (
    <ScreenWrapper
      translucent={isMap}
      backgroundImage={isMap ? PNGIcons.mapBlurBg : undefined}
      headerUnScrollable={
        isMap ? () => null : () => <Header title="Passcode" />
      }
      footerUnScrollable={
        isMap
          ? () => null
          : () => (
              <View style={{ padding: 12 }}>
                <AuthFooter loading={loading} onPress={onContinuePress} />
              </View>
            )
      }
    >
      {isMap ? null : (
        <>
          <CustomText
            label="Enter Passcode to confirm your order"
            fontFamily={fonts.semiBold}
            fontSize={24}
            lineHeight={40}
          />

          <OTPComponent value={otp} setValue={setOtp} />
        </>
      )}

      {modalData.map((modal) => (
        <OrderConfirmModal
          key={modal?.id}
          isVisible={modalIndex === modal?.id && isMap}
          herderText={modal.herderText}
          title={modal.title}
          subtitle={modal.subtitle}
          info={modal?.id == 0 ? "More information under our FAQ." : undefined}
          btnTitle={modal.btnTitle}
          btnTitleSecond={modal?.id == 0 ? modal.btnTitleSecond : undefined}
          source={modal.source}
          onDisable={handleModalDisable}
          onPress={
            modal?.id == 4 ? handleRejectedModalDone : handleModalButtonPress
          }
          requestAgain={requestAgain}
        />
      ))}
    </ScreenWrapper>
  );
};

export default OrderConfirmPin;

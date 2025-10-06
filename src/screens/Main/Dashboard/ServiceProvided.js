import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Platform, StyleSheet, UIManager, View } from "react-native";
import CustomButton from "../../../components/CustomButton";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import CollapseableCard from "./molecules/CollapseableCard";
import { get, put } from "../../../services/ApiRequest";
import { useEffect, useState } from "react";
import { ToastMessage } from "../../../utils/ToastMessage";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CancellationPolicy = ({ route }) => {
  const isFocus = useIsFocused();
  const tab = route.params?.tab;
  const item = route.params?.currentVehicle;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      title: "Trips",
      description: "You don’t have any messages yet.",
      tabs: [
        {
          id: "t1",
          name: "Book Instantly",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.trips?.bookInstantly,
        },
        {
          id: "t2",
          name: "Book Hourly",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.trips?.bookHourly,
        },
        {
          id: "t3",
          name: "Reserve for Later",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.trips?.reserve,
        },
        {
          id: "t4",
          name: "Shared Trips",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.trips?.sharedTrip,
        },
      ],
      showErrors: true,
      showSwitch: true,
    },
    {
      id: 2,
      title: "Shippings",
      description: "You don’t have any messages yet.",
      tabs: [
        {
          id: "n1",
          name: "Shippings",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.Shippings?.shippings,
        },
        {
          id: "n2",
          name: "Package Deliveries",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.Shippings?.packegeDeliveries,
        },
        {
          id: "n3",
          name: "Move-outs",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.Shippings?.moveOuts,
        },
        {
          id: "n4",
          name: "Freight Shippings",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.Shippings?.freightShippings,
        },
      ],
      showErrors: true,
      showSwitch: true,
    },
    {
      id: 3,
      title: "Deliveries",
      description: "You don’t have any messages yet.",
      tabs: [
        {
          id: "p1",
          name: "Food Deliveries",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.Deliveries?.foodDeliveries,
        },
        {
          id: "p2",
          name: "Medicine Deliveries",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.Deliveries?.medicineDeliveries,
        },
      ],
      showErrors: true,
      showSwitch: true,
    },
    {
      id: 4,
      title: "Rentals",
      description: "You don’t have any messages yet.",
      tabs: [
        {
          id: "p1",
          name: "Vehicle Rentals",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.Rentals?.Rentals,
        },
        {
          id: "p2",
          name: "Parkings Rentals",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.Rentals?.parkingRentals,
        },
      ],
      showErrors: true,
      showSwitch: true,
    },
    {
      id: 5,
      title: "Tours",
      description: "You don’t have any messages yet.",
      tabs: [
        {
          id: "p1",
          name: "Sightseeing Tours",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.Tours?.sightseeingTours,
        },
      ],
      showErrors: true,
      showSwitch: true,
    },
    {
      id: 6,
      title: "Parking Rentals",
      description: "You don’t have any messages yet.",
      tabs: [
        {
          id: "p1",
          name: "Parking Slots",
          subname: "Minimal rental period",
          isEnable: item?.ServicesProvided?.ParkingRentals?.parkingSlots,
        },
      ],
      showErrors: true,
      showSwitch: true,
    },
  ]);

  const handleToggle = (cardId, tabId, value) => {
    setCardsData((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? {
              ...card,
              tabs: card.tabs.map((t) =>
                t.id === tabId ? { ...t, isEnable: value } : t
              ),
            }
          : card
      )
    );
  };

  const updateServiceProvided = async () => {
    const servicesBody = [
      {
        trips: {
          bookInstantly: cardsData[0]?.tabs[0]?.isEnable,
          bookHourly: cardsData[0]?.tabs[1]?.isEnable,
          reserve: cardsData[0]?.tabs[2]?.isEnable,
          sharedTrip: cardsData[0]?.tabs[3]?.isEnable,
        },
      },
      {
        Shippings: {
          shippings: cardsData[1]?.tabs[0]?.isEnable,
          packegeDeliveries: cardsData[1]?.tabs[1]?.isEnable,
          moveOuts: cardsData[1]?.tabs[2]?.isEnable,
          freightShippings: cardsData[1]?.tabs[3]?.isEnable,
        },
      },
      {
        Deliveries: {
          foodDeliveries: cardsData[2]?.tabs[0]?.isEnable,
          medicineDeliveries: cardsData[2]?.tabs[1]?.isEnable,
        },
      },
      {
        Rentals: {
          vehicaleRentals: cardsData[3]?.tabs[0]?.isEnable,
          parkingRentals: cardsData[3]?.tabs[1]?.isEnable,
        },
      },
      {
        Tours: {
          sightseeingTours: cardsData[4]?.tabs[0]?.isEnable,
        },
      },
      {
        ParkingRentals: {
          parkingSlots: cardsData[5]?.tabs[0]?.isEnable,
        },
      },
      {
        WarehouseRentals: {
          warehouseSpaces: cardsData[6]?.tabs[0]?.isEnable,
        },
      },
    ];

    const body = servicesBody[tab];

    setLoading(true);
    try {
      const res = await put(
        `vehicles/${item?.id}/services-provided/${item?.ServicesProvided?._id}`,
        body
      );
      if (res.data?.success) {
        navigation.goBack();
        setLoading(false);
        ToastMessage(res.data?.message, "success");
      }
    } catch (error) {
      console.error("API Error:======>", error);
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      paddingBottom={12}
      headerUnScrollable={() => (
        <Header title={"Service I Provide"} marginBottom={12} />
      )}
      footerUnScrollable={() => (
        <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
          <CustomButton
            title={"Confirm"}
            // onPress={() => navigation.navigate("VehicleCustody")}
            onPress={updateServiceProvided}
            loading={loading}
          />
          <CustomButton
            title={"Later"}
            backgroundColor={COLORS.lightGray}
            color={COLORS.primaryColor}
            marginTop={8}
          />
        </View>
      )}
    >
      {cardsData
        .filter((card) => card.id === tab + 1)
        .map((card) => (
          <CollapseableCard
            key={card.id}
            title={card.title}
            description={card.description}
            tabs={card.tabs}
            showErrors={card.showErrors}
            showSwitch={card.showSwitch}
            onToggle={(tabId, val) => handleToggle(card.id, tabId, val)}
          />
        ))}
    </ScreenWrapper>
  );
};

export default CancellationPolicy;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  border: {
    width: "100%",
    height: 1,
    marginVertical: 20,
    backgroundColor: COLORS.lightGray,
  },
});

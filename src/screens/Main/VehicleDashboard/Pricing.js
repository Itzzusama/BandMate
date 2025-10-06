import { RefreshControl, StyleSheet, View } from "react-native";
import { PNGIcons } from "../../../assets/images/icons";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import MenuItem from "./molecules/MenuItem";
import VehicleTopCard from "./molecules/VehicleTopCard";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { get } from "../../../services/ApiRequest";

const Pricing = ({ navigation, route }) => {
  const isFocus = useIsFocused();
  const item = route.params?.item;

  const [loading, setLoading] = useState(false);

  const [currentVehicle, setCurrentVehicle] = useState({});
  const [averagePricing, setAveragePricing] = useState({});

  const array = [
    {
      id: 1,
      label: "General Pricing ",
      image: PNGIcons.key,
      onPress: () =>
        navigation.navigate("TripGeneralPricing", {
          currentVehicle,
          averagePricing,
        }),
    },
    {
      id: 2,
      label: "Discounts",
      image: PNGIcons.myAvai,
      onPress: () =>
        navigation.navigate("DiscountPricing", {
          currentVehicle,
          averagePricing,
        }),
    },
  ];

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [vehicleData, averageData] = await Promise.all([
        get(`vehicles/${item?._id}`),
        get("vehicles/pricing/average"),
      ]);

      setCurrentVehicle(vehicleData.data?.data);
      setAveragePricing(averageData.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [isFocus]);

  return (
    <ScreenWrapper
      scrollEnabled
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchAllData} />
      }
      headerUnScrollable={() => (
        <Header title={`${item?.brand} ${item?.model}`} />
      )}
    >
      <View style={[styles.border, { marginBottom: 16 }]} />

      <VehicleTopCard
        width={"100%"}
        plate={item?.plateNumber}
        carName={`${item?.brand} ${item?.model}`}
        carType={item?.type}
        carImages={item?.vehicleImages}
        mainTag={item?.transmission}
      />

      <View style={[styles.border, { marginBottom: 6 }]} />

      {array?.map((item, index) => {
        return (
          <MenuItem
            key={index}
            imgSource={item.image}
            label={item.label}
            onCardPress={item?.onPress}
          />
        );
      })}

      <View style={[styles.border, { marginTop: 16 }]} />
    </ScreenWrapper>
  );
};

export default Pricing;

const styles = StyleSheet.create({
  border: {
    height: 4,
    backgroundColor: COLORS.lightGray,
  },
});

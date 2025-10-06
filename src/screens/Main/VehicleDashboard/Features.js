import { useIsFocused, useNavigation } from "@react-navigation/native";
import { RefreshControl, StyleSheet, View } from "react-native";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import MenuItem from "./molecules/MenuItem";
import VehicleTopCard from "./molecules/VehicleTopCard";
import { useEffect, useState } from "react";
import { get } from "../../../services/ApiRequest";

const Features = ({ route }) => {
  const item = route.params?.item;
  const navigation = useNavigation();
  const isFocus = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState({});

  const getVehicleDetail = async () => {
    setLoading(true);
    try {
      const res = await get(`vehicles/${item?._id}`);
      setCurrentVehicle(res.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };


  useEffect(() => {
    getVehicleDetail();
  }, [isFocus]);

  const array = [
    {
      id: 1,
      label: "Interior Features",
      image: PNGIcons.key,
      onPress: () => navigation.navigate("InteriorFeature", { currentVehicle }),
    },
    {
      id: 2,
      label: "Exterior Features",
      image: Images.car,
      onPress: () => navigation.navigate("ExteriorFeature", { currentVehicle }),
    },
    {
      id: 3,
      label: "Accessibility",
      image: PNGIcons.accessibility,
      onPress: () =>
        navigation.navigate("AccessibilityFeatures", { currentVehicle }),
    },
    {
      id: 4,
      label: "Food & Beverages",
      image: PNGIcons.food,
      onPress: () => navigation.navigate("FoodBeverage", { currentVehicle }),
    },
  ];


  return (
    <ScreenWrapper
      scrollEnabled
      refreshControl={
        <RefreshControl onRefresh={getVehicleDetail} refreshing={loading} />
      }
      headerUnScrollable={() => (
        <Header title={`${item?.brand} ${item?.model}`} />
      )}
    >
      <View style={[styles.border, { marginVertical: 16 }]} />

      <VehicleTopCard
        width={"100%"}
        plate={item?.plateNumber}
        carName={`${item?.brand} ${item?.model}`}
        carType={item?.type}
        carImages={item?.vehicleImages}
        mainTag={item?.transmission}
      />

      <View style={styles.border} />
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
    </ScreenWrapper>
  );
};

export default Features;

const styles = StyleSheet.create({
  border: {
    height: 4,
    backgroundColor: COLORS.lightGray,
  },
});

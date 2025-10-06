import { StyleSheet, View, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import TopTab from "../../../components/TopTab";
import MenuItem from "./molecules/MenuItem";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";
import { COLORS } from "../../../utils/COLORS";
import VehicleTopCard from "./molecules/VehicleTopCard";
import VehicleBottomStats from "./molecules/VehicleBottomStats";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FeatureSliderCard from "./molecules/FeatureSliderCard";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { FlatList } from "react-native";
import ImageFast from "../../../components/ImageFast";
import VTCModal from "../Dashboard/Modals/VTCModal";
import { del, get } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";

const VehicleDashboard = ({ route }) => {
  const item = route.params?.vehicle;
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [tab, setTab] = useState(0);

  const [loading, setLoading] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [SelectedItem, setSelectedItem] = useState("");
  const [currentVehicle, setCurrentVehicle] = useState({});

  const array = [
    {
      id: 1,
      label: "General Info",
      image: PNGIcons.generalInfo,
      onPress: () => navigation.navigate("EditVehicle", { currentVehicle }),
    },
    {
      id: 2,
      label: "Services Provided",
      image: PNGIcons.serviceProvider,
      onPress: () =>
        navigation.navigate("ServiceProvided", { tab, currentVehicle }),
    },
    {
      id: 2.1,
      label: "Access Management",
      image: PNGIcons.key,
      onPress: () => navigation.navigate("ManageAccess"),
    },
    {
      id: 3,
      label: "My Availabilites",
      image: PNGIcons.myAvai,
      onPress: () => navigation.navigate("MyAvailibility", { currentVehicle }),
    },
    {
      id: 4,
      label: "Features",
      image: PNGIcons.option,
      onPress: () => navigation.navigate("Features", { item }),
      // onPress: () => navigation.navigate("OptionProvided"),
    },
    {
      id: 5,
      label: "FAQ",
      image: PNGIcons.faq,
      onPress: () => navigation.navigate("VehicleFaq", { currentVehicle }),
    },
    {
      id: 6,
      label: "Policies & Rules",
      image: PNGIcons.PolicyNRules,
      onPress: () => navigation.navigate("OptionProvided", { item }),
      // onPress: () => navigation.navigate("PolicyAndRules"),
    },
    {
      id: 7,
      label: "Pricing",
      image: PNGIcons.pricing,
      onPress: () => navigation.navigate("Pricing", { item }),
    },
    {
      id: 8,
      label: "Delete This Vehicle",
      image: Images.binRed,
      onPress: () => {
        setSelectedItem(item?._id), setDelModal(true);
      },
    },
  ];

  const carbonData = [
    {
      title: "Trips",
      percentage: 37,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Shippings",
      percentage: 27,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Deliveries",
      percentage: 17,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Rental",
      percentage: 7,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Tours",
      percentage: 7,
      details: { ground: 0, sea: 0, air: 0 },
    },
  ];
  const profit = [
    {
      title: "Trips",
      percentage: 37,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Shippings",
      percentage: 27,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Deliveries",
      percentage: 17,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Rental",
      percentage: 7,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Tours",
      percentage: 7,
      details: { ground: 0, sea: 0, air: 0 },
    },
  ];
  const vehicle = [
    {
      title: "Trips",
      percentage: 37,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Shippings",
      percentage: 27,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Deliveries",
      percentage: 17,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Rental",
      percentage: 7,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Tours",
      percentage: 7,
      details: { ground: 0, sea: 0, air: 0 },
    },
  ];
  const Gender = [
    {
      title: "Trips",
      percentage: 37,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Shippings",
      percentage: 27,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Deliveries",
      percentage: 17,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Rental",
      percentage: 7,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Tours",
      percentage: 7,
      details: { ground: 0, sea: 0, air: 0 },
    },
  ];
  const Ages = [
    {
      title: "Trips",
      percentage: 37,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Shippings",
      percentage: 27,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Deliveries",
      percentage: 17,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Rental",
      percentage: 7,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Tours",
      percentage: 7,
      details: { ground: 0, sea: 0, air: 0 },
    },
  ];
  const greenData = [
    { image: Images.saveMoney },
    { image: Images.carbonFoot },
    { image: Images.increaseYour },
    { image: Images.betterFor },
  ];

  const deleteFleet = async () => {
    setLoading(true);
    try {
      const response = await del(`vehicles/${SelectedItem}`);
      if (response.data?.success) {
        ToastMessage("Vehicle deleted successfully", "success");
        setDelModal(false);
        setTimeout(() => {
          navigation.goBack();
        }, 700);
      }
      setLoading(false);
    } catch (error) {}
  };

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

  return (
    <ScreenWrapper
      scrollEnabled
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getVehicleDetail} />
      }
      headerUnScrollable={() => (
        <Header title={`${item?.brand} ${item?.model}`} />
      )}
    >
      <TopTab
        rounded
        tabNames={[
          "Trips",
          "Shippings",
          "Deliveries",
          "Rental",
          "Parkings",
          "Tours",
        ]}
        tab={tab}
        setTab={setTab}
      />

      <View style={[styles.border, { marginVertical: 16 }]} />

      <VehicleTopCard
        width={"100%"}
        plate={item?.plateNumber}
        carName={`${item?.brand} ${item?.model}`}
        carType={item?.type}
        carImages={item?.vehicleImages}
        mainTag={item?.transmission}
        onEditPress={() =>
          navigation.navigate("EditVehicle", { currentVehicle })
        }
        onSellPress={() => navigation.navigate("Parking")}
        // onCardPress={() => navigation.navigate("VehicleDashboard")}
        onDellPress={() => {
          setSelectedItem(item?._id), setDelModal(true);
        }}
        isEdit
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
      <VehicleBottomStats />

      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Image source={PNGIcons.green} style={{ height: 18, width: 18 }} />
        <CustomText
          label={"How You benefit from Green"}
          fontSize={18}
          fontFamily={fonts.semiBold}
        />
      </View>

      <FlatList
        data={greenData}
        numColumns={2}
        contentContainerStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <ImageFast
            key={index}
            source={item.image}
            style={{
              height: 80,
              width: "49%",
              marginRight: 4,
              marginTop: 4,
              borderRadius: 8,
            }}
          />
        )}
        keyExtractor={(index) => index.toString()}
      />

      <FeatureSliderCard
        key={item.title}
        data={carbonData}
        title={"Carbon Emission Overview"}
      />
      <FeatureSliderCard
        key={item.title}
        data={profit}
        title={"Most Profitable Services"}
      />
      <FeatureSliderCard
        key={item.title}
        data={vehicle}
        title={"Most Profitable Vehicle Types"}
      />
      <FeatureSliderCard key={item.title} data={Gender} title={"Gender"} />
      <FeatureSliderCard key={item.title} data={Ages} title={"Ages"} />

      <VTCModal
        isVisible={delModal}
        onDisable={() => setDelModal(false)}
        title={"Delete This Vehicle"}
        subtitle={"Are you sure you want to delete this vehicle?"}
        btnOne={"Delete This Vehicle"}
        btnTwo={"Cancel"}
        onBtnOne={deleteFleet}
        loading={loading}
      />
    </ScreenWrapper>
  );
};

export default VehicleDashboard;

const styles = StyleSheet.create({
  border: {
    height: 4,
    backgroundColor: COLORS.lightGray,
  },
});

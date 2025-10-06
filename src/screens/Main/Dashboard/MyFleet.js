import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTab from "../../../components/TopTab";

import VehicleTopCard from "../VehicleDashboard/molecules/VehicleTopCard";
import VTCModal from "./Modals/VTCModal";

import { useSelector } from "react-redux";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import NoDataFound from "../../../components/NoDataFound";
import { del, get } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { ToastMessage } from "../../../utils/ToastMessage";

const MyFleet = () => {
  const navigation = useNavigation();
  const { userData } = useSelector((state) => state.users);

  const isFocus = useIsFocused();
  const [tab, setTab] = useState(0);

  const modals = [
    { title: "Enable VTC", key: "vtc" },
    { title: "Enable Shipping", key: "shipping" },
    { title: "Enable Deliveries", key: "delivery" },
    { title: "Enable Parking Rental", key: "parking" },
    { title: "Enable Vehicle Rental", key: "rental" },
    { title: "Enable Vehicle Selling", key: "selling" },
  ];

  const [modalStep, setModalStep] = useState(-1);
  const [myFleets, setMyFleets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [SelectedItem, setSelectedItem] = useState("");

  const handleTabChange = (index) => {
    setTab(index);
    setModalStep(index);
  };
  const handleNext = () => {
    if (modalStep < modals.length - 1) {
      setModalStep(modalStep + 1);
    } else {
      setModalStep(-1);
    }
  };

  const getMyFleets = async () => {
    setLoading(true);
    try {
      const response = await get(`vehicles?userId=${userData?._id}`);
      setMyFleets(response.data?.data?.data);
      setLoading(false);
    } catch (error) {}
  };

  const deleteFleet = async () => {
    setLoading(true);
    try {
      const response = await del(`vehicles/${SelectedItem}`);
      if (response.data?.success) {
        setDelModal(false);
        ToastMessage("Vehicle deleted successfully", "success");
        setMyFleets((prev) =>
          prev?.filter((item) => item?._id !== SelectedItem)
        );
      }
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getMyFleets();
  }, [isFocus]);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title="My Fleets" />}
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
        paddingHorizontal={14}
        tab={tab}
        setTab={handleTabChange}
      />
      <View style={[styles.border, { marginVertical: 14 }]} />

      <CustomText
        label={"Vehicles"}
        fontFamily={fonts.medium}
        fontSize={18}
        marginBottom={10}
      />

      <FlatList
        data={myFleets}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getMyFleets} />
        }
        ListEmptyComponent={
          <>
            <NoDataFound title={"No Vehicle(s) Found"} />
            <CustomButton
              onPress={() => navigation.navigate("EditVehicle")}
              title="Add Vehicle"
              marginBottom={12}
              marginTop={-20}
            />
          </>
        }
        renderItem={({ item, index }) => (
          <VehicleTopCard
            isEdit
            key={index}
            width={"100%"}
            plate={item?.plateNumber}
            carName={`${item?.brand} ${item?.model}`}
            carType={item?.type}
            carImages={item?.vehicleImages}
            mainTag={item?.transmission}
            onEditPress={() => navigation.navigate("EditVehicle")}
            onSellPress={() => navigation.navigate("Parking")}
            onCardPress={() =>
              navigation.navigate("VehicleDashboard", { vehicle: item })
            }
            onDellPress={() => {
              setSelectedItem(item?._id), setDelModal(true);
            }}
          />
        )}
      />

      {modals.map((modal, index) => (
        <VTCModal
          key={modal.key}
          title={modal.title}
          isVisible={modalStep == index}
          onDisable={() => setModalStep(-1)}
          onPress={handleNext}
        />
      ))}

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

export default MyFleet;

const styles = StyleSheet.create({
  border: {
    height: 4,
    backgroundColor: COLORS.lightGray,
  },
});

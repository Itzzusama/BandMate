import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AuthFooter from "../../../components/Auth/AuthFooter";
import BikeQuantitySelector from "../../../components/BikeQuantitySelector";
import DateTimeBox from "../../../components/DateTimeBox";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TabSelector from "../../../components/TabSelector";
import TopTabWithBG from "../../../components/TopTabWithBG";
import VehicleQuantityList from "../../../components/VehicleQuantityList";
import { COLORS } from "../../../utils/COLORS";
import ParkingCalandar from "./molecules/ParkingCalandar";
import ParkingFlexibleDuration from "./molecules/ParkingFlexibleDuration";

const RentalVehical = () => {
  const [Tab, setTab] = useState("Dates");
  const [selectTab, setSelectTab] = useState("Place");
  const [address, setAddress] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [SelectVehicle, setSelectVehicle] = useState("");
  const [Roof, setRoof] = useState("");
  const [vehicleQuantities, setVehicleQuantities] = useState({
    bikes: 0,
    motorbikes: 0,
    cars: 0,
    trucks: 0,
    boats: 0,
    helicopters: 0,
    planes: 0,
  });

  const mainTabs = ["Place", "Dates", "Vehicles", "Amenities"];
  const dateTabs = ["Dates", "Months", "I'm Flexible"];
  const vehicleTypes = [
    "Bikes",
    "Motorbikes", 
    "Cars",
    "Trucks",
    "Helicopters",
    "Planes"
  ];
  const indoorOutdoorOptions = ["Indoor", "Outdoor"];
  const roofOptions = [
    "Parking With Roof",
    "Parking Without Roof", 
    "Vertical Rotatory Parking",
    "Individual Garage",
    "Parking Complex",
    "Automated Parking Complex"
  ];
  const vehicleQuantityConfig = [
    { key: "bikes", title: "HOW MANY BIKES" },
    { key: "motorbikes", title: "HOW MANY MOTORBIKES" },
    { key: "cars", title: "HOW MANY CARS" },
    { key: "trucks", title: "HOW MANY TRUCK" },
    { key: "boats", title: "HOW MANY BOATS" },
    { key: "helicopters", title: "HOW MANY HELICOPTERS" },
    { key: "planes", title: "HOW MANY PLANES" },
  ];

  const renderTabContent = () => {
    switch (selectTab) {
      case "Place":
        return (
          <View style={styles.tabContent}>
            <TopTabWithBG
              tab={Tab}
              tabNames={dateTabs}
              setTab={setTab}
              marginTop={20}
              marginVertical={0.1}
            />
            {Tab === "Months" ? (
              <>
                <Divider marginVertical={20} />
                <BikeQuantitySelector
                  title="HOW MANY GUESTS"
                  value={guestCount}
                  onValueChange={setGuestCount}
                />
                <DateTimeBox
                  label="CHECK-IN"
                  date="Friday, July 1, 2025"
                  onPress={() => {}}
                  style={{ marginTop: 20 }}
                />
                <DateTimeBox
                  label="CHECK-OUT"
                  date="Thursday, September 1, 2025"
                  onPress={() => {}}
                />
              </>
            ) : Tab === `I'm Flexible` ? (
              <ParkingFlexibleDuration marginTop={20} />
            ) : (
              <ParkingCalandar marginTop={20} />
            )}
          </View>
        );

      case "Dates":
        return (
          <View style={styles.tabContent}>
            <TopTabWithBG
              tab={Tab}
              tabNames={dateTabs}
              setTab={setTab}
              marginTop={20}
              marginVertical={0.1}
            />
            <ParkingCalandar marginTop={20} />
          </View>
        );

      case "Vehicles":
        return (
          <View style={styles.tabContent}>
            <Divider marginVertical={20} />
            <TabSelector
              tabs={vehicleTypes}
              selectedTab={SelectVehicle}
              onTabSelect={setSelectVehicle}
            />
            <Divider marginVertical={20} />
            <VehicleQuantityList
              vehicles={vehicleQuantityConfig}
              quantities={vehicleQuantities}
              onQuantityChange={setVehicleQuantities}
            />
          </View>
        );

      case "Amenities":
        return (
          <View style={styles.tabContent}>
            <Divider marginVertical={20} />
            <TabSelector
              tabs={indoorOutdoorOptions}
              selectedTab={SelectVehicle}
              onTabSelect={setSelectVehicle}
            />
            <Divider marginVertical={20} />
            <TabSelector
              tabs={roofOptions}
              selectedTab={Roof}
              onTabSelect={setRoof}
            />
          </View>
        );

      default:
        return (
          <View style={styles.tabContent}>
            <TopTabWithBG
              tab={Tab}
              tabNames={dateTabs}
              setTab={setTab}
              marginTop={20}
              marginVertical={0.1}
            />
            <ParkingCalandar marginTop={20} />
          </View>
        );
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <>
          <Header title={"Rental Period"} />
          <Divider thickness={4} color={COLORS.darkPurple} />
        </>
      )}
      footerUnScrollable={() => (
        <AuthFooter
          secondText={"From Dec 1 - Dec 3"}
          btnTitle={"+83 available spots"}
        />
      )}
    >
      <TabSelector
        tabs={mainTabs}
        selectedTab={selectTab}
        onTabSelect={setSelectTab}
        style={{marginTop: 20}}
      />
      {renderTabContent()}
    </ScreenWrapper>
  );
};

export default RentalVehical;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    paddingTop: 10,
  },
});

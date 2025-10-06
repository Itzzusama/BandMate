import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import fonts from "../../../assets/fonts";
import AuthFooter from "../../../components/Auth/AuthFooter";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTabWithBG from "../../../components/TopTabWithBG";
import { COLORS } from "../../../utils/COLORS";
import WarehouseCalendar from "./molecules/WarehouseCalandar";
import WarehouseFlexibleDuration from "./molecules/WarehouseFlexibleDuration";
import WarehouseMonthDuration from "./molecules/WarehouseMonthDuration";
import Divider from "../../../components/Divider";

const WarehouseRental = () => {
  const calendarRef = useRef();
  const navigation = useNavigation();

  const [tab, setTab] = useState("Dates");

  const handleConfirm = (data) => {
    console.log("Selected:", data);
  };

  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <>
          <Header title={"Rental Period"} />
          <Divider color={COLORS.darkPurple} thickness={4} marginVertical={6} />
        </>
      )}
      footerUnScrollable={() => (
        <AuthFooter
          paddingHorizontal={12}
          btnTitle={"+83 available spots"}
          secondText={"From Dec 1 - Dec 3"}
          onPress={() => navigation.navigate("WarehouseStorage")}
        />
      )}
    >
      <View style={{ paddingHorizontal: 12, marginTop: -8 }}>
        <TopTabWithBG
          tab={tab}
          fontSize={14}
          setTab={setTab}
          activeHeight={36}
          fontFamily={fonts.medium}
          tabNames={["Dates", "Months", "I’m Flexible"]}
        />
      </View>
      {tab !== "Dates" && <View style={styles.line} />}
      {tab === "Dates" ? (
        <WarehouseCalendar ref={calendarRef} onConfirm={handleConfirm} />
      ) : tab === "Months" ? (
        <WarehouseMonthDuration />
      ) : (
        <WarehouseFlexibleDuration />
      )}
    </ScreenWrapper>
  );
};

export default WarehouseRental;

const styles = StyleSheet.create({
  line: {
    backgroundColor: COLORS.lightGray,
    height: 1,
    marginTop: 5,
    marginBottom: 15,
  },
});

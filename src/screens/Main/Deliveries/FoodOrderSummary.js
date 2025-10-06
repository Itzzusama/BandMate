import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTab from "../../../components/TopTab";
import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import Icons from "../../../components/Icons";
import OrderMapBox from "./molecules/OrderMapBox";
import OrderDropOffAndPickup from "./molecules/OrderDropOffAndPickup";
import OrderNotes from "./molecules/OrderNotes";
import OrderTipBox from "./molecules/OrderTipBox";
import OrderDetailsBox from "./molecules/OrderDetailsBox";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomSwitch from "../../../components/CustomSwitch";
import OrderSummaryBox from "./molecules/OrderSummaryBox";

const tabs = ["All", "Meals", "Food", "Beverage", "Desserts"];

const FoodOrderSummary = () => {
  const [tab, setTab] = useState(0);
  const [round, setRound] = useState(true);

  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <Header title={"Order Summary"} onHelpPress={() => ""} />
      )}
      footerUnScrollable={() => (
        <View style={{ paddingHorizontal: 12 }}>
          <View style={[styles.row]}>
            <CustomText
              label={"Round-up price"}
              fontSize={16}
              fontFamily={fonts.medium}
              lineHeight={16 * 1.4}
            />
            <CustomSwitch value={round} setValue={setRound} />
          </View>
          <AuthFooter
            isMain
            title="The easiest and most affordable way to reach your destination."
          />
        </View>
      )}
    >
      <View>
        <TopTab
          rounded
          tab={tab}
          marginTop={5}
          tabNames={tabs}
          setTab={setTab}
          fontFamily={fonts.medium}
          scrollViewPaddingHorizontal={12}
        />
      </View>
      <View style={styles.offerBox}>
        <View>
          <CustomText
            fontSize={16}
            color={COLORS.white}
            lineHeight={16 * 1.4}
            fontFamily={fonts.semiBold}
            label={"Exclusive offers with Move+"}
          />
          <CustomText
            fontSize={14}
            color={COLORS.white}
            lineHeight={14 * 1.4}
            label={"Get discounts and enjoy a better experience."}
          />
        </View>
        <TouchableOpacity>
          <Icons
            size={22}
            family={"Feather"}
            color={"#FFFFFFA3"}
            name={"chevron-right"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <OrderMapBox />
      </View>
      <View style={styles.card}>
        <OrderDropOffAndPickup />
      </View>
      <View style={styles.card}>
        <OrderSummaryBox />
      </View>
      <View style={styles.card}>
        <OrderNotes />
      </View>
      <View style={styles.card}>
        <OrderTipBox />
      </View>
      <OrderDetailsBox />
    </ScreenWrapper>
  );
};

export default FoodOrderSummary;

const styles = StyleSheet.create({
  offerBox: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 5,
    borderTopWidth: 5,
    marginTop: 10,
    borderTopColor: COLORS.lightGray,
    borderBottomColor: COLORS.lightGray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    borderBottomWidth: 4,
    borderBottomColor: COLORS.lightGray,
    padding: 12,
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginTop: 20,
    borderTopColor: COLORS.inputBg,
    borderBottomColor: COLORS.inputBg,
  },
});

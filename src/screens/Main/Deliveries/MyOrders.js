import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import fonts from "../../../assets/fonts";
import { PNGIcons } from "../../../assets/images/icons";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTab from "../../../components/TopTab";
import TopTabWithBG from "../../../components/TopTabWithBG";
import { COLORS } from "../../../utils/COLORS";
import OrderCard from "./molecules/OrderCard";

const tabs = ["Trips", "Shippings", "Rentals", "Tours"];

const tabImages = {
  "My Orders": PNGIcons.order,
  "Re-Order": PNGIcons.reOrder,
};

const MyOrders = () => {
  const navigation = useNavigation();

  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState("My Orders");

  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <Header
          title={"My Orders"}
          onCartPress={() => navigation.navigate("OrderCart")}
        />
      )}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton title={"Continue"} marginBottom={8} />
          <CustomButton
            color={COLORS.black}
            title={"Save as Draft"}
            backgroundColor={"#ebebeb"}
          />
        </View>
      )}
    >
      <View style={{ flex: 1 }}>
        <TopTab
          rounded
          tab={tab}
          marginTop={5}
          tabNames={tabs}
          setTab={setTab}
          fontFamily={fonts.medium}
          scrollViewPaddingHorizontal={12}
        />
        <Divider marginVertical={10} thickness={4} />
        <View style={{ paddingHorizontal: 12 }}>
          <TopTabWithBG
            tab={selected}
            fontSize={14}
            marginVertical={1}
            activeHeight={36}
            setTab={setSelected}
            fontFamily={fonts.medium}
            withImage
            tabImages={tabImages}
            imageWidth={20}
            imgeHeight={20}
            tabNames={["My Orders", "Re-Order"]}
          />
        </View>
        <Divider marginTop={8} marginBottom={16} thickness={4} />
        <View style={{ paddingHorizontal: 12 }}>
          <CustomText
            fontSize={24}
            label={"Our Menu"}
            lineHeight={24 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <CustomText
            marginTop={5}
            lineHeight={14 * 1.4}
            color={COLORS.subtitle}
            label={"See the full list of our meals."}
          />

          <OrderCard marginTop={24} />
          <OrderCard isRadio marginTop={20} />
          <Divider thickness={1} marginVertical={20} />
          <OrderCard isRadio isOrder />
          <Divider thickness={1} marginVertical={20} />
          <OrderCard />
        </View>
        {/* <EmptyList  /> */}
      </View>
    </ScreenWrapper>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  footer: {
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: "#F6F6F6",
    paddingBottom: 30,
  },
});

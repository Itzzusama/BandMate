import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import TopTab from "../../../components/TopTab";
import Icons from "../../../components/Icons";

import { setFoodAndBeverage } from "../../../store/reducer/usersSlice";
import TripFoodCard from "./molecules/TripFoodCard";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const tabs = ["Beverage", "Food", "Gluten Free", "Desserts"];

const TripFoods = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedVehicle = useSelector((state) => state.users.selectedVehicle);
  console.log("========selectedVehicle", selectedVehicle);

  const [tab, setTab] = useState(0);
  const [selectedFood, setSelectedFood] = useState([]);

  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <Header title="Food-Beverage" onHelpPress={() => {}} />
      )}
      footerUnScrollable={() => (
        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <CustomButton
            title={`Confirm (${selectedFood.length} items)`}
            marginBottom={10}
            disabled={selectedFood.length === 0}
            onPress={() => {
              dispatch(setFoodAndBeverage(selectedFood));
              navigation.goBack();
            }}
          />
          <CustomButton
            color={COLORS.black}
            // title="Maybe Next Time"
            title="Back"
            backgroundColor="#1212120A"
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    >
      <View style={{ paddingHorizontal: 15 }}>
        <TopTab
          rounded
          tab={tab}
          tabNames={tabs}
          setTab={setTab}
          fontFamily={fonts.medium}
        />
      </View>
      <View style={styles.discountBox}>
        <View>
          <CustomText
            fontSize={16}
            label={"Move+"}
            lineHeight={22}
            color={COLORS.white}
            fontFamily={fonts.medium}
          />
          <CustomText
            fontSize={13}
            color="#FFFFFFCC"
            label="Get discounts and enjoy a better experience."
          />
        </View>
        <TouchableOpacity>
          <Icons
            size={20}
            family="Entypo"
            color="#FFFFFFCC"
            name="chevron-right"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <View style={styles.container}>
        <CustomText
          fontSize={22}
          marginTop={15}
          label={tabs[tab]}
          fontFamily={fonts.semiBold}
        />
        <CustomText
          color={COLORS.subtitle}
          label="See the full products’ list"
        />
        <FlatList
          numColumns={2}
          data={
            selectedVehicle?.FoodAndBeverage?.food ||
            selectedVehicle?.FoodAndBeverage ||
            []
          }
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TripFoodCard
              item={item}
              setSelectedFood={setSelectedFood}
              selectedFood={selectedFood}
            />
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default TripFoods;

const styles = StyleSheet.create({
  discountBox: {
    backgroundColor: "#37B874",
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  line: {
    backgroundColor: "#1212120A",
    height: 8,
    width: "100%",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});

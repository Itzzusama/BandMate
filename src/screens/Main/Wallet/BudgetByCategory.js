import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import Icons from "../../../components/Icons";
import HighlightedText from "../VehicleDashboard/molecules/HighlightedText";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import { useRoute, useNavigation } from "@react-navigation/native";

const BudgetByCategory = ({ navigation }) => {
  const route = useRoute();
  const onSelectCategoryBudget = route?.params?.onSelectCategoryBudget;
  const [categories, setCategories] = useState([
    {
      id: "trips",
      title: "TRIPS",
      amount: "25",
      percentage: "12.5%",
      lastMonthCount: "125 Trips",
      error: null,
    },
    {
      id: "shipping",
      title: "SHIPPING",
      amount: "21",
      percentage: "12.5%",
      lastMonthCount: "125 Shippings",
      error: null,
    },
    {
      id: "food",
      title: "FOOD",
      amount: "28",
      percentage: "12.5%",
      lastMonthCount: "125 Vehicle Rentals",
      error: null,
    },
    {
      id: "vehicle",
      title: "VEHICLE RENTALS",
      amount: "22",
      percentage: "12.5%",
      lastMonthCount: "125 Trips",
      error: null,
    },
    {
      id: "parking",
      title: "PARKING RENTALS",
      amount: "45",
      percentage: "12.5%",
      lastMonthCount: "125 Parking Rentals",
      error: null,
    },
    {
      id: "warehouse",
      title: "WAREHOUSE RENTALS",
      amount: "53",
      percentage: "12.5%",
      lastMonthCount: "125 Warehouse Rentals",
      error: null,
    },
    {
      id: "sightseeing",
      title: "SIGHTSEEING",
      amount: "73",
      percentage: "12.5%",
      lastMonthCount: "125 Sightseeings",
      error: null,
    },
  ]);

  const updateCategoryAmount = (id, value) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              amount: value,
              error: value ? null : "Amount is required",
            }
          : cat
      )
    );
  };

  const validateCategories = () => {
    let isValid = true;
    const updatedCategories = categories.map((cat) => {
      if (!cat.amount || cat.amount === "0") {
        isValid = false;
        return { ...cat, error: "Amount is required" };
      }
      return { ...cat, error: null };
    });

    setCategories(updatedCategories);
    return isValid;
  };

  const handleConfirm = () => {
    if (!validateCategories()) return;

    // Build the mapping required by the parent
    const mapping = {
      trip: Number(categories.find((c) => c.id === "trips")?.amount || 0),
      shipping: Number(
        categories.find((c) => c.id === "shipping")?.amount || 0
      ),
      food: Number(categories.find((c) => c.id === "food")?.amount || 0),
      vechicleRentals: Number(
        categories.find((c) => c.id === "vehicle")?.amount || 0
      ),
      parkingRentals: Number(
        categories.find((c) => c.id === "parking")?.amount || 0
      ),
      warehouseRentals: Number(
        categories.find((c) => c.id === "warehouse")?.amount || 0
      ),
      sightseeing: Number(
        categories.find((c) => c.id === "sightseeing")?.amount || 0
      ),
    };

    if (typeof onSelectCategoryBudget === "function") {
      onSelectCategoryBudget(mapping);
    }
    navigation.goBack();
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Budget By Category"} />}
    >
      <CustomText
        label={"By Category"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={20}
      />
      <CustomText
        label={"Please inform your details below."}
        color={COLORS.gray1}
        fontSize={14}
        lineHeight={14 * 1.4}
        marginBottom={16}
      />

      <View style={styles.budgetContainer}>
        <CustomText
          label={"4,000Cr"}
          fontFamily={fonts.semiBold}
          fontSize={40}
          lineHeight={40 * 1.4}
          color={COLORS.black}
        />
        <CustomText
          label={"CURRENT BUDGET"}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray2}
          fontFamily={fonts.medium}
          textTransform={"uppercase"}
        />
      </View>

      {categories.map((category) => (
        <View key={category.id} style={styles.categoryCard}>
          <CustomInput
            withLabel={category.title}
            value={category.amount}
            onChangeText={(value) => updateCategoryAmount(category.id, value)}
            keyboardType="numeric"
            rightText={category.percentage}
            rightTextStyle={styles.percentageText}
            error={category.error}
            marginBottom={0.1}
          />

          <View style={styles.infoContainer}>
            <HighlightedText
              textBefore="Last month expenses: "
              highlightedText="80,700 (SC) Sola Credits."
              highlightColor={COLORS.darkPurple}
              fontSize={12}
              align="left"
              marginTop={8}
              marginBottom={4}
            />
            <HighlightedText
              highlightedText={category.lastMonthCount}
              textAfter="Last month"
              highlightColor={COLORS.darkPurple}
              fontSize={12}
              align="left"
              marginBottom={8}
            />
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <CustomButton
          title={"Confirm"}
          onPress={handleConfirm}
          marginBottom={8}
        />
        <CustomButton
          title={"Cancel"}
          backgroundColor={COLORS.inputBg}
          color={COLORS.black}
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScreenWrapper>
  );
};

export default BudgetByCategory;

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    marginTop: 40,
  },
  budgetContainer: {
    marginBottom: 32,
  },

  categoryInput: {
    fontSize: 24,
    fontFamily: fonts.semiBold,
    color: COLORS.black,
  },
  categoryLabel: {
    fontSize: 12,
    color: COLORS.gray4,
    fontFamily: fonts.medium,
    textTransform: "uppercase",
  },
  percentageText: {
    fontSize: 24,
    fontFamily: fonts.semiBold,
    color: COLORS.gray2,
  },
});

import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { RefreshControl, StyleSheet, View, Alert } from "react-native";
import fonts from "../../../assets/fonts";
import { PNGIcons } from "../../../assets/images/icons";
import Border from "../../../components/Border";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTab from "../../../components/TopTab";
import { get, post, put } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { ToastMessage } from "../../../utils/ToastMessage";
import FoodCard from "./molecules/FoodCard";
import PortableFridgeCard from "./molecules/PortableFridgeCard";

const FoodBeverage = ({ route }) => {
  const currentVehicle = route.params?.currentVehicle;
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await get("products?limit=15&sort=createdAt%3Aasc");
      setProducts(response.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // console.log("currentVehicle-----123", currentVehicle?.FoodAndBeverage);

  const initializeSelectedProducts = () => {
    if (!products.length || !currentVehicle?.FoodAndBeverage?.food) return;

    const existingFood = currentVehicle?.FoodAndBeverage?.food;
    const initializedProducts = {};

    existingFood.forEach((foodItem) => {
      let foodId, quantity, unitPrice;

      if (typeof foodItem === "string") {
        // case: first time, only string id
        foodId = foodItem;
        quantity = 1;
        unitPrice = "";
      } else {
        // case: metadata object
        foodId = foodItem?._id;
        quantity = foodItem?.quantity || 1;
        unitPrice = foodItem?.unitPrice || "";
      }

      const product = products.find((p) => p?._id === foodId);
      if (product) {
        initializedProducts[foodId] = {
          selected: true,
          quantity,
          unitPrice,
        };
      }
    });

    setSelectedProducts(initializedProducts);
    setIsInitialized(true);
  };

  // Reset initialization when currentVehicle changes
  useEffect(() => {
    setIsInitialized(false);

    if (
      products?.length > 0 &&
      Array.isArray(currentVehicle?.FoodAndBeverage?.food)
    ) {
      const foodArr = currentVehicle.FoodAndBeverage.food;

      // Agar pehla element string hai to skip
      if (typeof foodArr[0] !== "string") {
        initializeSelectedProducts();
      }
    }
  }, [currentVehicle?.FoodAndBeverage?.food, products]);

  // Handle product selection
  const handleProductSelection = (productId, isSelected) => {
    setSelectedProducts((prev) => {
      if (isSelected) {
        return {
          ...prev,
          [productId]: {
            ...prev[productId],
            selected: true,
            quantity: prev[productId]?.quantity || 1,
            unitPrice: prev[productId]?.unitPrice || "",
          },
        };
      } else {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      }
    });
  };

  // Handle quantity change
  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: quantity,
      },
    }));
  };

  // Handle price change
  const handlePriceChange = (productId, price) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        unitPrice: price,
      },
    }));
  };

  // Format products for API submission
  const formatProductsForAPI = () => {
    return Object.keys(selectedProducts).map((productId) => {
      const product = products?.find((p) => p?._id === productId);
      const selectedProduct = selectedProducts[productId];

      return {
        _id: product?._id,
        brand: product?.brand || "",
        title: product?.title || "",
        type: product?.type || "",
        category: product?.category || [],
        volume: product?.measurement?.value || 0,
        fluidOunces: product?.measurement?.fluidOunces || 0,
        productPrice: product?.price?.amount || 0,
        unitPrice: selectedProduct?.unitPrice || "",
        quantity: selectedProduct?.quantity || 1,
        image: product?.image || "",
      };
    });
  };

  // API call to add food & beverages
  const addFoodBeverages = async () => {
    if (!currentVehicle?.id) {
      ToastMessage("Vehicle information is missing", "error");
      return;
    }

    const selectedCount = Object.keys(selectedProducts).length;
    if (selectedCount === 0) {
      ToastMessage("Please select at least one product", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const requestBody = {
        food: formatProductsForAPI(),
      };

      const response = await put(
        `vehicles/${currentVehicle?.id}/food/${currentVehicle?.FoodAndBeverage?._id}`,
        requestBody
      );

      if (response.data?.success) {
        ToastMessage("Food & beverages added successfully", "success");
        // Optionally navigate back or reset form
        setSelectedProducts({});
        navigation.goBack();
      } else {
        ToastMessage(
          response.data?.message || "Failed to add food & beverages",
          "error"
        );
      }
    } catch (error) {
      ToastMessage("An error occurred while adding food & beverages", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = products?.filter((item) => {
    if (tab === 0) {
      return item?.type?.toLowerCase() === "beverage";
    }
    if (tab === 1) {
      return item?.type?.toLowerCase() === "food";
    }
    if (tab === 2) {
      return item?.category?.some((c) => c?.toLowerCase() === "gf");
    }
    return true;
  });

  useEffect(() => {
    getProducts();
  }, [isFocus]);

  return (
    <ScreenWrapper
      scrollEnabled
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getProducts} />
      }
      headerUnScrollable={() => <Header title={"Food & Beverage"} />}
      footerUnScrollable={() => (
        <View style={{ paddingHorizontal: 12 }}>
          {Object.keys(selectedProducts).length > 0 && (
            <CustomButton
              title={
                isSubmitting
                  ? "Adding..."
                  : `Add ${Object.keys(selectedProducts).length} Product${
                      Object.keys(selectedProducts).length > 1 ? "s" : ""
                    }`
              }
              onPress={addFoodBeverages}
              backgroundColor={COLORS.primaryColor}
              color={COLORS.white}
              marginTop={12}
              marginBottom={12}
              borderRadius={12}
              fontFamily={fonts.medium}
              disabled={isSubmitting}
            />
          )}
        </View>
      )}
    >
      <TopTab
        rounded
        tabNames={["Beverage", "Food", "Gluten Free"]}
        tab={tab}
        setTab={setTab}
      />
      <Border marginTop={8} height={4} />

      <PortableFridgeCard
        onPress={() => navigation.navigate("PortableFridge")}
      />
      <Border height={4} />

      <View style={styles.headerRow}>
        <View>
          <CustomText
            label={"Approved Local Providers"}
            fontFamily={fonts.semiBold}
            fontSize={24}
            lineHeight={24 * 1.4}
          />
          <CustomText
            label={"Find the list of products below"}
            fontSize={14}
            lineHeight={14 * 1.4}
            color={COLORS.gray1}
          />
        </View>
      </View>

      <View style={styles.row}>
        <ImageFast
          source={PNGIcons.switzerland}
          style={{ height: 12, width: 17, marginRight: 6 }}
          resizeMode={"contain"}
        />
        <CustomText label={"In "} color={COLORS.gray1} lineHeight={14 * 1.4} />
        <CustomText
          label={"Switzerland"}
          fontFamily={fonts.medium}
          lineHeight={14 * 1.4}
        />
      </View>

      <View style={styles.serveCard}>
        <Icons
          name={"info"}
          family={"Feather"}
          size={12}
          marginRight={4}
          color={COLORS.darkPurple}
        />
        <CustomText
          label={"Serve fresh products only."}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.darkPurple}
        />
      </View>
      {filteredProducts?.map((item, index) => {
        const isSelected = selectedProducts[item._id]?.selected || false;
        const selectedProduct = selectedProducts[item._id];

        return (
          <View key={index}>
            <FoodCard
              value={isSelected}
              onValueChange={(val) => handleProductSelection(item._id, val)}
              brandName={item?.brand}
              title={item?.title}
              volume={item?.measurement?.value}
              onc={item?.measurement?.fluidOunces}
              category={item?.category}
              currentPrice={item?.price?.amount}
              image={item?.image?.toLowerCase()}
              productId={item._id}
              inputValue={selectedProduct?.unitPrice || ""}
              initialQuantity={selectedProduct?.quantity || 1}
              onQuantityChange={handleQuantityChange}
              onPriceChange={handlePriceChange}
            />
            <Border height={1} marginVertical={20} />
          </View>
        );
      })}

      {/* Submit Button */}
    </ScreenWrapper>
  );
};

export default FoodBeverage;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 12,
  },
  selectedCount: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 16,
  },
  serveCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#F7F8FF",
    marginVertical: 20,
  },
});

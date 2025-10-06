import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";
import Divider from "../../../../components/Divider";

import SelectedFooCard from "./SelectedFooCard";

import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import {
  setIsExtraFoodAndBeverage,
  setFoodAndBeverage,
  setSelectedVehicle,
} from "../../../../store/reducer/usersSlice";
import { put } from "../../../../services/ApiRequest";
import { useState } from "react";

const SelectedTripFoods = ({
  data,
  vehicle,
  metadata,
  orderId,
  getOrderData,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const foodAndBeverage = useSelector((state) => state.users.foodAndBeverage);
  const isExtraFoodAndBeverage = useSelector(
    (state) => state.users.isExtraFoodAndBeverage
  );
  const [loading, setLoading] = useState(false);

  const foodPrice = foodAndBeverage?.reduce(
    (total, item) =>
      total + Number(item?.quantity || 0) * Number(item?.unitPrice || 0),
    0
  );

  const onSaveFood = async () => {
    const existingList = metadata?.foodAndBeverage || [];
    const extras = foodAndBeverage || [];

    const extrasMap = new Map();
    extras.forEach((item) => {
      const current = extrasMap.get(item?._id);
      if (current) {
        extrasMap.set(item?._id, {
          ...current,
          quantity:
            Number(current?.quantity || 0) + Number(item?.quantity || 0),
        });
      } else {
        extrasMap.set(item?._id, { ...item });
      }
    });

    const mergedMap = new Map();
    existingList.forEach((item) => {
      if (item?._id) {
        mergedMap.set(item._id, { ...item });
      }
    });

    extrasMap.forEach((extraItem, id) => {
      if (mergedMap.has(id)) {
        const base = mergedMap.get(id);
        mergedMap.set(id, {
          ...base,
          quantity:
            Number(base?.quantity || 0) + Number(extraItem?.quantity || 0),
          unitPrice: base?.unitPrice ?? extraItem?.unitPrice ?? "",
          productPrice:
            base?.productPrice ??
            extraItem?.productPrice ??
            base?.unitPrice ??
            extraItem?.unitPrice,
        });
      } else {
        mergedMap.set(id, { ...extraItem });
      }
    });

    const mergedFoodAndBeverage = Array.from(mergedMap.values());

    let newMetadata = {
      ...metadata,
      foodAndBeverage: mergedFoodAndBeverage,
      extraData: {
        ...metadata?.extraData,
        extraPrice: (metadata?.extraData?.extraPrice || 0) + (foodPrice || 0),
      },
    };

    const body = { metadata: newMetadata };
    try {
      setLoading(true);
      const res = await put(`orders/${orderId}`, body);
      dispatch(setFoodAndBeverage([]));
      dispatch(setIsExtraFoodAndBeverage(false));
      getOrderData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View>
      <CustomText
        fontSize={18}
        lineHeight={18 * 1.4}
        fontFamily={fonts.semiBold}
        label={`Food & Beverage ${data?.length || 0}`}
      />
      <CustomText
        fontSize={12}
        lineHeight={12 * 1.4}
        color={COLORS.subtitle}
        label="See the full list of what you ordered."
      />
      <FlatList
        keyExtractor={(_, i) => i?.toString()}
        data={data || []}
        renderItem={({ item }) => <SelectedFooCard item={item} isChange />}
      />
      <Divider thickness={4} marginTop={0.1} />

      <CustomText
        fontSize={18}
        lineHeight={18 * 1.4}
        fontFamily={fonts.semiBold}
        label={`Extra Food & Beverage`}
      />
      <FlatList
        keyExtractor={(_, i) => i?.toString()}
        data={foodAndBeverage || []}
        renderItem={({ item }) => <SelectedFooCard item={item} />}
      />

      {isExtraFoodAndBeverage && (
        <View style={styles.row}>
          <CustomText
            fontSize={16}
            label="Subtotal"
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
          />
          <CustomText
            fontSize={16}
            label={`$${(foodPrice || 0)?.toFixed(2)}`}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
          />
        </View>
      )}
      <CustomButton
        width={isExtraFoodAndBeverage ? "30%" : "45%"}
        height={32}
        fontSize={14}
        borderRadius={99}
        alignSelf="center"
        icon={isExtraFoodAndBeverage ? false : PNGIcons.plus}
        color={COLORS.black}
        title={isExtraFoodAndBeverage ? "Save" : "Add more items"}
        backgroundColor="#1212120A"
        marginTop={15}
        loading={loading}
        onPress={
          isExtraFoodAndBeverage
            ? onSaveFood
            : () => {
                dispatch(setFoodAndBeverage([]));
                dispatch(setIsExtraFoodAndBeverage(true));
                dispatch(setSelectedVehicle(vehicle));
                navigation.navigate("TripFoods");
              }
        }
      />
    </View>
  );
};

export default SelectedTripFoods;

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
});

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useState } from "react";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import Icons from "../../../../components/Icons";

import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const SelectedFooCard = ({ item, isChange }) => {
  const [quantity, setQuantity] = useState(item?.quantity);

  return (
    <View style={styles.card}>
      <View style={[styles.row, { marginBottom: 5 }]}>
        <ImageFast
          source={{ uri: item?.image?.toLowerCase() }}
          resizeMode={"contain"}
          style={styles.foodImg}
        />
        <View>
          <CustomText
            fontSize={16}
            label={item?.title}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
          />
          <CustomText fontSize={12} numberOfLines={2} label={item?.brand} />
          <CustomText
            fontSize={12}
            lineHeight={12 * 1.4}
            label={`${item?.volume} ML`}
          />
          <CustomText
            fontSize={12}
            lineHeight={12 * 1.4}
            label={`Quantity: ${item?.quantity || 0}`}
          />
        </View>
      </View>

      {isChange ? null : (
        <>
          {item?.isCustomerFavourite && (
            <View style={[styles.row]}>
              <Icons name={"star"} size={10} color={COLORS.green1} />
              <CustomText
                fontSize={12}
                color={COLORS.green1}
                lineHeight={12 * 1.4}
                label={"Customers favorites"}
              />
            </View>
          )}
          {item?.isWarning && (
            <View style={styles.row}>
              <Icons
                name={"info"}
                size={10}
                family={"Feather"}
                color={COLORS.warning}
              />
              <CustomText
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.warning}
                label={"Contains Peanuts Oil"}
              />
            </View>
          )}
          <View style={[styles.row1]}>
            <View style={styles.row}>
              <CustomText
                fontSize={16}
                lineHeight={16 * 1.4}
                fontFamily={fonts.medium}
                label={"$" + Number(item?.productPrice || 0)?.toFixed(2)}
              />
              <CustomText
                color={COLORS.subtitle}
                lineHeight={14 * 1.4}
                label={`(${Number(item?.unitPrice || 0)?.toFixed(2)} per unit)`}
              />
            </View>
            <View style={styles.counter}>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                {quantity === 1 ? (
                  <Icons
                    ssize={17}
                    name={"delete-forever"}
                    family={"MaterialIcons"}
                  />
                ) : (
                  <CustomText
                    label={"-"}
                    fontSize={17}
                    fontFamily={fonts.medium}
                  />
                )}
              </TouchableOpacity>
              <CustomText
                fontSize={16}
                label={quantity}
                fontFamily={fonts.medium}
              />
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setQuantity(quantity + 1)}
              >
                <CustomText
                  label={"+"}
                  fontSize={17}
                  fontFamily={fonts.medium}
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default SelectedFooCard;

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 1,
    borderBottomColor: "#1212120A",
    marginTop: 20,
    paddingBottom: 15,
  },
  foodImg: {
    height: 60,
    width: 55,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  row1: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginTop: 8,
  },
  counterBtn: {
    backgroundColor: "#1212120A",
    borderRadius: 100,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});

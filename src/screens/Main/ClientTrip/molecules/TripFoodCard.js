import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import Icons from "../../../../components/Icons";

import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const TripFoodCard = ({ item, setSelectedFood }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (quantity > 0) {
      setSelectedFood((prev) => {
        const existingIndex = prev.findIndex((food) => food._id === item._id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = { ...item, quantity };
          return updated;
        } else {
          return [...prev, { ...item, quantity }];
        }
      });
    } else {
      setSelectedFood((prev) => prev.filter((food) => food._id !== item._id));
    }
  }, [quantity, item, setSelectedFood]);

  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <CustomText
          fontSize={10}
          lineHeight={20}
          label="★ POPULAR"
          color={COLORS.white}
          fontFamily={fonts.semiBold}
        />
      </View>

      <ImageFast
        style={styles.image}
        source={item?.image ? { uri: item.image?.toLowerCase() } : Images.food1}
        resizeMode="contain"
      />

      <CustomText
        fontSize={16}
        label={item?.title || ""}
        lineHeight={20}
        fontFamily={fonts.medium}
      />
      <CustomText
        fontSize={13}
        lineHeight={20}
        label={item?.brand || ""}
        color={COLORS.subtitle}
      />

      <View style={styles.row}>
        <CustomText
          label={`${item?.volume || 0} ml`}
          lineHeight={20}
          fontSize={12}
        />
        <CustomText
          fontSize={10}
          label={`${item?.fluidOunces || 0} FL OZ`}
          color={COLORS.subtitle}
        />
      </View>

      <View style={styles.row}>
        <Icons name={"info"} family={"Feather"} color={"#776A3D"} />
        <CustomText
          fontSize={12}
          marginTop={1.5}
          color={"#776A3D"}
          label={"Contains Peanuts"}
        />
      </View>

      <View style={styles.tags}>
        {item?.category?.map((cat, index) => {
          const colorMap = {
            ve: "#37B874",
            v: "#F7941F",
            gf: "#776A3D",
            sf: COLORS.primaryColor,
          };

          return (
            <View
              key={index}
              style={[
                styles.tag,
                { backgroundColor: colorMap[cat.toLowerCase()] },
              ]}
            >
              <CustomText
                label={cat.toUpperCase()}
                fontSize={8}
                lineHeight={8 * 1.4}
                color="#fff"
                textAlign="center"
              />
            </View>
          );
        })}
      </View>

      <View style={styles.row}>
        <CustomText
          label={`$${item?.productPrice || 0}`}
          color={COLORS.green}
          fontFamily={fonts.medium}
        />
        <CustomText
          label={`$${item?.unitPrice || 0}`}
          color={COLORS.subtitle}
          fontSize={12}
          textDecorationLine={"line-through"}
        />
      </View>

      <View style={styles.counter}>
        <TouchableOpacity
          style={[styles.counterBtn, quantity === 0 && styles.disabledBtn]}
          onPress={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
        >
          <CustomText label={"-"} fontSize={27} fontFamily={fonts.medium} />
        </TouchableOpacity>
        <CustomText label={quantity} fontFamily={fonts.medium} fontSize={16} />
        <TouchableOpacity
          style={styles.counterBtn}
          onPress={() => setQuantity(quantity + 1)}
        >
          <CustomText label={"+"} fontSize={27} fontFamily={fonts.medium} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TripFoodCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    width: "49%",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: COLORS.green1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    position: "absolute",
    zIndex: 1,
    top: 10,
    left: 10,
  },
  image: {
    width: "100%",
    height: 180,
    marginBottom: 8,
    borderRadius: 5,
    overflow: "hidden",
  },

  contains: {
    fontSize: 12,
    color: "#8B5E3C",
    marginBottom: 6,
  },
  tags: {
    flexDirection: "row",
    marginBottom: 6,
    marginTop: 5,
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 100,
    marginHorizontal: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  counterBtn: {
    backgroundColor: "#1212120A",
    borderRadius: 4,
    width: 54,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledBtn: {
    opacity: 0.5,
  },
});

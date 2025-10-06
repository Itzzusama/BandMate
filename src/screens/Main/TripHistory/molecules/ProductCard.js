import { StyleSheet, View } from "react-native";
import React from "react";

import ErrorComponent from "../../../../components/ErrorComponent";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import Icons from "../../../../components/Icons";

import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const ProductCard = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <View style={styles.row}>
          <ImageFast source={Images.starWars} style={styles.image} />
          <View>
            <CustomText
              label="Product 1"
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={16 * 1.4}
            />

            <CustomText
              label="Description"
              color={COLORS.subtitle}
              fontSize={12}
              lineHeight={12 * 1.4}
            />
            <CustomText
              label="420Gr."
              color={COLORS.subtitle}
              fontSize={12}
              lineHeight={12 * 1.4}
            />
            <CustomText
              label="$2.00"
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={16 * 1.4}
            />
          </View>
        </View>

        <Icons
          name="keyboard-arrow-right"
          family="MaterialIcons"
          size={24}
          color={COLORS.subtitle}
        />
      </View>
      <ErrorComponent
        errorTitle="Most customers will pay extra for this."
        marginBottom={-5}
        color="#1212127A"
      />
      <ErrorComponent errorTitle="Contains Peanuts" color="#776A3D" />
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 16,
    marginBottom: 20,
    paddingRight: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#1212120A",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 68,
    height: 70,
    borderRadius: 12,
    marginRight: 8,
  },
});

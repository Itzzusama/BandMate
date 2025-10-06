import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomCheckbox from "../../../../components/CustomCheckBox";
import CustomInput from "../../../../components/CustomInput";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";
import HighlightedText from "./HighlightedText";

const FoodCard = ({
  value,
  onValueChange,
  image,
  inputValue,
  brandName,
  title,
  volume = 250,
  onc = 0.4,
  category = ["ve", "v", "gf", "sf"],
  currentPrice,
  productId,
  onQuantityChange,
  onPriceChange,
  initialQuantity = 1,
}) => {
  console.log("===inputValue", inputValue);

  const [count, setCount] = useState(initialQuantity);
  const [unitPrice, setUnitPrice] = useState(inputValue || "");

  // Update unitPrice when inputValue changes from parent
  useEffect(() => {
    setUnitPrice(inputValue || "");
  }, [inputValue]);

  // Update count when initialQuantity changes from parent
  useEffect(() => {
    setCount(initialQuantity);
  }, [initialQuantity]);

  const handleQuantityChange = (newCount) => {
    setCount(newCount);
    if (onQuantityChange) {
      onQuantityChange(productId, newCount);
    }
  };

  const handlePriceChange = (price) => {
    setUnitPrice(price);
    if (onPriceChange) {
      onPriceChange(productId, price);
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.image}>
          <ImageFast
            source={image ? { uri: image } : PNGIcons.bottle}
            style={styles.food}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <CustomText
              label={brandName || "Evian"}
              fontSize={14}
              lineHeight={12 * 1.4}
              fontFamily={fonts.medium}
            />
            <CustomText
              label={title || "Natural Water"}
              fontSize={12}
              lineHeight={12 * 1.4}
              color={COLORS.gray1}
            />

            <View style={styles.boxRow}>
              <CustomText
                label={`${volume} ml`}
                fontSize={12}
                lineHeight={12 * 1.4}
              />
              <CustomText
                label={`${onc} FL OZ`}
                fontSize={10}
                lineHeight={10 * 1.4}
                color={COLORS.gray1}
              />
            </View>
          </View>

          <View style={styles.boxRow}>
            {category?.map((cat, index) => {
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
                    styles.box,
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
        </View>
        <View style={{ justifyContent: "center" }}>
          <CustomCheckbox
            borderColor={COLORS.gray2}
            borderRadius={99}
            value={value}
            onValueChange={onValueChange}
            bgColor={COLORS.darkPurple}
          />
        </View>
      </View>
      {value && (
        <>
          <CustomInput
            value={unitPrice}
            onChangeText={handlePriceChange}
            marginTop={12}
            withLabel={"Unit Price"}
            placeholder={"$2.00"}
            placeholderTextColor={COLORS.primaryColor}
          />
          <HighlightedText
            color={COLORS.red}
            textBefore="+26%"
            highlightedText="of the Chauffeurs’ market."
            highlightColor={COLORS.gray1}
            highlightFontFamily={fonts.regular}
            afterFontFamily={fonts.medium}
          />
          <HighlightedText
            color={COLORS.darkPurple}
            textAfter={`$${currentPrice}` || "$1.25"}
            highlightedText="Current market rate is of:"
            highlightColor={COLORS.gray1}
            highlightFontFamily={fonts.regular}
            afterFontFamily={fonts.medium}
            marginBottom={12}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  padding: 4,
                  backgroundColor:
                    count < 8 ? "#EE1045" : count < 15 ? "#F7941F" : "#37B874",
                  width: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  marginRight: 6,
                }}
              >
                <CustomText
                  label={count < 8 ? "LOW" : count < 15 ? "OKAY" : "GOOD"}
                  color={COLORS.white}
                  fontSize={10}
                  lineHeight={10 * 1.4}
                  fontFamily={fonts.semiBold}
                />
              </View>

              <CustomText
                label={"Available Stock."}
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.gray1}
              />
            </View>

            <View style={styles.incrementContainer}>
              <TouchableOpacity
                onPress={() => handleQuantityChange(Math?.max(1, count - 1))}
                style={styles.circleButton}
              >
                <CustomText label={"−"} fontSize={24} lineHeight={24 * 1.4} />
              </TouchableOpacity>

              <CustomText
                label={count}
                fontFamily={fonts.medium}
                fontSize={16}
                lineHeight={16 * 1.4}
              />

              <TouchableOpacity
                onPress={() => handleQuantityChange(count + 1)}
                style={styles.circleButton}
              >
                <CustomText fontSize={24} lineHeight={24 * 1.4} label={"+"} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
  },
  image: {
    height: 80,
    width: 80,
    backgroundColor: COLORS.lightGray,
    marginRight: 8,
  },
  food: {
    height: "100%",
    width: "100%",
  },
  boxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  box: {
    height: 16,
    width: 16,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  incrementContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  circleButton: {
    height: 32,
    width: 32,
    borderRadius: 99,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import ErrorComponent from "../../../../components/ErrorComponent";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const OrderCard = ({ isRadio, isOrder, marginTop, isQuantity }) => {
  const [Check1, setCheck1] = useState(false);
  const [Check2, setCheck2] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <View style={[styles.mainContainer, { marginTop: marginTop }]}>
        <View style={[styles.row, { gap: 8 }]}>
          <ImageFast
            source={Images.foodCardImage}
            resizeMode={"cover"}
            style={styles.orderImage}
          />
          <View>
            <CustomText
              label={"Product 1"}
              fontSize={16}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
            />
            <CustomText
              label={"Description"}
              fontSize={12}
              lineHeight={12 * 1.4}
              fontFamily={fonts.regular}
              color={COLORS.subtitle}
            />
            {!isOrder ? (
              <CustomText
                label={"420Gr."}
                fontSize={12}
                lineHeight={12 * 1.4}
                fontFamily={fonts.regular}
                color={COLORS.subtitle}
              />
            ) : null}

            <CustomText
              label={"$2.00"}
              fontSize={16}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
            />
          </View>
        </View>
        {isRadio ? (
          <>
            <View style={[styles.row, { gap: 8 }]}>
              <TouchableOpacity onPress={() => setCheck1(true)}>
                <Icons
                  family="MaterialCommunityIcons"
                  name={Check1 ? "radiobox-marked" : "radiobox-blank"}
                  size={28}
                  color={Check1 ? COLORS.darkPurple : COLORS.gray2}
                />
              </TouchableOpacity>
              {!isOrder ? (
                <TouchableOpacity onPress={() => setCheck2(true)}>
                  <Icons
                    family="MaterialCommunityIcons"
                    name={Check2 ? "radiobox-marked" : "radiobox-blank"}
                    size={28}
                    color={Check2 ? COLORS.darkPurple : COLORS.gray2}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </>
        ) : (
          <ImageFast
            source={PNGIcons.forward}
            resizeMode={"cover"}
            style={{ height: 24, width: 24 }}
          />
        )}
      </View>
      {!isOrder ? (
        <>
          <ErrorComponent errorTitle="Most customers will pay extra for this." />
          <ErrorComponent color={"#776A3D"} errorTitle="Contains Peanuts" />
        </>
      ) : null}
      {isQuantity && (
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => quantity > 1 && setQuantity(quantity - 1)}
          >
            <Icons name={"minus"} family={"Feather"} size={20} />
          </TouchableOpacity>
          <CustomText
            fontSize={16}
            label={quantity}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
          />
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Icons name={"plus"} family={"Feather"} size={20} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  orderImage: {
    width: 68,
    height: 68,
    borderRadius: 12,
  },
  quantityBtn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 50,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    alignSelf: "flex-end",
  },
});

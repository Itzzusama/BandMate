import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import OrderCard from "./OrderCard";
import ImageFast from "../../../../components/ImageFast";
import { Images } from "../../../../assets/images";
import Icons from "../../../../components/Icons";
import CustomButton from "../../../../components/CustomButton";
import { PNGIcons } from "../../../../assets/images/icons";

const data = [
  {
    store: "McDonald’s",
    items: [
      {
        title: "McChicken",
        description: "420Gr.",
      },
      {
        title: "10 pc. Spicy Chicken McNuggets Meal",
        description: "420Gr.",
      },
    ],
  },
  {
    store: "McDonald’s",
    items: [
      {
        title: "McChicken",
        description: "420Gr.",
      },
      {
        title: "10 pc. Spicy Chicken McNuggets Meal",
        description: "420Gr.",
      },
    ],
  },
];

const OrderSummaryBox = () => {
  return (
    <View>
      <CustomText
        fontSize={22}
        lineHeight={22 * 1.4}
        label={"Order Summary"}
        fontFamily={fonts.semiBold}
      />
      <CustomText
        marginTop={5}
        marginBottom={12}
        lineHeight={14 * 1.4}
        color={COLORS.subtitle}
        label={"See the full list of what you ordered."}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <View style={styles.storeBox}>
              <View style={styles.row}>
                <ImageFast
                  style={styles.img}
                  source={Images.store}
                  resizeMode={"center"}
                />
                <View>
                  <CustomText
                    fontSize={18}
                    label={item?.store}
                    lineHeight={18 * 1.4}
                    fontFamily={fonts.semiBold}
                  />
                  <CustomText
                    label={"3 Items"}
                    lineHeight={14 * 1.4}
                    color={COLORS.subtitle}
                  />
                </View>
              </View>
              <TouchableOpacity>
                <Icons
                  size={20}
                  family={"Entypo"}
                  name={"chevron-down"}
                  color={COLORS.subtitle}
                />
              </TouchableOpacity>
            </View>
            <OrderCard isQuantity />
            <View style={styles.line} />
          </View>
        )}
      />
      <CustomButton
        width="43%"
        height={32}
        fontSize={14}
        icon={PNGIcons.plus}
        color={COLORS.black}
        title={"Add more items"}
        fontFamily={fonts.regular}
        backgroundColor={COLORS.lightGray}
      />
    </View>
  );
};

export default OrderSummaryBox;

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  storeBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.inputBg,
    marginBottom: 15,
    marginTop: 20,
  },
});

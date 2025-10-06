import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";

const products = [
  {
    id: 1,
    name: "Gatorade Thirst Quencher Sports Drink",
    price: 2.83,
    discount: 5,
  },
  {
    id: 2,
    name: "Fruit By the Foot Fruit Flavored Snacks (6 count)",
    price: 6.51,
  },
  {
    id: 3,
    name: "Organic Bananas By the Fruit",
    price: 1.39,
  },
  {
    id: 4,
    name: "Nick’s Strawbar Swirl Light Ice Cream",
    price: 11.84,
    discount: 22,
  },
];

const discountPrice = (price, discount) => {
  const discountedPrice = price * (discount / 100);
  return discountedPrice?.toFixed(2);
};

const OrderCart = () => {
  const navigation = useNavigation();
  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      footerUnScrollable={() => (
        <View style={{ padding: 20 }}>
          <CustomButton title={"Go To Checkout"} />
        </View>
      )}
    >
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name={"close-a"} size={15} family={"Fontisto"} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icons name={"user-plus"} size={18} family={"Feather"} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <CustomText
          fontSize={18}
          marginTop={15}
          label={"Safeway"}
          fontFamily={fonts.semiBold}
        />
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <ImageFast
                style={styles.img}
                source={Images.food2}
                resizeMode={"contain"}
              />
              <View style={{ flex: 1 }}>
                <CustomText
                  fontSize={15}
                  numberOfLines={2}
                  label={item?.name}
                  lineHeight={15 * 1.4}
                  fontFamily={fonts.medium}
                />
                <View style={styles.row}>
                  <Icons name={"sync"} family={"Ionicons"} size={18} />
                  <CustomText
                    label={"Best Match"}
                    lineHeight={14 * 1.4}
                    color={COLORS.subtitle}
                  />
                </View>
                <View style={styles.row}>
                  {item?.discount ? (
                    <CustomText
                      lineHeight={14 * 1.4}
                      color={COLORS.green1}
                      fontFamily={fonts.medium}
                      label={"US$" + discountPrice(item?.price, item?.discount)}
                    />
                  ) : (
                    <CustomText
                      color={COLORS.black}
                      lineHeight={14 * 1.4}
                      fontFamily={fonts.medium}
                      label={"US$" + item?.price}
                    />
                  )}
                  {item?.discount && (
                    <CustomText
                      lineHeight={14 * 1.4}
                      fontFamily={fonts.medium}
                      label={"US$" + item?.price}
                      textDecorationLine={"line-through"}
                    />
                  )}
                </View>
              </View>
              <View style={styles.quantityBox}>
                <TouchableOpacity>
                  <Icons
                    size={22}
                    name={"delete-outline"}
                    family={"MaterialIcons"}
                  />
                </TouchableOpacity>
                <CustomText
                  label={1}
                  fontSize={15}
                  lineHeight={15 * 1.4}
                  fontFamily={fonts.medium}
                />
                <TouchableOpacity>
                  <Icons size={22} name={"plus"} family={"Feather"} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <CustomButton
        width="35%"
        height={40}
        fontSize={14}
        marginTop={15}
        marginRight={20}
        title={"Add Items"}
        alignSelf="flex-end"
        icon={PNGIcons.plus}
        color={COLORS.black}
        backgroundColor={COLORS.lightGray}
      />
      <Divider thickness={5} marginTop={17} />
    </ScreenWrapper>
  );
};

export default OrderCart;

const styles = StyleSheet.create({
  topRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: "8%",
    paddingHorizontal: 25,
  },
  img: {
    width: 90,
    height: 90,
    marginRight: 15,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    columnGap: 5,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3ff",
    paddingBottom: 11,
    marginBottom: 11,
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    width: 100,
    height: 40,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 30,
    paddingVertical: 5,
    marginLeft: 2,
  },
});

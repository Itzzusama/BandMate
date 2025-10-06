import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";
import { Images } from "../../../../assets/images";
import ImageFast from "../../../../components/ImageFast";
import CustomButton from "../../../../components/CustomButton";
import AuthFooter from "../../../../components/Auth/AuthFooter";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const deliveries = [
  {
    id: 1,
    title: "Small",
    desc: "Weight ranging 1kg to 50kg",
    price: 15,
    image: Images.package,
  },
  {
    id: 2,
    title: "Medium",
    desc: "Weight ranging 50kg to 250kg",
    price: 25,
    image: Images.package,
  },
  {
    id: 3,
    title: "Large",
    desc: "Weight ranging 500kg to 1T",
    price: 45,
    image: Images.package,
  },
  {
    id: 4,
    title: "X-Large",
    desc: "Weight above 1T to 3T",
    price: 45,
    image: Images.package,
  },
  {
    id: 5,
    title: "XX-Large",
    desc: "Weight above 3T",
    price: 45,
    image: Images.package,
  },
];

const WeightModal = ({ isVisible, onClose, onCardPress }) => {
    const [selectedSize, setSelectedSize] = useState(null)
    const navigation = useNavigation()

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        setSelectedSize(item?.id)
        onCardPress?.(item)
      }}
      style={styles.card}
    >
      <View style={styles.cardLeft}>
        <View style={styles.leftIcon}>
          <ImageFast
            source={Images.electric}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.cardContent}>
          <CustomText
            label={item.title}
            color={COLORS.black}
            fontSize={16}
            fontFamily={fonts.medium}
          />
          <CustomText
            label={item.desc}
            color={COLORS.subtitle}
            fontSize={12}
            fontFamily={fonts.medium}
          />
          <CustomText
            label={`From $${item.price}`}
            color={COLORS.black}
            fontSize={12}
            fontFamily={fonts.medium}
          />
        </View>
      </View>

      <View
        style={{
          width: 24,
          height: 24,
          backgroundColor: selectedSize === item.id  ? COLORS.blue : COLORS.white,
          borderWidth: 2,
          borderRadius: 100,
          borderColor: "#1212127A",
        }}
      />
    </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        <CustomText
          label={"Estimated Weight (Kg)"}
          color={COLORS.black}
          fontSize={24}
          fontFamily={fonts.semiBold}
        />
        <CustomText
          label={
            "There are some guidelines to follow to start generating revenues with your vehicle through rental, and they are stated here below"
          }
          color={COLORS.gray5}
          fontSize={14}
          fontFamily={fonts.medium}
          marginTop={16}
          marginBottom={24}
        />
        <CustomText
          label={"STANDARD OPTIONS:"}
          color={COLORS.gray5}
          fontSize={14}
          fontFamily={fonts.medium}
          marginBottom={16}
        />
        <FlatList
          data={deliveries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <AuthFooter
          title={
            "The easiest and most affordable way to reach your destination."
          }
          isMain
          onPress={() => navigation.navigate("RequestDetail")}
        />
      </View>
  );
};

export default WeightModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    maxHeight: height * 0.9,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: COLORS.inputBg,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "transparent",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  leftIcon: {
    backgroundColor: COLORS.lowPurple,
    borderRadius: 12,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconBG: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.inputBg,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});

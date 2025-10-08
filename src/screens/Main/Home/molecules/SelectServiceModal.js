import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  View,
} from "react-native";

import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import Icons from "../../../../components/Icons";

import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const { height } = Dimensions.get("window");

const deliveries = [
  {
    id: 1,
    title: "Package Delivery",
    desc: "Recommended for small items such as documents, small packages, drugs, etc.",
    price: 15,
    image: Images.package,
  },
  {
    id: 2,
    title: "Shipment Delivery",
    desc: "Recommended for heavy items such as vehicles, cargo, houses, etc.",
    price: 25,
    image: Images.package,
  },
  {
    id: 3,
    title: "Moving-Out",
    desc: "When you need to move out to get your next place, find the best pros available in your area",
    price: 45,
    image: Images.package,
  },
];

const SelectServiceModal = ({ isVisible, onClose, onCardPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onCardPress}
      style={styles.card}
    >
      <View style={styles.top}>
        <View style={styles.leftIcon}>
          <ImageFast
            source={item.image}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <CustomText
          label={item.title}
          color={COLORS.black}
          fontSize={16}
          fontFamily={fonts.medium}
          marginLeft={12}
        />
      </View>

      <View style={styles.bottom}>
        <CustomText
          label={item.desc}
          color={COLORS.subtitle}
          fontSize={14}
          fontFamily={fonts.medium}
          style={{ flex: 1, paddingRight: 10 }}
        />
        <Icons
          name={"chevron-right"}
          family={"Feather"}
          size={24}
          color={COLORS.subtitle}
        />
      </View>

      <CustomText
        label={`From $${item.price}`}
        color={COLORS.black}
        fontSize={16}
        fontFamily={fonts.medium}
        marginTop={12}
      />
    </TouchableOpacity>
  );

  return (
    <CustomModal isChange isVisible={isVisible} onDisable={onClose}>
      <View style={styles.container}>
        <CustomText
          label="Select a Service"
          color={COLORS.black}
          fontSize={24}
          fontFamily={fonts.semiBold}
          marginBottom={24}
        />
        <FlatList
          data={deliveries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </CustomModal>
  );
};

export default SelectServiceModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 24,
    maxHeight: height * 0.9,
  },
  card: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.inputBg,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  leftIcon: {
    backgroundColor: COLORS.lowPurple,
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  icon: {
    width: 20,
    height: 20,
  },
});

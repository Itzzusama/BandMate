import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";
import {
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  View,
} from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import ImageFast from "../../../components/ImageFast";
import { PNGIcons } from "../../../assets/images/icons";

const { height } = Dimensions.get("window");

const Shipping = () => {
  const navigation = useNavigation();
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.card}
      onPress={() => navigation.navigate("EstimatedWeight")}
    >
      <View style={{ width: "95%" }}>
        <View style={styles.top}>
          <View style={styles.leftIcon}>
            <Image
              source={item.image}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <CustomText
            label={item.title}
            color={COLORS.black}
            fontSize={16}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
            marginLeft={12}
          />
        </View>
        <CustomText
          label={item.desc}
          color="#121212A3"
          lineHeight={14 * 1.4}
          fontFamily={fonts.medium}
          numberOfLines={2}
        />

        <CustomText
          label={`From $${item.price}`}
          lineHeight={14 * 1.4}
          fontFamily={fonts.medium}
        />
      </View>
      <Icons
        name="chevron-right"
        family="Feather"
        size={24}
        color={COLORS.subtitle}
      />
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper paddingHorizontal={0.1} translucent>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
      <View style={styles.overlay} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 20,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CustomText
                label="Select a Service"
                color={COLORS.black}
                fontSize={24}
                lineHeight={24 * 1.4}
                fontFamily={fonts.semiBold}
              />

              <ImageFast
                source={PNGIcons.crossBg}
                style={{ height: 20, width: 20 }}
                onPress={() => navigation.goBack()}
              />
            </View>
            <FlatList
              data={deliveries}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Shipping;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#121212A3",
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    height: height / 2 + 100,
    width: "100%",
    bottom: 0,
    position: "absolute",
  },
  mainContainer: {
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#1212120A",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    height: 121,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftIcon: {
    backgroundColor: "#4347FF29",
    borderRadius: 100,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#4347FF",
  },
});

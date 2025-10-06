import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { PNGIcons } from "../../../assets/images/icons";
import Icons from "../../../components/Icons";
import CustomButton from "../../../components/CustomButton";
import { post } from "../../../services/ApiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShippingSize = () => {
  const navigation = useNavigation();
  const [selectedSize, setSelectedSize] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deliveries = [
    {
      id: 1,
      title: "Small",
      desc: "Weight ranging 1kg to 50kg",
    },
    {
      id: 2,
      title: "Medium",
      desc: "Weight ranging 50kg to 250kg",
    },
    {
      id: 3,
      title: "Large",
      desc: "Weight ranging 500kg to 1T",
    },
    {
      id: 4,
      title: "X-Large",
      desc: "Weight above 1T to 3T",
    },
    {
      id: 5,
      title: "XX-Large",
      desc: "Weight above 3T",
    },
  ];
  const handleConfirm = async () => {
    const socketId = await AsyncStorage.getItem("socketId");
    const body = {
      startAddress: {
        lat: 37.421998333333335,
        long: -122.084,
        address:
          "Google Building 40, 1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
      },
      endAddress: {
        lat: 37.4550078,
        long: -122.1107903,
        address: "Palo Alto Airport",
      },
      steps: {},
      adults: 1,
      children: 1,
      infants: 1,
      pets: 1,
      round: false,
      returndate: null,
      socketId: socketId,
    };
    try {
      setIsLoading(true);
      const res = await post(`orders/temp-order`, body);
      if (res?.data) {
        navigation.navigate("MapSteps", {
          isShipping: true,
          tripData: { ...body, orderId: res?.data?.data?.orderId },
        });
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.card}
      onPress={() => {
        if (selectedSize?.includes(item.id)) {
          setSelectedSize(selectedSize?.filter((id) => id !== item.id));
        } else {
          setSelectedSize([...selectedSize, item.id]);
        }
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={PNGIcons.energyIcon}
          style={styles.icon}
          resizeMode="contain"
        />
        <View>
          <CustomText
            label={item.title}
            lineHeight={16 * 1.4}
            fontSize={16}
            fontFamily={fonts.medium}
            numberOfLines={1}
          />
          <CustomText
            label={item.desc}
            color="#1212127A"
            lineHeight={12 * 1.4}
            fontSize={12}
            fontFamily={fonts.medium}
            numberOfLines={1}
          />

          <CustomText
            label="From $15"
            lineHeight={12 * 1.4}
            fontSize={12}
            fontFamily={fonts.medium}
          />
        </View>
      </View>

      <Icons
        family="MaterialCommunityIcons"
        name={
          selectedSize?.includes(item.id) ? "radiobox-marked" : "radiobox-blank"
        }
        size={24}
        color={
          selectedSize?.includes(item.id) ? COLORS.darkPurple : COLORS.gray2
        }
      />
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper
      scrollEnabled
      footerUnScrollable={() => (
        <View style={{ margin: 12 }}>
          <CustomButton
            title="Continue"
            onPress={handleConfirm}
            loading={isLoading}
          />
        </View>
      )}
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <Header title="Shipping Size" textColor={COLORS.black} onHelpPress />
      )}
    >
      <Divider thickness={4} marginTop={0.1} />
      <View style={styles.mainContainer}>
        <CustomText
          label="All Sizes Options"
          color={COLORS.black}
          fontSize={18}
          marginBottom={20}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
        />
        <FlatList
          data={deliveries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ShippingSize;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 12,
  },
  card: {
    borderWidth: 1,
    borderColor: "#1212120A",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 48,
    height: 48,
    tintColor: "#4347FF",
    borderRadius: 12,
    marginRight: 12,
  },
});

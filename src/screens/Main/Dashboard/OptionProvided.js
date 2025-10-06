import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import DashboardModal from "./Modals/DashboardModal";
import { get } from "../../../services/ApiRequest";

const OptionProvided = ({ route }) => {
  const navigation = useNavigation();
  const isFocus = useIsFocused();

  const item = route.params?.item;

  const [currentVehicle, setCurrentVehicle] = useState({});
  const [loading, setLoading] = useState(false);

  const getVehicleDetail = async () => {
    setLoading(true);
    try {
      const res = await get(`vehicles/${item?._id}`);
      setCurrentVehicle(res.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVehicleDetail();
  }, [isFocus]);

  const tabs = [
    {
      id: 1,
      name: "My Availabilites",
      img: Images.key,
      onPress: () => navigation.navigate("MyAvailibility"),
    },
    {
      id: 2,
      name: "Cancellation policy",
      img: Images.car,
      onPress: () => navigation.navigate("CancellationPolicy"),
    },
    {
      id: 3,
      name: "Booking Options",
      img: Images.burger,
      onPress: () => navigation.navigate("BookingOption", { currentVehicle }),
    },
  ];

  return (
    <ScreenWrapper
      paddingBottom={12}
      scrollEnabled
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getVehicleDetail} />
      }
      headerUnScrollable={() => <Header title={"Options Provided"} />}
    >
      {tabs.map((tab, i) => (
        <TouchableOpacity
          onPress={tab?.onPress}
          key={i}
          activeOpacity={0.6}
          style={[styles.card, { marginTop: i == 0 && 20 }]}
        >
          <View style={styles.icon}>
            <ImageFast
              source={tab.img}
              style={{ height: 20, width: 20 }}
              resizeMode={"contain"}
            />
          </View>

          <View style={styles.textContainer}>
            <CustomText
              label={tab?.name}
              fontSize={16}
              fontFamily={fonts.medium}
              color={COLORS.black}
            />
          </View>

          <View style={styles.icon}>
            <Icons
              name="chevron-right"
              family="Entypo"
              size={20}
              color={COLORS.gray}
            />
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.border} />

      {/* Delete Vehicle */}
      <DashboardModal
        // isVisible
        title={"Plug Type CHAdeMO"}
        subtitle={
          "At this point all your data will be removed and you on’t be able to later recover your information."
        }
        btnOneTitle={"Yes, delete vehicle"}
        btnTwoTitle={"Cancel"}
      />
    </ScreenWrapper>
  );
};

export default OptionProvided;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  icon: {
    backgroundColor: COLORS.lightGray,
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  rightIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 20,
  },
});

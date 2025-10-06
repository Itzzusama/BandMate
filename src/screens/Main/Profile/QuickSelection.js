import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";

import { get } from "../../../services/ApiRequest";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const QuickSelection = ({ navigation }) => {
  const [Addresses, setAddresses] = useState([]);

  const [refreshing, setRefreshing] = useState(true);
  const tabs = [
    {
      id: 1,
      name: "Home",
    },
    {
      id: 2,
      name: "Work",
    },
    {
      id: 3,
      name: "Airport",
    },
    {
      id: 4,
      name: "Gym",
    },
    {
      id: 5,
      name: "School",
    },
    {
      id: 6,
      name: "Doctor",
    },
  ];

  const getAddress = async () => {
    try {
      const res = await get(`map-searches?page=1&limit=10`);
      setAddresses(res?.data?.data);
      setRefreshing(false);
    } catch (error) {}
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <ScreenWrapper
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getAddress} />
      }
      scrollEnabled
      headerUnScrollable={() => (
        <Header title={"Quick Selection"} textColor={COLORS.black} />
      )}
    >
      <View style={styles.bg}>
        {tabs.map((tab, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.9}
            style={[
              styles.card,
              i === tabs.length - 1
                ? {}
                : { borderBottomWidth: 1, borderBottomColor: COLORS.inputBg },
            ]}
          >
            <View style={styles.icon}>
              <Icons
                name="id-card-o"
                family="FontAwesome"
                size={20}
                color={COLORS.blue}
              />
            </View>

            <View style={styles.textContainer}>
              <CustomText
                label={tab?.name}
                fontSize={18}
                fontFamily={fonts.medium}
                lineHeight={20}
                color={COLORS.black}
              />
            </View>

            <View style={styles.rightIcon}>
              <Icons
                name="chevron-right"
                family="Entypo"
                size={24}
                color={COLORS.gray}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <CustomText
        label={"Custom Selections"}
        fontSize={18}
        fontFamily={fonts.medium}
        marginTop={20}
        lineHeight={1.4 * 18}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("PicLocation", { isCustom: true })}
        activeOpacity={0.9}
        style={styles.bg2}
      >
        <Icons name="plus" family="AntDesign" size={14} color={COLORS.white} />
        <CustomText
          label="Add a custom selection"
          fontSize={14}
          lineHeight={14 * 1.4}
          fontFamily={fonts.medium}
          color={COLORS.white}
        />
      </TouchableOpacity>

      <View style={styles.bg}>
        {Addresses.map((tab, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.9}
            style={[
              styles.card,
              i === tabs.length - 1
                ? {}
                : { borderBottomWidth: 1, borderBottomColor: COLORS.inputBg },
            ]}
          >
            <View style={styles.icon}>
              <ImageFast
                source={Images.QuickLocation}
                style={{ width: 16, height: 16 }}
                resizeMode={"contain"}
              />
            </View>

            <View style={styles.textContainer}>
              <CustomText
                label={tab?.data?.city || "No Address"}
                fontSize={18}
                fontFamily={fonts.medium}
                lineHeight={18*1.4}
                color={COLORS.black}
              />
            </View>

            <View style={styles.rightIcon}>
              <Icons
                name="chevron-right"
                family="Entypo"
                size={24}
                color={COLORS.gray}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default QuickSelection;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.inputBg,
    borderRadius: 12,
    marginTop: 16,
  },
  bg2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4347FF",
    gap: 6,
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  img: {
    width: 50,
    height: 50,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  icon: {
    backgroundColor: COLORS.low,
    padding: 8,
    width: 32,
    height: 32,
    borderRadius: 50,
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
});

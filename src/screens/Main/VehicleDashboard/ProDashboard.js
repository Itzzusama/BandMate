import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  View,
} from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import TopTab from "../../../components/TopTab";
import Header from "../../../components/Header";

import VehicleBottomStats from "./molecules/VehicleBottomStats";
import FeatureSliderCard from "./molecules/FeatureSliderCard";
import WeatherCard from "./molecules/WeatherCard";
import VTCModal from "../Dashboard/Modals/VTCModal";

import { PNGIcons } from "../../../assets/images/icons";
import { get } from "../../../services/ApiRequest";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { useSelector } from "react-redux";
import Icons from "../../../components/Icons";
import ClimateBox from "./molecules/ClimateBox";
import DashboardProductCard from "./molecules/DashboardProductCard";
import ApplicationSubmitCard from "./molecules/ApplicationSubmitCard";

const screenWidth = Dimensions.get("window").width;

const ProDashboard = () => {
  const { userData } = useSelector((state) => state.users);

  const isFocus = useIsFocused();
  const [tab, setTab] = useState(0);

  const modals = [
    { title: "Enable VTC", key: "vtc" },
    { title: "Enable Shipping", key: "shipping" },
    { title: "Enable Deliveries", key: "delivery" },
    { title: "Enable Parking Rental", key: "parking" },
    { title: "Enable Vehicle Rental", key: "rental" },
    { title: "Enable Vehicle Selling", key: "selling" },
  ];

  const [modalStep, setModalStep] = useState(-1);
  const [myFleets, setMyFleets] = useState([]);

  const handleTabChange = (index) => {
    setTab(index);
    setModalStep(index);
  };
  const handleNext = () => {
    if (modalStep < modals.length - 1) {
      setModalStep(modalStep + 1);
    } else {
      setModalStep(-1);
    }
  };

  const getMyFleets = async () => {
    try {
      const response = await get(`vehicles?userId=${userData?._id}`);
      setMyFleets(response.data?.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getMyFleets();
  }, [isFocus]);

  const vehicle = [
    {
      title: "Ground",
      percentage: 37,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Sea",
      percentage: 27,
    },
    {
      title: "Air",
      percentage: 17,
    },
  ];

  const Gender = [
    {
      title: "Men",
      percentage: 37,
    },
    {
      title: "Women",
      percentage: 27,
    },
    {
      title: "Not Specified",
      percentage: 17,
    },
  ];

  const Ages = [
    {
      title: "Generation Alpha",
      percentage: 37,
      additional: "15-17",
    },
    {
      title: "Generation Z",
      percentage: 27,
      additional: "18-24",
    },
    {
      title: "Millennials (Generation Y)",
      percentage: 17,
      additional: "25-44",
    },
    {
      title: "Generation X",
      percentage: 7,
      additional: "45-64",
    },
    {
      title: "Baby Boomers",
      percentage: 7,
      additional: "65+",
    },
  ];

  const greenData = [
    { image: Images.saveMoney },
    { image: Images.saveMoney },
    { image: Images.saveMoney },
    { image: Images.saveMoney },
 
  ];
  const academyData = [
    { image: Images.increaseYour },
    { image: Images.betterFor },
  ];

  const climateData = [
    {
      label: "Co2 emmited",
      value: 2907,
      growth: "+27%",
      sub: "Last 7 days",
    },
    {
      label: "Co2 SAVED",
      value: 2903,
      growth: "+27%",
      sub: "Last 7 days",
    },
    {
      label: "TOTAL IMPACT",
      value: 2307,
      growth: "+27%",
      sub: "Last 7 days",
    },
    {
      label: "TOTAL IMPACT",
      value: 1407,
      growth: "+27%",
      sub: "Last 7 days",
    },
  ];

  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={0.1}
      paddingBottom={0.1}
      headerUnScrollable={() => <Header title={"Pro Dashboard"} />}
    >
      <View style={{ paddingHorizontal: 12, marginBottom: 8 }}>
        <TopTab
          rounded
          tabNames={[
            "Trips",
            "Shippings",
            "Deliveries",
            "Rental",
            "Parkings",
            "Tours",
          ]}
          paddingHorizontal={14}
          tab={tab}
          setTab={handleTabChange}
        />
      </View>

      {/* Weather Card */}

      <View
        style={{
          backgroundColor: "#C4C4C4",
          flex: 1,
          padding: 8,
        }}
      >
        <ApplicationSubmitCard />
        <WeatherCard />

        <VehicleBottomStats addVehicle vehicleData={myFleets} />

        <View style={styles.box}>
          <CustomText
            label={"My Activity"}
            lineHeight={14 * 1.4}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
          />
          <View style={[styles.row, { marginBottom: 10 }]}>
            <CustomText
              fontSize={18}
              lineHeight={18 * 1.4}
              fontFamily={fonts.medium}
              label={"Preferred Working"}
            />
            <CustomText
              fontSize={18}
              label={"Hours"}
              lineHeight={18 * 1.4}
              color={COLORS.subtitle}
              fontFamily={fonts.medium}
            />
          </View>

          <BarChart
            data={{
              labels: ["2", "4", "6", "8", "10", "12"],
              datasets: [{ data: [8, 12, 10, 15, 20, 14] }],
            }}
            height={180}
            width={screenWidth - 40}
            fromZero
            yAxisLabel=""
            chartConfig={{
              backgroundColor: COLORS.lightGray,
              backgroundGradientFrom: COLORS.lightGray,
              backgroundGradientTo: COLORS.lightGray,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(75, 123, 236, ${opacity})`,
              labelColor: () => COLORS.darkPurple,
            }}
            withInnerLines={false}
            style={{ borderRadius: 12 }}
          />
        </View>
        <View style={styles.box}>
          <CustomText
            label={"CUSTOMERS"}
            lineHeight={14 * 1.4}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
          />
          <View style={[styles.row, { marginBottom: 10 }]}>
            <CustomText
              fontSize={18}
              label={"Preferreds"}
              lineHeight={18 * 1.4}
              fontFamily={fonts.medium}
            />
            <CustomText
              fontSize={18}
              label={"Hours"}
              lineHeight={18 * 1.4}
              color={COLORS.subtitle}
              fontFamily={fonts.medium}
            />
          </View>

          <BarChart
            data={{
              labels: ["2", "4", "6", "8", "10", "12"],
              datasets: [{ data: [8, 12, 10, 15, 20, 14] }],
            }}
            height={180}
            width={screenWidth - 40}
            fromZero
            yAxisLabel=""
            chartConfig={{
              backgroundColor: COLORS.lightGray,
              backgroundGradientFrom: COLORS.lightGray,
              backgroundGradientTo: COLORS.lightGray,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(75, 123, 236, ${opacity})`,
              labelColor: () => COLORS.darkPurple,
            }}
            withInnerLines={false}
            style={{ borderRadius: 12, marginLeft: 0 }}
          />
        </View>

        <View style={styles.box}>
          <View style={styles.row}>
            <Image source={PNGIcons.green} style={{ height: 18, width: 18 }} />
            <CustomText
              fontSize={18}
              lineHeight={18 * 1.4}
              fontFamily={fonts.medium}
              label={"How You benefit from Green"}
            />
          </View>

          <FlatList
            numColumns={2}
            data={greenData}
            columnWrapperStyle={{ justifyContent: "center" }}
            renderItem={({ item }) => (
              <ImageFast
                source={item.image}
                style={styles.greenImg}
                resizeMode={"contain"}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.box}>
          <View style={styles.row}>
            <Icons
              size={20}
              name={"globe"}
              color={COLORS.green1}
              family={"FontAwesome"}
            />
            <CustomText
              fontSize={18}
              lineHeight={18 * 1.4}
              label={"Climate Impact"}
              fontFamily={fonts.medium}
            />
          </View>

          <FlatList
            numColumns={2}
            data={climateData}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            contentContainerStyle={{ paddingTop: 10 }}
            renderItem={({ item }) => <ClimateBox stat={item} />}
            keyExtractor={(item) => item.label}
            scrollEnabled={false}
          />
        </View>
        <FeatureSliderCard title={"Most Profitable Services"} />

        <FeatureSliderCard
          data={vehicle}
          title={"Most Profitable Vehicle Types"}
        />
        <FeatureSliderCard
          data={Ages}
          fontSize={12}
          title={"Customers’ Ages"}
          fontFamily={fonts.regular}
        />
        <FeatureSliderCard data={Gender} title={"Gender"} />
        <FeatureSliderCard title={"Carbon Emission Overview"} />

        <View style={styles.box}>
          <View style={styles.row1}>
            <CustomText
              fontSize={18}
              label={"Shop"}
              lineHeight={18 * 1.4}
              fontFamily={fonts.medium}
            />
            <View style={styles.row}>
              <CustomText
                fontSize={12}
                label={"See more"}
                lineHeight={12 * 1.4}
                color={COLORS.subtitle}
                fontFamily={fonts.semiBold}
              />
              <TouchableOpacity style={styles.icon}>
                <Icons
                  family={"Feather"}
                  name={"chevron-right"}
                  color={COLORS.darkPurple}
                />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            horizontal
            contentContainerStyle={{ paddingTop: 10 }}
            showsHorizontalScrollIndicator={false}
            data={[1, 2, 3]}
            renderItem={() => <DashboardProductCard />}
            keyExtractor={(item) => item.toString()}
          />
        </View>

        <View style={styles.box}>
          <View style={styles.row}>
            <Icons size={18} name={"globe-sharp"} />
            <CustomText
              fontSize={18}
              label={"Socials"}
              lineHeight={18 * 1.4}
              fontFamily={fonts.medium}
            />
          </View>
          <FlatList
            numColumns={2}
            data={greenData}
            contentContainerStyle={{ paddingTop: 5 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <ImageFast source={item.image} style={styles.greenImg} />
            )}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.box}>
          <View style={styles.row}>
            <Icons size={18} name={"school"} family={"IonIcons"} />
            <CustomText
              fontSize={18}
              label={"Academy"}
              lineHeight={18 * 1.4}
              fontFamily={fonts.medium}
            />
          </View>
          <FlatList
            numColumns={2}
            data={academyData}
            contentContainerStyle={{ paddingTop: 5 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <ImageFast source={item.image} style={styles.greenImg} />
            )}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.box}>
          <View style={styles.row}>
            <Icons size={18} name={"trending-up"} family={"Feather"} />
            <CustomText
              fontSize={18}
              lineHeight={18 * 1.4}
              fontFamily={fonts.medium}
              label={"Grow Your Business"}
            />
          </View>
          <FlatList
            numColumns={2}
            data={greenData}
            contentContainerStyle={{ paddingTop: 5 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <ImageFast source={item.image} style={styles.greenImg} />
            )}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>

        {modals.map((modal, index) => (
          <VTCModal
            key={modal.key}
            title={modal.title}
            isVisible={modalStep == index}
            onDisable={() => setModalStep(-1)}
            onPress={handleNext}
          />
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default ProDashboard;

const styles = StyleSheet.create({
  box: {
    borderRadius: 18,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greenImg: {
    height: 115,
    width: "48%",
    marginTop:10,
    // marginRight: 6,
    // borderRadius: 8,
    // backgroundColor:"red"
  },
  icon: {
    width: 18,
    height: 18,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
  },
});

import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from "react-native";

import CustomText from "./CustomText";

import AuthFooter from "./Auth/AuthFooter";
import TopTabWithBG from "./TopTabWithBG";
import TripCard from "./TripCard";

import { setSelectedVehicle } from "../store/reducer/usersSlice";
import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import fonts from "../assets/fonts";

const TripVehicleSelection = ({
  vehicles,
  totalDistance,
  tripTotalDuration,
  tripData,
  isLoading,
  isShipping,
  overAllDistance,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [Tab, setTab] = useState("ground");
  const [iconTab, setIconTab] = useState("");
  const [isSelected, setIsSelected] = useState({});

  const iconTabImages = {
    dollar: Images.DollerAmount,
    start: Images.blackStar,
    key: Images.Key,
    rider: Images.NewRider,
    disabled: Images.Disabled,
    pet: Images.Pet,
  };

  const getIconSource = (tabName) => {
    if (iconTab === tabName) {
      switch (tabName) {
        case "start":
          return Images.StartWhite;
        case "rider":
          return Images.NewWhite;
        case "dollar":
          return Images.DollerWhite;
        case "key":
          return Images.KeyWhite;
        case "disabled":
          return Images.DisabledWhite;
        default:
          return iconTabImages[tabName];
      }
    }
    return iconTabImages[tabName];
  };

  const handleTabChange = (selectedTab) => {
    setTab(selectedTab);
  };

  return (
    <View style={styles.content}>
      <View style={{ paddingHorizontal: 10 }}>
        <TopTabWithBG
          tab={Tab}
          tabNames={["ground", "sea", "air"]}
          setTab={handleTabChange}
          isImage
          imageWidth={20}
          imgeHeight={20}
          marginVertical={0.1}
          tabImages={{
            ground: Images.CarWhite,
            sea: Images.ShipGray,
            air: Images.PlaneGrey,
          }}
        />
      </View>

      <View style={styles.contentContain}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.iconTabContainer}>
            {Object.keys(iconTabImages).map((tabName, i) => (
              <TouchableOpacity
                key={tabName}
                onPress={() => setIconTab(tabName)}
                style={[
                  styles.iconTabItem,
                  {
                    width:
                      Object.keys(iconTabImages)?.length - 1 == i ? 44 : 57,
                    backgroundColor:
                      iconTab === tabName && i == 4
                        ? "#4347FF"
                        : iconTab === tabName && i == 5
                        ? "#FEC887"
                        : iconTab === tabName
                        ? COLORS.black
                        : "#1212120A",
                  },
                ]}
              >
                <Image
                  source={getIconSource(tabName)}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                    tintColor:
                      i == 5
                        ? COLORS.black
                        : (iconTab === tabName && i == 4) || iconTab === tabName
                        ? COLORS.white
                        : COLORS.black,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Image
          source={Images.FilterBlack}
          style={{
            width: 30,
            height: 30,
            marginRight: 5,
            resizeMode: "contain",
          }}
        />
      </View>

      {/* <CustomText
        label="Motorbikes"
        color={COLORS.black}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={24}
        marginLeft={10}
      />
      <View style={[styles.rowItem, { gap: 3, marginBottom: 12 }]}>
        <CustomText
          label="Standard"
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
          fontSize={16}
          lineHeight={16 * 1.4}
        />
        <Image
          source={Images.blackUser}
          resizeMode="contain"
          style={styles.userIcon}
        />
        <CustomText
          label="2-4"
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
          fontSize={16}
          lineHeight={16 * 1.4}
        />
      </View>
      <FlatList
        data={vehicles}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEnabled={true}
        nestedScrollEnabled={true}
        renderItem={({ item, index }) => (
          <TripCard
            isSelected={isSelected?.id === item.id}
            onPress={() => (setIsSelected(item))}
            marginLeft={index === 0 ? 10 : 8}
            item={item}
          />
        )}
      /> */}
      {isLoading ? (
        <View
          style={{
            height: 150,
            paddingTop: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={35} color={COLORS.black} />
        </View>
      ) : (
        <>
          <CustomText
            label="Cars"
            color={COLORS.black}
            fontFamily={fonts.semiBold}
            fontSize={24}
            lineHeight={24 * 1.4}
            marginTop={24}
            marginLeft={10}
          />
          <View style={[styles.rowItem, { gap: 3, marginBottom: 12 }]}>
            <CustomText
              label="Standard"
              color={COLORS.subtitle}
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={16 * 1.4}
            />
            <Image source={Images.blackUser} style={styles.userIcon} />
            <CustomText
              label={vehicles?.length}
              color={COLORS.subtitle}
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={16 * 1.4}
            />
          </View>

          <FlatList
            data={vehicles}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
            scrollEnabled={true}
            nestedScrollEnabled={true}
            renderItem={({ item, index }) => (
              <TripCard
                isSelected={isSelected?._id === item._id}
                onPress={() => setIsSelected(item)}
                marginLeft={index === 0 ? 10 : 8}
                item={item}
                totalDistance={overAllDistance}
                tripTotalDuration={tripTotalDuration}
              />
            )}
          />
        </>
      )}

      <View style={{ paddingHorizontal: 10, paddingBottom: 40 }}>
        <AuthFooter
          isMain={true}
          titleSize={10}
          title="The easiest and most affordable way to reach your destination."
          btnTitle="Confirm"
          onPress={() => {
            if (isShipping) {
              navigation.navigate("AwaitingDriverConfirmation", {
                isShipping,
                orderId: tripData?.orderId,
              });
              return;
            } else {
              dispatch(setSelectedVehicle(isSelected));
              navigation.navigate("PickupOptions", {
                tripData: tripData,
              });
            }
          }}
          marginTop={30}
          isCalender
        />
      </View>
    </View>
  );
};

export default TripVehicleSelection;

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  content: {
    paddingTop: 5,
    width: "100%",
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  contentContain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    width: "100%",
  },
  iconTabContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: 10,
  },
  iconTabItem: {
    height: 32,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  userIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
});

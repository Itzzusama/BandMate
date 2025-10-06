import { TouchableOpacity as DraggableTouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import MapView from "react-native-maps";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  View,
} from "react-native";

import CustomDatePicker from "../../components/CustomDatePicker";
import CalenderModal from "../../components/CalenderModal";
import ScreenWrapper from "../../components/ScreenWrapper";
import AuthFooter from "../../components/Auth/AuthFooter";
import GooglePlaces from "../../components/GooglePlaces";
import CustomSwitch from "../../components/CustomSwitch";
import CustomInput from "../../components/CustomInput";
import CustomText from "../../components/CustomText";
import Icons from "../../components/Icons";

import { calculateRoadDistanceAndTime } from "../../utils/LocationUtils";
import { get, post } from "../../services/ApiRequest";
import { PNGIcons } from "../../assets/images/icons";
import { COLORS } from "../../utils/COLORS";
import fonts from "../../assets/fonts";

const YourTripsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { title = "Your Trip" } = route?.params || {};
  const [isCalenderModalVisible, setIsCalenderModalVisible] = useState(false);
  const [geo_locations, setGeo_locations] = useState([
    { title: "Add", icon: PNGIcons.add },
  ]);
  const [date, setDate] = useState({});
  const [time, setTime] = useState(null);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tourists, setTourists] = useState({
    adult: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const isDisabledBtn = !Object.values(tourists).some((value) => value > 0);

  const [fromLocation, setFromLocation] = useState({
    address: "",
    latitude: null,
    longitude: null,
  });
  const [whereTo, setWhereTo] = useState({
    address: "",
    latitude: null,
    longitude: null,
  });
  const [dynamicInputs, setDynamicInputs] = useState([]);

  const handleIncrement = (type) => {
    setTourists((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleDecrement = (type) => {
    if (tourists[type] > 0) {
      setTourists((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
      }));
    }
  };

  const handleAddInput = () => {
    setDynamicInputs((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        value: {
          address: "",
          latitude: null,
          longitude: null,
        },
      },
    ]);
  };

  useEffect(() => {
    if (dynamicInputs.length === 0) {
      setDynamicInputs([
        {
          id: 1,
          value: {
            address: "",
            latitude: null,
            longitude: null,
          },
        },
      ]);
    }
  }, []);

  const handleConfirm = async () => {
    const socketId = await AsyncStorage.getItem("socketId");
    const validDynamicInputs = dynamicInputs.filter(
      (input) => input.value?.address && input.value.address.trim() !== ""
    );
    const dynamicInputsData = validDynamicInputs.map((input) => ({
      address: input.value.address,
      lat: input.value.latitude,
      long: input.value.longitude,
    }));
    const locationArray = [
      {
        address: fromLocation.address,
        lat: fromLocation.latitude,
        long: fromLocation.longitude,
      },
      ...dynamicInputsData,
      {
        address: whereTo.address,
        lat: whereTo.latitude,
        long: whereTo.longitude,
      },
    ];
    let totalDistance = [];
    let totalTime = [];
    if (dynamicInputsData?.length) {
      for (let i = 0; i < locationArray.length - 1; i++) {
        const currentLocation = locationArray[i];
        const nextLocation = locationArray[i + 1];
        if (
          currentLocation.lat &&
          currentLocation.long &&
          nextLocation.lat &&
          nextLocation.long &&
          !isNaN(currentLocation.lat) &&
          !isNaN(currentLocation.long) &&
          !isNaN(nextLocation.lat) &&
          !isNaN(nextLocation.long)
        ) {
          try {
            const result = await calculateRoadDistanceAndTime(
              {
                lat: parseFloat(currentLocation.lat),
                long: parseFloat(currentLocation.long),
              },
              {
                lat: parseFloat(nextLocation.lat),
                long: parseFloat(nextLocation.long),
              }
            );
            totalDistance.push(result?.distanceKm || 0);
            totalTime.push(result?.timeInMinutes || 0);
          } catch (error) {
            console.log(`Error calculating distance ${i} to ${i + 1}:`, error);
            totalDistance.push(0);
            totalTime.push(0);
          }
        } else {
          console.log(`Invalid coordinates for ${i} to ${i + 1}`);
          totalDistance.push(0);
          totalTime.push(0);
        }
      }
    } else {
      // Direct route when no dynamic inputs
      if (
        fromLocation.latitude &&
        fromLocation.longitude &&
        whereTo.latitude &&
        whereTo.longitude &&
        !isNaN(fromLocation.latitude) &&
        !isNaN(fromLocation.longitude) &&
        !isNaN(whereTo.latitude) &&
        !isNaN(whereTo.longitude)
      ) {
        try {
          const result = await calculateRoadDistanceAndTime(
            {
              latitude: parseFloat(fromLocation.latitude),
              longitude: parseFloat(fromLocation.longitude),
            },
            {
              latitude: parseFloat(whereTo.latitude),
              longitude: parseFloat(whereTo.longitude),
            }
          );
          totalDistance = [result?.distanceKm || 0];
          totalTime = [result?.timeInMinutes || 0];
        } catch (error) {
          console.log("Error calculating direct distance:", error);
          totalDistance = [0];
          totalTime = [0];
        }
      } else {
        console.log("Invalid coordinates for direct route");
        totalDistance = [0];
        totalTime = [0];
      }
    }
    const body = {
      startAddress: {
        lat: fromLocation.latitude,
        long: fromLocation.longitude,
        address: fromLocation.address,
      },
      endAddress: {
        lat: whereTo.latitude,
        long: whereTo.longitude,
        address: whereTo.address,
      },
      steps: dynamicInputsData || [],
      adults: tourists?.adult || 0,
      children: tourists?.children || 0,
      infants: tourists?.infants || 0,
      pets: tourists?.pets || 0,
      round: isRoundTrip,
      returndate: isRoundTrip ? date.endDate : null,
      totalDistance: totalDistance,
      totalTime: totalTime,
      socketId: socketId,
    };
    try {
      setIsLoading(true);
      console.log("=========body", body);
      const res = await post(`orders/temp-order`, body);
      if (res?.data) {
        navigation.navigate("MapSteps", {
          tripData: { ...body, orderId: res?.data?.data?.orderId },
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleBack = () => {
    navigation.goBack();
  };

  const touristSelectionData = [
    {
      icon: PNGIcons.adults,
      title: "Adults",
      disc: "Current adults",
      value: tourists.adult,
      onPlusPress: () => handleIncrement("adult"),
      onMinusPress: () => handleDecrement("adult"),
    },
    {
      icon: PNGIcons.children,
      title: "Children",
      disc: "Current children",
      text: "5-8 yrs old.",
      value: tourists.children,
      onPlusPress: () => handleIncrement("children"),
      onMinusPress: () => handleDecrement("children"),
    },
    {
      icon: PNGIcons.infants,
      title: "Infants",
      disc: "Current infants",
      text: "Under 5 years old",
      value: tourists.infants,
      onPlusPress: () => handleIncrement("infants"),
      onMinusPress: () => handleDecrement("infants"),
    },
    {
      icon: PNGIcons.pets,
      title: "Pets",
      disc: "Current Pets",
      value: tourists.pets,
      onPlusPress: () => handleIncrement("pets"),
      onMinusPress: () => handleDecrement("pets"),
    },
  ];

  const getAddress = async () => {
    try {
      const res = await get(`map-searches?page=1&limit=10`);
      const apiData = res?.data?.data?.map((item) => item?.data) || [];
      const allData = [...geo_locations, ...apiData];
      const seenTitles = new Set();
      const uniqueData = allData.filter((item) => {
        const title = item?.title?.toLowerCase();
        if (!title || seenTitles.has(title)) {
          return false;
        }
        seenTitles.add(title);
        return true;
      });
      setGeo_locations(uniqueData);
    } catch (error) {
      console.log("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <ScreenWrapper translucent paddingHorizontal={0.1}>
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
      <View style={styles.modalContainer}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          scrollEnabled
        >
          <View style={styles.header}>
            <CustomText
              label={title}
              color={COLORS.black}
              fontSize={22}
              lineHeight={22 * 1.4}
              fontFamily={fonts.semiBold}
            />
            <TouchableOpacity
              onPress={handleBack}
              style={{
                height: 32,
                width: 32,
                borderRadius: 99,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.lightGray,
              }}
            >
              <Image source={PNGIcons.cross} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <GooglePlaces
            showIcon
            withLabel="From"
            value={fromLocation.address}
            setValue={(text) =>
              setFromLocation((prev) => ({ ...prev, address: text }))
            }
            setLatLong={({ latitude, longitude }) =>
              setFromLocation((prev) => ({ ...prev, latitude, longitude }))
            }
            marginBottom={0.1}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.locationScrollContainer}
          >
            {geo_locations.map((location, index) => (
              <TouchableOpacity
                key={`from ${index}`}
                style={[
                  styles.locationItem,
                  fromLocation?.address === location?.title &&
                    styles.selectedLocationItem,
                ]}
                onPress={() => {
                  if (location?.title === "Add") {
                    navigation.navigate("QuickSelection");
                  } else {
                    setFromLocation({
                      address: location?.title,
                      latitude: location?.latitude,
                      longitude: location?.longitude,
                    });
                  }
                }}
              >
                {location?.title === "Add" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Icons
                      name="add"
                      family="Ionicons"
                      size={16}
                      color={
                        fromLocation?.address === location?.title
                          ? COLORS.white
                          : COLORS.black
                      }
                    />
                    <CustomText
                      label={location?.title}
                      color={
                        fromLocation?.address === location?.title
                          ? COLORS.white
                          : COLORS.black
                      }
                      fontSize={12}
                      lineHeight={12 * 1.4}
                      fontFamily={fonts.medium}
                    />
                  </View>
                ) : (
                  <CustomText
                    label={location?.title}
                    color={
                      fromLocation?.address === location?.title
                        ? COLORS.white
                        : COLORS.black
                    }
                    fontSize={14}
                    lineHeight={14 * 1.4}
                    fontFamily={fonts.medium}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.dotContainer}>
              {dynamicInputs?.map((_, i) => (
                <View key={i}>
                  <View
                    style={[
                      styles.circleIndicator,
                      { backgroundColor: COLORS.black },
                    ]}
                  >
                    <CustomText
                      label={i + 1}
                      color={COLORS.white}
                      fontSize={16}
                      lineHeight={16 * 1.4}
                      fontFamily={fonts.semiBold}
                    />
                  </View>
                  {i === dynamicInputs.length - 1 ? null : (
                    <View style={styles.line} />
                  )}
                </View>
              ))}
            </View>
            <View style={styles.contentContainer}>
              <DraggableFlatList
                data={dynamicInputs}
                onDragEnd={({ data }) => setDynamicInputs(data)}
                keyExtractor={(item) => item.id}
                renderItem={({ item, drag, getIndex, isActive }) => {
                  const index = getIndex();
                  return (
                    <DraggableTouchableOpacity
                      style={{ opacity: isActive ? 0.8 : 1 }}
                      onLongPress={drag}
                      delayLongPress={200}
                      activeOpacity={0.8}
                    >
                      <GooglePlaces
                        value={item.value?.address || ""}
                        setValue={(text) => {
                          setDynamicInputs((prev) =>
                            prev.map((input, inputIndex) =>
                              inputIndex === index
                                ? {
                                    ...input,
                                    value: { ...input.value, address: text },
                                  }
                                : input
                            )
                          );
                        }}
                        isClear={() => {
                          setDynamicInputs((prev) =>
                            prev.map((input, inputIndex) =>
                              inputIndex === index
                                ? { ...input, value: {} }
                                : input
                            )
                          );
                        }}
                        setLatLong={({ latitude, longitude }) =>
                          setDynamicInputs((prev) =>
                            prev.map((input, inputIndex) =>
                              inputIndex === index
                                ? {
                                    ...input,
                                    value: {
                                      ...input.value,
                                      latitude,
                                      longitude,
                                    },
                                  }
                                : input
                            )
                          )
                        }
                        isChange
                        disabled={isActive}
                      />
                    </DraggableTouchableOpacity>
                  );
                }}
              />
            </View>
          </View>

          <DraggableTouchableOpacity
            activeOpacity={0.6}
            onPress={handleAddInput}
            style={styles.addStepsContainer}
          >
            <View style={styles.circleIndicator}>
              <Icons
                family="Entypo"
                name="plus"
                size={16}
                color={COLORS.black}
              />
            </View>

            <CustomInput
              borderRadius={100}
              height={40}
              width="89%"
              placeholder="Add Steps"
              marginBottom={0.1}
              editable={false}
              borderColor={COLORS.inputBg}
            />
          </DraggableTouchableOpacity>

          <GooglePlaces
            withLabel="Where to"
            showIcon
            value={whereTo.address}
            setValue={(text) =>
              setWhereTo((prev) => ({ ...prev, address: text }))
            }
            setLatLong={({ latitude, longitude }) =>
              setWhereTo((prev) => ({ ...prev, latitude, longitude }))
            }
            marginBottom={0.1}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.locationScrollContainer,
              {
                borderBottomWidth: 0.7,
                borderBottomColor: "#1212120A",
                paddingBottom: 12,
                width: "100%",
              },
            ]}
          >
            {geo_locations.map((location, index) => (
              <TouchableOpacity
                key={`from ${index}`}
                style={[
                  styles.locationItem,
                  whereTo?.address === location?.title &&
                    styles.selectedLocationItem,
                ]}
                onPress={() => {
                  if (location?.title === "Add") {
                    navigation.navigate("QuickSelection");
                  } else {
                    setWhereTo({
                      address: location?.title,
                      latitude: location?.latitude,
                      longitude: location?.longitude,
                    });
                  }
                }}
              >
                {location?.title === "Add" ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Icons
                      name="add"
                      family="Ionicons"
                      size={16}
                      color={
                        whereTo?.address === location?.title
                          ? COLORS.white
                          : COLORS.black
                      }
                    />
                    <CustomText
                      label={location?.title}
                      color={
                        whereTo?.address === location?.title
                          ? COLORS.white
                          : COLORS.black
                      }
                      fontSize={12}
                      lineHeight={12 * 1.4}
                      fontFamily={fonts.medium}
                    />
                  </View>
                ) : (
                  <CustomText
                    label={location?.title}
                    color={
                      whereTo?.address === location?.title
                        ? COLORS.white
                        : COLORS.black
                    }
                    fontSize={14}
                    lineHeight={14 * 1.4}
                    fontFamily={fonts.medium}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          {touristSelectionData?.map((item, i) => (
            <View key={i} style={[styles.row, { marginBottom: 16 }]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={item.icon} style={styles.touristSelectionIcon} />
                <View>
                  <CustomText
                    label={item.title}
                    color={COLORS.black}
                    fontSize={16}
                    lineHeight={16 * 1.4}
                    fontFamily={fonts.medium}
                  />
                  <CustomText
                    label={item.disc}
                    color="#1212127A"
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    fontFamily={fonts.medium}
                  />
                  {item.text && (
                    <CustomText
                      label={item.text}
                      color="#1212127A"
                      fontSize={10}
                      lineHeight={10 * 1.4}
                      fontFamily={fonts.medium}
                    />
                  )}
                </View>
              </View>
              <View style={styles.touristSelectionContainer}>
                {item.value == 0 ? (
                  <View style={{ width: 32, height: 32 }} />
                ) : (
                  <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => item.onMinusPress()}
                  >
                    <Icons
                      name="minus"
                      family="Feather"
                      size={20}
                      color={COLORS.black}
                    />
                  </TouchableOpacity>
                )}
                <CustomText
                  label={item.value.toString()}
                  color={COLORS.black}
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.medium}
                />
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => item.onPlusPress()}
                >
                  <Icons
                    name="plus"
                    family="Feather"
                    size={20}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View
            style={[
              styles.row,
              {
                borderTopWidth: 1,
                borderTopColor: "#1212120A",
                paddingTop: 12,
                marginTop: -4,
              },
            ]}
          >
            <CustomText
              label="Round Trip?"
              color={COLORS.black}
              fontSize={16}
              fontFamily={fonts.medium}
            />
            <CustomSwitch value={isRoundTrip} setValue={setIsRoundTrip} />
          </View>
          {isRoundTrip ? (
            <View style={[styles.row, { marginTop: 12 }]}>
              <TouchableOpacity
                onPress={() => setIsCalenderModalVisible(true)}
                style={{ width: "58%" }}
              >
                <CustomInput
                  withLabel="When You Need it?"
                  width="100%"
                  value={
                    date?.startDate
                      ? `${date.startDate} - ${date.endDate}`
                      : null
                  }
                  editable={false}
                  placeholder="Select Date"
                  height={56}
                />
              </TouchableOpacity>
              <CustomDatePicker
                value={(() => {
                  if (!time) return new Date();
                  try {
                    const today = new Date();
                    const timeDate = new Date(`1970-01-01T${time}`);
                    if (isNaN(timeDate.getTime())) {
                      return new Date();
                    }
                    today.setHours(timeDate.getHours());
                    today.setMinutes(timeDate.getMinutes());
                    today.setSeconds(0);
                    today.setMilliseconds(0);
                    return today;
                  } catch {
                    return new Date();
                  }
                })()}
                setValue={(timeValue) => {
                  if (
                    timeValue &&
                    typeof timeValue.toLocaleTimeString === "function"
                  ) {
                    setTime(timeValue.toLocaleTimeString());
                  } else {
                    setTime(timeValue);
                  }
                }}
                withLabel="When Time?"
                placeholder="Select Time"
                type="time"
                width="40%"
                height={56}
              />
            </View>
          ) : null}

          <AuthFooter
            title="The easiest and most affordable way to reach your destination."
            isMain
            onPress={handleConfirm}
            onBackPress={handleBack}
            marginBottom={140}
            loading={isLoading}
            btnDisabled={
              !fromLocation?.address || !whereTo?.address || isDisabledBtn
            }
          />
        </ScrollView>
      </View>

      <CalenderModal
        isVisible={isCalenderModalVisible}
        onDisable={() => setIsCalenderModalVisible(false)}
        onConfirm={(data) => {
          if (data.startDate && data.endDate) {
            setDate({
              startDate: data.startDate.toLocaleDateString(),
              endDate: data.endDate.toLocaleDateString(),
            });
          }
        }}
      />
    </ScreenWrapper>
  );
};

export default YourTripsScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backButton: {
    padding: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#121212A3",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    top: 120,
  },
  container: {
    backgroundColor: "white",
    padding: 12,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    flexGrow: 1,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  buttons: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#1212120A",
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    marginTop: 24,
    borderRadius: 12,
    height: 48,
  },
  locationScrollContainer: {
    marginVertical: 8,
  },
  locationItem: {
    paddingHorizontal: 12,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#1212120A",
    borderRadius: 100,
    marginRight: 6,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedLocationItem: {
    backgroundColor: COLORS.black,
  },
  inputsContainer: {
    marginBottom: 16,
    gap: 16,
    position: "relative",
  },
  inputWithCircle: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  circleIndicator: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: "#1212120A",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  activeCircleIndicator: {
    backgroundColor: COLORS.black,
  },
  connectingLine: {
    position: "absolute",
    width: 2,
    height: 30,
    backgroundColor: "#12121229",
    left: 15,
    top: 60,
    zIndex: 1,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  icon: {
    height: 16,
    width: 16,
  },
  addStepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    width: "100%",
  },
  touristSelectionContainer: {
    width: "26%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  touristSelectionIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },

  dotContainer: {
    width: "11%",
    marginTop: 4,
  },
  contentContainer: {
    width: "89%",
  },
  line: {
    width: 1,
    height: 16,
    backgroundColor: "#12121229",
    marginVertical: 8,
    alignSelf: "center",
    marginRight: 10,
  },
});

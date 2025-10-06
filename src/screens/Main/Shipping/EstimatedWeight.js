import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";
import { useState } from "react";
import {
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  View,
  Platform,
} from "react-native";

import CustomModalGooglePlaces from "../../../components/CustomModalGooglePlaces";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";

import { PNGIcons } from "../../../assets/images/icons";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const { height } = Dimensions.get("window");

const EstimatedWeight = () => {
  const navigation = useNavigation();
  const [selectedSize, setSelectedSize] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationSelect = (locationData) => {
    setSelectedLocation(locationData.address);
    navigation.navigate("RequestDetail");
  };
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
            <CustomText
              label="Estimated Weight (kg)"
              color={COLORS.black}
              fontSize={24}
              marginBottom={10}
              lineHeight={24 * 1.4}
              fontFamily={fonts.semiBold}
            />
            <CustomText
              label="There are some guidelines to follow to start generating revenues with your vehicle through rental, and they are stated here below:"
              color="#1212127A"
              marginBottom={20}
              lineHeight={14 * 1.4}
              fontFamily={fonts.medium}
            />
            <CustomText
              label="STANDARD OPTIONS:"
              color="#1212127A"
              marginBottom={10}
              lineHeight={14 * 1.4}
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
        </ScrollView>
        <View
          style={{ padding: 12, marginBottom: Platform.OS == "ios" ? 20 : 0 }}
        >
          <AuthFooter
            isMain
            titleSize={12}
            onPress={() => setIsModalVisible(true)}
            title="The easiest and most affordable way to reach your destination."
          />
        </View>
      </View>
      <CustomModalGooglePlaces
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onLocationSelect={handleLocationSelect}
        initialValue={selectedLocation}
        debounceDelay={300}
      />
    </ScreenWrapper>
  );
};

export default EstimatedWeight;

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
    height: height - 160,
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

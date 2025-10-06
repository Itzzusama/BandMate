import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";

import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import AwatingTripCard from "./molecules/AwatingTripCard";
import CancelTripModal from "./molecules/CancelTripModal";
import DuringTripActions from "./molecules/DuringTripActions";
import SelectedTripFoods from "./molecules/SelectedTripFoods";
import ShareTrip from "./molecules/ShareTrip";
import TripCarouge from "./molecules/TripCarouge";
import TripCharity from "./molecules/TripCharity";
import TripEmergencyModal from "./molecules/TripEmergencyModal";
import TripExtras from "./molecules/TripExtras";
import TripInvoice from "./molecules/TripInvoice";
import TripPassangers from "./molecules/TripPassangers";
import TripPaymentMethod from "./molecules/TripPaymentMethod";
import TripPromoCode from "./molecules/TripPromoCode";
import TripSpotInfo from "./molecules/TripSpotInfo";
import TripSpots from "./molecules/TripSpots";
import TripSteps from "./molecules/TripSteps";
import TripSummary from "./molecules/TripSummary";
import TripTip from "./molecules/TripTip";
import TripVehicleInfo from "./molecules/TripVehicleInfo";

const DuringTrip = ({ route }) => {
  const [steps, setSteps] = useState([]);
  const [tipPrice, setTipPrice] = useState("");
  const [cancelModal, setCancelModal] = useState(false);
  const [emergencyModal, setEmergencyModal] = useState(false);

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      translucent
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <View style={styles.rowItem}>
            <TouchableOpacity
              style={styles.emergencyBtn}
              onPress={() => setEmergencyModal(true)}
            >
              <ImageFast
                resizeMode={"contain"}
                source={PNGIcons.emergency}
                style={{ width: 18, height: 18 }}
              />
            </TouchableOpacity>
            <CustomButton
              width="84%"
              fontSize={16}
              color={COLORS.red}
              title={"Cancel Trip"}
              backgroundColor={"#1212120A"}
              onPress={() => setCancelModal(true)}
              secondText={"Will imply a 50% Cancellation fee"}
            />
          </View>
          <CustomText
            fontSize={10}
            marginTop={10}
            alignSelf={"center"}
            textAlign={"center"}
            lineHeight={10 * 1.4}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
            label={
              "The easiest and most affordable way to reach your destination."
            }
          />
        </View>
      )}
    >
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
        <AwatingTripCard />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Divider thickness={4} marginVertical={0} />

          <View style={styles.card}>
            <TripSummary />
          </View>

          <View style={[styles.card]}>
            <TripVehicleInfo />
          </View>

          <View style={[styles.review]}>
            <CustomText
              fontSize={12}
              color={"#fff"}
              lineHeight={12 * 1.4}
              fontFamily={fonts.medium}
              label={"+  SEE MORE REVIEWS"}
            />
            <Icons
              size={24}
              color={"#fff"}
              family={"Entypo"}
              name={"chevron-small-down"}
            />
          </View>

          <Divider thickness={4} marginVertical={0} />

          <View style={styles.card}>
            <DuringTripActions />
          </View>

          <View style={styles.card}>
            <View style={[styles.row1]}>
              <View style={[styles.rowItem, { gap: 2 }]}>
                <CustomText
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  label={"Pickup & Drop-off"}
                  fontFamily={fonts.semiBold}
                />
                <ImageFast
                  source={Images.StopHeart}
                  style={{ width: 16, height: 16 }}
                />
              </View>
              <TouchableOpacity>
                <Icons
                  size={28}
                  family={"Entypo"}
                  color={COLORS.black}
                  name={"chevron-small-down"}
                />
              </TouchableOpacity>
            </View>
            <TripSteps />
          </View>

          <View style={styles.card}>
            <SelectedTripFoods />
          </View>

          <View style={styles.card}>
            <TripPassangers />
          </View>

          <Divider thickness={4} marginVertical={0} />
          <TripSpotInfo />
          <Divider thickness={4} marginVertical={0} />

          <View style={styles.card}>
            <TripCarouge />
          </View>

          <View style={styles.card}>
            <TripSpots />
          </View>

          <View style={styles.card}>
            <TripCharity />
          </View>

          <View style={styles.card}>
            <TripPaymentMethod />
          </View>

          <View style={styles.card}>
            <TripPromoCode />
          </View>

          <View style={styles.card}>
            <TripTip tip={tipPrice} setTip={setTipPrice} />
          </View>

          <View style={styles.card}>
            <TripInvoice />
          </View>

          <View style={styles.card}>
            <TripExtras />
          </View>

          <View style={styles.card}>
            <ShareTrip />
          </View>
        </ScrollView>
      </View>
      <CancelTripModal
        visible={cancelModal}
        onDisable={() => setCancelModal(false)}
      />
      <TripEmergencyModal
        visible={emergencyModal}
        onDisable={() => setEmergencyModal(false)}
      />
    </ScreenWrapper>
  );
};

export default DuringTrip;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.inputBg,
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
    marginTop: "45%",
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    width: "100%",
  },

  review: {
    backgroundColor: "#776A3D",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderTopWidth: 1,
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.inputBg,
  },
  emergencyBtn: {
    backgroundColor: "#1212120A",
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginRight: 10,
  },
});

import { useMemo, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";

import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";

import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";
import TopTabWithBG from "../../../components/TopTabWithBG";
import { COLORS } from "../../../utils/COLORS";

const tabs = ["Hand it to me", "Leave it"];

const tabImages = {
  "Hand it to me": PNGIcons.order,
  "Leave it": PNGIcons.reOrder,
};

const OrderDropOff = ({ route }) => {
  const mapRef = useRef(null);

  const [tab, setTab] = useState("Hand it to me");
  const [isSelected, setIsSelected] = useState("");

  const initialRegion = useMemo(
    () => ({
      latitude: 32.1475636,
      longitude: 74.19141239999999,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    }),
    []
  );

  return (
    <ScreenWrapper
      translucent
      paddingHorizontal={0.1}
      footerUnScrollable={() => (
        <View style={{ paddingHorizontal: 12 }}>
          <AuthFooter
            btnSize={16}
            btnDisabled={!isSelected}
            btnTitle="Confirm Pickup"
            isMain
            title="The easiest and most affordable way to reach your destination."
            titleSize={10}
          />
        </View>
      )}
    >
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        region={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
      />
      <View style={styles.overlay} />
      <TouchableOpacity style={styles.crossBtn}>
        <Image source={PNGIcons.cross} style={styles.cross} />
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <View style={styles.greeBanner}>
          <ImageFast
            source={Images.WhiteDiscount}
            style={{ width: 14, height: 14 }}
          />
          <CustomText
            label="Save by using move+"
            color={COLORS.white}
            lineHeight={14 * 1.4}
            marginLeft={4}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.detailsContainer}>
            <CustomText
              fontSize={24}
              lineHeight={24 * 1.4}
              label="Drop-off options"
              fontFamily={fonts.semiBold}
            />
            <CustomText
              marginBottom={8}
              color="#121212A3"
              lineHeight={14 * 1.4}
              fontFamily={fonts.medium}
              label={
                "1227 university Sir Alex Ferguson, Bastion Park, CA 94025, USA"
              }
            />
            <View style={styles.row}>
              <CustomText
                fontSize={20}
                label={"12:04 PM"}
                lineHeight={20 * 1.4}
                fontFamily={fonts.semiBold}
              />
              <CustomText
                label="(ETA)"
                color="#121212A3"
                fontSize={16}
                lineHeight={16 * 1.4}
                fontFamily={fonts.medium}
              />
            </View>
            <View style={styles.line} />
            <TopTabWithBG
              tab={tab}
              fontSize={14}
              marginVertical={1}
              activeHeight={36}
              setTab={setTab}
              fontFamily={fonts.medium}
              withImage
              tabImages={tabImages}
              imageWidth={20}
              imgeHeight={20}
              tabNames={tabs}
            />
            <CustomText
              fontSize={16}
              marginTop={15}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
              label={"Select An Option"}
            />
            <View style={styles.selectedContainer}>
              {["at the curb", "at the doorstep", "at the reception"].map(
                (item, i) => (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.9}
                    onPress={() => setIsSelected(item)}
                    style={[
                      styles.row,
                      styles.border,
                      { borderBottomWidth: i == 2 ? 0 : 1 },
                    ]}
                  >
                    <Icons
                      family="MaterialCommunityIcons"
                      name={
                        isSelected === item
                          ? "radiobox-marked"
                          : "radiobox-blank"
                      }
                      size={28}
                      color={
                        isSelected === item ? COLORS.darkPurple : COLORS.gray2
                      }
                    />

                    <CustomText
                      label={item}
                      fontSize={16}
                      marginLeft={8}
                      lineHeight={16 * 1.4}
                      fontFamily={fonts.medium}
                      textTransform={"capitalize"}
                    />
                  </TouchableOpacity>
                )
              )}
            </View>
            <View style={styles.inputBox}>
              <CustomText
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.subtitle}
                fontFamily={fonts.medium}
                label={"ADD A REMARK (OPTIONAL)"}
              />
              <TextInput
                multiline
                style={styles.input}
                cursorColor={COLORS.black}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default OrderDropOff;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingBottom: 180,
  },
  map: {
    width: "100%",
    height: "20%",
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  greeBanner: {
    backgroundColor: "#64CD75",
    width: "100%",
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContainer: {
    paddingHorizontal: 12,
    paddingTop: 9,
  },
  selectedContainer: {
    marginTop: 12,
    backgroundColor: "#1212120A",
    borderRadius: 12,
    marginBottom: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#1212120A",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  fromMarker: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#1212120A",
    marginTop: 10,
    marginBottom: 22,
  },
  inputBox: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 12,
    height: 160,
  },
  input: {
    flex: 1,
    color: COLORS.black,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlignVertical: "top",
    padding: 0,
  },
  cross: {
    width: 25,
    height: 25,
  },
  crossBtn: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    zIndex: 2,
    top: 75,
    backgroundColor: COLORS.white,
    borderRadius: 100,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#121212A3",
  },
});

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import MultiRangeSlider from "../../../../components/RangeSliderTwoWay";
import CustomButton from "../../../../components/CustomButton";
import CustomSwitch from "../../../../components/CustomSwitch";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { BlurView } from "@react-native-community/blur";

const DashboardModal = ({
  isVisible,
  onDisable,
  onPress,
  loading,
  title,
  subtitle,
  btnOneTitle,
  btnTwoTitle,
  slider,
  toggle,
  switchArray,
  setSwitchArray,
  type,
  des,
}) => {
  const handleToggle = (index) => {
    setSwitchArray((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isEnable: !item.isEnable } : item
      )
    );
  };
  return (
    <CustomModal isChange isVisible={isVisible} onDisable={onDisable}>
      <View
        style={{
          padding: 5,
          width: "95%",
          alignSelf: "center",
          borderRadius: 24,
          marginBottom: 12,
          maxHeight: "100%",
          borderWidth: 1,
          backgroundColor: "#FFFFFF29",
          borderColor: "rgba(255, 255, 255, 0.16)",
        }}
      >
        <BlurView
          style={{
            maxHeight: "100%",
            width: "100%",
            borderRadius: 24,
          }}
          blurType="light"
          blurAmount={26}
          reducedTransparencyFallbackColor="#FFFFFF29"
        />
        <View style={styles.mainContainer}>
          <View style={styles.row}>
            <CustomText
              label={title || "Enable VTC"}
              fontFamily={fonts.semiBold}
              fontSize={24}
            />
            <TouchableOpacity
              onPress={onPress}
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
          {!des && (
            <CustomText
              label={
                subtitle ||
                "You will need to fill a form in order to gain access to providing this service."
              }
              fontFamily={fonts.medium}
              color={COLORS.gray1}
            />
          )}
          {slider && <MultiRangeSlider />}
          {toggle && (
            <View style={{ marginTop: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <View style={styles.imageContainer}>
                  <ImageFast
                    source={PNGIcons.carCheck}
                    style={{ height: 16, width: 16 }}
                  />
                </View>
                <CustomText
                  label={type || "Platforms"}
                  marginLeft={12}
                  fontSize={20}
                  fontFamily={fonts.semiBold}
                />
              </View>
              {switchArray?.map((item, index) => (
                <View key={index} style={[styles.row, { marginBottom: 12 }]}>
                  <CustomText
                    label={item?.name || "Bluetooth"}
                    fontFamily={fonts.medium}
                    fontSize={16}
                  />
                  <CustomSwitch
                    value={item.isEnable}
                    setValue={() => handleToggle(index)}
                  />
                </View>
              ))}
            </View>
          )}

          {des && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <View style={styles.imageContainer}>
                  <ImageFast
                    source={PNGIcons.carCheck}
                    style={{ height: 16, width: 16 }}
                  />
                </View>
                <CustomText
                  label={type || "Platforms"}
                  marginLeft={12}
                  fontSize={20}
                  fontFamily={fonts.semiBold}
                />
              </View>
              <CustomText
                label={des}
                fontFamily={fonts.medium}
                color={COLORS.gray1}
              />
            </>
          )}

          <View style={{ marginTop: toggle && -8 }}>
            <CustomButton
              title={btnOneTitle || "Get Started"}
              marginTop={24}
              onPress={onPress}
              marginBottom={4}
            />
            <CustomButton
              title={btnTwoTitle || "Maybe Later"}
              backgroundColor={COLORS.lightGray}
              onPress={onPress}
              loading={loading}
              color={COLORS.black}
            />
          </View>
        </View>
      </View>
      <CustomText
        color={COLORS.white}
        label="The easiest and most affordable way to reach your destination."
        alignSelf="center"
        textAlign="center"
        fontSize={12}
        fontFamily={fonts.medium}
        marginBottom={20}
        width="90%"
        marginTop={4}
      />
    </CustomModal>
  );
};

export default DashboardModal;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 22,
  },
  icon: {
    height: 16,
    width: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  borderView: {
    borderWidth: 1,
    borderColor: "#7f7f7f",
    padding: 4,
    alignSelf: "center",
    borderRadius: 28,
    width: "97%",
  },
  imageContainer: {
    height: 32,
    width: 32,
    backgroundColor: "#E1DEfD",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});

// {/* slider modal  */}
//       <DashboardModal
//         // isVisible
//         title={"Pricing"}
//         subtitle={"Define your daily budget easily."}
//         btnOneTitle={"Show 88 Results"}
//         btnTwoTitle={"Reset"}
//         slider
//       />

//       {/* Music modal  */}
//       <DashboardModal
//         // isVisible
//         title={"Allow Music"}
//         subtitle={"Spotify, Apple Music, Deezer, and more..."}
//         btnOneTitle={"Save"}
//         btnTwoTitle={"Cancel"}
//         toggle
//         switchArray={musicArray}
//       />

//       {/* Books modal  */}
//       <DashboardModal
//         // isVisible
//         title={"Have Books"}
//         subtitle={"Books for kids, regular books, magazins"}
//         btnOneTitle={"Save"}
//         btnTwoTitle={"Cancel"}
//         toggle
//         switchArray={bookArray}
//       />
//       {/* Plug modal  */}
//       <DashboardModal
//         // isVisible
//         title={"Have Books"}
//         subtitle={"Books for kids, regular books, magazins"}
//         btnOneTitle={"Save"}
//         btnTwoTitle={"Cancel"}
//         type={"EV Plug Types"}
//         toggle
//         switchArray={plugArray}
//       />
//       {/* Plug Type 1  */}
//       <DashboardModal
//         // isVisible
//         title={"Plug Type 1"}
//         // subtitle={"Books for kids, regular books, magazins"}
//         btnOneTitle={"Save"}
//         btnTwoTitle={"Cancel"}
//         type={"Description"}
//         des={
//           "Type 1 is a single-phase plug and is standard for EV’s from America and Asia. It allows you to charge your car at a speed of up to 7.4 kW, depending on the charging power of your car and grid capability."
//         }
//       />
//       {/* Plug Type 2  */}
//       <DashboardModal
//         // isVisible
//         title={"Plug Type 2"}
//         // subtitle={"Books for kids, regular books, magazins"}
//         btnOneTitle={"Save"}
//         btnTwoTitle={"Cancel"}
//         type={"Description"}
//         des={
//           "Type 2 plugs are triple-phase plugs because they have three additional wires to let current run through. So naturally, they can charge your car faster. At home, the highest charging power rate is 22 kW, while public charging stations can have a charging power up to 43 kW, again depending on the charging power of your car and grid capability."
//         }
//       />
//       {/* Plug Type CHAdeMO */}
//       <DashboardModal
//         // isVisible
//         title={"Plug Type CHAdeMO"}
//         // subtitle={"Books for kids, regular books, magazins"}
//         btnOneTitle={"Save"}
//         btnTwoTitle={"Cancel"}
//         type={"Description"}
//         des={
//           "CHAdeMO: This quick charging system was developed in Japan, and allows for very high charging capacities as well as bidirectional charging. Currently, Asian car manufacturers are leading the way in offering electric cars that are compatible with a CHAdeMO plug. It allows charging up to 100 kW."
//         }
//       />
//       {/* Plug Type CHAdeMO */}
//       <DashboardModal
//         // isVisible
//         title={"Plug Type CHAdeMO"}
//         // subtitle={"Books for kids, regular books, magazins"}
//         btnOneTitle={"Save"}
//         btnTwoTitle={"Cancel"}
//         type={"Description"}
//         des={
//           "The CCS plug is an enhanced version of the Type 2 plug, with two additional power contacts for the purposes of quick charging. It supports AC and DC charging. It allows charging at a speed of up to 350 kW."
//         }
//       />

//       {/* Delete Vehicle */}
//       <DashboardModal
//         isVisible
//         title={"Plug Type CHAdeMO"}
//         subtitle={
//           "At this point all your data will be removed and you on’t be able to later recover your information."
//         }
//         btnOneTitle={"Yes, delete vehicle"}
//         btnTwoTitle={"Cancel"}
//       />

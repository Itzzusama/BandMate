import { StyleSheet, TouchableOpacity, View } from "react-native";

import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const DriverCameraModal = ({ visible, onDisable, loading }) => {
  return (
    <CustomModal isVisible={visible} onDisable={onDisable}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.row}>
            <CustomText
              fontSize={24}
              label={"The angles"}
              lineHeight={24 * 1.4}
              fontFamily={fonts.semiBold}
            />
            <TouchableOpacity onPress={onDisable} style={styles.icon}>
              <Icons name={"close"} family={"AntDesign"} />
            </TouchableOpacity>
          </View>
          <CustomText
            marginTop={15}
            marginBottom={20}
            textAlign={"center"}
            alignSelf={"center"}
            lineHeight={14 * 1.4}
            fontFamily={fonts.medium}
            label={"Safety for our partners is a top priority for us. "}
          />

          <ImageFast
            style={styles.camera}
            resizeMode={"contain"}
            source={PNGIcons.driverCamera}
          />

          <TouchableOpacity style={styles.addIcon}>
            <Icons
              size={12}
              name={"plus"}
              color={COLORS.white}
              family={"FontAwesome"}
            />
          </TouchableOpacity>
          <CustomText
            fontSize={18}
            alignSelf={"center"}
            lineHeight={18 * 1.4}
            label={"Dashcam 3 Lenses"}
            fontFamily={fonts.medium}
          />

          <CustomText
            fontSize={12}
            marginBottom={6}
            label={"by move."}
            alignSelf={"center"}
            lineHeight={12 * 1.4}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
          />
          <View style={styles.row1}>
            <Icons size={14} name={"shopping-bag"} family={"MaterialIcons"} />
            <CustomText
              fontSize={12}
              alignSelf={"center"}
              lineHeight={12 * 1.4}
              color={COLORS.subtitle}
              fontFamily={fonts.medium}
              label={`156,657 drivers already purchased it.`}
            />
          </View>
          <CustomText
            marginTop={15}
            alignSelf={"center"}
            textAlign={"center"}
            lineHeight={14 * 1.4}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
            label={
              "Avoid bad experiences while doing your best to provide a premium experience for your customers. With our 3 lenses dashcam you are covered from any angles. Front, interior and rear get 4K coverage in case of any incidents. "
            }
          />

          <CustomButton
            fontSize={16}
            marginTop={15}
            loading={loading}
            title={"Check our Store"}
          />
          <CustomButton
            fontSize={16}
            marginTop={10}
            title={"Maybe Later"}
            color={COLORS.black}
            backgroundColor={COLORS.lightGray}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default DriverCameraModal;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
    width: "95%",
    alignSelf: "center",
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: "#FFFFFF29",
    borderColor: "rgba(255, 255, 255, 0.16)",
    overflow: "hidden",
    marginVertical: "auto",
    height: "89%",
  },
  container: {
    width: "100%",
    padding: 12,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    height: "100%",
    paddingBottom: 0,
    overflow: "hidden",
  },
  icon: {
    height: 32,
    width: 32,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGray,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    justifyContent: "center",
  },
  camera: {
    width: 120,
    height: 120,
    marginBottom: 15,
    alignSelf: "center",
  },
  addIcon: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: COLORS.red1,
    alignSelf: "center",
    width: 18,
    height: 18,
    marginBottom: 4,
  },
});

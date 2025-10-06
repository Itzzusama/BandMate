import { BlurView } from "@react-native-community/blur";
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  View,
} from "react-native";

import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";

import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const { height } = Dimensions.get("window");

const InstantTripModal = ({ isVisible, onDisable, title, desc }) => {
  return (
    <CustomModal isChange isVisible={isVisible} onDisable={onDisable}>
      <View style={styles.loaderMainContainer}>
        <BlurView
          style={styles.loaderBlurView}
          blurType="light"
          blurAmount={26}
          reducedTransparencyFallbackColor="#FFFFFF29"
        />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={28} color={COLORS.primaryColor} />
        </View>
      </View>
      <View style={styles.modalMainContainer}>
        <BlurView
          style={styles.modalBlurView}
          blurType="light"
          blurAmount={26}
          reducedTransparencyFallbackColor="#FFFFFF29"
        />

        <View style={styles.mainContainer}>
          <View style={styles.row}>
            <CustomText
              label={title}
              fontFamily={fonts.semiBold}
              fontSize={24}
            />
            <TouchableOpacity
              onPress={onDisable}
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
          <CustomText
            label={desc}
            fontFamily={fonts.medium}
            alignSelf="center"
            color={COLORS.black}
            fontSize={18}
            lineHeight={18 * 1.4}
            marginBottom={20}
            marginTop={20}
          />
          <CustomButton
            title="Cancel"
            backgroundColor={COLORS.lightGray}
            onPress={onDisable}
            color={COLORS.black}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default InstantTripModal;

const styles = StyleSheet.create({
  modalMainContainer: {
    padding: 5,
    width: "95%",
    alignSelf: "center",
    borderRadius: 24,
    marginBottom: 12,
    maxHeight: "100%",
    borderWidth: 1,
    backgroundColor: "#FFFFFF29",
    borderColor: "rgba(255, 255, 255, 0.16)",
  },
  mainContainer: {
    width: "100%",
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  icon: {
    height: 16,
    width: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loaderMainContainer: {
    padding: 5,
    width: 60,
    height: 60,
    alignSelf: "center",
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: "#FFFFFF29",
    borderColor: "rgba(255, 255, 255, 0.16)",
    bottom: height / 2 + 100,
    zIndex: 1000,
  },
  loaderBlurView: {
    maxHeight: "100%",
    width: "100%",
    borderRadius: 100,
  },
  loaderContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBlurView: {
    maxHeight: "100%",
    width: "100%",
    borderRadius: 24,
  },
});

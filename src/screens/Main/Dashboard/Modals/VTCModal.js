import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { BlurView } from "@react-native-community/blur";

import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";

import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const VTCModal = ({
  isVisible,
  onDisable,
  loading,
  title,
  subtitle,
  btnOne,
  btnTwo,
  onBtnOne,
  onBtnTwo,
}) => {
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
            label={
              subtitle ||
              "You will need to fill a form in order to gain access to providing this service."
            }
            fontFamily={fonts.medium}
            color={COLORS.gray1}
          />
          <View>
            <CustomButton
              title={btnOne || "Get Started"}
              marginTop={24}
              onPress={onBtnOne}
              marginBottom={4}
              loading={loading}
            />
            <CustomButton
              title={btnTwo || "Maybe Later"}
              backgroundColor={COLORS.lightGray}
              onPress={onDisable}
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

export default VTCModal;

const styles = StyleSheet.create({
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
});

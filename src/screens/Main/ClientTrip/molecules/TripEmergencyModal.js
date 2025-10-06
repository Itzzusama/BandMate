import { StyleSheet, TouchableOpacity, View } from "react-native";

import fonts from "../../../../assets/fonts";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const TripEmergencyModal = ({ visible, onDisable, loading }) => {
  return (
    <CustomModal isVisible={visible} onDisable={onDisable}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.row}>
            <CustomText
              fontSize={24}
              lineHeight={24 * 1.4}
              fontFamily={fonts.semiBold}
              label={"Emergency Assistance"}
            />
            <TouchableOpacity onPress={onDisable} style={styles.icon}>
              <Icons name={"close"} family={"AntDesign"} />
            </TouchableOpacity>
          </View>
          <CustomText
            marginTop={5}
            marginBottom={15}
            lineHeight={14 * 1.4}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
            label={
              "Share your location information and vehicle details with the operator to easily locate you."
            }
          />

          <View style={styles.box}>
            <CustomText
              fontSize={12}
              lineHeight={12 * 1.4}
              color={COLORS.subtitle}
              label={"Red - Tesla Model 3"}
            />
            <CustomText
              fontSize={16}
              marginTop={3}
              label={"R-1111-UD"}
              lineHeight={16 * 1.4}
            />
          </View>
          <View style={styles.box}>
            <CustomText
              fontSize={16}
              marginTop={3}
              label={"Novel St. 45"}
              lineHeight={16 * 1.4}
            />
            <CustomText
              fontSize={12}
              lineHeight={12 * 1.4}
              color={COLORS.subtitle}
              label={"New York, NY 10003, USA"}
            />
          </View>

          <View style={styles.timeBox}>
            <CustomText
              fontSize={12}
              color={"#4347FF"}
              lineHeight={12 * 1.4}
              fontFamily={fonts.medium}
              label={"Approximative engagement time is: 08:00 min"}
            />
          </View>

          <CustomButton
            fontSize={16}
            marginBottom={7}
            loading={loading}
            title={"Call 911"}
            backgroundColor={COLORS.red1}
          />
          <CustomText
            fontSize={10}
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
      </View>
    </CustomModal>
  );
};

export default TripEmergencyModal;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
    width: "95%",
    alignSelf: "center",
    borderRadius: 24,
    height: "76%",
    borderWidth: 1,
    backgroundColor: "#FFFFFF29",
    borderColor: "rgba(255, 255, 255, 0.16)",
    overflow: "hidden",
    marginVertical: "auto",
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
  box: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    marginBottom: 8,
  },
  timeBox: {
    backgroundColor: "#4347FF29",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
});

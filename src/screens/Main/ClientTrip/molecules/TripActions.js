import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const TripActions = ({ onColorSignalPress, onShareTripStatusPress }) => {
  const navigation = useNavigation();
  return (
    <View>
      <CustomText
        fontSize={18}
        label="Actions"
        color={COLORS.black}
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
      />
      <View style={styles.actionIconsContainer}>
        <View style={styles.actionIcons}>
          <ImageFast
            style={styles.icon}
            resizeMode="contain"
            source={Images.BlackChat}
            removeLoading
            onPress={() => navigation.navigate("InboxScreen")}
          />
        </View>
        <View style={styles.actionIcons}>
          <ImageFast
            style={styles.icon}
            source={Images.BlackPhone}
            resizeMode="contain"
            removeLoading
          />
        </View>
        <View style={styles.actionIcons}>
          <ImageFast
            style={styles.icon}
            source={Images.BlackCam}
            resizeMode="contain"
            removeLoading
          />
        </View>
      </View>

      <CustomButton
        title="Color Signal"
        height={56}
        width="100%"
        borderRadius={12}
        backgroundColor="#1212120A"
        color={COLORS.black}
        fontSize={18}
        rightIcon={Images.Signal}
        marginTop={8}
        onPress={onColorSignalPress}
      />
      <CustomButton
        title="Share Trip Status"
        height={56}
        width="100%"
        borderRadius={12}
        backgroundColor="#1212120A"
        color={COLORS.black}
        fontSize={18}
        rightIcon={Images.Share}
        marginTop={8}
        onPress={onShareTripStatusPress}
      />
    </View>
  );
};

export default TripActions;

const styles = StyleSheet.create({
  actionIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },

  actionIcons: {
    padding: 12,
    backgroundColor: "#1212120A",
    height: 64,
    borderRadius: 12,
    width: "32%",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 26,
    height: 26,
  },
  btn: {
    width: "100%",
    height: 56,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 12,
    backgroundColor: "#1212120A",
    borderRadius: 12,
    justifyContent: "center",
  },
});

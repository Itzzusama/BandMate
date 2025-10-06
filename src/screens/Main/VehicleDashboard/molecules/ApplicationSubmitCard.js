import { Image, StyleSheet, View } from "react-native";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";

const ApplicationSubmitCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <CustomText
            label={"Application Submitted!"}
            fontSize={16}
            color={COLORS.white}
            lineHeight={16 * 1.4}
          />
          <CustomText
            label={"Track the progress here."}
            fontSize={14}
            color={"#FFFFFFA3"}
            lineHeight={14 * 1.4}
          />
        </View>
        <View style={styles.Container}>
          <Image
            source={PNGIcons.forward}
            style={styles.icon}
            loading={false}
          />
        </View>
      </View>
    </View>
  );
};

export default ApplicationSubmitCard;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#37B874",
    marginBottom: 8,
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Container: {
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF29",
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: COLORS.white,
  },
});

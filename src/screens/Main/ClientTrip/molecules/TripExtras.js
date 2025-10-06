import { Pressable, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const TripInvoice = () => {
  return (
    <View>
      <CustomText
        fontSize={18}
        label={"Extra"}
        marginBottom={10}
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
      />
      <View style={styles.row}>
        <Pressable style={styles.box}>
          <Icons name={"call-split"} family={"MaterialIcons"} size={25} />
        </Pressable>
        <Pressable style={styles.box}>
          <Icons size={25} name={"sync"} family={"MaterialIcons"} />
        </Pressable>
        <Pressable style={styles.box}>
          <Icons size={25} name={"star-fill"} family={"Octicons"} />
        </Pressable>
      </View>
    </View>
  );
};

export default TripInvoice;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#1212120A",
    borderRadius: 12,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    width: "32%",
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

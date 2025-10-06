import { StyleSheet, View } from "react-native";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const ListHeader = () => {
  return (
    <View style={{ marginTop: 15 }}>
      <View style={styles.box}>
        <ImageFast source={PNGIcons.warning1} style={styles.icon} />
        <CustomText
          fontSize={12}
          lineHeight={12 * 1.4}
          textTransform={"none"}
          label={"Keep clean and respectful chats at any time."}
        />
      </View>
      <View style={styles.box}>
        <ImageFast source={PNGIcons.warning1} style={styles.icon} />
        <CustomText
          fontSize={12}
          lineHeight={12 * 1.4}
          textTransform={"none"}
          label={"Report any abuse or TOS infringements."}
        />
      </View>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 100,
    justifyContent: "center",
    columnGap: 5,
    height: 20,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    alignSelf: "center",
    paddingHorizontal: 8,
  },
  icon: {
    width: 11,
    height: 11,
  },
});

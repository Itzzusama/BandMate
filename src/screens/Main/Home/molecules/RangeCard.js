import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import ErrorComponent from "../../../../components/ErrorComponent";
import MultiRangeSlider from "../../../../components/RangeSliderTwoWay";

const RangeCard = ({ title, rightTitle, leftTitle }) => {
  return (
    <View style={styles.mainContainer}>
      <CustomText
        label={title || "I'm looking for"}
        fontSize={18}
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
      />
      <MultiRangeSlider rightTitle={rightTitle} leftTitle={leftTitle} />

      <ErrorComponent
        errorTitle={"Only meet and be visible to people within that range."}
        color={"#848484"}
        marginTop={8}
      />
    </View>
  );
};

export default RangeCard;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#272727",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  btn: {
    padding: 7,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF0A",
    borderRadius: 99,
    marginBottom: 8,
  },
});

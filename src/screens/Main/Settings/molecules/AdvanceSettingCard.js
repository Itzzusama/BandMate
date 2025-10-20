import { StyleSheet, View } from "react-native";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import fonts from "../../../../assets/fonts";

const AdvanceSettingCard = ({ title, des, index, lastIndex }) => {
  return (
    <View
      style={[
        styles.container,
        index === lastIndex && { borderBottomWidth: 0 }, // ✅ Hide border for last item
      ]}
    >
      <View style={{ flex: 1 }}>
        <CustomText
          label={title}
          fontSize={16}
          fontFamily={fonts.medium}
          color={COLORS.white}
          lineHeight={16 * 1.4}
        />
        <CustomText
          label={des}
          fontSize={14}
          fontFamily={fonts.medium}
          color={COLORS.white3}
          lineHeight={14 * 1.4}
          marginTop={-1}
        />
      </View>
      <Icons
        family={"Ionicons"}
        name={"chevron-forward-outline"}
        color={COLORS.white3}
        size={18}
      />
    </View>
  );
};

export default AdvanceSettingCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: COLORS.inputBg,
  },
});

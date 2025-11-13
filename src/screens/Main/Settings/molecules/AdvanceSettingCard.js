import { StyleSheet, View } from "react-native";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import fonts from "../../../../assets/fonts";
import { Pressable } from "react-native";

const AdvanceSettingCard = ({ title, des, index, lastIndex, onPress }) => {
  return (
    <Pressable
      style={[
        styles.container,
        index === lastIndex && { borderBottomWidth: 0 },
      ]}
      onPress={onPress}
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
    </Pressable>
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

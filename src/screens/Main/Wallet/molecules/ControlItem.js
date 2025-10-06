import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import ImageFast from "../../../../components/ImageFast";
import Icons from "../../../../components/Icons";

const ControlItem = ({ icon, title, subtitle, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.itemContainer}
      onPress={onPress}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <ImageFast source={icon} style={{ height: 40, width: 40 }} />
        </View>

        <View style={styles.infoContainer}>
          <CustomText
            label={title}
            fontFamily={fonts.medium}
            fontSize={14}
            lineHeight={14 * 1.4}
            color={COLORS.black}
          />
          <CustomText
            label={subtitle}
            fontFamily={fonts.regular}
            fontSize={12}
            lineHeight={12 * 1.4}
            color={COLORS.gray1}
          />
        </View>
      </View>

      <Icons
        name="chevron-right"
        family="Feather"
        size={20}
        color={COLORS.gray1}
      />
    </TouchableOpacity>
  );
};

export default ControlItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
});

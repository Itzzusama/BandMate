import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const TypeCard = ({
  title = "Parking With Roof",
  subtitle = "7 models",
  value,
  selected,
}) => {
  const isSelected = selected === value;

  return (
    <View style={styles.mainContainer}>
      <View>
        <CustomText label={title} fontFamily={fonts.medium} fontSize={16} />
        {subtitle && (
          <CustomText
            label={subtitle}
            fontFamily={fonts.medium}
            marginTop={-4}
            color={COLORS.gray2}
          />
        )}
      </View>

      <Icons
        family="MaterialCommunityIcons"
        name={isSelected ? "radiobox-marked" : "radiobox-blank"}
        size={28}
        color={isSelected ? COLORS.darkPurple : COLORS.gray2}
      />
    </View>
  );
};

export default TypeCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
 
});

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const CreditActionCard = ({
  icon,
  title,
  amount,
  subtitle,
  backgroundColor = COLORS.white,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icons name={icon} family="Feather" size={20} color={COLORS.white} />
        </View>

        <View style={styles.textContainer}>
          <CustomText
            label={title}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
            color={COLORS.white}
          />
          <CustomText
            label={`${amount} - ${subtitle}`}
            fontFamily={fonts.regular}
            fontSize={12}
            lineHeight={12 * 1.4}
            color={COLORS.lightGray}
            marginTop={2}
          />
        </View>
      </View>

      <Icons
        name="chevron-right"
        family="Feather"
        size={20}
        color={COLORS.white}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
});

export default CreditActionCard;

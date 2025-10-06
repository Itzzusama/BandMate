import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";

const SubscriptionCard = ({ onPress }) => {
  return (
    <View style={styles.section}>
      <CustomText
        label="My Subscriptions"
        fontFamily={fonts.semiBold}
        fontSize={20}
        lineHeight={20 * 1.4}
        color={COLORS.black}
        marginBottom={8}
      />

      <TouchableOpacity style={styles.subscriptionItem} onPress={onPress}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Image source={PNGIcons.mySub} style={{ height: 40, width: 40 }} />
          </View>

          <View style={styles.textContainer}>
            <CustomText
              label="move+ subscription"
              fontFamily={fonts.medium}
              fontSize={14}
              lineHeight={14 * 1.4}
              color={COLORS.black}
            />
            <CustomText
              label="$6.99 - Get it now!"
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
          color={COLORS.gray2}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginBottom: 8,
    borderRadius: 20,
    padding: 16,
  },
  subscriptionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
});

export default SubscriptionCard;

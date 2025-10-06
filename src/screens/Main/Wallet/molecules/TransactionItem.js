import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const TransactionItem = ({
  name,
  amount,
  date,
  avatar,
  avatarColor = COLORS.primaryColor,
  onPress,
  showBadge = false,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View
          style={{
            padding: 8,
            borderWidth: 2,
            borderColor: COLORS.lightGray,
            borderRadius: 99,
            marginRight: 12,
          }}
        >
          <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
            <CustomText
              label={avatar}
              fontFamily={fonts.bold}
              fontSize={16}
              lineHeight={16 * 1.4}
              color={COLORS.white}
            />
            {showBadge && (
              <ImageFast source={PNGIcons.TreasuryUp} style={styles.badge} />
            )}
          </View>
        </View>

        <View style={styles.textContainer}>
          <CustomText
            label={name}
            fontFamily={fonts.medium}
            fontSize={14}
            lineHeight={14 * 1.4}
            color={COLORS.primaryColor}
          />
          <View style={styles.row}>
            <CustomText
              label={`${amount} `}
              fontSize={12}
              lineHeight={12 * 1.4}
              fontFamily={fonts.regular}
            />
            <CustomText
              label={`- ${date}`}
              fontSize={12}
              lineHeight={12 * 1.4}
              color={"#828282"}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    bottom: -5,
    right: -3,
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TransactionItem;

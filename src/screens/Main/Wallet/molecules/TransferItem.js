import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const TransferItem = ({ name, amount, date, avatar, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftSection}>
        <View style={styles.avatarContainer}>
          <CustomText
            label={avatar || name.charAt(0).toUpperCase()}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
            color={COLORS.white}
          />
        </View>

        <View style={styles.infoContainer}>
          <CustomText
            label={name}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
            color={COLORS.black}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText
              label={amount}
              fontFamily={fonts.regular}
              fontSize={12}
              lineHeight={12 * 1.4}
              color={COLORS.black}
            />

            <CustomText
              label={date}
              fontFamily={fonts.regular}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    marginBottom: 8,
    borderRadius: 12,
    marginTop:8
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
});

export default TransferItem;

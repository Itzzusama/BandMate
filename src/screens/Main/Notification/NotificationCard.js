import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Icons from "../../../components/Icons";
import { COLORS } from "../../../utils/COLORS";
import { Images } from "../../../assets/images";
import fonts from "../../../assets/fonts";

const NotificationCard = ({ username, desc, type, amount, time }) => {
  let statusColor = COLORS.primaryColor;
  let statusText = "";
  let statusIcon = null;

  if (type === "paid") {
    statusColor = COLORS.red;
    statusText = `Paid $${amount}`;
    statusIcon = (
      <Icons
        name="arrow-up"
        family="Feather"
        size={14}
        color={COLORS.red}
        style={{ marginRight: 2 }}
      />
    );
  } else if (type === "received") {
    statusColor = COLORS.green;
    statusText = `Received $${amount}`;
    statusIcon = (
      <Icons
        name="arrow-down"
        family="Feather"
        size={14}
        color={COLORS.green}
        style={{ marginRight: 2 }}
      />
    );
  } else {
    statusText = `$${amount}`;
    statusIcon = null;
  }

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.avatarWrap}>
            {/* <ImageFast source={Images.placeholderUser} style={styles.avatar} /> */}
          </View>
          <CustomText
            label={username}
            fontFamily={fonts.semiBold}
            fontSize={16}
            color={COLORS.primaryColor}
            marginBottom={2}
          />
        </View>

        {/* Additional Info Below */}
        <CustomText
          label={desc}
          marginBottom={2}
          marginTop={12}
          fontFamily={fonts.medium}
        />
        <View style={styles.statusRow}>
          {statusIcon}
          <CustomText
            label={statusText}
            fontFamily={fonts.medium}
          />
        </View>
        <CustomText
          label={time}
          color={COLORS.gray2}
          fontFamily={fonts.medium}
        />
      </View>

      <Icons
        name="chevron-right"
        family="Feather"
        size={20}
        color={COLORS.gray2}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
  },
  avatarWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.low,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    marginLeft: 8,
  },
});

export default NotificationCard;

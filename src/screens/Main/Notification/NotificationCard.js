import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Icons from "../../../components/Icons";
import { COLORS } from "../../../utils/COLORS";
import { Images } from "../../../assets/images";
import fonts from "../../../assets/fonts";

const NotificationCard = ({ username, desc, type, amount, time, onPress }) => {
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
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.card}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.avatarWrap}>
            {/* <ImageFast source={Images.placeholderUser} style={styles.avatar} /> */}
          </View>
          <CustomText
            label={username}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
            color={COLORS.primaryColor}
          />
        </View>

        {/* Additional Info Below */}
        <CustomText
          label={desc}
          color={COLORS.white2}
          marginTop={12}
          fontFamily={fonts.medium}
        />
        <View style={styles.statusRow}>
          {statusIcon}
          <CustomText
            label={statusText}
            fontFamily={fonts.medium}
            lineHeight={14 * 1.4}
          />
        </View>
        <CustomText
          label={time}
          lineHeight={14 * 1.4}
          color={COLORS.white3}
          fontFamily={fonts.medium}
          marginTop={2}
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
    backgroundColor: COLORS.black,
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#FFFFFF0A",
  },
  avatarWrap: {
    width: 38,
    height: 38,
    borderRadius: 99,
    backgroundColor: COLORS.low,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
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

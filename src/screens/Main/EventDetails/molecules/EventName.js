import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../utils/COLORS";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import Icons from "../../../../components/Icons";

const EventName = ({ name }) => {
  return (
    <View style={[styles.container, styles.row]}>
      <View style={[styles.row, { flex: 1 }]}>
        <Image source={Images.event_circle} style={styles.icon} />
        <CustomText
          label={"Italy Tours Company"}
          fontFamily={fonts.semiBold}
          fontSize={16}
          lineHeight={16 * 1.4}
          marginLeft={8}
          marginRight={6}
        />
        <Icons
          family="MaterialIcons"
          name="verified"
          size={16}
          color="#007BFF"
        />
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.msgIocn}>
        <Image
          source={Images.blurInbox}
          style={{ height: 20, width: 20, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default EventName;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  msgIocn: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.cardColor,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 28,
    width: 28,
    resizeMode: "contain",
  },
});

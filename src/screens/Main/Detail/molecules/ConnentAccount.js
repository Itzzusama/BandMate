import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";

import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";

const ConnentAccount = ({
  accName = "Spotify",
  top,
  bottom,
  onPress,
  disabled,
}) => {
  return (
    <Pressable
      style={[styles.conatiner, { marginTop: top, marginBottom: bottom }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Image source={PNGIcons.attach} style={styles.attach} />
      <View style={styles.row}>
        <CustomText
          label={`Connect your ${accName} account.`}
          fontFamily={fonts.medium}
          fontSize={16}
          lineHeight={16 * 1.4}
          marginTop={5}
        />
        <Image source={Images.trending} style={styles.arrowIcon} />
      </View>
      <Text style={styles.des}>
        Get your music on <Text style={styles.accname}>{accName}</Text> and
        allow other users to discover your creations in just a click.
      </Text>
    </Pressable>
  );
};

export default ConnentAccount;

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: COLORS.cardColor,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  arrowIcon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
  attach: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  des: {
    fontFamily: 14,
    fontFamily: fonts.regular,
    color: COLORS.white2,
    lineHeight: 14 * 1.4,
    marginTop: 10,
  },
  accname: {
    color: COLORS.white,
    fontFamily: fonts.medium,
  },
});

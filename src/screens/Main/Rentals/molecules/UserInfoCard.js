import { StyleSheet, Image, View } from "react-native";
import React from "react";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { Images } from "../../../../assets/images";
import fonts from "../../../../assets/fonts";

const UserInfoCard = () => {
  return (
    <View style={styles.container}>
      <ImageFast source={Images.user} style={styles.image} removeLoading />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CustomText
          label={"Mike"}
          fontFamily={fonts.semiBold}
          fontSize={16}
          lineHeight={16 * 1.4}
        />
        <Image source={Images.verifyStar} style={styles.verifyBadge} />
      </View>

      <ImageFast
        loading={false}
        source={Images.chatIcon}
        style={styles.chatIcon}
        removeLoading
      />
    </View>
  );
};

export default UserInfoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 99,
    padding: 6,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 99,
    marginRight: 8,
  },
  chatIcon: {
    height: 40,
    width: 40,
    marginLeft: "auto",
  },
  verifyBadge: {
    height: 16,
    width: 16,
    marginLeft: 4,
  },
});

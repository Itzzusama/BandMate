import { StyleSheet, Image, View } from "react-native";
import React from "react";
import CustomButton from "../../../../components/CustomButton";
import ImageFast from "../../../../components/ImageFast";
import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import { useNavigation } from "@react-navigation/native";

const FollowingRow = () => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.row,
        {
          justifyContent: "space-between",
          backgroundColor: COLORS.black,
          padding: 12,
        },
      ]}
    >
      <View style={[styles.row, { gap: 6 }]}>
        <ImageFast
          source={Images.h1}
          style={styles.icon1}
          onPress={() => navigation.navigate("SearchScreen")}
        />
        <ImageFast
          removeLoading
          onPress={() => navigation.navigate("SearchScreen")}
          source={Images.camera2}
          style={styles.icon1}
        />
        <Image source={Images.todo} style={styles.icon1} />
        <Image source={Images.mic} style={styles.icon1} />
      </View>

      <View style={[styles.row, { gap: 10 }]}>
        <View style={styles.button}>
          <Image source={Images.userIcon} style={{ height: 16, width: 16 }} />
          <Image
            source={Images.down}
            style={{ height: 24, width: 24 }}
            tintColor={"rgba(255, 255, 255, 0.48)"}
          />
        </View>

        <View style={[styles.row, { gap: 10 }]}>
          <Image source={Images.globe} style={styles.icon} />
          <Image source={Images.filter} style={styles.icon} />
        </View>
      </View>
    </View>
  );
};

export default FollowingRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 32,
    width: 32,
  },
  icon1: {
    height: 40,
    width: 40,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 6,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 99,
  },
});

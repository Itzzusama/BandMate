import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Divider from "./Divider";
import { SongsImgs } from "../../../../assets/images/songs";
import Icons from "../../../../components/Icons";
import { PNGIcons } from "../../../../assets/images/icons";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import { Icon } from "react-native-vector-icons/Icon";

const PopularRelease = ({ title, data, showDots }) => {
  return (
    <View>
      <Divider />
      <View style={{ paddingHorizontal: 12 }}>
        <View style={[styles.row, { marginBottom: 8 }]}>
          <View style={[styles.row, { flex: 1 }]}>
            <Image source={PNGIcons.spotify} style={styles.icon} />
            <CustomText
              label={title}
              fontFamily={fonts.medium}
              color={COLORS.white}
              fontSize={17}
              lineHeight={17 * 1.4}
              marginLeft={12}
            />
          </View>
          <CustomText
            label="See all"
            color={COLORS.gray3}
            fontSize={12}
            lineHeight={12 * 1.4}
          />
        </View>
        {data?.map((item, index) => (
          <View style={[styles.row, { marginBottom: 16 }]} key={index}>
            <Image
              source={item.img}
              style={showDots ? styles.img2 : styles.img1}
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <CustomText
                label={item.title}
                fontFamily={fonts.medium}
                color={COLORS.white}
                fontSize={17}
                numberOfLines={showDots ? 1 : 2}
                // lineHeight={17 * 1.4}
              />
              <CustomText
                label={item.des}
                color={COLORS.gray3}
                fontSize={12}
                marginTop={-4}
              />
            </View>
            {showDots && (
              <Icons
                family={"Entypo"}
                name={"dots-three-horizontal"}
                color={COLORS.white}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default PopularRelease;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  img1: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },
  img2: {
    height: 48,
    width: 48,
    resizeMode: "contain",
  },
});

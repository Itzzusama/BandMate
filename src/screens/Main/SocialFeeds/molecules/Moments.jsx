import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";
import { FeedsImages } from "../../../../assets/images/FeedsImages";
import { PNGIcons } from "../../../../assets/images/icons";
PNGIcons.preference;
const Moments = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingVertical: 0.1, marginBottom: 8 }]}>
        <TouchableOpacity activeOpacity={0.8} style={styles.feedBtn}>
          <CustomText
            label={"Social Feed"}
            fontFamily={fonts.medium}
            fontSize={14}
            lineHeight={14 * 1.4}
            marginRight={8}
          />
          <Icons
            family={"FontAwesome5"}
            name={"chevron-down"}
            color={COLORS.white3}
            size={15}
          />
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconWrapper}>
            <Icons
              family={"MaterialIcons"}
              name={"language"}
              size={20}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <Image source={PNGIcons.preference} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.header}>
        <CustomText
          label="MOMENTS"
          fontSize={14}
          fontFamily={fonts.medium}
          color={COLORS.white3}
          lineHeight={14 * 1.4}
        />
        <TouchableOpacity style={styles.playAllButton} activeOpacity={0.8}>
          <Icons
            family="MaterialIcons"
            name="play-arrow"
            size={18}
            color={COLORS.inputBg}
          />
          <CustomText
            label="PLAY ALL"
            fontSize={14}
            fontFamily={fonts.medium}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.momentsContainer}
      >
        <TouchableOpacity style={styles.addMomentButton}>
          <Icons
            family="AntDesign"
            name="plus"
            size={28}
            color={COLORS.white}
          />
        </TouchableOpacity>
        {/* Moment Cards */}
        <TouchableOpacity style={styles.momentCard}>
          <Image style={styles.momentImage} source={FeedsImages.imageBG} />
          <View style={styles.momentText}>
            <CustomText
              label="Firstname"
              fontSize={12}
              fontFamily={fonts.medium}
              color={COLORS.white}
            />
            <CustomText
              label="Surname"
              fontSize={12}
              fontFamily={fonts.medium}
              color={COLORS.white}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.momentCard}>
          <Image style={styles.momentImage} source={FeedsImages.imageBG} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Moments;

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.inputBg,
    paddingBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  feedBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderRadius: 99,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  playAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  momentsContainer: {
    paddingHorizontal: 8,
  },
  addMomentButton: {
    width: 104,
    height: 184,
    backgroundColor: COLORS.black,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderColor: COLORS.inputBg,
    borderWidth: 1,
  },
  momentCard: {
    width: 108,
    height: 184,
    marginRight: 12,
    borderWidth: 2,
    borderColor: COLORS.white,
    padding: 3,
    borderRadius: 8,
  },
  momentImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "stretch",
  },
  momentText: {
    position: "absolute",
    bottom: 8,
    left: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconWrapper: {
    height: 32,
    width: 32,
    borderRadius: 99,
    borderColor: COLORS.inputBg,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    height: 20,
    width: 20,
    tintColor: COLORS.white,
  },
});

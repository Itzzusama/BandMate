import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";

import CustomBlurComponent from "../../../../components/CustomBlurComponent";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import Icons from "../../../../components/Icons";

import { PNGIcons } from "../../../../assets/images/icons";
import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const Header = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.header, { top: insets.top + 10 }]}>
        <CustomBlurComponent
          blurAmount={0.1}
          width={44}
          height={44}
          borderRadius={100}
          backgroundColor={"#12121229"}
          onPress={() => navigation.goBack()}
        >
          <Icons
            family="Feather"
            name="chevron-left"
            size={22}
            color={COLORS.white}
          />
        </CustomBlurComponent>

        <CustomText
          label={"Sliverado"}
          fontFamily={fonts.semiBold}
          fontSize={20}
          lineHeight={20 * 1.4}
          marginLeft={16}
          color={COLORS.white}
        />

        <View style={styles.rightIcons}>
          <CustomBlurComponent
            width={44}
            height={44}
            borderRadius={100}
            backgroundColor={"#00000029"}
          >
            <Image source={PNGIcons.search} style={styles.iconStyle} />
          </CustomBlurComponent>
          <CustomBlurComponent
            width={44}
            height={44}
            borderRadius={100}
            backgroundColor={"#00000029"}
          >
            <Image source={PNGIcons.share} style={styles.iconStyle} />
          </CustomBlurComponent>
          <CustomBlurComponent
            width={44}
            height={44}
            borderRadius={100}
            backgroundColor={"#00000029"}
          >
            <Image source={PNGIcons.bag} style={styles.iconStyle} />
          </CustomBlurComponent>
        </View>
      </View>

      {/* Sponsored pill - mid-left */}
      <View style={[styles.sponsoredWrapper, { top: insets.top + 68 }]}>
        <CustomText
          label={"Sponsored"}
          fontFamily={fonts.medium}
          fontSize={14}
          lineHeight={14 * 1.4}
          color={COLORS.white}
        />
      </View>

      {/* Right side mid icons */}
      <View style={[styles.midRightIcons, { top: insets.top + 68 }]}>
        <CustomBlurComponent
          width={44}
          height={44}
          borderRadius={100}
          backgroundColor={"#00000029"}
        >
          <Image source={Images.qrcode} style={styles.iconStyle} />
        </CustomBlurComponent>
      </View>

      {/* Bottom center CTA */}
      <View style={styles.bottomCtaWrapper}>
        <CustomBlurComponent
          width={210}
          height={35}
          borderRadius={100}
          backgroundColor={"#00000029"}
        >
          <View style={styles.ctaContent}>
            <CustomText
              label={"Find similar products"}
              fontFamily={fonts.medium}
              fontSize={14}
              lineHeight={14 * 1.4}
              color={COLORS.white}
            />
            <Icons
              family="Feather"
              name="shopping-bag"
              size={18}
              marginLeft={8}
              color={COLORS.white}
            />
          </View>
        </CustomBlurComponent>
      </View>

      {/* Swiper indicators */}
      <View style={styles.swiperWrapper}>
        <View style={[styles.swiperBar, styles.swiperBarActive]} />
        <View style={styles.swiperBar} />
        <View style={styles.swiperBar} />
      </View>

      <ImageFast source={Images.jeep} style={styles.carMain} removeLoading />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  carMain: {
    width: "100%",
    height: 400,
  },
  mainContainer: {
    padding: 6,
    backgroundColor: "#9f7d5b",
  },
  header: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 999,
    left: 12,
    width: "95%",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 140,
    marginLeft: "auto",
  },
  sponsoredWrapper: {
    position: "absolute",
    zIndex: 998,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#12121229",
    borderRadius: 99,
    left: 12,
  },
  midRightIcons: {
    position: "absolute",
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 100,
    zIndex: 998,
  },
  bottomCtaWrapper: {
    position: "absolute",
    // left: "50%",
    // right: "50%",
    top: 335,
    alignItems: "center",
    zIndex: 998,
    alignSelf: "center",
  },
  ctaContent: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  swiperWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 385,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    zIndex: 997,
  },
  swiperBar: {
    flex: 1,
    height: 4,
    borderRadius: 100,
    backgroundColor: "#FFFFFF55",
    marginHorizontal: 4,
  },
  swiperBarActive: {
    backgroundColor: "#FFFFFF",
  },
  iconStyle: {
    height: 20,
    width: 20,
    tintColor: COLORS.white,
  },
});

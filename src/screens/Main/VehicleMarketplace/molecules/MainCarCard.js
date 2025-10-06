import { Image, ScrollView, StyleSheet, View } from "react-native";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import DashboardProductCard from "../../VehicleDashboard/molecules/DashboardProductCard";
import CarCard from "./CarCard";
import DealCard from "./DealCard";

import { PNGIcons } from "../../../../assets/images/icons";
import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const MainCarCard = ({
  car,
  imgText,
  threeText,
  imgTwoText,
  title,
  sub,
  titleTwo,
  highlight,
  highlightText,
  isTextReverse,
  isImage,
  isProduct,
  isDealCardChange,
  paddingHorizontal = 12,
  backgroundColor,
  paddingVertical,
  isBorder = true,
  marginTop,
  isTop,
  images = [
    Images.saveMoney,
    Images.saveMoney,
    Images.saveMoney,
    Images.saveMoney,
  ],
  image,
}) => {
  return (
    <View
      style={{ paddingHorizontal, backgroundColor, paddingVertical, marginTop }}
    >
      {imgText ? (
        <View style={styles.row}>
          <View style={styles.seeMore}>
            <ImageFast
              source={image || PNGIcons.bookMark}
              style={{ height: 18, width: 18 }}
            />

            <CustomText
              label={title || "New Deals"}
              fontSize={18}
              fontFamily={fonts.medium}
              lineHeight={18 * 1.4}
            />
          </View>

          <View style={styles.seeMore}>
            <CustomText
              label={"SEE MORE"}
              fontSize={12}
              lineHeight={12 * 1.4}
              fontFamily={fonts.semiBold}
            />
            <Image
              source={PNGIcons.forwardPurple}
              style={[styles.forwardPurple]}
            />
          </View>
        </View>
      ) : threeText ? (
        <View style={styles.row}>
          <View>
            <CustomText
              label={title || "Your Daily Update"}
              fontSize={12}
              fontFamily={fonts.medium}
              lineHeight={12 * 1.4}
            />
            <CustomText
              label={titleTwo || "Your Daily Update"}
              fontSize={12}
              fontFamily={fonts.medium}
              color={COLORS.gray1}
              lineHeight={12 * 1.4}
            />

            <CustomText
              label={sub || "Electronics"}
              fontSize={18}
              fontFamily={fonts.medium}
              lineHeight={18 * 1.4}
            />
          </View>

          <View style={styles.seeMore}>
            <CustomText
              label={"SEE MORE"}
              fontSize={12}
              lineHeight={12 * 1.4}
              fontFamily={fonts.semiBold}
            />
            <Image
              source={PNGIcons.forwardPurple}
              style={styles.forwardPurple}
            />
          </View>
        </View>
      ) : highlightText ? (
        <View style={styles.row}>
          <View>
            <CustomText
              label={title || "Best of 2025"}
              fontSize={12}
              fontFamily={fonts.medium}
              color={COLORS.gray1}
              lineHeight={12 * 1.4}
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CustomText
                label={sub || "Top"}
                fontSize={18}
                fontFamily={fonts.medium}
                lineHeight={18 * 1.4}
              />
              <CustomText
                label={highlight || "Cars"}
                fontSize={18}
                fontFamily={fonts.medium}
                marginLeft={4}
                lineHeight={18 * 1.4}
                color={COLORS.darkPurple}
              />
            </View>
          </View>

          <View style={styles.seeMore}>
            <CustomText
              label={"SEE MORE"}
              fontSize={12}
              lineHeight={12 * 1.4}
              fontFamily={fonts.semiBold}
            />
            <Image
              source={PNGIcons.forwardPurple}
              style={styles.forwardPurple}
            />
          </View>
        </View>
      ) : imgTwoText ? (
        <View style={styles.row}>
          <View style={styles.seeMore}>
            {isImage && (
              <ImageFast
                source={image || PNGIcons.bookMark}
                style={{ height: 18, width: 18 }}
              />
            )}

            {isTextReverse ? (
              <View>
                <CustomText
                  label={title || "You Would Not Like To Miss!"}
                  fontSize={12}
                  fontFamily={fonts.medium}
                  color={COLORS.gray1}
                  lineHeight={12 * 1.4}
                />
                <CustomText
                  label={sub || "New Deals"}
                  fontSize={18}
                  fontFamily={fonts.medium}
                  lineHeight={18 * 1.4}
                />
              </View>
            ) : (
              <View>
                <CustomText
                  label={title || "New Deals"}
                  fontSize={18}
                  fontFamily={fonts.medium}
                  lineHeight={18 * 1.4}
                />
                <CustomText
                  label={sub || "You Would Not Like To Miss!"}
                  fontSize={12}
                  fontFamily={fonts.medium}
                  color={COLORS.gray1}
                  lineHeight={12 * 1.4}
                />
              </View>
            )}
          </View>

          <View style={styles.seeMore}>
            <CustomText
              label={"SEE MORE"}
              fontSize={12}
              lineHeight={12 * 1.4}
              fontFamily={fonts.semiBold}
            />
            <Image
              source={PNGIcons.forwardPurple}
              style={styles.forwardPurple}
            />
          </View>
        </View>
      ) : (
        <View style={styles.row}>
          <CustomText
            label={title || "Cars"}
            fontSize={18}
            fontFamily={fonts.medium}
            lineHeight={18 * 1.4}
            color={isBorder ? COLORS.primaryColor : "#fff"}
          />

          <View style={styles.seeMore}>
            <CustomText
              label={"SEE MORE"}
              fontSize={12}
              lineHeight={12 * 1.4}
              fontFamily={fonts.semiBold}
              color={isBorder ? COLORS.primaryColor : "#fff"}
            />
            <Image
              source={PNGIcons.forwardPurple}
              style={styles.forwardPurple}
            />
          </View>
        </View>
      )}

      {car ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map(({ index }) => (
            <CarCard isRental isTop={isTop} />
          ))}
        </ScrollView>
      ) : isProduct ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map(({ index }) => (
            <DashboardProductCard />
          ))}
        </ScrollView>
      ) : isImage ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {images?.map((item, index) => {
            return (
              <View
                style={{
                  height: 80,
                  width: "49%",
                }}
              >
                <ImageFast
                  source={item}
                  style={{ height: "100%", width: "100%", borderRadius: 8 }}
                />
              </View>
            );
          })}
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4].map(({ index }) => (
            <DealCard isChange={isDealCardChange} />
          ))}
        </ScrollView>
      )}
      {isBorder && <View style={styles.border} />}
    </View>
  );
};

export default MainCarCard;

const styles = StyleSheet.create({
  seeMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  forwardPurple: {
    height: 20,
    width: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  border: {
    height: 2,
    backgroundColor: COLORS.lightGray,
    marginVertical: 12,
  },
});

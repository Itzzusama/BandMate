import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";
import Icons from "../../../../components/Icons";
import { PNGIcons } from "../../../../assets/images/icons";
import { useNavigation } from "@react-navigation/native";

const CarCard = ({ marketplace, isChange = false, isRental, isTop }) => {
  const navigation = useNavigation();
  if (marketplace) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("RentalDetailPage")}
        activeOpacity={0.7}
        style={{ width: "70%", marginRight: 8 }}
      >
        <ImageFast
          source={Images.charity}
          style={{ height: 135, width: "100%", borderRadius: 16 }}
        />
        <View style={{ marginVertical: 8 }}>
          <View style={styles.row}>
            <CustomText
              label={"Volkswagen"}
              fontSize={12}
              fontFamily={fonts.medium}
              lineHeight={12 * 1.4}
            />
            <ImageFast
              source={Images.check}
              style={{ height: 12, width: 12, marginLeft: 4 }}
              resizeMode={"contain"}
            />
          </View>
          <View style={styles.row}>
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 99,
                marginRight: 4,
                backgroundColor: COLORS.darkPurple,
              }}
            />
            <CustomText
              label={"Volkswagen"}
              fontSize={12}
              fontFamily={fonts.medium}
              lineHeight={12 * 1.4}
            />
          </View>
          <View style={styles.row}>
            <CustomText
              label={"$120,095"}
              fontSize={12}
              fontFamily={fonts.medium}
              lineHeight={12 * 1.4}
              color={"#64CD75"}
            />
            <CustomText
              label={"$140"}
              fontSize={10}
              lineHeight={10 * 1.4}
              marginLeft={2}
              textDecorationLine={"line-through"}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  if (isRental) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("RentalDetailPage")}
        activeOpacity={0.7}
        // onPress={onPress}
        style={[styles.cardAltContainer, isTop && { flexDirection: "row", marginRight:16 }]}
      >
        {isTop && (
          <CustomText
            label={"1"}
            fontFamily={fonts.semiBold}
            fontSize={40}
            lineHeight={40 * 1.4}
            color={COLORS.gray1}
            marginRight={8}
          />
        )}

        <View>
          <View>
            <ImageFast source={Images.charity} style={styles.cardAltImage} />
            <View style={styles.overlayIcon}>
              <Image
                source={Images.user}
                style={{ height: 20, width: 20, borderRadius: 99 }}
              />
              <Image
                source={Images.saveIcon}
                style={{ height: 32, width: 32, resizeMode: "contain" }}
              />
            </View>

            <View style={styles.discountPill}>
              <View style={[styles.row, { alignItems: "center" }]}>
                <Image
                  source={PNGIcons.bookMark}
                  style={{ height: 10, width: 10, tintColor: COLORS.white }}
                />
                <CustomText
                  label={"-20%"}
                  color={COLORS.white}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  marginLeft={2}
                  fontFamily={fonts.medium}
                />
              </View>
            </View>

            <View style={styles.sponsoredPill}>
              <CustomText
                label={"Sponsored"}
                color={COLORS.white}
                fontSize={12}
                lineHeight={12 * 1.4}
                fontFamily={fonts.medium}
              />
            </View>
          </View>

          <View style={styles.cardAltBody}>
            <View style={[styles.row, { alignItems: "center" }]}>
              <View style={styles.dot} />
              <CustomText
                label={"Chevrolet Camaro ZL1"}
                fontFamily={fonts.medium}
                fontSize={14}
                lineHeight={14 * 1.4}
                marginLeft={4}
              />
            </View>

            <View style={[styles.row, { marginTop: 4 }]}>
              <View style={styles.chip}>
                <Image source={Images.unlimited} style={styles.icon} />
                <CustomText
                  label={"Unlimited"}
                  fontSize={10}
                  lineHeight={10 * 1.4}
                  fontFamily={fonts.medium}
                  marginLeft={2}
                  color={COLORS.darkPurple}
                />
              </View>
              <View style={styles.chip}>
                <Image source={Images.door} style={styles.icon} />

                <CustomText
                  label={"5-doors"}
                  fontSize={10}
                  lineHeight={10 * 1.4}
                  marginLeft={2}
                  fontFamily={fonts.medium}
                  color={COLORS.darkPurple}
                />
              </View>
              <View style={styles.chip}>
                <Image source={Images.setting} style={styles.icon} />

                <CustomText
                  label={"Manual"}
                  fontSize={10}
                  lineHeight={10 * 1.4}
                  marginLeft={2}
                  color={COLORS.darkPurple}
                  fontFamily={fonts.medium}
                />
              </View>
            </View>

            <View style={[styles.row, { marginTop: 8, alignItems: "center" }]}>
              <View style={styles.newBadge}>
                <CustomText
                  label={"NEW"}
                  fontSize={10}
                  lineHeight={10 * 1.4}
                  color={"#1E9053"}
                  fontFamily={fonts.semiBold}
                />
              </View>
              <ImageFast
                source={Images.blackStar}
                style={{ height: 14, width: 14 }}
              />
              <CustomText label={"4.8"} fontSize={14} lineHeight={14 * 1.4} />
              <CustomText
                label={"(128 reviews)"}
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.gray1}
                marginLeft={2}
              />
            </View>

            <View style={[styles.row, { marginTop: 6 }]}>
              <Icons
                family="Feather"
                name="calendar"
                size={12}
                color={COLORS.primaryColor}
              />
              <CustomText
                label={"from Aug 22, 2024"}
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.gray1}
                marginLeft={6}
              />
            </View>

            <View style={[styles.row, { marginTop: 2 }]}>
              <CustomText
                label={"$40"}
                fontSize={18}
                lineHeight={18 * 1.4}
                fontFamily={fonts.semiBold}
                color="#64CD75"
              />
              <CustomText
                label={"per day"}
                fontSize={14}
                lineHeight={14 * 1.4}
                marginLeft={6}
                color={COLORS.gray1}
              />
            </View>

            <View style={styles.matchPill}>
              <CustomText
                label={"90% MATCH"}
                fontSize={10}
                fontFamily={fonts.semiBold}
                color="#1F9D43"
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  if (isChange) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        // onPress={onPress}
        onPress={() => navigation.navigate("RentalDetailPage")}
        style={styles.cardAltContainer}
      >
        <View>
          <ImageFast source={Images.charity} style={styles.cardAltImage} />
          <View style={styles.overlayIcon}>
            <Image
              source={Images.user}
              style={{ height: 20, width: 20, borderRadius: 99 }}
            />
            <Image
              source={Images.saveIcon}
              style={{ height: 32, width: 32, resizeMode: "contain" }}
            />
          </View>
        </View>

        <View style={styles.cardAltBody}>
          <CustomText
            label={"Santiago to Buenos Aires"}
            fontFamily={fonts.medium}
            fontSize={12}
            lineHeight={12 * 1.4}
          />

          <View style={[styles.row, { marginTop: 4 }]}>
            <Icons
              family="Feather"
              name="calendar"
              size={10}
              color={COLORS.primaryColor}
            />
            <CustomText
              label={"Aug 22, 2024 at 09:00 to 13:35"}
              fontSize={10}
              lineHeight={10 * 1.4}
              color={COLORS.gray1}
              marginLeft={4}
            />
          </View>

          <CustomText
            label={"Direct - 4h35m"}
            fontSize={10}
            lineHeight={10 * 1.4}
            color={COLORS.gray1}
            marginTop={4}
          />

          <View style={[styles.row, { marginTop: 4 }]}>
            <CustomText
              label={"$40"}
              fontSize={12}
              lineHeight={12 * 1.4}
              fontFamily={fonts.medium}
              color="#64CD75"
            />
            <Icons
              family="MaterialCommunityIcons"
              name="seat"
              size={14}
              color={COLORS.black}
              marginLeft={8}
            />
            <CustomText
              label={"2 seats left"}
              fontSize={10}
              lineHeight={10 * 1.4}
              marginLeft={4}
              fontFamily={fonts.medium}
              color={COLORS.gray1}
            />
          </View>

          <View
            style={[
              styles.row,
              { marginTop: 4, justifyContent: "space-between" },
            ]}
          >
            <View style={[styles.row]}>
              <ImageFast source={Images.user} style={styles.avatar} />
              <CustomText
                label={"Viktor & 3 others"}
                fontSize={12}
                lineHeight={12 * 1.4}
                marginLeft={6}
              />
            </View>
          </View>
          <View style={styles.matchPill}>
            <CustomText
              label={"90% MATCH"}
              fontSize={10}
              fontFamily={fonts.semiBold}
              color="#1F9D43"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default CarCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardAltContainer: {
    width: 250,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginRight: 8,
  },
  cardAltImage: {
    height: 135,
    width: "100%",
    borderRadius: 16,
  },
  overlayIcon: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    right: 10,
    top: 10,
  },
  discountPill: {
    position: "absolute",
    left: 12,
    bottom: 12,
    backgroundColor: "#1D9053",
    borderRadius: 6,
    padding: 4,
  },
  discountIcon: {
    height: 14,
    width: 14,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
  sponsoredPill: {
    position: "absolute",
    right: 12,
    bottom: 12,
    backgroundColor: "#6C6C75",
    borderRadius: 99,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },

  cardAltBody: {
    // padding: 8,
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 4,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.darkPurple,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4347FF29",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginRight: 2,
  },
  newBadge: {
    backgroundColor: "#1D905329",
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  avatar: {
    height: 18,
    width: 18,
    borderRadius: 9,
  },
  matchPill: {
    backgroundColor: "#EAF7EE",
    paddingHorizontal: 3,
    borderRadius: 2,
    width: "31%",
    alignItems: "center",
    marginTop: 2,
  },
  icon: {
    height: 12,
    width: 12,
  },
});

import { Image, ScrollView, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import ErrorComponent from "../../../../components/ErrorComponent";
import { Images } from "../../../../assets/images";
import ReviewCard from "./ReviewCard";

const RatingAndReview = ({ title = "Ratings & Reviews" }) => {
  const categories = [
    { label: "Cleanliness", rating: 5, percent: 99 },
    { label: "Maintenance", rating: 4, percent: 99 },
    { label: "Communication", rating: 3, percent: 99 },
    { label: "Convenience", rating: 2, percent: 99 },
    { label: "Accuracy", rating: 1, percent: 99 },
  ];

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.row}>
        <View style={styles.rowGap}>
          <Image source={PNGIcons.rating} style={styles.icon} />
          <CustomText
            label={title}
            fontFamily={fonts.semiBold}
            fontSize={16}
            lineHeight={16 * 1.4}
          />
        </View>
        <Icons name={"chevron-down"} size={20} />
      </View>

      {/* Score + Category bars */}
      <View style={styles.scoreRow}>
        <View style={styles.scoreWrap}>
          <CustomText
            label={"5"}
            fontFamily={fonts.semiBold}
            fontSize={64}
            lineHeight={64 * 1.4}
          />
          <View style={styles.outOfWrap}>
            <CustomText
              label={"/5"}
              fontFamily={fonts.medium}
              color={COLORS.gray1}
              fontSize={20}
              lineHeight={20 * 1.4}
            />
            <CustomText
              label={"(Based of 95 ratings)"}
              color={COLORS.subtitle}
              fontFamily={fonts.medium}
              fontSize={12}
              lineHeight={12 * 1.4}
              marginBottom={5}
              marginLeft={6}
            />
          </View>
        </View>
      </View>

      <View style={styles.categoryCol}>
        {categories.map((c, idx) => (
          <View key={`cat-${idx}`} style={styles.categoryRow}>
            <View style={{ width: "28%" }}>
              <CustomText
                label={c.label}
                fontFamily={fonts.medium}
                fontSize={12}
                lineHeight={12 * 1.4}
              />
            </View>
            <View style={styles.progressWrap}>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${c.percent}%`,
                      backgroundColor: COLORS.darkPurple,
                    },
                  ]}
                />
              </View>
              <View style={styles.starWrap}>
                <CustomText
                  label={`${c.rating}`}
                  fontFamily={fonts.medium}
                  lineHeight={14 * 1.4}
                />
                <Image
                  source={Images.blackStar}
                  style={{ height: 16, width: 16 }}
                />
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Customer Reviews header */}
      <View style={[{ marginTop: 8 }]}>
        <View style={styles.rowCol}>
          <CustomText
            label={"Customer Reviews"}
            fontFamily={fonts.semiBold}
            fontSize={18}
          />
          <View style={styles.seeAllRow}>
            <CustomText
              label={"See all"}
              fontFamily={fonts.medium}
              fontSize={12}
              lineHeight={12 * 1.4}
            />
            <Icons
              family="Feather"
              name="arrow-up-right"
              color={COLORS.primaryColor}
              size={12}
            />
          </View>
        </View>
        <CustomText
          label={"(Total 1.2k reviews)"}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
          fontSize={12}
          lineHeight={12 * 1.4}
        />
      </View>

      {/* Filters */}
      <View style={styles.filtersRow}>
        <View style={styles.chipNeutral}>
          <CustomText label={"All"} fontFamily={fonts.semiBold} />
        </View>

        <View style={styles.chipSelected}>
          <CustomText
            label={"5"}
            fontFamily={fonts.medium}
            lineHeight={14 * 1.4}
          />
          <Image source={Images.blackStar} style={{ height: 16, width: 16 }} />
          <Icons family="Feather" name="chevron-down" size={14} />
        </View>

        <View style={styles.chipNeutral}>
          <CustomText
            label={"Most recent"}
            fontFamily={fonts.medium}
            lineHeight={14 * 1.4}
          />
          <Icons family="Feather" name="chevron-down" size={14} />
        </View>
      </View>

      <View style={styles.filtersRow2}>
        <View style={[styles.chipNeutral, { gap: 6 }]}>
          <CustomText
            label={"Images only"}
            fontFamily={fonts.medium}
            lineHeight={14 * 1.4}
          />
          <Icons family="Feather" name="camera" size={14} />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 12, gap: 12 }}
      >
        <ReviewCard />
        <ReviewCard />
      </ScrollView>
    </View>
  );
};

export default RatingAndReview;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rowCol: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: COLORS.primaryColor,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  scoreWrap: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  outOfWrap: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  categoryCol: {
    flex: 1,
    gap: 10,
    marginBottom: 12,
  },
  categoryRow: {
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  progressWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "70%",
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.inputBg,
    borderRadius: 100,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    borderRadius: 100,
  },
  starWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  seeAllRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  filtersRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  filtersRow2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  chipNeutral: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  chipSelected: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 100,
    borderColor: COLORS.black,
    backgroundColor: COLORS.lightGray,
  },
});

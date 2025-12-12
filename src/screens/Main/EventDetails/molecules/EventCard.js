import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../../../../components/CustomText";
import { BlurView } from "@react-native-community/blur";
import { Images } from "../../../../assets/images";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";

const EventCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.9}>
      <View style={styles.imageWrapper}>
        <Image
          source={item?.image}
          style={styles.eventImage}
          resizeMode="cover"
        />

        {item?.discount && (
          <View style={styles.discountBlurWrapper}>
            <Image source={Images.tag} style={{ height: 12, width: 12 }} />
            <CustomText
              label={`-${item.discount}%`}
              fontSize={12}
              fontFamily={fonts.medium}
            />
          </View>
        )}

        {/* Sponsored Label */}
        {item?.isSponsored && (
          <BlurView
            blurAmount={16}
            blurType="light"
            style={styles.sponsoredBlurWrapper}
          >
            <View style={styles.sponsoredBadge}>
              <CustomText
                label="Sponsored"
                fontSize={12}
                fontFamily={fonts.medium}
              />
            </View>
          </BlurView>
        )}

        <View style={styles.bookmarkWrapper}>
          <BlurView
            blurType="light"
            blurAmount={16}
            style={styles.bookmarkBlur}
          />
          <Image source={Images.add_save} style={styles.bookmarkIcon} />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <View style={styles.newRow}>
          {item?.isNew && (
            <View style={styles.newTag}>
              <CustomText
                label="NEW"
                color="#1D9053"
                fontSize={8}
                fontFamily={fonts.semiBold}
              />
            </View>
          )}

          <CustomText
            label={item?.title}
            fontSize={14}
            fontFamily={fonts.medium}
          />
        </View>

        {/* Venue */}
        <View style={styles.row}>
          <Image
            source={Images.event}
            style={{
              width: 12,
              height: 12,
              tintColor: COLORS.white,
              resizeMode: "contain",
            }}
          />
          <CustomText
            label="Venue"
            fontSize={12}
            fontFamily={fonts.medium}
            marginLeft={2}
          />
        </View>

        {/* Date Range */}
        <View style={styles.row}>
          <Image
            source={Images.cal_outline}
            style={{
              width: 12,
              height: 12,
              tintColor: COLORS.white,
              resizeMode: "contain",
            }}
          />
          <CustomText
            label={`${item.startDate} - ${item.endDate}`}
            fontSize={12}
            color={COLORS.white2}
            marginLeft={2}
          />
        </View>

        {/* Price + Tickets Left */}
        <View style={styles.row}>
          <CustomText
            label={`$${item.price}`}
            fontSize={12}
            color="#1D9053"
            fontFamily={fonts.medium}
          />
          <View
            style={{
              height: 12,
              width: 1,
              backgroundColor: "#FFFFFF29",
              borderRadius: 99,
              marginHorizontal: 4,
            }}
          />
          <Image
            source={Images.ticket_card}
            style={{
              width: 12,
              height: 12,
              tintColor: COLORS.white,
              resizeMode: "contain",
            }}
          />
          <CustomText
            label={`${item.availableTickets} tickets left`}
            fontSize={12}
            fontFamily={fonts.medium}
            marginLeft={2}
          />
        </View>

        {/* Friends Row */}
        <View style={[styles.row]}>
          <Image source={item?.friends?.[0]?.avatar} style={styles.avatar} />
          <CustomText
            label={`${item.friends[0].name}`}
            fontSize={12}
            fontFamily={fonts.medium}
            marginLeft={4}
          />
          <CustomText
            label={` & ${item.friends.length - 1} others`}
            fontSize={12}
            color={COLORS.white2}
          />
        </View>

        {/* Match % */}
        <View style={styles.matchTag}>
          <CustomText
            label={`${item.matchPercent}% MATCH`}
            color={"#1D9053"}
            fontSize={12}
            fontFamily={fonts.medium}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: 240,
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 8,
    paddingLeft: 0,
    marginRight: 2,
    paddingTop: 0,
  },

  imageWrapper: {
    width: "100%",
    height: 135,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 6,
  },

  eventImage: {
    width: "100%",
    height: "100%",
  },

  discountBlurWrapper: {
    position: "absolute",
    bottom: 8,
    left: 8,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#1D9053",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    paddingHorizontal: 6,
  },

  sponsoredBlurWrapper: {
    position: "absolute",
    bottom: 8,
    right: 8,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.16)",
  },

  bookmarkWrapper: {
    height: 32,
    width: 32,
    borderRadius: 16,
    position: "absolute",
    top: 8,
    right: 8,
    overflow: "hidden",
  },

  bookmarkBlur: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },

  bookmarkIcon: {
    width: 18,
    height: 18,
    tintColor: COLORS.white,
    resizeMode: "contain",
    alignSelf: "center",
    top: 7,
  },

  discountBadge: {
    paddingVertical: 2,
    paddingHorizontal: 10,
  },

  sponsoredBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
  },

  content: {},

  newRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  newTag: {
    backgroundColor: "#1D905329",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  avatar: {
    width: 14,
    height: 14,
    borderRadius: 20,
  },

  matchTag: {
    marginTop: 5,
    backgroundColor: "#1D905329",
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
});

import { StyleSheet, Image, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import TopTab from "../../../../components/TopTab";
import { PNGIcons } from "../../../../assets/images/icons";

const PlanOptionCard = ({ iconName, title, subtitle, active, rightTag }) => {
  return (
    <View style={[styles.card, active && styles.cardActive]}>
      <View style={styles.rowBetween}>
        <View>
          <View style={styles.rowCenter}>
            <Image source={Images.blackStar} style={styles.starIcon} />
            <CustomText
              label={"4.7"}
              fontSize={16}
              lineHeight={16 * 1.4}
              fontFamily={fonts.semiBold}
            />
            <CustomText
              label={"(1.2k reviews)"}
              fontSize={12}
              lineHeight={12 * 1.4}
              fontFamily={fonts.medium}
              color={COLORS.gray1}
              marginLeft={4}
            />
            <CustomText
              label={"(1.2k rentals)"}
              fontSize={12}
              lineHeight={12 * 1.4}
              fontFamily={fonts.medium}
              color={COLORS.gray1}
              marginLeft={4}
            />

            <View style={styles.redContainer}>
              <CustomText
                label={"Best"}
                fontSize={12}
                lineHeight={12 * 1.4}
                fontFamily={fonts.medium}
                color={"#F63D4B"}
              />
            </View>
          </View>
          <View>
            <TopTab
              rounded
              tabNames={["New", "Car", "Sedan"]}
              tab={0}
              marginTop={8}
              marginBottom={6}
              activeColor="#9F7D5B"
            />
          </View>
        </View>

        <View style={styles.discountContainer}>
          <CustomText
            label={"-20%"}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
            color={COLORS.white}
          />
        </View>
      </View>

      <View style={styles.rowTitle}>
        <View style={styles.dot} />
        <CustomText
          label={title}
          fontFamily={fonts.semiBold}
          fontSize={24}
          lineHeight={24 * 1.4}
          marginLeft={4}
        />
      </View>

      <View style={styles.tag}>
        <Image
          source={PNGIcons.trophy}
          style={{
            height: 14,
            width: 14,
            marginRight: 4,
            tintColor: COLORS.primaryColor,
          }}
        />
        <CustomText
          label={"Earn 15 pts"}
          fontFamily={fonts.medium}
          fontSize={12}
          lineHeight={12 * 1.4}
        />
      </View>
      <View style={styles.tag}>
        <Image
          source={PNGIcons.info}
          style={{ height: 14, width: 14, marginRight: 4 }}
        />
        <CustomText
          label={"This product is not yet available and will"}
          fontFamily={fonts.medium}
          fontSize={12}
          lineHeight={12 * 1.4}
        />
        <Image
          source={PNGIcons.bell}
          style={{ height: 14, width: 14, marginLeft: 4 }}
        />
      </View>
      <View style={styles.tag}>
        <CustomText
          label={"ID: 456879DD8"}
          fontFamily={fonts.medium}
          fontSize={12}
          lineHeight={12 * 1.4}
        />

        <Image
          source={Images.copy}
          style={{ height: 14, width: 14, marginLeft: 4 }}
        />
      </View>
    </View>
  );
};

export default PlanOptionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    marginTop: 4,
  },
  cardActive: {
    borderColor: COLORS.primaryColor,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    height: 20,
    width: 20,
  },
  discountContainer: {
    height: 56,
    width: 56,
    backgroundColor: "#9F7D5B",
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  rowTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 99,
    backgroundColor: "#627B76",
  },
  tag: {
    backgroundColor: COLORS.lightGray,
    padding: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 4,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  redContainer: {
    backgroundColor: "#F63D4B29",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderRadius: 4,
    marginLeft: 4,
  },
});

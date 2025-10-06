import { Image, Pressable, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import React, { useState } from "react";
import OptionItem from "./OptionItem";
import TopTabWithBG from "../../../../components/TopTabWithBG";

const StandardRentalCard = ({ title, isImage, options, isChange, tab }) => {
  const [selectedIndex, setSelectedIndex] = useState(2);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <CustomText
            label={title || "Standard Rental Period"}
            fontFamily={fonts.semiBold}
            fontSize={16}
            lineHeight={16 * 1.4}
          />
          {isImage && (
            <Image source={Images.calender} style={styles.calendarIcon} />
          )}
        </View>
        <Icons
          family="Feather"
          name="chevron-down"
          size={22}
          color={COLORS.black}
        />
      </View>
      {tab && (
        <TopTabWithBG
          tab={"Hourly"}
          tabNames={["Hourly", "Daily"]}
          marginVertical={12}
        />
      )}

      {options?.map((item, index) => (
        <OptionItem
          isChange={isChange}
          key={`option-${index}`}
          badgeLabel={item.badgeLabel}
          badgeBg={item.badgeBg}
          badgeColor={item.badgeColor}
          subtitle={item.subtitle}
          title={item.title}
          price={item.price}
          extraPrice={item.extraPrice}
          includedText={item.includedText}
          selected={selectedIndex === index}
          onPress={() => setSelectedIndex(index)}
        />
      ))}
    </View>
  );
};

export default StandardRentalCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    marginTop: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarIcon: {
    height: 20,
    width: 20,
    marginLeft: 6,
  },
  optionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    marginTop: 12,
  },
  optionCardActive: {
    // borderColor: COLORS.darkPurple,
  },
  optionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

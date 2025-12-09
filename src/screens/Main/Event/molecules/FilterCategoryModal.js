import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import Icons from "../../../../components/Icons";
import MultiRangeSlider from "../../../../components/RangeSliderTwoWay";
import CustomButton from "../../../../components/CustomButton";
import { PNGIcons } from "../../../../assets/images/icons";

const FilterCategoryModal = ({ filterType, onBack, filters, onApply }) => {
  const [selectedSort, setSelectedSort] = useState(filters.sortBy);
  const [selectedDate, setSelectedDate] = useState(filters.date);
  const [distance, setDistance] = useState(filters.distance);

  const applyFilter = () => {
    if (filterType === "Sort By") {
      const mapSortKeys = {
        Latest: "latest",
        "Best Rated": "bestRating",
        "Lowest to Highest Price": "priceLowToHigh",
        "Highest Price To Lowest": "priceHighToLow",
      };

      onApply({ sortBy: mapSortKeys[selectedSort] || null });
    } else if (filterType === "Date") {
      const dateMap = {
        "Within A Day": 1,
        "Within 3 Days": 3,
        "Within 7 Days": 7,
        "Within 2 Weeks": 14,
        "Within A Month": 30,
      };

      const days = dateMap[selectedDate];

      if (days) {
        const today = new Date();
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + days);

        const format = (d) =>
          d.getFullYear() +
          "-" +
          String(d.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(d.getDate()).padStart(2, "0");

        onApply({
          startDateFrom: format(today),
          startDateTo: format(targetDate),
        });
      } else {
        onApply({ startDateFrom: null, startDateTo: null });
      }
    } else if (filterType === "Distance") {
      // Convert km to meters
      const min = (distance?.min ?? 3) * 1000;
      const max = (distance?.max ?? 50) * 1000;

      onApply({
        minDistance: min,
        maxDistance: max,
      });
    }
  };

  const dateOptions = [
    "Within A Day",
    "Within 3 Days",
    "Within 7 Days",
    "Within 2 Weeks",
    "Within A Month",
  ];
  return (
    <View>
      <View style={styles.header}>
        <CustomText
          label={filterType}
          fontFamily={fonts.semiBold}
          fontSize={24}
          lineHeight={24 * 1.4}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          activeOpacity={0.8}
          onPress={onBack}
        >
          <Image
            source={PNGIcons.white_cross}
            style={{ height: 20, width: 20 }}
          />
        </TouchableOpacity>
      </View>

      <CustomText
        label={"Find the perfect fit for you!"}
        color={COLORS.white3}
        fontSize={14}
        fontFamily={fonts.medium}
        marginBottom={2}
      />

      {filterType === "Sort By" && (
        <View style={{ marginTop: 16 }}>
          {[
            "Latest",
            "Best Rated",
            "Lowest to Highest Price",
            "Highest Price To Lowest",
          ].map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionRow}
              onPress={() => setSelectedSort(option)}
              activeOpacity={0.8}
            >
              <CustomText
                label={option}
                fontSize={16}
                fontFamily={fonts.medium}
              />
              {selectedSort === option ? (
                <Icons
                  family="MaterialCommunityIcons"
                  name={"radiobox-marked"}
                  size={22}
                  color={COLORS.btnColor}
                />
              ) : (
                <Icons
                  family="MaterialCommunityIcons"
                  name={"radiobox-blank"}
                  size={22}
                  color={COLORS.white3}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      {filterType === "Distance" && (
        <View style={{ marginTop: 16 }}>
          <MultiRangeSlider
            min={3}
            max={50}
            step={1}
            unit="km"
            sliderWidth={350}
          />
        </View>
      )}

      {filterType === "Date" && (
        <View style={{ marginTop: 10 }}>
          {dateOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionRow}
              onPress={() => setSelectedDate(option)}
              activeOpacity={0.8}
            >
              <CustomText
                label={option}
                fontSize={16}
                fontFamily={fonts.medium}
                color={COLORS.white}
              />
              <Icons
                family="MaterialCommunityIcons"
                name={
                  selectedDate === option ? "radiobox-marked" : "radiobox-blank"
                }
                size={22}
                color={
                  selectedDate === option ? COLORS.btnColor : COLORS.white3
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.bottomButtons}>
        <CustomButton
          title="Clear"
          width="48%"
          height={48}
          backgroundColor={COLORS.inputBg}
          color={COLORS.white}
          onPress={() => {
            if (filterType === "Sort By") onApply({ sortBy: null });

            if (filterType === "Date") onApply({ startDateFrom: null });

            if (filterType === "Distance")
              onApply({ minDistance: 3, maxDistance: 50 });
          }}
        />
        <CustomButton
          title="Confirm"
          width="48%"
          height={48}
          onPress={applyFilter}
        />
      </View>
    </View>
  );
};

export default FilterCategoryModal;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    borderRadius: 99,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.inputBg,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 100,
  },
  bottomButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 20,
  },
});

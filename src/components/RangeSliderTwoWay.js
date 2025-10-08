import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import fonts from "../assets/fonts";
import { COLORS } from "../utils/COLORS";
import CustomText from "./CustomText";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 30;

const MultiRangeSlider = ({
  color,
  height,
  width: thumbWidth,
  showValue = true,
  leftTitle,
  rightTitle,
  min = 18,
  max = 99,
  step = 1,
  initialLowValue = 18,
  initialHighValue = 50,
  onValuesChange = () => {},
}) => {
  const [range, setRange] = useState([initialLowValue, initialHighValue]);

  // keep internal state synced if props change
  useEffect(() => {
    setRange([initialLowValue, initialHighValue]);
  }, [initialLowValue, initialHighValue]);

  const handleValuesChange = (values) => {
    setRange(values);
    onValuesChange(values[0], values[1]); // send values to parent
  };

  return (
    <View style={styles.wrapper}>
      {!showValue && (
        <View style={styles.valuesRow}>
          <View style={styles.valueContainer}>
            <CustomText
              label={"Minimum age"}
              fontSize={12}
              color={COLORS.gray2}
              lineHeight={1.4 * 12}
            />
            <CustomText
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={1.4 * 16}
              label={`${range[0]} yrs`}
            />
          </View>

          <View style={styles.valueContainer}>
            <CustomText
              label={"Maximum age"}
              fontSize={12}
              color={COLORS.gray2}
              lineHeight={1.4 * 12}
            />
            <CustomText
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={1.4 * 16}
              label={`${range[1]} yrs`}
            />
          </View>
        </View>
      )}

      <MultiSlider
        values={range}
        sliderLength={SLIDER_WIDTH}
        onValuesChange={handleValuesChange}
        min={min}
        max={max}
        step={step}
        selectedStyle={{ backgroundColor: color || COLORS.primaryColor }}
        unselectedStyle={{ backgroundColor: "rgba(255, 255, 255, 0.20)" }}
        trackStyle={{ height: 4, borderRadius: 2 }}
        markerStyle={{
          height: height || 14,
          width: thumbWidth || 14,
          borderRadius: 99,
          backgroundColor: color || COLORS.primaryColor,
          top: 2,
        }}
      />

      {showValue && (
        <View style={styles.labelContainer}>
          <CustomText
            fontFamily={fonts.medium}
            color={"#848484"}
            fontSize={12}
            label={leftTitle || `${range[0]} yrs`}
          />
          <CustomText
            fontFamily={fonts.medium}
            color={"#848484"}
            fontSize={12}
            label={rightTitle || `${range[1]} yrs`}
          />
        </View>
      )}
    </View>
  );
};

export default MultiRangeSlider;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginTop: -4,
    marginBottom: 10,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SLIDER_WIDTH,
    marginTop: -12,
  },
  valuesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginVertical: 12,
  },
  valueContainer: {
    padding: 12,
    borderRadius: 12,
    width: "48%",
    backgroundColor: COLORS.lightGray,
  },
});

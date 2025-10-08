import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import fonts from "../assets/fonts";
import { COLORS } from "../utils/COLORS";
import CustomText from "./CustomText";
const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width - 40;
const MIN_VALUE = 18;
const MAX_VALUE = 99;

const MultiRangeSlider = ({ color, height, width, showValue = true }) => {
  const [range, setRange] = useState([MIN_VALUE, MAX_VALUE]);

  const onValuesChange = (values) => {
    setRange(values);
  };

  return (
    <View style={styles.wrapper}>
      {!showValue && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginVertical: 12,
          }}
        >
          <View style={styles.valueContainer}>
            <CustomText
              label={"Mininum (kW)"}
              fontSize={12}
              color={COLORS.gray2}
              lineHeight={1.4 * 12}
            />
            <CustomText
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={1.4 * 16}
              label={`$ ${range[0]}`}
            />
          </View>
          <View style={styles.valueContainer}>
            <CustomText
              label={"Mininum (kW)"}
              fontSize={12}
              color={COLORS.gray2}
              lineHeight={1.4 * 12}
            />
            <CustomText
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={1.4 * 16}
              label={`$ ${range[1]}`}
            />
          </View>
        </View>
      )}

      <MultiSlider
        values={range}
        sliderLength={SLIDER_WIDTH}
        onValuesChange={onValuesChange}
        min={MIN_VALUE}
        max={MAX_VALUE}
        step={1}
        selectedStyle={{ backgroundColor: color ? color : COLORS.primaryColor }}
        unselectedStyle={{ backgroundColor: "rgba(255, 255, 255, 0.20)" }}
        trackStyle={{ height: 4, borderRadius: 2 }}
        markerStyle={{
          height: height || 12,
          width: width || 12,
          borderRadius: 99,
          backgroundColor: color ? color : COLORS.primaryColor,
          top: 2,
        }}
      />
      {showValue && (
        <View style={styles.labelContainer}>
          <CustomText
            fontSize={12}
            color={"rgba(255, 255, 255, 0.6)"}
            label={`${range[0]} yrs`}
          />
          <CustomText
            fontSize={12}
            label={`${range[1]} yrs`}
            color={"rgba(255, 255, 255, 0.6)"}
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
  valueContainer: {
    padding: 12,
    borderRadius: 12,
    width: "48%",
    // alignItems: "center",
    backgroundColor: COLORS.lightGray,
  },
});

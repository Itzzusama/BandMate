import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import fonts from "../assets/fonts";
import { COLORS } from "../utils/COLORS";
import CustomText from "./CustomText";

const SLIDER_WIDTH = 350;
const MIN_VALUE = 1;
const MAX_VALUE = 100;

const MultiRangeSlider = ({
  color,
  height,
  width,
  showValue = true,
  leftTitle,
  rightTitle,
}) => {
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
        unselectedStyle={{ backgroundColor: "#414141" }}
        trackStyle={{ height: 4, borderRadius: 3 }}
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
            fontFamily={fonts.medium}
            color={"#848484"}
            fontSize={12}
            label={leftTitle || `$ ${range[0]}`}
          />
          <CustomText
            fontFamily={fonts.medium}
            color={"#848484"}
            fontSize={12}
            label={rightTitle || `$ ${range[1]}`}
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
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SLIDER_WIDTH,
    marginTop: -10,
  },
  valueContainer: {
    padding: 12,
    borderRadius: 12,
    width: "48%",
    // alignItems: "center",
    backgroundColor: COLORS.lightGray,
  },
});

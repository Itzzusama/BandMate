import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import { COLORS } from "../../../utils/COLORS";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import TopTabWithBG from "../../../components/TopTabWithBG";
import MultiRangeSlider from "../../../components/RangeSliderTwoWay";
import CustomButton from "../../../components/CustomButton";

const SliderFilter = ({ navigation }) => {
  const [tab, setTab] = useState("PS");
  return (
    <ScreenWrapper
      scrollEnabled
      paddingBottom={18}
      headerUnScrollable={() => <Header title={"Power"} onHelpPress />}
      footerUnScrollable={() => (
        <CustomButton
          title={"Reset"}
          backgroundColor={COLORS.lightGray}
          color={COLORS.primaryColor}
          width="90%"
          onPress={() => navigation.goBack()}
        />
      )}
    >
      <View style={styles.border} />
      <CustomText
        label={"Select An Option"}
        fontSize={18}
        fontFamily={fonts.medium}
        lineHeight={18 * 1.4}
        marginTop={12}
      />

      <TopTabWithBG tabNames={["PS", "KW"]} tab={tab} setTab={setTab} />
      <View style={styles.border} />

      <CustomText
        label={"Estimated Weight"}
        fontSize={18}
        fontFamily={fonts.medium}
        lineHeight={18 * 1.4}
        marginTop={12}
      />

      <MultiRangeSlider
        color={COLORS.darkPurple}
        height={24}
        width={24}
        showValue={false}
      />
    </ScreenWrapper>
  );
};

export default SliderFilter;

const styles = StyleSheet.create({
  border: {
    height: 4,
    backgroundColor: COLORS.lightGray,
  },
});

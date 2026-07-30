import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";

const AdvanceSettingOptionCard = ({
  title,
  des,
  index,
  lastIndex,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        index === lastIndex && { borderBottomWidth: 0 },
      ]}
      onPress={onPress}
    >
      <View style={{ flex: 1, paddingRight: 12 }}>
        <CustomText
          label={title}
          fontSize={16}
          fontFamily={fonts.medium}
          color={COLORS.white}
        />
        {des ? (
          <CustomText
            label={des}
            fontSize={14}
            fontFamily={fonts.medium}
            color={COLORS.white3}
            marginTop={-1}
          />
        ) : null}
      </View>
      <View
        style={[
          styles.radioOuter,
          isSelected && styles.radioOuterSelected,
        ]}
      >
        {isSelected && <View style={styles.radioDot} />}
      </View>
    </Pressable>
  );
};

export default AdvanceSettingOptionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: COLORS.inputBg,
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.white3,
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: COLORS.btnColor,
  },
  radioDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.btnColor,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import CustomSwitch from "../../../../components/CustomSwitch";
import { COLORS } from "../../../../utils/COLORS";

const LookingForCard = ({ title, switchArray, setSwitchArray }) => {
  const handleToggle = (index) => {
    setSwitchArray((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isEnable: !item.isEnable } : item
      )
    );
  };
  return (
    <View style={styles.mainContainer}>
      <CustomText
        label={title || "I’m looking for"}
        fontSize={18}
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
        marginBottom={8}
      />

      {switchArray?.map((item, index) => (
        <View
          key={index}
          style={[
            styles.row,
            { marginBottom: index === switchArray.length - 1 ? 0 : 12 },
          ]}
        >
          <CustomText
            label={item?.name || "Bluetooth"}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
            color={COLORS.white2}
          />
          <CustomSwitch
            value={item?.isEnable}
            setValue={() => handleToggle(index)}
          />
        </View>
      ))}
    </View>
  );
};

export default LookingForCard;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#272727",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

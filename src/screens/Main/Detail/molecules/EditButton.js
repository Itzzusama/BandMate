import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
const EditButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <CustomText label={"Edit"} color={COLORS.white2} fontSize={14} />
      <Icons
        family={"MaterialIcons"}
        name={"edit"}
        color={COLORS.white}
        size={14.5}
      />
    </TouchableOpacity>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

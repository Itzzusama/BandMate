import { StyleSheet, TouchableOpacity, View } from "react-native";

import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";

const CustomCheckbox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity
      style={value ? {} : styles.checkboxContainer}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.7}
    >
      {value && (
        <View style={styles.checkbox}>
          <Icons name="check" family="AntDesign" size={15} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    borderWidth: 2,
    overflow: "hidden",
    borderRadius: 100,
    borderColor: COLORS.border,
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: COLORS.black,
  },
});

export default CustomCheckbox;

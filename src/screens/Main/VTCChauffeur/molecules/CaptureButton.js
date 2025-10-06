import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../../utils/COLORS";

const CaptureButton = ({ onPress }) => {
  return (
    <View style={styles.circle}>
      <TouchableOpacity style={styles.btn} onPress={onPress} />
    </View>
  );
};

export default CaptureButton;

const styles = StyleSheet.create({
  circle: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderWidth: 6,
    borderColor: COLORS.white,
    position: "absolute",
    bottom: 50,
    borderRadius: 100,
    zIndex: 3,
  },
  btn: {
    width: 70,
    height: 70,
    alignSelf: "center",
    backgroundColor: COLORS.white,
    borderRadius: 100,
  },
});

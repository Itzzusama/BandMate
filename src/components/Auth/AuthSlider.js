import { StyleSheet, View } from "react-native";
import { COLORS } from "../../utils/COLORS";

const AuthSlider = ({ min, max, marginTop, marginBottom }) => {
  return (
    <View
      style={[styles.container, { marginTop: marginTop || 20, marginBottom }]}
    >
      <View style={styles.sliderTrack}>
        <View style={[styles.block]} />
      </View>
    </View>
  );
};

export default AuthSlider;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  sliderTrack: {
    width: "100%",
    height: 4,
    backgroundColor: COLORS.inputBg,
    borderRadius: 1,
    overflow: "hidden",
  },
  block: {
    width: 87.85,
    height: 4,
    backgroundColor: COLORS.white,
    borderRadius: 1,
  },
});

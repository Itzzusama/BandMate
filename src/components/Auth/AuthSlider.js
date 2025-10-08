import { StyleSheet, View } from "react-native";
import { COLORS } from "../../utils/COLORS";

const AuthSlider = ({ min, max, marginTop, marginBottom }) => {
  return (
    <View
      style={[styles.container, { marginTop: marginTop || 20, marginBottom }]}
    >
      <View style={styles.sliderTrack}>
        {Array.from({ length: max }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.block,
              {
                backgroundColor: index < min ? COLORS.authHeader : "#FFFFFF14",
              },
            ]}
          />
        ))}
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
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 99,
    overflow: "hidden",
  },
  block: {
    flex: 1,
    height: 6,
    marginLeft: -1,
  },
});

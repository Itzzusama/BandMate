import { StyleSheet, View } from "react-native";
import { COLORS } from "../../utils/COLORS";

const AuthSlider = ({ min, max, marginTop, marginBottom, gap, height = 4 }) => {
  return (
    <View
      style={[styles.container, { marginTop: marginTop || 20, marginBottom }]}
    >
      <View style={[styles.sliderTrack, { gap }]}>
        {Array.from({ length: max }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.block,
              {
                backgroundColor: index < min ? COLORS.authHeader : "#FFFFFF17",
                height,
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
    borderRadius: 100,
    overflow: "hidden",
  },
  block: {
    flex: 1,
  },
});

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import CustomBlurComponent from "../../../../components/CustomBlurComponent";

import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";

const RightContainer = () => {
  return (
    <CustomBlurComponent
      width={46}
      height={220}
      backgroundColor="transparent"
      alignSelf="flex-end"
      marginRight={12}
      blurAmount={10}
      reducedTransparencyFallbackColor="#FFFFFF"
    >
      <View style={styles.container}>
        {[
          PNGIcons.fuel,
          PNGIcons.fuel1,
          PNGIcons.parking,
          PNGIcons.carStand,
          PNGIcons.carStand1,
        ].map((item, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.iconContainer,
              { backgroundColor: i == 0 ? COLORS.black : "#FFFFFF" },
            ]}
          >
            <Image
              source={item}
              style={[
                styles.icon,
                { tintColor: i == 0 ? COLORS.white : COLORS.black },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </CustomBlurComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default RightContainer;

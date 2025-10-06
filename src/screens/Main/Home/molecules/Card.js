import { StyleSheet, TouchableOpacity, View } from "react-native";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const Card = ({
  title,
  title1,
  icon,
  backgroundColor = COLORS.white,
  height,
  onCardPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onCardPress}
      style={[styles.mainContainer, { backgroundColor, height }]}
    >
      <CustomText
        label={title1 || "move."}
        lineHeight={16}
        fontFamily={fonts.semiBold}
      />
      <CustomText label={title} lineHeight={16} color={COLORS.subtitle} />
      <ImageFast
        source={icon}
        style={styles.icon}
        resizeMode="contain"
        removeLoading
      />
      <View style={styles.price}>
        <CustomText
          label="$150"
          color={COLORS.white}
          fontFamily={fonts.medium}
          fontSize={12}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  mainContainer: {
    width: "32.4%",
    borderRadius: 17,
    padding: 12,
  },
  icon: {
    width: 70,
    height: 45,
    alignSelf: "flex-end",
  },
  price: {
    width: 44,
    height: 24,
    borderRadius: 100,
    backgroundColor: COLORS.primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
});

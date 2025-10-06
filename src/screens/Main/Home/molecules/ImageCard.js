import { StyleSheet, View } from "react-native";

import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";

const ImageCard = ({
  width,
  title,
  title1,
  marginBottom,
  onPress,
  backgroundImage,
}) => {
  return (
    <ImageFast
      source={backgroundImage || PNGIcons.bg1}
      style={[styles.img, { width, marginBottom }]}
      onPress={onPress}
    >
      <View style={styles.container}>
        <View>
          {title ? (
            <CustomText
              label={title}
              lineHeight={16}
              fontFamily={fonts.semiBold}
              color={COLORS.white}
            />
          ) : null}
          {title1 ? (
            <CustomText label={title1} lineHeight={16} color="#EBEBEB" />
          ) : null}
        </View>

        <View style={styles.price}>
          <CustomText
            label="$150"
            color={COLORS.white}
            fontFamily={fonts.medium}
            fontSize={12}
          />
        </View>
      </View>
    </ImageFast>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  img: {
    height: 120,
    borderRadius: 16,
  },
  container: {
    flex: 1,
    padding: 8,
    justifyContent: "space-between",
  },
  price: {
    width: 44,
    height: 24,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.16)",
  },
});

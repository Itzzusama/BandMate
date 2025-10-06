import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const AdOnsCard = () => {
  return (
    <View style={styles.card}>
      <ImageFast
        resizeMode={"contain"}
        source={Images.food}
        style={styles.foodImg}
      />
      <View style={{ flex: 1 }}>
        <CustomText
          fontSize={16}
          lineHeight={25}
          fontFamily={fonts.medium}
          label={"Coming Back From The Club"}
        />
        <CustomText
          fontSize={12}
          color={COLORS.subtitle}
          label={
            "Order a Champagne bottle while in your limo on the way to the event."
          }
        />
        <View style={styles.row}>
          <CustomText label={"Starting from"} color={COLORS.subtitle} />
          <CustomText label={"$15"} fontFamily={fonts.medium} />
        </View>
      </View>
    </View>
  );
};

export default AdOnsCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#1212120A",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  foodImg: {
    width: 48,
    height: 48,
    marginRight: 15,
  },
});

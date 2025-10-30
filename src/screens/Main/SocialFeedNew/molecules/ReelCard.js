import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";

const ReelCard = () => {
  return (
    <View style={{ paddingHorizontal: 12 ,backgroundColor: COLORS.black}}>
      <View style={styles.rowBetween}>
        <CustomText
          label={"Shorts You Might Like"}
          fontFamily={fonts.medium}
          fontSize={18}
        />
        <View style={styles.row}>
          <CustomText
            label={"See more"}
            fontFamily={fonts.semiBold}
            fontSize={12}
            color={COLORS.gray2}
          />
          <Image source={Images.forwardBg} style={styles.icon} />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 12, gap: 8 }}
      >
        {[Images.short1, Images.short2, Images.short3].map((item, index) => (
          <Image
            key={index}
            source={item}
            style={{ height: 220, width: 140, borderRadius: 12 }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ReelCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    height: 14,
    width: 14,
    marginLeft: 4,
  },
});

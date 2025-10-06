import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const PromoCard = ({ isInvite }) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.icon}>
            <Icons
              name="arrow-up-right"
              family="Feather"
              size={24}
              color={COLORS.blue}
            />
          </View>

          <View style={{ marginLeft: 12 }}>
            <CustomText
              label={"Get 10% off for each friend invited"}
              fontSize={16}
              lineHeight={16*1.4}
              numberOfLines={2}
              fontFamily={fonts.medium}
              color={COLORS.primaryColor}
              width={"80%"}
              // lineHeight={}
            />
            <CustomText
              label={"Sharing is caring"}
              fontSize={12}
              lineHeight={12*1.4}

              fontFamily={fonts.regular}
              color={"#121212CC"}
            />
          </View>
        </View>
      </View>

      <CustomButton title="Invite Friends" marginTop={16} onPress={isInvite} />
    </View>
  );
};

export default PromoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.inputBg,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: 16,
  },
  icon: {
    backgroundColor: COLORS.low,
    padding: 8,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

import { StyleSheet, View } from "react-native";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { addDurationToNow } from "../../../../utils/constants";
import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const AwatingTripCard = ({ data }) => {
  return (
    <View>
      <View style={styles.greeBanner}>
        <View style={styles.row}>
          <ImageFast
            source={Images.WhiteDiscount}
            style={{ width: 14, height: 14 }}
          />
          <CustomText
            color={COLORS.white}
            lineHeight={14 * 1.4}
            label="Get benefits & Discounts"
          />
        </View>
        <CustomText label="move+" lineHeight={14 * 1.4} color={COLORS.white} />
      </View>
      <View style={styles.Pickup}>
        <CustomText
          fontSize={28}
          color={COLORS.white}
          lineHeight={28 * 1.4}
          label={`Pickup in ${data?.totalDuration}`}
          fontFamily={fonts.semiBold}
        />
        <CustomText
          fontSize={16}
          color="#FFFFFFA3"
          label={`ETA ${addDurationToNow(data?.totalDuration)}`}
          lineHeight={16 * 1.4}
          fontFamily={fonts.medium}
        />
      </View>
    </View>
  );
};

export default AwatingTripCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 5,
  },
  Pickup: {
    backgroundColor: "#04724D",
    padding: 12,
  },
  greeBanner: {
    backgroundColor: "#37B874",
    width: "100%",
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    gap: 4,
    paddingHorizontal: 12,
  },
});

import { StyleSheet, View } from "react-native";

import CustomProgressBar from "../../../../components/CustomProgressBar";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const TripSummary = ({ data }) => {
  const order = data?.order;
  return (
    <View>
      <CustomText
        fontSize={18}
        marginBottom={10}
        color={COLORS.black}
        lineHeight={18 * 1.4}
        label="Trip’s Summary"
        fontFamily={fonts.semiBold}
      />
      <View style={styles.row}>
        <View style={[styles.row, { gap: 4, marginBottom: 5 }]}>
          <View style={[styles.rowItem, styles.smBox]}>
            <ImageFast
              source={Images.Presons}
              resizeMode={"contain"}
              style={{ width: 12, height: 12 }}
            />
            <CustomText
              label="4"
              fontSize={12}
              color={COLORS.black}
              lineHeight={12 * 1.4}
              fontFamily={fonts.semiBold}
            />
          </View>
          <View style={styles.smBox}>
            <CustomText
              label="SI08668"
              color={COLORS.black}
              fontFamily={fonts.semiBold}
              fontSize={12}
              lineHeight={12 * 1.4}
            />
          </View>
          <CustomText
            label="#131DAD46"
            color="#121212A3"
            fontFamily={fonts.medium}
            fontSize={12}
            lineHeight={12 * 1.4}
          />
        </View>
        <CustomText
          label={`Arriving in ${data?.totalDuration}`}
          color={"#121212A3"}
          fontFamily={fonts.medium}
          fontSize={12}
          lineHeight={12 * 1.4}
        />
      </View>

      {/* PROGRESS */}
      <View style={styles.row}>
        <CustomText
          label="GVA"
          color={COLORS.black}
          fontFamily={fonts.semiBold}
          fontSize={18}
          lineHeight={18 * 1.4}
        />
        <View style={styles.line} />
        <ImageFast
          source={Images.ProgressCar}
          style={{ width: 16, height: 16 }}
        />
        <View style={styles.line} />
        <CustomText
          label="LAU"
          color={COLORS.black}
          fontFamily={fonts.semiBold}
          fontSize={18}
          lineHeight={18 * 1.4}
        />
      </View>
      <View style={styles.row}>
        <View style={{ width: "30%" }}>
          <CustomText
            label={order?.startAddress?.address}
            color="#121212A3"
            fontFamily={fonts.semiBold}
            fontSize={12}
            lineHeight={12 * 1.4}
            numberOfLines={1}
          />
        </View>
        <CustomText
          label={`${order?.steps?.length || 0} STEPS`}
          color="#121212A3"
          fontFamily={fonts.regular}
          fontSize={12}
          lineHeight={12 * 1.4}
        />
        <View style={{ width: "30%", alignItems: "flex-end" }}>
          <CustomText
            label={order?.endAddress?.address}
            color="#121212A3"
            fontFamily={fonts.semiBold}
            fontSize={12}
            lineHeight={12 * 1.4}
            numberOfLines={1}
          />
        </View>
      </View>
      {/* PROGRESSBAR */}
      <CustomProgressBar
        duration={10000}
        leftLabel="5 MIN MARGIN"
        centerLabel="ON-TIME"
        rightLabel="5 MIN MARGIN"
        progressColor="#37B874"
        backgroundColor="#E5E5E5"
        carColor="#4A4A4A"
      />
    </View>
  );
};

export default TripSummary;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  smBox: {
    gap: 4,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    backgroundColor: "#1212120A",
  },
  line: {
    backgroundColor: "#12121229",
    height: 1,
    width: "30%",
  },
});

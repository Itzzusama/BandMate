import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import ImageFast from "../../../../components/ImageFast";
import { PNGIcons } from "../../../../assets/images/icons";

const ScheduledPayments = () => {
  return (
    <View style={styles.section}>
      <CustomText
        label="Scheduled Payments"
        fontFamily={fonts.semiBold}
        fontSize={20}
        lineHeight={20 * 1.4}
        color={COLORS.black}
        marginBottom={16}
      />

      <View style={styles.paymentItem}>
        <View style={styles.content}>
          <View
            style={{
              padding: 8,
              borderWidth: 2,
              borderColor: COLORS.lightGray,
              borderRadius: 99,
              marginRight: 12,
            }}
          >
            <View style={styles.avatar}>
              <CustomText
                label="D"
                fontFamily={fonts.bold}
                fontSize={16}
                lineHeight={16 * 1.4}
                color={COLORS.white}
              />
              <ImageFast source={PNGIcons.TreasuryUp} style={styles.badge} />
            </View>
          </View>

          <View style={styles.textContainer}>
            <CustomText
              label="Dmytro Beztsinnyi"
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={16 * 1.4}
              color={COLORS.black}
            />

            <View style={{flexDirection:"row", alignItems:"center"}}>


            <CustomText
              label="50Cr -"
              fontFamily={fonts.regular}
              fontSize={12}
              lineHeight={12 * 1.4}
            />
            <CustomText
              label=" Feb 25 2025 12:46"
              fontFamily={fonts.regular}
              fontSize={12}
              lineHeight={12 * 1.4}
              color={"#828282"}
            />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.cancelButton}>
          <Icons name="x" family="Feather" size={16} color={COLORS.gray2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginBottom: 8,
    borderRadius: 20,
    padding: 16,
  },
  paymentItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    bottom: -5,
    right: -3,
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  cancelButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ScheduledPayments;

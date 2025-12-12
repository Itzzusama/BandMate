import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";

const TicketBottomBar = ({
  totalTickets = 0,
  finalPrice = 0,
  onPressBook = () => {},
  loading,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowBetween}>
        <View style={[styles.rowBetween, { flex: 1 }]}>
          <Icons
            family={"MaterialIcons"}
            name={"access-time-filled"}
            color={COLORS.white}
            size={12}
          />
          <CustomText
            label={"Hourly"}
            fontFamily={fonts.medium}
            fontSize={10}
            marginLeft={4}
          />
          <CustomText
            label={"·"}
            fontFamily={fonts.boldExtra}
            fontSize={20}
            color={"#FFFFFF29"}
            marginLeft={4}
          />
          <CustomText
            label={"Today 2:00 PM"}
            color={COLORS.white2}
            fontSize={10}
            marginLeft={4}
          />
          <CustomText
            label={"·"}
            fontFamily={fonts.boldExtra}
            fontSize={20}
            color={"#FFFFFF29"}
            marginLeft={4}
          />
          <CustomText
            label={"4h"}
            color={COLORS.white2}
            fontSize={10}
            marginLeft={4}
          />
          <CustomText
            label={"·"}
            fontFamily={fonts.boldExtra}
            fontSize={20}
            color={"#FFFFFF29"}
            marginLeft={4}
          />
          <CustomText
            label={"Car"}
            color={COLORS.white2}
            fontSize={10}
            marginLeft={4}
          />
        </View>
        <View style={styles.rowBetween}>
          <Icons
            family={"FontAwesome"}
            name={"tag"}
            size={14}
            color={"#37B874"}
          />
          <CustomText
            label={"20%"}
            fontFamily={fonts.medium}
            fontSize={10}
            marginLeft={4}
            color={"#37B874"}
          />
        </View>
      </View>

      <View style={styles.rowBetween}>
        <TouchableOpacity style={styles.circleIcon}>
          <Image source={Images.heart2} style={[styles.icon]} />
        </TouchableOpacity>

        <View style={{ flex: 1, paddingHorizontal: 6 }}>
          <CustomButton
            title="Book Now"
            onPress={onPressBook}
            style={styles.bookBtn}
            textStyle={styles.bookBtnText}
            subText={`Total ${totalTickets} Tickets for £${finalPrice}`}
            subTextStyle={styles.subText}
            loading={loading}
            disabled={loading || totalTickets < 1}
          />
        </View>

        <TouchableOpacity style={styles.circleIcon}>
          <Image source={Images.smallCalender} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.iconTextRow}>
          <Icons
            family={"MaterialCommunityIcons"}
            name={"check-circle"}
            size={14}
            color={"#4347FF"}
          />
          <CustomText
            label="Instant Confirmation"
            fontSize={12}
            fontFamily={fonts.medium}
            color={COLORS.white}
            marginLeft={4}
          />
        </View>

        <View style={styles.iconTextRow}>
          <Icons
            family={"MaterialCommunityIcons"}
            name={"check-circle"}
            size={14}
            color={"#4347FF"}
          />
          <CustomText
            label="Free Cancellation"
            fontSize={12}
            fontFamily={fonts.medium}
            color={COLORS.white}
            marginLeft={4}
          />
        </View>
      </View>
    </View>
  );
};

export default TicketBottomBar;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 36,
    backgroundColor: COLORS.black,
    padding: 12,
    paddingTop: 4,
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
  },

  circleIcon: {
    height: 48,
    width: 48,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cardColor,
  },

  bookBtn: {
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.btnSoftColor,
    justifyContent: "center",
  },

  bookBtnText: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: COLORS.black,
  },

  subText: {
    fontSize: 12,
    color: COLORS.black,
    bottom: 2,
    fontFamily: fonts.medium,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
  },

  iconTextRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 24,
    width: 24,
    tintColor: COLORS.white,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { Image } from "react-native";
import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import Icons from "../../../../components/Icons";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

const DateRow = ({ title, date }) => {
  return (
    <View style={[styles.datesCard, styles.row]}>
      <View style={{ flex: 1 }}>
        <CustomText
          label={title}
          color={COLORS.white2}
          fontFamily={fonts.medium}
          fontSize={12}
          textTransform={"uppercase"}
          lineHeight={12 * 1.4}
        />
        <View style={[styles.row, { marginTop: 1 }]}>
          <Image
            source={Images.smallCalender}
            style={[styles.icon, { tintColor: COLORS.white }]}
          />
          <CustomText
            label={formatDate(date)}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
            marginLeft={4}
          />
        </View>
      </View>

      <View style={styles.calenerWraper}>
        <Image
          source={Images.smallCalender}
          style={[styles.icon, { tintColor: COLORS.btnColor }]}
        />
      </View>
    </View>
  );
};

const EventDates = ({ detail }) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.row, { marginBottom: 12 }]}>
        <View style={[styles.row, { flex: 1 }]}>
          <CustomText
            label={"Events Dates"}
            fontFamily={fonts.semiBold}
            fontSize={16}
            lineHeight={16 * 1.4}
            marginRight={4}
          />
          <Image source={Images.event_box} style={styles.icon} />
        </View>
        <Icons
          family={"Entypo"}
          name={"chevron-down"}
          color={COLORS.white2}
          size={22}
        />
      </View>

      <DateRow title={"Starting date"} date={detail?.startDate} />
      <DateRow title={"Ending date"} date={detail?.endDate} />
    </View>
  );
};

export default EventDates;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingBottom: 4,
  },
  datesCard: {
    height: 56,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.cardColor,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
  calenerWraper: {
    backgroundColor: COLORS.btnSoftColor,
    height: 32,
    width: 32,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import CustomDatePicker from "../../../components/CustomDatePicker";
import ErrorComponent from "../../../components/ErrorComponent";
import ScreenWrapper from "../../../components/ScreenWrapper";
import NumberPicker from "../../../components/NumberPicker";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const BookHourly = () => {
  const [tab, setTab] = useState("now");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <ScreenWrapper headerUnScrollable={() => <Header title="Book Hourly" />}>
      <CustomText
        label={`How many hours do you\nneed?`}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={10}
      />
      <CustomText
        label={`You can always decide if you need a Chauffeur now\nor later.`}
        lineHeight={14 * 1.4}
        marginTop={10}
        color={COLORS.subtitle}
        marginBottom={48}
      />
      <NumberPicker maxNumber={100} />
      <View style={styles.info}>
        <ErrorComponent
          errorTitle="2 km at least per hour."
          color="#1212127A"
          lineHeight={12 * 1.4}
          fontSize={12}
        />
      </View>
      <View style={styles.tabContainer}>
        {["now", "later"].map((item) => (
          <CustomButton
            width={55}
            height={32}
            key={item}
            title={item}
            onPress={() => setTab(item)}
            marginRight={6}
            fontSize={14}
            backgroundColor={tab === item ? COLORS.primary : "#1212120A"}
            color={tab === item ? COLORS.white : COLORS.black}
            marginBottom={16}
          />
        ))}
      </View>
      <View style={styles.row}>
        <CustomDatePicker
          value={selectedDate}
          setValue={setSelectedDate}
          withLabel="Departure Date"
          placeholder="DD/MM/AAAA"
          type="date"
          width={"49%"}
        />
        <CustomDatePicker
          value={selectedTime}
          setValue={setSelectedTime}
          withLabel="Departure Time"
          placeholder="XX:XX"
          type="time"
          width={"49%"}
        />
      </View>
      <CustomText
        label="Starting At"
        fontFamily={fonts.medium}
        lineHeight={14 * 1.4}
        color="#1212127A"
        alignSelf="center"
      />
      <CustomText
        label="$24.00/hr"
        fontFamily={fonts.semiBold}
        fontSize={20}
        lineHeight={20 * 1.4}
        alignSelf="center"
        marginBottom={48}
      />
      <CustomButton
        title="Continue"
        onPress={() => {}}
        color={COLORS.white}
        marginBottom={8}
      />
      <CustomButton
        title="Annuler"
        onPress={() => {}}
        backgroundColor="#1212120A"
        color={COLORS.black}
      />
    </ScreenWrapper>
  );
};

export default BookHourly;

const styles = StyleSheet.create({
  info: {
    backgroundColor: "#1212120A",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 6,
    borderRadius: 100,
    height: 20,
    marginTop: 14,
    marginBottom: 48,
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginBottom: 48,
  },
});

import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const WarehouseFlexibleDuration = ({ checkIn = true }) => {
  const [selectedTravel, setSelectedTravel] = useState("Week");
  const [selectedMonth, setSelectedMonth] = useState("July");
  const [selectedFlex, setSelectedFlex] = useState("+/- 2 days");

  const travelOptions = ["2–3 Days", "Week", "Month", "Longer"];
  const months = ["June", "July", "August"];
  const flexOptions = ["+/- 1 day", "+/- 2 days", "+/- 3 days", "+/- 7 days"];

  return (
    <View style={{ paddingHorizontal: 12 }}>
      <CustomText
        fontSize={12}
        marginTop={2}
        marginBottom={8}
        lineHeight={12 * 1.4}
        color={COLORS.subtitle}
        fontFamily={fonts.medium}
        label={"HOW LONG ARE YOU PLANNING TO TRAVEL"}
      />
      <View style={styles.row}>
        {travelOptions.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.option,
              selectedTravel === opt && styles.optionSelected,
            ]}
            onPress={() => setSelectedTravel(opt)}
          >
            <CustomText
              label={opt}
              lineHeight={14 * 1.4}
              fontFamily={fonts.medium}
              color={selectedTravel === opt ? COLORS.white : COLORS.black}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.row, { marginTop: 10 }]}>
        <Icons name={"info"} family={"Foundation"} color={COLORS.subtitle} />
        <CustomText
          fontSize={12}
          lineHeight={12 * 1.4}
          textTransform={"none"}
          color={COLORS.subtitle}
          label={"These are ETA made available by the host."}
        />
      </View>

      <View style={styles.line} />

      <CustomText
        fontSize={12}
        marginBottom={5}
        lineHeight={12 * 1.4}
        color={COLORS.subtitle}
        fontFamily={fonts.medium}
        label={"GO IN JULY, AUGUST"}
      />
      <View style={[styles.row, { marginBottom: 7 }]}>
        {months.map((month) => (
          <TouchableOpacity
            key={month}
            style={[
              styles.monthBox,
              selectedMonth === month && styles.monthBoxSelected,
            ]}
            onPress={() => setSelectedMonth(month)}
          >
            <Icons
              size={22}
              name="calendar-month"
              family="MaterialIcons"
              color={COLORS.subtitle}
            />
            <CustomText
              label={month}
              marginTop={2}
              marginBottom={2}
              lineHeight={14 * 1.4}
              fontFamily={fonts.medium}
            />
            <CustomText
              fontSize={12}
              label={"2025"}
              lineHeight={12 * 1.4}
              color={COLORS.subtitle}
              fontFamily={fonts.medium}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.line, { marginBottom: 15 }]} />

      {/* CHECK-IN */}

      {checkIn && (
        <>
          <View style={styles.box}>
            <View>
              <CustomText
                fontSize={12}
                marginBottom={2}
                label={"CHECK-IN"}
                lineHeight={1.4 * 12}
                color={COLORS.subtitle}
                fontFamily={fonts.medium}
              />
              <View style={styles.row}>
                <Icons name={"calendar"} family={"Entypo"} size={16} />
                <CustomText
                  fontSize={16}
                  lineHeight={1.4 * 16}
                  label={"July 13, 2025"}
                  fontFamily={fonts.medium}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.icon}>
              <Icons
                size={14}
                name={"calendar"}
                family={"Entypo"}
                color={COLORS.darkPurple}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 18 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={flexOptions}
              renderItem={({ item: flex }) => (
                <TouchableOpacity
                  key={flex}
                  style={[
                    styles.flexBtn,
                    selectedFlex === flex && styles.flexBtnSelected,
                  ]}
                  onPress={() => setSelectedFlex(flex)}
                >
                  <CustomText
                    label={flex}
                    fontFamily={fonts.medium}
                    color={selectedFlex === flex ? COLORS.white : COLORS.black}
                  />
                </TouchableOpacity>
              )}
            />
          </View>

          {/* CHECK-OUT */}
          <View style={styles.box}>
            <View>
              <CustomText
                fontSize={12}
                marginBottom={2}
                label={"CHECK OUT"}
                lineHeight={1.4 * 12}
                color={COLORS.subtitle}
                fontFamily={fonts.medium}
              />
              <View style={styles.row}>
                <Icons name={"calendar"} family={"Entypo"} size={16} />
                <CustomText
                  fontSize={16}
                  lineHeight={1.4 * 16}
                  label={"July 13, 2025"}
                  fontFamily={fonts.medium}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.icon}>
              <Icons
                size={14}
                name={"calendar"}
                family={"Entypo"}
                color={COLORS.darkPurple}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 20 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={flexOptions}
              renderItem={({ item: flex }) => (
                <TouchableOpacity
                  key={flex}
                  style={[
                    styles.flexBtn,
                    selectedFlex === flex && styles.flexBtnSelected,
                  ]}
                  onPress={() => setSelectedFlex(flex)}
                >
                  <CustomText
                    label={flex}
                    fontFamily={fonts.medium}
                    color={selectedFlex === flex ? COLORS.white : COLORS.black}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default WarehouseFlexibleDuration;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  option: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    backgroundColor: COLORS.lightGray,
  },
  optionSelected: {
    backgroundColor: COLORS.black,
  },
  monthBox: {
    flex: 1,
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "rgba(18, 18, 18, 0.04)",
  },
  monthBoxSelected: {
    borderColor: COLORS.black,
    backgroundColor: "rgba(18, 18, 18, 0.08)",
  },
  box: {
    borderRadius: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightGray,
    padding: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.low,
    borderRadius: 50,
    width: 32,
    height: 32,
  },
  flexBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    marginRight: 5,
  },
  flexBtnSelected: {
    backgroundColor: COLORS.black,
  },
  line: {
    backgroundColor: COLORS.lightGray,
    height: 1,
    marginTop: 20,
    marginBottom: 17,
  },
});

import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import React from "react";

import CustomText from "../../../../components/CustomText";

import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const FeatureSliderCard = ({ data, title, fontFamily, fontSize }) => {
  const defaultData = [
    {
      title: "Trips",
      percentage: 37,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Shippings",
      percentage: 27,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Deliveries",
      percentage: 17,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Rental",
      percentage: 7,
      details: { ground: 0, sea: 0, air: 0 },
    },
    {
      title: "Tours",
      percentage: 7,
      details: { ground: 0, sea: 0, air: 0 },
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.itemContainer}>
        {item?.additional && (
          <CustomText
            fontSize={12}
            lineHeight={12 * 1.4}
            label={item?.additional}
          />
        )}
        <CustomText
          label={item.title}
          lineHeight={16 * 1.4}
          fontSize={fontSize || 16}
          fontFamily={fontFamily || fonts.medium}
        />

        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${item.percentage}%` }]}
          />
        </View>
        <View style={styles.percentageContainer}>
          <CustomText
            lineHeight={14 * 1.4}
            fontFamily={fonts.medium}
            label={`${item.percentage}%`}
          />
          <CustomText
            label="100%"
            marginLeft={8}
            color={COLORS.gray5}
            lineHeight={14 * 1.4}
          />
        </View>

        {item?.details && (
          <View style={styles.detailsContainer}>
            <CustomText
              label={`Ground: ${item.details.ground}%`}
              fontSize={10}
            />
            <CustomText
              label={`Sea: ${item.details.sea}%`}
              fontSize={10}
              marginLeft={16}
            />
            <CustomText
              label={`Air: ${item.details.air}%`}
              fontSize={10}
              marginLeft={16}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomText
        fontSize={18}
        marginBottom={8}
        lineHeight={18 * 1.4}
        label={title || "Title"}
        fontFamily={fonts.medium}
      />
      <BarChart
        data={{
          labels: ["Alpha", "Gen. Z", "Mill.", "Gen X.", "B.B."],
          datasets: [{ data: [8, 12, 10, 15, 20] }],
        }}
        height={180}
        width={screenWidth - 40}
        fromZero
        yAxisLabel=""
        chartConfig={{
          backgroundColor: COLORS.lightGray,
          backgroundGradientFrom: COLORS.lightGray,
          backgroundGradientTo: COLORS.lightGray,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(75, 123, 236, ${opacity})`,
          labelColor: () => COLORS.darkPurple,
        }}
        withInnerLines={false}
        style={{ borderRadius: 12, marginBottom: 10 }}
      />
      <View style={styles.contentContainer}>
        <FlatList
          scrollEnabled={false}
          renderItem={renderItem}
          data={data || defaultData}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.row}>
          <Icons name={"info"} color={COLORS.gray1} family={"Feather"} />
          <CustomText
            fontSize={10}
            color={COLORS.gray1}
            lineHeight={10 * 1.4}
            label="One strategy will be focusing on the one you feel most comfortable in, in order to maximize your profits."
          />
        </View>
      </View>
    </View>
  );
};

export default FeatureSliderCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 5,
  },
  itemContainer: {
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomColor: COLORS.inputBg,
  },
  percentageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.inputBg,
    borderRadius: 4,
    marginVertical: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: COLORS.darkPurple,
    borderRadius: 4,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 12,
    borderRadius: 12,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    marginBottom: 12,
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import Divider from "./Divider";

const SummaryCard = ({ match, inCommon, monthlyViews }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "#6DFF93" }]}>
              {match}%
            </Text>
            <Text style={styles.statLabel}>Match</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{inCommon}</Text>
            <Text style={styles.statLabel}>In Common</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{monthlyViews}</Text>
            <Text style={styles.statLabel}>Monthly Views</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    padding: 18,
    paddingVertical: 16,
    marginHorizontal: 12,
    marginBottom: 18,
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    lineHeight: 14 * 1.4,
    color: "#fff",
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.white3,
    fontFamily: fonts.regular,
  },
  divider: {
    width: 1,
    height: 29,
    backgroundColor: COLORS.white3,
    marginHorizontal: 10,
  },
});

export default SummaryCard;

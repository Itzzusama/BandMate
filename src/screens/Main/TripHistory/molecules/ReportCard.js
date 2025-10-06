import { StyleSheet, View } from "react-native";
import React from "react";

import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";

import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const ReportCard = ({ borderBottomColor = "#1212120A" }) => {
  const array = [
    {
      title: "McDonald’s",
      desc: "Alger, Algérie",
    },
    {
      title: "McDonald’s",
      desc: "Alger, Algérie",
    },
  ];

  return (
    <View style={[styles.border, { borderBottomColor }]}>
      <View style={styles.mainContainer}>
        <View style={styles.dotContainer}>
          {array.map((_, i) => (
            <View style={{ alignItems: "center" }} key={i}>
              <View style={styles.dot} />
              {i === array.length - 1 ? null : <View style={styles.line} />}
            </View>
          ))}
        </View>
        <View style={styles.contentContainer}>
          {array.map((item, i) => (
            <View
              style={{ marginBottom: i === array.length - 1 ? 0 : 22 }}
              key={i}
            >
              <CustomText
                label={item.title}
                fontFamily={fonts.medium}
                lineHeight={14 * 1.4}
              />
              <CustomText
                label={item.desc}
                fontSize={12}
                fontFamily={fonts.medium}
                lineHeight={12 * 1.4}
                numberOfLines={1}
              />
            </View>
          ))}
        </View>
      </View>
      <CustomButton
        title="Report"
        fontSize={16}
        fontFamily={fonts.medium}
        width={78}
        height={32}
        alignSelf="flex-start"
        marginTop={15}
        marginBottom={24}
        color={COLORS.black}
        backgroundColor="#1212120F"
      />
    </View>
  );
};

export default ReportCard;

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  mainContainer: {
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1.5,
    borderColor: "#12121229",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: COLORS.black,
  },
  dotContainer: {
    width: "8%",
  },
  contentContainer: {
    width: "92%",
  },
  line: {
    width: 1,
    height: 54,
    backgroundColor: "#12121229",
    marginVertical: 4,
  },
});

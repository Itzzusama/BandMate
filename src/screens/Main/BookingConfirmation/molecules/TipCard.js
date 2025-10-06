import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomInput from "../../../../components/CustomInput";
import { COLORS } from "../../../../utils/COLORS";

const TipCard = ({ label, array }) => {
  const [tip, setTip] = useState("10");

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.row, { marginBottom: 8 }]}>
        <Image source={PNGIcons.tip} style={styles.tip} />
        <CustomText
          label={label || "Add A Tip"}
          fontSize={18}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
        />
      </View>

      <CustomInput
        withLabel={"TIP CUSTOM AMOUNT"}
        value={tip}
        onChangeText={(text) => setTip(text)}
        marginBottom={8}
      />

      <View style={[styles.row, { justifyContent: "space-between" }]}>
        {["10", "20", "30", "40", "50"].map((item) => {
          const isSelected = tip === item;
          return (
            <TouchableOpacity
              key={item}
              activeOpacity={0.8}
              onPress={() => setTip(item)}
              style={[
                styles.card,
                {
                  backgroundColor: isSelected ? COLORS.black : COLORS.lightGray,
                },
              ]}
            >
              <CustomText
                label={`${item}%`}
                fontSize={16}
                lineHeight={16 * 1.4}
                fontFamily={fonts.semiBold}
                color={isSelected ? COLORS.white : COLORS.black}
              />
              <CustomText
                label={`$${item}`}
                fontSize={12}
                lineHeight={12 * 1.4}
                fontFamily={fonts.medium}
                color={isSelected ? "#FFFFFFA3" : "#1212127A"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TipCard;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  tip: {
    height: 18,
    width: 18,
  },
  card: {
    height: 56,
    width: "19%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});

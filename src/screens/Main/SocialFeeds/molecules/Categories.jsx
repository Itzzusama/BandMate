import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";

const Categories = () => {
  const categories = ["Books", "Business & Industrial", "Collectibles"];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {/* Compass Card (Left Side Only) */}
      <TouchableOpacity
        style={[styles.iconCard, { paddingHorizontal: 7 }]}
        activeOpacity={0.8}
      >
        <Icons
          family="Ionicons"
          name="compass"
          size={23}
          color={COLORS.black}
        />
      </TouchableOpacity>

      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryButton}
          activeOpacity={0.8}
        >
          <CustomText
            label={item}
            color={COLORS.white}
            fontSize={14}
            fontFamily={fonts.medium}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 14,
  },
  iconCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 8,
    paddingVertical: 5,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3, // Android shadow
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    marginRight: 6,
    justifyContent: "center",
  },
});

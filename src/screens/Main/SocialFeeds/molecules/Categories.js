import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";

const Categories = ({
  categories = [
    "Technology",
    "Music",
    "Sports",
    "Fashion",
    "Entertainment",
    "Gaming",
    "Books",
  ],
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {/* Compass Card (Left Side Only) */}
      <TouchableOpacity
        style={[
          styles.iconCard,
          { paddingHorizontal: 10 },
          !selectedCategory && { backgroundColor: COLORS.btnColor },
        ]}
        activeOpacity={0.8}
        onPress={() => onSelectCategory && onSelectCategory(null)}
      >
        <Icons
          family="Ionicons"
          name="compass"
          size={19}
          color={COLORS.black}
        />
      </TouchableOpacity>

      {categories.map((item, index) => {
        const isSelected = selectedCategory === item;
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              isSelected && { backgroundColor: COLORS.btnColor },
            ]}
            activeOpacity={0.8}
            onPress={() => {
              if (onSelectCategory) {
                onSelectCategory(isSelected ? null : item);
              }
            }}
          >
            <CustomText
              label={item}
              color={isSelected ? COLORS.black : COLORS.white}
              fontSize={14}
              fontFamily={fonts.medium}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 4,
  },
  iconCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 8,
    paddingVertical: 5,
    marginRight: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    marginRight: 4,
    justifyContent: "center",
  },
});

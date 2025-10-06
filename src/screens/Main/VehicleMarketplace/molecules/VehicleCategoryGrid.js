import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const VehicleCategoryGrid = ({ onCategoryPress }) => {
  const categories = [
    {
      id: "sedan",
      name: "Sedan",
      price: "1.25k",
      icon: "directions-car",
      iconColor: "#666666",
    },
    {
      id: "hatchback",
      name: "Hatchback",
      price: "1.25k",
      icon: "directions-car",
      iconColor: "#666666",
    },
    {
      id: "suv",
      name: "SUV",
      price: "1.25k",
      icon: "directions-car",
      iconColor: "#666666",
    },
    {
      id: "coupe",
      name: "Coupe",
      price: "1.25k",
      icon: "directions-car",
      iconColor: "#666666",
    },
    {
      id: "crossover",
      name: "Cross-Over",
      price: "1.25k",
      icon: "directions-car",
      iconColor: "#666666",
    },
    {
      id: "luxury",
      name: "Luxury",
      price: "1.25k",
      icon: "directions-car",
      iconColor: "#666666",
    },
    {
      id: "hybrid",
      name: "Hybrid/Electric",
      price: "1.25k",
      icon: "electric-car",
      iconColor: "#666666",
    },
    {
      id: "classic",
      name: "Classic",
      price: "1.25k",
      icon: "directions-car",
      iconColor: "#666666",
    },
    {
      id: "convertible",
      name: "Convertible",
      price: "1.25k",
      icon: "directions-car",
      iconColor: "#666666",
    },
    {
      id: "minivan",
      name: "Minivan/Van",
      price: "1.25k",
      icon: "airport-shuttle",
      iconColor: "#666666",
    },
    {
      id: "pickup",
      name: "Pickup Truck",
      price: "1.25k",
      icon: "local-shipping",
      iconColor: "#666666",
    },
    {
      id: "toys",
      name: "Toys",
      price: "1.25k",
      icon: "toys",
      iconColor: "#666666",
    },
  ];

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => onCategoryPress?.(item)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Icons
          family="MaterialIcons"
          name={item.icon}
          size={32}
          color={item.iconColor || COLORS.gray}
        />
      </View>

      <CustomText
        label={item.name}
        fontSize={14}
        fontFamily={fonts.medium}
        color={COLORS.black}
        textAlign="center"
        marginTop={8}
        numberOfLines={2}
      />

      <CustomText
        label={item.price}
        fontSize={12}
        fontFamily={fonts.regular}
        color={COLORS.gray}
        textAlign="center"
        marginTop={2}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        numColumns={4}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.gridContainer}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  gridContainer: {
    alignItems: "flex-start",
  },
  categoryItem: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
    minHeight: 80,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
});

export default VehicleCategoryGrid;

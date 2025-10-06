import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";

const sampleData = [
  { _id: "1", label: "New & Used" },
  { _id: "2", label: "New & Certified" },
  { _id: "3", label: "Certified Pre-Owned" },
  { _id: "4", label: "New" },
  { _id: "5", label: "Front-Wheel Drive" },
];

const VehicleFilters = () => {
  const [selectedId, setSelectedId] = useState(null);

  const selectOption = (item) => {
    setSelectedId(item._id);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedId === item._id;
    return (
      <TouchableOpacity
        style={[styles.modalItem, isSelected && styles.selectedItem]}
        onPress={() => selectOption(item)}
        activeOpacity={0.6}
      >
        <CustomText
          label={item.label || ""}
          fontSize={16}
          fontFamily={fonts.medium}
          color={isSelected ? COLORS.darkPurple : COLORS.primaryColor}
          style={{ flex: 1 }}
        />
        <CustomText
          label={item.subTitle || ""}
          fontFamily={fonts.medium}
          color={isSelected ? COLORS.darkPurple : COLORS.gray2}
          style={{ flex: 1 }}
        />
        <Icons
          family="MaterialCommunityIcons"
          name={isSelected ? "radiobox-marked" : "radiobox-blank"}
          size={24}
          color={isSelected ? COLORS.darkPurple : COLORS.gray2}
        />
      </TouchableOpacity>
    );
  };

  const loadMoreData = () => {
    // Add pagination logic here
    console.log("Load more data...");
  };

  return (
    <ScreenWrapper headerUnScrollable={() => <Header title={"Condition"} />}>
      <FlatList
        data={sampleData}
        keyExtractor={(item, index) =>
          item && item._id ? item._id.toString() : index.toString()
        }
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        style={{ maxHeight: 400, marginTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
};

export default VehicleFilters;

const styles = StyleSheet.create({
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedItem: {
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
  },
});

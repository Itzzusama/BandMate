import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomModal from "../../../../components/CustomModal";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomButton from "../../../../components/CustomButton";
import Icons from "../../../../components/Icons";
import FilterCategoryModal from "./FilterCategoryModal";

const FilterModal = ({ isVisible, onModalClose }) => {
  const [activeFilter, setActiveFilter] = useState(null);

  const renderContent = () => {
    if (activeFilter) {
      return (
        <FilterCategoryModal
          filterType={activeFilter}
          onBack={() => setActiveFilter(null)}
        />
      );
    }

    return (
      <>
        <View style={styles.header}>
          <CustomText
            label={"Filters"}
            fontFamily={fonts.semiBold}
            fontSize={24}
            lineHeight={24 * 1.4}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            activeOpacity={0.8}
            onPress={onModalClose}
          >
            <Image
              source={PNGIcons.white_cross}
              style={{ height: 18, width: 18, tintColor: COLORS.white2 }}
            />
          </TouchableOpacity>
        </View>

        <CustomText
          label={"Find the perfect fit for you!"}
          color={COLORS.white3}
          fontSize={14}
          fontFamily={fonts.medium}
          marginBottom={2}
        />

        {[{ name: "Sort By" }, { name: "Distance" }, { name: "Date" }].map(
          (item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => setActiveFilter(item.name)}
              style={styles.optionsStyle}
            >
              <CustomText
                label={item.name}
                fontSize={16}
                fontFamily={fonts.medium}
              />
              <Icons
                family={"Ionicons"}
                name={"chevron-forward"}
                color={COLORS.white2}
                size={22}
              />
            </TouchableOpacity>
          )
        )}

        <View style={styles.row}>
          <CustomButton
            title={"Clear All"}
            width="48%"
            height={48}
            backgroundColor={COLORS.cardColor}
            color={COLORS.white}
          />
          <CustomButton title={"Confirm"} width="48%" height={48} />
        </View>
      </>
    );
  };

  return (
    <CustomModal isChange isVisible={isVisible} onDisable={onModalClose}>
      <View style={styles.modalContainer}>{renderContent()}</View>
    </CustomModal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modalContainer: {
    padding: 12,
    width: "95%",
    alignSelf: "center",
    borderRadius: 24,
    marginBottom: Platform.OS === "android" ? 12 : 32,
    maxHeight: "100%",
    borderWidth: 1,
    backgroundColor: COLORS.black,
    borderColor: "rgba(255, 255, 255, 0.16)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    borderRadius: 99,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cardColor,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    justifyContent: "center",
    marginTop: 16,
  },
  optionsStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
});

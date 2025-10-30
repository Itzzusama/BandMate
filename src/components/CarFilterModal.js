import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import fonts from "../assets/fonts";
import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import CustomModal from "./CustomModal";
import CustomText from "./CustomText";
import Icons from "./Icons";
import Divider from "./Divider";
import CustomButton from "./CustomButton";
import { useEffect, useRef } from "react";

// Fallback default topics (used when no data is passed)
const DEFAULT_FILTERS = [
  { name: "Technology", image: Images.Topis1 },
  { name: "Politics", image: Images.Topis2 },
  { name: "Sports", image: Images.Topis3 },
  { name: "Music", image: Images.Topis4 },
  { name: "Entertainement", image: Images.Topis5 },
  { name: "Fashion", image: Images.Topis6 },
  { name: "Food", image: Images.Topis7 },
  { name: "Gaming", image: Images.Topis8 },
  { name: "Health", image: Images.Topis9 },
];

const FilterModal = ({
  isVisible,
  onDisable,
  onItemPress,
  title,
  subtitle,
  filters,
  data, // alias for filters to keep API flexible
  multiSelect = false, // New prop for multi-select mode
  selectedItems = [], // Array of selected items for multi-select
  onConfirm, // Callback for multi-select confirmation
}) => {
  const insests = useSafeAreaInsets();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [localSelectedItems, setLocalSelectedItems] = useState([]);
  const prevIsVisible = useRef(false);
  
  // Update local selection when modal opens (not closes)
  useEffect(() => {
    if (isVisible && !prevIsVisible.current) {
      setLocalSelectedItems(selectedItems || []);
    }
    prevIsVisible.current = isVisible;
  }, [isVisible, selectedItems]);
  
  // Prefer externally passed data; fall back to defaults
  const items =
    filters && filters.length
      ? filters
      : data && data.length
      ? data
      : DEFAULT_FILTERS;

  const handleItemToggle = (item) => {
    if (multiSelect) {
      const isSelected = localSelectedItems.includes(item.name);
      if (isSelected) {
        setLocalSelectedItems(localSelectedItems.filter(i => i !== item.name));
      } else {
        setLocalSelectedItems([...localSelectedItems, item.name]);
      }
    } else {
      setSelectedIndex(items.indexOf(item));
      onItemPress?.(item, items.indexOf(item));
    }
  };

  const handleConfirm = () => {
    if (multiSelect && onConfirm) {
      onConfirm(localSelectedItems);
    }
    onDisable();
  };

  return (
    <CustomModal isChange isVisible={isVisible} onDisable={onDisable}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View
            style={[
              styles.row,
              { paddingTop: insests.top, paddingHorizontal: 12 },
            ]}
          >
            <TouchableOpacity
              onPress={onDisable}
              activeOpacity={0.6}
              style={[
                styles.backIcon,
                {
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                },
              ]}
            >
              <Icons
                name="keyboard-arrow-left"
                family="MaterialIcons"
                size={26}
                color={COLORS.white}
              />
            </TouchableOpacity>

            <CustomText
              label={title}
              color={COLORS.white}
              fontFamily={fonts.semiBold}
              textTransform="capitalize"
              fontSize={20}
            />
          </View>

          <Divider
            marginTop={8}
            marginBottom={0}
            thickness={4}
            color="rgba(255, 255, 255, 0.04)"
          />

          <ScrollView showsVerticalScrollIndicator={false}>
            {items.map((f, idx) => {
              const isSelected = multiSelect 
                ? localSelectedItems.includes(f.name)
                : selectedIndex === idx;
              return (
                <TouchableOpacity
                  key={`${f.name}-${idx}`}
                  activeOpacity={0.7}
                  style={[styles.filterItem]}
                  onPress={() => handleItemToggle(f)}
                >
                  <View style={styles.row}>
                    {f?.image ? (
                      <Image source={f.image} style={styles.filterImage} />
                    ) : null}
                    <View>
                      <CustomText
                        label={f.name}
                        color={COLORS.white}
                        fontFamily={fonts.medium}
                        fontSize={16}
                        marginLeft={f?.image ? 12 : 0}
                      />
                      {f.subtitle && (
                        <CustomText
                          label={f.subtitle}
                          color={COLORS.subtitle}
                          fontFamily={fonts.medium}
                          fontSize={14}
                          marginLeft={f?.image ? 12 : 0}
                        />
                      )}
                    </View>
                  </View>
                  {multiSelect ? (
                    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                      {isSelected && (
                        <Icons
                          name="check"
                          family="MaterialIcons"
                          size={16}
                          color={COLORS.black}
                        />
                      )}
                    </View>
                  ) : (
                    <View
                      style={
                        isSelected
                          ? styles.circleIndicatorUnselected
                          : styles.circleIndicator
                      }
                    >
                      <View
                        style={[
                          styles.innerCircle,
                          isSelected && styles.innerCircleSelected,
                        ]}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {multiSelect && (
            <View style={styles.buttonContainer}>
              <CustomButton
                title={`Confirm ${localSelectedItems.length > 0 ? `(${localSelectedItems.length})` : ''}`}
                onPress={handleConfirm}
              />
            </View>
          )}
        </View>
      </View>
    </CustomModal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.black,
    borderRadius: 22,
  },
  headerContainer: {
    backgroundColor: COLORS.primaryColor,
  },

  backIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF0A",
    padding: 16,
    height: 64,
  },

  filterImage: {
    width: 16,
    height: 16,
    borderRadius: 6,
    resizeMode: "cover",
  },
  circleIndicator: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#FFFFFF7A",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  circleIndicatorUnselected: {
    borderColor: "#A19375",
    borderWidth: 1,
    borderRadius: 100,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 100,
    backgroundColor: "transparent",
  },
  innerCircleSelected: {
    backgroundColor: "#A19375",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#FFFFFF7A",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#A19375",
    borderColor: "#A19375",
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 24,
  },
});

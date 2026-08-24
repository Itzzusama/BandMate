import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { useState, useEffect, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import fonts from "../assets/fonts";
import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import CustomModal from "./CustomModal";
import CustomText from "./CustomText";
import Icons from "./Icons";
import Divider from "./Divider";
import CustomButton from "./CustomButton";

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
  multiSelect = false, // Prop for multi-select mode
  selectedItems = [], // Array of selected items for multi-select
  onConfirm, // Callback for multi-select confirmation
}) => {
  const insets = useSafeAreaInsets();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [localSelectedItems, setLocalSelectedItems] = useState([]);
  const prevIsVisible = useRef(false);

  // Update local selection when modal opens
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

  const getItemName = (item) => {
    if (typeof item === "string") return item;
    return item?.name ?? "";
  };

  const getItemSubtitle = (item) => {
    if (typeof item === "string") return null;
    return item?.subtitle ?? null;
  };

  const getItemImage = (item) => {
    if (typeof item === "string") return null;
    return item?.image ?? null;
  };

  const handleItemToggle = (item) => {
    const itemName = getItemName(item);
    if (multiSelect) {
      const isSelected = localSelectedItems.includes(itemName);
      if (isSelected) {
        setLocalSelectedItems(localSelectedItems.filter((i) => i !== itemName));
      } else {
        setLocalSelectedItems([...localSelectedItems, itemName]);
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
              { paddingTop: Math.max(12, insets.top - 8), paddingHorizontal: 16 },
            ]}
          >
            <TouchableOpacity
              onPress={onDisable}
              activeOpacity={0.6}
              style={styles.backIcon}
            >
              <Icons
                name="keyboard-arrow-left"
                family="MaterialIcons"
                size={26}
                color={COLORS.white}
              />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <CustomText
                label={title}
                color={COLORS.white}
                fontFamily={fonts.semiBold}
                textTransform="capitalize"
                fontSize={20}
              />
              {subtitle ? (
                <CustomText
                  label={subtitle}
                  color={COLORS.white2}
                  fontFamily={fonts.regular}
                  fontSize={13}
                  marginTop={2}
                />
              ) : null}
            </View>
          </View>

          <Divider
            marginTop={12}
            marginBottom={0}
            thickness={1}
            color="rgba(255, 255, 255, 0.08)"
          />

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
            {items.map((f, idx) => {
              const itemName = getItemName(f);
              const itemSubtitle = getItemSubtitle(f);
              const itemImage = getItemImage(f);

              const isSelected = multiSelect
                ? localSelectedItems.includes(itemName)
                : selectedIndex === idx;

              return (
                <TouchableOpacity
                  key={`${itemName}-${idx}`}
                  activeOpacity={0.7}
                  style={styles.filterItem}
                  onPress={() => handleItemToggle(f)}
                >
                  <View style={styles.row}>
                    {itemImage ? (
                      <Image source={itemImage} style={styles.filterImage} />
                    ) : null}
                    <View>
                      <CustomText
                        label={itemName}
                        color={COLORS.white}
                        fontFamily={fonts.medium}
                        fontSize={16}
                        marginLeft={itemImage ? 12 : 0}
                      />
                      {itemSubtitle && (
                        <CustomText
                          label={itemSubtitle}
                          color={COLORS.white2}
                          fontFamily={fonts.regular}
                          fontSize={13}
                          marginLeft={itemImage ? 12 : 0}
                          marginTop={2}
                        />
                      )}
                    </View>
                  </View>
                  {multiSelect ? (
                    <View
                      style={[
                        styles.checkbox,
                        isSelected && styles.checkboxSelected,
                      ]}
                    >
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
                title={`Confirm ${localSelectedItems.length > 0 ? `(${localSelectedItems.length})` : ""}`}
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  headerContainer: {
    backgroundColor: COLORS.black,
    flex: 1,
  },

  backIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
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
    borderBottomColor: "rgba(255, 255, 255, 0.06)",
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 60,
  },

  filterImage: {
    width: 24,
    height: 24,
    borderRadius: 6,
    resizeMode: "cover",
  },
  circleIndicator: {
    width: 22,
    height: 22,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  circleIndicatorUnselected: {
    borderColor: COLORS.btnColor,
    borderWidth: 2,
    borderRadius: 100,
    width: 22,
    height: 22,
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
    backgroundColor: COLORS.btnColor,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: COLORS.btnColor,
    borderColor: COLORS.btnColor,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: COLORS.black,
  },
});

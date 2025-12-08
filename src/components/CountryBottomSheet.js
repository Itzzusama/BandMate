import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CustomInput from "./CustomInput";
import CustomModal from "./CustomModal";
import CustomText from "./CustomText";
import Icons from "./Icons";

import { COUNTRIES as COUNTRIES_DATA } from "../utils/COUNTRIES";
import { PNGIcons } from "../assets/images/icons";
import { COLORS } from "../utils/COLORS";
import fonts from "../assets/fonts";
import CountryFlag from "react-native-country-flag";
// ✅ Format countries for dropdown
const COUNTRIES = COUNTRIES_DATA.map((country) => ({
  label: country.name,
  code: country.code,
  dialCode: country.dialCode,
  flag: country.emoji,
})).sort((a, b) => a.label.localeCompare(b.label));

const ITEMS_PER_PAGE = 20;

const CountryBottomSheet = ({
  isVisible,
  onClose,
  selectedCountry,
  onCountrySelect,
  hideCode = true,
}) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const insets = useSafeAreaInsets();

  // ✅ Filter countries by name or dial code
  const allFilteredCountries = COUNTRIES.filter(
    (country) =>
      country.label.toLowerCase().includes(searchText.toLowerCase()) ||
      country.dialCode.includes(searchText)
  );

  const totalPages = Math.ceil(allFilteredCountries.length / ITEMS_PER_PAGE);
  const paginatedCountries = allFilteredCountries.slice(
    0,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (text) => {
    setSearchText(text);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsLoadingMore(false);
      }, 300);
    }
  };

  const handleCountrySelect = (country) => {
    onCountrySelect({
      label: country.label,
      code: country.code,
      dialCode: country.dialCode,
    });
    setCurrentPage(1);
    setSearchText("");
  };

  const handleClose = () => {
    setCurrentPage(1);
    setSearchText("");
    onClose();
  };

  const renderFooter = () =>
    isLoadingMore ? (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={COLORS.primaryColor} />
      </View>
    ) : null;

  return (
    <CustomModal isChange isVisible={isVisible} onDisable={handleClose}>
      <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
        {/* Header with search */}
        <View style={styles.modalHeader}>
          <CustomInput
            search
            width="86%"
            height={44}
            borderRadius={100}
            marginBottom={0.1}
            isClear={() => setSearchText("")}
            placeholder="Search Country or Code..."
            value={searchText}
            onChangeText={handleSearchChange}
            autoFocus={false}
            clearButtonMode="while-editing"
          />
          <TouchableOpacity
            style={styles.crossContainer}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <Image source={PNGIcons.white_cross} style={styles.cross} />
          </TouchableOpacity>
        </View>

        {/* Country list */}
        {paginatedCountries.length > 0 ? (
          <FlatList
            data={paginatedCountries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => {
              const isSelected =
                selectedCountry && selectedCountry.code === item.code;
              return (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => handleCountrySelect(item)}
                  activeOpacity={0.6}
                >
                  <View style={styles.countryContent}>
                    <View style={styles.flagWrapper}>
                      <CountryFlag
                        isoCode={item.code.toLowerCase()}
                        style={styles.flagImage}
                      />
                    </View>
                    <View style={styles.countryInfo}>
                      <CustomText
                        label={item.label}
                        fontSize={16}
                        fontFamily={fonts.medium}
                        color={isSelected ? COLORS.primaryColor : COLORS.white}
                        style={{ flex: 1 }}
                      />
                      {hideCode && (
                        <CustomText
                          label={item.dialCode}
                          fontSize={14}
                          fontFamily={fonts.regular}
                          color={
                            isSelected ? COLORS.primaryColor : COLORS.white3
                          }
                        />
                      )}
                    </View>
                  </View>
                  <Icons
                    family="MaterialCommunityIcons"
                    name={isSelected ? "radiobox-marked" : "radiobox-blank"}
                    size={26}
                    color={isSelected ? COLORS.btnColor : COLORS.gray2}
                  />
                </TouchableOpacity>
              );
            }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            style={{ marginTop: 10 }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <CustomText
              label="No countries found"
              color={COLORS.inputLabel}
              fontSize={14}
              style={{ textAlign: "center" }}
            />
          </View>
        )}
      </View>
    </CustomModal>
  );
};

export default CountryBottomSheet;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.black,
    width: "100%",
    height: "100%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBlockColor: COLORS.inputBg,
    borderBottomWidth: 4,
    padding: 16,
  },
  crossContainer: {
    borderRadius: 100,
    backgroundColor: COLORS.inputBg,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  cross: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    tintColor: COLORS.white3,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 16,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBg,
  },
  countryContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  flagText: {
    fontSize: 24,
    marginRight: 15,
  },
  countryInfo: {
    flex: 1,
  },
  loadingFooter: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  noDataContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  flagWrapper: {
    width: 22,
    height: 22,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  flagImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});

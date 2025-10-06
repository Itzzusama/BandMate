import { Image, StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useState } from "react";

import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import TopTabWithBG from "../../../../components/TopTabWithBG";

import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const ParkingLocationFilter = ({
  isVisible,
  onDisable,
  onConfirm,
  onClearAll,
}) => {
  const [activeTab, setActiveTab] = useState("Location");
  const [selectedFilters, setSelectedFilters] = useState({
    // Location filters
    locationType: "Indoor",
    parkingType: "Vertical Rotatory Parking",
    amenities: ["Security Camera(s)"],
    
    // Vehicle filters
    vehicleType: "Ground",
    groundCategory: "Bikes",
    airCategory: "Planes",
    
    // Pricing filters
    period: "Per Day",
    pricingPerHour: "$$$$",
    pricingPerDay: "$$$$",
    pricingPerMonth: "$$$$",
  });

  const tabNames = ["Vehicle", "Location", "Pricing"];

  const toggleFilter = (category, value) => {
    if (category === "amenities") {
      setSelectedFilters(prev => ({
        ...prev,
        amenities: prev.amenities.includes(value)
          ? prev.amenities.filter(item => item !== value)
          : [...prev.amenities, value]
      }));
    } else {
      setSelectedFilters(prev => ({
        ...prev,
        [category]: value
      }));
    }
  };

  const FilterButton = ({ title, isSelected, onPress, style }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.filterButton,
        {
          backgroundColor: isSelected ? COLORS.black : COLORS.lightGray,
        },
        style
      ]}
    >
      <CustomText
        label={title}
        color={isSelected ? COLORS.white : COLORS.black}
        fontFamily={fonts.medium}
        fontSize={12}
        lineHeight={12*1.4}
      />
    </TouchableOpacity>
  );

  const renderLocationTab = () => (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.tabContent}>
      {/* Location Type */}
      <View style={styles.section}>
        <CustomText
          label="LOCATION TYPE"
          fontFamily={fonts.medium}
          fontSize={12}
          lineHeight={12*1.4}
          color={COLORS.gray1}
          marginBottom={12}
        />
        <View style={styles.filterRow}>
          <FilterButton
            title="Indoor"
            isSelected={selectedFilters.locationType === "Indoor"}
            onPress={() => toggleFilter("locationType", "Indoor")}
          />
          <FilterButton
            title="Outdoor"
            isSelected={selectedFilters.locationType === "Outdoor"}
            onPress={() => toggleFilter("locationType", "Outdoor")}
          />
        </View>
      </View>

      {/* Parking Type */}
      <View style={styles.section}>
        <CustomText
          label="PARKING TYPE"
          fontFamily={fonts.medium}
          fontSize={12}
          color={COLORS.gray1}
          marginBottom={12}
        />
        <View style={styles.filterGrid}>
          {["Parking With Roof", "Parking Without Roof", "Vertical Rotatory Parking", "Individual Garage", "Parking Complex", "Automated Complex"].map((type) => (
            <FilterButton
              key={type}
              title={type}
              isSelected={selectedFilters.parkingType === type}
              onPress={() => toggleFilter("parkingType", type)}
              style={styles.gridButton}
            />
          ))}
        </View>
      </View>

      {/* Amenities */}
      <View style={styles.section}>
        <CustomText
          label="AMENITIES"
          fontFamily={fonts.medium}
          fontSize={12}
          color={COLORS.gray1}
          marginBottom={12}
        />
        <View style={styles.filterGrid}>
          {["Parking Guidance Systems", "Electric Chargers", "Security Camera(s)", "Security Guard(s)", "License Plate Recognition", "7/7 Access", "Accessibility Features"].map((amenity) => (
            <FilterButton
              key={amenity}
              title={amenity}
              isSelected={selectedFilters.amenities.includes(amenity)}
              onPress={() => toggleFilter("amenities", amenity)}
              style={styles.gridButton}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderVehicleTab = () => (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.tabContent}>
      {/* Vehicle Type */}
      <View style={styles.section}>
        <CustomText
          label="VEHICLE TYPE"
          fontFamily={fonts.medium}
          fontSize={12}
          color={COLORS.gray1}
          marginBottom={12}
        />
        <View style={styles.filterRow}>
          {["Ground", "Sea", "Air"].map((type) => (
            <FilterButton
              key={type}
              title={type}
              isSelected={selectedFilters.vehicleType === type}
              onPress={() => toggleFilter("vehicleType", type)}
            />
          ))}
        </View>
      </View>

      {/* Ground Vehicle Category */}
      {selectedFilters.vehicleType === "Ground" && (
        <View style={styles.section}>
          <CustomText
            label="GROUND VEHICLE CATEGORY"
            fontFamily={fonts.medium}
            fontSize={12}
            color={COLORS.gray1}
            marginBottom={12}
          />
          <View style={styles.filterGrid}>
            {["Bikes", "Motorcycles", "Cars", "Limos", "Buses", "Trucks"].map((category) => (
              <FilterButton
                key={category}
                title={category}
                isSelected={selectedFilters.groundCategory === category}
                onPress={() => toggleFilter("groundCategory", category)}
                style={styles.gridButton}
              />
            ))}
          </View>
        </View>
      )}

      {/* Air Vehicle Category */}
      {selectedFilters.vehicleType === "Air" && (
        <View style={styles.section}>
          <CustomText
            label="AIR VEHICLE CATEGORY"
            fontFamily={fonts.medium}
            fontSize={12}
            color={COLORS.gray1}
            marginBottom={12}
          />
          <View style={styles.filterRow}>
            {["Planes", "Helicopters"].map((category) => (
              <FilterButton
                key={category}
                title={category}
                isSelected={selectedFilters.airCategory === category}
                onPress={() => toggleFilter("airCategory", category)}
              />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );

  const renderPricingTab = () => (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.tabContent}>
      {/* Period */}
      <View style={styles.section}>
        <CustomText
          label="PERIOD"
          fontFamily={fonts.medium}
          fontSize={12}
          color={COLORS.gray1}
          marginBottom={12}
        />
        <View style={styles.filterRow}>
          {["Per Hour", "Per Day", "Per Month"].map((period) => (
            <FilterButton
              key={period}
              title={period}
              isSelected={selectedFilters.period === period}
              onPress={() => toggleFilter("period", period)}
            />
          ))}
        </View>
      </View>

      {/* Pricing Per Hour */}
      <View style={styles.section}>
        <CustomText
          label="PRICING PER HOUR"
          fontFamily={fonts.medium}
          fontSize={12}
          color={COLORS.gray1}
          marginBottom={12}
        />
        <View style={styles.filterRow}>
          {["$", "$$", "$$$", "$$$$"].map((price) => (
            <FilterButton
              key={price}
              title={price}
              isSelected={selectedFilters.pricingPerHour === price}
              onPress={() => toggleFilter("pricingPerHour", price)}
            />
          ))}
        </View>
      </View>

      {/* Pricing Per Day */}
      <View style={styles.section}>
        <CustomText
          label="PRICING PER DAY"
          fontFamily={fonts.medium}
          fontSize={12}
          color={COLORS.gray1}
          marginBottom={12}
        />
        <View style={styles.filterRow}>
          {["$", "$$", "$$$", "$$$$"].map((price) => (
            <FilterButton
              key={price}
              title={price}
              isSelected={selectedFilters.pricingPerDay === price}
              onPress={() => toggleFilter("pricingPerDay", price)}
            />
          ))}
        </View>
      </View>

      {/* Pricing Per Month */}
      <View style={styles.section}>
        <CustomText
          label="PRICING PER MONTH"
          fontFamily={fonts.medium}
          fontSize={12}
          color={COLORS.gray1}
          marginBottom={12}
        />
        <View style={styles.filterRow}>
          {["$", "$$", "$$$", "$$$$"].map((price) => (
            <FilterButton
              key={price}
              title={price}
              isSelected={selectedFilters.pricingPerMonth === price}
              onPress={() => toggleFilter("pricingPerMonth", price)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Location":
        return renderLocationTab();
      case "Vehicle":
        return renderVehicleTab();
      case "Pricing":
        return renderPricingTab();
      default:
        return renderLocationTab();
    }
  };

  return (
    <CustomModal isChange isVisible={isVisible} onDisable={onDisable}>
      <View
        style={{
          padding: 5,
          width: "95%",
          alignSelf: "center",
          borderRadius: 24,
          marginBottom: 12,
          maxHeight: "90%",
          borderWidth: 1,
          backgroundColor: "#FFFFFF29",
          borderColor: "rgba(255, 255, 255, 0.16)",
        }}
      >
        <BlurView
          style={{
            maxHeight: "100%",
            width: "100%",
            borderRadius: 24,
          }}
          blurType="light"
          blurAmount={26}
          reducedTransparencyFallbackColor="#FFFFFF29"
        />

        <View style={styles.mainContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <CustomText
                label="Filters"
                fontFamily={fonts.medium}
                fontSize={24}
                color={COLORS.black}
              />
              <CustomText
                label="Find the Parking Spot that suits you!"
                fontFamily={fonts.medium}
                fontSize={14}
                color={COLORS.gray1}
                marginTop={4}
              />
            </View>
            <TouchableOpacity
              onPress={onDisable}
              style={styles.closeButton}
            >
              <Image source={PNGIcons.cross} style={styles.icon} />
            </TouchableOpacity>
          </View>

          {/* Tab Navigation */}
          <TopTabWithBG
            tab={activeTab}
            setTab={setActiveTab}
            tabNames={tabNames}
            fontSize={14}
            marginVertical={20}
            paddingVertical={8}
          />

          {/* Tab Content */}
          <View style={styles.contentContainer}>
            {renderTabContent()}
          </View>

          {/* Bottom Buttons */}
          <View style={styles.bottomButtons}>
            <CustomButton
              title="Clear All"
              backgroundColor={COLORS.lightGray}
              color={COLORS.black}
              onPress={onClearAll}
              style={styles.clearButton}
              width="49%"
            />
            <CustomButton
              title="Confirm"
              backgroundColor={COLORS.black}
              color={COLORS.white}
              onPress={() => onConfirm && onConfirm(selectedFilters)}
              style={styles.confirmButton}
              width="49%"

            />
          </View>
        </View>
      </View>
    </CustomModal>
  );
};

export default ParkingLocationFilter;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  closeButton: {
    height: 32,
    width: 32,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGray,
  },
  icon: {
    height: 16,
    width: 16,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 20,
  },
  tabContent: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  gridButton: {
    marginBottom: 8,
  },
  bottomButtons: {
    flexDirection: "row",
    gap: 12,
  },
  clearButton: {
    flex: 1,
  },
  confirmButton: {
    flex: 1,
  },
});

import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import SearchInput from "../../../components/SearchInput";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const SelectLocation = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const locations = [
    {
      id: "1",
      name: "San Francisco",
      region: "California, USA",
      distance: "Currently here",
      isCurrent: true,
    },
    {
      id: "2",
      name: "Los Angeles",
      region: "California, USA",
      distance: "220 km",
    },
    {
      id: "3",
      name: "Sacramento",
      region: "California, USA",
      distance: "220 km",
    },
    {
      id: "4",
      name: "San Diego",
      region: "California, USA",
      distance: "220 km",
    },
    {
      id: "5",
      name: "El Paso",
      region: "New Mexico, USA",
      distance: "220 km",
    },
    {
      id: "6",
      name: "Austin",
      region: "Texas, USA",
      distance: "220 km",
    },
  ];

  const handleLocationSelect = (location) => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <SearchInput
            placeholder="Search location..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            marginBottom={16}
            isCross
          />
        </View>

        {/* Select on Map Option */}

        <View style={styles.border} />
        <TouchableOpacity style={styles.mapOption} activeOpacity={0.7}>
          <Icons
            family="MaterialIcons"
            name="map"
            size={24}
            color={COLORS.black}
          />
          <CustomText
            label="Select On The Map"
            fontSize={16}
            fontFamily={fonts.medium}
            marginLeft={12}
          />
          <View style={styles.chevron}>
            <Icons
              family="Ionicons"
              name="chevron-forward"
              size={20}
              color={COLORS.gray}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.border} />

        {/* Location List */}
        <FlatList
          data={locations}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={styles.locationItem}
              onPress={() => handleLocationSelect(item)}
              activeOpacity={0.7}
            >
              <View style={styles.locationInfo}>
                {item.isCurrent && (
                  <View style={styles.currentLocationIcon}>
                    <Icons
                      family="FontAwesome6"
                      name="location-dot"
                      size={20}
                      color={COLORS.darkPurple}
                    />
                  </View>
                )}
                <View>
                  <CustomText
                    label={item.name}
                    fontSize={16}
                    fontFamily={fonts.medium}
                  />
                  <CustomText
                    label={item.region}
                    fontSize={14}
                    color={COLORS.gray2}
                    fontFamily={fonts.medium}
                    marginTop={-6}
                  />
                </View>
              </View>
              <CustomText
                label={item.distance}
                fontSize={14}
                color={COLORS.gray1}
                fontFamily={fonts.medium}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ScreenWrapper>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },
  mapOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  chevron: {
    marginLeft: "auto",
  },
  listContainer: {
    paddingTop: 8,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentLocationIcon: {
    marginRight: 8,
  },
  border: {
    height: 4,
    backgroundColor: COLORS.lightGray,
  },
});

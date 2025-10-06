import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import ImageFast from "../../../../components/ImageFast";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";

const tripData = [
  { id: 1, name: "Geneva Water Jet" },
  { id: 2, name: "Mur Des Reformateurs" },
  { id: 3, name: "Jardin Anglais" },
];

const TripSpots = () => {
  return (
    <View>
      <FlatList
        data={tripData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.row,
              index === tripData.length - 1 && { marginBottom: 0 }, // remove mb for last
            ]}
          >
            <ImageFast
              style={styles.icon}
              resizeMode={"contain"}
              source={PNGIcons.spec}
            />
            <CustomText
              fontSize={16}
              label={item.name}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
            />
          </View>
        )}
      />
    </View>
  );
};

export default TripSpots;

const styles = StyleSheet.create({
  icon: {
    width: 14.4,
    height: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginBottom: 10,
  },
});

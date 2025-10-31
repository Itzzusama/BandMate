import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import SearchInput from "../../../../components/SearchInput";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import { useNavigation } from "@react-navigation/native";
import { PNGIcons } from "../../../../assets/images/icons";
const SearchEventHeader = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <SearchInput
          placeholder={"Search Location..."}
          borderRadius={99}
          isCross
          value={query}
          onChangeText={(text) => setQuery(text)}
        />
      </View>

      <TouchableOpacity
        style={styles.iconContainer}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={PNGIcons.white_cross}
          style={{
            height: 20,
            width: 20,
            marginTop: 2,
            tintColor: COLORS.white3,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchEventHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  iconContainer: {
    borderRadius: 99,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cardColor,
  },
});

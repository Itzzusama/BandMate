import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import SearchInput from "../../../components/SearchInput";
import { COLORS } from "../../../utils/COLORS";
import { ToastMessage } from "../../../utils/ToastMessage";

const VehicleMake = ({ route }) => {
  const navigation = useNavigation();
  const options = route?.params?.options || [];
  const onSelectBrand = route?.params?.onSelectBrand;
  const [selectedBrand, setSelectedBrand] = useState(null);


  // Simple pagination over provided options
  const PAGE_SIZE = 20;
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState(options.slice(0, PAGE_SIZE));

  useEffect(() => {
    setItems(options.slice(0, page * PAGE_SIZE));
  }, [page, options]);

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Select a Vehicle Make"} />}
      footerUnScrollable={() => (
        <View style={{ padding: 14 }}>
          <AuthFooter
            title={"Accept & Confirm"}
            onPress={() => {
              if (selectedBrand && typeof onSelectBrand === "function") {
                onSelectBrand(selectedBrand);
                navigation.goBack();
              } else {
                ToastMessage("Please Select A Vehicle Make", "error");
              }
            }}
          />
        </View>
      )}
    >
      <CustomText
        label={"Vehicle Make"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={20}
      />
      <CustomText
        label={"Find below the different options:"}
        lineHeight={14 * 1.4}
      />

      <SearchInput
        placeholder={"Search Vehicle Make..."}
        marginBottom={16}
        marginTop={16}
        isCross
      />

      <FlatList
        numColumns={2}
        data={items}
        columnWrapperStyle={styles.row}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          if (items.length < options.length) setPage((p) => p + 1);
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.typeCard,
              selectedBrand === item && {
                borderWidth: 1,
                borderColor: COLORS.primaryColor,
                borderRadius: 12,
              },
            ]}
            onPress={() => {
              setSelectedBrand(item);
            }}
          >
            <CustomText
              label={item}
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={16 * 1.4}
            />
            <View style={[styles.imageContainer]}>
              <ImageFast
                source={Images.carModal3d}
                style={styles.image}
                resizeMode={"contain"}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </ScreenWrapper>
  );
};

export default VehicleMake;

const styles = StyleSheet.create({
  typeCard: {
    width: "49.2%",
    backgroundColor: COLORS.lightGray,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  separator: {
    height: 5,
  },
  imageContainer: {
    height: 115,
    width: 115,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

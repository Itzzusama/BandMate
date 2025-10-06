import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { ToastMessage } from "../../../utils/ToastMessage";

const VehicleType = ({ route, navigation }) => {
  const vehicleTypes = ["car", "motorcycle", "truck"];
  const onSelectType = route?.params?.onSelectType;
  const [selectedType, setSelectedType] = useState(null);

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Select a Vehicle Type"} />}
      footerUnScrollable={() => (
        <View style={{ padding: 14 }}>
          <AuthFooter
            title={"Accept & Confirm"}
            onPress={() => {
              if (selectedType && typeof onSelectType === "function") {
                onSelectType(selectedType);
                navigation.goBack();
              } else {
                ToastMessage("Please Select A Vehicle Type", "error");
              }
            }}
          />
        </View>
      )}
    >
      <CustomText
        label={"Vehicle Type"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={20}
      />
      <CustomText
        label={"Find below the different options:"}
        lineHeight={14 * 1.4}
        marginBottom={32}
      />
      <FlatList
        numColumns={2}
        data={vehicleTypes}
        columnWrapperStyle={styles.row}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[
              styles.typeCard,
              selectedType === item && {
                borderWidth: 1,
                borderColor: COLORS.primaryColor,
                borderRadius: 12,
              },
            ]}
            onPress={() => {
              setSelectedType(item);
            }}
          >
            <CustomText
              label={item}
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={16 * 1.4}
            />
            <CustomText
              label={"7 makers"}
              fontSize={12}
              lineHeight={12 * 1.4}
              color={COLORS.gray2}
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
      <CustomText
        label={
          "Make it an habit for your own safety to take photos before & after bookings as it is highly recommended."
        }
        lineHeight={14 * 1.4}
        color={COLORS.gray1}
      />
    </ScreenWrapper>
  );
};

export default VehicleType;

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

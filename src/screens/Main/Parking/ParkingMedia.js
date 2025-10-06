import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import ErrorComponent from "../../../components/ErrorComponent";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthSlider from "../../../components/Auth/AuthSlider";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Header from "../../../components/Header";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const ParkingMedia = () => {
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title="New Parking Spot" />}
      footerUnScrollable={() => (
        <View style={{ padding: 12 }}>
          <CustomButton
            title="Continue"
            marginTop={24}
            marginBottom={12}
            fontFamily={fonts.medium}
          />
          <CustomButton
            title="Save As Draft"
            backgroundColor={COLORS.lightGray}
            color={COLORS.black}
            fontFamily={fonts.medium}
            marginBottom={24}
          />
        </View>
      )}
    >
      <AuthSlider min={2} max={2} marginTop={1} marginBottom={18} />
      <CustomText
        label="Media"
        fontSize={24}
        fontFamily={fonts.semiBold}
        color={COLORS.black}
      />
      <CustomText
        label="Please provide us with some images of the place."
        color={COLORS.gray1}
        marginTop={-6}
      />
      <CustomText label="1:1 Cover" marginTop={20} fontSize={18} />

      <ImageFast
        source={Images.starWars}
        style={{ height: 350, width: "100%", alignSelf: "center" }}
        resizeMode={"contain"}
      />
      <ErrorComponent errorTitle={"JPEG"} marginTop={10} />

      <View style={styles.imagesRow}>
        <TouchableOpacity
          style={styles.addPic}
          // onPress={() => handleImageAdd(index)}
        >
          <ImageFast
            source={Images.camera1}
            style={{ height: 20, width: 20 }}
          />
          <CustomText
            label="Add More"
            fontSize={8}
            color={COLORS.gray3}
            marginTop={4}
          />
        </TouchableOpacity>
        <FlatList
          data={[1, 2, 3, 4]}
          keyExtractor={(_, i) => i?.toString()}
          horizontal
          renderItem={({ item, index }) => (
            <ImageFast
              isView
              source={Images.inventory}
              style={{ height: 58, width: 58, marginRight: 12 }}
            />
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ParkingMedia;

const styles = StyleSheet.create({
  imagesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  addPic: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: COLORS.inputBg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginRight: 8,
  },
});

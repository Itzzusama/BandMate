import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { useNavigation } from "@react-navigation/native";

const options = [
  {
    name: "Mini",
    size: "1-2.5m² / 2-6m³",
  },
  {
    name: "Small",
    size: "3-4m² / 7-10m³",
  },
  {
    name: "Medium",
    size: "5-6m² / 13-15m³",
  },
  {
    name: "Large",
    size: "8-12 sqm",
  },
  {
    name: "X-Large",
    size: "10m² / + 26m³",
  },
  {
    name: "XX-Large",
    size: "+ 14m² / + 36m³",
  },
];

const InfoBox = ({ title }) => (
  <View style={styles.info}>
    <Icons name={"info"} family={"Feather"} size={12} color={COLORS.subtitle} />
    <CustomText
      fontSize={10}
      label={title}
      lineHeight={10 * 1.4}
      textTransform={"none"}
      color={COLORS.subtitle}
    />
  </View>
);

const WarehouseStorage = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(options[0]?.name);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header title={"Storage Options"} onHelpPress={() => ""} />
      )}
      footerUnScrollable={() => (
        <AuthFooter
          paddingHorizontal={12}
          btnTitle={"+83 available spots"}
          secondText={"From Dec 1 - Dec 3"}
          onPress={() => navigation.navigate("TabStack", { screen: "Home" })}
        />
      )}
    >
      <CustomText
        fontSize={24}
        marginTop={10}
        label={selected}
        lineHeight={24 * 1.4}
        fontFamily={fonts.semiBold}
      />
      <View style={styles.imgBox}>
        <ImageFast
          style={styles.img}
          resizeMode={"contain"}
          source={Images.warehouse}
        />
      </View>
      <View style={styles.card}>
        <CustomText
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
          label={"YOU CAN STORE THE EQUIVALENT OF:"}
        />
        <InfoBox title={"A 140-200 m² or 36 m³ commercial vehicle"} />
        <InfoBox title={"A 40 m³ commercial vehicle"} />
        <InfoBox title={"200 cardboard boxes"} />
      </View>

      <View>
        <CustomText
          marginTop={15}
          marginBottom={10}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
          label={"STANDARD OPTIONS:"}
        />
        <FlatList
          data={options}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.sizeBox,
                selected === item?.name && styles.sizeBoxSelected,
              ]}
              onPress={() => setSelected(item?.name)}
            >
              <CustomText
                fontSize={16}
                label={item?.name}
                lineHeight={16 * 1.4}
                fontFamily={fonts.medium}
              />
              <CustomText
                fontSize={12}
                marginBottom={5}
                label={item?.size}
                lineHeight={12 * 1.4}
                color={COLORS.subtitle}
                fontFamily={fonts.medium}
              />
              <CustomText
                fontSize={12}
                label={"From $15"}
                lineHeight={12 * 1.4}
                fontFamily={fonts.medium}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default WarehouseStorage;

const styles = StyleSheet.create({
  imgBox: {
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    marginTop: 13,
    overflow: "hidden",
  },
  img: {
    width: 330,
    height: 250,
  },
  info: {
    alignItems: "center",
    flexDirection: "row",
    columnGap: 5,
    marginTop: 6,
  },
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    marginTop: 8,
  },
  sizeBox: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "rgba(18, 18, 18, 0.04)",
    height: 85,
    marginRight: 10,
    minWidth: 120,
  },
  sizeBoxSelected: {
    borderColor: COLORS.black,
    borderWidth: 2,
    backgroundColor: "rgba(18, 18, 18, 0.04)",
  },
});

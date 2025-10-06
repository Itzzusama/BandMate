import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";

const UNIT_OPTIONS = ["Centimeter (cm)", "Meter (m)"];

const AddInventoryItem = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([
    {
      id: 1,
      images: [],
      title: "Chair",
      length: "16",
      width: "24",
      unit: "Centimeter (cm)",
      specialCare: true,
    },
    {
      id: 2,
      images: [],
      title: "Chair",
      length: "16",
      width: "24",
      unit: "Meter (m)",
      specialCare: false,
    },
    {
      id: 3,
      images: [],
      title: "Chair",
      length: "16",
      width: "24",
      unit: "Meter (m)",
      specialCare: false,
    },
  ]);

  const handleItemChange = (idx, key, value) => {
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [key]: value } : item))
    );
  };

  return (
    <ScreenWrapper
      scrollEnabled
      paddingBottom={12}
      headerUnScrollable={() => <Header title={"Living Room Inventory"} />}
      footerUnScrollable={() => (
        <View style={{ padding: 12 }}>
          <CustomButton
            title={"Back"}
            backgroundColor={COLORS.inputBg}
            color={COLORS.primaryColor}
            icon={Images.back}
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    >
      <CustomText
        label="Living Room Inventory"
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={8}
        marginBottom={5}
      />
      <CustomText
        label={
          "Here below you will find all the listed items to be moved for the living room."
        }
        color={COLORS.gray3}
        lineHeight={14 * 1.4}
        marginBottom={20}
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemCard}>
            <CustomText
              label={`Item ${index + 1}`}
              fontFamily={fonts.medium}
              fontSize={18}
              marginBottom={10}
            />
            <View style={styles.imagesRow}>
              <FlatList
                data={[1, 2, 3, 4]}
                keyExtractor={(item) => item?.id?.toString()}
                horizontal
                renderItem={({ item, index }) => (
                  <ImageFast
                    isView
                    source={Images.inventory}
                    style={{
                      height: 64,
                      width: 64,
                      marginRight: 12,
                      borderWidth: 1,
                      borderColor: "#1212120A",
                      padding: 3,
                      borderRadius: 12,
                    }}
                  />
                )}
              />
            </View>
            <CustomInput
              value={item.title}
              onChangeText={(text) => handleItemChange(index, "title", text)}
              placeholder="Item Title"
              withLabel="ITEM TITLE"
              marginBottom={8}
            />
            <View style={styles.row}>
              <CustomInput
                value={item.length}
                onChangeText={(text) => handleItemChange(index, "length", text)}
                placeholder="Length"
                keyboardType="numeric"
                withLabel={"(L) " + item.unit}
                width="49%"
                marginBottom={8}
              />
              <CustomInput
                value={item.width}
                onChangeText={(text) => handleItemChange(index, "width", text)}
                placeholder="Width"
                keyboardType="numeric"
                withLabel={"(W) " + item.unit}
                width="49%"
                marginBottom={8}
              />
            </View>
          </View>
        )}
        ListFooterComponent={<View style={{ height: 12 }} />}
      />

      <View style={styles.border} />

      <CustomText label={"Video(s)"} fontFamily={fonts.medium} fontSize={18} />
      <CustomText
        label={
          "If you have a walkthrough video that would help, but that remains optional."
        }
        color={COLORS.gray3}
        fontSize={12}
        marginBottom={8}
      />

      <FlatList
        data={[1, 2, 3, 4]}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        renderItem={({ item, index }) => <View style={styles.videoCard}></View>}
        ListFooterComponent={<View style={{ height: 12 }} />}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    marginBottom: 8,
  },
  imagesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
  imageWrap: {
    position: "relative",
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 8,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  deleteIcon: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    padding: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  border: {
    backgroundColor: COLORS.lightGray,
    width: "100%",
    height: 1,
    marginBottom: 16,
  },
  videoCard: {
    height: 210,
    width: 120,
    backgroundColor: "#D9D9D9",
    marginRight: 8,
    borderRadius: 12,
  },
});

export default AddInventoryItem;

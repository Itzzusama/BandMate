import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import ErrorComponent from "../../../components/ErrorComponent";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Header from "../../../components/Header";

import ToggleCard from "./molecules/ToggleCard";
import UploadCard from "./molecules/UploadCard";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const RoomInventory = () => {
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
  const [video, setVideo] = useState(null);

  const handleAddItem = () => {
    navigation.navigate("AddInventoryItem");
    // setItems([
    //   ...items,
    //   {
    //     id: Date.now(),
    //     images: [],
    //     title: "",
    //     length: "",
    //     width: "",
    //     unit: UNIT_OPTIONS[0],
    //     specialCare: false,
    //   },
    // ]);
  };

  const handleItemChange = (idx, key, value) => {
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [key]: value } : item))
    );
  };

  const handleImageAdd = (idx) => {
    // Mock image add
    handleItemChange(idx, "images", [
      ...items[idx]?.images,
      { uri: Images?.placeholderImage },
    ]);
  };
  const handleImageDelete = (idx, imgIdx) => {
    handleItemChange(
      idx,
      "images",
      items[idx]?.images?.filter((_, i) => i !== imgIdx)
    );
  };

  const handleVideoUpload = () => {
    setVideo({ name: "walkthrough.mp4" });
  };
  const handleVideoDelete = () => setVideo(null);

  return (
    <ScreenWrapper
      scrollEnabled
      paddingBottom={12}
      headerUnScrollable={() => <Header title={"Living Room Inventory"} />}
      footerUnScrollable={() => (
        <View style={{ padding: 12 }}>
          <CustomButton title={"Continue"} marginBottom={8} />
          <CustomButton
            title={"Save As Draft"}
            backgroundColor={COLORS.inputBg}
            color={COLORS.primaryColor}
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
        label="Here below you will find all the listed items to be moved for the living room."
        color={COLORS.gray3}
        lineHeight={14 * 1.4}
        marginBottom={20}
      />
      <CustomButton
        title="+ Add An Item"
        onPress={handleAddItem}
        backgroundColor={COLORS.inputBg}
        color={COLORS.primaryColor}
        marginBottom={6}
      />
      <ErrorComponent
        errorTitle="Adding dimensions is recommended but optional."
        alignSelf="center"
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginVertical: 32,
        }}
      >
        <CustomText
          label={items.length}
          fontFamily={fonts.semiBold}
          fontSize={22}
          lineHeight={22 * 1.4}
        />
        <CustomText
          label="Total Items"
          fontFamily={fonts.semiBold}
          fontSize={18}
          lineHeight={18 * 1.4}
          color="#121212A3"
        />
      </View>
      <View style={styles.border} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemCard}>
            <CustomText
              label={`Item ${index + 1}`}
              fontFamily={fonts.medium}
              fontSize={18}
              lineHeight={18 * 1.4}
              marginBottom={10}
            />
            <View style={styles.imagesRow}>
              <TouchableOpacity
                style={styles.addPic}
                onPress={() => handleImageAdd(index)}
              >
                <ImageFast
                  source={Images.camera1}
                  style={{ height: 20, width: 20 }}
                />
                <CustomText
                  label="Add A Picture"
                  fontSize={8}
                  color={COLORS.gray3}
                  marginTop={4}
                />
              </TouchableOpacity>
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
            {/* <CustomDropdown
              data={UNIT_OPTIONS}
              value={item.unit}
              setValue={(val) => handleItemChange(index, "unit", val)}
              withLabel="UNIT"
              marginBottom={8}
            /> */}
            <ToggleCard
              label1={"Does it require extra special care?"}
              label2={item.specialCare ? "Yes" : "No"}
              value={item.specialCare}
              setValue={(val) => handleItemChange(index, "specialCare", val)}
            />
          </View>
        )}
        ListFooterComponent={<View style={{ height: 12 }} />}
      />

      <View style={styles.border} />

      <CustomText
        label="Join A Video"
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
        fontSize={18}
        marginBottom={4}
      />
      <CustomText
        label="If you have a walkthrough video that would help, but that remains optional."
        color={COLORS.gray3}
        fontSize={12}
        marginBottom={8}
        lineHeight={12 * 1.4}
      />
      <UploadCard
        label="Upload a Video"
        file={video}
        onUpload={handleVideoUpload}
        onDelete={handleVideoDelete}
        accept="video/mp4"
        maxSize={20 * 1024 * 1024}
        info="MP4 only. 20MB."
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
    marginBottom: 12,
    gap: 8,
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
    marginRight: 5,
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
    marginBottom: 32,
  },
});

export default RoomInventory;

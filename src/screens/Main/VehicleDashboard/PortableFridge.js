import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import ImageFast from "../../../components/ImageFast";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import CustomButton from "../../../components/CustomButton";

const PortableFridge = () => {
  const [count, setCount] = useState(1);

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Portable Fridge"} />}
      footerUnScrollable={() => (
        <CustomButton title={"Order Now"} width="90%" marginBottom={12} />
      )}
    >
      <CustomText
        label={"High Capacity Portable Folding Insulated Cooler Box"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
      />
      <CustomText label={"By move"} fontSize={14} lineHeight={14 * 1.4} />
      <ImageFast source={Images.fridgePlaceholder} style={styles.fridgeImage} />

      <CustomText
        label={"High capacity & high quality"}
        fontSize={12}
        lineHeight={12 * 1.4}
        marginTop={8}
      />
      <CustomText
        label={"50x 0.5l bottles"}
        fontSize={12}
        lineHeight={12 * 1.4}
        marginBottom={5}
      />
      <View style={styles.boxRow}>
        <View style={[styles.box, { backgroundColor: "#37B874" }]}>
          <CustomText
            label={"Ve"}
            fontSize={8}
            lineHeight={8 * 1.4}
            color="#fff"
            textAlign="center"
          />
        </View>
        <View style={[styles.box, { backgroundColor: "#F7941F" }]}>
          <CustomText
            label={"V"}
            lineHeight={8 * 1.4}
            fontSize={8}
            color="#fff"
            textAlign="center"
          />
        </View>
        <View style={[styles.box, { backgroundColor: "#776A3D" }]}>
          <CustomText
            label={"GF"}
            fontSize={8}
            lineHeight={8 * 1.4}
            color="#fff"
            textAlign="center"
          />
        </View>
        <View style={[styles.box, { backgroundColor: COLORS.primaryColor }]}>
          <CustomText
            label={"SF"}
            fontSize={8}
            lineHeight={8 * 1.4}
            color="#fff"
            textAlign="center"
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CustomText
            label={"$35.00"}
            color={COLORS.green}
            fontSize={24}
            lineHeight={24 * 1.4}
            fontFamily={fonts.medium}
          />

          <CustomText
            label={"$40.00"}
            textDecorationLine={"line-through"}
            fontSize={16}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
            marginLeft={4}
          />
        </View>

        <View style={styles.incrementContainer}>
          <TouchableOpacity
            onPress={() => setCount((prev) => Math?.max(1, prev - 1))}
            style={styles.circleButton}
          >
            <CustomText label={"−"} fontSize={24} lineHeight={24 * 1.4} />
          </TouchableOpacity>

          <CustomText
            label={count}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
          />

          <TouchableOpacity
            onPress={() => setCount((prev) => prev + 1)}
            style={styles.circleButton}
          >
            <CustomText fontSize={24} lineHeight={24 * 1.4} label={"+"} />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default PortableFridge;

const styles = StyleSheet.create({
  fridgeImage: {
    height: 350,
    width: 350,
    alignSelf: "center",
    marginTop: 32,
  },
  boxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  box: {
    height: 16,
    width: 16,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  incrementContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  circleButton: {
    height: 32,
    width: 32,
    borderRadius: 99,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});

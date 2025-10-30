import { FlatList, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { Images } from "../../../../assets/images";

const MomentCard = () => {
  const data = useMemo(
    () => [
      { type: "add" },
      { type: "image", src: Images.person },
      { type: "image", src: Images.person },
      { type: "image", src: Images.person },
    ],
    []
  );

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.row, styles.spaceBetween]}>
        <View style={styles.row}>
          <CustomText
            label={"MOMENTS"}
            color={COLORS.gray2}
            fontFamily={fonts.medium}
          />
          <CustomText
            label={"14"}
            color={COLORS.white}
            fontFamily={fonts.medium}
          />
        </View>
        <View style={styles.row}>
          <Icons
            name={"controller-play"}
            family={"Entypo"}
            color={"#FFFFFF29"}
          />
          <CustomText
            label={"PLAY ALL"}
            color={COLORS.white}
            fontFamily={fonts.medium}
          />
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(_, i) => `moment-${i}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => {
          return (
            <View
              style={[
                styles.card,
                //   borderStyle,
                item.type === "image" && styles.cardNoPadding,
              ]}
            >
              {item.type === "add" ? (
                <Icons
                  name={"plus"}
                  family={"Feather"}
                  color={COLORS.white}
                  size={30}
                />
              ) : (
                <ImageFast source={item.src} style={styles.cardImage} />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default MomentCard;

const styles = StyleSheet.create({
  mainContainer: { padding: 12, backgroundColor: COLORS.black },
  row: { flexDirection: "row", alignItems: "center", gap: 4 },
  spaceBetween: { justifyContent: "space-between" },
  listContent: { gap: 10, marginTop: 16 },
  card: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF0A",
    height: 120,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  cardNoPadding: { padding: 0 },
  cardImage: { width: "100%", height: "100%", borderRadius: 8 },
});

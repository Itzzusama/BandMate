import { FlatList, StyleSheet, View } from "react-native";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import Icons from "../../../../components/Icons";

import { PNGIcons } from "../../../../assets/images/icons";
import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const actions = [
  {
    icon: "music-off",
    family: "MaterialIcons",
    onAction: () => "",
  },
  {
    icon: "lightbulb-outline",
    family: "MaterialIcons",
    onAction: () => "",
  },
  {
    icon: "voice-over-off",
    family: "MaterialIcons",
    onAction: () => "",
  },
  {
    icon: "air",
    family: "MaterialIcons",
    onAction: () => "",
  },
  {
    icon: "hand-right-sharp",
    family: "Ionicons",
    onAction: () => "",
    color: "#EE1045",
  },
  {
    image: PNGIcons.noFood,
    onAction: () => "",
  },
];

const DuringTripActions = () => {
  return (
    <View>
      <CustomText
        fontSize={18}
        label="Actions"
        marginBottom={15}
        color={COLORS.black}
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
      />

      <FlatList
        data={actions}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={styles.actionIcons}>
            {item?.icon ? (
              <Icons
                size={30}
                name={item?.icon}
                family={item?.family}
                color={item?.color || COLORS.black}
              />
            ) : (
              <ImageFast
                style={styles.icon}
                source={item?.image}
                resizeMode={"contain"}
              />
            )}
          </View>
        )}
      />
      <View style={[styles.btn]}>
        <CustomText
          fontSize={18}
          color={COLORS.black}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
          label={"Share Trip Status"}
        />
        <ImageFast source={Images.Share} style={{ width: 16, height: 16 }} />
      </View>
    </View>
  );
};

export default DuringTripActions;

const styles = StyleSheet.create({
  actionIcons: {
    padding: 12,
    backgroundColor: "#1212120A",
    height: 64,
    borderRadius: 12,
    width: "32%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    width: 26,
    height: 26,
  },
  btn: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 12,
    backgroundColor: "#1212120A",
    borderRadius: 12,
    justifyContent: "center",
  },
});

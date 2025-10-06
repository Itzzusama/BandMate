import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const OrderDropOffAndPickup = () => {
  const [isSelected, setIsSelected] = useState("");

  return (
    <View>
      <View style={styles.row1}>
        <View style={styles.row}>
          <CustomText
            fontSize={18}
            lineHeight={18 * 1.4}
            fontFamily={fonts.medium}
            label={"Pickup & Drop-off"}
          />
          <Image source={PNGIcons.dropOff} style={styles.icon} />
        </View>
        <TouchableOpacity>
          <Icons
            size={22}
            family={"Entypo"}
            name={"chevron-down"}
            color={COLORS.subtitle}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <View style={{ flex: 1, paddingRight: 5 }}>
          <CustomText
            fontSize={12}
            label={"From"}
            marginBottom={5}
            lineHeight={12 * 1.2}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
          />
          <View style={styles.row}>
            <Icons name={"location-dot"} family={"FontAwesome6"} size={15} />
            <CustomText
              fontSize={16}
              numberOfLines={1}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
              label={"Chemin du Centurion 11, 1209, Geneva"}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.circleIcon}>
          <Icons
            size={20}
            color={"#4347FF"}
            name={"directions"}
            family={"MaterialIcons"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <View style={{ flex: 1, paddingRight: 5 }}>
          <CustomText
            fontSize={12}
            label={"Drop-off"}
            marginBottom={5}
            lineHeight={12 * 1.2}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
          />
          <View style={styles.row}>
            <Icons name={"location-dot"} family={"FontAwesome6"} size={15} />
            <CustomText
              fontSize={16}
              numberOfLines={1}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
              label={"Chemin du Centurion 11, 1209, Geneva"}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.circleIcon, { backgroundColor: "#EE104529" }]}
        >
          <Icons
            size={20}
            color={"#EE1045"}
            name={"delete-forever"}
            family={"MaterialIcons"}
          />
        </TouchableOpacity>
      </View>
      <CustomText
        fontSize={16}
        marginTop={15}
        lineHeight={16 * 1.4}
        fontFamily={fonts.medium}
        label={"Select An Option"}
      />
      <View style={styles.selectedContainer}>
        {["at the curb", "at the doorstep", "at the reception"].map(
          (item, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.9}
              onPress={() => setIsSelected(item)}
              style={[
                styles.row,
                styles.border,
                { borderBottomWidth: i == 2 ? 0 : 1 },
              ]}
            >
              <Icons
                family="MaterialCommunityIcons"
                name={
                  isSelected === item ? "radiobox-marked" : "radiobox-blank"
                }
                size={28}
                color={isSelected === item ? COLORS.darkPurple : COLORS.gray2}
              />

              <CustomText
                label={item}
                fontSize={16}
                marginLeft={2}
                lineHeight={16 * 1.4}
                fontFamily={fonts.medium}
                textTransform={"capitalize"}
              />
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

export default OrderDropOffAndPickup;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
  },
  row1: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
  },
  icon: {
    width: 16,
    height: 17,
  },
  box: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  circleIcon: {
    width: 32,
    height: 32,
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#4347FF29",
    marginLeft: 10,
  },
  selectedContainer: {
    marginTop: 12,
    backgroundColor: "#1212120A",
    borderRadius: 12,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#1212120A",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

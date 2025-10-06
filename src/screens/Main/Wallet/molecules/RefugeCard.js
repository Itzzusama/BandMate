import { StyleSheet, Image, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import CustomButton from "../../../../components/CustomButton";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import { Images } from "../../../../assets/images";

const RefugeCard = ({ isChange }) => {
  // Local palette tuned to the screenshot
  const MUTED_BG = "#F3F3F3";

  return (
    <View style={[styles.card]}>
      {/* Top row */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Avatar */}
        <View style={[styles.avatar, { backgroundColor: "#4347FF29" }]}>
          <CustomText
            label="FS"
            color={COLORS.darkPurple}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.2}
          />
          {/* Orange badge */}
          <View style={[styles.badgeOuter, { borderColor: COLORS.orange }]}>
            <Image
              source={Images.refugeBadge}
              style={{ height: 16, width: 16 }}
            />
          </View>
        </View>

        {/* Title + subtitle + status */}
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CustomText
              label="Firstname Surname"
              fontFamily={fonts.medium}
              lineHeight={14 * 1.4}
              color={COLORS.primaryColor}
            />
            <CustomText
              label="Fr+1"
              color={COLORS.gray1}
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={16 * 1.4}
            />
          </View>
          <CustomText
            label="Today, 23:33 • Note"
            color={"#828282"}
            lineHeight={14 * 1.4}
          />
          <CustomText
            label="Owes you"
            color={"#F17E04"}
            fontFamily={fonts.medium}
            lineHeight={14 * 1.4}
          />
        </View>
      </View>

      {/* Bottom action */}
      {isChange ? (
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <CustomButton
            title="Accept"
            backgroundColor={"#4347FF0A"}
            color={"#4347FF"}
            width={"49%"}
            height={40}
            borderRadius={38}
            marginTop={18}
            fontSize={14}
            fontFamily={fonts.medium}
          />
          <CustomButton
            title="Refuse"
            backgroundColor={"#1212120A"}
            color={"#EE1045"}
            width={"49%"}
            height={40}
            borderRadius={38}
            marginTop={18}
            fontSize={14}
            fontFamily={fonts.medium}
          />
        </View>
      ) : (
        <CustomButton
          title="Cancel"
          backgroundColor={MUTED_BG}
          color={COLORS.primaryColor}
          width={"100%"}
          height={40}
          borderRadius={38}
          marginTop={18}
          fontSize={14}
          fontFamily={fonts.medium}
        />
      )}
    </View>
  );
};

export default RefugeCard;

const styles = StyleSheet.create({
  card: {
    width: 360,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginLeft: 8,
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badgeOuter: {
    position: "absolute",
    right: -4,
    bottom: 0,
    width: 16,
    height: 16,
    borderRadius: 28,
    borderWidth: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  badgeInner: {
    width: 13,
    height: 13,
    borderRadius: 99,
  },
});

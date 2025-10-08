import { StyleSheet, Image, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import { Images } from "../../../../assets/images";
import Icons from "../../../../components/Icons";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";

const SocialCard = ({ day }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CustomText
          label={day || "Today"}
          fontFamily={fonts.medium}
          fontSize={18}
          lineHeight={18 * 1.4}
        />
        <Icons
          family="Ionicons"
          name="chevron-down-outline"
          size={12}
          marginLeft={4}
          color={COLORS.white2}
        />
      </View>
    </View>
  );
};

export default SocialCard;

const styles = StyleSheet.create({});

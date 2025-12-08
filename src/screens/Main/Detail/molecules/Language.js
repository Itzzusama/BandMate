import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import InfoCard from "./InfoCard";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import Icons from "../../../../components/Icons";
import { PNGIcons } from "../../../../assets/images/icons";
import EditButton from "./EditButton";
import { useNavigation } from "@react-navigation/native";

const data = ["English", "French", "German"];

const Language = ({ myPage, userData }) => {
  const navigation = useNavigation();
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <View style={styles.flexRow}>
        <CustomText
          label="Language"
          fontFamily={fonts.medium}
          color={COLORS.white}
          fontSize={17}
          lineHeight={17 * 1.4}
        />
        {myPage && (
          <EditButton onPress={() => navigation.navigate("AppLanguage")} />
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.row}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <InfoCard name={userData?.profile?.language} showIcon type="language" />
      </ScrollView>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",

    gap: 4,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

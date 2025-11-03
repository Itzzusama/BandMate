import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import Divider from "./Divider";
import EditButton from "./EditButton";

const AboutArtist = ({ name, bio, myPage }) => {
  return (
    <>
      <View style={{ paddingHorizontal: 12 }}>
        <View style={styles.row}>
          <CustomText
            label={name}
            fontFamily={fonts.medium}
            color={COLORS.white}
            fontSize={17}
            lineHeight={17 * 1.4}
            marginBottom={4}
          />
          {myPage && <EditButton />}
        </View>

        <CustomText
          label={bio}
          fontFamily={fonts.medium}
          color={COLORS.gray3}
          fontSize={14}
          lineHeight={14 * 1.4}
          marginBottom={18}
        />
      </View>
    </>
  );
};

export default AboutArtist;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

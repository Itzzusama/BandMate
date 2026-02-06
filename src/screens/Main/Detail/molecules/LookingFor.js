import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import InfoCard from "./InfoCard";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import EditButton from "./EditButton";
import { useNavigation } from "@react-navigation/native";

const LookingFor = ({ myPage, userData }) => {
  const navigation = useNavigation();
  console.log(userData);
  const lookingForMap = {
    JamSessions: "Jam Sessions",
    StudioTime: "Studio time",
    Concert: "Concerts",
    BandMembers: "Band members",
  };

  // ✅ Get only enabled items
  const activeLookingFor = Object.entries(userData?.LookingFor || {})
    .filter(([_, value]) => value === true)
    .map(([key]) => lookingForMap[key]);

  return (
    <View style={{ paddingHorizontal: 12 }}>
      <View style={styles.header}>
        <CustomText
          label="Looking for"
          fontFamily={fonts.medium}
          color={COLORS.white}
          fontSize={17}
          lineHeight={17 * 1.4}
        />

        {myPage && (
          <EditButton onPress={() => navigation.navigate("LookingFor")} />
        )}
      </View>

      {activeLookingFor.length > 0 ? (
        <ScrollView
          horizontal
          contentContainerStyle={styles.row}
          showsHorizontalScrollIndicator={false}
        >
          {activeLookingFor.map((item, index) => (
            <InfoCard key={index} name={item} />
          ))}
        </ScrollView>
      ) : (
        <CustomText
          label="Not specified"
          fontSize={13}
          color={COLORS.white2}
          marginBottom={20}
          marginTop={2}
        />
      )}
    </View>
  );
};

export default LookingFor;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 2,
  },
});

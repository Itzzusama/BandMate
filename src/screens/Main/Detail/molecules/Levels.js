import { Image, StyleSheet, View } from "react-native";
import React from "react";
import InfoCard from "./InfoCard";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import EditButton from "./EditButton";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";

const data = [
  { name: "Bass", level: "Beginner" },
  { name: "Guitar", level: "Intermediate" },
  { name: "Piano", level: "Legend" },
  { name: "Voice", level: "Advanced" },
];

const Levels = ({ myPage }) => {
  const { userData } = useSelector((state) => state.users);
  const navigation = useNavigation();

  return (
    <View style={{ paddingHorizontal: 12 }}>
      {userData?.Instruments?.map((item, index) => (
        <>
          <View style={styles.row}>
            <CustomText
              label={item?.instrument}
              fontFamily={fonts.medium}
              color={COLORS.white}
              fontSize={17}
              lineHeight={17 * 1.4}
            />
            {myPage && index == 0 && (
              <EditButton
                onPress={() =>
                  navigation.navigate("AuthStack", {
                    screen: "Instruments",
                    params: {
                      isHome: true,
                    },
                  })
                }
              />
            )}
          </View>

          <InfoCard key={index} name={item.level} marginBottom={16} />
        </>
      ))}
    </View>
  );
};

export default Levels;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  editBtn: {
    right: 12,
    position: "absolute",
  },
});

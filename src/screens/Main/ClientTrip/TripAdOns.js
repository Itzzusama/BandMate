import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView from "react-native-maps";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";

import AdOnsCard from "./molecules/AdOnsCard";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const ListHeader = () => (
  <>
    <CustomText
      fontSize={23}
      marginTop={10}
      lineHeight={30}
      label={"Food & Beverage"}
      fontFamily={fonts.semiBold}
    />
    <CustomText
      label={
        "Are available during your Trips. Chauffeurs can offer different sorts of food & beverages from approved partners."
      }
      color={COLORS.subtitle}
      fontSize={13}
    />
    <View style={styles.warningBox}>
      <Icons name={"info"} family={"Feather"} color={COLORS.warning} />
      <CustomText
        label={
          "Restrictions in some countries may reduce the amount of available options or forbid some."
        }
        fontSize={12}
        color={COLORS.warning}
        marginRight={10}
        marginTop={-3}
      />
    </View>
    <CustomText
      fontSize={18}
      label={"When"}
      marginBottom={3}
      fontFamily={fonts.medium}
    />
  </>
);

const TripAdOns = () => {
  const navigation = useNavigation();

  return (
    <ScreenWrapper translucent paddingHorizontal={0.1}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <FlatList
            data={[1, 2, 3, 4]}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeader}
            renderItem={({ item }) => <AdOnsCard />}
          />
        </View>
        <View style={styles.footer}>
          <CustomButton
            title="Alright!"
            onPress={() => navigation.replace("TripFoods")}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default TripAdOns;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "#0000001E",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingHorizontal: 15,
    zIndex: 1,
    marginTop: 208,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    marginTop: 2,
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#A57A3A0A",
    padding: 8,
    columnGap: 5,
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 13,
  },

  footer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    paddingBottom: 20,
    paddingTop: 10,
  },
});

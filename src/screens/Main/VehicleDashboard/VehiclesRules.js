import { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomSwitch from "../../../components/CustomSwitch";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { useNavigation } from "@react-navigation/native";
import Icons from "../../../components/Icons";
import CollapseableCard from "../Dashboard/molecules/CollapseableCard";
import CustomInput from "../../../components/CustomInput";
import { Images } from "../../../assets/images";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const VehiclesRules = () => {
  const navigation = useNavigation();
  const init = {
    title: "",
    detail: "",
  }
  const [state, setState] = useState(init)

  const cardsData = [
    {
      id: 1,
      title: "Vehicle Rules",
      description: "Define the ground rules for this vehicle",
      tabs: [
        {
          id: "t1",
          name: "Pets allowed",
          subname: "Minimal rental period",
        },
        {
          id: "t2",
          name: "Smoking, vaping, e-cigarettes allowed",
          subname: "Minimal rental period",
        },
        {
          id: "t3",
          name: "Commercial photography and filming allowed",
          subname: "Minimal rental period",
        },
        {
          id: "t4",
          name: "Racing/Competition",
          subname: "Minimal rental period",
        },
        {
          id: "t5",
          name: "Only The Renter Can Drive",
          subname: "Minimal rental period",
        },
      ],
      showErrors: true,
      showSwitch: true,
    },
  ];

  return (
    <ScreenWrapper
      scrollEnabled
      paddingBottom={12}
      headerUnScrollable={() => (
        <Header title={"Rules"} marginBottom={12} onHelpPress />
      )}
      footerUnScrollable={() =>
        <View style={{ padding: 20, marginBottom: 20 }}>
          <CustomButton title={"New Custom Rule"} borderRadius={12} backgroundColor={COLORS.inputBg} color={COLORS.black} icon={Images.plus} />
        </View>
      }
    >
      {cardsData.map((card) => (
        <CollapseableCard
          key={card.id}
          title={card.title}
          description={card.description}
          tabs={card.tabs}
          showErrors={card.showErrors}
          showSwitch={card.showSwitch}
        />
      ))}

      <CustomText
        label={"Rule Title"}
        fontSize={18}
        fontFamily={fonts.medium}
        lineHeight={28}
        marginBottom={5}
      />

      <CustomInput withLabel={"Rule Title"} value={state.title} onChangeText={(text) => setState({ ...state, title: text })} />

      <View style={{
        flexDirection: "row",
        alignItems: "center",
      }}>
        <Icons
          family="Feather"
          name="info"
          color={COLORS.gray1}
          size={14}
          marginBottom={2}
        />
        <CustomText
          label={`Maximum Characters ${state.title.length}/37`}
          fontSize={12}
          color={COLORS.gray}
          fontFamily={fonts.regular}
          marginLeft={5}
        />
      </View>

      <CustomText
        label={"Answer"}
        fontSize={18}
        fontFamily={fonts.medium}
        lineHeight={28}
        marginBottom={5}
      />

      <CustomInput withLabel={"Rule Details"} value={state.detail} onChangeText={(text) => setState({ ...state, detail: text })} />
      <View style={{
        flexDirection: "row",
        alignItems: "center",
      }}>
        <Icons
          family="Feather"
          name="info"
          color={COLORS.gray1}
          size={14}
          marginBottom={2}
        />
        <CustomText
          label={`Maximum Characters ${state.detail.length}/37`}
          fontSize={12}
          color={COLORS.gray}
          fontFamily={fonts.regular}
          marginLeft={5}
        />
      </View>
    </ScreenWrapper>
  );
};

export default VehiclesRules;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  border: {
    width: "100%",
    height: 1,
    marginVertical: 20,
    backgroundColor: COLORS.lightGray,
  },
});

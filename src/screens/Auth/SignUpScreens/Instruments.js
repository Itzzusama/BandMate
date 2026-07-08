import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthHeader from "../../../components/Auth/AuthHeader";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import SearchInput from "../../../components/SearchInput";
import Icons from "../../../components/Icons";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { instrumentCategories, COLORS_PALETTE } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import CustomButton from "../../../components/CustomButton";
import Header from "../../../components/Header";

const Instruments = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const CARD_WIDTH = (width - 34) / 2;
  const CARD_HEIGHT = 100;
  const route = useRoute();
  const { isHome } = route?.params || {};
  const { userData } = useSelector((state) => state.users);
  const [step, setStep] = useState(userData?.role == "band" ? 10 : 11);
  const totalSteps = userData?.role == "band" ? 15 : 16;
  const [selectedInstruments, setSelectedInstruments] = useState(
    isHome ? userData?.Instruments?.map((item) => item?.instrument) : [],
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const coloredInstrumentCategories = instrumentCategories.map((category) => {
    const sortedInstruments = [...category.instruments].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    const instrumentsWithColors = sortedInstruments.map((instrument, index) => {
      const colorIndex = index % COLORS_PALETTE.length;
      return { ...instrument, color: COLORS_PALETTE[colorIndex] };
    });
    return { ...category, instruments: instrumentsWithColors };
  });

  const filteredInstrumentCategories = coloredInstrumentCategories.map((category) => {
    const filteredInstruments = category.instruments.filter((instrument) =>
      instrument.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...category, instruments: filteredInstruments };
  }).filter((category) => category.instruments.length > 0);

  const errorCheck = (instruments) => {
    if (!instruments || instruments.length === 0) {
      setError("Please choose at least one instrument");
      setShowSuccessColor(false);
      return "Please choose at least one instrument";
    } else {
      setError("");
      setShowSuccessColor(true);
      const timer = setTimeout(() => setShowSuccessColor(false), 2000);
      return "";
    }
  };

  const toggleInstrument = (instrumentName) => {
    setSelectedInstruments((prev) => {
      const updated = prev.includes(instrumentName)
        ? prev.filter((i) => i !== instrumentName)
        : [...prev, instrumentName];
      errorCheck(updated);
      return updated;
    });
  };

  const handleNext = () => {
    const err = errorCheck(selectedInstruments);
    if (err) return;

    navigation.navigate("Level", {
      selectedInstruments: selectedInstruments,
      isHome,
    });
  };

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  const renderInstrumentCard = (instrument) => {
    const isSelected = selectedInstruments.includes(instrument.name);
    return (
      <TouchableOpacity
        key={instrument.name}
        style={[
          styles.card,
          {
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            backgroundColor: instrument.color,
            borderColor: isSelected ? COLORS.white : "transparent",
            borderWidth: isSelected ? 2 : 0,
          },
        ]}
        onPress={() => toggleInstrument(instrument.name)}
        activeOpacity={0.8}
      >
        <CustomText
          label={instrument.name}
          color={COLORS.white}
          fontSize={16}
          fontFamily={fonts.medium}
        />
        {isSelected && (
          <View style={styles.icon}>
            <Icons
              family="MaterialCommunityIcons"
              name="check-circle"
              size={20}
              color={COLORS.white}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper
      paddingBottom={12}
      scrollEnabled
      headerUnScrollable={() => isHome && <Header title={"Edit Instruments"} />}
      footerUnScrollable={() =>
        isHome ? (
          <View style={{ padding: 12 }}>
            <CustomButton
              title={"Submit"}
              marginBottom={24}
              onPress={handleNext}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        ) : (
          <AuthFooter
            paddingHorizontal={12}
            onPress={handleNext}
            onBackPress={handleBack}
            btnLoading={isLoading}
          />
        )
      }
    >
      {!isHome && (
        <AuthHeader
          step={step}
          totalSteps={totalSteps}
          subtitle="Instruments you play"
        />
      )}

      <View style={{ flex: 1 }}>
        <CustomText
          label="Instruments you play"
          fontFamily={fonts.abril}
          fontSize={28}
          lineHeight={28 * 1.4}
          marginTop={8}
          marginBottom={6}
        />

        <SearchInput
          placeholder="Enter an instrument"
          value={searchQuery}
          onChangeText={setSearchQuery}
          isCross
          isClear={() => setSearchQuery("")}
        />

        <CustomText
          label="Just enter a name."
          fontSize={12}
          marginBottom={12}
          color={COLORS.white2}
          marginTop={4}
        />

        <ErrorComponent
          errorTitle={`Choose at least ${selectedInstruments.length}/1`}
          error={error}
          isValid={showSuccessColor}
          color={
            showSuccessColor ? "#64CD75" : error ? "#EE1045CC" : COLORS.white2
          }
          marginBottom={12}
        />

        {filteredInstrumentCategories.length > 0 ? (
          filteredInstrumentCategories.map((category) => (
            <View key={category.name} style={{ marginBottom: 12, marginTop: 8 }}>
              <CustomText
                label={category.name}
                fontSize={17}
                marginBottom={8}
                color={COLORS.white}
                fontFamily={fonts.medium}
              />
              <View style={styles.row}>
                {category.instruments.map((instrument) =>
                  renderInstrumentCard(instrument),
                )}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <CustomText
              label="No instruments found matching your search."
              color={COLORS.white2}
              fontSize={14}
              fontFamily={fonts.regular}
            />
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Instruments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    borderRadius: 12,
    padding: 12,
    paddingTop: 8,
    marginBottom: 8,
    height: 98,
  },
  icon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  noResultsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    width: "100%",
  },
});

import { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";

import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Legend"];

const INSTRUMENTS = ["Bass", "Guitar", "Piano", "Vocals"];

const Level = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const [selectedLevels, setSelectedLevels] = useState({});
    const [error, setError] = useState("");

    const selectLevel = (instrument, level) => {
      setSelectedLevels((prev) => ({ ...prev, [instrument]: level }));
    };

    const errorCheck = () => {
      let newError = "";
      const allSelected = INSTRUMENTS.every((inst) => selectedLevels[inst]);
      if (!allSelected) {
        newError = "Please select a level for each instrument.";
      }
      return newError;
    };

    const submit = () => {
      const err = errorCheck();
      if (err) {
        setError(err);
        return;
      }
      setError("");
      setState({ ...state, levels: selectedLevels });
      setCurrentIndex(currentIndex + 1);
    };

    const back = () => {
      if (currentIndex > 1) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    useImperativeHandle(ref, () => ({ submit, back }));

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomText
            label="Let others know your level."
            fontFamily={fonts.abril}
            fontSize={32}
            lineHeight={32 * 1.4}
            marginTop={12}
          />
          <CustomText
            label="Tell us about your musical skills and level."
            fontSize={12}
            lineHeight={12 * 1.4}
            marginBottom={18}
            color={COLORS.white2}
          />
          {INSTRUMENTS.map((instrument) => (
            <View key={instrument} style={{ marginBottom: 12 }}>
              <CustomText
                label={instrument}
                fontFamily={fonts.medium}
                fontSize={17}
                color={COLORS.white}
                marginBottom={10}
              />

              <View style={styles.levelRow}>
                {LEVELS.map((level) => {
                  const isSelected = selectedLevels[instrument] === level;
                  return (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.levelButton,
                        {
                          backgroundColor: isSelected
                            ? COLORS.white
                            : "#313131",
                        },
                      ]}
                      onPress={() => selectLevel(instrument, level)}
                      activeOpacity={0.8}
                    >
                      <CustomText
                        label={level}
                        color={isSelected ? COLORS.black : COLORS.white}
                        fontFamily={fonts.medium}
                        fontSize={12}
                        textAlign="center"
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
);

export default Level;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  levelRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  levelButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import ErrorComponent from "../../../components/ErrorComponent";
import { put } from "../../../services/ApiRequest";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../store/reducer/usersSlice";
import { ToastMessage } from "../../../utils/ToastMessage";

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Legend"];

const Level = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState, setIsLoading }, ref) => {
    const dispatch = useDispatch();

    const normalizeName = (name) => name?.replace(/\n/g, " ").trim();

    const instruments = (state?.instruments || []).map(normalizeName);

    const [selectedLevels, setSelectedLevels] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
      if (state?.instrumentWithLevel?.length) {
        const prefill = {};
        state.instrumentWithLevel.forEach((item) => {
          const normalized = normalizeName(item.instrument);
          prefill[normalized] = item.level;
        });
        setSelectedLevels(prefill);
      }
    }, [state?.instrumentWithLevel]);

    const selectLevel = (instrument, level) => {
      setSelectedLevels((prev) => ({ ...prev, [instrument]: level }));
    };

    const errorCheck = () => {
      const allSelected = instruments.every((inst) => selectedLevels[inst]);
      return allSelected ? "" : "Please select a level for each instrument.";
    };

    const submit = async () => {
      const err = errorCheck();
      if (err) {
        setError(err);
        return;
      }

      setError("");
      setIsLoading(true);
      const instrumentWithLevel = instruments.map((inst) => ({
        instrument: inst,
        level: selectedLevels[inst],
      }));

      try {
        const res = await put("user/profile", {
          Instruments: instrumentWithLevel,
        });
        if (res?.data?.success) {
          setState({ ...state, instrumentWithLevel });
          setCurrentIndex(currentIndex + 1);
          dispatch(setUserData(res?.data?.user));
          ToastMessage(
            "Your instruments have been updated successfully!",
            "success"
          );
        }
      } catch (err) {
        console.log("Error saving instruments:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const back = () => {
      if (currentIndex > 1) setCurrentIndex(currentIndex - 1);
    };

    useImperativeHandle(ref, () => ({ submit, back }));

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomText
            label="Let others know your level."
            fontFamily={fonts.abril}
            fontSize={32}
            lineHeight={32 * 1.1}
            marginTop={12}
          />

          <CustomText
            label="Tell us about your musical skills and level."
            fontSize={12}
            lineHeight={12 * 1.4}
            marginBottom={18}
            color={COLORS.white2}
          />

          {instruments.map((instrument) => (
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

          {error ? (
            <ErrorComponent errorTitle={error} color={error ? "#EE1045" : ""} />
          ) : null}
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
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import SearchInput from "../../../components/SearchInput";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import Icons from "../../../components/Icons";

const instrumentCategories = [
  {
    name: "Strings",
    instruments: [
      { name: "Guitar", color: "#DC158C" },
      { name: "Piano", color: "#006450" },
      { name: "Violin", color: "#8400E7" },
      { name: "Viola", color: "#1D3264" },
      { name: "Cello", color: "#608109" },
      { name: "Double Bass", color: "#26856B" },
      { name: "Harp", color: "#503751" },
      // { name: "Guitar", color: "#477D94" },
      { name: "Banjo", color: "#477D95" },
      { name: "Mandolin", color: "#0F73EC" },
      { name: "Ukulele", color: "#8E66AC" },
      { name: "Zither", color: "#608108" },
      { name: "Sitar", color: "#777777" },
      { name: "Shamisen", color: "#8E66AC" },
      { name: "Lute", color: "#DC158C" },
      { name: "Balalaika", color: "#477D94" },
      { name: "Domra", color: "#006450" },
      { name: "Acoustic\nGuitar", color: "#E81529" },
      { name: "Classical\nGuitar", color: "#E0128C" },
      { name: "Electric Guitar", color: "#8C67AB" },
    ],
  },
  {
    name: "Percussion Instruments",
    instruments: [
      { name: "Taimani", color: "#DC158C" },
      { name: "Snare Drum", color: "#006450" },
      { name: "Bass Drums", color: "#8400E7" },
      { name: "Cymbals", color: "#1D3264" },
      { name: "Triangle", color: "#608109" },
      { name: "Tambourine", color: "#26856B" },
      { name: "Xylophone", color: "#503751" },
      { name: "Marimba", color: "#477D94" },
      { name: "Vibraphone", color: "#477D95" },
      { name: "Glockenspiel", color: "#0F73EC" },
      { name: "Castanets", color: "#8E66AC" },
      { name: "Congas", color: "#608108" },
      { name: "Bongos", color: "#777777" },
      { name: "Djembé", color: "#8E66AC" },
      { name: "Cajón", color: "#DC158C" },
      { name: "Gong", color: "#477D94" },
      { name: "Cowbell", color: "#006450" },
      { name: "Drums", color: "#E81529" },
    ],
  },

  {
    name: "Keyboard Instruments",
    instruments: [
      { name: "Organ", color: "#DC158C" },
      // { name: "Piano", color: "#006450" },
      { name: "Harpsichord", color: "#8400E7" },
      { name: "Chabichord", color: "#1D3264" },
      { name: "Celesta", color: "#608109" },
      { name: "Synthétiser", color: "#26856B" },
      { name: "Electric\nKeyboard", color: "#503751" },
      { name: "Accordions", color: "#477D94" },
      { name: "Melodica", color: "#477D95" },
      { name: "Electric Drum\nKit", color: "#0F73EC" },
      { name: "Theremin", color: "#8E66AC" },
      { name: "Sampler", color: "#608108" },
      { name: "Drum\nMachine", color: "#777777" },
      { name: "Digital Piano", color: "#8E66AC" },
    ],
  },
  {
    name: "Brass Instruments",
    instruments: [
      { name: "Trompeta", color: "#DC158C" },
      { name: "Cornet", color: "#006450" },
      { name: "Flugelhorn", color: "#8400E7" },
      { name: "Trombone", color: "#1D3264" },
      { name: "French Horn", color: "#608109" },
      { name: "Tuba", color: "#26856B" },
      { name: "Euphonium", color: "#503751" },
      { name: "Baritone Horn", color: "#477D94" },
      { name: "Sousaphone", color: "#477D95" },
      { name: "Bugle", color: "#0F73EC" },
      { name: "Ophicleide", color: "#8E66AC" },
      { name: "Serpent", color: "#608108" },
    ],
  },
  {
    name: "Wind Instruments",
    instruments: [
      { name: "Flute", color: "#DC158C" },
      { name: "Piccolo", color: "#006450" },
      { name: "Oboe", color: "#8400E7" },
      { name: "English Horn", color: "#1D3264" },
      { name: "Clarinet", color: "#608109" },
      { name: "Bass Clarinet", color: "#26856B" },
      { name: "Basson", color: "#503751" },
      { name: "Contrebasson", color: "#477D94" },
      { name: "Recorder", color: "#477D95" },
      { name: "Saxophone", color: "#0F73EC" },
      { name: "Panpipes", color: "#8E66AC" },
      { name: "Bagpipes", color: "#608108" },
      { name: "Harmonica", color: "#777777" },
      { name: "Crumhorn", color: "#8E66AC" },
      { name: "Shawm", color: "#DC158C" },
      { name: "Vocal", color: "#477D94" },
    ],
  },
  {
    name: "Music related professionals",
    instruments: [
      { name: "DJs", color: "#DC158C" },
      { name: "Mixing\nEngineers", color: "#006450" },
      { name: "Mastering\nEngineers", color: "#8400E7" },
      { name: "Producers", color: "#1D3264" },
      { name: "Studio Owners", color: "#608109" },
      { name: "Composers", color: "#26856B" },
    ],
  },
];

const Instruments = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const { width } = useWindowDimensions();
    const CARD_WIDTH = (width - 34) / 2;
    const CARD_HEIGHT = 100;

    const [selectedInstruments, setSelectedInstruments] = useState(
      state?.instruments || []
    );
    const [error, setError] = useState("");
    const [prevError, setPrevError] = useState("");
    const [showSuccessColor, setShowSuccessColor] = useState(false);
    useEffect(() => {
      if (prevError && !error) {
        setShowSuccessColor(true);
        const timer = setTimeout(() => setShowSuccessColor(false), 2000);
        return () => clearTimeout(timer);
      }
      setPrevError(error);
    }, [error]);

    const errorCheck = () => {
      let newErrors = "";
      if (selectedInstruments.length === 0) {
        newErrors = "Please choose at least one instrument";
      }
      return newErrors;
    };

    const submit = () => {
      const err = errorCheck();
      if (err) {
        setError(err);
        return;
      }
      setError("");
      setState({ ...state, instruments: selectedInstruments });
      setCurrentIndex(currentIndex + 1);
    };

    const back = () => {
      if (currentIndex > 1) setCurrentIndex(currentIndex - 1);
    };

    useImperativeHandle(ref, () => ({ submit, back }));

    const toggleInstrument = (instrumentName) => {
      let updatedList = [];
      if (selectedInstruments.includes(instrumentName)) {
        updatedList = selectedInstruments.filter((i) => i !== instrumentName);
      } else {
        updatedList = [...selectedInstruments, instrumentName];
      }

      setSelectedInstruments(updatedList);

      if (updatedList.length === 0) {
        setError("Please choose at least one instrument");
      } else {
        setError("");
      }
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
                name={"check-circle"}
                size={20}
                color={COLORS.white}
              />
            </View>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <CustomText
            label="Instruments you play"
            fontFamily={fonts.abril}
            fontSize={32}
            lineHeight={32 * 1.4}
            marginTop={8}
            marginBottom={6}
          />
          <SearchInput placeholder={"Enter an instrument"} />
          <CustomText
            label="Just enter a name."
            fontSize={12}
            lineHeight={12 * 1.4}
            marginBottom={12}
            color={COLORS.white2}
            marginTop={4}
          />

          {/* ✅ Dynamic error color */}
          <ErrorComponent
            errorTitle={`Choose at least ${
              selectedInstruments.length > 1 ? 1 : selectedInstruments.length
            }/1`}
            error={error}
            color={
              error
                ? "#EE1045" // red
                : showSuccessColor
                ? "#64CD75" // green
                : "" // neutral
            }
            color1={error ? "#EE1045" : showSuccessColor ? "#64CD75" : ""}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20, marginTop: 12 }}
          >
            {instrumentCategories.map((category) => (
              <View key={category.name} style={{ marginBottom: 12 }}>
                <CustomText
                  label={category.name}
                  fontSize={17}
                  lineHeight={17 * 1.4}
                  marginBottom={8}
                  color={COLORS.white}
                  fontFamily={fonts.medium}
                />

                <View style={styles.row}>
                  {category.instruments.map((instrument) =>
                    renderInstrumentCard(instrument)
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
);

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
});

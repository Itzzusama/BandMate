import { forwardRef, useImperativeHandle, useState } from "react";
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
      { name: "Bass", color: "#006450" },
      { name: "Violin", color: "#8400E7" },
      { name: "Viola", color: "#1D3264" },
      { name: "Cello", color: "#608109" },
      { name: "Harp", color: "#26856B" },
      { name: "Banjo", color: "#503751" },
      { name: "Ukulele", color: "#477D94" },
      { name: "Mandolin", color: "#477D95" },
      { name: "Double Bass", color: "#0F73EC" },
      { name: "Lute", color: "#8E66AC" },
      { name: "Sitar", color: "#608108" },
    ],
  },
  {
    name: "Percussion Instruments",
    instruments: [
      { name: "Drums", color: "#DC158C" },
      { name: "Bongos", color: "#006450" },
      { name: "Congas", color: "#8400E7" },
      { name: "Tambourine", color: "#1D3264" },
      { name: "Maracas", color: "#608109" },
      { name: "Xylophone", color: "#26856B" },
      { name: "Vibraphone", color: "#503751" },
      { name: "Cajon", color: "#477D94" },
      { name: "Djembe", color: "#477D95" },
      { name: "Triangle", color: "#0F73EC" },
      { name: "Cymbals", color: "#8E66AC" },
      { name: "Timpani", color: "#608108" },
    ],
  },
  {
    name: "Keyboard Instruments",
    instruments: [
      { name: "Piano", color: "#DC158C" },
      { name: "Organ", color: "#006450" },
      { name: "Synthesizer", color: "#8400E7" },
      { name: "Accordion", color: "#1D3264" },
      { name: "Harpsichord", color: "#608109" },
      { name: "Melodica", color: "#26856B" },
      { name: "Electric Piano", color: "#503751" },
      { name: "Keytar", color: "#477D94" },
      { name: "MIDI Controller", color: "#477D95" },
      { name: "Celesta", color: "#0F73EC" },
      { name: "Clavichord", color: "#8E66AC" },
      { name: "Digital Piano", color: "#608108" },
    ],
  },
  {
    name: "Wind Instruments",
    instruments: [
      { name: "Flute", color: "#DC158C" },
      { name: "Clarinet", color: "#006450" },
      { name: "Saxophone", color: "#8400E7" },
      { name: "Trumpet", color: "#1D3264" },
      { name: "Trombone", color: "#608109" },
      { name: "Tuba", color: "#26856B" },
      { name: "French Horn", color: "#503751" },
      { name: "Oboe", color: "#477D94" },
      { name: "Bassoon", color: "#477D95" },
      { name: "Recorder", color: "#0F73EC" },
      { name: "Harmonica", color: "#8E66AC" },
      { name: "Bagpipes", color: "#608108" },
    ],
  },
];

const Instruments = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const { width } = useWindowDimensions();
    const CARD_WIDTH = (width - 34) / 2; // 12px padding each side + ~12px spacing
    const CARD_HEIGHT = 100;

    const [selectedInstrument, setSelectedInstrument] = useState(null);
    const [error, setError] = useState("Choose at least 0/1");

    const errorCheck = () => {
      let newErrors = "";
      if (!selectedInstrument) {
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
      setState({ ...state, instrument: selectedInstrument });
      setCurrentIndex(currentIndex + 1);
    };

    const back = () => {
      if (currentIndex > 1) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    useImperativeHandle(ref, () => ({ submit, back }));

    const renderInstrumentCard = (instrument) => {
      const isSelected = selectedInstrument === instrument.name;
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
          onPress={() => setSelectedInstrument(instrument.name)}
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
                size={24}
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
            marginTop={12}
            marginBottom={6}
          />
          <SearchInput placeholder={"E.g. Guitar, Piano..."} />
          <CustomText
            label="Just enter a name."
            fontSize={12}
            lineHeight={12 * 1.4}
            marginBottom={12}
            color={COLORS.white2}
            marginTop={4}
          />
          <ErrorComponent errorTitle={error} />
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
    borderRadius: 4,
    padding: 12,
    paddingTop: 8,
    marginBottom: 10,
    height: 98,
  },
  icon: {
    position: "absolute",
    top: 12,
    right: 8,
  },
});

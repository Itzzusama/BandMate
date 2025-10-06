import { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import CarFilterModal from "../VehicleMarketplace/CarFilterModal";
import FilterModal from "../../../components/FilterModal";

const PickASeat = () => {
  const totalSeats = 4;
  const takenSeats = [2, 5, 8, 12, 15, 18, 22, 25, 28];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [filterModal, setFilterModal] = useState(true);
  const [sortByModal, setSortByModal] = useState(false);

  const seats = useMemo(() => {
    return Array.from({ length: totalSeats }, (_, index) => ({
      id: index + 1,
      number: index + 1,
      isTaken: takenSeats.includes(index + 1),
      isSelected: selectedSeats.includes(index + 1),
    }));
  }, [totalSeats, takenSeats, selectedSeats]);

  const getCardConfig = (totalSeats) => {
    if (totalSeats <= 4) {
      return { size: 160, columns: 2 };
    } else if (totalSeats <= 6) {
      return { size: 100, columns: 2 };
    } else {
      return { size: 50, columns: 4 };
    }
  };

  const cardConfig = getCardConfig(totalSeats);

  const handleSeatPress = (seatId) => {
    console.log("heree---");
    
    if (takenSeats.includes(seatId)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  const getSeatBackgroundColor = (seat) => {
    if (seat.isTaken) {
      return "#B3B3B3";
    } else if (seat.isSelected) {
      return "#4347FF";
    } else {
      return "#f6f6f6";
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Pick A Seat"} />}
      footerUnScrollable={() => (
        <View style={styles.footerButton}>
          <CustomButton
            title={"Pick Seat"}
            marginBottom={8}
            fontFamily={fonts.medium}
            secondText={"+$7.00"}
          />
          <CustomButton
            title={"Random Seat"}
            backgroundColor={COLORS.lightGray}
            color={COLORS.primaryColor}
            fontFamily={fonts.medium}
          />
          <View style={styles.row}>
            <Icons
              name={"info"}
              family={"Feather"}
              size={13}
              marginRight={4}
              color={COLORS.gray2}
            />
            <Text style={styles.infoText}>
              By pressing
              <Text style={styles.darkText}> “Continue” </Text>
              you agree with
              <Text style={[styles.darkText]}> move </Text>
              <Text
                style={[styles.darkText, { textDecorationLine: "underline" }]}
              >
                TOS.
              </Text>
            </Text>
          </View>
        </View>
      )}
    >
      <CustomText
        label={"Trip to Amsterdam"}
        fontFamily={fonts.medium}
        fontSize={24}
        lineHeight={24 * 1.4}
        textAlign={"center"}
      />
      <CustomText
        label={
          "Please provide your the PIN code to your Chauffeur to confirm your Trip."
        }
        fontSize={14}
        lineHeight={14 * 1.4}
        color={COLORS.gray1}
        textAlign={"center"}
        marginBottom={20}
      />

      {/* Seat Selection Grid */}
      <FlatList
        key={cardConfig.columns}
        data={seats}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.seatCard,
              {
                width: cardConfig.size,
                height: cardConfig.size,
                backgroundColor: getSeatBackgroundColor(item),
              },
            ]}
            onPress={() => handleSeatPress(item.id)}
            disabled={item.isTaken}
            activeOpacity={item.isTaken ? 1 : 0.7}
          >
            <CustomText
              label={item.number.toString()}
              fontSize={
                cardConfig.size <= 50 ? 12 : cardConfig.size <= 100 ? 16 : 20
              }
              fontFamily={fonts.medium}
              color={item.isSelected ? COLORS.white : COLORS.black}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={cardConfig.columns}
        columnWrapperStyle={styles.seatRow}
        contentContainerStyle={styles.seatContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <View style={styles.summaryContainer}>
          <CustomText
            label={`Seats ${selectedSeats.join(", ")}`}
            fontSize={22}
            lineHeight={22 * 1.4}
            fontFamily={fonts.medium}
            color={COLORS.primaryColor}
          />
        </View>
      )}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: "#4347FF" }]}
              />
              <CustomText
                lineHeight={14 * 1.4}
                label="Selected"
                fontSize={14}
                marginLeft={4}
                color={COLORS.gray1}
              />
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: "#B3B3B3" }]}
              />
              <CustomText
                lineHeight={14 * 1.4}
                label="Taken"
                fontSize={14}
                color={COLORS.gray1}
                marginLeft={4}
              />
            </View>
            <View style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  {
                    backgroundColor: "#f6f6f6",
                    borderWidth: 1,
                    borderColor: "#ccc",
                  },
                ]}
              />
              <CustomText
                lineHeight={14 * 1.4}
                label="Available"
                fontSize={14}
                marginLeft={4}
                color={COLORS.gray1}
              />
            </View>
          </View>

      <CarFilterModal
        isVisible={filterModal}
        onDisable={() => setFilterModal(false)}
        onItemPress={() => {
          setFilterModal(false);

          setTimeout(() => {
            setSortByModal(true);
          }, 700);
        }}
      />
      <FilterModal
        isVisible={sortByModal}
        onDisable={() => setSortByModal(false)}
      />
    </ScreenWrapper>
  );
};

export default PickASeat;

const styles = StyleSheet.create({
  seatContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 8,
  },
  seatRow: {
    justifyContent: "center",
    gap: 8,
  },
  seatCard: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryContainer: {
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  footerButton: {
    padding: 12,
    alignItems: "center",
  },
  darkText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: COLORS.primaryColor,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  infoText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: COLORS.gray2,
    lineHeight: 20,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 100,
  },
});

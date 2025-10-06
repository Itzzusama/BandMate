import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomSwitch from "../../../components/CustomSwitch";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import Header from "../../../components/Header";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { put } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { ToastMessage } from "../../../utils/ToastMessage";
import DayToggleCard from "./molecules/DayToggleCard";

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MyAvailibility = ({ route }) => {
  const navigation = useNavigation();
  const currentVehicle = route.params?.currentVehicle;
  const [isAvailable, setIsAvailable] = useState(
    currentVehicle?.Availability?.isAvailable || false
  );

  const [isLoading, setIsLoading] = useState(false);

  console.log(
    "=== currentVehicle?.Availability?.isAvailable",
    currentVehicle?.Availability
  );
  // Helper function to create time-only date for display
  const createTimeDate = (hours, minutes = 0) => {
    const today = new Date();
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hours,
      minutes,
      0,
      0
    );
  };

  // Helper function to convert ISO string to time date
  const convertISOToTimeDate = (isoString) => {
    const date = new Date(isoString);
    const timeDate = createTimeDate(date.getHours(), date.getMinutes());
    console.log(
      `ISO to Time conversion: ${isoString} -> ${date.getHours()}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`
    );
    return timeDate;
  };

  // Helper function to initialize schedule from API data
  const initializeScheduleFromAPI = () => {
    const apiSchedule = currentVehicle?.Availability?.Schedule || [];

    return WEEKDAYS.map((day) => {
      const dayLower = day.toLowerCase();
      const dayData = apiSchedule.find((item) => item.day === dayLower);

      if (dayData && dayData.shift && dayData.shift.length > 0) {
        // Day exists in API, enable it and populate shifts
        const shifts = dayData.shift.map((shift, index) => ({
          open: convertISOToTimeDate(shift.opening),
          close: convertISOToTimeDate(shift.closing),
          canDelete: index > 0, // First shift is not deletable, others are
        }));

        return {
          day,
          enabled: true,
          shifts,
        };
      } else {
        // Day doesn't exist in API, disable it with default shift
        return {
          day,
          enabled: false,
          shifts: [
            {
              open: createTimeDate(9, 0),
              close: createTimeDate(17, 0),
              canDelete: false,
            },
          ],
        };
      }
    });
  };

  // Initialize schedule from API data or use default
  const [schedule, setSchedule] = useState(() => {
    const initializedSchedule = initializeScheduleFromAPI();
    console.log(
      "=== Initialized Schedule from API ===",
      JSON.stringify(initializedSchedule, null, 2)
    );
    return initializedSchedule;
  });

  // Update schedule when currentVehicle changes
  useEffect(() => {
    if (currentVehicle?.Availability?.Schedule) {
      const newSchedule = initializeScheduleFromAPI();
      setSchedule(newSchedule);
      console.log(
        "=== Schedule updated from currentVehicle ===",
        JSON.stringify(newSchedule, null, 2)
      );
    }
  }, [currentVehicle?.Availability?.Schedule]);

  // Handlers
  const handleToggleDay = (idx, value) => {
    setSchedule((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, enabled: value } : d))
    );
  };

  const handleAddShift = (idx) => {
    setSchedule((prev) =>
      prev.map((d, i) =>
        i === idx
          ? {
              ...d,
              shifts: [
                ...d.shifts,
                {
                  open: createTimeDate(9, 0),
                  close: createTimeDate(17, 0),
                  canDelete: true,
                },
              ],
            }
          : d
      )
    );
  };

  const handleDeleteShift = (dayIdx, shiftIdx) => {
    setSchedule((prev) =>
      prev.map((d, i) =>
        i === dayIdx
          ? { ...d, shifts: d.shifts.filter((_, j) => j !== shiftIdx) }
          : d
      )
    );
  };

  const handleShiftChange = (dayIdx, shiftIdx, key, value) => {
    setSchedule((prev) =>
      prev.map((d, i) =>
        i === dayIdx
          ? {
              ...d,
              shifts: d.shifts.map((s, j) =>
                j === shiftIdx ? { ...s, [key]: value } : s
              ),
            }
          : d
      )
    );
  };

  // Helper function to create time-only date for API
  const createTimeOnlyDate = (date) => {
    const today = new Date();
    const timeOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      date.getHours(),
      date.getMinutes(),
      0,
      0
    );
    const isoString = timeOnly.toISOString();
    console.log(
      `Time conversion: ${date.getHours()}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")} -> ${isoString}`
    );
    return isoString;
  };

  // Format schedule data for API
  const formatScheduleForAPI = () => {
    return schedule
      .filter((day) => day.enabled) // Only include enabled days
      .map((day) => ({
        day: day.day.toLowerCase(),
        shift: day.shifts.map((shift) => ({
          opening: createTimeOnlyDate(shift.open),
          closing: createTimeOnlyDate(shift.close),
        })),
      }));
  };

  // API call to update availability
  const updateAvailability = async () => {
    if (!currentVehicle?.id || !currentVehicle?.Availability?._id) {
      ToastMessage("Vehicle information is missing", "error");
      return;
    }

    setIsLoading(true);

    try {
      const requestBody = {
        isAvailable: isAvailable,
        ...(isAvailable && { Schedule: formatScheduleForAPI() }),
      };

      console.log("API Request Body:", JSON.stringify(requestBody, null, 2));

      const url = `vehicles/${currentVehicle.id}/availability/${currentVehicle.Availability._id}`;
      const response = await put(url, requestBody);

      if (response.data?.success) {
        ToastMessage("Availability updated successfully", "success");
        console.log("log----->", response.data);
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      ToastMessage("An error occurred while updating availability", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle save button press
  const handleSave = () => {
    Alert.alert(
      "Save Availability",
      "Are you sure you want to save your availability settings?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: updateAvailability,
        },
      ]
    );
  };

  return (
    <ScreenWrapper
      paddingBottom={12}
      headerUnScrollable={() => <Header title="My Availability" />}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.row}>
            <CustomText
              label="Are you currently available"
              fontFamily={fonts.medium}
              fontSize={15}
            />
            <CustomSwitch value={isAvailable} setValue={setIsAvailable} />
          </View>

          <ErrorComponent marginTop={-8} errorTitle={"Minimal rental period"} />
        </View>

        {isAvailable && (
          <CustomText
            label="My Schedule"
            fontFamily={fonts.medium}
            fontSize={18}
            marginBottom={8}
          />
        )}
        {isAvailable &&
          schedule.map((day, dayIdx) => (
            <View key={day.day} style={styles.dayCard}>
              <DayToggleCard
                label1={`Available on ${day.day}s`}
                isEnabled={day.enabled}
                setIsEnabled={(val) => handleToggleDay(dayIdx, val)}
                marginBottom={16}
              />
              {day.enabled &&
                day.shifts.map((shift, shiftIdx) => (
                  <View key={shiftIdx} style={styles.shiftRow}>
                    <View style={styles.pickerWrap}>
                      <CustomDatePicker
                        value={shift.open}
                        setValue={(date) =>
                          handleShiftChange(dayIdx, shiftIdx, "open", date)
                        }
                        withLabel="OPENING"
                        type="time"
                        backgroundColor={COLORS.inputBg}
                        maxDate={false}
                      />
                    </View>
                    <View style={styles.pickerWrap}>
                      <CustomDatePicker
                        value={shift.close}
                        setValue={(date) =>
                          handleShiftChange(dayIdx, shiftIdx, "close", date)
                        }
                        withLabel="CLOSING"
                        type="time"
                        backgroundColor={COLORS.inputBg}
                        maxDate={false}
                      />
                    </View>
                    {shift.canDelete && (
                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => handleDeleteShift(dayIdx, shiftIdx)}
                      >
                        <ImageFast
                          source={Images.binRed}
                          style={styles.deleteIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              {day.enabled && (
                <CustomButton
                  title="+ Add A Shift"
                  onPress={() => handleAddShift(dayIdx)}
                  backgroundColor={COLORS.inputBg}
                  color={COLORS.primaryColor}
                  marginTop={8}
                  marginBottom={16}
                  borderRadius={12}
                  fontFamily={fonts.medium}
                />
              )}

              <View style={styles.border} />
            </View>
          ))}

        {/* Save Button */}
        <CustomButton
          title={isLoading ? "Saving..." : "Save Availability"}
          onPress={handleSave}
          backgroundColor={COLORS.primaryColor}
          color={COLORS.white}
          marginTop={20}
          marginBottom={20}
          borderRadius={12}
          fontFamily={fonts.medium}
          disabled={isLoading}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 18,
    marginTop: 10,
    paddingHorizontal: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  dayCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 18,
  },
  shiftRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  pickerWrap: {
    flex: 1,
    marginRight: 6,
    // marginBottom: 8,
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 99,
    backgroundColor: "#FCD9E1",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    width: 18,
    height: 18,
  },
  border: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 4,
  },
});

export default MyAvailibility;

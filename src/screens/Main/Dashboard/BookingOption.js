import { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomSwitch from "../../../components/CustomSwitch";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { useNavigation } from "@react-navigation/native";
import { put } from "../../../services/ApiRequest";

const BookingOption = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params?.currentVehicle;

  const [switchStates, setSwitchStates] = useState({
    instantBooking: false,
    selfCheckIn: false,
    allowExperiencedClientsOnly: false,
  });
  const [loading, setLoading] = useState(false);

  const bookingOptions = [
    {
      id: 1,
      key: "instantBooking",
      name: "Instant Booking",
      subname:
        "Customers can book without sending a request and waiting on your approval.",
    },
    {
      id: 2,
      key: "selfCheckIn",
      name: "Self Check-In",
      subname: "Faciliate the access to the vehicle on client's arrival.",
    },
    {
      id: 3,
      key: "allowExperiencedClientsOnly",
      name: "Only Allow Experienced Clients",
      subname:
        "Only allow customers with more than 5 completed rental bookins to book from you.",
    },
  ];

  // Initialize switch states from item data
  useEffect(() => {
    if (item?.bookingOptions) {
      setSwitchStates({
        instantBooking: item.bookingOptions.instantBooking || false,
        selfCheckIn: item.bookingOptions.selfCheckIn || false,
        allowExperiencedClientsOnly:
          item.bookingOptions.allowExperiencedClientsOnly || false,
      });
    }
  }, [item]);

  const handleSubmit = async () => {
    if (!item?.id || !item?.bookingOptions?._id) {
      console.error("Missing vehicle ID or booking options ID");
      return;
    }

    setLoading(true);

    const body = {
      instantBooking: switchStates.instantBooking,
      selfCheckIn: switchStates.selfCheckIn,
      allowExperiencedClientsOnly: switchStates.allowExperiencedClientsOnly,
    };

    try {
      const url = `vehicles/${item.id}/booking-options/${item.bookingOptions._id}`;
      const response = await put(url, body);

      if (response.error) {
        console.error("API Error:", response.error);
      } else {
        console.log("Success:", response.data);
        navigation.goBack();
      }
    } catch (error) {
      console.error("Submit Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper
      paddingBottom={12}
      headerUnScrollable={() => <Header title={"My Booking Options"} />}
      footerUnScrollable={() => (
        <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
          <CustomButton
            title={loading ? "Saving..." : "Confirm"}
            onPress={handleSubmit}
            disabled={loading}
            backgroundColor={loading ? COLORS.gray : COLORS.primary}
          />
          <CustomButton
            title={"Later"}
            backgroundColor={COLORS.lightGray}
            color={COLORS.primaryColor}
            marginTop={8}
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    >
      {bookingOptions.map((option, i) => (
        <View
          key={option.id}
          style={{
            marginTop: i === 0 ? 26 : 0,
          }}
        >
          <View style={styles.row}>
            <View style={{ width: "80%" }}>
              <CustomText
                label={option?.name}
                fontSize={16}
                lineHeight={16 * 1.4}
                fontFamily={fonts.medium}
              />
              <CustomText
                label={option?.subname}
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.gray1}
              />
            </View>
            <CustomSwitch
              value={switchStates[option.key]}
              setValue={(val) =>
                setSwitchStates((prev) => ({
                  ...prev,
                  [option.key]: val,
                }))
              }
            />
          </View>

          <ErrorComponent errorTitle={"Minimal rental period"} />
          {i !== bookingOptions.length - 1 && <View style={styles.border} />}
        </View>
      ))}
    </ScreenWrapper>
  );
};

export default BookingOption;

const styles = StyleSheet.create({
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

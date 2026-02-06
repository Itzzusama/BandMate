import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import CustomSwitch from "../../../components/CustomSwitch";
import { COLORS } from "../../../utils/COLORS";
import { put } from "../../../services/ApiRequest";
import { setUserData } from "../../../store/reducer/usersSlice";
import fonts from "../../../assets/fonts";

const Availability = () => {
  const user = useSelector((state) => state.users.userData);
  const dispatch = useDispatch();
  const [availability, setAvailability] = useState({
    weekdays: false,
    weekends: false,
  });

  useEffect(() => {
    if (user?.Availability) {
      setAvailability({
        weekdays: user.Availability.weekdays ?? false,
        weekends: user.Availability.weekends ?? false,
      });
    }
  }, [user?.Availability]);

  const handleToggle = async (key) => {
    const updatedAvailability = {
      ...availability,
      [key]: !availability[key],
    };

    setAvailability(updatedAvailability);

    try {
      const res = await put("user/profile", {
        Availability: updatedAvailability,
      });
      if (res?.data?.success) {
        dispatch(setUserData(res?.data?.user));
      }
    } catch (error) {
      console.log("Availability update error:", error);

      setAvailability(availability);
    }
  };

  const data = [
    { name: "weekdays", key: "weekdays" },
    { name: "weekends", key: "weekends" },
  ];

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Header title="Availability" fontFamily={fonts.abril} fontSize={24} />
      )}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.container,
              {
                borderBottomWidth: index === data.length - 1 ? 0 : 1,
              },
            ]}
          >
            <CustomText
              label={item.name}
              textTransform="capitalize"
              fontSize={16}
              color={COLORS.white2}
            />

            <CustomSwitch
              value={availability[item.key]}
              setValue={() => handleToggle(item.key)}
            />
          </View>
        )}
      />
    </ScreenWrapper>
  );
};

export default Availability;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBg,
  },
});

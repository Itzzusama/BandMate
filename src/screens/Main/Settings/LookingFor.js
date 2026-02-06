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

const LookingFor = () => {
  const user = useSelector((state) => state.users.userData);
  const dispatch = useDispatch();
  const [lookingFor, setLookingFor] = useState({
    JamSessions: false,
    StudioTime: false,
    Concert: false,
    BandMembers: false,
  });

  useEffect(() => {
    if (user?.LookingFor) {
      setLookingFor({
        JamSessions: user.LookingFor.JamSessions ?? false,
        StudioTime: user.LookingFor.StudioTime ?? false,
        Concert: user.LookingFor.Concert ?? false,
        BandMembers: user.LookingFor.BandMembers ?? false,
      });
    }
  }, [user?.LookingFor]);

  const handleToggle = async (key) => {
    const updated = {
      ...lookingFor,
      [key]: !lookingFor[key],
    };

    setLookingFor(updated);

    try {
      const res = await put("user/profile", {
        LookingFor: updated,
      });
      console.log(res?.data);
      if (res?.data?.success) {
        dispatch(setUserData(res?.data?.user));
      }
    } catch (error) {
      console.log("LookingFor update error:", error);

      setLookingFor(lookingFor);
    }
  };

  const data = [
    { label: "Jam sessions", key: "JamSessions" },
    { label: "Studio time", key: "StudioTime" },
    { label: "Concerts", key: "Concert" },
    { label: "Band members", key: "BandMembers" },
  ];

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Header title="Looking For" fontFamily={fonts.abril} fontSize={24} />
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
              label={item.label}
              fontSize={16}
              color={COLORS.white2}
            />

            <CustomSwitch
              value={lookingFor[item.key]}
              setValue={() => handleToggle(item.key)}
            />
          </View>
        )}
      />
    </ScreenWrapper>
  );
};

export default LookingFor;

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

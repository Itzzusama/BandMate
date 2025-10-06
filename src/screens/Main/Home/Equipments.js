import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import CustomCheckBox from "../../../components/CustomCheckBox";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import {
  setSelectedAccessibility,
  setSelectedComfort,
  setSelectedExterior,
} from "../../../store/reducer/usersSlice";

const Equipments = ({ route }) => {
  const [tab, setTab] = useState("Comfort");
  const tabArray = ["Comfort", "Exterior", "Accessibility"];

  const Comfort = route?.params?.Comfort || [];
  const Exterior = route?.params?.Exterior || [];
  const Accessibility = route?.params?.Accessibility || [];
  const dispatch = useDispatch();
  const selectedComfort = useSelector((state) => state.users.selectedComfort);
  const selectedExterior = useSelector((state) => state.users.selectedExterior);
  const selectedAccessibility = useSelector(
    (state) => state.users.selectedAccessibility
  );

  const equipmentData =
    tab === "Comfort" ? Comfort : tab === "Exterior" ? Exterior : Accessibility;
  const handleEquipmentToggle = (equipment) => {
    if (tab === "Comfort") {
      const isSelected =
        selectedComfort &&
        Array.isArray(selectedComfort) &&
        selectedComfort.some((item) => item?.title === equipment?.title);
      if (isSelected) {
        dispatch(
          setSelectedComfort(
            selectedComfort.filter(
              (item) =>
                item?.id !== equipment?.id && item?.title !== equipment?.title
            )
          )
        );
      } else {
        dispatch(setSelectedComfort([...selectedComfort, equipment]));
      }
    } else if (tab === "Exterior") {
      const isSelected =
        selectedExterior &&
        Array.isArray(selectedExterior) &&
        selectedExterior.some((item) => item?.title === equipment?.title);
      if (isSelected) {
        dispatch(
          setSelectedExterior(
            selectedExterior.filter((item) => item?.title !== equipment?.title)
          )
        );
      } else {
        dispatch(setSelectedExterior([...selectedExterior, equipment]));
      }
    } else if (tab === "Accessibility") {
      const isSelected =
        selectedAccessibility &&
        Array.isArray(selectedAccessibility) &&
        selectedAccessibility.some((item) => item?.title === equipment?.title);
      if (isSelected) {
        dispatch(
          setSelectedAccessibility(
            selectedAccessibility.filter(
              (item) => item?.title !== equipment?.title
            )
          )
        );
      } else {
        dispatch(
          setSelectedAccessibility([...selectedAccessibility, equipment])
        );
      }
    }
  };

  const clear = () => {
    dispatch(setSelectedComfort([]));
    dispatch(setSelectedExterior([]));
    dispatch(setSelectedAccessibility([]));
  };

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <Header
          title="Equipments"
          onHelpPress={false}
          isClear
          onClearPress={clear}
        />
      )}
    >
      <View style={styles.tabContainer}>
        {tabArray?.map((item, i) => (
          <CustomButton
            title={item}
            key={i}
            onPress={() => setTab(item)}
            borderWidth={1}
            borderColor={tab === item ? COLORS.black : "#1212120A"}
            backgroundColor={tab === item ? COLORS.black : "transparent"}
            color={tab === item ? COLORS.white : "#121212A3"}
            height={32}
            width={100}
            fontSize={14}
          />
        ))}
      </View>

      <Divider thickness={4} />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.equipmentContainer}>
          {equipmentData?.map((equipment, index) => {
            const isSelected =
              tab === "Comfort"
                ? selectedComfort &&
                  Array.isArray(selectedComfort) &&
                  selectedComfort.some(
                    (item) => item?.title === equipment?.title
                  )
                : tab === "Exterior"
                ? selectedExterior &&
                  Array.isArray(selectedExterior) &&
                  selectedExterior.some(
                    (item) => item?.title === equipment?.title
                  )
                : selectedAccessibility &&
                  Array.isArray(selectedAccessibility) &&
                  selectedAccessibility.some(
                    (item) => item?.title === equipment?.title
                  );
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleEquipmentToggle(equipment)}
                key={index}
                style={[
                  styles.equipmentItem,
                  {
                    borderWidth: isSelected ? 2 : 1,
                    borderColor: isSelected ? COLORS.black : "#1212120A",
                  },
                ]}
              >
                <CustomCheckBox
                  change
                  value={isSelected}
                  onValueChange={() => handleEquipmentToggle(equipment)}
                />
                <CustomText
                  label={equipment?.title}
                  fontFamily={fonts.medium}
                  fontSize={16}
                  lineHeight={16 * 1.4}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Equipments;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
    paddingHorizontal: 12,
  },

  mainContainer: {
    paddingHorizontal: 12,
    flex: 1,
  },
  equipmentItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    width: "49%",
    height: 104,
    borderRadius: 12,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  equipmentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

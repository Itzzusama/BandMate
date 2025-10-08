import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import fonts from "../../../assets/fonts";
import Divider from "../../../components/Divider";
import LocationCard from "./molecules/LocationCard";
import LookingForCard from "./molecules/LookingForCard";
import OptionCard from "./molecules/OptionCard";
import RangeCard from "./molecules/RangeCard";
import CustomButton from "../../../components/CustomButton";

const FilterScreen = () => {
  const [lookingFor, setLookingFor] = useState([
    { name: "Solo Artists", isEnable: true },
    { name: "Bands", isEnable: true },
  ]);
  const [experience, setExperience] = useState([
    { name: "Beginner", isEnable: true },
    { name: "Intermediate", isEnable: true },
    { name: "Advanced", isEnable: true },
    { name: "Professional", isEnable: true },
  ]);

  // Updated to use object format with isSelected property
  const [interest, setInterest] = useState([
    { name: "Jam Sessions", isSelected: false },
    { name: "Studio time", isSelected: false },
    { name: "Band members", isSelected: false },
  ]);

  const [music, setMusic] = useState([
    { name: "Blues", isSelected: false },
    { name: "Rock", isSelected: false },
    { name: "Soul", isSelected: false },
  ]);

  const [Instrument, setInstruments] = useState([
    { name: "Bass", isSelected: false },
    { name: "Drums", isSelected: false },
    { name: "Guitar", isSelected: false },
    { name: "Vocal", isSelected: false },
    { name: "Piano", isSelected: false },
    { name: "Trumpet", isSelected: false },
    { name: "Violin", isSelected: false },
  ]);
  const [Availability, setAvailability] = useState([
    { name: "Weekdays", isSelected: false },
    { name: "Weekends", isSelected: false },
    { name: "During The Day", isSelected: false },
    { name: "In The Evening", isSelected: false },
  ]);

  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <Header
          title={"Filters"}
          fontFamily={fonts.abril}
          secondText={"3"}
          isClear
          btnTitle={"Reset all"}
        />
      )}
    >
      <LocationCard />
      <LookingForCard switchArray={lookingFor} setSwitchArray={setLookingFor} />
      <OptionCard
        title={"Interested in"}
        array={interest}
        setArray={setInterest}
      />
      <OptionCard title={"Music Style"} array={music} setArray={setMusic} />
      <OptionCard
        title={"Instruments"}
        array={Instrument}
        setArray={setInstruments}
      />
      <LookingForCard
        switchArray={experience}
        setSwitchArray={setExperience}
        title={"Experience level"}
      />
      <RangeCard title={"Distance range"} />
      <RangeCard title={"Age range"} />
      <OptionCard
        title={"Availability"}
        array={Availability}
        setArray={setAvailability}
      />

      <CustomButton
        title={"Discover 83+ Profiles"}
        width="95%"
        marginBottom={24}
        marginTop={12}
      />
    </ScreenWrapper>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({});

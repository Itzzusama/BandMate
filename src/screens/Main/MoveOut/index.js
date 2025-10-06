import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import TopTabWithBG from "../../../components/TopTabWithBG";
import SearchInput from "../../../components/SearchInput";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";

import ToggleCard from "./molecules/ToggleCard";
import UploadCard from "./molecules/UploadCard";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const MoveOut = () => {
  const navigation = useNavigation();
  const [isModal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const init = {
    jobTitle: "St-Castle Move-Out",
    country: "14456",
    city: "14456",
    zipCode: "14456",
    streetName: "Chemin de la paroisse",
    buildingNum: "17",
    floorNum: "",
  };
  const inits = {
    jobTitleError: "",
    countryError: "",
    cityError: "",
    zipCodeError: "",
    streetNameError: "",
    buildingNumError: "",
    floorNumError: "",
  };

  const [state, setState] = useState(init);
  const [errors, setErrors] = useState(inits);

  const array = [
    {
      id: 1,
      placeholder: "JOB TITLE",
      value: state.jobTitle,
      onChange: (text) => setState({ ...state, jobTitle: text }),
      error: errors?.jobTitleError,
      secureTextEntry: true,
    },
    {
      id: 1.1,
      placeholder: "Search for an Address",
      value: state.search,
      onChange: (text) => setState({ ...state, search: text }),
      error: errors?.searchError,
    },
    {
      id: 2,
      placeholder: "COUNTRY",
      value: state.country,
      onChange: (text) => setState({ ...state, country: text }),
      error: errors?.countryError,
      secureTextEntry: true,
    },
    {
      id: 3,
      placeholder: "CITY",
      value: state.city,
      onChange: (text) => setState({ ...state, city: text }),
      error: errors?.cityError,
      secureTextEntry: true,
    },
    {
      id: 4,
      placeholder: "ZIP CODE",
      value: state.zipCode,
      onChange: (text) => setState({ ...state, zipCode: text }),
      error: errors?.zipCodeError,
      secureTextEntry: true,
    },
    {
      id: 5,
      placeholder: "STREET NAME",
      value: state.streetName,
      onChange: (text) => setState({ ...state, streetName: text }),
      error: errors?.streetNameError,
      secureTextEntry: true,
    },
    {
      id: 6,
      placeholder: "BUILDING NUMBER",
      value: state.buildingNum,
      onChange: (text) => setState({ ...state, buildingNum: text }),
      error: errors?.buildingNumError,
      secureTextEntry: true,
    },
    {
      id: 7,
      placeholder: "FLOOR NUMBER",
      value: state.floorNum,
      onChange: (text) => setState({ ...state, floorNum: text }),
      error: errors?.floorNumError,
      secureTextEntry: true,
    },
  ];
  const toggleArray = [
    {
      id: 1,
      label: "HAS AN ELEVATOR?",
    },
    {
      id: 2,
      label: "HAVE A GARAGE?",
    },
    {
      id: 3,
      label: "HAVE A BUNKER?",
    },
    {
      id: 4,
      label: "DO YOU HAVE PETS?",
    },
    {
      id: 5,
      label: "DOES THE PRO HAVE A PLACE TO PARK?",
    },
  ];

  const [tab, setTab] = useState("Apartment");

  // House tab state
  const [rooms, setRooms] = useState([
    { id: 1, title: "Living Room", unit1: "16", unit2: "24", items: 4 },
    { id: 2, title: "Living Room", unit1: "16", unit2: "24", items: 6 },
    { id: 3, title: "Living Room", unit1: "16", unit2: "24", items: 3 },
  ]);
  const [floorPlan, setFloorPlan] = useState(null);
  const [video, setVideo] = useState(null);

  // Room handlers
  const handleAddRoom = () => {
    setRooms((prev) => [
      ...prev,
      { id: Date.now(), title: "", unit1: "", unit2: "", items: 0 },
    ]);
  };
  const handleRoomChange = (idx, key, value) => {
    setRooms((prev) =>
      prev.map((room, i) => (i === idx ? { ...room, [key]: value } : room))
    );
  };

  // File/video upload handlers (mocked for now)
  const handleFloorPlanUpload = async () => {
    // Use DocumentPicker or similar in real app
    setFloorPlan({ name: "floorplan.pdf" });
  };
  const handleFloorPlanDelete = () => setFloorPlan(null);
  const handleVideoUpload = async () => {
    setVideo({ name: "walkthrough.mp4" });
  };
  const handleVideoDelete = () => setVideo(null);

  return (
    <ScreenWrapper
      scrollEnabled
      paddingBottom={16}
      headerUnScrollable={() => (
        <>
          <Header title="Move-Out" />
        </>
      )}
      footerUnScrollable={() => (
        <View style={{ padding: 12 }}>
          <CustomButton title={"Continue"} marginBottom={8} />
          <CustomButton
            title={"Save As Draft"}
            backgroundColor={COLORS.inputBg}
            color={COLORS.primaryColor}
          />
        </View>
      )}
    >
      <TopTabWithBG
        tabNames={["Apartment", "House"]}
        tab={tab}
        setTab={setTab}
        activeHeight={40}
        fontSize={14}
      />

      {tab === "Apartment" ? (
        <>
          <CustomText
            label="Move out’s Details"
            fontFamily={fonts.semiBold}
            fontSize={24}
            lineHeight={24 * 1.4}
            marginTop={8}
            marginBottom={5}
          />
          <CustomText
            label="Please enter your establishment address as mentioned on your official documents."
            color={COLORS.gray3}
            lineHeight={14 * 1.4}
            marginBottom={24}
          />
          {array?.map((item) =>
            item?.id == 1.1 ? (
              <>
                <CustomText
                  label="Address"
                  fontFamily={fonts.medium}
                  fontSize={18}
                  lineHeight={18 * 1.4}
                  marginBottom={5}
                />
                <SearchInput
                  placeholder={item?.placeholder}
                  value={item?.value}
                  onChangeText={item?.onChange}
                  marginBottom={16}
                />
              </>
            ) : (
              <CustomInput
                key={item?.id}
                placeholder={item.placeholder}
                value={item.value}
                onChangeText={item.onChange}
                error={item.error}
                withLabel={item?.placeholder}
              />
            )
          )}
          {toggleArray?.map((item) => (
            <ToggleCard key={item?.id} label1={item.label} />
          ))}
        </>
      ) : (
        // House Tab UI
        <View>
          <CustomText
            label="Rooms"
            fontFamily={fonts.semiBold}
            fontSize={24}
            lineHeight={24 * 1.4}
            marginTop={8}
            marginBottom={5}
          />
          <CustomText
            label="Please enter your establishment address as mentioned on your official documents."
            color={COLORS.gray3}
            lineHeight={14 * 1.4}
            marginBottom={20}
          />

          <CustomButton
            title="+ Add A Room"
            onPress={handleAddRoom}
            backgroundColor={COLORS.inputBg}
            color={COLORS.primaryColor}
            lineHeight={14 * 1.4}
            marginBottom={24}
          />

          {rooms.map((room, idx) => (
            <View key={room.id} style={{ marginBottom: 16 }}>
              <CustomText
                label={`Room ${idx + 1}`}
                lineHeight={18 * 1.4}
                fontFamily={fonts.medium}
                fontSize={18}
                marginBottom={6}
              />
              <CustomInput
                value={room.title}
                onChangeText={(text) => handleRoomChange(idx, "title", text)}
                placeholder="Room Title"
                withLabel={"Room Title"}
                marginBottom={8}
              />
              <View style={{ flexDirection: "row", gap: 8 }}>
                <CustomInput
                  value={room.unit1}
                  onChangeText={(text) => handleRoomChange(idx, "unit1", text)}
                  placeholder="Unit is meter (m)"
                  keyboardType="numeric"
                  width="49%"
                  withLabel={"Unit is meter (m)"}
                />
                <CustomInput
                  value={room.unit2}
                  onChangeText={(text) => handleRoomChange(idx, "unit2", text)}
                  placeholder="Unit is meter (m)"
                  keyboardType="numeric"
                  width="49%"
                  withLabel="Unit is meter (m)"
                />
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate("RoomInventory")}
                style={styles.row}
              >
                <View>
                  <CustomText
                    label={"Create Inventory"}
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                  />
                  <CustomText
                    label={"4 Items"}
                    fontFamily={fonts.medium}
                    fontSize={16}
                    lineHeight={16 * 1.4}
                  />
                </View>
                <Icons
                  name={"chevron-forward-outline"}
                  family={"Ionicons"}
                  size={22}
                />
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.border} />

          <CustomText
            label="Floor Plan"
            fontFamily={fonts.medium}
            fontSize={18}
            lineHeight={18 * 1.4}
          />

          <CustomText
            label="If you have a floor plan that would help, but that remains optional."
            color={COLORS.gray3}
            lineHeight={14 * 1.4}
            marginBottom={6}
          />
          <UploadCard
            label="Upload Floor Plan"
            file={floorPlan}
            onUpload={handleFloorPlanUpload}
            onDelete={handleFloorPlanDelete}
            accept="application/pdf,image/jpeg"
            maxSize={20 * 1024 * 1024}
            info="JPG or PDF only. 20MB."
          />
          <View style={styles.border} />

          <CustomText
            label="Join A Video"
            fontFamily={fonts.medium}
            fontSize={18}
            lineHeight={18 * 1.4}
          />
          <CustomText
            label="If you have a walkthrough video that would help, but that remains optional."
            color={COLORS.gray3}
            marginBottom={6}
            lineHeight={14 * 1.4}
          />
          <UploadCard
            label="Upload a Video"
            file={video}
            onUpload={handleVideoUpload}
            onDelete={handleVideoDelete}
            accept="video/mp4"
            maxSize={20 * 1024 * 1024}
            info="MP4 only. 20MB."
          />
        </View>
      )}
    </ScreenWrapper>
  );
};

export default MoveOut;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    height: 56,
  },
  border: {
    backgroundColor: COLORS.lightGray,
    width: "100%",
    height: 1,
    marginBottom: 16,
  },
});

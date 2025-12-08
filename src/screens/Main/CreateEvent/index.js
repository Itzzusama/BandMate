import React, { useState } from "react";
import { View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthSlider from "../../../components/Auth/AuthSlider";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import Heading from "./molecules/Heading";
import SelectLocation from "./molecules/SelectLocation";
import Divider from "../../../components/Divider";
import OptionSelector from "./molecules/OptionSelector";
import SwitchOption from "./molecules/SwitchOption";
import TimingDetails from "./molecules/TimingDetails";
import SelectionModal from "./molecules/SelectionModal";
import { useNavigation } from "@react-navigation/native";
import ErrorComponent from "../../../components/ErrorComponent";
import CountryBottomSheet from "../../../components/CountryBottomSheet";
import CustomModalGooglePlaces from "../../../components/CustomModalGooglePlaces";
import moment from "moment";
import { clampRGBA } from "react-native-reanimated/lib/typescript/Colors";

const CreateEvent = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    venueName: "",
    address: {
      location: {
        type: "Point",
        coordinates: [],
      },
      address: "",
      state: "",
      country: "",
      city: "",
    },
    eventName: "",
    genres: [],
    ageRating: "",
    aboutThisEvent: "",
    whatGuestCanExpect: "",
    disableFriendly: false,
    visibleTo: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    featuredArtists: [],
    sponsors: [],
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("age");
  const [googleModalVisible, setGoogleModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateAddress = (key, value) => {
    setForm((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: value },
    }));
  };

  const handleSelection = (value) => {
    if (modalType === "age") updateField("ageRating", value);
    if (modalType === "visibleTo") updateField("visibleTo", value);
    setModalVisible(false);
  };
  const formatAgeRating = (value) => {
    if (!value) return "";

    if (value.toLowerCase() === "kids") return "0";

    return value.replace("+", "");
  };

  const formatVisibility = (value) => {
    if (!value) return "private";

    return value.toLowerCase() === "public" ? "public" : "private";
  };
  const formatFeaturedArtists = (artists = []) => {
    return artists
      .map((item) => ({
        name: item?.artist || item?.name || "",
        image: item?.image || item?.profileImage || "",
      }))
      .filter((artist) => artist.name); // remove empty names
  };
  const isFormValid = () => {
    const {
      venueName,
      address,
      eventName,
      genres,
      ageRating,
      aboutThisEvent,
      whatGuestCanExpect,
      visibleTo,
      startDate,
      startTime,
      endDate,
      endTime,
    } = form;

    return (
      venueName?.trim() &&
      address?.address?.trim() &&
      address?.state?.trim() &&
      address?.city?.trim() &&
      address?.country?.trim() &&
      eventName?.trim() &&
      genres?.length > 0 &&
      ageRating?.trim() &&
      aboutThisEvent?.trim() &&
      whatGuestCanExpect?.trim() &&
      visibleTo?.trim() &&
      startDate &&
      startTime &&
      endDate &&
      endTime
    );
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <>
          <Header title={"New event"} />
          <View style={{ marginHorizontal: 12 }}>
            <AuthSlider
              min={1}
              max={3}
              gap={4}
              marginTop={8}
              marginBottom={7}
            />
          </View>
        </>
      )}
      footerUnScrollable={() => (
        <View style={{ padding: 12, marginBottom: 24 }}>
          <CustomButton
            title="Continue"
            marginBottom={8}
            disabled={!isFormValid()}
            onPress={() => {
              const formattedForm = {
                ...form,

                ageRating: formatAgeRating(form.ageRating),

                visibleTo: formatVisibility(form.visibleTo),
                featuredArtists: formatFeaturedArtists(form.featuredArtists),
              };
              console.log(formattedForm);
              navigation.navigate("Branding", {
                eventData: formattedForm,
              });
            }}
          />
          <CustomButton
            title="Save As Draft"
            backgroundColor={COLORS.cardColor}
            color={COLORS.white}
          />
        </View>
      )}
      scrollEnabled
    >
      <CustomText
        label={"Event Details"}
        fontSize={24}
        fontFamily={fonts.semiBold}
        lineHeight={24 * 1.4}
        marginTop={8}
      />
      <Heading lable={"Where"} showIcon={true} />
      <CustomInput
        withLabel={"VENUE NAME"}
        value={form.venueName}
        onChangeText={(t) => updateField("venueName", t)}
        placeholder={"Toscana Wine Tasting"}
      />
      <CustomInput
        withLabel={"STATE"}
        value={form.address.state}
        onChangeText={(t) => updateAddress("state", t)}
        placeholder={"New York"}
      />
      <CustomInput
        withLabel={"CITY"}
        value={form.address.city}
        onChangeText={(t) => updateAddress("city", t)}
        placeholder={"New York"}
      />
      <SelectLocation
        type="loc"
        value={form.address.address}
        onPress={() => setGoogleModalVisible(true)}
        placeholder={"Central Park, New York City"}
      />
      <SelectLocation
        type="country"
        value={selectedCountry?.label}
        onPress={() => setBottomSheetVisible(true)}
        placeholder={"United States of America"}
      />
      <Divider thickness={1} color={COLORS.inputBg} marginBottom={0} />
      <Heading lable={"General Details"} />
      <CustomInput
        withLabel={"EVENT NAME"}
        value={form.eventName}
        onChangeText={(t) => updateField("eventName", t)}
        placeholder={"Summer Music Festival 2026"}
      />
      <OptionSelector
        label={"GENRE(S)"}
        placeHolder={"Pop, Rock, Reggae"}
        value={form.genres.join(", ")}
        onPress={() =>
          navigation.navigate("AuthStack", {
            screen: "Genres",
            params: {
              fromScreen: "Event",
              onSelect: (selected) => updateField("genres", selected),
            },
          })
        }
      />
      <OptionSelector
        label={"AGE RATING"}
        value={form.ageRating}
        onPress={() => {
          setModalType("age");
          setModalVisible(true);
        }}
        placeHolder={"Kids Friendly"}
      />
      <CustomInput
        withLabel={"About this event"}
        value={form.aboutThisEvent}
        onChangeText={(t) => updateField("aboutThisEvent", t)}
        placeholder={"Experience the magic of live music..."}
        multiline
        height={197}
        maxLength={50}
      />
      <ErrorComponent
        errorTitle={`${form?.aboutThisEvent?.length}/50 characters.`}
        marginBottom={8}
      />
      <CustomInput
        withLabel={"What guests can expect"}
        value={form.whatGuestCanExpect}
        onChangeText={(t) => updateField("whatGuestCanExpect", t)}
        placeholder={"Guests can expect..."}
        multiline
        height={160}
        maxLength={200}
      />
      <ErrorComponent
        errorTitle={`${form.whatGuestCanExpect.length}/200 characters.`}
      />
      <Divider thickness={1} color={COLORS.inputBg} />
      <SwitchOption
        value={form.disableFriendly}
        setValue={(v) => updateField("disableFriendly", v)}
      />
      <OptionSelector
        label={"VISIBLE TO"}
        value={form.visibleTo}
        onPress={() => {
          setModalType("visibleTo");
          setModalVisible(true);
        }}
        placeHolder={"Everyone"}
      />
      <Divider thickness={1} marginBottom={0} color={COLORS.inputBg} />
      <Heading lable={"When"} />
      <TimingDetails
        startDate={
          form.startDate ? moment(form.startDate, "YYYY-MM-DD").toDate() : null
        }
        setStartDate={(v) =>
          updateField("startDate", moment(v).format("YYYY-MM-DD"))
        }
        startTime={
          form.startTime ? moment(form.startTime, "HH:mm").toDate() : null
        }
        setStartTime={(v) =>
          updateField("startTime", moment(v).format("HH:mm"))
        }
        endDate={
          form.endDate ? moment(form.endDate, "YYYY-MM-DD").toDate() : null
        }
        setEndDate={(v) =>
          updateField("endDate", moment(v).format("YYYY-MM-DD"))
        }
        endTime={form.endTime ? moment(form.endTime, "HH:mm").toDate() : null}
        setEndTime={(v) => updateField("endTime", moment(v).format("HH:mm"))}
      />

      <Divider thickness={1} marginBottom={0} color={COLORS.inputBg} />
      <Heading lable={"Featuring"} />
      <OptionSelector
        label={"FEATURED ARTISTS"}
        placeHolder={"Nike, Roger Federer"}
        value={form.featuredArtists.map((item) => item?.artist).join(", ")}
        onPress={() =>
          navigation.navigate("AuthStack", {
            screen: "Artists",
            params: {
              fromScreen: "Home",
              isEvent: true,
              onSelect: (selected) => updateField("featuredArtists", selected),
            },
          })
        }
      />
      <OptionSelector
        label={"SPONSOR"}
        placeHolder={"Add sponsor(s)"}
        value={form.sponsors.map((s) => s.name).join(", ")}
        onPress={() =>
          navigation.navigate("AddSponsor", {
            sponsors: form.sponsors,
            onSave: (s) => updateField("sponsors", s),
          })
        }
      />
      <SelectionModal
        isVisible={modalVisible}
        type={modalType}
        selected={modalType === "age" ? form.ageRating : form.visibleTo}
        onModalClose={() => setModalVisible(false)}
        onSelection={handleSelection}
      />
      <CountryBottomSheet
        isVisible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        selectedCountry={selectedCountry}
        onCountrySelect={(country) => {
          setSelectedCountry(country);
          updateAddress("country", country.label);
          setBottomSheetVisible(false);
        }}
        hideCode={false}
      />
      <CustomModalGooglePlaces
        isVisible={googleModalVisible}
        onClose={() => setGoogleModalVisible(false)}
        onLocationSelect={(location) => {
          console.log(location);
          updateAddress("address", location?.address);
          updateAddress("city", location?.city);
          updateAddress("state", location?.state);
          updateAddress("location", {
            type: "Point",
            coordinates: [location?.longitude, location?.latitude],
          });
          setGoogleModalVisible(false);
        }}
        initialValue={form.address.address}
        isEvent={true}
      />
    </ScreenWrapper>
  );
};

export default CreateEvent;

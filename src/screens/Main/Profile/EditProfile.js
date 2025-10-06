import { StyleSheet, View } from "react-native";
import { useState } from "react";

import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomDropdown from "../../../components/CustomDropdown";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomSwitch from "../../../components/CustomSwitch";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { useSelector } from "react-redux";

const EditProfile = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isManual, setIsManual] = useState(false);
  const { userData } = useSelector((state) => state.users);


  const initialState = {
    countryOfResidence: "",
    fullName: "",
    surName: "",
    genre: "",
    username: "",
    birthdate: "",
    about: "",
  };

  const initialError = {
    countryOfResidenceError: "",
    fullNameError: "",
    surNameError: "",
    genreError: "",
    usernameError: "",
    birthdateError: "",
    aboutError: "",
  };

  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(initialError);

  const genre = ["Male", "Female"];

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header title="Edit Profile" textColor={COLORS.black} />
      )}
    >
      <View style={styles.top}>
        <CustomButton
          title="Profile"
          onPress={() => setActiveTab("Profile")}
          backgroundColor={
            activeTab === "Profile" ? COLORS.white : "transparent"
          }
          color={COLORS.black}
          fontFamily={fonts.medium}
          fontSize={16}
          width="48%"
          height={40}
        />
        <CustomButton
          title="Plan"
          onPress={() => setActiveTab("Plan")}
          backgroundColor={activeTab === "Plan" ? COLORS.white : "transparent"}
          color={COLORS.black}
          fontFamily={fonts.medium}
          fontSize={16}
          width="48%"
          height={40}
        />
      </View>

      <CustomText
        label={"Profile Info"}
        fontSize={24}
        lineHeight={24 * 1.4}
        fontFamily={fonts.semiBold}
        marginTop={20}
      />
      <CustomText
        label={"Edit your Profile in here"}
        fontSize={14}
        color={COLORS.gray1}
      />

      <View style={styles.profilePictureContainer}>
        <View style={styles.pic}>
          <ImageFast
            source={Images.placeholderUser}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <CustomText
            label={"PUBLIC PICTURE"}
            fontSize={14}
            fontFamily={fonts.medium}
            color={COLORS.black}
            marginTop={24}
          />
        </View>
        <View style={styles.pic}>
          <View
            style={[
              styles.profileImage,
              {
                borderWidth: 2,
                borderColor: "#1212120A",
                borderRadius: 100,
              },
            ]}
          >
            <Icons
              family="AntDesign"
              name="plus"
              color={COLORS.gray1}
              size={40}
            />
          </View>
          <CustomText
            label={"FRIENDS PICTURE"}
            fontSize={14}
            fontFamily={fonts.medium}
            color={COLORS.black}
            marginTop={24}
          />
        </View>
      </View>

      <CustomInput
        withLabel={"Country of Residence"}
        placeholder={"United State of America"}
        value={state.countryOfResidence}
        onChangeText={(text) =>
          setState({ ...state, countryOfResidence: text })
        }
        error={errors.countryOfResidenceError}
        marginBottom={12}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Icons family="Feather" name="info" color={COLORS.gray2} size={12} />
        <CustomText
          label={"186 days spent in this country."}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray2}
          fontFamily={fonts.medium}
          marginLeft={4}
        />
      </View>

      <CustomInput
        withLabel={"Full Name"}
        placeholder={"Enter your name"}
        value={state.fullName}
        onChangeText={(text) => setState({ ...state, fullName: text })}
        error={errors.fullNameError}
        marginBottom={12}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Icons family="Feather" name="info" color={COLORS.gray2} size={12} />

        <CustomText
          label={`${state.fullName.length}/27 characters`}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray2}
          fontFamily={fonts.medium}
          marginLeft={4}
        />
      </View>

      <CustomInput
        withLabel={"Full Surname"}
        placeholder={"Enter your surname"}
        value={state.surName}
        onChangeText={(text) => setState({ ...state, surName: text })}
        error={errors.surNameError}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Icons family="Feather" name="info" color={COLORS.gray2} size={12} />

        <CustomText
          label={`${state.surName.length}/27 characters`}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray2}
          fontFamily={fonts.medium}
          marginLeft={4}
        />
      </View>

      <CustomDropdown
        withLabel={"Genre"}
        placeholder="Select your genre"
        data={genre}
        value={state.genre}
        setValue={(value) => setState({ ...state, genre: value })}
        error={errors.genreError}
      />

      <CustomInput
        withLabel={"Username"}
        placeholder={"Enter UserName"}
        value={state.username}
        onChangeText={(text) => setState({ ...state, username: text })}
        error={errors.usernameError}
        marginBottom={12}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Icons family="Feather" name="info" color={COLORS.gray2} size={12} />

        <CustomText
          label={"Should Be Unqiue"}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray2}
          fontFamily={fonts.medium}
          marginLeft={4}
        />
      </View>

      <CustomDatePicker
        withLabel="Date of Birth"
        value={state.birthdate}
        setValue={(date) => setState({ ...state, birthdate: date })}
        error={errors.birthdateError}
        labelColor={COLORS.black}
        type="date"
        maxDate={new Date()}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Icons
          family="FontAwesome"
          name="check-circle"
          color={COLORS.green}
          size={18}
          marginBottom={2}
        />
        <CustomText
          label={"Valid Legal Age"}
          fontSize={12}
          color={COLORS.gray}
          fontFamily={fonts.medium}
          marginLeft={5}
        />
      </View>

      <Divider />

      <CustomText label={"About Me"} fontSize={16} fontFamily={fonts.medium} />
      <CustomText
        label={
          "Introduce yourself. Who are you, where do you live and what do you love? Profiles with great descriptions get more attention. Don’t worry about language; our app will translate it for you."
        }
        fontSize={14}
        fontFamily={fonts.medium}
        color={COLORS.gray}
      />

      <CustomInput
        placeholder={"Enter About You"}
        value={state.about}
        marginTop={10}
        onChangeText={(text) => setState({ ...state, about: text })}
        error={errors.aboutError}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Icons family="Feather" name="info" color={COLORS.gray2} size={12} />

        <CustomText
          label={`${state.about.length}/200 characters`}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray2}
          fontFamily={fonts.medium}
          marginLeft={4}
        />
      </View>

      <Divider />

      <View style={styles.switchContainer}>
        <CustomText
          label={"Can you Drive Manual?"}
          fontSize={16}
          fontFamily={fonts.medium}
          color={COLORS.black}
        />
        <CustomSwitch value={isManual} setValue={setIsManual} />
      </View>

      <Divider />

      <CustomText
        label={"Social Media"}
        fontSize={16}
        fontFamily={fonts.medium}
        color={COLORS.black}
      />

      <CustomInput
        withLabel={"Linkable Profile"}
        value={state.username}
        onChangeText={(text) => setState({ ...state, username: text })}
        error={errors.usernameError}
        marginTop={10}
      />

      <View style={{ margin: 12 }}>
        <CustomButton
          title={"Log out"}
          // onPress={}
        />
        <CustomButton
          icon={Images.delete}
          title={"Delete My Account"}
          backgroundColor={COLORS.inputBg}
          marginTop={16}
          color={COLORS.black}
          marginBottom={30}
          // onPress={}
        />
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    backgroundColor: "#1212120A",
    borderRadius: 50,
    padding: 5,
  },
  characterCount: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  profilePictureContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 40,
    marginBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  pic: {
    alignItems: "center",
    justifyContent: "center",
  },
});

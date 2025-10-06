import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomSwitch from "../../../components/CustomSwitch";
import CustomButton from "../../../components/CustomButton";
import ImageFast from "../../../components/ImageFast";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import { Images } from "../../../assets/images";
import { useNavigation } from "@react-navigation/native";
import VTCModal from "./Modals/VTCModal";
import { useState } from "react";
import ErrorComponent from "../../../components/ErrorComponent";

const ROLE_OPTIONS = ["Admin", "Manager", "Editor", "Viewer"];

const ROLE_DESCRIPTIONS = {
  Admin: "Can add, edit and remove items.",
  Manager: "Can add and edit items.",
  Editor: "Can edit existing items.",
  Viewer: "Can only view items.",
};

const ManageAccess = () => {
  const navigation = useNavigation();

  // Member management state
  const [members, setMembers] = useState([
    {
      id: 1,
      firstName: "Viktor",
      surname: "Sola",
      email: "viktorsola@mail.com",
      role: "Admin",
      isActive: true,
    },
    {
      id: 2,
      firstName: "Viktor",
      surname: "Sola",
      email: "viktorsola@mail.com",
      role: "Admin",
      isActive: true,
    },
  ]);

  const handleAddMember = () => {
    setMembers([
      ...members,
      {
        id: Date.now(),
        firstName: "",
        surname: "",
        email: "",
        role: ROLE_OPTIONS[0],
        isActive: true,
      },
    ]);
  };

  const handleMemberChange = (id, key, value) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, [key]: value } : member
      )
    );
  };

  const handleDeleteMember = (id) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <ScreenWrapper
      paddingBottom={12}
      scrollEnabled
      headerUnScrollable={() => <Header title={"Access"} />}
      // footerUnScrollable={() => (
      //   <View style={{ padding: 12 }}>
      //     <CustomButton
      //       title={"Continue"}
      //       onPress={() => navigation.navigate("OptionProvided")}
      //       marginBottom={6}
      //     />
      //     <CustomButton
      //       title={"Vehicle Dashboard"}
      //       onPress={() => navigation.navigate("VehicleDashboard")}
      //     />
      //   </View>
      // )}
    >
      <CustomText
        label={"Manage Access"}
        fontSize={24}
        fontFamily={fonts.semiBold}
        marginTop={16}
      />
      <CustomText
        label={"You don't have any members yet."}
        color={COLORS.gray3}
        fontSize={14}
        marginBottom={24}
        marginTop={-3}
      />

      {members.map((member, index) => (
        <View key={member.id} style={styles.memberCard}>
          <View style={styles.nameRow}>
            <CustomInput
              value={member.firstName}
              onChangeText={(text) =>
                handleMemberChange(member.id, "firstName", text)
              }
              placeholder="First Name"
              withLabel="FIRSTNAME"
              width="48%"
              marginBottom={0.1}
            />
            <CustomInput
              value={member.surname}
              onChangeText={(text) =>
                handleMemberChange(member.id, "surname", text)
              }
              placeholder="Surname"
              withLabel="SURNAME"
              width="48%"
              marginBottom={0.1}
            />
          </View>

          <View style={styles.emailRow}>
            <CustomInput
              value={member.email}
              marginBottom={0.1}
              onChangeText={(text) =>
                handleMemberChange(member.id, "email", text)
              }
              placeholder="Email"
              withLabel={`#${index + 1} MEMBER`}
              width="85%"
              // isSwitch
              switchValue={member.isActive}
              setSwitchValue={(value) =>
                handleMemberChange(member.id, "isActive", value)
              }
            />
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDeleteMember(member.id)}
            >
              <ImageFast source={Images.binRed} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>

          <CustomDropdown
            data={ROLE_OPTIONS}
            value={member.role}
            setValue={(value) => handleMemberChange(member.id, "role", value)}
            withLabel="ROLE"
            marginBottom={8}
          />
          <ErrorComponent
            errorTitle={ROLE_DESCRIPTIONS[member.role]}
            marginTop={-10}
          />
        </View>
      ))}

      <CustomButton
        title="Add A Partner/Employee"
        onPress={handleAddMember}
        backgroundColor={COLORS.inputBg}
        color={COLORS.primaryColor}
        icon={Images.plus}
        marginTop={10}
        marginBottom={24}
        fontFamily={fonts.medium}
      />
    </ScreenWrapper>
  );
};

export default ManageAccess;

const styles = StyleSheet.create({
  memberCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    borderColor: COLORS.inputBg,
  },
  nameRow: {
    flexDirection: "row",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },

  deleteBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FCD9E1",
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 14,
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  roleDescription: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  infoIcon: {
    width: 14,
    height: 14,
    tintColor: COLORS.gray3,
  },
});

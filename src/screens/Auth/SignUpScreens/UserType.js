import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { forwardRef, useImperativeHandle } from "react";

import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";

import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";

const UserType = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const [error, setError] = useState(false);
    const [selectedRole, setSelectedRole] = useState(state?.role || null);
    const [showSuccessColor, setShowSuccessColor] = useState(false);

    const handleRoleSelection = (role) => {
      setSelectedRole(role);

      if (error) {
        setError(false);
        setShowSuccessColor(true);
        setTimeout(() => {
          setShowSuccessColor(false);
        }, 2000);
      }
    };

    const submit = () => {
      if (!selectedRole) {
        setError(true);
        return;
      }
      setState({ ...state, role: selectedRole });
      if (currentIndex < 10) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    const back = () => {
      if (currentIndex > 1) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    useImperativeHandle(ref, () => ({ submit, back }));

    return (
      <View style={styles.container}>
        <View>
          <CustomText
            label="I am a"
            fontSize={32}
            lineHeight={32 * 1.4}
            fontFamily={fonts.abril}
            color={COLORS.white}
            marginTop={6}
            textTransform="default"
            marginBottom={12}
          />

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleRoleSelection("user")}
            style={[
              styles.box,
              {
                backgroundColor: COLORS.darkGreen,
                borderWidth: 3,
                borderColor:
                  selectedRole === "user" ? COLORS.white : "transparent",
              },
            ]}
          >
            <CustomText
              label="Solo Artist"
              fontSize={28}
              fontFamily={fonts.medium}
              color={COLORS.white}
              lineHeight={28 * 1.1}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleRoleSelection("professional")}
            style={[
              styles.box,
              {
                backgroundColor: COLORS.pink,
                borderWidth: 3,
                borderColor:
                  selectedRole === "professional"
                    ? COLORS.white
                    : "transparent",
              },
            ]}
          >
            <CustomText
              label="Band"
              fontSize={28}
              lineHeight={28 * 1.1}
              fontFamily={fonts.medium}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
        {error ? (
          <ErrorComponent errorTitle="Please select a role to continue." />
        ) : null}
      </View>
    );
  }
);

export default UserType;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  box: {
    width: "100%",
    height: 160,
    borderRadius: 7.89,
    padding: 16,
    marginBottom: 8,
  },
});

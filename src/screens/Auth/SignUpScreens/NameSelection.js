import { StyleSheet, TouchableOpacity, View } from "react-native";
import { forwardRef, useImperativeHandle, useState } from "react";

import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const NameSelection = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const [selected, setSelected] = useState(
      state?.nameDisplayPreference || "first"
    );

    const submit = () => {
      setState({ ...state, nameDisplayPreference: selected });
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
            label="How Would You Like To Be Addressed?"
            fontFamily={fonts.semiBold}
            fontSize={24}
            lineHeight={24 * 1.4}
            color={COLORS.black}
            marginTop={20}
            marginBottom={20}
          />
          <View style={{ gap: 8 }}>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => setSelected("first")}
            >
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <CustomText
                    label={`Using Your Firstname\nFriendly`}
                    fontFamily={fonts.medium}
                    fontSize={16}
                    lineHeight={16 * 1.4}
                  />
                  <CustomText
                    label="E.g. Hi Ana, how was your day?"
                    fontFamily={fonts.regular}
                    fontSize={12}
                    color={COLORS.gray2}
                    marginTop={8}
                  />
                </View>
                <Icons
                  family="MaterialCommunityIcons"
                  name={
                    selected === "first" ? "radiobox-marked" : "radiobox-blank"
                  }
                  size={28}
                  color={
                    selected === "first" ? COLORS.darkPurple : COLORS.gray2
                  }
                  style={{ marginTop: 10 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => setSelected("sur")}
            >
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <CustomText
                    label={`Using Your Lastname\nCorporate`}
                    fontFamily={fonts.medium}
                    fontSize={16}
                    lineHeight={16 * 1.4}
                  />
                  <CustomText
                    label="E.g. Hello Mr. Johnson, how was your day?"
                    fontFamily={fonts.regular}
                    fontSize={12}
                    color={COLORS.gray2}
                    marginTop={8}
                  />
                </View>
                <Icons
                  family="MaterialCommunityIcons"
                  name={
                    selected === "sur" ? "radiobox-marked" : "radiobox-blank"
                  }
                  size={28}
                  color={selected === "sur" ? COLORS.darkPurple : COLORS.gray2}
                  style={{ marginTop: 10 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
);

export default NameSelection;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1212120A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
  },
});

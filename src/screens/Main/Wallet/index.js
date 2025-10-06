import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import CutomInputWithIcon from "../../../components/CutomInputWithIcon";
import Icons from "../../../components/Icons";
import CustomButton from "../../../components/CustomButton";

const Wallet = ({ navigation }) => {
  const [cardName, setCardName] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCharCount(cardName.length);
    if (cardName.length > 0 && cardName.length <= 20) {
      setIsValid(true);
      setError(null);
    } else if (cardName.length > 20) {
      setIsValid(false);
      setError("Maximum 20 characters allowed.");
    } else {
      setIsValid(false);
      setError(null);
    }
  }, [cardName]);

  return (
    <ScreenWrapper
      scrollEnabled
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton
            title={"Continuer"}
            onPress={() => navigation.navigate("AddCredits")}
          />
          <CustomButton
            title={"Annuler"}
            backgroundColor={COLORS.inputBg}
            color={COLORS.black}
            marginTop={8}
          />
        </View>
      )}
      headerUnScrollable={() => <Header title={"New Virtual Card"} />}
    >
      <CustomText
        label={"Label Card"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={32}
      />
      <CustomText
        fontSize={14}
        lineHeight={14 * 1.4}
        label={"Differentiate Virtual Cards with names."}
        fontFamily={fonts.regular}
        color={COLORS.subtitle}
      />

      <CutomInputWithIcon
        maxLength={20}
        placeholder={"E.g. Business"}
        height={44}
        marginTop={10}
        marginBottom={0}
        value={cardName}
        onChangeText={(text) => setCardName(text)}
        error={error}
        showValidation={cardName.length > 0}
        isValid={isValid}
      />

      <View style={[styles.row, { marginTop: -10 }]}>
        <Icons
          name={"info"}
          family={"Feather"}
          size={12}
          marginRight={4}
          color={COLORS.gray2}
          marginBottom={1}
        />

        <CustomText
          label={`${charCount}/20 characters.`}
          fontSize={12}
          color={COLORS.gray1}
          marginTop={2}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },

  footer: {
    paddingHorizontal: 12,
    marginBottom: 34,
    backgroundColor: COLORS.white,
    // Shadow for iOS
    // shadowColor: 'rgba(18, 18, 18, 0.04)',
    // shadowOffset: { width: 0, height: -8 },
    // shadowOpacity: 1,
    // shadowRadius: 4,
    // Shadow for Android
    // elevation: 2,
  },
});

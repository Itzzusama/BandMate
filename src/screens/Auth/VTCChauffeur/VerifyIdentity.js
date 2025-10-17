import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import { PNGIcons } from "../../../assets/images/icons";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";

const VerifyIdentity = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const [selectedDocument, setSelectedDocument] = useState("ID");

  const handleDocumentSelect = (documentType) => {
    setSelectedDocument(documentType);
  };

  const handleContinue = () => {
    navigation.navigate("TakeIDFront", { type: params?.type, id: params?.id });
  };

  const handleCancel = () => navigation.goBack();

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Verify Your Identity"} />}
      footerUnScrollable={() => (
        <View style={styles.actionButtonsContainer}>
          <CustomButton
            title="Continue"
            onPress={handleContinue}
            marginBottom={8}
            isBoarder
            secondBorderColor={COLORS.primaryColor}
          />
          <CustomButton
            title="Pass"
            backgroundColor={COLORS.inputBg}
            color={COLORS.white}
            onPress={handleCancel}
            marginBottom={24}
          />
        </View>
      )}
    >
      <CustomText
        label="Choose a document to validate your identity"
        fontSize={24}
        lineHeight={24 * 1.4}
        fontFamily={fonts.semiBold}
        marginTop={15}
      />
      <CustomText
        label="Please upload your document directly to the app. Scans and copies will not be accepted."
        color={COLORS.gray1}
        fontSize={14}
        lineHeight={14 * 1.4}
        marginBottom={32}
      />

      {/* Document Selection Toggle Cards */}
      <View style={styles.toggleCardsContainer}>
        {/* ID Card Toggle */}
        <TouchableOpacity
          style={[
            styles.toggleCard,
            {
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              borderBottomWidth: 0.4,
              borderColor: COLORS.white4,
            },
          ]}
          activeOpacity={0.8}
          onPress={() => handleDocumentSelect("ID")}
        >
          <View style={styles.toggleCardContent}>
            <Icons
              family="MaterialCommunityIcons"
              name={
                selectedDocument === "ID" ? "radiobox-marked" : "radiobox-blank"
              }
              size={28}
              color={
                selectedDocument === "ID" ? COLORS.btnColor : COLORS.white3
              }
            />
            <View style={styles.documentIconContainer}>
              <Image source={PNGIcons.idCard} style={styles.documentIcon} />
            </View>

            {/* Document Label */}
            <View style={styles.labelContainer}>
              <CustomText
                label="ID Card"
                fontSize={18}
                lineHeight={18 * 1.4}
                fontFamily={fonts.medium}
              />
            </View>
          </View>
          <Icons
            family={"Ionicons"}
            name={"chevron-forward"}
            color={COLORS.white3}
            size={20}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleCard,
            { borderTopRightRadius: 0, borderTopLeftRadius: 0 },
          ]}
          activeOpacity={0.8}
          onPress={() => handleDocumentSelect("Passport")}
        >
          <View style={styles.toggleCardContent}>
            <Icons
              family="MaterialCommunityIcons"
              name={
                selectedDocument === "Passport"
                  ? "radiobox-marked"
                  : "radiobox-blank"
              }
              size={28}
              color={
                selectedDocument === "Passport"
                  ? COLORS.btnColor
                  : COLORS.white3
              }
            />
            <View style={styles.documentIconContainer}>
              <Image source={PNGIcons.idCard} style={styles.documentIcon} />
            </View>

            <View style={styles.labelContainer}>
              <CustomText
                label="Passport"
                fontSize={16}
                lineHeight={16 * 1.4}
                fontFamily={fonts.medium}
              />
            </View>
          </View>
          <Icons
            family={"Ionicons"}
            name={"chevron-forward"}
            color={COLORS.white3}
            size={20}
          />
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
    </ScreenWrapper>
  );
};

export default VerifyIdentity;

const styles = StyleSheet.create({
  toggleCardsContainer: {
    // gap: 8,
  },
  toggleCard: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  toggleCardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  documentIconContainer: {
    marginRight: 8,
  },
  documentIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginLeft: 8,
  },
  labelContainer: {
    flex: 1,
  },
  actionButtonsContainer: {
    padding: 12,
  },
});

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BlurView } from "@react-native-community/blur";

import ErrorComponent from "../../../components/ErrorComponent";
import NumberPicker from "../../../components/NumberPicker";
import CustomButton from "../../../components/CustomButton";
import CustomModal from "../../../components/CustomModal";
import CustomText from "../../../components/CustomText";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const SelectLuggageModal = ({
  isVisible,
  selectedLuggageCount,
  setSelectedLuggageCount,
  handleNavigate,
  selectedVehicle,
}) => {
  const luggagePrice = selectedVehicle?.GeneralPricing?.Luggage?.price || 0;
  const totalAdditionalFees = selectedLuggageCount * luggagePrice;
  console.log(totalAdditionalFees);
  return (
    <CustomModal isBlur blurAmount={0.1} isChange isVisible={isVisible}>
      <View
        style={{
          padding: 5,
          width: "95%",
          alignSelf: "center",
          borderRadius: 24,
          marginBottom: 12,
          maxHeight: "100%",
          borderWidth: 1,
          backgroundColor: "#FFFFFF29",
          borderColor: "rgba(255, 255, 255, 0.16)",
        }}
      >
        <BlurView
          style={{
            maxHeight: "100%",
            width: "100%",
            borderRadius: 24,
          }}
          blurType="light"
          blurAmount={26}
          reducedTransparencyFallbackColor="#FFFFFF29"
        />

        <View style={styles.mainContainer}>
          <CustomText
            label="Do you require additional luggage capacity?"
            fontFamily={fonts.semiBold}
            fontSize={24}
            lineHeight={24 * 1.4}
          />
          <CustomText
            label="You can always decide if you require it later when you are with the Chauffeur."
            color={COLORS.gray1}
            lineHeight={14 * 1.4}
            marginTop={5}
          />
          <TouchableOpacity activeOpacity={1}>
            <NumberPicker
              maxNumber={20}
              onValueChange={setSelectedLuggageCount}
            />
          </TouchableOpacity>
          <View style={styles.info}>
            <ErrorComponent
              infoTop={1}
              errorTitle={`+$${luggagePrice.toFixed(2)} per luggage.`}
            />
          </View>
          <CustomText
            label="Additional fees"
            color="#1212127A"
            fontFamily={fonts.medium}
            alignSelf="center"
            lineHeight={14 * 1.4}
          />
          <CustomText
            label={`+$${totalAdditionalFees.toFixed(2)}`}
            fontFamily={fonts.semiBold}
            fontSize={20}
            lineHeight={20 * 1.4}
            alignSelf="center"
          />
          <CustomButton
            title="Confirm"
            marginTop={18}
            marginBottom={10}
            onPress={handleNavigate}
          />
          <CustomButton
            title="Not required"
            backgroundColor={COLORS.lightGray}
            color={COLORS.black}
            marginBottom={5}
            onPress={() => {
              setSelectedLuggageCount(0);
              handleNavigate();
            }}
          />
        </View>
      </View>
      <CustomText
        color={COLORS.white}
        label={`The easiest and most affordable way to reach your\ndestination.`}
        alignSelf="center"
        textAlign="center"
        fontSize={12}
        lineHeight={12 * 1.7}
        fontFamily={fonts.medium}
        marginBottom={20}
        marginTop={4}
      />
    </CustomModal>
  );
};

export default SelectLuggageModal;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  info: {
    alignSelf: "center",
    backgroundColor: "#1212120A",
    borderRadius: 100,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 16,
    marginTop: -10,
  },
});

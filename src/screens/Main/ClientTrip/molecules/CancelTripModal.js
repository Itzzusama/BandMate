import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import fonts from "../../../../assets/fonts";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import CustomCheckbox from "../../../../components/CustomCheckBox";
import { useState } from "react";

const reasons = [
  "Selected wrong dropoff",
  "Waiting For Too Long",
  "Double Booking",
  "Change In Plans",
  "Wrong Address Shown",
  "The Price Is Not Reasonable",
  "Emergency Situation",
  "Requested Wrong Vehicle",
  "Chauffeur Is Not Responding",
  "Selected Wrong Pickup",
  "Requested by Accident",
  "Denied to Go To Destination",
  "Denied to Go To Pickup",
  "Other",
];

const CancelTripModal = ({ visible, onDisable, loading }) => {
  const [selected, setSelected] = useState("");

  return (
    <CustomModal isVisible={visible} onDisable={onDisable}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.row}>
            <CustomText
              fontSize={24}
              lineHeight={24 * 1.4}
              label={"Select A Reason"}
              fontFamily={fonts.semiBold}
            />
            <TouchableOpacity onPress={onDisable} style={styles.icon}>
              <Icons name={"close"} family={"AntDesign"} />
            </TouchableOpacity>
          </View>
          <CustomText
            lineHeight={14 * 1.4}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
            label={"Tell us why you’re cancelling the order."}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomText
              fontSize={16}
              marginTop={20}
              marginBottom={10}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
              label={"Select An Option"}
            />
            <View style={styles.contentContainer}>
              {reasons?.map((item, i) => (
                <Pressable
                  key={i}
                  style={styles.box}
                  onPress={() => setSelected(item)}
                >
                  <CustomCheckbox
                    value={selected === item}
                    onValueChange={() => setSelected(item)}
                  />
                  <CustomText
                    label={item}
                    fontSize={16}
                    lineHeight={16 * 1.4}
                    fontFamily={fonts.medium}
                  />
                </Pressable>
              ))}
            </View>
            <CustomButton
              fontSize={16}
              marginTop={24}
              title={"Submit"}
              marginBottom={7}
              loading={loading}
              secondText={"This helps us improve the platform."}
            />
            <CustomButton
              title={"Pass"}
              marginBottom={20}
              onPress={onDisable}
              color={COLORS.black}
              backgroundColor={COLORS.lightGray}
            />
          </ScrollView>
        </View>
      </View>
    </CustomModal>
  );
};

export default CancelTripModal;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
    width: "95%",
    alignSelf: "center",
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: "#FFFFFF29",
    borderColor: "rgba(255, 255, 255, 0.16)",
    overflow: "hidden",
    marginVertical: "auto",
    height: "95%",
  },
  container: {
    width: "100%",
    padding: 12,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    height: "100%",
    paddingBottom: 0,
    overflow: "hidden",
  },
  icon: {
    height: 32,
    width: 32,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGray,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  box: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  contentContainer: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    overflow: "hidden",
  },
});

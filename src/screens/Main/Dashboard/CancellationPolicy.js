import { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomSwitch from "../../../components/CustomSwitch";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { useNavigation } from "@react-navigation/native";

const CancellationPolicy = () => {
  const navigation = useNavigation();

  const tabs = [
    {
      id: 1,
      name: "Flexible",
      data: [
        "Customers receive a full refund if they cancel at least 24 hours before check-in.",
        "If the guest cancels less than 24 hours before check-in, the first night is non-refundable, but unused nights are refunded.",
      ],
      info: "Best for: Maximum booking potential, appealing to travelers seeking flexibility.",
    },
    {
      id: 2,
      name: "Flexible or Non-Refundable",
      data: [
        "Customers can choose between the Flexible policy above, or a discounted non-refundable rate.",
        "If the guest opts for non-refundable, no refund is provided for cancellations, but they get a discount when booking.",
      ],
      info: "Best for: Hosts willing to offer flexibility or entice bookings with lower non-refundable rates.",
    },
    {
      id: 3,
      name: "Moderate",
      data: [
        "If a guest cancels within 5 days of check-in, the first night is non-refundable and 50% of the remaining nights are refunded.",
        "Best for: A balance between flexibility and host protection against last-minute cancellations.",
      ],
      info: "Customers receive a full refund if they cancel at least 5 days before check-in.",
    },
    {
      id: 4,
      name: "Moderate or Non-Refundable",
      subname: "Minimal rental period",
      info: "Best for: Hosts seeking fewer last-minute cancellations and more committed bookings.",
    },
  ];

  const [switchStates, setSwitchStates] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
  });

  return (
    <ScreenWrapper
      paddingBottom={20}
      scrollEnabled
      headerUnScrollable={() => <Header title={"My Cancellation Policy"} />}
      // footerUnScrollable={() => (
      //   <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
      //     <CustomButton title={"Confirm"} onPress={() => navigation.goBack()} />
      //     <CustomButton
      //       title={"Later"}
      //       backgroundColor={COLORS.lightGray}
      //       color={COLORS.primaryColor}
      //       marginTop={8}
      //     />
      //   </View>
      // )}
    >
      <CustomText
        label={"Define A Cancellation Policy"}
        fontSize={24}
        lineHeight={24 * 1.4}
        fontFamily={fonts.semiBold}
        marginTop={12}
      />
      <CustomText
        label={
          "Users will be expected to follow this policy when booking from you."
        }
        color={COLORS.gray1}
        lineHeight={14 * 1.4}
      />

      {tabs.map((tab, i) => (
        <View
          key={tab.id}
          style={{
            marginTop: i === 0 ? 26 : 0, // Add top margin only for the first item
          }}
        >
          <View style={styles.row}>
            <View style={{ width: "78%" }}>
              <CustomText
                label={tab?.name}
                fontSize={16}
                lineHeight={16 * 1.4}
                fontFamily={fonts.medium}
              />

              {/* Show subname OR flatlist data */}
              {tab?.subname ? (
                <CustomText
                  label={tab?.subname}
                  lineHeight={12 * 1.4}
                  fontSize={12}
                  color={COLORS.gray1}
                  marginTop={4}
                />
              ) : (
                <FlatList
                  data={tab?.data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.bulletRow}>
                      <CustomText
                        label={"•"}
                        color={COLORS.gray1}
                        lineHeight={14 * 1.4}
                      />
                      <CustomText
                        label={item}
                        fontSize={12}
                        color={COLORS.gray1}
                        marginLeft={4}
                        lineHeight={12 * 1.4}
                      />
                    </View>
                  )}
                />
              )}
            </View>

            <CustomSwitch
              value={switchStates[tab.id]}
              setValue={(val) =>
                setSwitchStates((prev) => ({
                  ...prev,
                  [tab.id]: val,
                }))
              }
            />
          </View>

          <View style={{ width: "80%" }}>
            <ErrorComponent errorTitle={tab.info} />
          </View>

          {i !== tabs.length - 1 && <View style={styles.border} />}
        </View>
      ))}
    </ScreenWrapper>
  );
};

export default CancellationPolicy;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  border: {
    width: "100%",
    height: 1,
    marginVertical: 20,
    backgroundColor: COLORS.lightGray,
  },
});

import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomSwitch from "../../../../components/CustomSwitch";
import CustomText from "../../../../components/CustomText";
import ErrorComponent from "../../../../components/ErrorComponent";
import { COLORS } from "../../../../utils/COLORS";
import CustomInput from "../../../../components/CustomInput";

const ToggleCard = ({
  label = "Gate",
  subTitle = "Define Plug Type",
  switchValue,
  setSwitchValue,
  borderBottomWidth = true,
  borderTopWidth,
  isChange,
  increment,
  unitPrice,
  isMore,
  onTotalsChange,
  showUnitPrice,
  onMorePress
}) => {
  const [count, setCount] = useState(increment);
  const [price, setPrice] = useState(unitPrice);
  const [totalPrice, setTotalPrice] = useState(price);

  // recalc total whenever count OR price changes
  useEffect(() => {
    const safePrice = Number(price) || 0;
    setTotalPrice(count * safePrice);
  }, [count, price]);

  // send back totals
  // useEffect(() => {
  //   if (typeof onTotalsChange === "function") {
  //     const safePrice = Number(price) || 0;
  //     const safeCount = Number(count) || 0;
  //     const total = (switchValue ? safeCount : 0) * safePrice;
  //     onTotalsChange({ count: switchValue ? safeCount : 0, price: total });
  //   }
  // }, [count, price, switchValue]);

  useEffect(() => {
    if (typeof onTotalsChange === "function") {
      const safePrice = Number(price) || 0;
      const safeCount = Number(count) || 0;
      const total = (switchValue ? safeCount : 0) * safePrice;

      onTotalsChange({
        count: switchValue ? safeCount : 0,
        unitPrice: safePrice,
        price: total,
      });
    }
  }, [count, price, switchValue]);

  return (
    <>
      {increment ? (
        <View
          style={{
            paddingVertical: 20,
            borderColor: COLORS.lightGray,
            borderBottomWidth: borderBottomWidth && 1,
          }}
        >
          <CustomText
            label={label}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
          />

          <ErrorComponent
            errorTitle={"Most customers will pay extra for this."}
            marginBottom={4}
          />

          <View style={[styles.row, { marginTop: 4 }]}>
            <CustomSwitch value={switchValue} setValue={setSwitchValue} />

            {switchValue && (
              <>
                {showUnitPrice && (
                  <>
                    <ErrorComponent errorTitle={"Unit Price"} />
                    <CustomInput
                      height={32}
                      width={80}
                      value={`$${String(price)}`}
                      onChangeText={(val) =>
                        setPrice(val.replace(/[^0-9]/g, ""))
                      }
                      borderRadius={10}
                      marginBottom={0.1}
                      keyboardType="numeric"
                    />

                    {/* <View style={{ marginLeft: 10 }}>
                      <ErrorComponent errorTitle={"Total Price"} />
                      <CustomInput
                        height={32}
                        width={80}
                        value={`$${totalPrice}`}
                        onChangeText={(val) =>
                          setPrice(val.replace(/[^0-9]/g, ""))
                        }
                        borderRadius={10}
                        marginBottom={4}
                        editable={false}
                      />
                    </View> */}
                  </>
                )}

                {/* Counter */}
                <View style={styles.incrementContainer}>
                  <TouchableOpacity
                    onPress={() => setCount((prev) => Math.max(1, prev - 1))}
                    style={styles.circleButton}
                  >
                    <CustomText
                      label={"−"}
                      fontSize={24}
                      lineHeight={24 * 1.4}
                    />
                  </TouchableOpacity>

                  <CustomText
                    label={count}
                    fontFamily={fonts.medium}
                    fontSize={16}
                    lineHeight={16 * 1.4}
                  />

                  <TouchableOpacity
                    onPress={() => setCount((prev) => prev + 1)}
                    style={styles.circleButton}
                  >
                    <CustomText
                      fontSize={24}
                      lineHeight={24 * 1.4}
                      label={"+"}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      ) : isChange ? (
        // your unchanged second block...
        <View
          style={{
            paddingVertical: 20,
            borderColor: COLORS.lightGray,
            borderBottomWidth: borderBottomWidth && 1,
          }}
        >
          <View style={styles.row}>
            <CustomText
              label={label}
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={16 * 1.4}
            />
            {isMore && (
              <CustomText
                label={"MORE"}
                fontFamily={fonts.medium}
                lineHeight={14 * 1.4}
                color={COLORS.darkPurple}
                onPress={onMorePress}
              />
            )}
          </View>
          <CustomText
            label={subTitle}
            fontSize={12}
            color={COLORS.gray1}
            lineHeight={12 * 1.4}
            marginTop={2}
          />
          <ErrorComponent
            errorTitle={"Most customers will pay extra for this."}
            marginBottom={8}
          />
          <CustomSwitch value={switchValue} setValue={setSwitchValue} />
        </View>
      ) : (
        // your unchanged default block...
        <View
          style={[
            styles.mainContainer,
            {
              borderBottomWidth: borderBottomWidth && 1,
              borderTopWidth: borderTopWidth && 1,
            },
          ]}
        >
          <CustomText
            label={label}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
          />
          <CustomSwitch value={switchValue} setValue={setSwitchValue} />
        </View>
      )}
    </>
  );
};

export default ToggleCard;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderColor: COLORS.lightGray,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  incrementContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  circleButton: {
    height: 32,
    width: 32,
    borderRadius: 99,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
});

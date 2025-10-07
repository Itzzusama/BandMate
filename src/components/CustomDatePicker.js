import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import DatePicker from "react-native-date-picker";
import { useState, useEffect } from "react";
import moment from "moment";

import ErrorComponent from "./ErrorComponent";
import CustomText from "./CustomText";
import Icons from "./Icons";

import { COLORS } from "../utils/COLORS";
import fonts from "../assets/fonts";
import { PNGIcons } from "../assets/images/icons";
import { Images } from "../assets/images";

const CustomDatePicker = ({
  value,
  setValue,
  error,
  withLabel,
  placeholder = "Date",
  type = "date",
  maxDate,
  backgroundColor,
  defaultError,
  width,
  marginBottom,
  height,
  isIcon = false,
}) => {
  const [isModal, setModal] = useState(false);
  const [showSuccessColor, setShowSuccessColor] = useState(false);
  const [prevError, setPrevError] = useState(error);

  useEffect(() => {
    if (prevError && !error) {
      setShowSuccessColor(true);
      const timer = setTimeout(() => {
        setShowSuccessColor(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
    setPrevError(error);
  }, [error]);
  return (
    <>
      <TouchableOpacity
        onPress={() => setModal(true)}
        style={[
          styles.mainContainer,
          {
            marginBottom: error ? 5 : marginBottom || 0,
            borderColor: error
              ? "#EE1045"
              : showSuccessColor
              ? "#64CD75"
              : COLORS.inputBg,
            paddingHorizontal: 12,
            backgroundColor:
              backgroundColor ||
              (error
                ? "#EE10450A"
                : showSuccessColor
                ? "#64CD750A"
                : COLORS.inputBg),
            borderWidth: error ? 1 : 0,
            width: width || "100%",
            height: height || 48,
            flexDirection: isIcon ? "row" : "column",
            alignItems: isIcon ? "center" : "flex-start",
            justifyContent: isIcon ? "space-between" : "center",
          },
        ]}
      >
        <View style={isIcon ? styles.contentContainer : null}>
          {withLabel && (
            <CustomText
              label={withLabel}
              textTransform="uppercase"
              color={
                error
                  ? "#EE1045"
                  : showSuccessColor
                  ? "#64CD75"
                  : COLORS.subtitle
              }
              fontFamily={fonts.medium}
              fontSize={12}
            />
          )}

          <View style={isIcon ? styles.dateRow : null}>
            {isIcon && (
              <Image
                source={Images.smallCalender}
                style={{ height: 16, width: 16, marginRight: 4 }}
              />
            )}
            <CustomText
              label={
                value
                  ? moment(value).format(
                      type == "date" ? "DD/MM/YYYY" : "h:mm A"
                    )
                  : placeholder
              }
              fontSize={16}
              lineHeight={16 * 1.4}
              color={
                error
                  ? "#EE1045"
                  : showSuccessColor
                  ? "#64CD75"
                  : value
                  ? COLORS.white
                  : "#FFFFFF7A"
              }
            />
          </View>
        </View>

        {isIcon && (
          <TouchableOpacity style={styles.calendarButton}>
            <Image
              source={PNGIcons.dateIcon}
              style={{ height: 32, width: 32 }}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {(error || defaultError) && (
        <ErrorComponent
          error={error}
          isValid={showSuccessColor}
          errorTitle={
            showSuccessColor ? "Valid Date " : error ? error : defaultError
          }
          color={
            error
              ? "#EE1045"
              : showSuccessColor
              ? "#64CD75"
              : "rgba(18, 18, 18, 0.64)"
          }
          color1={error ? "#EE1045" : showSuccessColor ? "#64CD75" : ""}
          secondTitle={showSuccessColor ? "" : "move."}
          marginTop={error ? 0 : 4}
        />
      )}

      {isModal && (
        <DatePicker
          modal
          open={isModal}
          date={value || new Date()}
          onConfirm={(date) => {
            setValue(date);
            setModal(false);
          }}
          onCancel={() => setModal(false)}
          mode={type}
          theme="dark"
          textColor={COLORS.black}
          maximumDate={maxDate || new Date()}
        />
      )}
    </>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    borderRadius: 12,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarButton: {
    width: 32,
    height: 32,
  },
  rightIcon: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 15,
    resizeMode: "contain",
  },
});

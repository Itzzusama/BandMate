import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";

import ErrorComponent from "../../../components/ErrorComponent";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";

import { post } from "../../../services/ApiRequest";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const OtpCode = forwardRef(({ state, currentIndex, setCurrentIndex }, ref) => {
  const [otp, setOtp] = useState(state?.otp || "");
  const [error, setError] = useState("");
  const [showSuccessColor, setShowSuccessColor] = useState(false);
  const [resendLoad, setResendLoad] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);

  const otpRegex = /^[0-9]{6,}$/;

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      timerRef.current = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timer, isTimerActive]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    setTimer(30);
    setIsTimerActive(true);
  };

  const errorCheck = (value) => {
    let newErrors = "";
    setOtp(value);
    if (!value.trim()) {
      newErrors = "Valid verification code.";
    } else if (!otpRegex.test(value.trim())) {
      newErrors = "OTP must be numeric and at least 6 digits";
    } else {
      newErrors = "";
      setShowSuccessColor(true);
      setTimeout(() => {
        setShowSuccessColor(false);
      }, 2000);
    }
    setError(newErrors);
    return newErrors;
  };

  const submit = async () => {
    const err = errorCheck(otp);
    if (err) return;
    setLoading(true);
    try {
      const body = {
        ...(state?.phone && { phone: state?.phone?.trim() }),
        ...(state?.email && { email: state?.email?.trim() }),
        code: otp?.trim(),
      };
      const res = await post(`auth/verify-otp`, body);
      if (res?.data) {
        if (currentIndex < 10) {
          setCurrentIndex(currentIndex + 1);
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const back = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useImperativeHandle(ref, () => ({ submit, back }));

  const onSendAgain = async () => {
    let body = {};
    if (state?.phone) {
      body = {
        phone: {
          number: state?.phone.trim(),
          verifyVia: state?.verifyVia,
        },
      };
    } else {
      body = {
        email: state?.email.trim(),
      };
    }
    try {
      setResendLoad(true);
      const res = await post(`auth/send-otp`, body);
      setResendLoad(false);
      startTimer();
    } catch (error) {
      setResendLoad(false);
    }
  };

  return (
    <View style={{ justifyContent: "space-between", flex: 1 }}>
      <View>
        <CustomText
          label="Please enter the code"
          fontFamily={fonts.semiBold}
          fontSize={24}
          lineHeight={24 * 1.4}
          color={COLORS.black}
          marginTop={32}
        />
        <CustomInput
          value={otp}
          onChangeText={(text) => errorCheck(text)}
          marginTop={6}
          marginBottom={5}
          placeholder="E.g. 123456"
          keyboardType="numeric"
        />
        <ErrorComponent
          errorTitle="Valid verification code."
          isValid={showSuccessColor}
          error={error}
          color={
            error ? "#EE1045" : showSuccessColor ? "#64CD75" : COLORS.subtitle
          }
          marginBottom={4}
        />
        <ErrorComponent hideInfo errorTitle="Verification code was sent to:" />
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            if (currentIndex > 1) {
              setCurrentIndex(currentIndex - 1);
            }
          }}
        >
          <CustomText
            label={state?.email || state?.phone}
            fontFamily={fonts.medium}
            color={COLORS.black}
            lineHeight={14 * 1.4}
            marginRight={8}
          />
          <Icons
            family="MaterialIcons"
            name="edit"
            size={14}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <CustomButton
          title={isTimerActive ? `Send again (${timer}s)` : "Send again"}
          marginTop={40}
          loading={resendLoad}
          width={137}
          fontSize={12}
          height={32}
          rightIconWidth={14}
          rightIconHeight={14}
          backgroundColor={COLORS.lightGray}
          color={COLORS.black}
          rightIcon={isTimerActive ? false : Images.refresh}
          onPress={isTimerActive ? () => {} : onSendAgain}
          indicatorColor={COLORS.black}
          disabled={resendLoad}
        />

        <ErrorComponent
          errorTitle={
            isTimerActive
              ? `You can request a new code in ${timer} seconds.`
              : "You can request a new code now."
          }
          alignSelf="center"
          marginTop={16}
        />
      </View>
    </View>
  );
});

export default OtpCode;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

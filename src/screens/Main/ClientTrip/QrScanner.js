import { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";

import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import { ToastMessage } from "../../../utils/ToastMessage";

const QrScanner = () => {
  const navigation = useNavigation();
  const device = useCameraDevice("back");
  const [hasPermission, setHasPermission] = useState(false);
  const [handledOnce, setHandledOnce] = useState(false);

  useEffect(() => {
    const request = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === "granted");
    };
    request();
  }, []);

  const onCodeScanned = useCallback(
    (codes) => {
      if (handledOnce) return;
      if (codes?.length > 0) {
        setHandledOnce(true);
        const value = codes[0]?.value || "";
        ToastMessage("Qr Success", "success");
        navigation.goBack();
      }
    },
    [handledOnce, navigation]
  );

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13", "code-128"],
    onCodeScanned,
  });

  return (
    <ScreenWrapper
      paddingHorizontal={0}
      headerUnScrollable={() => <Header title={"Scan QR Code"} />}
    >
      {!device || !hasPermission ? (
        <View style={styles.center}>
          <CustomText
            label={"Requesting camera permission..."}
            color={COLORS.subtitle}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1, borderRadius: 12, overflow: "hidden" }}
            device={device}
            isActive={!handledOnce}
            codeScanner={codeScanner}
          />
        </View>
      )}
    </ScreenWrapper>
  );
};

export default QrScanner;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

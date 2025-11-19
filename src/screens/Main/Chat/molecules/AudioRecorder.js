import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  PermissionsAndroid,
} from "react-native";
import {
  createSound,
  useSoundWithStates,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
} from "react-native-nitro-sound";
import { COLORS } from "../../../../utils/COLORS";
import Icons from "../../../../components/Icons";
import { useRef } from "react";

export default function AudioRecorder({ onSend, onCancel }) {
  const [recordingPath, setRecordingPath] = useState("");
  const [duration, setDuration] = useState(0);
  const { state, startRecorder, stopRecorder, mmssss } = useSoundWithStates();
  const soundRef = useRef(createSound());
  const requestMicPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Permission",
            message:
              "This app needs access to your microphone to record voice messages.",
            buttonPositive: "OK",
          }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn("Permission error:", err);
        return false;
      }
    }
    return true; // iOS handles permission automatically
  };

  useEffect(() => {
    const startRecording = async () => {
      const hasPermission = await requestMicPermission();
      if (!hasPermission) {
        Alert.alert("Permission Denied", "Microphone access is required.");
        onCancel?.();
        return;
      }

      try {
        const audioSet = {
          AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
          AudioSourceAndroid: AudioSourceAndroidType.DEFAULT, // ✅ use DEFAULT instead of MIC
          AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
          AVNumberOfChannelsKeyIOS: 2,
          AVFormatIDKeyIOS: "aac",
        };
        const uri = await startRecorder(undefined, audioSet, true);
        setRecordingPath(uri);
      } catch (e) {
        console.error("Recording error:", e);
        Alert.alert("Error", String(e));
        onCancel?.();
      }
    };

    startRecording();

    return () => {
      if (state.isRecording) stopRecorder();
    };
  }, []);
  const stopAndSend = async () => {
    try {
      const path = await stopRecorder();
      const recordedDuration =
        Math.floor((state.recording?.position || 0) / 1000) || 0;
      let fileSize = 0;

      try {
        const response = await fetch(path);
        const blob = await response.blob();
        fileSize = blob.size || 0;
      } catch (err) {
        console.warn("File size fetch error:", err);
      }
      console.log(path);
      onSend?.(path, recordedDuration, fileSize);
    } catch (e) {
      Alert.alert("Stop error", String(e));
    }
  };

  const formatTime = (millis) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.dot} />
          <Text style={styles.timer}>
            {formatTime(state.recording.position || 0)}
          </Text>
        </View>

        <TouchableOpacity onPress={onCancel}>
          <Icons
            name="trash-2"
            family="Feather"
            size={20}
            color={COLORS.white2}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.sendBtn}
        activeOpacity={0.6}
        onPress={stopAndSend}
      >
        <Icons
          name={"arrow-right"}
          family={"Feather"}
          size={18}
          // color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.inputBg,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 30,
    paddingHorizontal: 12,
    height: 48,
    flex: 1,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    marginRight: 8,
  },
  timer: {
    color: COLORS.white,
    fontWeight: "600",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  cancelBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
  sendBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#A19375",
    marginLeft: 15,
  },
});

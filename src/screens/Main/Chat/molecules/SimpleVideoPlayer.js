import React, { useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Video from "react-native-video";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const SimpleVideoPlayer = ({ videoSource, isReply }) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  const togglePlayPause = () => {
    // if at end, seek to start then play
    if (!paused) {
      setPaused(true);
    } else {
      // resume from current position
      setPaused(false);
    }
  };

  const onBuffer = (e) => {
    setIsBuffering(e.isBuffering);
    // console.log("Buffering:", e.isBuffering); // remove for perf
  };

  const onError = (e) => {
    console.log("Video Error:", e);
  };

  const onEnd = () => {
    // when video finishes, pause and seek back to start
    setPaused(true);
    if (videoRef.current) {
      videoRef.current.seek(0);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoSource }}
        style={styles.video}
        resizeMode="cover"
        paused={paused}
        repeat={false}
        onError={onError}
        onBuffer={onBuffer}
        onEnd={onEnd}
        controls={false}
      />

      <TouchableOpacity
        style={styles.overlayButton}
        onPress={togglePlayPause}
        activeOpacity={0.7}
      >
        <Icons name={paused ? "play" : "pause"} size={28} color="#fff" />
      </TouchableOpacity>

      {isBuffering && (
        <View style={styles.bufferingDot}>
          <ActivityIndicator size={"small"} color={COLORS.white3} />
        </View>
      )}
    </View>
  );
};

export default SimpleVideoPlayer;

const styles = StyleSheet.create({
  container: {},
  video: {
    width: "100%",
    height: "100%",
  },
  overlayButton: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
    marginTop: -24,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  bufferingDot: {
    position: "absolute",
    bottom: 8,
    right: 8,
  },
});

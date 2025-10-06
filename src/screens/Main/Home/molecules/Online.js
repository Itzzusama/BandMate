import { StyleSheet, View } from "react-native";
import { useState } from "react";

import CustomBlurComponent from "../../../../components/CustomBlurComponent";
import CustomToggle from "../../../../components/CustomToggle";
import CustomText from "../../../../components/CustomText";

import { COLORS } from "../../../../utils/COLORS";

const Online = () => {
  const [isOnline, setOnline] = useState(true);
  return (
    <CustomBlurComponent
      marginTop={20}
      width="100%"
      height={55}
      backgroundColor="transparent"
      padding={4}
    >
      <View
        style={[
          styles.mainContainer,
          { backgroundColor: isOnline ? "#73c89b" : "#f35c80" },
        ]}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: isOnline ? "#35b06f" : "#ee2545" },
          ]}
        >
          <CustomText
            label={isOnline ? "Online" : "Offline"}
            color={COLORS.white}
            fontSize={16}
          />
          <CustomToggle value={isOnline} setValue={setOnline} />
        </View>
      </View>
    </CustomBlurComponent>
  );
};

export default Online;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderRadius: 100,
    padding: 3,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 12,
  },
});

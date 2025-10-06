import { View } from "react-native";

import { COLORS } from "../utils/COLORS";

const Divider = ({
  color = COLORS.inputBg,
  thickness = 2,
  marginVertical = 12,
  width = "100%",
  marginBottom,
  marginTop,
}) => {
  return (
    <View
      style={{
        backgroundColor: color,
        height: thickness,
        marginVertical,
        width: width,
        marginBottom,
        marginTop,
      }}
    />
  );
};

export default Divider;

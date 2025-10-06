import { StyleSheet, Image, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";
import Divider from "../../../../components/Divider";

const ShareSpot = ({
  height = 64,
  width = "33%",
  array,
  marginBottom,
  label,
  text,
}) => {
  return (
    <>
      <View style={styles.mainContainer}>
        <CustomText
          label={label || "Share This Spot with Friends"}
          fontSize={18}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
          marginBottom={8}
        />
        <View style={styles.row}>
          {array?.map((item, index) => (
            <View style={[styles.card, { height, width, marginBottom }]}>
              <ImageFast
                source={text ? item?.image : item}
                style={{
                  height: 32,
                  width: 32,
                }}
                resizeMode={"contain"}
              />
              {text && (
                <CustomText
                  label={item.text}
                  fontSize={12}
                  fontFamily={fonts.regular}
                  color={COLORS.gray2}
                />
              )}
            </View>
          ))}
        </View>
      </View>
      <Divider thickness={4} marginVertical={16} />
    </>
  );
};

export default ShareSpot;

const styles = StyleSheet.create({
  mainContainer: {
    // padding: 12,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

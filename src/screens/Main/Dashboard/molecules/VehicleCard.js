import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const VehicleCard = ({
  title,
  subHeading,
  cost,
  onPress,
  isChange,
  image,
  color,
  backgroundColor,
  cardBg
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[styles.mainContainer,{backgroundColor:cardBg}]}
    >
      {isChange ? (
        <View style={styles.row}>
          <View
            style={[
              styles.imageContainer1,
              { backgroundColor: backgroundColor || "#f0f0ff" },
            ]}
          >
            <Image
              source={image || PNGIcons.carCheck}
              style={{
                height: 24,
                width: 24,
                tintColor: color ? color : "#4347FF",
              }}
            />
          </View>
          <View style={{ marginLeft: 12, width: "84%" }}>
            {title && (
              <CustomText
                label={title || "I have my own vehicle"}
                fontSize={16}
                fontFamily={fonts.medium}
                lineHeight={16 * 1.4}
              />
            )}
            {subHeading && (
              <CustomText
                label={subHeading || "I have my own vehicle"}
                fontFamily={fonts.medium}
                color={COLORS.gray1}
                lineHeight={14 * 1.4}
              />
            )}
          </View>
        </View>
      ) : (
        <>
          <View style={{ width: "90%" }}>
            <View style={[styles.row, { alignItems: "center" }]}>
              <View style={styles.imageContainer}>
                <ImageFast
                  source={PNGIcons.carCheck}
                  style={{ height: 16, width: 16 }}
                />
              </View>
              <CustomText
                label={title || "I have my own vehicle"}
                marginLeft={12}
                fontSize={16}
                fontFamily={fonts.medium}
              />
            </View>
            <CustomText
              label={subHeading || "I have my own vehicle"}
              fontFamily={fonts.medium}
              color={COLORS.gray1}
              marginTop={6}
            />
            {cost && (
              <CustomText
                label={cost}
                fontFamily={fonts.medium}
                marginTop={-3}
              />
            )}
          </View>
          <ImageFast
            source={PNGIcons.rightIcon}
            style={{ height: 24, width: 24 }}
            resizeMode={"contain"}
          />
        </>
      )}
    </TouchableOpacity>
  );
};

export default VehicleCard;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 8,
    borderColor: COLORS.lightGray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    height: 32,
    width: 32,
    backgroundColor: "#E1DEfD",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  imageContainer1: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  row: {
    flexDirection: "row",
  },
});

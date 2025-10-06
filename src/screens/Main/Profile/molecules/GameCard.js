import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const GameCard = ({ data = [] }) => {
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        data.map((item, i) => {
          const isLast = i === data.length - 1;

          return (
            <View
              key={i}
              style={[
                styles.card,
                {
                  marginBottom: isLast ? 0 : 16,
                },
              ]}
            >
              <ImageFast
                source={Images.game}
                style={styles.icon}
                resizeMode={"cover"}
              />
              <View>
                <CustomText
                  label={item.name}
                  fontSize={14}
                  lineHeight={14 * 1.4}
                  fontFamily={fonts.medium}
                  color={COLORS.primaryColor}
                  textAlign={"center"}
                />
                <CustomText
                  label={item.type}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  fontFamily={fonts.regular}
                  color={"#121212CC"}
                  textAlign={"center"}
                />
              </View>
            </View>
          );
        })
      ) : (
        <CustomText
          label="No games found"
          fontSize={14}
          fontFamily={fonts.regular}
          color={COLORS.gray}
        />
      )}
    </View>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
  },
  card: {
    width: "23%",
    alignItems: "center",
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginBottom: 6,
  },
});

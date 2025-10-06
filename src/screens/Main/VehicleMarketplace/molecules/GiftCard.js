import {
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import { PNGIcons } from "../../../../assets/images/icons";
const GiftCard = ({ onPress, card }) => {
  return (
    <View
      style={{
        backgroundColor: "#0C1C94",
        padding: 12,
        paddingBottom: 24,
      }}
    >
      <View style={styles.row}>
        <CustomText
          label={"Gift Cards"}
          fontSize={18}
          fontFamily={fonts.medium}
          lineHeight={18 * 1.4}
          color={COLORS.white}
        />

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
            color={COLORS.white}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#FFFFFF29",
          padding: 2,
          width: 355,
          borderRadius: 18,
          marginTop: 16,
        }}
      >
        <TouchableOpacity
          key={card?.id}
          style={styles.cardContainer}
          onPress={onPress}
        >
          <ImageBackground
            source={Images.creditCardBg}
            style={{
              height: 240,
              justifyContent: "space-between",
              padding: 12,
            }}
            resizeMode="cover"
          >
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <CustomText
                label="move."
                textTransform={"default"}
                fontFamily={fonts.medium}
                fontSize={20}
                lineHeight={20 * 1.4}
                color={COLORS.white}
                marginBottom={4}
              />
              <CustomText
                label="Changing Lives One Ride At A Time."
                fontFamily={fonts.medium}
                fontSize={10}
                lineHeight={10 * 1.4}
                color={COLORS.white}
                marginBottom={30}
                marginLeft={4}
              />
            </View>

            <View>
              <View style={styles.giftCardAmount}>
                <CustomText
                  label={card?.amount || "$25"}
                  fontFamily={fonts.semiBold}
                  fontSize={32}
                  lineHeight={32 * 1.4}
                  color={COLORS.darkPurple}
                />
                <CustomText
                  label={card?.title || "Gift Card"}
                  fontFamily={fonts.semiBold}
                  fontSize={20}
                  lineHeight={20 * 1.4}
                  marginTop={-6}
                  color={COLORS.darkPurple}
                />
              </View>

              <View style={styles.creditsContainer}>
                <CustomText
                  label="SOLA | CREDITS"
                  fontFamily={fonts.semiBold}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  color={COLORS.white}
                  textAlign="center"
                  paddingHorizontal={12}
                  paddingVertical={4}
                  borderWidth={1}
                  borderColor={COLORS.white}
                  borderRadius={4}
                />
              </View>
            </View>

            <CustomText
              label="Put your Event on the forefront and spotlight with the possibility to increase drastically your revenues."
              fontFamily={fonts.regular}
              fontSize={9}
              lineHeight={9 * 1.4}
              color={"#f8f8f8"}
              marginTop={16}
              textAlign="center"
            />
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GiftCard;

const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 12,
    paddingRight: 0,
  },
  scrollContainer: {
    paddingRight: 16,
  },
  cardContainer: {
    borderRadius: 16,
    overflow: "hidden",
    width: 350,
    marginRight: 12,
  },
  gradient: {
    borderRadius: 16,
  },

  giftCardAmount: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    width: 160,
    marginBottom: 8,
  },
  creditsContainer: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.white,
    width: "40%",
    alignSelf: "center",
    padding: 4,
  },

  seeMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  forwardPurple: {
    height: 20,
    width: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  border: {
    height: 2,
    backgroundColor: COLORS.lightGray,
    marginVertical: 12,
  },
});

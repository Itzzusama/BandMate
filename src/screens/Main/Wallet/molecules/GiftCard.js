import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";

const GiftCard = ({ onPress }) => {
  const giftCards = [
    { id: 1, amount: "$25", title: "Gift Card" },
    { id: 2, amount: "$50", title: "Gift Card" },
    { id: 3, amount: "$100", title: "Gift Card" },
    { id: 4, amount: "$200", title: "Gift Card" },
  ];

  const renderGiftCard = (card) => (
    <TouchableOpacity
      key={card.id}
      style={styles.cardContainer}
      onPress={onPress}
    >
      <ImageBackground
        source={Images.creditCardBg}
        style={{ height: 240, justifyContent: "space-between", padding: 12 }}
        resizeMode="cover"
      >
        <View style={{ flexDirection: "row", alignItems: "baseline" , marginBottom:30}}>
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
            // marginBottom={30}
            marginLeft={4}
          />
        </View>

        <View>
          <View style={styles.giftCardAmount}>
            <CustomText
              label={card.amount}
              fontFamily={fonts.semiBold}
              fontSize={32}
              lineHeight={32 * 1.4}
              color={COLORS.darkPurple}
            />
            <CustomText
              label={card.title}
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
          fontFamily={fonts.medium}
          fontSize={9}
          lineHeight={9 * 1.4}
          color={"#f8f8f8"}
          marginTop={16}
          textAlign="center"
        />
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.section}>
      <CustomText
        label="Gift Cards"
        fontFamily={fonts.semiBold}
        fontSize={20}
        lineHeight={20 * 1.4}
        color={COLORS.primaryColor}
        marginBottom={8}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {giftCards.map(renderGiftCard)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginBottom: 8,
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
    padding:4
  },
  creditsContainer: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.white,
    // width: "38%",
    alignSelf: "center",
    backgroundColor:"#1430FA",
    padding: 4,
    paddingHorizontal:8
  },
});

export default GiftCard;

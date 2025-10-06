import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { PNGIcons } from "../../../assets/images/icons";
import { useNavigation } from "@react-navigation/native";

const Community = () => {
  const navigation = useNavigation();
  const tabs = [
    {
      id: 1,
      name: "Join Us",
      onPress: () => navigation.navigate("PlanScreen"),
    },
    {
      id: 2,
      name: "Share and Win Prize",
    },
    {
      id: 3,
      name: "Rate the App",
      // onPress: () => navigation.navigate("ReferApp"),
    },
    {
      id: 4,
      name: "Referral",
      // onPress: () => navigation.navigate("ReferApp"),
    },
  ];

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header title={"Community"} textColor={COLORS.black} />
      )}
      footerUnScrollable={() => (
        <View style={{ margin: 12 }}>
          <CustomButton
            title={"Confirm"}
            // onPress={}
          />
          <CustomButton
            title={"Cancel"}
            backgroundColor={COLORS.inputBg}
            marginTop={16}
            color={COLORS.black}
            // onPress={}
          />
        </View>
      )}
    >
      <View style={styles.bg}>
        {tabs.map((tab, i) => (
          <View>
            <TouchableOpacity
              onPress={tab?.onPress}
              key={i}
              activeOpacity={0.9}
              style={styles.card}
            >
              <Image
                source={PNGIcons.idCard}
                style={{ height: 32, width: 32 }}
              />

              <View style={styles.textContainer}>
                <CustomText
                  label={tab?.name}
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.medium}
                />
              </View>

              <View style={styles.rightIcon}>
                <Icons
                  name="chevron-right"
                  family="Entypo"
                  size={24}
                  color={COLORS.gray}
                />
              </View>
            </TouchableOpacity>
            {!(i === tabs.length - 1) && (
              <View
                style={{
                  marginHorizontal: -16,
                  borderWidth: 1,
                  borderColor: COLORS.inputBg,
                }}
              />
            )}
          </View>
        ))}
      </View>

      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.bg2,
            {
              marginTop: 20,
            },
          ]}
          onPress={() => navigation.navigate("Donations")}
        >
          <View style={styles.textContainer}>
            <CustomText
              label={"Donate For the Children of The World"}
              fontSize={18}
              fontFamily={fonts.medium}
              color={COLORS.black}
            />
            <CustomText
              label={
                "Entrer vos détails et téléversez vos document (Passeport, pièce d’identité)"
              }
              fontSize={14}
              fontFamily={fonts.medium}
              color={COLORS.gray}
            />
          </View>
          <View style={styles.rightIcon}>
            <Icons
              name="chevron-right"
              family="Entypo"
              size={24}
              color={COLORS.gray}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.bg2,
            {
              marginTop: 12,
            },
          ]}
          onPress={() => navigation.navigate("Donations")}
        >
          <View style={styles.textContainer}>
            <CustomText
              label={"Donate For Climate Change"}
              fontSize={18}
              fontFamily={fonts.medium}
              color={COLORS.black}
            />
            <CustomText
              label={
                "Entrer vos détails et téléversez vos document (Passeport, pièce d’identité)"
              }
              fontSize={14}
              fontFamily={fonts.medium}
              color={COLORS.gray}
            />
          </View>
          <View style={styles.rightIcon}>
            <Icons
              name="chevron-right"
              family="Entypo"
              size={24}
              color={COLORS.gray}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default Community;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.inputBg,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  bg2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: COLORS.inputBg,
    padding: 14,
    borderRadius: 16,
  },
  img: {
    width: 50,
    height: 50,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  icon: {
    backgroundColor: COLORS.low,
    width: 32,
    height: 32,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  rightIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});

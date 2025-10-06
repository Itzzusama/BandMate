import { StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";

const MyProfile = ({ navigation }) => {
  const tabs = [
    {
      id: 1,
      name: "Quick Selections",
      onPress: () => navigation.navigate("QuickSelection"),
    },
    {
      id: 2,
      name: "About Us",
    },
  ];

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header title={"My Profile"} textColor={COLORS.black} />
      )}
    >
      <View style={styles.bg}>
        {tabs.map((tab, i) => (
          <View key={i}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.card}
              onPress={tab?.onPress}
            >
              <View style={styles.icon}>
                <Icons
                  name="id-card-clip"
                  family="FontAwesome6"
                  size={20}
                  color={COLORS.blue}
                />
              </View>

              <View style={styles.textContainer}>
                <CustomText
                  label={tab?.name}
                  fontSize={16}
                  fontFamily={fonts.semiBold}
                  color={COLORS.black}
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
                  marginVertical: 16,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.inputBg,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  img: {
    width: 50,
    height: 50,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    backgroundColor: COLORS.low,
    padding: 8,
    width: 40,
    height: 40,
    borderRadius: 50,
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

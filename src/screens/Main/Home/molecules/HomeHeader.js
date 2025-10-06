import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import CustomBlurComponent from "../../../../components/CustomBlurComponent";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { PNGIcons } from "../../../../assets/images/icons";
import { Images } from "../../../../assets/images";
import fonts from "../../../../assets/fonts";

const HomeHeader = () => {
  const navigation = useNavigation();
  const { userData } = useSelector((state) => state.users);
  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF00"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 1]}
      style={styles.header}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 12,
          paddingTop: 55,
        }}
      >
        <View style={styles.row}>
          <CustomBlurComponent height={48} maxWidth={200}>
            <View style={styles.earning}>
              <ImageFast
                source={Images.buzz}
                style={styles.profile}
                resizeMode="contain"
              />
              <CustomText
                  label={`Hi ${userData?.display_name || "Viktor"}`}
                  fontFamily={fonts.medium}
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  marginLeft={4}
                  marginRight={10}

                />
            </View>
          </CustomBlurComponent>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", }}>
          <CustomBlurComponent height={48} width={48}>
            <ImageFast
              source={PNGIcons.info}
              style={styles.filterIcon}
              resizeMode="contain"
            />
          </CustomBlurComponent>
          <CustomBlurComponent height={48} width={48}>
            <ImageFast
              source={PNGIcons.bell}
              style={styles.filterIcon}
              resizeMode="contain"
              onPress={() => navigation.navigate("Notification")}
            />
          </CustomBlurComponent>
          <CustomBlurComponent height={48} width={48}>
            <ImageFast
              source={PNGIcons.heart}
              style={styles.filterIcon}
              resizeMode="contain"
            />
          </CustomBlurComponent>
        </View>
      </View>
    </LinearGradient>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    height: 118,
    width: "100%",
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  earning: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 4,
  },
  profile: {
    width: 32,
    height: 32,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
});

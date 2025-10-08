import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";

const HomeHeader = ({ onFilterPress, onNotificationPress }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { marginTop: insets.top }]}>
      <ImageFast source={Images.user} style={styles.profileImage} />

      <View style={styles.profileInfo}>
        <CustomText
          label={"Hi Myles 👋"}
          fontSize={17}
          lineHeight={17 * 1.4}
          color={COLORS.white}
        />
        <CustomText
          label={"Hope you had a great day!"}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.white2}
        />
      </View>

      <View style={styles.imageRow}>
        <ImageFast
          removeLoading
          source={PNGIcons.notiBell}
          style={styles.image}
          onPress={onNotificationPress}
        />
        <ImageFast
          removeLoading
          onPress={onFilterPress}
          source={PNGIcons.filterBell}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  image: {
    height: 40,
    width: 40,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});

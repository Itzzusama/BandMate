import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const HomeHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={[styles.row, { justifyContent: "space-between", paddingHorizontal:12, backgroundColor:"#181818"}]}>
      <View style={styles.row}>
        <CustomText label={"Feed"} fontSize={20} fontFamily={fonts.semiBold} />
        <CustomText
          label={"Shorts"}
          fontSize={20}
          fontFamily={fonts.semiBold}
          color={COLORS.gray2}
          marginLeft={12}
        />
      </View>
      <View style={[styles.row, { gap: 4 }]}>
        <ImageFast source={Images.search} style={styles.icon}
          onPress={() => navigation.navigate("SearchScreen")}
         />
        <ImageFast source={Images.bell} style={styles.icon} />
        <ImageFast onPress={()=> navigation.navigate('Chat')} source={Images.save} style={styles.icon} />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 32,
    width: 32,
  },
});

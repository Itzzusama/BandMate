import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import { Images } from "../../../../assets/images";
import ImageFast from "../../../../components/ImageFast";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import Icons from "../../../../components/Icons";
import { PNGIcons } from "../../../../assets/images/icons";

const DashboardProductCard = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.card}>
      <View style={styles.imgBox}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            top: 10,
            paddingHorizontal: 8,
            position: "absolute",
            zIndex: 999,
            width: "100%",
          }}
        >
          <Image source={PNGIcons.p1} style={{ height: 20, width: 20 }} />
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 4,
              backgroundColor: "#fff",
            }}
          >
            <CustomText
              label={"Sponsorisé"}
              fontSize={12}
              lineHeight={12 * 1.4}
              fontFamily={fonts.medium}
            />
          </View>
        </View>

        <ImageFast source={Images.shoes} style={styles.shopImg} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            bottom: 10,
            paddingHorizontal: 8,
            zIndex: 999,
            position: "absolute",
            width: "100%",
          }}
        >
          <Image source={PNGIcons.p2} style={{ height: 32, width: 32 }} />
          <Image source={PNGIcons.p3} style={{ height: 32, width: 32 }} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 5 }}>
        <View style={styles.row}>
          <CustomText
            fontSize={12}
            label={"Nike"}
            lineHeight={12 * 1.4}
            fontFamily={fonts.medium}
          />
          <Icons
            name={"verified"}
            family={"MaterialIcons"}
            color={COLORS.darkPurple}
          />
        </View>
        <CustomText
          fontSize={12}
          lineHeight={12 * 1.4}
          label={"Air Jordan XII"}
          fontFamily={fonts.medium}
        />
        <View style={styles.row}>
          <CustomText
            fontSize={12}
            label={"$120"}
            color={COLORS.green}
            lineHeight={12 * 1.4}
            fontFamily={fonts.medium}
          />
          <CustomText
            fontSize={10}
            label={"$140"}
            lineHeight={10 * 1.4}
            color={COLORS.subtitle}
            textDecorationLine={"line-through"}
          />
          <CustomText
            fontSize={10}
            label={"per person"}
            lineHeight={10 * 1.4}
            color={COLORS.subtitle}
          />
        </View>
        <View style={styles.row}>
          <Icons name={"star"} family={"AntDesign"} size={12} />
          <CustomText
            fontSize={12}
            label={"4.8"}
            lineHeight={12 * 1.4}
            fontFamily={fonts.medium}
          />
          <CustomText
            fontSize={10}
            label={"(128 reviews)"}
            lineHeight={10 * 1.4}
            color={COLORS.subtitle}
          />
        </View>
        <View style={styles.row}>
          <Icons name={"flash"} family={"FontAwesome"} size={12} />
          <CustomText
            fontSize={10}
            label={"Arrives in"}
            lineHeight={10 * 1.4}
            fontFamily={fonts.medium}
          />
          <CustomText
            fontSize={10}
            label={"14 days"}
            lineHeight={10 * 1.4}
            color={COLORS.subtitle}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 2,
            marginTop: 4,
          }}
        >
          <View
            style={{
              backgroundColor: "red",
              height: 10,
              width: 10,
              borderRadius: 99,
            }}
          />
          <View
            style={{
              backgroundColor: "blue",
              height: 10,
              width: 10,
              borderRadius: 99,
            }}
          />
          <View
            style={{
              backgroundColor: "green",
              height: 10,
              width: 10,
              borderRadius: 99,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DashboardProductCard;

const styles = StyleSheet.create({
  imgBox: {
    width: 135,
    height: 135,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    // alignItems: "center",
    borderRadius: 12,
    marginBottom: 5,
  },
  shopImg: {
    width: 110,
    height: 110,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  card: {
    marginRight: 10,
  },
});

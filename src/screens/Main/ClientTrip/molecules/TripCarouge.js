import { FlatList, Pressable, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomBlurComponent from "../../../../components/CustomBlurComponent";

const TripCarouge = () => {
  return (
    <View>
      <CustomText
        fontSize={18}
        marginBottom={10}
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
        label={"What To Do In Carouge"}
      />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3]}
        renderItem={() => (
          <Pressable style={styles.card}>
            <View>
              <View style={styles.imgHeader}>
                <ImageFast style={styles.logo} source={Images.onBo} />
                <CustomBlurComponent
                  width={32}
                  height={32}
                  backgroundColor="transparent"
                  blurAmount={10}
                  onPress={() => ""}
                >
                  <ImageFast
                    resizeMode={"contain"}
                    source={PNGIcons.favourite}
                    style={{ width: 15, height: 15 }}
                  />
                </CustomBlurComponent>
              </View>
              <ImageFast
                resizeMode={"contain"}
                style={styles.cardImg}
                source={Images.carouge}
              />
            </View>
            <CustomText
              fontSize={12}
              marginTop={6}
              label={"Event Name"}
              lineHeight={12 * 1.4}
              fontFamily={fonts.medium}
            />
            <View style={styles.row}>
              <Icons name={"stadium"} family={"MaterialIcons"} />
              <CustomText
                fontSize={10}
                label={"Venue"}
                lineHeight={10 * 1.4}
                fontFamily={fonts.semiBold}
              />
            </View>
            <View style={styles.row}>
              <Icons name={"calendar"} family={"Entypo"} size={13} />
              <CustomText
                fontSize={10}
                lineHeight={10 * 1.4}
                color={COLORS.subtitle}
                fontFamily={fonts.medium}
                label={"Aug 22, 2024 - Aug 24, 2024"}
              />
            </View>
            <View style={[styles.row, { marginTop: 0 }]}>
              <CustomText
                label={"$40"}
                marginTop={5}
                color={COLORS.green1}
                lineHeight={14 * 1.4}
                fontFamily={fonts.medium}
              />
              <View style={styles.line} />
              <View style={styles.row}>
                <ImageFast
                  resizeMode={"contain"}
                  style={styles.icon}
                  source={PNGIcons.ticket}
                />
                <CustomText
                  fontSize={10}
                  lineHeight={10 * 1.4}
                  label={"234 tickets left"}
                  fontFamily={fonts.medium}
                />
              </View>
            </View>
            <View style={styles.row}>
              <ImageFast source={Images.onBo} style={styles.avatar} />
              <CustomText
                fontSize={10}
                label={"Viktor"}
                lineHeight={10 * 1.4}
                fontFamily={fonts.medium}
              />
              <CustomText
                fontSize={10}
                label={"& 3 others"}
                lineHeight={10 * 1.4}
                color={"#121212A3"}
              />
            </View>
            <View style={styles.box}>
              <CustomText
                fontSize={10}
                label={"90% MATCH"}
                lineHeight={10 * 1.4}
                color={COLORS.green1}
                fontFamily={fonts.semiBold}
              />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default TripCarouge;

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
  },
  imgHeader: {
    position: "absolute",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 1,
    paddingHorizontal: 10,
    top: 10,
  },
  cardImg: {
    width: 240,
    height: 135,
    borderRadius: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    marginTop: 5,
  },
  icon: {
    width: 15,
    height: 15,
  },
  box: {
    backgroundColor: "#37B87429",
    borderRadius: 4,
    padding: 4,
    width: 80,
    marginTop: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    backgroundColor: "#12121229",
    width: 2,
    height: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },
  avatar: {
    width: 18,
    height: 18,
    borderRadius: 50,
  },
});

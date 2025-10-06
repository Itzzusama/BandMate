import { StyleSheet, View } from "react-native";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import Icons from "../../../../components/Icons";

import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const TripCharity = ({ give1Percent, plantTrees }) => {
  const data = [
    {
      _id: "1",
      image: Images.charity,
      title: "Give 1% of your trip",
      subTitle: "To Orphan Children in Croatia",
      isSelected: give1Percent,
    },
    {
      _id: "2",
      image: Images.charity1,
      title: "1% goes to planting trees worldwide!",
      subTitle: "With this trip you plan 10 trees",
      isSelected: plantTrees,
    },
  ];
  return (
    <View>
      <View style={[styles.row, { marginBottom: 3 }]}>
        <Icons name={"heart"} size={18} />
        <CustomText
          fontSize={18}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
          label="Make The World A Better Place"
        />
      </View>
      {data?.map((item, i) =>
        item?.isSelected ? (
          <View key={i} style={styles.card}>
            <ImageFast
              source={item?.image}
              resizeMode="cover"
              style={styles.img}
            />
            <View style={[styles.row, { paddingHorizontal: 6 }]}>
              <ImageFast style={styles.icon} source={Images.flag} />
              <View style={[styles.row1, { flex: 1 }]}>
                <View>
                  <CustomText
                    label={item?.title}
                    lineHeight={14 * 1.4}
                    fontFamily={fonts.medium}
                  />
                  <CustomText
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    label={item?.subTitle}
                    color={COLORS.subtitle}
                    fontFamily={fonts.medium}
                  />
                </View>
                <View style={styles.outerCircle}>
                  <View style={styles.circle} />
                </View>
              </View>
            </View>
          </View>
        ) : null
      )}
    </View>
  );
};

export default TripCharity;

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 50,
    marginRight: 4,
  },
  outerCircle: {
    borderWidth: 2,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#1212127A",
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: COLORS.black,
  },
});

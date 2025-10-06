import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomSwitch from "../../../../components/CustomSwitch";
import CustomText from "../../../../components/CustomText";
import Divider from "../../../../components/Divider";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const ItemCard = ({ data }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <>
      {data?.map((Item, i) => {
        const isLast = i === data.length - 1;
        return (
          <TouchableOpacity style={styles.mainContainer} key={i} activeOpacity={0.6} onPress={Item?.onPress}>
            <View
              style={[
                styles.card,
                ,
                { marginTop: i === 0 ? 0 : 16, marginBottom: isLast ? 0 : 16 },
              ]}
            >
              <View style={styles.icon}>
                <ImageFast
                  source={Item?.image}
                  resizeMode={"contain"}
                  style={{ width: 20, height: 20 }}
                />
              </View>

              <View style={styles.textContainer}>
                <CustomText
                  label={Item?.name}
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.medium}
                  color={COLORS.primaryColor}
                />

                {Item?.desc && (
                  <CustomText
                    label={Item?.desc}
                    fontSize={12}
                    color={COLORS.gray1}
                    lineHeight={12 * 1.4}
                  />
                )}
              </View>

              <View style={styles.rightIcon}>
                {Item?.isSwitch ? (
                  <CustomSwitch value={isEnabled} setValue={setIsEnabled} />
                ) : (
                  <Icons
                    name="chevron-right"
                    family="Entypo"
                    size={24}
                    color={COLORS.gray}
                  />
                )}
              </View>
            </View>
            {!isLast && <Divider marginVertical={0.1} />}
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding:12
  },
  icon: {
    backgroundColor: COLORS.low,
    width: 40,
    height: 40,
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

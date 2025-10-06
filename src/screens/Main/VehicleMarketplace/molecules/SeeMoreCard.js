import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const SeeMoreCard = ({
  title,
  isChange,
  items = [],
  selectedId,
  onChange,
  isWork,
  isFourImages,
  images = [
    PNGIcons.nike,
    PNGIcons.nike,
    PNGIcons.nike,
    PNGIcons.nike,
    PNGIcons.nike,
    PNGIcons.nike,
    PNGIcons.nike,
    PNGIcons.nike,
  ],
  isBrand,
}) => {
  return (
    <ImageBackground source={Images.jeep} style={styles.container}>
      <CustomText
        label={title || "What Would Like To See More?"}
        fontFamily={fonts.medium}
        fontSize={32}
        lineHeight={32 * 1.4}
        color={COLORS.white}
        marginBottom={16}
      />

      {!isChange ? (
        <>
          <View style={styles.section}>
            <CustomText
              label={"More original Products"}
              fontSize={16}
              fontFamily={fonts.medium}
            />
            <Icons
              family="MaterialCommunityIcons"
              name="radiobox-blank"
              size={24}
              color={COLORS.gray2}
            />
          </View>
          <View style={styles.section}>
            <CustomText
              label={"More Popular Products"}
              fontSize={16}
              fontFamily={fonts.medium}
            />
            <Icons
              family="MaterialCommunityIcons"
              name="radiobox-blank"
              size={24}
              color={COLORS.gray2}
            />
          </View>
          <View style={styles.section}>
            <CustomText
              label={"Something Else"}
              fontSize={16}
              fontFamily={fonts.medium}
            />
            <Icons
              name={"chevron-right"}
              family={"Feather"}
              size={22}
              color={COLORS.black}
            />
          </View>
        </>
      ) : isBrand ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {images?.map((item, index) => {
            return (
              <View
                style={{
                  height: 84,
                  width: 84,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFFFFF7A",
                  borderTopLeftRadius: index == 0 && 12,
                  borderTopRightRadius: index == 3 && 12,
                  borderBottomLeftRadius: index == 4 && 12,
                  borderBottomRightRadius: index == 7 && 12,
                }}
              >
                <ImageFast source={item} style={{ height: 60, width: 60 }} />
              </View>
            );
          })}
        </View>
      ) :
      
      
      isWork ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {items?.map((item, index) => {
            return (
              <View
                style={{
                  padding: 1,
                  backgroundColor: "#FFFFFF29",
                  width: "32%",
                  height: 156,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                }}
              >
                <View
                  style={{
                    height: 150,
                    width:"96%",
                    padding: 12,
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    backgroundColor: "#fff",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <CustomText
                      label={item?.title}
                      fontSize={12}
                      lineHeight={12 * 1.4}
                      fontFamily={fonts.medium}
                    />
                    <CustomText
                      label={item?.subtitle}
                      fontSize={9}
                      lineHeight={9 * 1.4}
                      color={"#121212CC"}
                    />
                  </View>
                  <View
                    style={{
                      borderRadius: 99,
                      backgroundColor: COLORS.darkPurple,
                      height: 24,
                      width: 24,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CustomText
                      label={item?.tag}
                      color={COLORS.white}
                      fontFamily={fonts.medium}
                      fontSize={12}
                      lineHeight={12 * 1.4}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        items?.map((item) => {
          const isSelected = item?.id === selectedId;
          return (
            <Pressable
              key={item?.id}
              style={[
                [styles.section, { borderRadius: 99, padding: 8, height: 55 }],
              ]}
              onPress={() => onChange && onChange(item)}
            >
              <View style={styles.leftRow}>
                {!!item?.image && (
                  <Image
                    source={item.image}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.texts}>
                  {!!item?.title && (
                    <CustomText
                      label={item.title}
                      fontSize={14}
                      lineHeight={14 * 1.4}
                      fontFamily={fonts.medium}
                    />
                  )}
                  {!!item?.subtitle && (
                    <CustomText
                      label={item.subtitle}
                      fontSize={10}
                      lineHeight={10 * 1.4}
                      color={COLORS.gray1}
                      fontFamily={fonts.medium}
                    />
                  )}
                  {!!item?.tag && (
                    <CustomText
                      label={item.tag}
                      fontFamily={fonts.medium}
                      fontSize={10}
                      lineHeight={10 * 1.4}
                      color="#4347FF"
                    />
                  )}
                </View>
              </View>
            </Pressable>
          );
        })
      )}
    </ImageBackground>
  );
};

export default SeeMoreCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  section: {
    padding: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    marginBottom: 4,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  itemImage: {
    height: 36,
    width: 36,
    marginRight: 4,
  },
});

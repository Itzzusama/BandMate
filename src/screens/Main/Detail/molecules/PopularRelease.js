import { Image, StyleSheet, Text, View } from "react-native";
import Icons from "../../../../components/Icons";
import { PNGIcons } from "../../../../assets/images/icons";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import ConnentAccount from "./ConnentAccount";
import { useDispatch, useSelector } from "react-redux";
import { loginWithSpotify } from "../../../../services/spotifyAuthService";

const PopularRelease = ({ title, data, showDots, name, onSeeAllPress }) => {
  const { accessToken } = useSelector((state) => state?.spotifyAuth);
  const dispatch = useDispatch();
  return (
    <View>
      <View style={{ paddingHorizontal: 12 }}>
        <View style={[styles.row, { marginBottom: 16 }]}>
          <View style={[styles.row, { flex: 1 }]}>
            <Image
              source={
                name == "Spotify" ? PNGIcons.spotify : PNGIcons.soundCloud
              }
              style={styles.icon}
            />
            <CustomText
              label={title}
              fontFamily={fonts.medium}
              color={COLORS.white}
              fontSize={17}
              lineHeight={17 * 1.4}
              marginLeft={12}
            />
          </View>
          <CustomText
            label="Show all"
            color={COLORS.gray3}
            fontSize={12}
            lineHeight={12 * 1.4}
            onPress={onSeeAllPress}
          />
        </View>
        {!accessToken && name == "Spotify" && (
          <ConnentAccount
            bottom={16}
            accName={name}
            onPress={() => dispatch(loginWithSpotify())}
          />
        )}
        {name == "SoundCloud" && <ConnentAccount bottom={16} accName={name} />}
        {data?.map((item, index) => (
          <View style={[styles.row, { marginBottom: 16 }]} key={index}>
            <Image
              source={item?.song?.image ? { uri: item?.song?.image } : item.img}
              style={showDots ? styles.img2 : styles.img1}
            />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <CustomText
                label={item.title || item?.song?.title}
                fontFamily={fonts.medium}
                color={COLORS.white}
                fontSize={17}
                marginRight={12}
                numberOfLines={1}
                // lineHeight={17 * 1.4}
              />
              <CustomText
                label={item.des || item?.song?.artist}
                color={COLORS.gray3}
                fontSize={12}
              />
            </View>
            {showDots && (
              <Icons
                family={"Entypo"}
                name={"dots-three-horizontal"}
                color={COLORS.white}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default PopularRelease;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  img1: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },
  img2: {
    height: 48,
    width: 48,
    resizeMode: "contain",
  },
});

import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Divider from "./Divider";
import CustomText from "../../../../components/CustomText";
import { ArtistImgs } from "../../../../assets/images/artistImgs";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import EditButton from "./EditButton";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const artists = [
  { name: "Arctic Monkeys", img: ArtistImgs.img6 },
  { name: "Blur", img: ArtistImgs.img2 },
  { name: "Beastie Boys", img: ArtistImgs.img3 },
];

const FansOf = ({ myPage, userData }) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <CustomText
            label="Fan of"
            fontFamily={fonts.medium}
            fontSize={17}
            color={COLORS.white}
          />
          {myPage && (
            <EditButton
              onPress={() =>
                navigation.navigate("AuthStack", {
                  screen: "Artists",
                  params: {
                    fromScreen: "Home",
                  },
                })
              }
            />
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {userData?.Artists.map((artist, index) => (
            <TouchableOpacity key={index} activeOpacity={0.8}>
              <View style={styles.card}>
                <Image
                  source={{ uri: artist.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <CustomText
                  label={artist?.artist}
                  fontSize={12}
                  color={COLORS.white}
                  fontFamily={fonts.medium}
                  textAlign="center"
                  marginTop={4}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default FansOf;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  scrollContainer: {
    paddingHorizontal: 12,
  },
  card: {
    alignItems: "center",
    marginRight: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 12,
  },
});

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

const artists = [
  { name: "Arctic Monkeys", img: ArtistImgs.img6 },
  { name: "Blur", img: ArtistImgs.img2 },
  { name: "Beastie Boys", img: ArtistImgs.img3 },
];

const FansOf = () => {
  return (
    <>
      <Divider />

      <View style={styles.container}>
        <CustomText
          label="Fans of"
          fontFamily={fonts.medium}
          fontSize={17}
          color={COLORS.white}
          marginBottom={8}
          marginLeft={8}
          marginTop={-2}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {artists.map((artist, index) => (
            <TouchableOpacity key={index} activeOpacity={0.8}>
              <View style={styles.card}>
                <Image
                  source={artist.img}
                  style={styles.image}
                  resizeMode="cover"
                />
                <CustomText
                  label={artist.name}
                  fontSize={12}
                  color={COLORS.white}
                  fontFamily={fonts.medium}
                  textAlign="center"
                  marginTop={6}
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
    paddingHorizontal: 8,
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
});

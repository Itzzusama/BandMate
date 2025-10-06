import { ImageBackground, StyleSheet, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import CustomButton from "../../../components/CustomButton";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const VCSuccess = ({ navigation }) => {
  return (
    <ScreenWrapper
      backgroundImage={Images.vcBg}
      translucent
      headerUnScrollable={() => <Header title={"New Virtual Card"} />}
      footerUnScrollable={() => (
        <View style={{ padding: 16, paddingBottom: 75 }}>
          <CustomButton
            title={"Create Card"}
            onPress={() => navigation?.goBack?.()}
          />
        </View>
      )}
    >
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 18 }}
      >
        <ImageBackground
          source={Images.cardCover}
          style={{
            width: "100%",
            height: 200,
            marginTop: 20,
            marginBottom: 20,
          }}
          imageStyle={{ borderRadius: 16 }}
        >
          <View style={styles.item}>
            <View>
              <CustomText
                label={"Personal"}
                fontFamily={fonts.medium}
                fontSize={32}
                lineHeight={32 * 1.4}
                color={COLORS.white}
              />
              <CustomText
                label={"Firstname Surname"}
                fontSize={16}
                lineHeight={16 * 1.4}
                color={COLORS.white}
              />
            </View>
            <View>
              <CustomText
                label={"Card Number"}
                fontFamily={fonts.regular}
                lineHeight={16 * 1.4}
                fontSize={16}
                color={COLORS.white}
              />
              <CustomText
                label={"Expiry Date"}
                fontFamily={fonts.regular}
                fontSize={16}
                lineHeight={16 * 1.4}
                color={COLORS.white}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScreenWrapper>
  );
};

export default VCSuccess;

const styles = StyleSheet.create({
  item: {
    padding: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 200,
  },
});

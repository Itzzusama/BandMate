import {
  StyleSheet,
  Image,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import { Images } from "../../../../assets/images";
import CustomButton from "../../../../components/CustomButton";
import fonts from "../../../../assets/fonts";
import ImageFast from "../../../../components/ImageFast";
import VotingComponent from "./VotingComponent";

const PostCard = ({ isChange, isVideo, onCommentPress }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.rowBetween}>
        {/* Left Section */}
        <View style={styles.row}>
          <View style={styles.avatar} />
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <CustomText label={"Display Name"} />
              <Image source={Images.verified} style={styles.verifiedIcon} />
              <Image source={Images.grayStar} style={styles.verifiedIcon} />
            </View>
            <CustomText label={"username"} color={COLORS.gray2} />
          </View>
        </View>

        {/* Right Section */}
        <View style={[styles.row, styles.rightSection]}>
          <CustomButton
            title={"Follow"}
            width="64%"
            height={32}
            borderRadius={8}
            fontSize={14}
            backgroundColor={COLORS.inputBg}
            color={COLORS.white}
          />
          <Image source={Images.moreIcon} style={styles.moreIcon} />
        </View>
      </View>

      <View style={[styles.row, { gap: 4, marginTop: 4 }]}>
        <Image source={Images.arrowNext} style={{ height: 20, width: 20 }} />
        <CustomText
          label={"Reposted from"}
          color={COLORS.gray2}
          fontSize={12}
        />
        <View style={styles.row}>
          <Image source={Images.hi} style={{ height: 16, width: 16 }} />
          <CustomText
            label={"ClubHouse"}
            fontFamily={fonts.medium}
            marginLeft={4}
          />
        </View>
      </View>

      {isChange ? (
        <>
          <CustomText
            label={"Who was the most influential individual in 2025?"}
            marginTop={8}
            color={COLORS.gray2}
            marginBottom={10}
          />
          <VotingComponent />
        </>
      ) : (
        <>
          <CustomText marginTop={8} color={COLORS.subtitle} marginBottom={6}>
            <Text style={{ color: COLORS.white }}>Google</Text>
            <Text>
              {" "}
              Fonts makes it easy to bring personality and performance to your
              websites and products. Our robust catalog of open-source fonts and
              icons makes it easy to integrate expressive type and icons
              seamlessly — no matter where you are in the world.
            </Text>
          </CustomText>
          <CustomText
            color={COLORS.buttonColor}
            label={"Read full post..."}
            fontFamily={fonts.medium}
            marginBottom={10}
          />
          <View>
            <ImageFast
              source={Images.person}
              style={{
                height: isVideo ? 200 : 440,
                width: "100%",
                borderRadius: 16,
              }}
            />
            {isVideo && (
              <View style={styles.cardBg}>
                <CustomText
                  label={`#${"Crypto"}`}
                  fontSize={12}
                  color={COLORS.gray2}
                  fontFamily={fonts.medium}
                />
              </View>
            )}

            <View
              style={[
                styles.rowBetween,
                {
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 8,
                },
              ]}
            >
              <Image
                source={isVideo ? Images.mute : Images.friendBg}
                style={{ height: 32, width: 32 }}
                resizeMode="contain"
              />

              {isVideo && (
                <View
                  style={[
                    styles.row,
                    {
                      gap: 4,
                      paddingLeft: 8,
                      paddingRight: 10,
                      paddingVertical: 6,
                      borderRadius: 99,
                      backgroundColor: "rgba(18, 18, 18, 0.8)",
                    },
                  ]}
                >
                  <Image
                    source={Images.subTitle}
                    style={{ height: 12, width: 12 }}
                  />
                  <CustomText
                    label={"These are auto-generated subtitles"}
                    fontSize={12}
                    fontFamily={fonts.medium}
                  />
                </View>
              )}
              {isVideo ? (
                <View
                  style={{
                    paddingHorizontal: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    borderRadius: 99,
                    paddingVertical: 6,
                  }}
                >
                  <CustomText
                    label={"0:57"}
                    fontFamily={fonts.medium}
                    fontSize={12}
                  />
                </View>
              ) : (
                <Image
                  source={Images.repostBg}
                  style={{ height: 32, width: 32 }}
                />
              )}
            </View>
          </View>
          <View style={styles.rowSwipper}>
            {[1, 2, 3, 4].map((item, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === 0
                    ? styles.activeIndicator
                    : styles.inactiveIndicator,
                  index === 0 && styles.activeWidth,
                ]}
              />
            ))}
          </View>
        </>
      )}

      <View style={[styles.rowButtons, { marginTop: isChange ? 8 : 0 }]}>
        <View style={[styles.rowbtn]}>
          <Image source={Images.arrowUp} style={{ height: 20, width: 20 }} />
          <CustomText label={"1.4k"} fontFamily={fonts.medium} fontSize={12} />
        </View>
        <View style={[styles.rowbtn]}>
          <CustomText label={"1.4k"} fontFamily={fonts.medium} fontSize={12} />
          <Image source={Images.arrowDown} style={{ height: 20, width: 20 }} />
        </View>
        <TouchableOpacity
          onPress={onCommentPress}
          style={styles.rowbtn}
        >
          <Image source={Images.chat} style={{ height: 16, width: 16 }} />
          <CustomText label={"1.5M"} fontFamily={fonts.medium} fontSize={12} />
        </TouchableOpacity>
        <View style={styles.rowbtn}>
          <Image
            source={Images.arrowUpRight}
            style={{ height: 16, width: 16 }}
          />
          <CustomText label={"1.5M"} fontFamily={fonts.medium} fontSize={12} />
        </View>
        <View style={styles.rowbtn}>
          <Image source={Images.repost} style={{ height: 16, width: 16 }} />
          <CustomText label={"1.5M"} fontFamily={fonts.medium} fontSize={12} />
        </View>
        <View style={styles.rowbtn}>
          <Image source={Images.savePlus} style={{ height: 16, width: 16 }} />
          <CustomText label={"1.5M"} fontFamily={fonts.medium} fontSize={12} />
        </View>
      </View>
      <View style={[styles.row, { gap: 4, marginTop: 4 }]}>
        <Image source={Images.webFlow} style={{ height: 16, width: 16 }} />
        <CustomText label={"Webflow & 2 friends"} fontFamily={fonts.medium} />
        <CustomText
          label={"reacted to this post"}
          fontFamily={fonts.regular}
          color={COLORS.gray2}
        />
      </View>
      <View
        style={[styles.row, { justifyContent: "space-between", marginTop: 6 }]}
      >
        <View style={[styles.row, { gap: 4 }]}>
          <CustomText label={"User"} fontFamily={fonts.medium} />
          <View
            style={{
              height: 4,
              width: 4,
              borderRadius: 99,
              backgroundColor: "rgba(255, 255, 255, 0.16)",
            }}
          />
          <CustomText
            label={"With the most liked comment"}
            fontFamily={fonts.regular}
          />
        </View>
        <ImageFast
          source={Images.heart}
          tintColor={"rgba(255, 255, 255, 0.64)"}
          style={{
            height: 16,
            width: 16,
            tintColor: "rgba(255, 255, 255, 0.64)",
          }}
        />
      </View>
      <CustomText
        label={"View all 919 comments"}
        color={COLORS.gray2}
        fontFamily={fonts.regular}
        marginBottom={4}
        marginTop={6}
      />
      <CustomText
        label={"9 hours ago"}
        color={COLORS.gray2}
        fontSize={12}
        fontFamily={fonts.regular}
      />
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: COLORS.black,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowbtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#FFFFFF0A",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
  rowBetween: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 99,
    backgroundColor: COLORS.inputBg,
  },
  userInfo: {
    marginLeft: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedIcon: {
    height: 14,
    width: 14,
    marginLeft: 4,
  },
  moreIcon: {
    height: 32,
    width: 32,
    marginLeft: 8,
  },
  rightSection: {
    width: "28%",
  },
  wrapper: {
    gap: 4,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  cardBg: {
    backgroundColor: "rgba(18, 18, 18, 0.44)",
    paddingLeft: 6,
    paddingRight: 7.5,
    paddingVertical: 5,
    borderRadius: 99,
    position: "absolute",
    top: 8,
    left: 8,
  },
  rowSwipper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 8,
    alignSelf: "center",
  },
  rowButtons: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    gap: 6,
    paddingVertical: 4,
  },
  indicator: {
    height: 6,
    borderRadius: 99,
  },
  activeWidth: {
    width: 30,
  },
  activeIndicator: {
    width: 30,
    backgroundColor: COLORS.buttonColor,
  },
  inactiveIndicator: {
    width: 6,
    backgroundColor: "#A1937529",
  },
});
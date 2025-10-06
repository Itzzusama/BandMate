import { useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";

import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";

import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";
import Icons from "../../../components/Icons";
import { COLORS } from "../../../utils/COLORS";

const TripReview = () => {
  const mapRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [selected, setSelected] = useState(0);
  const [overallRating, setOverallRating] = useState(null); // true for thumbs up, false for thumbs down
  const [additionalRemarks, setAdditionalRemarks] = useState(
    "The Chauffeur was very friendly and drove elegantly."
  );
  const [selectedTipAmount, setSelectedTipAmount] = useState(null);
  const [customTipAmount, setCustomTipAmount] = useState("");

  const [data, setData] = useState([
    {
      name: "Politeness",
      image: PNGIcons.review1,
      likeStatus: null,
    },
    {
      name: "Cleanliness",
      image: PNGIcons.review2,
      likeStatus: null,
    },
    {
      name: "Professionalism",
      image: PNGIcons.review3,
      likeStatus: null,
    },
    {
      name: "Recommended",
      image: PNGIcons.review4,
      likeStatus: null,
    },
    {
      name: "Pricing",
      image: PNGIcons.review5,
      likeStatus: null,
    },
  ]);

  const tipAmounts = [5, 10, 15, 25, 50, 75, 100, 200];

  const initialRegion = useMemo(
    () => ({
      latitude: 32.1475636,
      longitude: 74.19141239999999,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    }),
    []
  );

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    // Handle final confirmation
    console.log("Review submitted:", {
      step: currentStep,
      overallRating,
      selectedCategories: data.filter((item) => item.likeStatus !== null),
      additionalRemarks,
      tipAmount: selectedTipAmount || customTipAmount,
    });
  };

  const getTotalTipAmount = () => {
    const baseAmount = 24.25;
    const tipAmount = selectedTipAmount || parseFloat(customTipAmount) || 0;
    return baseAmount + tipAmount;
  };

  // Step 1: Review Experience
  const renderStep1 = () => (
    <ScrollView
      style={styles.stepContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.stepContentContainer}
    >
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <ImageFast
          source={Images.user}
          style={{ height: 80, width: 80, borderRadius: 99 }}
        />
        <Image
          source={PNGIcons.car1}
          style={{
            height: 40,
            width: 80,
            resizeMode: "contain",
            position: "absolute",
            bottom: -10,
            right: 120,
          }}
        />
      </View>

      <CustomText
        fontSize={24}
        textAlign={"center"}
        lineHeight={24 * 1.4}
        fontFamily={fonts.semiBold}
        label="How was your experience?"
      />
      <CustomText
        marginTop={5}
        textAlign={"center"}
        lineHeight={14 * 1.4}
        color={COLORS.subtitle}
        label="What did you like about Sadia?"
      />
      <View style={styles.box}>
        <Icons size={12} name={"info"} family={"Feather"} color={"#1212127A"} />
        <CustomText
          label={"#T1313113"}
          lineHeight={14 * 1.4}
          textTransform={"none"}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          gap: 16,
        }}
      >
        <TouchableOpacity
          style={[
            styles.likeCircle,
            overallRating === true && styles.selectedLike,
          ]}
          onPress={() => setOverallRating(true)}
        >
          <Icons
            name={"thumbs-up"}
            family={"Entypo"}
            size={30}
            color={overallRating === true ? COLORS.white : COLORS.black}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.likeCircle,
            overallRating === false && styles.selectedDislike,
          ]}
          onPress={() => setOverallRating(false)}
        >
          <Icons
            name={"thumbs-down"}
            family={"Entypo"}
            size={30}
            color={overallRating === false ? COLORS.white : COLORS.black}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => setSelected(index)}
            >
              <ImageFast
                style={styles.img}
                source={item.image}
                resizeMode={"contain"}
              />
              <CustomText
                marginTop={5}
                label={item?.name}
                lineHeight={14 * 1.4}
                fontFamily={selected === index ? fonts.medium : fonts.regular}
                color={selected === index ? COLORS.black : COLORS.subtitle}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );

  // Step 2: Additional Remarks
  const renderStep2 = () => (
    <ScrollView
      style={styles.stepContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.stepContentContainer}
    >
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <ImageFast
          source={Images.user}
          style={{ height: 80, width: 80, borderRadius: 99 }}
        />
      </View>

      <CustomText
        fontSize={24}
        textAlign={"center"}
        lineHeight={24 * 1.4}
        fontFamily={fonts.semiBold}
        label="How was your experience?"
      />
      <CustomText
        marginTop={5}
        textAlign={"center"}
        lineHeight={14 * 1.4}
        color={COLORS.subtitle}
        label="What did you like about Sadia?"
      />
      <View style={styles.box}>
        <Icons size={12} name={"info"} family={"Feather"} color={"#1212127A"} />
        <CustomText
          label={"#T1313113"}
          lineHeight={14 * 1.4}
          textTransform={"none"}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
        />
      </View>

      <View style={styles.remarksSection}>
        <CustomText
          label="Additional Remarks"
          fontSize={18}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
          marginBottom={12}
        />
        <CustomInput
          placeholder="Share your experience..."
          value={additionalRemarks}
          onChangeText={setAdditionalRemarks}
          multiline
          maxLength={500}
          withLabel={`${additionalRemarks.length}/500 character`}
          height={120}
          textAlignVertical="top"
        />
      </View>
    </ScrollView>
  );

  // Step 3: Tipping
  const renderStep3 = () => (
    <ScrollView
      style={styles.stepContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.stepContentContainer}
    >
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <ImageFast
          source={Images.user}
          style={{ height: 80, width: 80, borderRadius: 99 }}
        />
      </View>

      <CustomText
        fontSize={24}
        textAlign={"center"}
        lineHeight={24 * 1.4}
        fontFamily={fonts.semiBold}
        label="Would You Like To Tip Sadia?"
      />
      <CustomText
        marginTop={5}
        textAlign={"center"}
        lineHeight={14 * 1.4}
        color={COLORS.subtitle}
        label="A good way to thank and motivate professionals for keep providing excellent services."
      />
      <View style={styles.box}>
        <Icons size={12} name={"info"} family={"Feather"} color={"#1212127A"} />
        <CustomText
          label={"#T1313113"}
          lineHeight={14 * 1.4}
          textTransform={"none"}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
        />
      </View>

      <View style={styles.tipSection}>
        <View style={styles.tipGrid}>
          {tipAmounts.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[
                styles.tipButton,
                selectedTipAmount === amount && styles.selectedTipButton,
              ]}
              onPress={() => setSelectedTipAmount(amount)}
            >
              <CustomText
                label="Tip"
                fontSize={12}
                lineHeight={12*1.4}

                color={
                  selectedTipAmount === amount ? COLORS.white : COLORS.subtitle
                }
                fontFamily={fonts.medium}
              />
              <CustomText
                label={`$${amount}`}
                fontSize={24}
                lineHeight={24*1.4}
                color={
                  selectedTipAmount === amount ? COLORS.white : COLORS.black
                }
                fontFamily={fonts.semiBold}
              />
            </TouchableOpacity>
          ))}
        </View>

        {selectedTipAmount && (
          <View style={styles.thankYouSection}>
            <CustomText
              label="Thank You For Your Tipping!"
              fontSize={24}
              lineHeight={24 * 1.4}
              fontFamily={fonts.semiBold}
              textAlign="center"
            />
            <CustomText
              label={`Your total stands at $${getTotalTipAmount().toFixed(2)}`}
              fontSize={16}
              lineHeight={16 * 1.4}
              color={"#000000A3"}
              textAlign="center"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  const getButtonTitle = () => {
    switch (currentStep) {
      case 1:
        return "Confirm";
      case 2:
        return "Confirm";
      case 3:
        return "Confirm";
      default:
        return "Confirm";
    }
  };

  const handleButtonPress = () => {
    if (currentStep < 3) {
      handleNext();
    } else {
      handleConfirm();
    }
  };

  return (
    <ScreenWrapper
      translucent
      paddingHorizontal={0.1}
      footerUnScrollable={() => (
        <View style={{ paddingHorizontal: 12, paddingBottom: 10 }}>
          <AuthFooter
            btnSize={16}
            btnTitle={getButtonTitle()}
            isMain
            title="The easiest and most affordable way to reach your destination."
            titleSize={10}
            onPress={handleButtonPress}
            onBackPress={handleBack}
          />
        </View>
      )}
    >
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        region={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
      />
      <View style={styles.overlay} />
      <TouchableOpacity style={styles.crossBtn}>
        <Image source={PNGIcons.cross} style={styles.cross} />
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <View style={styles.greeBanner}>
          <View style={styles.row}>
            <ImageFast
              source={Images.WhiteDiscount}
              style={{ width: 14, height: 14 }}
            />
            <CustomText
              color={COLORS.white}
              lineHeight={14 * 1.4}
              fontFamily={fonts.medium}
              label="Save by using move+"
            />
          </View>
        </View>

        <View style={styles.contentWrapper}>{renderCurrentStep()}</View>
      </View>
    </ScreenWrapper>
  );
};

export default TripReview;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    flex: 1,
  },
  map: {
    width: "100%",
    height: "30%",
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  greeBanner: {
    backgroundColor: COLORS.green1,
    width: "100%",
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 7,
  },
  detailsContainer: {
    paddingHorizontal: 12,
    paddingTop: 9,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 12,
  },
  stepContainer: {
    flex: 1,
  },
  stepContentContainer: {
    paddingBottom: 20,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  flatListContent: {
    paddingHorizontal: 5,
  },

  cross: {
    width: 25,
    height: 25,
  },
  crossBtn: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    zIndex: 2,
    top: "22%",
    backgroundColor: COLORS.white,
    borderRadius: 100,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#121212A3",
  },
  box: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 100,
    justifyContent: "center",
    columnGap: 5,
    height: 20,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    alignSelf: "center",
    paddingHorizontal: 8,
    marginTop: 15,
  },
  img: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  likeCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
  },
  selectedLike: {
    backgroundColor: COLORS.green1,
  },
  selectedDislike: {
    backgroundColor: COLORS.red,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  footerContainer: {},
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  remarksSection: {
    marginTop: 20,
  },
  tipSection: {
    marginTop: 40,
  },
  tipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  tipButton: {
    width: "23%",
    height: 80,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  selectedTipButton: {
    backgroundColor: COLORS.black,
  },
  thankYouSection: {
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
  },
});

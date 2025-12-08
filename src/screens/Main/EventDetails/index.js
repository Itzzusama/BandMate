import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";

import { COLORS } from "../../../utils/COLORS";
import ImageFast from "../../../components/ImageFast";
import { EventImages } from "../../../assets/images/eventImages";
import { Images } from "../../../assets/images";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import Divider from "../../../components/Divider";
import EventName from "./molecules/EventName";
import Tabs from "./molecules/Tabs";
import RatingOverview from "./molecules/RatingOverview";
import EventDates from "./molecules/EventDates";
import AboutEvent from "./molecules/AboutEvent";
import WhatToExpect from "./molecules/WhatToExpect";
import EventLocation from "./molecules/EventLocation";
import PassCard from "./molecules/PassCard";
import TicketsHeading from "./molecules/TicketsHeading";
import AllTickets from "./molecules/AllTickets";
import PaymentCard from "./molecules/PaymentCard";
import CustomerReviewCard from "./molecules/CustomerReviewCard";
const HEADER_MAX_HEIGHT = 380;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export const passCardsData = [
  {
    id: 1,
    title: "5-Day Adult Pass",
    pricePerPerson: 12,
    subtitle: "All 5 days included",
    includes: "Jan 4, 2025, Jan 5, 2025",
    price: 4,
    unitPrice: 2,
    quantity: 2,
  },

  {
    id: 2,
    title: "Weekend Pass (Jan 4–5)",
    pricePerPerson: 12,
    subtitle: "Saturday & Sunday",
    includes: "Jan 1, 2025, Jan 2, 2025, Jan 3, 2025, Jan 4, 2025, Jan 5, 2025",
    price: 4,
    unitPrice: 2,
    quantity: 0,
  },

  {
    id: 3,
    title: "5-Day Child Pass",
    pricePerPerson: 12,
    otherInfo: "All 5 days included",
    note: "Valid Student ID is required",
    price: 2,
    oldPrice: 2,
    isDiscounted: true,
    showTrash: true,
    quantity: 1,
  },

  {
    id: 4,
    title: "Adults Group Pack",
    pricePerPerson: 12,
    otherInfo: "Grant you access to all the park",
    isSoldOut: true,
  },
];

const EventDetail = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = scrollY.interpolate({
    inputRange: [-HEADER_MAX_HEIGHT, 0, HEADER_SCROLL_DISTANCE],
    outputRange: [-HEADER_MAX_HEIGHT / 2, 0, -HEADER_SCROLL_DISTANCE * 0.7],
    extrapolateRight: "clamp",
  });
  const headerScale = scrollY.interpolate({
    inputRange: [-150, 0],
    outputRange: [1.2, 1],
    extrapolateRight: "clamp",
  });

  const layerSlowTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 2],
    outputRange: [0, -40],
    extrapolate: "clamp",
  });

  const layerFastTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 2],
    outputRange: [0, -80],
    extrapolate: "clamp",
  });

  const headerBgOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 0.5, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.4, 1],
    extrapolate: "clamp",
  });
  return (
    <View style={[styles.container, { backgroundColor: COLORS.black }]}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          styles.parallaxCardContainer,
          {
            transform: [
              { translateY: headerTranslateY },
              { scale: headerScale },
            ],
          },
        ]}
      >
        <ImageFast
          source={EventImages.eventImg}
          style={styles.detailImg}
          resizeMode={"stretch"}
        ></ImageFast>
        <Divider
          thickness={4}
          color={COLORS.inputBg}
          marginTop={0}
          marginBottom={0}
        />
      </Animated.View>
      <Animated.ScrollView
        style={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
      >
        <View
          style={[
            styles.contentArea,
            {
              marginTop: HEADER_MAX_HEIGHT,
              backgroundColor: COLORS.black,
            },
          ]}
        >
          <Animated.View
            style={{
              transform: [{ translateY: layerFastTranslateY }],
            }}
          >
            <EventName />
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={0}
              marginBottom={0}
            />
            <Tabs />
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={0}
              marginBottom={0}
            />
            <RatingOverview />
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={0}
              marginBottom={0}
            />
            <EventDates />
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={0}
              marginBottom={0}
            />
            <AboutEvent />
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={0}
              marginBottom={0}
            />
            <WhatToExpect />
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={0}
              marginBottom={0}
            />
            <EventLocation />
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={0}
              marginBottom={0}
            />
            <TicketsHeading
              title={"All Passes"}
              subTitle={"Choose specific dates and ticket combinations"}
            />
            {passCardsData.map((item) => (
              <PassCard
                key={item.id}
                title={item.title}
                pricePerPerson={item.pricePerPerson}
                subtitle={item.subtitle}
                includes={item.includes}
                otherInfo={item.otherInfo}
                note={item.note}
                price={item.price}
                oldPrice={item.oldPrice}
                unitPrice={item.unitPrice}
                quantity={item.quantity}
                isDiscounted={item.isDiscounted}
                showTrash={item.showTrash}
                isSoldOut={item.isSoldOut}
                onIncrement={() => {}}
                onDecrement={() => {}}
                onRemove={() => {}}
              />
            ))}
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={6}
              marginBottom={0}
            />
            <AllTickets />
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={6}
              marginBottom={0}
            />
            <PaymentCard />
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={12}
              marginBottom={0}
            />

            <CustomerReviewCard
              name="Viktor"
              rating={4.7}
              variant="XL / Black"
              review="The product arrived on time but the customer service was a bit unresponsive."
              images={[]}
              likes={12}
              date="12 June 2025"
            />
          </Animated.View>
        </View>
      </Animated.ScrollView>
      <Animated.View style={[styles.stickyHeader, { paddingTop: insets.top }]}>
        <Animated.View
          pointerEvents="none"
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity: headerBgOpacity,
            backgroundColor: COLORS.black,
          }}
        />
        <View style={styles.flexRow}>
          <View style={[styles.flexRow, { flex: 1 }]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.6}
            >
              <Image style={styles.icon} source={Images.event_back} />
            </TouchableOpacity>
            <CustomText
              label={"Toscana"}
              fontFamily={fonts.semiBold}
              fontSize={20}
              marginLeft={16}
            />
          </View>
          <View style={[styles.flexRow, { gap: 8 }]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.6}
            >
              <Image style={styles.icon} source={Images.event_search} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.icon} source={Images.event_share} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
  },
  parallaxCardContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },
  contentArea: {
    backgroundColor: "#fff",
  },
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    borderRadius: 99,
    overflow: "hidden",
  },
  backButtonBlur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 12,
  },
  detailImg: {
    width: "100%",
    height: 375,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
});

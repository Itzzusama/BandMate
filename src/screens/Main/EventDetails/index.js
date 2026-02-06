import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { COLORS } from "../../../utils/COLORS";

import { Images } from "../../../assets/images";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomText from "../../../components/CustomText";
import CustomButton from "../../../components/CustomButton";
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
import ArtistDetailCard from "../../../components/ArtistDetailCard";
import { useRoute } from "@react-navigation/native";
import { get, post } from "../../../services/ApiRequest";
import ScreenWrapper from "../../../components/ScreenWrapper";
import LineupCard from "./molecules/LineupCard";
import EventCard from "./molecules/EventCard";
import TicketBottomBar from "./molecules/TicketBottomBar";
import Icons from "../../../components/Icons";
import { ToastMessage } from "../../../utils/ToastMessage";
import { BlurView } from "@react-native-community/blur";
import { PNGIcons } from "../../../assets/images/icons";
import PromoCode from "./molecules/PromoCode";
const eventsData = [
  {
    image: Images.homeSheetImg,
    discount: 20,
    isSponsored: true,
    isNew: true,
    title: "Event Name",
    startDate: "Aug 22, 2024",
    endDate: "Aug 24, 2024",
    price: 40,
    availableTickets: 234,
    friends: [
      { name: "Viktor", avatar: Images.user },
      { name: "John" },
      { name: "Lisa" },
    ],
    matchPercent: 90,
  },
  {
    image: Images.homeSheetImg2,
    discount: 10,
    isSponsored: false,
    isNew: true,
    title: "Music Festival",
    startDate: "Sep 1, 2024",
    endDate: "Sep 2, 2024",
    price: 55,
    availableTickets: 87,
    friends: [{ name: "Mark", avatar: Images.user1 }, { name: "Sarah" }],
    matchPercent: 84,
  },
];
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
  const route = useRoute();
  const { id } = route?.params;
  const [submitting, setSubmitting] = useState(false);
  const [detail, setDetail] = useState({});
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [ticketPayload, setTicketPayload] = useState(null);
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
  const getEventDetail = async () => {
    try {
      const res = await get("events/" + id);
      if (res?.data?.success) {
        console.log(res?.data?.data);
        setDetail(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getEventDetail();
  }, []);

  const handlePayloadUpdate = (payload) => {
    setTicketPayload(payload);
  };

  const submitTickets = async () => {
    try {
      setSubmitting(true);
      const res = await post("bookings", ticketPayload);
      if (res?.data?.success) {
        console.log(res?.data);
        await confirmBooking(res?.data?.data?._id);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmBooking = async (id) => {
    try {
      const res = await post("bookings/" + id + "/confirm");
      if (res?.data?.success) {
        ToastMessage(res?.data?.message, "success");
        setLoading(true);
        await getEventDetail();
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (loading) {
    return (
      <ScreenWrapper>
        <ActivityIndicator size={"large"} style={{ marginTop: 50 }} />
      </ScreenWrapper>
    );
  }
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
        <ArtistDetailCard
          images={
            detail?.media?.map((item) => item?.url) || [
              "https://storage.googleapis.com/move-2223b.firebasestorage.app/uploads/1764860729398.jpg",
            ]
          }
          isEvent
        />

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
            <EventName detail={detail} />
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={0}
              marginBottom={0}
            />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={0}
              marginBottom={0}
            />
            {activeTab == "Overview" && (
              <>
                <RatingOverview
                  detail={detail}
                  tags={detail?.genres}
                  name={detail?.eventName}
                />
                <Divider
                  thickness={4}
                  color={COLORS.inputBg}
                  marginTop={0}
                  marginBottom={0}
                />
                <EventDates detail={detail} />
                <Divider
                  thickness={4}
                  color={COLORS.inputBg}
                  marginTop={0}
                  marginBottom={0}
                />
                <AboutEvent about={detail?.aboutThisEvent} />
                <Divider
                  thickness={4}
                  color={COLORS.inputBg}
                  marginTop={0}
                  marginBottom={0}
                />
                <WhatToExpect content={detail?.whatGuestCanExpect} />
                <Divider
                  thickness={4}
                  color={COLORS.inputBg}
                  marginTop={0}
                  marginBottom={0}
                />
              </>
            )}
            {activeTab == "Lineup" && (
              <>
                <CustomText
                  label={"Lineup"}
                  fontFamily={fonts.semiBold}
                  fontSize={22}
                  marginLeft={12}
                  marginTop={8}
                />
                <LineupCard data={detail?.featuredArtists} />
                <Divider
                  thickness={4}
                  color={COLORS.inputBg}
                  marginTop={4}
                  marginBottom={4}
                />
                <CustomText
                  label={"Sponsor"}
                  fontFamily={fonts.semiBold}
                  fontSize={22}
                  marginLeft={12}
                  marginTop={8}
                />
                <LineupCard data={detail?.sponsors} />
                <Divider
                  thickness={4}
                  color={COLORS.inputBg}
                  marginTop={4}
                  marginBottom={4}
                />
              </>
            )}
            <EventLocation address={detail?.address} />
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
            <AllTickets
              ticketing={detail?.ticketing}
              id={detail?._id}
              onPayloadChange={handlePayloadUpdate}
              address={detail?.address?.address}
            />
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
            <PromoCode />
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
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={12}
              marginBottom={0}
            />

            <View style={[styles.flexRow, { padding: 12 }]}>
              <View style={[styles.flexRow, { flex: 1 }]}>
                <CustomText
                  label={"You Might Also Like"}
                  fontSize={16}
                  fontFamily={fonts.semiBold}
                  marginRight={4}
                />
                <View style={styles.sponsoredWarpper}>
                  <CustomText
                    label={"Sponsored"}
                    fontSize={12}
                    fontFamily={fonts.medium}
                    color={COLORS.white2}
                  />
                </View>
              </View>
              <Icons
                family={"Entypo"}
                name={"chevron-down"}
                color={COLORS.white2}
                size={22}
              />
            </View>
            <FlatList
              data={eventsData}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 12 }}
              renderItem={({ item }) => <EventCard item={item} />}
            />
            <Divider
              thickness={4}
              color={COLORS.inputBg}
              marginTop={12}
              marginBottom={0}
            />

            <View style={[styles.flexRow, { padding: 12 }]}>
              <View style={[styles.flexRow, { flex: 1 }]}>
                <CustomText
                  label={"Others Have Also Booked"}
                  fontSize={16}
                  fontFamily={fonts.semiBold}
                  marginRight={4}
                />
                <View style={styles.sponsoredWarpper}>
                  <CustomText
                    label={"Sponsored"}
                    fontSize={12}
                    fontFamily={fonts.medium}
                    color={COLORS.white2}
                  />
                </View>
              </View>
              <Icons
                family={"Entypo"}
                name={"chevron-down"}
                color={COLORS.white2}
                size={22}
              />
            </View>
            <FlatList
              data={eventsData}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 12 }}
              renderItem={({ item }) => <EventCard item={item} />}
            />
          </Animated.View>
        </View>
      </Animated.ScrollView>
      <View>
        <Divider thickness={4} color={COLORS.inputBg} marginBottom={0} />
        <TicketBottomBar
          totalTickets={ticketPayload?.totalQuantity ?? 0}
          finalPrice={ticketPayload?.finalPrice ?? 0}
          onPressBook={submitTickets}
          loading={submitting}
        />
      </View>

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
          <View style={[styles.flexRow, { flex: 1, marginRight: 50 }]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.6}
              style={styles.iconButtonWrapper}
            >
              <BlurView
                style={styles.iconButtonBlur}
                blurType="materialDark"
                blurAmount={16}
                reducedTransparencyFallbackColor={"#12121252"}
              >
                <Image
                  style={[
                    styles.icon,
                    { height: 24, width: 24, resizeMode: "contain" },
                  ]}
                  source={Images.app_back}
                />
              </BlurView>
            </TouchableOpacity>
            <CustomText
              label={detail?.venueName || "Toscana"}
              fontFamily={fonts.semiBold}
              fontSize={20}
              marginLeft={16}
              numberOfLines={2}
            />
          </View>
          <View style={[styles.flexRow, { gap: 8 }]}>
            <TouchableOpacity
              style={styles.iconButtonWrapper}
              activeOpacity={0.6}
            >
              <BlurView
                style={styles.iconButtonBlur}
                blurType="materialDark"
                blurAmount={16}
                reducedTransparencyFallbackColor={"#12121252"}
              >
                <Image
                  style={[styles.icon, { tintColor: COLORS.white }]}
                  source={PNGIcons.search}
                />
              </BlurView>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButtonWrapper}
              activeOpacity={0.6}
            >
              <BlurView
                style={styles.iconButtonBlur}
                blurType="materialDark"
                blurAmount={16}
                reducedTransparencyFallbackColor={"#12121252"}
              >
                <Image style={styles.icon} source={PNGIcons.share} />
              </BlurView>
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
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  sponsoredWarpper: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: COLORS.inputBg,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  iconButtonWrapper: {
    height: 40,
    width: 40,
    borderRadius: 99,
    overflow: "hidden",
  },
  iconButtonBlur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

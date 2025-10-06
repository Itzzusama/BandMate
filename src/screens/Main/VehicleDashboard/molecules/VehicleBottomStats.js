import { FlatList, Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../../../../components/CustomButton";
import NoDataFound from "../../../../components/NoDataFound";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import VehicleTopCard from "./VehicleTopCard";

import { PNGIcons } from "../../../../assets/images/icons";
import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";

const VehicleBottomStats = ({
  addVehicle,
  vehicleData,
  requests = [
    {
      id: 1,
      mapImage: PNGIcons.ProductCard,
      title: "Lausanne To Nyon",
      price: "$120,095 #40",
      type: "Delivery",
    },
    {
      id: 2,
      mapImage: PNGIcons.ProductCard,

      title: "Volkswagen Golf GTS",
      price: "$12,000",
      type: "",
    },
  ],
  ratings = 4.5,
  ratingCards = [
    { label: "Politeness", rating: "9.00" },
    { label: "Cleanliness", rating: "0.08" },
    { label: "Professional", rating: "0.56" },
  ],
  period = "This Week",
  stats = [
    {
      label: "TOTAL RIDES",
      value: 2907,
      growth: "+27%",
      sub: "Growth last week",
    },
    {
      label: "TOTAL INCOMES",
      value: "$298,007.00",
      growth: "+27%",
      sub: "Growth last week",
    },
    {
      label: "EXTRA PAID",
      value: "$2307",
      growth: "+27%",
      sub: "Growth last week",
    },
    {
      label: "MY TIPS",
      value: "$1407",
      growth: "+27%",
      sub: "Growth last week",
    },
    {
      label: "TOTAL VISITORS",
      value: 1407,
      growth: "+27%",
      sub: "Growth last week",
    },
    {
      label: "CONVERSION RATE",
      value: 2307,
      growth: "+27%",
      sub: "Growth last week",
    },
    {
      label: "CONVERSION RATE",
      value: 1987,
      growth: "+27%",
      sub: "Growth last week",
    },
    {
      label: "REPEATING RATE",
      value: 2907,
      growth: "+27%",
      sub: "Growth last week",
    },
    {
      label: "ONLINE TIME",
      value: 2307,
      growth: "+27%",
      sub: "Growth last week",
    },
    {
      label: "ACTIVE ONLINE TIME",
      value: 1407,
      growth: "+27%",
      sub: "Growth last week",
    },
    {
      label: "DECLINED TRIPS",
      value: 1987,
      growth: "+27%",
      sub: "Growth last week",
    },
    {
      label: "CANCELLED TRIPS",
      value: 2907,
      growth: "+27%",
      sub: "Growth last week",
    },
  ],
}) => {
  const navigation = useNavigation();
  const Repartition = [
    {
      id: 1,
      name: "Ground",
      value: "+50% +6",
      imageValue: 12,
      percentage: "50%",
      backgroundColor: "#C596FF",
      width: 160,
    },
    {
      id: 2,
      name: "Sea",
      value: "+50% +6",
      imageValue: 4,
      percentage: "25%",
      backgroundColor: "#D3E899",
      width: 109,
    },
    {
      id: 3,
      name: "Air",
      value: "+50% +6",
      imageValue: 4,
      percentage: "25%",
      backgroundColor: "#C7C6C2",
      width: 109,
    },
  ];
  return (
    <View style={styles.container}>
      {/* On Going Trip */}
      <View style={styles.requestsRow}>
        <View style={styles.row}>
          <View style={styles.greenDot} />
          <CustomText
            label="On Going Trip"
            fontFamily={fonts.medium}
            fontSize={18}
            lineHeight={18 * 1.4}
          />
        </View>

        <FlatList
          data={requests}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={styles.requestCard}>
                <ImageFast
                  source={item.mapImage}
                  style={styles.requestImage}
                  resizeMode="cover"
                />

                <View style={styles.row}>
                  <Image source={PNGIcons.pin} style={styles.icon} />
                  <CustomText
                    label={item.title}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    fontFamily={fonts.medium}
                    marginLeft={4}
                  />
                </View>
                <View style={styles.row}>
                  <Image source={Images.calender} style={styles.icon} />
                  <CustomText
                    label={"12 July, 2025"}
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    marginLeft={4}
                  />
                  <CustomText
                    label={"11:40 AM"}
                    fontSize={10}
                    lineHeight={10 * 1.4}
                    marginLeft={4}
                  />
                </View>

                <View style={styles.row}>
                  <CustomText
                    label={"$120,095"}
                    fontSize={12}
                    fontFamily={fonts.medium}
                    lineHeight={12 * 1.4}
                    color={"#64CD75"}
                  />
                  <CustomText
                    label={"$140"}
                    fontSize={10}
                    lineHeight={10 * 1.4}
                    marginLeft={2}
                    textDecorationLine={"line-through"}
                  />
                </View>
                <View style={styles.row}>
                  <Image
                    source={Images.instant}
                    style={[styles.icon, { tintColor: COLORS.darkPurple }]}
                  />
                  <CustomText
                    label={"Instant Trip"}
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    marginLeft={2}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>

      {/* upcoming trips  */}

      <View style={styles.requestsRow}>
        <CustomText
          label="Upcoming Trips"
          fontFamily={fonts.medium}
          fontSize={18}
          lineHeight={18 * 1.4}
        />

        <FlatList
          data={requests}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={styles.requestCard}>
                <ImageFast
                  source={item.mapImage}
                  style={styles.requestImage}
                  resizeMode="cover"
                />

                <View style={styles.row}>
                  <Image source={PNGIcons.pin} style={styles.icon} />
                  <CustomText
                    label={item.title}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    fontFamily={fonts.medium}
                    marginLeft={4}
                  />
                </View>
                <View style={styles.row}>
                  <Image source={Images.calender} style={styles.icon} />
                  <CustomText
                    label={"12 July, 2025"}
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    marginLeft={4}
                  />
                  <CustomText
                    label={"11:40 AM"}
                    fontSize={10}
                    lineHeight={10 * 1.4}
                    marginLeft={4}
                  />
                </View>

                <View style={styles.row}>
                  <CustomText
                    label={"$120,095"}
                    fontSize={12}
                    fontFamily={fonts.medium}
                    lineHeight={12 * 1.4}
                    color={"#64CD75"}
                  />
                  <CustomText
                    label={"$140"}
                    fontSize={10}
                    lineHeight={10 * 1.4}
                    marginLeft={2}
                    textDecorationLine={"line-through"}
                  />
                </View>
                <View style={styles.row}>
                  <Image
                    source={Images.instant}
                    style={[styles.icon, { tintColor: COLORS.darkPurple }]}
                  />
                  <CustomText
                    label={"Instant Trip"}
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    marginLeft={2}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
      {/* upcoming trips  */}

      <View style={styles.requestsRow}>
        <CustomText
          label="Requested Trips"
          fontFamily={fonts.medium}
          fontSize={18}
          lineHeight={18 * 1.4}
        />

        <FlatList
          data={requests}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={styles.requestCard}>
                <ImageFast
                  source={item.mapImage}
                  style={styles.requestImage}
                  resizeMode="cover"
                />

                <View style={styles.row}>
                  <Image source={PNGIcons.pin} style={styles.icon} />
                  <CustomText
                    label={item.title}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    fontFamily={fonts.medium}
                    marginLeft={4}
                  />
                </View>
                <View style={styles.row}>
                  <Image source={Images.calender} style={styles.icon} />
                  <CustomText
                    label={"12 July, 2025"}
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    marginLeft={4}
                  />
                  <CustomText
                    label={"11:40 AM"}
                    fontSize={10}
                    lineHeight={10 * 1.4}
                    marginLeft={4}
                  />
                </View>

                <View style={styles.row}>
                  <CustomText
                    label={"$120,095"}
                    fontSize={12}
                    fontFamily={fonts.medium}
                    lineHeight={12 * 1.4}
                    color={"#64CD75"}
                  />
                  <CustomText
                    label={"$140"}
                    fontSize={10}
                    lineHeight={10 * 1.4}
                    marginLeft={2}
                    textDecorationLine={"line-through"}
                  />
                </View>
                <View style={styles.row}>
                  <Image
                    source={Images.instant}
                    style={[styles.icon, { tintColor: COLORS.darkPurple }]}
                  />
                  <CustomText
                    label={"Instant Trip"}
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    marginLeft={2}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
      {/* upcoming trips  */}

      <View style={styles.requestsRow}>
        <CustomText
          label="Past Trips"
          fontFamily={fonts.medium}
          fontSize={18}
          lineHeight={18 * 1.4}
        />

        <FlatList
          data={requests}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={styles.requestCard}>
                <ImageFast
                  source={item.mapImage}
                  style={styles.requestImage}
                  resizeMode="cover"
                />

                <View style={styles.row}>
                  <Image source={PNGIcons.pin} style={styles.icon} />
                  <CustomText
                    label={item.title}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    fontFamily={fonts.medium}
                    marginLeft={4}
                  />
                </View>
                <View style={styles.row}>
                  <Image source={Images.calender} style={styles.icon} />
                  <CustomText
                    label={"12 July, 2025"}
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    marginLeft={4}
                  />
                  <CustomText
                    label={"11:40 AM"}
                    fontSize={10}
                    lineHeight={10 * 1.4}
                    marginLeft={4}
                  />
                </View>

                <View style={styles.row}>
                  <CustomText
                    label={"$120,095"}
                    fontSize={12}
                    fontFamily={fonts.medium}
                    lineHeight={12 * 1.4}
                    color={"#64CD75"}
                  />
                  <CustomText
                    label={"$140"}
                    fontSize={10}
                    lineHeight={10 * 1.4}
                    marginLeft={2}
                    textDecorationLine={"line-through"}
                  />
                </View>
                <View style={styles.row}>
                  <Image
                    source={Images.instant}
                    style={[styles.icon, { tintColor: COLORS.darkPurple }]}
                  />
                  <CustomText
                    label={"Instant Trip"}
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    marginLeft={2}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>

      <View style={styles.fleetContainer}>
        <View
          style={[
            styles.row,
            { justifyContent: "space-between", marginBottom: 10 },
          ]}
        >
          <CustomText
            label={`My Fleet`}
            fontFamily={fonts.semiBold}
            fontSize={18}
            lineHeight={18 * 1.4}
          />
          <View style={styles.row}>
            <CustomText
              label={`See more`}
              lineHeight={12 * 1.4}
              fontSize={12}
              fontFamily={fonts.semiBold}
              color={COLORS.gray1}
              marginRight={4}
              onPress={() => navigation.navigate("MyFleet")}
            />
            <Image
              source={PNGIcons.forwardPurple}
              style={styles.forwardPurple}
            />
          </View>
        </View>

        <FlatList
          data={vehicleData}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <NoDataFound
              title={"No Vehicle Found"}
              desc={`Please Click "Add Vehicle" to create one `}
              marginTop={20}
            />
          }
          renderItem={({ item, index }) => (
            <VehicleTopCard
              key={index}
              plate={item?.plateNumber}
              carName={`${item?.brand} ${item?.model}`}
              carType={item?.type}
              carImages={item?.vehicleImages}
              mainTag={item?.transmission}
              onCardPress={() =>
                navigation.navigate("VehicleDashboard", { vehicle: item })
              }
            />
          )}
        />

        {addVehicle && (
          <CustomButton
            backgroundColor={COLORS.darkPurple}
            title={"Add a Vehicle"}
            color={COLORS.white}
            icon={Images.plus}
            iconColor={COLORS.white}
            marginTop={10}
            fontSize={14}
            borderRadius={12}
            height={40}
            onPress={() => navigation.navigate("EditVehicle")}
          />
        )}
      </View>
      {/* Fleet Repartition  */}

      <View style={styles.RepartitionContainer}>
        <View style={[styles.row, { marginBottom: 12 }]}>
          <CustomText
            label={`Fleet Repartition`}
            fontFamily={fonts.semiBold}
            fontSize={18}
            lineHeight={18 * 1.4}
          />
          <View
            style={[
              styles.row,
              {
                paddingHorizontal: 8,
                backgroundColor: "#DFF4E9",
                marginLeft: 4,
                borderRadius: 4,
              },
            ]}
          >
            <CustomText
              label={"+27% +12"}
              color={"#37B874"}
              fontFamily={fonts.semiBold}
              fontSize={10}
              lineHeight={10 * 1.4}
            />
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <FlatList
            data={Repartition}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={[
                    styles.repartitionSection,
                    {
                      backgroundColor: item.backgroundColor,
                      width: item.width,
                      borderTopLeftRadius: item.id == 1 && 12,
                      borderBottomLeftRadius: item.id == 1 && 12,
                      borderTopRightRadius: item.id == 3 && 12,
                      borderBottomRightRadius: item.id == 3 && 12,
                    },
                  ]}
                >
                  <CustomText
                    label="Ground"
                    fontSize={16}
                    lineHeight={16 * 1.4}
                    fontFamily={fonts.medium}
                    marginBottom={12}
                  />
                  <View style={styles.repartitionDataRow}>
                    <CustomText
                      label="+50% +6"
                      fontSize={12}
                      lineHeight={12 * 1.4}
                      fontFamily={fonts.semiBold}
                    />
                    <Image
                      source={PNGIcons.rightUpArrow}
                      style={styles.smallArrowIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.repartitionDataRow}>
                    <Image source={Images.car} style={styles.repartitionIcon} />
                    <CustomText
                      label="12"
                      fontSize={12}
                      lineHeight={12 * 1.4}
                      fontFamily={fonts.medium}
                    />
                  </View>
                  <CustomText label="50%" fontSize={28} lineHeight={28 * 1.4} />
                </View>
              );
            }}
          />
        </View>
      </View>

      {/* Rating  */}

      <View style={styles.ratingContainer}>
        <CustomText
          label={`Avg. Ratings ${ratings}`}
          fontFamily={fonts.semiBold}
          fontSize={18}
          lineHeight={18 * 1.4}
        />
        <View style={styles.ratingRow}>
          {ratingCards.map((card, index) => (
            <View key={index} style={styles.ratingCard}>
              <Image
                source={PNGIcons.ProductCard}
                style={{
                  height: 64,
                  width: 64,
                  borderRadius: 99,
                  marginBottom: 8,
                }}
              />
              <View style={styles.row}>
                <CustomText
                  label={`${card.rating}/`}
                  fontFamily={fonts.medium}
                  fontSize={14}
                  lineHeight={14 * 1.4}
                />
                <CustomText label={`10`} fontSize={12} lineHeight={12 * 1.4} />
              </View>
              <CustomText
                label={card.label}
                fontSize={14}
                lineHeight={14 * 1.4}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Period and Stats */}
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 18,
          paddingHorizontal: 8,
          paddingVertical: 12,
          marginTop: 5,
        }}
      >
        <View style={styles.periodRow}>
          <CustomText
            fontSize={24}
            label="Period"
            lineHeight={24 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <CustomText
            label={period}
            fontSize={24}
            marginLeft={6}
            color={"#4347FF"}
            lineHeight={24 * 1.4}
            fontFamily={fonts.medium}
          />
          <Icons name={"chevron-down"} family={"Feather"} size={20} left={5} />
        </View>
        <FlatList
          data={stats}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item: stat }) => (
            <View style={styles.statCard}>
              <CustomText
                fontSize={12}
                label={stat.label}
                color={COLORS.gray3}
                lineHeight={12 * 1.4}
                fontFamily={fonts.medium}
              />
              <CustomText
                marginTop={5}
                fontSize={20}
                label={stat.value}
                lineHeight={20 * 1.4}
                fontFamily={fonts.semiBold}
              />
              <View style={[styles.levelRow]}>
                <CustomText
                  fontSize={10}
                  label={stat.growth}
                  color={COLORS.green1}
                  fontFamily={fonts.semiBold}
                />
                <Icons
                  size={12}
                  family={"Feather"}
                  name={"trending-up"}
                  color={COLORS.green1}
                />
              </View>
              <CustomText
                fontSize={10}
                label={stat.sub}
                color={COLORS.gray3}
                lineHeight={10 * 1.4}
                fontFamily={fonts.medium}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  requestsRow: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
    // paddingRight:0,
    gap: 8,
    marginBottom: 8,
  },
  requestCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    width: 260,
    marginRight: 8,
  },
  requestImage: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 8,
  },
  ratingContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginTop: 4,
    borderRadius: 18,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  ratingCard: {
    width: "34%",
    alignItems: "center",
  },
  RepartitionContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginTop: 4,
    borderRadius: 18,
  },
  periodRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 8,
    width: "49%",
    marginBottom: 5,
  },
  border: {
    height: 4,
    backgroundColor: COLORS.lightGray,
    marginVertical: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    marginTop: 8,
  },
  icon: {
    height: 12,
    width: 12,
    tintColor: COLORS.primaryColor,
  },
  greenDot: {
    height: 8,
    width: 8,
    borderRadius: 99,
    backgroundColor: "#37B874",
    marginRight: 4,
  },
  forwardPurple: {
    height: 20,
    width: 20,
  },
  fleetContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 18,
  },

  repartitionSection: {
    padding: 8,
    justifyContent: "space-between",
    minHeight: 125,
    marginRight: 2,
  },
  repartitionDataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  repartitionIcon: {
    height: 16,
    width: 16,
    marginRight: 4,
    tintColor: COLORS.black,
    resizeMode: "contain",
  },
  smallArrowIcon: {
    height: 8,
    width: 8,
    marginLeft: 4,
    marginBottom: 2,
    tintColor: COLORS.black,
  },
});

export default VehicleBottomStats;

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import SearchInput from "../../../components/SearchInput";
import TopTab from "../../../components/TopTab";
import { COLORS } from "../../../utils/COLORS";
import CarFilterModal from "../VehicleMarketplace/CarFilterModal";
import CarCard from "../VehicleMarketplace/molecules/CarCard";
import DealCard from "../VehicleMarketplace/molecules/DealCard";
import TopCarCard from "./molecules/TopCarCard";

const Rentals = () => {
  const navigation = useNavigation();
  const categories = ["Cars", "Motorbikes", "Bicycles", "Sea", "Air"];
  const categoriesImages = [
    Images.car,
    Images.motorbike,
    Images.bike,
    Images.boat,
    Images.PlaneGrey,
  ];

  const [tab, setTab] = useState(0);
  const [filterModal, setFilterModal] = useState(false);

  const vehicleTypes = [
    { id: 1, name: "Sedan", count: "1.25k" },
    { id: 2, name: "Hatchback", count: "1.25k" },
    { id: 3, name: "SUV", count: "1.25k" },
    { id: 4, name: "Coupe", count: "1.25k" },
    { id: 5, name: "Cross-Over", count: "1.25k" },
    { id: 6, name: "Luxury", count: "1.25k" },
    { id: 6, name: "Sedan", count: "1.25k" },
    { id: 8, name: "Classic", count: "1.25k" },
    { id: 9, name: "Convertible", count: "1.25k" },
    { id: 10, name: "Minivan/Van", count: "1.25k" },
    { id: 11, name: "Pickup Truck", count: "1.25k" },
    { id: 12, name: "Toys", count: "1.25k" },
  ];

  return (
    <ScreenWrapper scrollEnabled>
      {/* Header with profile and location */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image source={Images.user} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <CustomText label="Display Name" fontFamily={fonts.medium} />
              <ImageFast
                loading={false}
                source={Images.check}
                style={{ height: 14, width: 14, marginLeft: 4 }}
                resizeMode={"contain"}
              />
              <ImageFast
                source={Images.verifyStar}
                loading={false}
                style={{ height: 14, width: 14, marginLeft: 2 }}
                resizeMode={"contain"}
              />
            </View>
            <View style={styles.locationContainer}>
              <Icons family="MaterialIcons" name="location-pin" size={16} />
              <CustomText
                label="Geneva"
                color={COLORS.gray1}
                marginLeft={2}
                lineHeight={14 * 1.4}
              />
              <Icons
                family="Ionicons"
                name="chevron-down-outline"
                size={12}
                marginLeft={4}
              />
            </View>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <ImageFast
            loading={false}
            source={Images.QROutline}
            style={styles.outlineImage}
          />
          <ImageFast
            loading={false}
            source={Images.walletOutline}
            style={styles.outlineImage}
          />
          <ImageFast
            loading={false}
            source={Images.lineOutline}
            style={styles.outlineImage}
          />
        </View>
      </View>

      {/* Search Bar */}
      <SearchInput
        placeholder="Eg. Shoes..."
        isChange
        isCross
        onPress={() => {}}
      />

      {/* Categories */}

      <TopTab
        rounded
        tab={tab}
        setTab={setTab}
        tabNames={categories}
        marginBottom={12}
        marginTop={10}
        images={categoriesImages}
      />

      {/* Vehicle Types Grid */}
      <FlatList
        numColumns={4}
        data={vehicleTypes}
        renderItem={({ item, index }) => (
          <TopCarCard name={item.name} count={item.count} />
        )}
        showsVerticalScrollIndicator={false}
      />

      <View
        style={[
          styles.nameContainer,
          { justifyContent: "space-between", marginVertical: 12 },
        ]}
      >
        <TouchableOpacity
          style={[styles.saveButton, { justifyContent: "center" }]}
        >
          <Image source={PNGIcons.fav} style={{ height: 16, width: 16 }} />
          <CustomText label={"Saved"} fontFamily={fonts.medium} marginTop={2} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, { justifyContent: "center" }]}
        >
          <View style={styles.bagQuantity}>
            <CustomText
              label={"16"}
              color={COLORS.white}
              fontSize={8}
              lineHeight={8 * 1.4}
            />
          </View>
          <Image source={PNGIcons.bagDark} style={{ height: 16, width: 16 }} />
          <Image source={PNGIcons.bagwhite} style={{ height: 16, width: 16 }} />
          <CustomText
            label={"In Cart"}
            fontFamily={fonts.medium}
            marginTop={2}
            lineHeight={14 * 1.4}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.nameContainer, { justifyContent: "space-between" }]}>
        <CustomButton
          title={"Following"}
          rightIcon={PNGIcons.follow}
          width="32%"
          backgroundColor={COLORS.lightGray}
          color={COLORS.primaryColor}
          fontSize={14}
          fontFamily={fonts.medium}
          height={32}
        />
        <View style={[styles.nameContainer, { gap: 6 }]}>
          <ImageFast
            loading={false}
            source={PNGIcons.globeOutline}
            style={styles.outlineImage}
            onPress={() => navigation.navigate("SliderFilter")}
          />
          <ImageFast
            loading={false}
            onPress={() => setFilterModal(true)}
            source={PNGIcons.filterOutline}
            style={styles.outlineImage}
          />
        </View>
      </View>

      <View style={styles.border} />

      {/* Most Popular */}
      <View style={styles.row}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CustomText
            label={"Most Popular"}
            fontSize={18}
            fontFamily={fonts.medium}
            lineHeight={18 * 1.4}
          />
          <CustomText
            label={" Brands"}
            fontSize={18}
            fontFamily={fonts.medium}
            lineHeight={18 * 1.4}
            color={COLORS.darkPurple}
          />
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>

      <FlatList
        numColumns={3}
        data={vehicleTypes}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            key={index}
            style={styles.brandItem}
          >
            <ImageFast
              loading={false}
              source={PNGIcons.wordpress}
              style={{ height: 32, width: 32 }}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.border} />

      <View style={styles.row}>
        <View>
          <CustomText
            label={"Best of 2025"}
            fontSize={12}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
            lineHeight={12 * 1.4}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText
              label={"Top"}
              fontSize={18}
              fontFamily={fonts.medium}
              lineHeight={18 * 1.4}
            />
            <CustomText
              label={"Events"}
              fontSize={18}
              fontFamily={fonts.medium}
              marginLeft={4}
              lineHeight={18 * 1.4}
              color={COLORS.darkPurple}
            />
          </View>
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>

      <ScrollView horizontal>
        {[1, 2, 3, 4].map(({ index }) => (
          <CarCard
           
            key={index}
            isRental
          />
        ))}
      </ScrollView>

      <View style={styles.border} />

      {/* Your Daily Update */}
      <View style={styles.row}>
        <View>
          <CustomText
            label={"Your Daily Update"}
            fontSize={12}
            fontFamily={fonts.medium}
            lineHeight={12 * 1.4}
          />
          <CustomText
            label={"About"}
            fontSize={12}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
            lineHeight={12 * 1.4}
          />

          <CustomText
            label={"Events"}
            fontSize={18}
            fontFamily={fonts.medium}
            lineHeight={18 * 1.4}
          />
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>

      <ScrollView horizontal>
        {[1, 2, 3, 4].map(({ index }) => (
          <CarCard key={index} isRental />
        ))}
      </ScrollView>

      <View style={styles.border} />

      <View style={styles.row}>
        <View style={styles.seeMore}>
          <ImageFast
            source={PNGIcons.bookMark}
            style={{ height: 18, width: 18 }}
          />

          <CustomText
            label={"New Deals"}
            fontSize={18}
            fontFamily={fonts.medium}
            lineHeight={18 * 1.4}
          />
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[1, 2, 3, 4].map(({ index }) => (
          <DealCard />
        ))}
      </ScrollView>

      <View style={styles.border} />

      {/* new deals  */}
      <View style={styles.row}>
        <View style={styles.seeMore}>
          <ImageFast
            source={PNGIcons.bookMark}
            style={{ height: 18, width: 18 }}
          />

          <CustomText
            label={"New Deals"}
            fontSize={18}
            fontFamily={fonts.medium}
            lineHeight={18 * 1.4}
          />
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[1, 2, 3, 4].map(({ index }) => (
          <DealCard isChange />
        ))}
      </ScrollView>

      <View style={styles.border} />

      {/* New Deals */}
      <View style={styles.row}>
        <View style={styles.seeMore}>
          <ImageFast
            source={PNGIcons.bookMark}
            style={{ height: 18, width: 18 }}
          />

          <CustomText
            label={"New Deals"}
            fontSize={18}
            fontFamily={fonts.medium}
            lineHeight={18 * 1.4}
          />
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>

      <ScrollView horizontal>
        {[1, 2, 3, 4].map(({ index }) => (
          <CarCard key={index} isRental />
        ))}
      </ScrollView>

      <View style={styles.border} />

      <View style={styles.row}>
        <View style={styles.seeMore}>
          <ImageFast
            source={PNGIcons.bookMark}
            style={{ height: 18, width: 18 }}
          />

          <CustomText
            label={"Everything at $1"}
            fontSize={18}
            fontFamily={fonts.medium}
            lineHeight={18 * 1.4}
          />
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>

      <ScrollView horizontal>
        {[1, 2, 3, 4].map(({ index }) => (
          <CarCard key={index} isRental />
        ))}
      </ScrollView>

      <View style={styles.border} />

      <View style={styles.row}>
        <View style={styles.seeMore}>
          <ImageFast
            source={PNGIcons.bookMark}
            style={{ height: 18, width: 18 }}
          />
          <View>
            <CustomText
              label={"Deals"}
              fontSize={18}
              fontFamily={fonts.medium}
              lineHeight={18 * 1.4}
            />
            <CustomText
              label={"You Would Not Like To Miss!"}
              fontSize={12}
              fontFamily={fonts.medium}
              lineHeight={12 * 1.4}
              color={COLORS.gray1}
            />
          </View>
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>

      <ScrollView horizontal>
        {[1, 2, 3, 4].map(({ index }) => (
          <CarCard key={index} isRental />
        ))}
      </ScrollView>

      <View style={styles.border} />

      <View style={styles.row}>
        <View style={styles.seeMore}>
          <ImageFast
            source={PNGIcons.bookMark}
            style={{ height: 18, width: 18 }}
          />
          <View>
            <CustomText
              label={"Top 10 in"}
              fontSize={18}
              fontFamily={fonts.medium}
              lineHeight={18 * 1.4}
            />
            <CustomText
              label={"Asia"}
              fontSize={12}
              fontFamily={fonts.medium}
              lineHeight={12 * 1.4}
              color={COLORS.gray1}
            />
          </View>
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>

      <ScrollView horizontal>
        {[1, 2, 3, 4].map(({ index }) => (
          <CarCard key={index} isRental />
        ))}
      </ScrollView>

      <View style={styles.border} />

      <View style={styles.row}>
        <View style={styles.seeMore}>
          <ImageFast
            source={PNGIcons.bookMark}
            style={{ height: 18, width: 18 }}
          />

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CustomText
                label={"People from"}
                fontSize={12}
                fontFamily={fonts.medium}
                color={COLORS.gray1}
                lineHeight={12 * 1.4}
              />
              <CustomText
                label={" Jamaica"}
                fontSize={12}
                fontFamily={fonts.semiBold}
                lineHeight={12 * 1.4}
              />
            </View>

            <CustomText
              label={"Love These"}
              fontSize={18}
              fontFamily={fonts.medium}
              lineHeight={18 * 1.4}
            />
          </View>
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>

      <ScrollView horizontal>
        {[1, 2, 3, 4].map(({ index }) => (
          <CarCard key={index} isRental />
        ))}
      </ScrollView>

      <View style={styles.border} />

      <View style={styles.row}>
        <CustomText
          label={"Your Friends Have Joined"}
          fontSize={18}
          fontFamily={fonts.medium}
          lineHeight={18 * 1.4}
        />

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>

      <ScrollView horizontal>
        {[1, 2, 3, 4].map(({ index }) => (
          <CarCard key={index} isRental />
        ))}
      </ScrollView>

      <View style={styles.border} />

      <View style={styles.row}>
        <View>
          <CustomText
            label={"Exlusive products in"}
            fontSize={12}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
            lineHeight={12 * 1.4}
          />
          <CustomText
            label={"Electronics"}
            fontSize={18}
            fontFamily={fonts.medium}
            lineHeight={18 * 1.4}
          />
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>

      <ScrollView horizontal>
        {[1, 2, 3, 4].map(({ index }) => (
          <CarCard key={index} isRental />
        ))}
      </ScrollView>

      <View style={styles.border} />

      <View style={styles.row}>
        <View>
          <CustomText
            label={"Events driven by"}
            fontSize={12}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
            lineHeight={12 * 1.4}
          />
          <CustomText
            label={"Men"}
            fontSize={18}
            fontFamily={fonts.medium}
            lineHeight={18 * 1.4}
          />
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>

      <ScrollView horizontal>
        {[1, 2, 3, 4].map(({ index }) => (
          <CarCard key={index} isRental />
        ))}
      </ScrollView>

      <View style={styles.border} />

      <View style={styles.row}>
        <View>
          <CustomText
            label={"Events driven by"}
            fontSize={12}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
            lineHeight={12 * 1.4}
          />
          <CustomText
            label={"Women"}
            fontSize={18}
            fontFamily={fonts.medium}
            lineHeight={18 * 1.4}
          />
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>

      <ScrollView horizontal>
        {[1, 2, 3, 4].map(({ index }) => (
          <CarCard key={index} isRental />
        ))}
      </ScrollView>

      <View style={styles.border} />

      <View style={styles.row}>
        <View>
          <CustomText
            label={"Events joined by"}
            fontSize={12}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
            lineHeight={12 * 1.4}
          />
          <CustomText
            label={"Nassir & 3 others"}
            fontSize={18}
            fontFamily={fonts.medium}
            lineHeight={18 * 1.4}
          />
        </View>

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>

      <ScrollView horizontal>
        {[1, 2, 3, 4].map(({ index }) => (
          <CarCard key={index} isRental />
        ))}
      </ScrollView>

      <CarFilterModal
        isVisible={filterModal}
        onItemPress={() => {
          setFilterModal(false),
            setTimeout(() => {
              navigation.navigate("VehicleFilters");
            }, 600);
        }}
        onDisable={() => setFilterModal(false)}
      />
    </ScreenWrapper>
  );
};

export default Rentals;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 8,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
  },
  profileInfo: {
    marginLeft: 12,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    width: "49%",
    gap: 4,
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  vehicleItem: {
    width: "23.5%",
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 8,
    alignItems: "center",
    marginRight: 6,
    marginBottom: 6,
  },
  vehicleImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  outlineImage: {
    height: 40,
    width: 40,
  },

  bagQuantity: {
    height: 16,
    width: 16,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.darkPurple,
  },
  border: {
    height: 4,
    backgroundColor: COLORS.lightGray,
    marginVertical: 12,
  },
  seeMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  forwardPurple: {
    height: 20,
    width: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  brandItem: {
    height: 40,
    width: "32%",
    padding: 10,
    backgroundColor: "#7d93be",
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
    marginBottom: 4,
  },
});

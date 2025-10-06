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
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import SearchInput from "../../../../components/SearchInput";
import TopTab from "../../../../components/TopTab";
import { COLORS } from "../../../../utils/COLORS";
import CarFilterModal from "../../VehicleMarketplace/CarFilterModal";

import MainCarCard from "../../VehicleMarketplace/molecules/MainCarCard";
import BrowseAudience from "../../VehicleMarketplace/molecules/BrowseAudience";
import GiftCard from "../../VehicleMarketplace/molecules/GiftCard";
import SeeMoreCard from "../../VehicleMarketplace/molecules/SeeMoreCard";
import ParkingLocationFilter from "./ParkingLocationFilter";

const CustomMarketplaceCus = () => {
  const navigation = useNavigation();
  const categories = ["Cars", "Sea", "Air"];
  const categoriesImages = [Images.car, Images.boat, Images.PlaneGrey];

  const [tab, setTab] = useState(0);
  const [filterModal, setFilterModal] = useState(false);
  const [seeMoreSelected2, setSeeMoreSelected2] = useState(null);

  const seeMoreItemsTwo = [
    {
      id: "two-1",
      image: PNGIcons.plus,
      title: "Have an interesting product?",
      subtitle: "Sell to thousands on Linkable.",
      tag: "Upgrade To Pro",
      forward: false,
    },
    {
      id: "two-2",
      image: Images.chatIcon,
      title: "Need to request a product",
      subtitle: "Even if not there, we can make it available to you.",
      tag: "Send a Request",
      forward: false,
    },
  ];
  const workItems = [
    {
      id: "two-1",
      image: PNGIcons.plus,
      title: "Add To Cart",
      subtitle: "SQuickly add your desired items to the shopping cart.",
      tag: "1",
    },
    {
      id: "two-2",
      image: PNGIcons.plus,
      title: "Add To Cart",
      subtitle: "SQuickly add your desired items to the shopping cart.",
      tag: "2",
    },
    {
      id: "two-3",
      image: PNGIcons.plus,
      title: "Add To Cart",
      subtitle: "SQuickly add your desired items to the shopping cart.",
      tag: "3",
    },
  ];

  return (
    <ScrollView>
      {/* Header with profile and location */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image source={Images.user} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <CustomText label="Display Name" fontFamily={fonts.medium} />
              <ImageFast
                source={Images.check}
                style={{ height: 14, width: 14, marginLeft: 4 }}
                resizeMode={"contain"}
              />
              <ImageFast
                source={Images.verifyStar}
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
      <View style={{ paddingHorizontal: 12 }}>
        <SearchInput
          placeholder="Eg. Shoes..."
          isChange
          isCross
          onPress={() => {}}
        />

        <View
          style={[styles.nameContainer, { justifyContent: "space-between" }]}
        >
          <TopTab
            rounded
            tab={tab}
            setTab={setTab}
            tabNames={categories}
            marginBottom={12}
            marginTop={10}
            images={categoriesImages}
          />
          <View style={[styles.nameContainer, { gap: 6 }]}>
            <ImageFast
              source={PNGIcons.calenderOutline}
              style={styles.outlineImage}
              loading={false}
              onPress={() => navigation.navigate("CustomerCalender")}
            />
            <ImageFast
              onPress={() => setFilterModal(true)}
              source={PNGIcons.filterOutline}
              style={styles.outlineImage}
              loading={false}
            />
          </View>
        </View>

        <View style={styles.border} />
      </View>
      {/* Categories */}
      <MainCarCard
        highlightText
        highlight={"Parking"}
        title={"Best of 2025"}
        titleTwo
        sub={"Recommended"}
        car
      />
      <MainCarCard
        threeText
        title={"Your Daily Update"}
        titleTwo={"About"}
        sub={"Electronics"}
        car
      />

      <MainCarCard title={"Location Types"} isDealCardChange imgText />
      <MainCarCard title={"New Deals"} imgText />

      <MainCarCard
        title={"Beach Escapes in"}
        imgTwoText
        sub={"Barcelona"}
        isImage
        car
        image={PNGIcons.beach}
        isTextReverse
      />
      <MainCarCard
        title={"Mountain Getaways"}
        imgText
        isImage
        car
        image={PNGIcons.mountain}
      />

      <MainCarCard
        title={"Beach Escapes in"}
        imgTwoText
        sub={"Barcelona"}
        isImage
        car
      />
      <MainCarCard
        title={"Top 10 in"}
        sub={"Asia"}
        isTextReverse
        car
        imgTwoText
        isTop
      />

      <MainCarCard
        title={"People from Jamaica"}
        sub={"Love These"}
        isTextReverse
        car
        imgTwoText
      />
      <MainCarCard title={"Your Friends Have booked"} car />

      <MainCarCard
        title={"Exlusive products in"}
        sub={"Electronics"}
        isTextReverse
        car
        imgTwoText
        isImage={false}
      />

      <MainCarCard
        title={"Events driven by"}
        sub={"Men"}
        isTextReverse
        car
        imgTwoText
        isImage={false}
      />

      <MainCarCard
        title={"Events driven by"}
        sub={"Women"}
        isTextReverse
        car
        imgTwoText
        isImage={false}
        marginTop={12}
      />

      <MainCarCard
        title={"Events joined by"}
        sub={"Nassir & 3 others"}
        isTextReverse
        car
        imgTwoText
        isImage={false}
      />
      <MainCarCard title={"Most Popular"} isProduct marginTop={12} />
      <MainCarCard title={"Most Popular"} isProduct marginTop={12} />
      <SeeMoreCard
        title={"How Does It Work"}
        isChange
        isWork
        items={workItems}
      />

      <MainCarCard title={"Most Popular"} isProduct marginTop={12} />

      <SeeMoreCard isBrand isChange title={"Famous Brands"} />

      <MainCarCard title={"Most Popular"} isProduct marginTop={12} />
      <GiftCard />

      <SeeMoreCard title={"What Would You Like To See More?"} />

      <BrowseAudience />
      <SeeMoreCard
        isChange
        title={"You Make The Next Move."}
        items={seeMoreItemsTwo}
        selectedId={seeMoreSelected2}
        onChange={(item) => setSeeMoreSelected2(item?.id)}
      />

      <MainCarCard
        backgroundColor={"#253B23"}
        paddingVertical={12}
        title={"Les mieux notés"}
        car
        isBorder={false}
      />

      <MainCarCard title={"New Deals"} car imgText />

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

      {/* <ParkingLocationFilter isVisible/> */}
    </ScrollView>
  );
};

export default CustomMarketplaceCus;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 12,
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
    paddingHorizontal: 12,
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
    height: 2,
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
    alignItems: "center",
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

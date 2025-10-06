import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import ToggleCard from "../ParkingSettings/molecules/ToggleCard";
import { post, put } from "../../../services/ApiRequest";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CustomButton from "../../../components/CustomButton";
import DashboardModal from "../Dashboard/Modals/DashboardModal";
import { ToastMessage } from "../../../utils/ToastMessage";

const InteriorFeature = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params?.currentVehicle;

  const interiorFeatures = item?.interiorFeatures;

  console.log("inr---", interiorFeatures);

  const [musicArray, setMusicArray] = useState([
    { name: "Spotify", isEnable: true },
    { name: "Apple Music", isEnable: true },
    { name: "YouTube Music", isEnable: true },
  ]);
  const [bookArray, setBookArray] = useState([
    { name: "Travel Magazine", isEnable: true },
    { name: "Business Weekly", isEnable: true },
  ]);

  const initialFeatures = [
    { title: "A/C (Air Condition)", value: interiorFeatures?.airCondition },
    {
      title: "Allow Music",
      value: interiorFeatures?.allowsMusic,
      subTitle: "Define what type of music is allowed in the space",
      isChange: true,
      isMore: true,
      onMorePress: () => setMusicModal(true),
    },
    {
      title: "Magazine(s)",
      value: interiorFeatures?.booksOrMagazines?.enabled,
      subTitle: "Minimal rental period",
      isChange: true,
      isMore: true,
      onMorePress: () => setBookModal(true),
    },
    { title: "Bluetooth", value: interiorFeatures?.bluetooth },
    {
      title: "Board(s)",
      value: interiorFeatures?.boards?.enabled,
      subTitle: "Define what type of music is allowed in the space",
      increment: interiorFeatures?.boards?.count || 1,
      unitPrice: interiorFeatures?.boards?.amount || 2,
      showUnitPrice: true,
    },
    {
      title: "Cabled Phone Charger(s)",
      value: interiorFeatures?.cabledPhoneChargers?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: interiorFeatures?.cabledPhoneChargers?.count || 1,
    },
    {
      title: "First Aid Medic Kit(s)",
      value: interiorFeatures?.firstAidKit?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: interiorFeatures?.firstAidKit?.count || 1,
    },
    {
      title: "Hand Sanitizer(s)",
      value: interiorFeatures?.handSanitizer?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: interiorFeatures?.handSanitizer?.count || 1,
    },
    {
      title: "Hanger(s)",
      value: interiorFeatures?.hangers?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: interiorFeatures?.hangers?.count || 1,
    },
    {
      title: "Headphone(s)",
      value: interiorFeatures?.headphones?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: interiorFeatures?.headphones?.count || 1,
    },
    {
      title: "Heated seats (Front)",
      value: interiorFeatures?.heatedSeatsFront?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: interiorFeatures?.heatedSeatsFront?.count || 1,
    },
    {
      title: "Heated seats (Back)",
      value: interiorFeatures?.heatedSeatsBack?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: interiorFeatures?.heatedSeatsBack?.count || 1,
    },

    {
      title: "Interior LED Lights",
      value: interiorFeatures?.interiorLEDLights,
      isChange: true,
    },
    {
      title: "Perfumed Vehicle",
      value: interiorFeatures?.perfumed,
      isChange: true,
    },
    {
      title: "Portable Wi-Fi",
      value: interiorFeatures?.portableWifi,
      isChange: true,
    },
    { title: "Provide Masks", value: interiorFeatures?.masks, isChange: true },
    {
      title: "Provide Tissues",
      value: interiorFeatures?.tissues,
      isChange: true,
    },
    {
      title: "Provide Vomit Bags",
      value: interiorFeatures?.vomitBags?.enabled,
    },
    { title: "Sun Shades", value: interiorFeatures?.sunShades },

    {
      title: "Trash Can(s)",
      value: interiorFeatures?.trashCans?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: interiorFeatures?.trashCans?.count || 1,
    },
    {
      title: "TV Display(s)",
      value: interiorFeatures?.tvDisplays?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: interiorFeatures?.tvDisplays?.count || 1,
    },
    {
      title: "USB Input(s)",
      value: interiorFeatures?.USBInput?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: interiorFeatures?.USBInput?.count || 1,
    },
    {
      title: "Yellow Vest(s)",
      value: interiorFeatures?.yellowVests?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: interiorFeatures?.yellowVests?.count || 1,
    },
    {
      title: "Wireless Phone Charger(s)",
      value: interiorFeatures?.wirelessPhoneChargers?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: interiorFeatures?.wirelessPhoneChargers?.count || 1,
    },
    {
      title: "Warning Triangle(s)",
      value: interiorFeatures?.warningTriangles?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: interiorFeatures?.warningTriangles?.count || 1,
    },
  ];

  const [features, setFeatures] = useState(initialFeatures);
  const [musicModal, setMusicModal] = useState(false);
  const [bookModal, setBookModal] = useState(false);
  const [requestBody, setRequestBody] = useState({});
  const [itemTotals, setItemTotals] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures[index].value = !updatedFeatures[index].value;
    setFeatures(updatedFeatures);
  };

  useEffect(() => {
    const getCount = (i) => {
      const enabled = features[i]?.value;
      const base = features[i]?.increment ? features[i].increment : 0;
      const current = itemTotals[i]?.count;
      return enabled ? (typeof current === "number" ? current : base) : 0;
    };

    const getPrice = (i) => {
      const enabled = features[i]?.value;
      const unit = Number(
        itemTotals[i]?.unitPrice ?? features[i]?.unitPrice ?? 0
      );
      if (!enabled) return 0;

      return unit;
    };

    const body = {
      airCondition: features[0].value,
      allowsMusic: features[1].value,

      booksOrMagazines: {
        enabled: features[2].value,
        bookes: bookArray
          .filter((item) => item.isEnable)
          .map((item) => item.name),
      },

      bluetooth: features[3].value,

      boards: {
        enabled: features[4]?.value,
        count: getCount(4),
        price: getPrice(4),
      },

      cabledPhoneChargers: {
        enabled: features[5].value,
        count: getCount(5),
      },

      firstAidKit: {
        enabled: features[6].value,
        count: getCount(6),
      },

      handSanitizer: {
        enabled: features[7].value,
        count: getCount(7),
      },

      hangers: {
        enabled: features[8].value,
        count: getCount(8),
      },

      headphones: {
        enabled: features[9].value,
        count: getCount(9),
      },

      heatedSeatsFront: {
        enabled: features[10].value,
        count: getCount(10),
        price: getPrice(10),
      },

      heatedSeatsBack: {
        enabled: features[11].value,
        count: getCount(11),
        price: getPrice(11),
      },

      interiorLEDLights: features[12].value,
      perfumed: features[13].value,
      portableWifi: features[14].value,
      masks: features[15].value,
      tissues: features[16].value,

      vomitBags: {
        enabled: features[17].value,
        count: getCount(17),
      },

      sunShades: features[18].value,

      trashCans: {
        enabled: features[19].value,
        count: getCount(19),
      },

      tvDisplays: {
        enabled: features[20].value,
        count: getCount(20),
      },

      USBInput: {
        enabled: features[21].value,
        count: getCount(21),
      },

      yellowVests: {
        enabled: features[22].value,
        count: getCount(22),
      },

      wirelessPhoneChargers: {
        enabled: features[23].value,
        count: getCount(23),
      },

      warningTriangles: {
        enabled: features[24]?.value,
        count: getCount(24),
      },
      musicApps: musicArray
        .filter((item) => item.isEnable)
        .map((item) => item.name),

      fireExtinguisher: false,
      woodenInterior: false,
    };

    setRequestBody(body);
  }, [features, itemTotals, musicArray, bookArray]);

  useEffect(() => {
    // 🎵 Handle Music Apps
    if (interiorFeatures?.musicApps?.length) {
      const allowedApps = interiorFeatures.musicApps.map((app) =>
        app.toLowerCase()
      );

      setMusicArray((prev) =>
        prev.map((item) => ({
          ...item,
          isEnable: allowedApps.includes(item.name.toLowerCase()),
        }))
      );
    }

    // 📚 Handle Books / Magazines
    if (interiorFeatures?.booksOrMagazines?.bookes?.length) {
      const allowedBooks = interiorFeatures.booksOrMagazines.bookes.map((b) =>
        b.toLowerCase()
      );

      setBookArray((prev) =>
        prev.map((item) => ({
          ...item,
          isEnable: allowedBooks.includes(item.name.toLowerCase()),
        }))
      );
    }
  }, [interiorFeatures?.musicApps, interiorFeatures?.booksOrMagazines?.bookes]);

  const updateFields = async () => {
    try {
      setLoading(true);

      const hasFeatures = interiorFeatures?.Vehicle;
      const api = `vehicles/${item?.id}/interior-features${
        interiorFeatures ? `/${interiorFeatures?._id}` : ""
      }`;
      const method = hasFeatures ? put : post;

      const { data } = await method(api, requestBody);

      if (data?.success) {
        ToastMessage("Interior Feature Updated", "success");
        navigation.goBack();
      }
    } catch (error) {
      console.log("errrr00000----", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Equipments"} />}
    >
      <CustomText
        label="Interior Features"
        fontSize={24}
        lineHeight={24 * 1.4}
        fontFamily={fonts.semiBold}
        color={COLORS.black}
        marginTop={10}
      />
      <CustomText
        label="You don't have any messages yet."
        color={COLORS.gray1}
        marginBottom={16}
        lineHeight={16 * 1.4}
      />

      {features.map((item, index) => (
        <ToggleCard
          key={index}
          label={item.title}
          switchValue={item.value}
          subTitle={item.subTitle}
          isChange={item.isChange}
          increment={item.increment}
          unitPrice={item.unitPrice}
          showUnitPrice={item?.showUnitPrice}
          isMore={item.isMore}
          onMorePress={item?.onMorePress}
          setSwitchValue={() => toggleFeature(index)}
          onTotalsChange={({ count, price, unitPrice }) =>
            setItemTotals((prev) => ({
              ...prev,
              [index]: { count, price, unitPrice },
            }))
          }
        />
      ))}

      <CustomButton
        title={"Confirm"}
        marginBottom={12}
        marginTop={40}
        onPress={updateFields}
        loading={loading}
      />

      <DashboardModal
        isVisible={musicModal}
        title={"Allow Music"}
        subtitle={"Spotify, Apple Music, Deezer, and more..."}
        btnOneTitle={"Save"}
        btnTwoTitle={"Cancel"}
        toggle
        switchArray={musicArray}
        setSwitchArray={setMusicArray}
        onDisable={() => setMusicModal(false)}
        onPress={() => setMusicModal(false)}
      />
      <DashboardModal
        isVisible={bookModal}
        title={"Have Books"}
        subtitle={"Books for kids, regular books, magazins"}
        btnOneTitle={"Save"}
        btnTwoTitle={"Cancel"}
        toggle
        switchArray={bookArray}
        setSwitchArray={setBookArray}
        onDisable={() => setBookModal(false)}
        onPress={() => setBookModal(false)}
      />
    </ScreenWrapper>
  );
};

export default InteriorFeature;

const styles = StyleSheet.create({});

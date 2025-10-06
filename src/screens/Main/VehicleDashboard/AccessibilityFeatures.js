import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import ToggleCard from "../ParkingSettings/molecules/ToggleCard";
import CustomButton from "../../../components/CustomButton";
import { post, put } from "../../../services/ApiRequest";
import { useNavigation } from "@react-navigation/native";
import { ToastMessage } from "../../../utils/ToastMessage";

const AccessibilityFeatures = ({ route }) => {
  const navigation = useNavigation();

  const item = route.params?.currentVehicle;

  const accessibilityFeatures = item?.accessibilityFeatures;

  console.log("accessibilityFeatures----",accessibilityFeatures);
  

  const initialFeatures = [
    { title: "Assist Trap", value: accessibilityFeatures?.assistTrap },
    { title: "Handy Bar", value: accessibilityFeatures?.handyBar },
    { title: "GPS", value: accessibilityFeatures?.gps },
    { title: "Toll Pass", value: accessibilityFeatures?.tollPass },
    { title: "Keyless Entry", value: accessibilityFeatures?.keyLessEntry },
    {
      title: "Horse Trailer(s)",
      value: accessibilityFeatures?.horseTrailers?.enabled,
      subTitle: "Most customers will pay extra for this.",
      unitPrice: accessibilityFeatures?.horseTrailers?.amount || 1,
      increment: accessibilityFeatures?.horseTrailers?.count || 1,
      showUnitPrice: true,
    },
    {
      title: "Swovel Seat(s)",
      value: accessibilityFeatures?.swovelSeat?.enabled,
      subTitle: "Most customers will pay extra for this.",
      unitPrice: accessibilityFeatures?.swovelSeat?.amount || 1,
      showUnitPrice: true,
      increment: accessibilityFeatures?.swovelSeat?.count || 1,
    },
    {
      title: "Turny Seat(s)",
      value: accessibilityFeatures?.turnySeats?.enabled,
      subTitle: "Most customers will pay extra for this.",
      unitPrice: accessibilityFeatures?.turnySeats?.amount || 1,
      increment: accessibilityFeatures?.turnySeats?.count || 1,
      showUnitPrice: true,
    },

    { title: "Side Ramp", value: accessibilityFeatures?.sideRamp },
    { title: "rear Ramp", value: accessibilityFeatures?.rearRamp },

    {
      title: "Toddler/Children Seat(s)",
      value: accessibilityFeatures?.toddlerSeats?.enabled,
      subTitle: "Most customers will pay extra for this.",
      unitPrice: accessibilityFeatures?.toddlerSeats?.amount || 1,
      increment: accessibilityFeatures?.toddlerSeats?.count || 1,
      showUnitPrice: true,
    },
    {
      title: "Small Pet Cage(s)",
      value: accessibilityFeatures?.smallPetCages?.enabled,
      subTitle: "Most customers will pay extra for this.",
      unitPrice: accessibilityFeatures?.smallPetCages?.amount,
      increment: accessibilityFeatures?.smallPetCages?.count || 1,
      showUnitPrice: true,
    },
    {
      title: "Large Pet Cage(s)",
      value: accessibilityFeatures?.largePetCages?.enabled,
      subTitle: "Most customers will pay extra for this.",
      unitPrice: accessibilityFeatures?.largePetCages?.amount || 1,
      showUnitPrice: true,
      increment: accessibilityFeatures?.largePetCages?.count || 1,
    },
  ];

  const [features, setFeatures] = useState(initialFeatures);
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
      assistTrap: features[0].value,
      handyBar: features[1].value,
      gps: features[2].value,
      tollPass: features[3].value,
      keyLessEntry: features[4].value,

      horseTrailers: {
        enabled: features[5].value,
        count: getCount(5),
        amount: getPrice(5),
      },
      swovelSeat: {
        enabled: features[6].value,
        count: getCount(6),
        amount: getPrice(6),
      },
      turnySeats: {
        enabled: features[7].value,
        count: getCount(7),
        amount: getPrice(7),
      },
      sideRamp: features[8].value,
      rearRamp: features[9].value,
      toddlerSeats: {
        enabled: features[10].value,
        count: getCount(10),
      },

      smallPetCages: {
        enabled: features[11].value,
        count: getCount(11),
        amount: getPrice(11),
      },
      largePetCages: {
        enabled: features[12].value,
        count: getCount(12),
        amount: getPrice(12),
      },
    };

    setRequestBody(body);
  }, [features, itemTotals]);

  const updateFields = async () => {
    try {
      setLoading(true);

      const hasFeatures = accessibilityFeatures?.Vehicle;
      const api = `vehicles/${item?.id}/accessibility-features${
        accessibilityFeatures ? `/${accessibilityFeatures?._id}` : ""
      }`;

      
      const method = hasFeatures ? put : post;
      console.log("hasFeatures-----",method);

      const { data } = await method(api, requestBody);

      if (data?.success) {
        ToastMessage("Accessibility Feature Updated", "success");
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
        label="Accessiblity Features"
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
    </ScreenWrapper>
  );
};

export default AccessibilityFeatures;

const styles = StyleSheet.create({});

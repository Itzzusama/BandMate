import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import ToggleCard from "../ParkingSettings/molecules/ToggleCard";
import { post, put } from "../../../services/ApiRequest";
import CustomButton from "../../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { ToastMessage } from "../../../utils/ToastMessage";

const ExteriorFeature = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params?.currentVehicle;

  const exteriorFeatures = item?.exteriorFeatures;

  const initialFeatures = [
    {
      title: "Bike Trailer(s)",
      value: exteriorFeatures?.bikeTrailers?.enabled,
      increment: exteriorFeatures?.bikeTrailers?.count || 1,
      unitPrice: exteriorFeatures?.bikeTrailers?.amount || 2,
      showUnitPrice: true,
    },
    {
      title: "Big Roof Luggage Rack(s)",
      value: exteriorFeatures?.bigRoofLuggageRack?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: exteriorFeatures?.bigRoofLuggageRack?.count || 1,
      unitPrice: exteriorFeatures?.bigRoofLuggageRack?.amount || 1,
      showUnitPrice: true,
    },
    {
      title: "Car Trailer(s)",
      value: exteriorFeatures?.carTrailers?.enabled,
      subTitle: "Most customers will pay extra for this.",
      increment: exteriorFeatures?.carTrailers?.count || 1,
      unitPrice: exteriorFeatures?.carTrailers?.amount || 1,
      showUnitPrice: true,
    },
    {
      title: "Motorbike Trailer(s)",
      value: exteriorFeatures?.motorbikeTrailers?.enabled,
      subTitle: "Most customers will pay extra for this.",
      unitPrice: exteriorFeatures?.motorbikeTrailers?.amount || 1,
      increment: exteriorFeatures?.motorbikeTrailers?.count || 1,
      showUnitPrice: true,
    },
    {
      title: "Small Roof Luggage Rack(s)",
      value: exteriorFeatures?.smallRoofLuggageRack?.enabled,
      subTitle: "Most customers will pay extra for this.",
      unitPrice: exteriorFeatures?.smallRoofLuggageRack?.count || 1,
      increment: exteriorFeatures?.smallRoofLuggageRack?.count || 1,
      showUnitPrice: true,
    },
    {
      title: "Ski Rack(s)",
      value: exteriorFeatures?.skiRack?.enabled,
      subTitle: "Most customers will pay extra for this.",
      unitPrice: exteriorFeatures?.skiRack?.amount || 1,
      increment: exteriorFeatures?.skiRack?.count || 1,
      showUnitPrice: true,
    },

    { title: "Tinted Windows", value: exteriorFeatures?.tintedWindows },
    { title: "Tuned", value: exteriorFeatures?.tuned },
    { title: "Convertible", value: exteriorFeatures?.convertible },
    {
      title: "Extra Tyre(s)",
      value: exteriorFeatures?.extraTyre?.enabled,
      subTitle: "Most customers will pay extra for this.",
      unitPrice: exteriorFeatures?.extraTyre?.count || 1,
      showUnitPrice: true,
      increment: exteriorFeatures?.extraTyre?.count || 1,
    },
    { title: "Backup camera", value: exteriorFeatures?.backupCamera },
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

    // const getPrice = (i) => {
    //   const enabled = features[i]?.value;
    //   const unit = Number(features[i]?.unitPrice || 0);
    //   if (!enabled || !unit) return 0;
    //   const current = itemTotals[i]?.amount;
    //   if (typeof current === "number") return current;
    //   const count = getCount(i);
    //   return unit * count;
    // };

    const getPrice = (i) => {
      const enabled = features[i]?.value;
      const unit = Number(
        itemTotals[i]?.unitPrice ?? features[i]?.unitPrice ?? 0
      );
      if (!enabled) return 0;

      return unit;
    };

    const body = {
      bikeTrailers: {
        enabled: features[0].value,
        count: getCount(0),
        amount: getPrice(0),
      },
      bigRoofLuggageRack: {
        enabled: features[1].value,
        count: getCount(1),
        amount: getPrice(1),
      },
      carTrailers: {
        enabled: features[2].value,
        count: getCount(2),
        amount: getPrice(2),
      },
      motorbikeTrailers: {
        enabled: features[3].value,
        count: getCount(3),
        amount: getPrice(3),
      },
      smallRoofLuggageRack: {
        enabled: features[4].value,
        count: getCount(4),
        amount: getPrice(4),
      },
      skiRack: {
        enabled: features[5].value,
        count: getCount(5),
        amount: getPrice(5),
      },
      tintedWindows: features[6].value,
      tuned: features[7].value,
      convertible: features[8].value,
      extraTyre: {
        enabled: features[9].value,
        count: getCount(9),
        amount: getPrice(9),
      },
      backupCamera: features[10].value,
    };

    setRequestBody(body);
  }, [features, itemTotals]);

  const updateFields = async () => {
    try {
      setLoading(true);

      const hasFeatures = exteriorFeatures?.Vehicle;
      const api = `vehicles/${item?.id}/exterior-features${
        exteriorFeatures ? `/${exteriorFeatures?._id}` : ""
      }`;
      const method = hasFeatures ? put : post;

      const { data } = await method(api, requestBody);

      if (data?.success) {
        ToastMessage("Exterior Feature Updated", "success");
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
        label="Exterior Features"
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
        marginTop={-6}
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

export default ExteriorFeature;

const styles = StyleSheet.create({});

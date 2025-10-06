import React from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";

import ProductCard from "./molecules/ProductCard";
import MainCard from "./molecules/MainCard";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const TripHistory = () => {
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title="Trip History" />}
    >
      <CustomText
        label="Past Trips"
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={25}
      />
      <CustomText
        label="You don’t have any messages yet."
        lineHeight={14 * 1.4}
        color={COLORS.subtitle}
        marginTop={4}
        marginBottom={38}
      />
      {[1, 2, 3, 4].map((_, i) => (
        <MainCard
          key={i}
          borderBottomColor={i === 3 ? "transparent" : "#12121229"}
        />
      ))}

      <CustomButton
        title="See Earnings"
        fontFamily={fonts.medium}
        height={48}
        marginTop={-8}
        marginBottom={40}
        color={COLORS.black}
        backgroundColor="#1212120F"
      />
      {[1, 2, 3].map((_, i) => (
        <ProductCard key={i} />
      ))}
      <CustomButton
        title="Confirmer"
        fontFamily={fonts.medium}
        height={48}
        marginTop={28}
        fontSize={16}
        marginBottom={8}
      />
      <CustomButton
        title="Plus tard"
        fontFamily={fonts.medium}
        height={48}
        fontSize={16}
        marginBottom={20}
        backgroundColor="#1212120A"
        color={COLORS.black}
      />
    </ScreenWrapper>
  );
};

export default TripHistory;

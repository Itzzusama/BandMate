import React, { useState } from "react";
import { Image, View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthSlider from "../../../components/Auth/AuthSlider";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import Divider from "../../../components/Divider";
import { useNavigation, useRoute } from "@react-navigation/native";
import OptionSelector from "./molecules/OptionSelector";
import SwitchOption from "./molecules/SwitchOption";
import TimingDetails from "./molecules/TimingDetails";
import CustomInput from "../../../components/CustomInput";
import ErrorComponent from "../../../components/ErrorComponent";
import { Images } from "../../../assets/images";
import Icons from "../../../components/Icons";
import SelectionModal from "./molecules/SelectionModal";
import moment from "moment";
import { post } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";

const TicketDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const { formatted, media, eventData } = route?.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("currency");
  const [activeTicketIndex, setActiveTicketIndex] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [tickets, setTickets] = useState([
    {
      onlineTicketing: false,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,

      audience: "",
      ticketName: "",
      includeExtra: [],
      ticketDescription: "",
      ticketPrice: "",
      stock: "",
      setLimitOnPurchase: false,
      amountOneCanBuy: 0,

      nominal: false,
      refund: false,
      refundAmountPercentage: 0,
      refundPolicy: "No refund policy",
    },
  ]);
  const addTicket = () => {
    setTickets((prev) => [
      ...prev,
      {
        currency: "USD",

        onlineTicketing: false,
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,

        audience: "",
        ticketName: "",
        includeExtra: [],
        ticketDescription: "",
        ticketPrice: "",
        stock: "",
        setLimitOnPurchase: false,
        amountOneCanBuy: "",

        nominal: false,
        refund: false,
        refundAmountPercentage: "",
        refundPolicy: "",
      },
    ]);
  };

  const allData = async () => {
    setLoading(true);
    const apiPayload = {
      ticketing: {
        currency: currency,
        ticketsDetails: tickets,
        isDraft: false,
      },
      foodAndBeverages: formatted,
      media: media,
      ...eventData,
    };
    console.log("---->", apiPayload);
    try {
      const res = await post("events", apiPayload);
      if (res?.data?.success) {
        ToastMessage(res?.data?.message);
        navigation.navigate("TabStack", { screen: "Events" });
        setLoading(false);
      } else {
        ToastMessage(res?.data?.message);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const deleteTicket = (index) => {
    setTickets((prev) => prev.filter((_, i) => i !== index));
  };
  const updateTicket = (index, key, value) => {
    let formatted = value;

    if (key === "startDate" || key === "endDate") {
      formatted = moment(value).format("YYYY-MM-DD");
    }

    if (key === "startTime" || key === "endTime") {
      formatted = moment(value).format("HH:mm");
    }

    setTickets((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: formatted };
      return updated;
    });
  };
  const openModal = (type, index) => {
    setModalType(type);
    setActiveTicketIndex(index);
    setModalVisible(true);
  };
  const isTicketValid = (ticket) => {
    if (!ticket.audience) return false;
    if (!ticket.ticketName) return false;
    if (!ticket.ticketDescription) return false;
    if (!ticket.ticketPrice || isNaN(ticket.ticketPrice)) return false;
    if (!ticket.stock || isNaN(ticket.stock)) return false;

    if (
      ticket.setLimitOnPurchase &&
      (!ticket.amountOneCanBuy || isNaN(ticket.amountOneCanBuy))
    ) {
      return false;
    }

    if (ticket.refund) {
      if (
        !ticket.refundAmountPercentage ||
        isNaN(ticket.refundAmountPercentage)
      )
        return false;
      if (!ticket.refundPolicy) return false;
    }

    return true;
  };

  const isFormValid = () => {
    if (!currency) return false;
    return tickets.every(isTicketValid);
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <>
          <Header title={"New event"} />
          <View style={{ marginHorizontal: 12 }}>
            <AuthSlider
              min={3}
              max={3}
              gap={4}
              marginTop={8}
              marginBottom={7}
            />
          </View>
        </>
      )}
      footerUnScrollable={() => (
        <View style={{ marginBottom: 24 }}>
          <Divider
            thickness={4}
            marginTop={8}
            color={COLORS.inputBg}
            marginBottom={16}
          />
          <View style={{ paddingHorizontal: 12 }}>
            <CustomButton
              leftView={
                <Image
                  source={Images.plus}
                  style={{
                    height: 24,
                    width: 24,
                    resizeMode: "contain",
                    tintColor: COLORS.white,
                    marginRight: 10,
                  }}
                />
              }
              title="Add A New Ticket"
              borderRadius={12}
              backgroundColor={COLORS.cardColor}
              color={COLORS.white}
              onPress={addTicket}
            />
          </View>

          <Divider
            thickness={4}
            marginTop={16}
            color={COLORS.inputBg}
            marginBottom={0}
          />
          <View style={{ padding: 12 }}>
            <CustomButton
              title="Continue"
              marginBottom={8}
              onPress={allData}
              loading={loading}
              disabled={loading || !isFormValid()}
            />
            <CustomButton
              title="Save As Draft"
              backgroundColor={COLORS.cardColor}
              color={COLORS.white}
            />
          </View>
        </View>
      )}
      scrollEnabled
      paddingHorizontal={0.1}
    >
      <View style={{ marginHorizontal: 12 }}>
        <CustomText
          label={"Ticket Details"}
          fontSize={24}
          fontFamily={fonts.semiBold}
          lineHeight={24 * 1.4}
          marginTop={8}
        />
        <CustomText
          label={
            "Please inform your Tickets details as accurately as possible here below:"
          }
          fontSize={14}
          lineHeight={14 * 1.4}
          color={COLORS.white2}
          marginBottom={16}
        />
        <OptionSelector
          label={"CURRENCY"}
          placeHolder={"US Dollars"}
          value={currency}
          arrow="down"
          onPress={() => openModal("currency", 0)}
        />
      </View>
      <Divider
        thickness={4}
        marginTop={8}
        color={COLORS.inputBg}
        marginBottom={10}
      />
      {tickets.map((ticket, index) => (
        <View key={index} style={{ marginBottom: 12, paddingHorizontal: 12 }}>
          <CustomText
            label={`Date ${index + 1}`}
            fontSize={20}
            fontFamily={fonts.semiBold}
            marginBottom={10}
          />

          <SwitchOption
            lable="ONLINE TICKET"
            value={ticket.onlineTicketing}
            setValue={(val) => {
              const updated = [...tickets];
              updated[index].onlineTicketing = val;
              setTickets(updated);
            }}
            error="Attached to a specific user or individual."
          />

          <TimingDetails
            marginTop={4}
            marginBottom={14}
            startDate={
              ticket.startDate
                ? moment(ticket.startDate, "YYYY-MM-DD").toDate()
                : null
            }
            setStartDate={(val) => updateTicket(index, "startDate", val)}
            endDate={
              ticket.endDate
                ? moment(ticket.endDate, "YYYY-MM-DD").toDate()
                : null
            }
            setEndDate={(val) => updateTicket(index, "endDate", val)}
            startTime={
              ticket.startTime
                ? moment(ticket.startTime, "HH:mm").toDate()
                : null
            }
            setStartTime={(val) => updateTicket(index, "startTime", val)}
            endTime={
              ticket.endTime ? moment(ticket.endTime, "HH:mm").toDate() : null
            }
            setEndTime={(val) => updateTicket(index, "endTime", val)}
          />

          <OptionSelector
            label={"Audience"}
            placeHolder={"Kids"}
            value={ticket.audience}
            arrow="down"
            onPress={() => openModal("audience", index)}
          />

          <CustomInput
            withLabel={"ticket name"}
            placeholder={"Student"}
            value={ticket.ticketName}
            onChangeText={(txt) => {
              const updated = [...tickets];
              updated[index].ticketName = txt;
              setTickets(updated);
            }}
          />
          {ticket.onlineTicketing && (
            <OptionSelector
              label={"include extras"}
              arrow="forward"
              placeHolder={"Items"}
              value={
                ticket.includeExtra?.length
                  ? ticket.includeExtra.map((i) => i?.title).join(", ")
                  : ""
              }
              onPress={() =>
                navigation.navigate("FoodBeverage", {
                  selected: ticket.includeExtra,
                  onSave: (selectedItems) => {
                    const updated = [...tickets];
                    updated[index].includeExtra = selectedItems;
                    setTickets(updated);
                  },
                })
              }
            />
          )}

          <CustomInput
            withLabel={"Description"}
            placeholder={"Valid student ID required"}
            multiline
            height={160}
            value={ticket.ticketDescription}
            onChangeText={(txt) => {
              const updated = [...tickets];
              updated[index].ticketDescription = txt;
              setTickets(updated);
            }}
            maxLength={200}
          />
          <ErrorComponent
            errorTitle={`${
              ticket?.ticketDescription?.length || 0
            }/200 characters.`}
            marginBottom={8}
          />
          <CustomInput
            withLabel={"price"}
            placeholder={"$5200.00"}
            value={ticket.ticketPrice}
            onChangeText={(txt) => {
              const updated = [...tickets];
              updated[index].ticketPrice = txt;
              setTickets(updated);
            }}
          />

          <CustomInput
            withLabel={"stock available"}
            placeholder={"12"}
            value={ticket.stock}
            onChangeText={(txt) => {
              const updated = [...tickets];
              updated[index].stock = txt;
              setTickets(updated);
            }}
          />

          {/* Set Limit Switch */}
          <SwitchOption
            lable="SET LIMIT ON PURCHASE"
            value={ticket.setLimitOnPurchase}
            setValue={(val) => {
              const updated = [...tickets];
              updated[index].setLimitOnPurchase = val;
              setTickets(updated);
            }}
          />

          {ticket.setLimitOnPurchase && (
            <CustomInput
              withLabel={"SET AMOUNT ONE CAN BUY"}
              placeholder={"12"}
              value={ticket.amountOneCanBuy?.toString()} // show as string in UI
              onChangeText={(txt) => {
                const updated = [...tickets];
                updated[index].amountOneCanBuy = Number(txt); // ✅ force number
                setTickets(updated);
              }}
            />
          )}

          <SwitchOption
            lable="nominal"
            value={ticket.nominal}
            setValue={(val) => {
              const updated = [...tickets];
              updated[index].nominal = val;
              setTickets(updated);
            }}
          />

          <SwitchOption
            lable="DO YOU INCLUDE A REFUND POLICY"
            value={ticket.refund}
            setValue={(val) => {
              const updated = [...tickets];
              updated[index].refund = val;
              setTickets(updated);
            }}
          />

          {ticket.refund && (
            <>
              <CustomInput
                withLabel={"AMOUNT IN PERCENTAGE"}
                placeholder={"12%"}
                value={ticket.refundAmountPercentage?.toString()}
                onChangeText={(txt) => {
                  const updated = [...tickets];
                  updated[index].refundAmountPercentage = Number(txt);
                  setTickets(updated);
                }}
              />

              <CustomInput
                withLabel={"REFUND POLICY"}
                placeholder={"I have trip sickness and like.."}
                multiline
                height={160}
                value={ticket.refundPolicy}
                onChangeText={(txt) => {
                  const updated = [...tickets];
                  updated[index].refundPolicy = txt;
                  setTickets(updated);
                }}
              />
            </>
          )}
          {tickets.length > 1 && (
            <CustomButton
              title="Delete Ticket"
              backgroundColor="#EE10450A"
              onPress={() => deleteTicket(index)}
              borderRadius={12}
              marginTop={8}
              color={"#EE1045"}
              leftView={
                <Icons
                  family={"MaterialCommunityIcons"}
                  name={"delete-forever"}
                  color={"#EE1045"}
                  size={20}
                  style={{ marginRight: 8 }}
                />
              }
            />
          )}
        </View>
      ))}
      <SelectionModal
        isVisible={modalVisible}
        type={modalType}
        selected={
          modalType === "currency"
            ? tickets[0]?.currency
            : modalType === "audience"
            ? tickets[activeTicketIndex]?.audience
            : ""
        }
        onModalClose={() => setModalVisible(false)}
        onSelection={(value) => {
          if (modalType === "currency") {
            setCurrency(value);
          }

          if (modalType === "audience" && activeTicketIndex !== null) {
            const updated = [...tickets];
            updated[activeTicketIndex].audience = value;
            setTickets(updated);
          }

          setModalVisible(false);
        }}
      />
    </ScreenWrapper>
  );
};

export default TicketDetail;

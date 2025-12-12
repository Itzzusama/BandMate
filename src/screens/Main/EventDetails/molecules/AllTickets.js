import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useMemo, useEffect } from "react";
import TicketsHeading from "./TicketsHeading";
import TicketCard from "./TicketCard";
import CustomText from "../../../../components/CustomText";
import moment from "moment";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const AllTickets = ({ ticketing, id, onPayloadChange }) => {
  const ticketsDetail = ticketing?.ticketsDetails ?? [];

  const eventId = id;

  const dateOptions = useMemo(() => {
    const uniqueDates = Array.from(
      new Set(ticketsDetail.map((t) => t.startDate))
    );
    return uniqueDates.map((date, index) => {
      const ticketsForDate = ticketsDetail.filter((t) => t.startDate === date);
      const startTimes = ticketsForDate.map((t) => t.startTime).sort();
      const endTimes = ticketsForDate.map((t) => t.endTime).sort();
      return {
        id: index.toString(),
        date,
        startTime: startTimes[0],
        endTime: endTimes[endTimes.length - 1],
      };
    });
  }, [ticketsDetail]);

  const [selectedDateId, setSelectedDateId] = useState(
    dateOptions?.[0]?.id ?? null
  );

  const [quantities, setQuantities] = useState({});

  const filteredTickets = useMemo(() => {
    const selectedDate = dateOptions.find((d) => d.id === selectedDateId)?.date;
    return ticketsDetail.filter((t) => t.startDate === selectedDate);
  }, [selectedDateId, ticketsDetail, dateOptions]);

  const onIncrement = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const onDecrement = (id) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));

  // Update parent payload with all tickets for selected date
  const updateParentPayload = (updatedQty = quantities) => {
    const selectedDate = dateOptions.find((d) => d.id === selectedDateId)?.date;
    const ticketsPayload = ticketsDetail
      .filter((t) => t.startDate === selectedDate)
      .map((t) => ({
        date: t.startDate,
        ticket: t._id,
        quantity: updatedQty[t._id] || 0,
        startTime: t._startTime,
        endTime: t._endTime,
      }));

    const totalQuantity = ticketsPayload.reduce(
      (sum, t) => sum + t.quantity,
      0
    );
    const subTotal = ticketsPayload.reduce((sum, t) => {
      const ticket = ticketsDetail.find((td) => td._id === t.ticket);
      return sum + ticket.ticketPrice * t.quantity;
    }, 0);

    const payload = {
      eventId,
      totalQuantity,
      tickets: ticketsPayload,
      subTotal,
      discount: 0,
      finalPrice: subTotal,
      promoCode: "SUMMER10",
    };

    onPayloadChange?.(payload);
  };

  useEffect(() => {
    updateParentPayload();
  }, [selectedDateId, quantities]);

  const formatTo12Hour = (time) => {
    if (!time) return "";
    return moment(time, "HH:mm").format("hh:mm A");
  };

  return (
    <View>
      <TicketsHeading
        title="All Tickets"
        subTitle="Choose specific dates and ticket combinations"
      />

      {/* Date Selector */}
      <View style={styles.datesContainer}>
        <FlatList
          data={dateOptions}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 4, paddingRight: 12 }}
          renderItem={({ item }) => {
            const isActive = item.id === selectedDateId;
            return (
              <TouchableOpacity
                onPress={() => setSelectedDateId(item.id)}
                style={[
                  styles.dateBox,
                  { backgroundColor: isActive ? COLORS.white : COLORS.inputBg },
                ]}
              >
                <CustomText
                  label={moment(item.date).format("MMM DD, YYYY")}
                  color={isActive ? COLORS.black : COLORS.white}
                  textAlign="center"
                  fontSize={12}
                  fontFamily={fonts.medium}
                />
                <CustomText
                  label={`${formatTo12Hour(item.startTime)} - ${formatTo12Hour(
                    item.endTime
                  )}`}
                  color={isActive ? "#1212127A" : COLORS.white3}
                  textAlign="center"
                  fontSize={10}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Tickets List */}
      <View style={{ marginHorizontal: 12, marginTop: 12, marginBottom: 12 }}>
        {filteredTickets.map((t) => (
          <TicketCard
            key={t._id}
            title={t.ticketName}
            pricePerPerson={t.ticketPrice}
            subtitle={t.ticketDescription}
            note={t.includeExtra?.join(", ")}
            isSoldOut={t.stock <= 0}
            quantity={quantities[t._id] || 0}
            onIncrement={() => onIncrement(t._id)}
            onDecrement={() => onDecrement(t._id)}
            date={t.startDate}
            startTime={t.startTime}
            endTime={t.endTime}
          />
        ))}
      </View>
    </View>
  );
};

export default AllTickets;

const styles = StyleSheet.create({
  dateBox: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  datesContainer: {
    backgroundColor: COLORS.cardColor,
    padding: 4,
    borderRadius: 12,
    marginHorizontal: 12,
    justifyContent: "center",
  },
});

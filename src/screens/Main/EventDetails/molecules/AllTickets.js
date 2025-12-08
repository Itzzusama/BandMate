import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import TicketsHeading from "./TicketsHeading";
import TicketCard from "./TicketCard"; // ✅ make sure this is correct

const AllTickets = () => {
  const [quantities, setQuantities] = useState({
    adults: 2,
    children: 2,
  });

  const tickets = [
    {
      id: "adults",
      title: "Adults",
      pricePerPerson: 12,
      subtitle: "Grant you access to all the park",
      note: "Less than 5 left!",
      isSoldOut: false,
    },
    {
      id: "children",
      title: "Children",
      pricePerPerson: 12,
      subtitle: "Grant you access to all the park",

      isSoldOut: false,
    },
    {
      id: "group",
      title: "Adults Group Pack",
      pricePerPerson: 12,
      subtitle: "Grant you access to all the park",
      isSoldOut: true,
    },
  ];

  const handleIncrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  return (
    <View>
      <TicketsHeading
        title={"All Tickets"}
        subTitle={"Choose specific dates and ticket combinations"}
      />
      <View style={{ marginHorizontal: 12 }}>
        {tickets.map((item) => (
          <TicketCard
            key={item.id}
            title={item.title}
            pricePerPerson={item.pricePerPerson}
            subtitle={item.subtitle}
            note={item.note}
            isSoldOut={item.isSoldOut}
            quantity={quantities[item.id] || 0}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
          />
        ))}
      </View>
    </View>
  );
};

export default AllTickets;

const styles = StyleSheet.create({});

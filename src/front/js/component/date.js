import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Dates = () => {
  const { store, actions } = useContext(Context);

  const datesInput = [
    {
      div_class: "entry_date",
      label: "Entry date",
      id: "entry-date",
      name: "entryDate",
      value: store.entryDate,
      change: actions.handleEntry,
    },
    {
      div_class: "checkout_date",
      label: "Checkout date",
      id: "checkout-date",
      name: "checkoutDate",
      value: store.checkOutDate,
      change: actions.handleCheckOut,
    },
  ];

  const dates_input = datesInput.map((item, index) => {
    return (
      <div key={index} className={item.div_class}>
        <label>{item.label}</label>
        <input
          className="border-style-two"
          type="date"
          id={item.id}
          name={item.name}
          onChange={item.change}
          value={item.value}
        />
      </div>
    );
  });

  return dates_input;
};

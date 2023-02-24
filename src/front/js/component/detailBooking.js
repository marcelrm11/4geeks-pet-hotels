import React, { useState } from "react";
import { Button } from "./button";

export const DetailBooking = ({ details }) => {
  const [dates, setDates] = useState([
    {
      label: "Entry date",
      name: "entryDate",
      id: "booking-entry-date",
    },
    {
      label: "Checkout date",
      name: "checkoutDate",
      id: "booking-checkout-date",
    },
  ]);

  const bookingDates = dates.map((item, index) => {
    return (
      <div key={index} className="d-flex txt-start dates_div detail_entry">
        <label>{item.label}</label>
        <input
          className="bg-lighter-blue border-style-two one-pad"
          type="date"
          id={item.id}
          name={item.name}
        />
      </div>
    );
  });

  return (
    <>
      <div className="place_details_booking rd-1 bg-turquoise white_letter one-pad ">
        <div>
          <div className="detail_dates_container">
            <h5>Dates:</h5>
            {bookingDates}
          </div>
          <div className="detail_services">
            <h5>Booked services:</h5>
            <p>{details.services}</p>
          </div>
          <hr />
          <div className="detail_price d-flex">
            <p>Total (EUR)</p>
            <p>1500</p>
          </div>
          <Button buttonClass="red_Btn mg-cero">
            <span className="white_letter">Reserve</span>
          </Button>
        </div>
      </div>
    </>
  );
};

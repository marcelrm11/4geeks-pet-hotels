import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import moment from "moment";
import { Button } from "./button";
import { Dates } from "./date";

export const DetailBooking = ({ details }) => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="place_details_booking rd-1 bg-turquoise white_letter one_pad ">
        <div>
          <div className="detail_dates_container">
            <h5>Dates:</h5>
            <Dates />
            <p className="font-s">
              {store.differenceInDays ? store.differenceInDays + " nights" : ""}
            </p>
          </div>
          <div className="detail_services">
            <h5>Booked services:</h5>
            <p>{details.services}</p>
          </div>
          <hr />
          <div className="detail_price d-flex">
            <p>Total (EUR)</p>
            <p>{parseInt(details.price) * store.differenceInDays}</p>
          </div>
          <Button buttonClass="red_Btn mg-cero">
            <span className="white_letter">Reserve</span>
          </Button>
        </div>
      </div>
    </>
  );
};

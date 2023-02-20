import React from "react";
import { Button } from "./button";

export const DetailBooking = ({ details }) => {
  return (
    <>
      <div className="place_details_booking white_letter">
        <div>
          <div className="detail_dates_container">
            <h5>Dates:</h5>
            <div className="dates_div detail_entry">
              <label>Llegada</label>
              <input type="date" id="fecha-entrada" name="fecha-entrada" />
            </div>

            <div className="dates_div detail_checkout">
              <label>Salida</label>
              <input type="date" id="fecha-salida" name="fecha-salida" />
            </div>
          </div>
          <div className="detail_services">
            <h5>Booked services:</h5>
            <p>{details.services}</p>
          </div>
          <hr />
          <div className="detail_price">
            <p>Total (EUR)</p>
            <p>1500</p>
          </div>
          <Button buttonClass="general_button red_Btn reserve_btn">
            <span className="white_letter">Reserve</span>
          </Button>
        </div>
      </div>
    </>
  );
};

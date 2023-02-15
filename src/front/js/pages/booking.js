import React from "react";
import BookingSubmit from "../component/bookingSbmit";
import { Button } from "../component/button";

const Booking = () => {
  return (
    <>
      <div className="booking_container">
        <div className="preSubmmit_section">
          <h1>Enviar reserva</h1>
          <h2>Tu reserva</h2>
          <hr />
          <h2>Nombre del alojamiento</h2>
          <h2>Fecha</h2>
          <h2>Mascota</h2>
          <hr />
          <Button buttonClass="log-btn access_btn">
            <span className="log_color">Sign up</span>
          </Button>
          <div className="submit_space"></div>
        </div>
        <div className="bookingSub_section">
          <BookingSubmit />
        </div>
      </div>
    </>
  );
};

export default Booking;

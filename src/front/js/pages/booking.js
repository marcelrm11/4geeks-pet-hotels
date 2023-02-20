import React, { useContext } from "react";
import BookingSubmit from "../component/bookingSbmit";
import { Button } from "../component/button";
import "../../styles/booking.css";
import { Context } from "../store/appContext";
import { useParams } from "react-router";

export const Booking = () => {

  const { store, actions } = useContext(Context)

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
          <Button buttonClass="red_Btn general_button">
            <span className="white_letter">Reserve</span>
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

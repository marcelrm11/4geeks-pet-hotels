import React, { useContext } from "react";
import BookingSubmit from "../component/bookingSbmit";
import { Button } from "../component/button";
import "../../styles/booking.css";
import { Context } from "../store/appContext";
import { useParams } from "react-router";

export const Booking = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="d_flex_col">
        <div className="preSubmmit_section">
          <h1>Enviar reserva</h1>
          <h2 className="font-s">Tu reserva</h2>
          <hr />
          <h2>Nombre del alojamiento</h2>
          <h2>Fecha</h2>
          <h2>Mascota</h2>
          <hr />
          <Button buttonClass="red_Btn">
            <span className="white_letter">Reserve</span>
          </Button>
          <div className="submit_space"></div>
        </div>
        <div className="bookingSub_section bg-darkBlue white_letter d_flex_col">
          <BookingSubmit />
        </div>
      </div>
    </>
  );
};

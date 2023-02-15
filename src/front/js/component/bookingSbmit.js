import React from "react";
import labrador from "../../img/labrador.jpg";

const BookingSubmit = () => {
  return (
    <>
      <div className="bookingSub_header">
        <img src={labrador} alt="hotel presentation image" />
        <div className="bookingSub_info_header">
          <p>Nombre</p>
          <p>4.8</p>
        </div>
      </div>
      <hr />
      <hr />
      <div className="bookingSub_info_body">
        <h2>Detalles de la reserva</h2>
        <p>Nombre del alojamiento</p>
        <p>Dirección del alojamiento</p>
        <p>Fecha de entrada y salida</p>
        <p>Tipo de mascota</p>
      </div>
      <hr />
      <div className="bookingSub_info_footer">
        <p>Total euros</p>
        <p>300€</p>
      </div>
    </>
  );
};

export default BookingSubmit;

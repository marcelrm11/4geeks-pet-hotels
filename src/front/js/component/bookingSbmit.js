import React from "react";
import labrador from "../../img/labrador.jpg";

const BookingSubmit = () => {
  return (
    <>
      <div className="w-100 d-flex">
        <img
          className="bookingSub_img"
          src={labrador}
          alt="hotel presentation image"
        />
        <div className="bookingSub_info_header w-100 font-xs d_flex_col">
          <p>Nombre</p>
          <p>4.8</p>
        </div>
      </div>
      <hr />
      <hr />
      <div className="pd-o-h w-100">
        <h2>Detalles de la reserva</h2>
        <p>Nombre del alojamiento</p>
        <p>Dirección del alojamiento</p>
        <p>Fecha de entrada y salida</p>
        <p>Tipo de mascota</p>
      </div>
      <hr />
      <div className="d-flex w-100 pd-o-h">
        <p>Total euros</p>
        <p>300€</p>
      </div>
    </>
  );
};

export default BookingSubmit;

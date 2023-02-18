import React from "react";
import cobaya from "../../img/cobaya.png";

export const PlaceDetailsSearch = ({ details, overallRating }) => {
  return (
    <div className="place_detail_info_section">
      <figure className="place_detail_img">
        <img src={cobaya} alt="" />
      </figure>
      <div>
        <p>{overallRating}</p>
      </div>
      <div className="place_details_booking">
        <div className="">
          <div className="">
            <label>Llegada</label>
            <input type="date" id="fecha-entrada" name="fecha-entrada" />
          </div>

          <div className="">
            <label>Salida</label>
            <input type="date" id="fecha-salida" name="fecha-salida" />
          </div>
        </div>
        <div className="">
          <p>Booked services:</p>
        </div>
        <div className="">
          <p>Total (EUR)</p>
          <p>1500</p>
        </div>
      </div>
    </div>
  );
};

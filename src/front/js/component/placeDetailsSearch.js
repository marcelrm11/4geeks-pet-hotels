import React from "react";
import cobaya from "../../img/cobaya.png";
import { DetailBooking } from "./detailBooking";
import { HotelBasicInfo } from "../component/hotelBasicInfo";

export const PlaceDetailsSearch = ({ details, overallRating }) => {
  return (
    <div className="place_detail_info_section">
      <figure className="place_detail_img">
        <img src={cobaya} alt="" />
      </figure>
      <div>
        <p>{overallRating}</p>
      </div>
      <section className="information_section">
        <div className="hotel_detail_preBooking">
          <DetailBooking details={details} />
        </div>
        <div className="hotel_detail_information">
          <HotelBasicInfo
            name={details.name}
            address={details.location}
            phone={details.phone_number}
            email={details.email}
          />
        </div>
      </section>
    </div>
  );
};

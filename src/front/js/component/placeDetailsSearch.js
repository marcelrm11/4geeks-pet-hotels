import React from "react";
import cobaya from "../../img/cobaya.png";
import { DetailBooking } from "./detailBooking";
import { HotelBasicInfo } from "../component/hotelBasicInfo";

export const PlaceDetailsSearch = ({ details, overallRating }) => {
  return (
    <div className="place_detail_info_section">
      <div className="hotel_details_images">
        <figure className="place_detail_img">
          <img src="https://picsum.photos/200" alt="" />
        </figure>
        <figure className="more_detail_images">
          <img src="https://picsum.photos/200" alt="hotel_images_1" />
          <img src="https://picsum.photos/200" alt="hotel_images_2" />
        </figure>
      </div>
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

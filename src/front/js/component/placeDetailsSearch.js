import React from "react";
import cobaya from "../../img/cobaya.png";
import { DetailBooking } from "./detailBooking";
import { HotelBasicInfo } from "../component/hotelBasicInfo";

export const PlaceDetailsSearch = ({ details, overallRating }) => {
  return (
    <div className=" w-100 d_flex_col">
      <div className="hotel_details_images w-100 d_flex_row">
        <figure className="place_detail_img">
          <img className="w-100" src="https://picsum.photos/200" alt="" />
        </figure>
        <figure className="more_detail_images">
          <img src="https://picsum.photos/200" alt="hotel_images_1" />
          <img src="https://picsum.photos/200" alt="hotel_images_2" />
        </figure>
      </div>
      <div> 
        <p>{overallRating}</p>
      </div>
      <section className="information_section d-flex one-pad">
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

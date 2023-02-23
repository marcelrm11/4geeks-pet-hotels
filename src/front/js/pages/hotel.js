import React, { useContext, useState, useEffect } from "react";
import "../../styles/hoteldetail.css";
import { Context } from "../store/appContext";
import { useLocation } from "react-router";
import { HotelServices } from "../component/hotelServices";
import { HotelDescription } from "../component/hotelDescription";
import { HotelReviews } from "../component/hotelReviews";
import { PlaceDetailsSearch } from "../component/placeDetailsSearch";
import { Button } from "../component/button";
import { Link } from "react-router-dom";

export const Hotel = () => {
  const { store, actions } = useContext(Context);
  const [details, setDetails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const location = useLocation();
  console.log(location);
  // console.log(photos)
  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api${location.pathname}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        setReviews(data.reviews);
        setOverallRating(data.reviews.map((rev) => rev.rating));
      });
  }, []);

  const services = () => {
    let servicesList = `${details.services}`;
    let splitList = servicesList.replace(/,\s+/g, ",").split(",");
    return splitList;
  };

  return (
    <div className="text-center mt-5">
      <h1 className="hotel_details_section">{`${details.name}`}</h1>
      <div className="flex-container">
        <div className="component1">
          <PlaceDetailsSearch details={details} overallRating={overallRating} />
        </div>
        <div className="w-100 d_flex_col">
          <h2>Services</h2>
          <div className="detail_services_section w-100 d-flex">
            {services().map((service, index) => {
              return <HotelServices key={index} service={service} />;
            })}
          </div>
        </div>
      </div> 
      <HotelDescription
        name={details.name}
        description={details.hotel_description}
      />
      <Button buttonClass="red_Btn hotel_detail_btn">
        <Link to="/booking">
          <span className="white_letter">Reserve</span>
        </Link>
      </Button>
      <h5 className="reviewStar">
        Reviews
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </h5>
      {reviews.map((review) => {
        return <HotelReviews review={review} />;
      })}
    </div>
  );
};

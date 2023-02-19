import React, { useContext, useState, useEffect } from "react";
import "../../styles/hoteldetail.css";
import { Context } from "../store/appContext";
import { useLocation, useParams } from "react-router";
import { HotelServices } from "../component/hotelServices";
import { HotelDescription } from "../component/hotelDescription";
import { HotelReviews } from "../component/hotelReviews";
import { PlaceDetailsSearch } from "../component/placeDetailsSearch";
import { Button } from "../component/button";

export const Hotel = () => {
  const { store, actions } = useContext(Context);
  const [details, setDetails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const location = useLocation();
  const { id } = useParams();
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
      <h1 className="hotel_details_section">{`Hotel details`}</h1>
      <div className="flex-container">
        <div className="component1">
          <PlaceDetailsSearch details={details} overallRating={overallRating} />
        </div>
        <div className="component2">
          <h2>Services</h2>
          <div className="detail_services_section">
            {services().map((service) => {
              return <HotelServices service={service} />;
            })}
          </div>
        </div>
      </div>
      <HotelDescription description={details.hotel_description} />
      <Button buttonClass="log-btn access_btn hotel_detail_btn">
        <span className="log_color">Reserve</span>
      </Button>
      <h5>
        Reviews
        <i className="fa-solid fa-star reviewStar"></i>
        <i className="fa-solid fa-star reviewStar"></i>
        <i className="fa-solid fa-star reviewStar"></i>
        <i className="fa-solid fa-star reviewStar"></i>
      </h5>
      {reviews.map((review) => {
        return <HotelReviews review={review} />;
      })}
    </div>
  );
};

import React, { useContext, useState, useEffect } from "react";
import "../../styles/hoteldetail.css";
import { Context } from "../store/appContext";
import { useLocation } from "react-router";
import { HotelServices } from "../component/hotelServices";
import { HotelDescription } from "../component/hotelDescription";
import { PlaceDetailsSearch } from "../component/placeDetailsSearch";

export const Hotel = () => {
  const { store, actions } = useContext(Context);
  const [details, setDetails] = useState(undefined);
  const location = useLocation();
  console.log("location", location);
  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/api${location.pathname}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDetails(data);
      });
  }, []);

  const services = () => {
    let servicesList = details.services;
    let splitList = servicesList.replace(/,\s+/g, ",").split(",");
    return splitList;
  };

  return (
    <div className="text-center mt-5">
      {details == undefined ? (
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <h1 className="hotel_details_section">{details.name}</h1>
          <div className="flex-container">
            <div className="component1">
              <PlaceDetailsSearch details={details} />
            </div>
            <div className="w-100 d_flex_col mg-4 mb-5">
              <h2>Accepted animals</h2>
              <div className="detail_services_section w-100 d-flex">
                {details.pet_type.split(",").map((pet) => {
                  return <HotelServices key={pet} service={pet} />;
                })}
              </div>
            </div>
            <div className="w-100 d_flex_col mg-4 mb-5">
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
        </>
      )}
    </div>
  );
};

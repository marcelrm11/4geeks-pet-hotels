import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";
import HotelCard from "../component/hotelCard";
import HotelListingSearch from "../component/hotelListingSearch";
import { Context } from "../store/appContext";
import "../../styles/hotelListing.css";

export const HotelListing = () => {
  const { store, actions } = useContext(Context);

  useEffect(actions.listing, []);

  const hotelsInfo = store.hotels.map((hotel, index) => {
    return <HotelCard hotel={hotel} key={index} index={index} />;
  });

  if (store.loading) return <h1>Loading</h1>;

  return (
    <div className="listing_section">
      <HotelListingSearch />
      <div className="hotel_listing_container">{hotelsInfo}</div>
    </div>
  );
};

import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";
import HotelCard from "../component/hotelCard";
import HotelListingSearch from "../component/hotelListingSearch";
import { Context } from "../store/appContext";

export const HotelListing = () => {
  const { store } = useContext(Context);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const listing = async () => {
    await fetch(process.env.BACKEND_URL + "/api/hotels")
      .then((response) => response.json())
      .then((data) => setHotels(data.hotels));
    setLoading(false);
  };

  useEffect(() => {
    listing();
  }, []);

  if (loading) return <h1>loading</h1>;

  console.log(hotels);

  const hotelsInfo = hotels.map((hotel, index) => {
    return <HotelCard hotel={hotel} key={index} index={index} />;
  });

  return (
    <div className="listing_section">
      <HotelListingSearch />
      <div className="hotel_listing_container">{hotelsInfo}</div>
    </div>
  );
};

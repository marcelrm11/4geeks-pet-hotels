import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";
import HotelCard from "../component/hotelCard";
import HotelListingSearch from "../component/hotelListingSearch";
import { Context } from "../store/appContext";
import "../../styles/hotelListing.css";

export const HotelListing = () => {
  const { store, actions } = useContext(Context);
  const [entryDate, setEntryDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    petTypes: {
      dog: false,
      cat: false,
      rodent: false,
      bird: false,
      others: false,
    },
    entryDate: "",
    checkOutDate: "",
    country: "select-country",
  });

  useEffect(() => actions.listing(), []);

  const handleChange = (e) => {
    setSearchFilters({ ...searchFilters, [e.target.name]: [e.target.value] });
  };

  const handleClick = (e) => {
    e.preventDefault();
    actions.listing(searchFilters);
  };

  const handleEntry = (e) => {
    setSearchFilters({
      ...searchFilters.entryDate,
      [e.target.name]: e.target.value,
    });
    setEntryDate({
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckOut = (e) => {
    setSearchFilters({
      ...searchFilters.checkoutDate,
      [e.target.name]: e.target.value,
    });
    setCheckOutDate({
      [e.target.name]: e.target.value,
    });
  };

  const handlePetTypeChange = (ev) => {
    const pet = ev.target.value;
    const updatedPetTypes = {
      ...searchFilters.petTypes,
      [pet]: !searchFilters.petTypes[pet],
    };
    setSearchFilters({ ...searchFilters, petTypes: updatedPetTypes });
  };

  const hotelsInfo = store.hotels.map((hotel, index) => {
    return <HotelCard hotel={hotel} key={index} index={index} />;
  });

  if (store.loading) return <h1>Loading</h1>;

  return (
    <div className="listing_section dp-grid font-xs dp-g-center">
      <HotelListingSearch
        entryDate={entryDate}
        checkOutDate={checkOutDate}
        onEntry={handleEntry}
        onCheackOut={handleCheckOut}
        onPetChange={handlePetTypeChange}
        filters={searchFilters}
        onChange={handleChange}
        onClick={(e) => handleClick(e, searchFilters)}
      />
      <div className="hotel_listing_container dp-grid-o-cl dp-g-center">
        {hotelsInfo}
      </div>
    </div>
  );
};

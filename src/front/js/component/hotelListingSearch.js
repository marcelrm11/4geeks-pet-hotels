import React from "react";
import { Button } from "../component/button";

const HotelListinSearch = () => {
  return (
    <div className="hotelListing_search_bar">
      <div>
        <label>Pet Type </label>
        <div className="radio_inputs">
          <div className="radio_input_container">
            <input
              className="radio_type_input"
              type="radio"
              id="dog"
              name="pet-type"
              value="dog"
            />
            <label>Dog</label>
          </div>

          <div className="radio_input_container">
            <input
              className="radio_type_input"
              type="radio"
              id="cat"
              name="pet-type"
              value="cat"
            />
            <label>Cat</label>
          </div>

          <div className="radio_input_container">
            <input
              className="radio_type_input"
              type="radio"
              id="rodent"
              name="pet-type"
              value="rodent"
            />
            <label>Rodent</label>
          </div>

          <div className="radio_input_container">
            <input
              className="radio_type_input"
              type="radio"
              id="bird"
              name="pet-type"
              value="bird"
            />
            <label>Bird</label>
          </div>

          <div className="radio_input_container">
            <input
              className="radio_type_input"
              type="radio"
              id="otros"
              name="pet-type"
              value="otros"
            />
            <label>Others</label>
          </div>
        </div>
      </div>
      <div className="listing_date_input">
        <div className="entry_date">
          <label>Entry date</label>
          <input type="date" id="fecha-entrada" name="fecha-entrada" />
        </div>

        <div className="checkout_date">
          <label>Checkout date</label>
          <input type="date" id="fecha-salida" name="fecha-salida" />
        </div>
      </div>
      <div className="home_search_bar date">
        <label>Search</label>
        <input className="home_search_input" type="text" placeholder="Search" />
        <Button buttonClass="general_button search_btn red_Btn">
          <span className="white_letter">Search</span>
        </Button>
      </div>
    </div>
  );
};

export default HotelListinSearch;

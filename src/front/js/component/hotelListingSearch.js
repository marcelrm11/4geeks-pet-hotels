import React, { useContext } from "react";
import { Button } from "../component/button";
import { CustomSelect } from "./customSelect";
import { Context } from "../store/appContext";

const HotelListinSearch = ({ filters, onChange, onClick }) => {
  const { store } = useContext(Context);
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
              name="petTypes"
              value="dog"
            />
            <label>Dog</label>
          </div>

          <div className="radio_input_container">
            <input
              className="radio_type_input"
              type="radio"
              id="cat"
              name="petTypes"
              value="cat"
            />
            <label>Cat</label>
          </div>

          <div className="radio_input_container">
            <input
              className="radio_type_input"
              type="radio"
              id="rodent"
              name="petTypes"
              value="rodent"
            />
            <label>Rodent</label>
          </div>

          <div className="radio_input_container">
            <input
              className="radio_type_input"
              type="radio"
              id="bird"
              name="petTypes"
              value="bird"
            />
            <label>Bird</label>
          </div>

          <div className="radio_input_container">
            <input
              className="radio_type_input"
              type="radio"
              id="otros"
              name="petTypes"
              value="otros"
            />
            <label>Others</label>
          </div>
        </div>
      </div>
      <div className="listing_date_input">
        <div className="entry_date">
          <label>Entry date</label>
          <input
            type="date"
            id="fecha-entrada"
            name="entryDate"
            onChange={onChange}
            value={filters.entryDate}
          />
        </div>

        <div className="checkout_date">
          <label>Checkout date</label>
          <input
            type="date"
            id="fecha-salida"
            name="checkoutDate"
            onChange={onChange}
            value={filters.checkoutDate}
          />
        </div>
      </div>
      <div className="home_search_bar date">
        <label>Country</label>
        <CustomSelect
          name="country"
          onChange={onChange}
          required={false}
          defaultOption="select-country"
          value={filters.country}
          list={store.countryList}
        >
          Select a country
        </CustomSelect>
        <Button
          buttonClass="general_button search_btn red_Btn"
          onClick={onClick}
        >
          <span className="white_letter">Apply Filters</span>
        </Button>
      </div>
    </div>
  );
};

export default HotelListinSearch;

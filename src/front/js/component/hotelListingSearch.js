import React, { useContext, useState } from "react";
import { CustomSelect } from "./customSelect";
import { Context } from "../store/appContext";
import { Button } from "./button";
import { Dates } from "./date";

const HotelListinSearch = ({ filters, onChange, onClick, onPetChange }) => {
  const { store } = useContext(Context);

  const checkInput = ["dog", "cat", "rodent", "bird", "others"];

  const petsInput = checkInput.map((item, index) => {
    return (
      <div key={index} className="radio_input_container">
        <input
          className="radio_type_input round_border d_flex_row"
          type="checkbox"
          id={item}
          name="petTypes"
          value={item}
          onChange={onPetChange}
        />
        <label>{item}</label>
      </div>
    );
  });

  return (
    <div className="align-items-start hotelListing_search_bar d_flex_col one_pad mg-1 bg-lighter-blue">
      <div>
        <label>Pet Type </label>
        <div className="d-flex w-100">{petsInput}</div>
      </div>
      <div className="listing_date_input dp-grid"></div>
      <div className="align-items-start home_search_bar d_flex_col date">
        <Dates />
        <p className="red_bg">
          {store.differenceInDays ? store.differenceInDays + " nights" : ""}
        </p>
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

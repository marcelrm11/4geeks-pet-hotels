import React, { useContext, useState } from "react";
import { CustomSelect } from "./customSelect";
import { Context } from "../store/appContext";
import { Button } from "./button";

const HotelListinSearch = ({
  filters,
  onChange,
  onClick,
  onPetChange,
  onCheackOut,
  onEntry,
  entryDate,
  checkOutDate
}) => {
  const { store } = useContext(Context);

  const checkInput = ["dog", "cat", "rodent", "bird", "others"];
  const datesInput = [
    {
      div_class: "entry_date",
      label: "Entry date",
      id: "entry-date",
      name: "entryDate",
      value: entryDate,
      change: onEntry,
    },
    {
      div_class: "checkout_date",
      label: "Checkout date",
      id: "checkout-date",
      name: "checkoutDate",
      value: checkOutDate,
      change: onCheackOut,
    },
  ];

  const dates_input = datesInput.map((item, index) => {
    return (
      <div key={index} className={item.div_class}>
        <label>{item.label}</label>
        <input
          className="border-style-two"
          type="date"
          id={item.id}
          name={item.name}
          onChange={item.change}
          value={item.value}
        />
      </div>
    );
  });

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
        {dates_input}
        <p>days</p>
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

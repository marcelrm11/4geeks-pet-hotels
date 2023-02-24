import React, { useContext, useState } from "react";
import { CustomSelect } from "./customSelect";
import { Context } from "../store/appContext";

const HotelListinSearch = ({ filters, onChange, onClick }) => {
  const { store } = useContext(Context);

  const [checkInput, setCheckInput] = useState(["dog", "cat", "rodent", "bird", "others"]);
  const [datesInput, setDatesInput] = useState([
    {
      div_class: "entry_date",
      label: "Entry date",
      id: "entry-date",
      name: "entryDate",
      value: filters.entryDate,
    },
    {
      div_class: "checkout_date",
      label: "Checkout date",
      id: "checkout-date",
      name: "checkoutDate",
      value: filters.checkoutDate,
    },
  ]);

  const dates_input = datesInput.map((item, index) => {
    return (
      <div key={index} className={item.div_class}>
        <label>{item.label}</label>
        <input
          className="border-style-two"
          type="date"
          id={item.id}
          name={item.name}
          onChange={onChange}
          value={item.value}
        />
      </div>
    );
  });

  const petsInput = checkInput.map((item, index) => {
    console.log(item);
    return (
      <div key={index} className="radio_input_container">
        <input
          className="radio_type_input round_border d_flex_row"
          type="checkbox"
          id={item}
          name="pet_type"
          value={item}
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

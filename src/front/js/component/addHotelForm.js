import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Button } from "./button";
import { Image } from "./image";
import cobayita from "../../img/cobaya.png";

export const AddHotelData = ({
  hotelData,
  handleChange,
  handleValidate,
  handlePetType,
  handleServices,
}) => {
  const { store, actions } = useContext(Context);

  const servicesInputs = [
    "Overnight",
    "Daycare",
    "Walking",
    "Veterinarian",
    "Transportation",
    "Training",
    "more",
  ];

  const petsInput = store.checkInput.map((item, index) => {
    return (
      <div key={index} className="radio_input d_flex_col ">
        <input
          className="radio_type_input d_flex_col round_border"
          type="checkbox"
          id={item}
          name="pet_type"
          value={item}
          onChange={(e) => {
            handlePetType(e);
          }}
        />
        <label>{item}</label>
      </div>
    );
  });

  const services = servicesInputs.map((item, index) => {
    return (
      <div key={index} className="radio_input services_input d_flex_col ">
        <input
          className="radio_type_input d_flex_col round_border"
          type="checkbox"
          id={item}
          name="pet_type"
          value={item}
          onChange={(e) => {
            handleServices(e);
          }}
        />
        <label>{item}</label>
      </div>
    );
  });
  // const services = (
  //   <select
  //     name="services"
  //     className="py-0"
  //     onChange={handleServices}
  //     value={services}
  //     multiple
  //   >
  //     {servicesInputs.map((s) => (
  //       <option key={s}>{s}</option>
  //     ))}
  //   </select>
  // );

  const handleClick = (e, hotelData) => {
    e.preventDefault();
    if (handleValidate(e, hotelData)) {
      actions.handleAddHotelData(hotelData);
    } else {
      console.log("validation error");
    }
  };

  return (
    <form className="add_hotel_form">
      <div className="add_hotel_image">
        <Image
          className="signUp_image"
          figureClass="signup_img-container add_hotel_img"
          src={cobayita}
          altText="logo"
        />
      </div>
      <div className="add_hotel_div">
        <h1>Add Hotel</h1>
        <div>
          <div className="text_inputs_container dp-grid-o-cl gp-o border-style-two">
            {Object.entries(hotelData).map(([field, value]) => {
              if (!["hotel_owner_id", "pet_type", "services"].includes(field)) {
                return (
                  <React.Fragment key={field}>
                    {field === "hotel_description" ? (
                      <div>
                        <textarea
                          id={field}
                          name={field}
                          rows="6"
                          cols="21"
                          placeholder="Write a short description of your facilities"
                          value={value}
                          onChange={handleChange}
                        />
                      </div>
                    ) : (
                      <div>
                        <Input
                          type={field === "email" ? "email" : "text"}
                          id={field}
                          placeholder={
                            field.includes("pet_type")
                              ? actions.removeUnderscores(
                                  actions.capitalize("Select admited pets")
                                )
                              : field.includes("location")
                              ? actions.removeUnderscores(
                                  actions.capitalize("Address")
                                )
                              : actions.removeUnderscores(
                                  actions.capitalize(field)
                                )
                          }
                          value={value}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                    {store.errors[field] && <p>{store.errors[field]}</p>}
                  </React.Fragment>
                );
              }
            })}
          </div>
          <div>
            <div>
              <div className="pet_type_input_container d_flex_col ">
                <label className="d_flex_row">Pet Type </label>
                <div className="dp-grid-t-cl gp-o pet_type_checkbox w-100 one_pad">
                  {petsInput}
                </div>
              </div>
              <div className="pet_type_input_container d_flex_col ">
                <label className="d_flex_row">Services </label>
                <div className="dp-grid-t-cl gp-o pet_type_checkbox services_checkbox w-100 one_pad">
                  {services}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="add_hotel_btn_section ">
          <Button
            buttonClass="red_Btn addHotel_form_submit"
            onClick={(e) => handleClick(e, hotelData)}
          >
            <span className="white_letter">Add hotel</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

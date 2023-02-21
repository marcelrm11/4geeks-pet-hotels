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
}) => {
  const { store, actions } = useContext(Context);

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
      <div>
        <h1>Add Hotel</h1>
        <div>
          <div className="text_inputs_container">
            {Object.entries(hotelData).map(([field, value]) => {
              return (
                <React.Fragment key={field}>
                  <Input
                    type={field.includes("email") ? "email" : "text"}
                    id={field}
                    placeholder={actions.removeUnderscores(
                      actions.capitalize(field)
                    )}
                    value={value}
                    onChange={handleChange}
                    required
                  />
                  {store.errors[field] && <p>{store.errors[field]}</p>}
                </React.Fragment>
              );
            })}
          </div>
          <div>
            <div>
              <div className="pet_type_input_container">
                <label>Pet Type </label>
                <div className="radio_inputs_container">
                  <div className="radio_input">
                    <input
                      className="radio_type_input"
                      type="checkbox"
                      id="dog"
                      name="pet_type"
                      value="dog"
                      onChange={(e) => {
                        handlePetType(e);
                      }}
                    />
                    <label>Dog</label>
                  </div>

                  <div className="radio_input">
                    <input
                      className="radio_type_input"
                      type="checkbox"
                      id="cat"
                      name="pet_type"
                      value="cat"
                      onChange={(e) => {
                        handlePetType(e);
                      }}
                    />
                    <label>Cat</label>
                  </div>

                  <div className="radio_input">
                    <input
                      className="radio_type_input"
                      type="checkbox"
                      id="rodent"
                      name="pet_type"
                      value="rodent"
                      onChange={(e) => {
                        handlePetType(e);
                      }}
                    />
                    <label>Rodent</label>
                  </div>

                  <div className="radio_input">
                    <input
                      className="radio_type_input"
                      type="checkbox"
                      id="bird"
                      name="pet_type"
                      value="bird"
                      onChange={(e) => {
                        handlePetType(e);
                      }}
                    />
                    <label>Bird</label>
                  </div>

                  <div className="radio_input">
                    <input
                      className="radio_type_input"
                      type="checkbox"
                      id="others"
                      name="pet_type"
                      value="others"
                      onChange={(e) => {
                        handlePetType(e);
                      }}
                    />
                    <label>Others</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn_container add_hotel_btn_section ">
          <Button
            buttonClass="general_button red_Btn addHotel_form_submit"
            onClick={handleValidate}
          >
            <span className="white_letter">Add hotel</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

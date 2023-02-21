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
    <form className="add_hotel_form" onSubmit={handleValidate}>
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
                    type={
                      field.includes("photo")
                        ? "file"
                        : field.includes("email")
                        ? "email"
                        : "text"
                    }
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
                      type="radio"
                      id="dog"
                      name="pet_type"
                      value="dog"
                      onChange={handlePetType}
                    />
                    <label>Dog</label>
                  </div>

                  <div className="radio_input">
                    <input
                      className="radio_type_input"
                      type="radio"
                      id="cat"
                      name="pet_type"
                      value="cat"
                      onChange={handlePetType}
                    />
                    <label>Cat</label>
                  </div>

                  <div className="radio_input">
                    <input
                      className="radio_type_input"
                      type="radio"
                      id="rodent"
                      name="pet_type"
                      value="rodent"
                      onChange={handlePetType}
                    />
                    <label>Rodent</label>
                  </div>

                  <div className="radio_input">
                    <input
                      className="radio_type_input"
                      type="radio"
                      id="bird"
                      name="pet_type"
                      value="bird"
                      onChange={handlePetType}
                    />
                    <label>Bird</label>
                  </div>

                  <div className="radio_input">
                    <input
                      className="radio_type_input"
                      type="radio"
                      id="others"
                      name="pet_type"
                      value="others"
                      onChange={handlePetType}
                    />
                    <label>Others</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn_container add_hotel_btn_section ">
          <Button buttonClass="general_button red_Btn addHotel_form_submit">
            <span className="white_letter">Add hotel</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

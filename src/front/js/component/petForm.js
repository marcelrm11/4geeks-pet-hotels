import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Button } from "./button";
import { Image } from "./image";
import choco from "../../img/choco.jpg";

export const PetForm = ({
  petData,
  handleChange,
  handleValidate,
  handlePetType,
  handleGender,
  handlePetInfo,
}) => {
  const { store, actions } = useContext(Context);
  const genders = ["Female", "Male"];

  const petsInput = store.checkInput.map((item, index) => {
    return (
      <div key={index} className="radio_input d_flex_col ">
        <input
          className="radio_type_input d_flex_col round_border"
          type="radio"
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

  const gender = genders.map((item, index) => {
    return (
      <div key={index} className="radio_input d_flex_col ">
        <input
          className="radio_type_input d_flex_col round_border"
          type="radio"
          id={item}
          name="gender"
          value={item}
          onChange={(e) => {
            handleGender(e);
          }}
        />
        <label>{item}</label>
      </div>
    );
  });

  return (
    <form className="add_hotel_form">
      <div className="add_hotel_image">
        <Image
          className="signUp_image"
          figureClass="signup_img-container add_hotel_img"
          src={choco}
          altText="logo"
        />
      </div>
      <div className="add_hotel_div">
        <h1>{store.editPet === false ? "Add pet" : "Edit pet"}</h1>
        <div>
          <div className="text_inputs_container dp-grid-o-cl gp-o border-style-two">
            {Object.entries(petData).map(([field, value]) => {
              return (
                <React.Fragment key={field}>
                  <Input
                    type={field}
                    id={field}
                    placeholder={field}
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
              <div className="pet_type_input_container d_flex_col ">
                <label className="d_flex_row">Pet Type</label>
                <div className="dp-grid-t-cl gp-o pet_type_checkbox w-100 one_pad">
                  {petsInput}
                </div>
              </div>
              <div className="pet_type_input_container d_flex_col ">
                <label className="d_flex_row">Gender</label>
                <div className="dp-grid-t-cl gp-o pet_type_checkbox w-100 one_pad">
                  {gender}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="add_hotel_btn_section ">
          <Button
            buttonClass="red_Btn addHotel_form_submit"
            onClick={store.editPet === false ? handleValidate : handlePetInfo}
          >
            <span className="white_letter">
              {store.editPet === false ? "Add pet" : "Confirm"}
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
};

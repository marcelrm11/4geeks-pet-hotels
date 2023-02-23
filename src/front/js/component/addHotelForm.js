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

  const [checkInput] = useState(["dog", "cat", "rodent", "bird", "others"]);
  const petsInput = checkInput.map((item, index) => {
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
              return (
                <React.Fragment key={field}>
                  <Input
                    type={field.includes("email") ? "email" : "text"}
                    id={field}
                    placeholder={
                      field.includes("pet_type")
                        ? actions.removeUnderscores(
                            actions.capitalize("Select admited pets")
                          )
                        : actions.removeUnderscores(actions.capitalize(field))
                    }
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
                <label className="d_flex_row">Pet Type </label>
                <div className="dp-grid-t-cl gp-o pet_type_checkbox w-100 one_pad">
                  {petsInput}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="add_hotel_btn_section ">
          <Button
            buttonClass="red_Btn addHotel_form_submit"
            onClick={handleValidate}
          >
            <span className="white_letter">Add hotel</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

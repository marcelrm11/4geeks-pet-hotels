import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Button } from "./button";
import { Image } from "./image";
import addHotelImage from "../../img/AddHotel.jpg";

export const SignUpForm = ({ hotelData, handleChange, handleValidate }) => {
  const { store, actions } = useContext(Context);

  return (
    <form className="signup-input-container input-container">
      <div>
        <Image
          className="signUp_image"
          figureClass="signup_img-container"
          src={addHotelImage}
          altText="logo"
        />
      </div>
      <div className="signup_info">
        <h1 className="signUp_title">Join us now</h1>
        <div className="inputs_section">
        <input
            type="hidden"
            id="crsf_token"
            value={hotelData.crsf_token}
            onChange={handleChange}
          />
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
        <div className="btn_container">
          <Button buttonClass="access_btn" onClick={handleValidate}>
            <span className="white_letters">Add hotel</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

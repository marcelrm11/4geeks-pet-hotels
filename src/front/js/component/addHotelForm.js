import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Button } from "./button";
import { Image } from "./image";
import cobayita from "../../img/cobaya.png";

export const AddHotelData = ({
  hotelData,
  handleChange,
  handleValidate
}) => {
  const { store, actions } = useContext(Context);

  return (
    <form
      className="signup-input-container input-container"
    >
      <div className="add_hotel_img_container">
        <Image
          className="signUp_image"
          figureClass="signup_img-container add_hotel_img"
          src={cobayita}
          altText="logo"
        />
      </div>
      <div className="signup_info add_hotel">
        <h1 className="signUp_title">Add Hotel</h1>
        <div className="inputs_section">
          {Object.entries(hotelData).map(([field, value]) => {
            return (
              <React.Fragment key={field}>
                <Input
                  type={field.includes("email")
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
        <div className="btn_container add_hotel">
          <Button buttonClass="log-btn access_btn" onClick={handleValidate}>
            <span className="log_color">Add hotel</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

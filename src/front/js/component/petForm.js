import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Button } from "./button";
import { Image } from "./image";
import pug from "../../img/pug.jpg";

export const PetForm = ({ petData, handleChange, handleValidate }) => {
  const { store, actions } = useContext(Context);

  return (
    <form className="signup-input-container input-container dp-grid dp-g-center">
      <div>
        <Image
          className="signUp_image"
          figureClass="signup_img-container owner_signup_img"
          src={pug}
          altText="logo"
        />
      </div>
      <div className="signup_info">
        <h1 className="signUp_title title-font">Add pet</h1>
        <div className="inputs_section">
          {Object.entries(petData).map(([field, value]) => {
            return (
              <Input
                key={field}
                type={field}
                id={field}
                placeholder={actions.removeUnderscores(
                  actions.capitalize(field)
                )}
                value={value}
                onChange={handleChange}
                required
              >
                {store.errors[field] && (
                  <span className="input-error">
                    {actions.removeUnderscores(store.errors[field])}
                  </span>
                )}
              </Input>
            );
          })}
        </div>
        <div className="btn_container dp-grid-o-cl sign_up_btns">
          <Button buttonClass="red_Btn access_btn" onClick={handleValidate}>
            <span className="white_letter">Add pet</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

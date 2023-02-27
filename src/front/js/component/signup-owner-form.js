import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Button } from "./button";
import { Image } from "./image";
import { Link } from "react-router-dom";
import pug from "../../img/pug.jpg";

export const SignUpOwnerForm = ({
  ownerData,
  handleChange,
  handleValidate,
}) => {
  const { store, actions } = useContext(Context);

  const button_type = store.button.map((item, index) => {
    return (
      <Button key={index} buttonClass={item.btn_class} data-bs-dismiss="modal">
        <Link to={item.redirect} className={item.link_class}>
          {item.type}
        </Link>
      </Button>
    );
  });

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
        <h1 className="signUp_title title-font">Join us now</h1>
        <div className="inputs_section">
          <input
            type="hidden"
            id="crsf_token"
            value={ownerData.crsf_token}
            onChange={handleChange}
          />
          {Object.entries(ownerData).map(([field, value]) => {
            return (
              <Input
                key={field}
                type={
                  field.includes("password")
                    ? "password"
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
            <span className="white_letter">Sign up</span>
          </Button>
          {button_type}
        </div>
      </div>
    </form>
  );
};

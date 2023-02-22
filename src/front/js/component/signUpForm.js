import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Button } from "./button";
import { Image } from "./image";
import { Link } from "react-router-dom";
import signupImage from "../../img/signup_image.jpg";


export const SignUpForm = ({ formData, handleChange, handleValidate }) => {
  const { store, actions } = useContext(Context);

  return (
    <form className="signup-input-container input-container">
      <div>
        <Image
          className="signUp_image"
          figureClass="signup_img-container"
          src={signupImage}
          altText="logo"
        />
      </div>
      <div className="signup_info">
        <h1 className="signUp_title title-font">Join us now</h1>
        <div className="inputs_section">
          <input
            type="hidden"
            id="crsf_token"
            value={formData.crsf_token}
            onChange={handleChange}
          />
          {Object.entries(formData).map(([field, value]) => {
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
        <div className="btn_container sign_up_btns">
          <Button
            buttonClass="red_Btn access_btn"
            onClick={handleValidate}
          >
            <span className="white_letter">Sign up</span>
          </Button>
          <Button
            buttonClass={"log_socialMedia google_signup_btn"}
            data-bs-dismiss="modal"
          >
            <Link to="/" className="white_letter">
              Sign up with Google
            </Link>
          </Button>
          <Button
            buttonClass={"log_socialMedia"}
            data-bs-dismiss="modal"
          >
            <Link to="/" className="white_letter">
              Sign up with Facebook
            </Link>
          </Button>
        </div>
      </div>
    </form>
  );
};

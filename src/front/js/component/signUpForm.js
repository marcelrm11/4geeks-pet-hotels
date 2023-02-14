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
    <form className="input-container">
      <div>
        <Image
          className="signUp_image"
          figureClass="signup_img-container"
          src={signupImage}
          altText="logo"
        />
      </div>
      <div className="signup_info">
        <h1 className="signUp_title">Join us now</h1>
        <div className="inputs_section">
          <input
            type="hidden"
            id="crsf_token"
            value={formData.crsf_token}
            onChange={handleChange}
          />
          {Object.entries(formData).map(([field, value]) => {
            return (
              <React.Fragment key={field}>
                <Input
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
                />
                {store.errors[field] && <p>{store.errors[field]}</p>}
              </React.Fragment>
            );
          })}
        </div>
        <div className="btn_container">
          <Button buttonClass="log-btn access_btn" onClick={handleValidate}>
            <span className="log_color">Sign up</span>
          </Button>
          <Button
            buttonClass={"log-btn log_socialMedia google_signup_btn"}
            data-bs-dismiss="modal"
          >
            <Link to="/" className="log_color">
              Log In with Google
            </Link>
          </Button>
          <Button
            buttonClass={"log-btn log_socialMedia"}
            data-bs-dismiss="modal"
          >
            <Link to="/" className="log_color">
              Log In with Facebook
            </Link>
          </Button>
        </div>
      </div>
    </form>
  );
};

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Button } from "./button";
import { Link } from "react-router-dom";

export const SignUpForm = ({ formData, handleChange, handleValidate }) => {
  const { store, actions } = useContext(Context);

  return (
    <form className="input-container">
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
              type={field.includes("password") ? "password" : "text"}
              id={field}
              placeholder={actions.removeUnderscores(actions.capitalize(field))}
              value={value}
              onChange={handleChange}
              required
            />
            {store.errors[field] && <p>{store.errors[field]}</p>}
          </React.Fragment>
        );
      })}
      <Button buttonClass="log-btn access_btn" onClick={handleValidate}>
        <span className="log_color">Sign up</span>
      </Button>
      <p>--------------- Or ---------------</p>
      <Button buttonClass={"log-btn log_socialMedia"} data-bs-dismiss="modal">
        <Link to="/" className="log_color">
          Log In with Google
        </Link>
      </Button>
      <Button buttonClass={"log-btn log_socialMedia"} data-bs-dismiss="modal">
        <Link to="/" className="log_color">
          Log In with Facebook
        </Link>
      </Button>
    </form>
  );
};

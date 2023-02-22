import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Image } from "./image";
import { Button } from "./button";
import { Link } from "react-router-dom";
import logo from "../../img/dog_logo.png";

export const LoginForm = ({ credentials, onChange, onLogin }) => {
  const { store, actions } = useContext(Context);
  const [button] = useState([
    {
      
    }
  ])

  return (
    <form className="input-container">
      <Image
        figureClass="img-container login_logo_image"
        src={logo}
        altText="logo"
      />
      <input
            type="hidden"
            id="is_owner"
            name="is_owner"
            value={store.is_owner}
          />
      {Object.entries(credentials).map(([field, value]) => {
        return (
          <Input
            key={field}
            type={field}
            name={field}
            placeholder={actions.capitalize(field)}
            value={value}
            onChange={onChange}
          />
        );
      })}
      <p className="password_forget">Forgot your password?</p>
      <div className="log_in_buttons">
        <Button
          buttonClass={"red_Btn"}
          onClick={onLogin}
          data-bs-dismiss="modal"
        >
          <Link to="/" className="white_letter">
            Log In
          </Link>
        </Button>
        <Button
          buttonClass={"log_socialMedia google_log_in"}
          onClick={onLogin}
          data-bs-dismiss="modal"
        >
          <Link to="/" className="white_letter">
            Log In with Google
          </Link>
        </Button>
        <Button
          buttonClass={"log_socialMedia"}
          onClick={onLogin}
          data-bs-dismiss="modal"
        >
          <Link to="/" className="white_letter">
            Log In with Facebook
          </Link>
        </Button>
      </div>
    </form>
  );
};

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Image } from "./image";
import { Button } from "./button";
import { Link } from "react-router-dom";
import logo from "../../img/dog_logo.png";

export const LoginForm = ({ credentials, onChange, onLogin }) => {
  const { actions } = useContext(Context);

  return (
    <form className="input-container">
      <Image
        figureClass="img-container login_logo_image"
        src={logo}
        altText="logo"
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
      <Button
        buttonClass={"log-btn access_btn"}
        onClick={onLogin}
        data-bs-dismiss=""
      >
        <Link to="/" className="log_color">
          Log In
        </Link>
      </Button>
      <Button
        buttonClass={"log-btn log_socialMedia"}
        onClick={onLogin}
        data-bs-dismiss="modal"
      >
        <Link to="/" className="log_color">
          Log In with Google
        </Link>
      </Button>
      <Button
        buttonClass={"log-btn log_socialMedia"}
        onClick={onLogin}
        data-bs-dismiss="modal"
      >
        <Link to="/" className="log_color">
          Log In with Facebook
        </Link>
      </Button>
      <div className="footer"></div>
    </form>
  );
};

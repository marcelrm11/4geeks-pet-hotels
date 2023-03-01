import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Image } from "./image";
import { Button } from "./button";
import { Link } from "react-router-dom";
import logo from "../../img/dog_logo.png";
import "../../styles/login-signup.css";

export const LoginForm = ({ credentials, onChange, onLogin }) => {
  const { store, actions } = useContext(Context);

  const [type] = useState([
    {
      onclick: (e) => {
        e.preventDefault();
        actions.handleSelectType(true);
      },
      name: "Owner",
    },
    {
      onclick: (e) => {
        e.preventDefault();
        actions.handleSelectType(false);
      },
      name: "User",
    },
  ]);

  const selectType = type.map((item, index) => {
    return (
      <button
        key={index}
        onClick={item.onclick}
        className={`btn btn-danger general_button light_Btn buttons`}
      >
        {item.name}
      </button>
    );
  });

  const [button, setButton] = useState([
    {
      btn_class: "red_Btn ",
      type: "Log In",
      redirect: "/",
      link_class: "white_letter",
    },
    // {
    //   btn_class: "  mg-tb  log_socialMedia google_signup_btn ",
    //   type: "Sign up with Google",
    //   redirect: "/",
    //   link_class: "white_letter",
    // },
    // {
    //   btn_class: " log_socialMedia ",
    //   type: "Sign up with Facebook",
    //   redirect: "/",
    //   link_class: "white_letter",
    // },
  ]);

  const button_type = button.map((item, index) => {
    return (
      <Button
        key={index}
        onClick={onLogin}
        buttonClass={item.btn_class}
        data-bs-dismiss="modal"
      >
        <Link to={item.redirect} className={item.link_class}>
          {item.type}
        </Link>
      </Button>
    );
  });

  return (
    <form className="dp-g-center dp-grid input-container">
      <Image
        figureClass="img-container login_logo_image d_flex_row"
        src={logo}
        altText="logo"
      />
      <input
        type="hidden"
        id="is_owner"
        name="is_owner"
        value={store.is_owner}
      />
      <div className="d_flex_row">{selectType}</div>
      <div id="login-div" className="select_type">
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
        <p className=" white_letter mg-cero">Forgot your password?</p>
      </div>
      <div className="log_in_buttons">{button_type}</div>
    </form>
  );
};

import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { LoginForm } from "./loginForm";
import "../../styles/login-signup.css";

export const LoginModal = ({ credentials, onChange, onLogin }) => {
  const { store, actions } = useContext(Context);

  const [button] = useState([
    {
      onclick: () => actions.handleSelectType(true),
      name: "Sign up as owner",
    }, 
    {
      onclick: () => actions.handleSelectType(false),
      name: "Sign up as user",
    },
  ]);

  const button_type = button.map((item, index) => {
    return (
      <button
        key={index}
        onClick={item.onclick}
        className={`btn btn-danger general_button light_Btn`}
      >
        {item.name}
      </button>
    );
  });

  return (
    <>
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-darkBlue white_letter">
              <h1
                className="modal-title fs-5 bg-darkBlue white_letter"
                id="loginModalLabel"
              >
                Log in
              </h1>
              <button
                type="button"
                className="btn-close btn-x"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-darkBlue white_letter">
              {button_type}
              <LoginForm
                onLogin={onLogin}
                onChange={onChange}
                credentials={credentials}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

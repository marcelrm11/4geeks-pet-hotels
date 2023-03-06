import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { LoginForm } from "./loginForm";
import "../../styles/login-signup.css";

export const LoginModal = ({ credentials, onChange, onLogin }) => {
  const { store, actions } = useContext(Context);

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
            <div className="modal-body login_modal_body bg-darkBlue white_letter">
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

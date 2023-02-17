import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { LoginForm } from "./loginForm";
import "../../styles/login-signup.css";

export const LoginModal = ({ credentials, onChange, onLogin }) => {
  const { store } = useContext(Context);
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header modal_background">
              <h1
                className="modal-title fs-5 modal_background"
                id="exampleModalLabel"
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
            <div className="modal-body modal_background">
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

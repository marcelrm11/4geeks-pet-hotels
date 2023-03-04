import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { LoginModal } from "./loginmodal";
import "../../styles/navbar.css";
import logo from "../../img/logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    actions.login(e, credentials.email, credentials.password);
    const div = document.getElementById("login-div");
    div.classList.remove("login_inputs");
    div.classList.add("select_type");
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <nav className="navbar navbar_background">
        <div>
          <Link to="/">
            <img
              className="logo_image navbar-brand mb-0 h1"
              src={logo}
              alt="logo image"
            />
          </Link>
        </div>
        <div className="container justify-content-end w-50">
          <Link to="/hotelListing">
            <span className="navbar-brand mb-0 h1 title-font">Hotels</span>
          </Link>
          <div className="ml-auto nav_buttons">
            {!store.token ? (
              <>
                <Link to="/selectSignup">
                  <button className="general_button red_Btn white_letter">
                    Sign Up
                  </button>
                </Link>

                <button
                  type="button"
                  className="blue_Btn general_button"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Log In
                </button>
                <LoginModal
                  onLogin={handleLogin}
                  onChange={handleChange}
                  credentials={credentials}
                />
              </>
            ) : (
              <div className="d-flex align-items-center">
                <Link to="/profile">
                  <span className="navbar-brand mb-0 h1 title-font">
                    Profile
                  </span>
                </Link>
                <Link to="/">
                  <button
                    onClick={() => actions.logout()}
                    className="general_button red_Btn "
                  >
                    Log out
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="alerts">
        {store.signupSuccessful && (
          <div className="alert alert-success" role="alert">
            Your profile was created successfuly. Please, log in.
          </div>
        )}
        {store.loginSuccessful && (
          <div className="alert alert-success" role="alert">
            Login was successful.
          </div>
        )}
        {store.logoutSuccessful && (
          <div className="alert alert-secondary" role="alert">
            Logged out successfully. See you next time!
          </div>
        )}
        {store.addHotelSuccessful && (
          <div className="alert alert-success" role="alert">
            Your hotel was added successfuly.
          </div>
        )}
      </div>
    </>
  );
};

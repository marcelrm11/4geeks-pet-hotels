import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { LoginModal } from "./loginmodal";
import "../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    actions.login(e, credentials.email, credentials.password);
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [button] = useState([
    {
      to: "/profile",
      button_color: "turquoise_Btn",
      name: "Profile",
    },
    {
      to: "/addHotel",
      button_color: "turquoise_Btn",
      name: "Add hotel",
    },
    {
      to: "/hotelListing",
      button_color: "red_Btn",
      name: "Hotel list",
    },
    {
      to: "/favorites",
      button_color: "red_Btn",
      name: "Favorites",
    },
  ]);

  const button_type = button.map((item, index) => {
    return (
      <li key={index}>
        <Link to={item.to} className="dropdown-item">
          <button
            className={`btn btn-danger general_button ${item.button_color}`}
          >
            {item.name}
          </button>
        </Link>
      </li>
    );
  });

  return (
    <nav className="navbar navbar_background">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1 title-font">PetCasa</span>
        </Link>
        <div className="ml-auto nav_buttons">
          {!store.token ? (
            <>
              <Link to="/selectSignup">
                <button className="btn btn-danger general_button red_Btn">
                  Sign Up
                </button>
              </Link>

              <button
                type="button"
                className="btn btn-primary blue_Btn general_button"
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
            <Link to="/">
              <button
                onClick={() => actions.logout()}
                className="btn btn-danger"
              >
                Log out
              </button>
            </Link>
          )}
          <div className="dropdown">
            <p
              className="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Buttons
            </p>

            <ul className="dropdown-menu">{button_type}</ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

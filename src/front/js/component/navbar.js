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

            <ul className="dropdown-menu">
              <li>
                <Link to="/profile" className="dropdown-item">
                  <button className="btn btn-danger general_button turquoise_Btn">
                    Profile
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/addHotel" className="dropdown-item">
                  <button className="btn btn-danger general_button turquoise_Btn">
                    Add hotel
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/hotelListing" className="dropdown-item">
                  <button className="btn btn-danger addHotel_Btn">
                    Hotel list
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="dropdown-item">
                  <button className="btn btn-danger addHotel_Btn">
                    Favorites
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

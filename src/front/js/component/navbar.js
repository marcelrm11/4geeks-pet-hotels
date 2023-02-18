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
          <span className="navbar-brand mb-0 h1">PetCasa</span>
        </Link>
        <div className="ml-auto">
          <Link to="/addHotel">
            <button className="btn btn-danger addHotel_Btn">Add hotel</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-danger signUp_Btn">Sign Up</button>
          </Link>
          {!store.token ? (
            <>
              <button
                type="button"
                className="btn btn-primary logIn_Btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
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
        </div>
      </div>
    </nav>
  );
};

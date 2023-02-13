import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { LoginModal } from "./loginmodal";
import { Navigate } from "react-router";

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
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          {!store.token ? (
            <>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Log in
              </button>
              <LoginModal
                onLogin={handleLogin}
                onChange={handleChange}
                credentials={credentials}
              />
            </>
          ) : (
            <button onClick={() => actions.logout()} className="btn btn-danger">
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router";
import { LoginForm } from "../component/loginForm";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    actions.login(email, password);
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="text-center mt-5">
      {store.token ? (
        <Navigate to="/" />
      ) : (
        <LoginForm
          onLogin={handleLogin}
          onChange={handleChange}
          credentials={credentials}
        />
      )}
    </div>
  );
};

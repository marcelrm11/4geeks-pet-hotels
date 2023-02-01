import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log("this is the token num", store.token);

  const handleLogin = () => {
    actions.login(email, password);
  };

  if (store.token && store.token != "" && store.token != undefined)
    navigate("/");

  return (
    <div className="text-center mt-5">
      {store.token && store.token != "" && store.token != undefined ? (
        `You are logged in with ${store.token}`
      ) : (
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

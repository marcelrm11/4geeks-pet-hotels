import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  console.log("this is the token num", token);

  const handleLogin = () => {
    const opt = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: "test",
        password: "test",
      }),
    };

    fetch(
      "https://3001-marcelrm11-4geekspethot-khhwppgad2k.ws-eu84.gitpod.io/login",
      opt
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        else {
          return alert("there has been an error");
        }
      })
      .then((data) => {
        console.log("token", data.access_token);
        localStorage.setItem("token", data.access_token);
      })
      .catch((error) => {
        console.error(`there was am error, ${error}`);
      });
  };

  return (
    <div className="text-center mt-5">
      {token && token != "" && token != undefined ? (
        `You are logged in with ${token}`
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

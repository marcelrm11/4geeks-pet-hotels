import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate } from "react-router";
import { Input } from "../component/input";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    actions.login(email, password);
  };

  return (
    <div className="text-center mt-5">
      {store.token ? (
        <Navigate to="/" />
      ) : (
        <div className="input-container">
          <figure className="img-container">
            <img
              src="https://media.istockphoto.com/id/1223125490/es/vector/cuidado-de-mascotas-logotipo-de-la-cl%C3%ADnica-veterinaria-tamplate-logotipo-de-dise%C3%B1o-de-perro.jpg?s=612x612&w=0&k=20&c=QBYam8XzBsu__CfZxL2y-dXAFBFwScHkk1TEKuNOfAs="
              alt="logo"
            />
          </figure>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="log-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Image } from "./image";
import { Button } from "./button";

export const LoginForm = ({ credentials, onChange, onLogin }) => {
  const { actions } = useContext(Context);

  return (
    <form className="input-container">
      <Image
        figureClass="img-container"
        src="https://media.istockphoto.com/id/1223125490/es/vector/cuidado-de-mascotas-logotipo-de-la-cl%C3%ADnica-veterinaria-tamplate-logotipo-de-dise%C3%B1o-de-perro.jpg?s=612x612&w=0&k=20&c=QBYam8XzBsu__CfZxL2y-dXAFBFwScHkk1TEKuNOfAs="
        altText="logo"
      />
      {Object.entries(credentials).map(([field, value]) => {
        return (
          <Input
            key={field}
            type={field}
            name={field}
            placeholder={actions.capitalize(field)}
            value={value}
            onChange={onChange}
          />
        );
      })}
      <Button buttonClass={"log-btn"} onClick={onLogin}>
        Login
      </Button>
    </form>
  );
};

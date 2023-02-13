import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Button } from "./button";

export const SignUpForm = ({ formData, handleChange, handleValidate }) => {
  const { store, actions } = useContext(Context);

  return (
    <form>
      <input
        type="hidden"
        id="crsf_token"
        value={formData.crsf_token}
        onChange={handleChange}
      />
      {Object.entries(formData).map(([field, value]) => {
        return (
          <React.Fragment key={field}>
            <Input
              type={field.includes("password") ? "password" : "text"}
              id={field}
              placeholder={actions.removeUnderscores(actions.capitalize(field))}
              value={value}
              onChange={handleChange}
              required
            />
            {store.errors[field] && <p>{store.errors[field]}</p>}
          </React.Fragment>
        );
      })}
      <Button buttonClass="log-btn" onClick={handleValidate}>
        Sign up
      </Button>
    </form>
  );
};

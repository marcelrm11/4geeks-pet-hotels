import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";

export const SignUpForm = ({ formData, handleChange, handleValidate }) => {
  const { store } = useContext(Context);

  const capitalize = (word) => {
    const wordArr = word.split("");
    return wordArr[0].toUpperCase() + wordArr.slice(1).join("");
  };
  const removeUnderscores = (word) => {
    return word.replaceAll("_", " ");
  };

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
              type={field.includes("password") && "password"}
              id={field}
              placeholder={removeUnderscores(capitalize(field))}
              value={value}
              onChange={handleChange}
            />
            {store.errors[field] && <p>{store.errors[field]}</p>}
          </React.Fragment>
        );
      })}
      <button onClick={handleValidate}>Sign up</button>
    </form>
  );
};

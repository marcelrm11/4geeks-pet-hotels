import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { CustomSelect } from "./customSelect";
export const Input = ({
  type = "text",
  placeholder,
  id,
  name = id,
  value,
  onChange,
  required = false,
  children,
}) => {
  const { store, actions } = useContext(Context);
  useEffect(actions.setCountryList, []);

  return (
    <>
      {name === "country" ? (
        <CustomSelect
          name={name}
          onChange={onChange}
          required={required}
          defaultOption="select-country"
          value={value}
          list={store.countryList}
        >
          Select a country
        </CustomSelect>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
      {children}
    </>
  );
};

// div className="d-inline position-relative"
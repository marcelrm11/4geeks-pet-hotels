import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
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
    <div className="d-inline position-relative">
      {name === "country" ? (
        <select
          name={name}
          className="py-0"
          onChange={onChange}
          required={required}
          value={value}
        >
          {store.countryList.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
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
    </div>
  );
};

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";

export const SignUpForm = ({ formData, handleChange }) => {
  const { store, actions } = useContext(Context);

  return (
    <form>
      <input
        type="hidden"
        id="crsf_token"
        value={formData.crsf_token}
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="First name"
        id="first_name"
        value={formData.first_name}
        onChange={handleChange}
      />
      {store.errors.first_name && <p>{store.errors.first_name}</p>}
      <Input
        type="text"
        placeholder="Last name"
        id="last_name"
        value={formData.last_name}
        onChange={handleChange}
      />
      {store.errors.last_name && <p>{store.errors.last_name}</p>}
      <Input
        type="text"
        placeholder="Email"
        id="email"
        value={formData.email}
        onChange={handleChange}
      />
      {store.errors.email && <p>{store.errors.email}</p>}
      <Input
        type="password"
        placeholder="Password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />
      {store.errors.password && <p>{store.errors.password}</p>}
      <Input
        type="password"
        placeholder="Confirm password"
        id="confirm_password"
        value={formData.confirm_password}
        onChange={handleChange}
      />
      {store.errors.confirm_password && <p>{store.errors.confirm_password}</p>}
      <Input
        type="text"
        placeholder="Country"
        id="country"
        value={formData.country}
        onChange={handleChange}
      />
      {store.errors.country && <p>{store.errors.country}</p>}
      <Input
        type="text"
        placeholder="Zip code"
        id="zip_code"
        value={formData.zip_code}
        onChange={handleChange}
      />
      {store.errors.zip_code && <p>{store.errors.zip_code}</p>}
      <Input
        type="text"
        placeholder="Phone number"
        id="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
      />
      {store.errors.phone_number && <p>{store.errors.phone_number}</p>}
      <button onClick={(e) => actions.handleValidateForm(e, formData)}>
        Sign up
      </button>
    </form>
  );
};

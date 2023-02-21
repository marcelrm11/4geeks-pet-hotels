import React, { useContext, useState, useEffect } from "react";
import "../../styles/login-signup.css";
import { Context } from "../store/appContext";
import { SignUpOwnerForm } from "../component/signup-owner-form";
import { Navigate } from "react-router";

export const SignupOwner = () => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    country: "",
    zip_code: "",
    phone_number: "",
  });

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  return store.signupSuccessful ? (
    <Navigate to="/" />
  ) : (
    <div className="text-center mt-4">
      <div className="forms">
        <SignUpOwnerForm
          formData={formData}
          handleChange={handleChange}
          handleValidate={(e) => actions.handleValidateForm(e, formData)}
        />
      </div>
    </div>
  );
};

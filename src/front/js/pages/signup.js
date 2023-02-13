import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { SignUpForm } from "../component/signUpForm";
import { Navigate } from "react-router";

export const Signup = () => {
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
    <div className="text-center mt-5">
      <h1 className="signUp_title">Join us now</h1>
      <div className="forms">
        <SignUpForm
          formData={formData}
          handleChange={handleChange}
          handleValidate={(e) => actions.handleValidateForm(e, formData)}
        />
      </div>
    </div>
  );
};

import React, { useContext, useState, useEffect } from "react";
import "../../styles/login-signup.css";
import { Context } from "../store/appContext";
import { SignUpOwnerForm } from "../component/signup-owner-form";
import { Navigate } from "react-router";


export const SignupOwner = () => {
  const { store, actions } = useContext(Context);
  const [ownerData, setownerData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    country: "select-country",
    zip_code: "",
    phone_number: "",
  });

  const handleChange = (ev) => {
    setownerData({ ...ownerData, [ev.target.name]: ev.target.value });
  };

  return store.signupSuccessful ? (
    <Navigate to="/" />
  ) : (
    <div className="text-center mt-4">
      <div className="forms">
        <SignUpOwnerForm
          ownerData={ownerData}
          handleChange={handleChange}
          handleValidate={(e) => actions.handleValidateOwnerForm(e, ownerData)}
        />
      </div>
    </div>
  );
};

import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Cookies from "js-cookie";
import { SignUpForm } from "../component/signUpForm";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [token, setToken] = useState(store.token);
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
    setFormData({ ...formData, [ev.target.id]: ev.target.value });
  };

  return (
    <div className="text-center mt-5">
      <h1>Sign up</h1>
      <div className="forms">
        <SignUpForm formData={formData} handleChange={handleChange}/>
      </div>
    </div>
  );
};

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
  const [errors, setErrors] = useState({});


  // REGEXS
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const zipCodeRegex = /^\d{3,10}$/;
  const phoneNumberRegex = /^\d{8,14}$/;
  // /^(\+\d{1,3}[- ]?)?\d{10,12}$/;

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.id]: ev.target.value });
  };

  const handleSignupClick = async () => {
    const response = await fetch(process.env.BACKEND_URL + "api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      // mode: "no-cors", //? are we sure?
    });
    console.log(response);
    const cookies = response.headers.get("set-cookie");
    console.log(cookies);
    const data = await response.json();
    console.log(data);
    console.log(Cookies.get("access_token_cookie"));
    // setToken(Cookies.get('access_token_cookie'))

    // .catch((error) => {
    //   "There was an error: ", error;
    // });
  };

  return (
    <div className="text-center mt-5">
      <h1>Sign up</h1>
      <div className="forms">
        <SignUpForm formData={formData} handleChange={handleChange} handleValidateForm={handleValidateForm}/>
      </div>
    </div>
  );
};

import React, { useContext, useState, useEffect } from "react";
import "../../styles/login-signup.css";
import { Context } from "../store/appContext";
import { SignUpForm } from "../component/signUpForm";
import { Navigate } from "react-router";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [editingUser, setEditingUser] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    country: "select-country",
    zip_code: "",
    phone_number: "",
  });

  useEffect(() => {
    if (store.editUser) {
      const user = store.user
      const formData = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password:  "",
        confirm_password: "",
        country: user.country,
        zip_code: user.zip_code,
        phone_number: user.phone_number,
      };
      setFormData(formData);
    }
  }, [store.editUser]);

  console.log(store.editUser);

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  return store.signupSuccessful ? (
    <Navigate to="/" />
  ) : (
    <div className="text-center mt-4">
      <div className="forms">
        <SignUpForm
          formData={formData}
          handleChange={handleChange}
          handleValidate={(e) => actions.handleValidateForm(e, formData)}
          handleUserInfo={(e) => actions.handleEditUserInfo(e, formData)}
        />
      </div>
    </div>
  );
};

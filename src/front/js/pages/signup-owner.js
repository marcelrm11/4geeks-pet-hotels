import React, { useContext, useState, useEffect } from "react";
import "../../styles/login-signup.css";
import { Context } from "../store/appContext";
import { SignUpOwnerForm } from "../component/signup-owner-form";
import { Navigate } from "react-router";


export const SignupOwner = () => {
  const { store, actions } = useContext(Context);
  const [editingOwner, setEditingOwner] = useState([]);
  const [ownerData, setOwnerData] = useState({
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
      const user = store.owner
      const ownerData = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: "",
        confirm_password: "",
        country: user.country,
        zip_code: user.zip_code,
        phone_number: user.phone_number,
      };
      setOwnerData(ownerData);
    }
  }, [store.editUser]);

  const handleChange = (ev) => {
    setOwnerData({ ...ownerData, [ev.target.name]: ev.target.value });
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
          handleUserInfo={(e) => actions.handleEditOwnerInfo(e, ownerData)}
        />
      </div>
    </div>
  );
};

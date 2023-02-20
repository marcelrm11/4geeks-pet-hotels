import React, { useContext, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { SignUpForm } from "../component/signUpForm";
import { Navigate } from "react-router";

export const AddHotel = () => {
  const { store, actions } = useContext(Context);
  const [hotelData, setHotelData] = useState({
    name: "",
    email: "",
    phone_number: "",
    services: "",
    country: "",
    location: "",
    zip_code: "",
  });

  const handleChange = (ev) => {
    setHotelData({ ...hotelData, [ev.target.name]: ev.target.value });
  };

  return store.addHotelSuccesful ? (
    <Navigate to="/" />
  ) : (
    <div className="text-center mt-5">
      <div className="forms">
        <SignUpForm
          hotelData={hotelData}
          handleChange={handleChange}
          handleValidate={(e) => actions.handleHotelValidateForm(e, hotelData)}
        />
      </div>
    </div>
  );
};

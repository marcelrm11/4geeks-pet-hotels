import React, { useContext, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { AddHotelData } from "../component/addHotelForm";

export const AddHotel = () => {
  const { store, actions } = useContext(Context);
  const [hotelData, setHotelData] = useState({
    name: "",
    email: "",
    location: "",
    services: "",
    country: "",
    zip_code: "",
    phone_number: "",
    hotel_description: "lcbqilubfqibfiwbfe",
    hotel_owner_id: "",
  });

  const handleChange = (ev) => {
    setHotelData({ ...hotelData, [ev.target.name]: ev.target.value });
  };

  return store.addHotelSuccessful ? (
    <>
      <h2>Your hotel was added successfuly</h2>
    </>
  ) : (
    <div className="text-center mt-5">
      <div className="forms">
        <AddHotelData
          hotelData={hotelData}
          handleChange={handleChange}
          handleValidate={(e) => actions.handleValidateHotelForm(e, hotelData)}
        />
      </div>
    </div>
  );
};

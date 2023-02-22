import React, { useContext, useEffect, useState } from "react";
import "../../styles/addHotel.css";
import { Context } from "../store/appContext";
import { AddHotelData } from "../component/addHotelForm";

export const AddHotel = () => {
  const { store, actions } = useContext(Context);

  const [petType, setPetType] = useState({
    dog: false,
    cat: false,
    rodent: false,
    bird: false,
    others: false,
  });

  const [hotelData, setHotelData] = useState(() => ({
    name: "",
    email: "",
    location: "",
    services: "",
    country: "select-country",
    zip_code: "",
    phone_number: "",
    base_price: "",
    hotel_description: "",
    hotel_owner_id: "", // hay que tomar el owner id
    pet_type: [],

    //photo: "",
  }));

  const handleChange = (ev) => {
    setHotelData({ ...hotelData, [ev.target.name]: ev.target.value });
  };

  const handlePetType = (ev) => {
    const pet = ev.target.value;
    const updatedPetType = { ...petType, [pet]: !petType[pet] };
    console.log("this", updatedPetType);
    const selectedPetTypes = Object.keys(updatedPetType).filter(
      (pet) => updatedPetType[pet]
    );
    setPetType(updatedPetType);
    setHotelData({ ...hotelData, pet_type: selectedPetTypes.join(",") });
  };

  return store.addHotelSuccessful ? (
    <>
      <div className="successful_hotel_added">
        <h2>Your hotel was added successfuly</h2>
      </div>
    </>
  ) : (
    <div className="text-center mt-5">
      <div className="forms">
        <AddHotelData
          handlePetType={handlePetType}
          hotelData={hotelData}
          handleChange={handleChange}
          handleValidate={(e) => actions.handleValidateHotelForm(e, hotelData)}
        />
      </div>
    </div>
  );
};

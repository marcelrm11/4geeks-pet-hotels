import React, { useContext, useEffect, useState } from "react";
import "../../styles/addHotel.css";
import { Context } from "../store/appContext";
import { AddHotelData } from "../component/addHotelForm";
import { Navigate } from "react-router";

export const AddHotel = () => {
  const { store, actions } = useContext(Context);

  const [petType, setPetType] = useState({
    dog: false,
    cat: false,
    rodent: false,
    bird: false,
    others: false,
  });

  const [services, setServices] = useState({
    Overnight: false,
    Daycare: false,
    Dog_walking: false,
    Veterinarian: false,
    Transportation: false,
    Training: false,
    more: false,
  });

  const [hotelData, setHotelData] = useState(() => ({
    name: "",
    email: "",
    location: "",
    country: "select-country",
    zip_code: "",
    phone_number: "",
    base_price: "",
    hotel_description: "",
    hotel_owner_id: JSON.parse(localStorage.getItem("owner"))?.id || "", // hay que tomar el owner id
    pet_type: [],
    services: [],

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

  const handleServices = (ev) => {
    const service = ev.target.value;
    const updatedService = { ...services, [service]: !services[service] };
    console.log("this", updatedService);
    const selectedServices = Object.keys(updatedService).filter(
      (service) => updatedService[service]
    );
    setServices(updatedService);
    setHotelData({ ...hotelData, services: selectedServices.join(",") });
  };

  return store.addHotelSuccessful ? (
    <Navigate to="/" />
  ) : (
    <div className="text-center mt-5">
      <div className="forms">
        <AddHotelData
          handleServices={handleServices}
          handlePetType={handlePetType}
          hotelData={hotelData}
          handleChange={handleChange}
          handleValidate={(e) => actions.handleValidateHotelForm(e, hotelData)}
        />
      </div>
    </div>
  );
};

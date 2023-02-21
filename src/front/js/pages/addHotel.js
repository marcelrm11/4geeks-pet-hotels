import React, { useContext, useState } from "react";
import "../../styles/addHotel.css";
import { Context } from "../store/appContext";
import { AddHotelData } from "../component/addHotelForm";

export const AddHotel = () => {
  const { store, actions } = useContext(Context);
  //const [files, setFiles] = useState(null);

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
    country: "",
    zip_code: "",
    phone_number: "",
    base_price: "",
    hotel_description: "",
    hotel_owner_id: "", // hay que tomar el owner id
    pet_type: "",
    //photo: "",
  }));

  // const uploadImage = (e) => {
  //   e.preventDefault();
  //   // we are about to send this to the backend.
  //   console.log("This are the files", files);
  //   let body = new FormData();
  //   body.append("profile_image", files[0]);
  //   const options = {
  //     body,
  //     method: "POST",
  //   };
  //   // you need to have the user_id in the localStorage
  //   const currentHotelId = localStorage.getItem("hotel_id");
  //   fetch(
  //     `${process.env.BACKEND_URL}/api/hotel/${currentHotelId}/image`,
  //     options
  //   )
  //     .then((resp) => resp.json())
  //     .then((data) => console.log("Success!!!!", data))
  //     .catch((error) => console.error("ERRORRRRRR!!!", error));
  // };

  const handleChange = (ev) => {
    //setFiles(ev.target.files);
    console.log(ev.target.name);
    setHotelData({ ...hotelData, [ev.target.name]: ev.target.value });
  };

  const handlePetType = (ev) => {
    const pet = ev.target.value;
    setPetType((prevPetType) => {
      const updatedPetType = { ...prevPetType, [pet]: !prevPetType[pet] };
      const selectedPetTypes = Object.keys(updatedPetType).filter(
        (pet) => updatedPetType[pet]
      );
      console.log(selectedPetTypes);
      setHotelData((prevHotelData) => {
        const updatedHotelData = {
          ...prevHotelData,
          pet_type: selectedPetTypes,
        };
        console.log(updatedHotelData);
        return updatedHotelData;
      });
      return updatedPetType;
    });
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
          //uploadImage={uploadImage}
          petType={petType}
          handlePetType={handlePetType}
          hotelData={hotelData}
          handleChange={handleChange}
          handleValidate={(e) => actions.handleValidateHotelForm(e, hotelData)}
        />
      </div>
    </div>
  );
};

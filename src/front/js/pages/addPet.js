import React, { useContext, useState } from "react";
import "../../styles/login-signup.css";
import { Context } from "../store/appContext";
import { PetForm } from "../component/petForm";
import { Navigate } from "react-router";

export const AddPet = () => {
  const { store, actions } = useContext(Context);

  const [selectedPetType, setSelectedPetType] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const [petData, setPetData] = useState({
    name: "",
    pet_type: [],
    gender: [],
    breed: "",
    birth_date: "",
    health: "",
    pet_owner_id: "",
  });

  // const birthDate = item.birth_date;

    // const petAge = () => {
    //   const today = moment();
    //   const b_date = moment(birthDate);
    //   const age = today.diff(b_date, "years");
    //   return age;
    // };

    // const age = petAge(birthDate);
    // console.log(`La edad es ${age} años.`);

  const handleChange = (ev) => {
    setPetData({ ...petData, [ev.target.name]: ev.target.value });
  };

  const handlePetType = (ev) => {
    const petType = ev.target.value;
    setSelectedPetType(petType);
    setPetData({ ...petData, pet_type: petType });
  };

  const handleGender = (ev) => {
    const gender = ev.target.value;
    setSelectedGender(gender);
    setPetData({ ...petData, gender: gender });
  };

  return store.CreatedSuccesfully ? (
    <h1>done</h1> // <Navigate to="/petProfile" />
  ) : (
    <div className="text-center mt-4">
      <div className="forms">
        <PetForm
          handleGender={handleGender}
          handlePetType={handlePetType}
          petData={petData}
          handleChange={handleChange}
          handleValidate={(e) => actions.handleValidatePetForm(e, petData)}
        />
      </div>
    </div>
  );
};

import React, { useContext, useEffect, useState } from "react";
import "../../styles/login-signup.css";
import { Context } from "../store/appContext";
import { PetForm } from "../component/petForm";
import { Navigate } from "react-router";

export const AddPet = () => {
  const { store, actions } = useContext(Context);

  const [selectedPetType, setSelectedPetType] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [editingPet, setEditingPet] = useState([]);

  const [petData, setPetData] = useState({
    name: "",
    pet_type: [],
    gender: [],
    breed: "",
    birth_date: "",
    health: "",
    // age: "",
    pet_owner_id: store.user.id,
  });

  useEffect(() => {
    if (store.editPet) {
      const pet = store.pets.find((pet) => pet.id === store.currentPetId);
      setEditingPet([pet]);
      const petData = {
        name: pet.name,
        pet_type: pet.pet_type,
        gender: pet.gender,
        breed: pet.breed,
        birth_date: pet.birth_date,
        health: pet.health,
        pet_owner_id: pet.pet_owner_id,
      };
      setPetData(petData);
    }
  }, [store.editPet]);

  console.log("pet data", petData);
  // const [pet_age, setPet_Age] = useState();

  // const handleAge = () => {
  //   const birthDate = item.birth_date;

  //   const petAge = () => {
  //     const today = moment();
  //     const b_date = moment(birthDate);
  //     const age = today.diff(b_date, "years");
  //     return age;
  //   };

  //   setPet_Age(petAge(birthDate));
  //   setPetData({ ...petData, [age]: pet_age });
  // };

  // console.log("age", pet_age);

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

  return store.createdSuccesfully ? (
    <Navigate to="/petProfile" />
  ) : (
    <div className="text-center mt-4">
      <div className="forms">
        <PetForm
          handleGender={handleGender}
          handlePetType={handlePetType}
          petData={petData}
          handleChange={handleChange}
          handleValidate={(e) => actions.handleValidatePetForm(e, petData)}
          handlePetInfo={(e) => actions.handleEditPetsInfo(e, petData)}
        />
      </div>
    </div>
  );
};

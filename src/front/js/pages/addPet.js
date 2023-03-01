import React, { useContext, useState } from "react";
import "../../styles/login-signup.css";
import { Context } from "../store/appContext";
import { PetForm } from "../component/petForm";
import { Navigate } from "react-router";

export const AddPet = () => {
  const { store, actions } = useContext(Context);
  const [petData, setPetData] = useState({
    name: "",
    pet_type: "",
    breed: "",
    birth_date: "",
    health: "",
    pet_owner_id: "",
  });

  const handleChange = (ev) => {
    setPetData({ ...petData, [ev.target.name]: ev.target.value });
  };

  return store.CreatedSuccesfully ? (
    <h1>done</h1> // <Navigate to="/petProfile" />
  ) : (
    <div className="text-center mt-4">
      <div className="forms">
        <PetForm
          petData={petData}
          handleChange={handleChange}
          handleValidate={(e) => actions.handleValidatePetForm(e, petData)}
        />
      </div>
    </div>
  );
};

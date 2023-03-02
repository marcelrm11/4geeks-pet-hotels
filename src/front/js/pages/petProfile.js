import React, { useContext, useEffect, useState } from "react";
import pug from "../../img/pug.jpg";
import { Button } from "../component/button";
import "../../styles/petProfile.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faVenus,
  faMars,
  faEraser,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";

export const PetProfile = () => {
  const { store, actions } = useContext(Context);
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    actions.getAllPets();
  }, []);

  console.log(store.pets);

  const handleOptions = () => {
    setShowIcons(!showIcons);
  };

  const petsInfo = store.pets.map((item, index) => {
    return (
      <div key={index} className="card" style={{ width: "16rem" }}>
        <img
          src={pug}
          className="card-img-top pet_profile_img"
          alt="pet example picture"
        />
        <div className="card-body  bg-lighter-blue">
          <div className="pets_profile_info border-style-two d-flex">
            <FontAwesomeIcon
              className="check_icon font-s"
              icon={item.gender.includes("Male") ? faMars : faVenus}
            />
            <p className="font-s bold">{item.name}</p>
          </div>
          <div className="pets_profile_description mg-tb">
            <p className="font-s bold pets_profile_text">
              <span className="font-s">
                <FontAwesomeIcon className="check_icon" icon={faPaw} />
              </span>
              {`About ${item.name}`}
            </p>
            <div className="d_flex_row content">
              <p className="pet_details">{item.breed}</p>
              <p className="pet_details">{item.age}</p>
            </div>
            {showIcons ? (
              <>
                <Link to="/addPet">
                  <FontAwesomeIcon
                    onClick={() => actions.handleEditPet(item.id)}
                    className="red_bg icons"
                    icon={faPenToSquare}
                  />
                </Link>
                <FontAwesomeIcon
                  onClick={() => actions.handleDeletePet(item.id)}
                  className="red_bg icons" 
                  icon={faEraser}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div>
        <div>
          <Button buttonClass="mg-4 red_Btn ">
            <Link to="/addPet">
              <span className="white_letter">Add pet</span>
            </Link>
          </Button>
          <Button onClick={() => handleOptions()} buttonClass="mg-4 red_Btn ">
            <span className="white_letter">Options</span>
          </Button>
        </div>
        <section className="pet_section d_flex_col w-100 mg-tb">
          {petsInfo}
        </section>
      </div>
    </>
  );
};

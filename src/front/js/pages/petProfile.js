import React from "react";
import pug from "../../img/pug.jpg";
import "../../styles/petProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faVenus, faMars } from "@fortawesome/free-solid-svg-icons";

export const PetProfile = () => {
  return (
    <section className="d_flex_col w-100 mg-tb">
      <div className="card" style={{ width: "20rem" }}>
        <img
          src={pug}
          className="card-img-top pet_profile_img"
          alt="pet example picture"
        />
        <div className="card-body  bg-lighter-blue">
          <div className="pets_profile_info border-style-two d-flex">
            <FontAwesomeIcon className="check_icon font-s" icon={faMars} />
            <p className="font-s bold">Gustav</p>
          </div>
          <div className="pets_profile_description mg-tb">
            <p className="font-s bold pets_profile_text">
              <span className="font-s">
                <FontAwesomeIcon className="check_icon" icon={faPaw} />
              </span>
              About Gustav
            </p>
            <div className="d_flex_row content">
              <p className="pet_details">breed</p>
              <p className="pet_details">birth date</p>
              <p className="pet_details">age</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

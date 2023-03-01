import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/signup-cards.css";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export const SelectSignup = () => {
  const { store, actions } = useContext(Context);
  const [selectSignUp, setSelectSignUp] = useState([
    {
      type: "user",
      welcome: [
        "Access to a wide selection of pets hotels.",
        "Reviews and ratings from other users.",
        "Customized profiles for your pets.",
      ],
    },
    {
      type: "owner",
      welcome: [
        "Increase visibility and bookings at your hotel.",
        "Reservation management and communication tools.",
        "Advertise your hotel on the platform and reach new users.",
      ],
    },
  ]);

  const selectCard = selectSignUp.map((item, index) => {
    const list = item.welcome.map((item, index) => {
      return (
        <li key={index}>
          <FontAwesomeIcon className="check_icon" icon={faCircleCheck} />
          {item}
        </li>
      );
    });
    return (
      <div className="d_flex_col" key={index}>
        <Link to={`/signup/${item.type}`} className="one_pad w-100 d_flex_row">
          <div className={`${item.type}_card border-style-three one_pad`}>
            <div className={`w-100 d_flex_col`}></div>
            <p className="cards_title font-s">
              {/* <FontAwesomeIcon className="paw_icon" icon={faPaw} /> */}
              {actions.capitalize(item.type)}
            </p>
            <div className="paragraph_container d_flex_row">
              <ul className={`${item.type}_paragraph`}>{list}</ul>
            </div>
            <button className="btn btn-primary general_button light_Btn">
              Select
            </button>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="cards_all_container">{selectCard}</div>;
};

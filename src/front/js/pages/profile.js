import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUser,
  faPaw,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/profile.css";
import { Link } from "react-router-dom";

export const Profile = () => {
  return (
    <>
      <div className="profile_card_container">
        <Link className="profile_link" to="/account">
          <div className="profile_card_section">
            <div>
              <FontAwesomeIcon className="profile_icon" icon={faUser} />
            </div>
            <div className="profile_card_text">
              <h4>Account</h4>
              <p>
                Accede a tus datos personales como tu correo electrónico o
                contraseña.
              </p>
            </div>
          </div>
        </Link>
        <Link className="profile_link" to="/">
          <div className="profile_card_section">
            <div>
              <FontAwesomeIcon className="profile_icon" icon={faPaw} />
            </div>
            <div className="profile_card_text">
              <h4>Pets</h4>
              <p>Accede al espacio reservado a tus mascotas.</p>
            </div>
          </div>
        </Link>
        <Link className="profile_link" to="/">
          <div className="profile_card_section">
            <div>
              <FontAwesomeIcon className="profile_icon" icon={faHeart} />
            </div>
            <div className="profile_card_text">
              <h4>Favorites</h4>
              <p>Accede a los hoteles que más te han gustado.</p>
            </div>
          </div>
        </Link>
        <Link className="profile_link" to="/">
          <div className="profile_card_section">
            <div>
              <FontAwesomeIcon className="profile_icon" icon={faBook} />
            </div>
            <div className="profile_card_text">
              <h4>Booking</h4>
              <p>Accede fácilmente a las reservas que has realizado.</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

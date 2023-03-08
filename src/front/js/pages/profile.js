import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Context } from "../store/appContext";
import {
  faHeart,
  faUser,
  faPaw,
  faBook,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/profile.css";
import { Link } from "react-router-dom";

export const Profile = () => {
  const { store, actions } = useContext(Context);

  const userType = store.userType;
  console.log(userType);

  const profileUserCards = [
    {
      link: "/account",
      icon: faUser,
      title: "Account",
      info: "Access your personal data",
    },
    {
      link: "/petProfile",
      icon: faPaw,
      title: "Pets",
      info: "Access the space reserved for your pets.",
    },
    {
      link: "/favorites",
      icon: faHeart,
      title: "Favorites",
      info: "Access the hotels you liked the most.",
    },
  ];

  const profileOwnerCards = [
    {
      link: "/account",
      icon: faUser,
      title: "Account",
      info: "Access your personal data",
    },
    {
      link: "/ownerHotels",
      icon: faHotel,
      title: "Hotels",
      info: "Easily access your hotels information.",
    },
  ];

  const showUserCard = profileUserCards.map((item, index) => {
    return (
      <Link key={index} className="profile_link" to={item.link}>
        <div className="profile_card_section">
          <div>
            <FontAwesomeIcon className="profile_icon" icon={item.icon} />
          </div>
          <div className="profile_card_text">
            <h4>{item.title}</h4>
            <p>{item.info}</p>
          </div>
        </div>
      </Link>
    );
  });

  const showOwnerCard = profileOwnerCards.map((item, index) => {
    return (
      <Link key={index} className="profile_link" to={item.link}>
        <div className="profile_card_section">
          <div>
            <FontAwesomeIcon className="profile_icon" icon={item.icon} />
          </div>
          <div className="profile_card_text">
            <h4>{item.title}</h4>
            <p>{item.info}</p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <>
      {store.token ? (
        <div className="profile_card_container">
          {userType == "owner" ? showOwnerCard : showUserCard}
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          You need to be log in.
        </div>
      )}
    </>
  );
};

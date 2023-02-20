import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import landing_image from "../../img/homeLandingImage.jpg";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h2 className="title-font">
        {store.token
          ? `Hola, ${store.user.first_name}!`
          : `Bienvenido a PetCasa`}
      </h2>
      {store.signupSuccessful ? (
        <h4>signup successful, verify your email and log in</h4>
      ) : (
        ""
      )}

      <section className="home_image_searchbar">
        <figure className="home_img_container">
          <img
            className="home_image"
            src={landing_image}
            alt="dog welcoming image"
          />
          <div className="home_shortcut_btn">
            <Link to="/hotelListing">
              <button className="btn btn-danger addHotel_Btn">
                Hotel list
              </button>
            </Link>
            <Link to="/favorites">
              <button className="btn btn-danger addHotel_Btn">Favorites</button>
            </Link>
          </div>
        </figure>
      </section>

      <section className="home_hotels"></section>

      <section className="home_welcome_info"></section>

      <section className="home_value"></section>
    </div>
  );
};

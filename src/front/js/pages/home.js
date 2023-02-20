import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import landing_image from "../../img/homeLandingImage.jpg";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <section className="home_image_searchbar">
        <figure className="home_img_container">
          <img
            className="home_image"
            src={landing_image}
            alt="dog welcoming image"
          />
        </figure>
        <div>
          <div className="home_welcome_title">
            <h1>Petcasa</h1>
            <p>Alojamientos de mascota con profesionales</p>
          </div>
        </div>
      </section>

      <section className="home_hotels"></section>

      <section className="home_welcome_info"></section>

      <section className="home_value"></section>
    </div>
  );
};

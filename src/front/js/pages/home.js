import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import HomeSearch from "../component/homeSearch";
import landing_image from "../../img/homeLandingImage.jpg";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h2 className="title-font">
        {store.token
          ? `Hola, ${store.user.first_name}!`
          : `Bienvenido a PetCasa`}
      </h2>

      <section className="home_image_searchbar">
        <figure className="home_img_container">
          <img
            className="home_image"
            src={landing_image}
            alt="dog welcoming image"
          />
        </figure>
        <div className="home_image_info_searchBar">
          <div className="home_search_bar_container">
            <HomeSearch />
          </div>
        </div>
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

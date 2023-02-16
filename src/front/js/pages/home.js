import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import HomeSearch from "../component/homeSearch";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <section className="home_image_searchbar">
        <div>
          <figure>
            <img src="" alt="" />
          </figure>
          <div>
            <div>
              <HomeSearch />
            </div>
            <div>
              <h1>Petcasa</h1>
              <p>Alojamientos de mascota con profesionales</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home_hotels"></section>

      <section className="home_welcome_info"></section>

      <section className="home_value"></section>
    </div>
  );
};

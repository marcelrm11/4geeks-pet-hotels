import React from "react";
import { Button } from "../component/button";

const HomeSearch = () => {
  return (
    <>
      <div className="home_search_filter">
        <div className="home_pet_select">
          <div className="date">
            <label>Mascota</label>
            <select>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="roedor">Roedor</option>
              <option value="ave">Ave</option>
              <option value="otros">Otros</option>
            </select>
          </div>
          <div className="home_search_date">
            <div className="date">
              <label>Entrada</label>
              <input type="date" name="fecha-entrada" />
            </div>

            <div className="date">
              <label>Salida</label>
              <input type="date" name="fecha-salida" />
            </div>
          </div>
        </div>
        <div className="home_search_bar date">
          <label>Search</label>
          <input className="home_search_input" type="text" placeholder="Search" />
          <Button buttonClass="log-btn access_btn">
            <span className="log_color search_btn">Search</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomeSearch;

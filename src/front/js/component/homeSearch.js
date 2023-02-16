import React from "react";
import { Button } from "../component/button";

const HomeSearch = () => {
  return (
    <>
      <div>
        <div>
          <label>Mascota:</label>
          <select>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="roedor">Roedor</option>
            <option value="ave">Ave</option>
            <option value="otros">Otros</option>
          </select>
        </div>
        <div>
          <div>
            <label>Fecha de entrada</label>
            <input type="date" name="fecha-entrada" />
          </div>

          <div>
            <label>Fecha de salida</label>
            <input type="date" name="fecha-salida" />
          </div>
        </div>
        <div>
          <label>Search</label>
          <input type="text" placeholder="Search" />
          <Button buttonClass="log-btn access_btn">
            <span className="log_color search_btn">Search</span>
          </Button>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default HomeSearch;

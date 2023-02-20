import React from "react";
import { WiDayCloudy } from "react-icons/wi";
import { FaBath } from "react-icons/fa";
import { GiNightSleep, GiWalkingBoot, GiHealthNormal } from "react-icons/gi";

export const HotelServices = ({ service }) => {
  return (
    <div className="hotelServices">

      {service === "Estancia nocturna" ? (
        <p>
          <GiNightSleep className="service_container" /> {service}
        </p>
      ) : service === "Guardería de día" ? (
        <p>
          <WiDayCloudy className="service_container" /> {service}
        </p>
      ) : service === "Paseo para perros" ? (
        <p>
          <GiWalkingBoot className="service_container" /> {service}
        </p>
      ) : service === "Veterinario" ? (
        <p>
          <GiHealthNormal className="service_container" /> {service}
        </p>
      ) : (
        <p>
          <FaBath className="service_container" /> {service}
        </p>
      )}
    </div>
  );
};

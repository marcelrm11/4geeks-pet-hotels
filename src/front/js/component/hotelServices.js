import React, { useContext } from "react";
import { WiDayCloudy } from "react-icons/wi";
import {
  GiNightSleep,
  GiWalkingBoot,
  GiHealthNormal,
  GiSittingDog,
  GiCat,
  GiHearts,
  GiEgyptianBird,
  GiRat,
  GiSandSnake,
  GiCityCar,
  GiJumpingDog,
} from "react-icons/gi";
import { Context } from "../store/appContext";

export const HotelServices = ({ service }) => {
  const { actions } = useContext(Context);
  return (
    <div className="hotelServices">
      {service === "Overnight" ? (
        <p>
          <GiNightSleep className="service_container me-2" /> {service}
        </p>
      ) : service === "Daycare" ? (
        <p>
          <WiDayCloudy className="service_container me-2" /> {service}
        </p>
      ) : service === "Walking" ? (
        <p>
          <GiWalkingBoot className="service_container me-2" /> {service}
        </p>
      ) : service === "Veterinarian" ? (
        <p>
          <GiHealthNormal className="service_container me-2" /> {service}
        </p>
      ) : service === "Transportation" ? (
        <p>
          <GiCityCar className="service_container me-2" /> {service}
        </p>
      ) : service === "Training" ? (
        <p>
          <GiJumpingDog className="service_container me-2" /> {service}
        </p>
      ) : service === "dog" ? (
        <p>
          <GiSittingDog className="service_container me-2" />{" "}
          {actions.capitalize(service)}
        </p>
      ) : service === "cat" ? (
        <p>
          <GiCat className="service_container me-2" />{" "}
          {actions.capitalize(service)}
        </p>
      ) : service === "bird" ? (
        <p>
          <GiEgyptianBird className="service_container me-2" />{" "}
          {actions.capitalize(service)}
        </p>
      ) : service === "rodent" ? (
        <p>
          <GiRat className="service_container me-2" />{" "}
          {actions.capitalize(service)}
        </p>
      ) : service === "others" ? (
        <p>
          <GiSandSnake className="service_container me-2" />{" "}
          {actions.capitalize(service)}
        </p>
      ) : (
        <p>
          <GiHearts className="service_container me-2" /> {service}
        </p>
      )}
    </div>
  );
};

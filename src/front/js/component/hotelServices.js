import React from "react";
import { WiDayCloudy } from 'react-icons/wi';
import { FaBath } from 'react-icons/fa';
import { GiNightSleep, GiWalkingBoot, GiHealthNormal } from 'react-icons/gi';

export const HotelServices = ({ service }) => {
    return (
        <div className="hotelServices">
        {service === "Estancia nocturna" ? <p><GiNightSleep /> {service}</p> : service === "Guardería de día" ? <p><WiDayCloudy /> {service}</p> : service === "Paseo para perros" ? <p><GiWalkingBoot /> {service}</p> : service === "Veterinario" ? <p><GiHealthNormal /> {service}</p> : <p><FaBath /> {service}</p>}
        </div>
    )
}
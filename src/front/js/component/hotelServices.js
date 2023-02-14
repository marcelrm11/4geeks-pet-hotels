import React from "react";

export const HotelServices = ({ service }) => {
    return (
        <div className="hotelServices">
            <p><i class="fa-solid fa-moon"></i>{service}</p>
        </div>
    )
}
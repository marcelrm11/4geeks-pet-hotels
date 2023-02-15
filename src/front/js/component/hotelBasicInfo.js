import React from "react";

export const HotelBasicInfo = ({name, phone, address}) => {
    return (
        <div className="basicInfo">
            <p>{name}</p>
            <p>{address}</p>
            <p>{phone}</p>
        </div>
    )
}
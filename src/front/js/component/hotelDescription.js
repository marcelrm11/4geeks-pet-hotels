import React from "react";

export const HotelDescription = ({ description, name }) => {
  return (
    <div className="hotelDescription">
      <div className="description_container">
        <h2>{`About ${name}`}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

import React from "react";

export const HotelDescription = ({ description, name }) => {
  return (
    <div className="hotelDescription d_flex_row">
      <div className="w-100 d_flex_col ">
        <h2>{`About ${name}`}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

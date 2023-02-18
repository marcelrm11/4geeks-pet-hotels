import React from "react";

export const HotelBasicInfo = ({ name, phone, address, email }) => {
  return (
    <div className="basicInfo">
      <h2>{name}</h2>
      <hr className="hr" />
      <p>{address}</p>
      <p className="place_detail_contact">Contact:</p>
      <p>{phone}</p>
      <p>{email}</p>
    </div>
  );
};

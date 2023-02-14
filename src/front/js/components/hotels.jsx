import React from "react";
import {
  getNearbyPlaces,
  findPlaceDetails,
  findPlaceID,
} from "../functions/googlePlaces";

export const Hotels = () => {
  const nearbyPlaces = getNearbyPlaces();
  console.log(nearbyPlaces);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Hotels</h1>
        </div>
      </div>
    </div>
  );
};

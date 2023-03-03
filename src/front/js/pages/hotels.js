import React from "react";
import { Button } from "../component/button";
import { Link } from "react-router-dom";
export const OwnerHotels = () => {
  return (
    <Button>
      <Link to="/addHotel">
        <span>Add hotel</span>
      </Link>
    </Button>
  );
};

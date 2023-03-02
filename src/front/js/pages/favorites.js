import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/favorites.css";
import HotelCard from "../component/hotelCard";

export const Favorites = () => {
  const { store } = useContext(Context);

  const favorites = store.user.favorites?.map((item) => {
    return <HotelCard hotel={item.hotel} key={item.id} />;
  });

  return (
    <>
      <h2 className="favorites_title txt-center">Your favorites</h2>
      <div className="favorites dp-grid-t-cl dp-g-center">{favorites}</div>;
    </>
  );
};

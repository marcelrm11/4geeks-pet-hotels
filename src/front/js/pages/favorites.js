import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/favorites.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Favorites = () => {
  const { store, actions } = useContext(Context);

  const favorites = store.favorites.map((item, index) => {
    return (
      <div key={index} className="favorites_card d_flex_row">
        <div className="card" style={{ width: "16rem" }}>
          <button
            onClick={() => actions.deleteFavorites(item.id)}
            className="favoritesBtn"
          >
            <FontAwesomeIcon icon={faHeart} className="favorites_icon" />
          </button>
          <img
            src="https://picsum.photos/200"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body white_letter">
            <h5 className="card-title">{item.name}</h5>
            <hr />
            <Link className="d_flex_row" to={`/hotel/${item.id}`}>
              <button className="btn btn-primary size listing_hotel_btn">
                View details
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <h2 className="favorites_title txt-center">Your favorites</h2>
      <div className="favorites dp-grid-t-cl dp-g-center">{favorites}</div>;
    </>
  );
};

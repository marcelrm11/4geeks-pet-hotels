import React, { useContext } from "react";
import { Button } from "../component/button";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEraser,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/ownerHotelsView.css";

export const OwnerHotels = () => {
  const { store, actions } = useContext(Context);

  const hotels = store.ownerHotels.map((item) => {
    return (
      <div
        key={item.id}
        className="card card_section"
        style={{ width: "16rem" }}
      >
        <img
          src={`https://picsum.photos/400?random=${item.id}`}
          className="card-img-top hotel_image"
          alt="..."
        />
        <div className="white_letter card-body">
          <div className="hotel_title_section d-fle">
            <h5 className="font-xs">{item.name}</h5>
            <span className="hotel_stars">
              <FontAwesomeIcon className="stars" icon={faHeart} />
              {(Math.random() + 3.5).toFixed(1)}
            </span>
          </div>
          <hr />
          <p className="card-text">{item.location}</p>
          <p>{item.base_price}€ per night</p>
          <div className="hotel_listing_btnCotainer mg-1 dp-grid dp-g-center">
            <Link to={`/hotel/${item.id}`}>
              <button className="btn btn-primary general_button red_Btn">
                View details
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex ownerHotels_container">
      <div className="button_section">
        <Button className="blue_Btn btn white_letter">
          <Link to="/addHotel">
            <span>Add hotel</span>
          </Link>
        </Button>
        <Button className="blue_Btn btn white_letter">
          <span>Options</span>
        </Button>
      </div>
      <div className="w-100 ownerHotels">{hotels}</div>
    </div>
  );
};

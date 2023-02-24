import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const HotelCard = (props) => {
  const { store, actions } = useContext(Context);
  const [pets, sePets] = useState([]);

  // console.log(props.hotel);

  return (
    <div
      key={props.index}
      className="card card_section"
      style={{ width: "16rem" }}
    >
      <img
        src="https://picsum.photos/200"
        className="card-img-top hotel_image"
        alt="..."
      />
      <button
        onClick={() => actions.addFavorites(props.hotel.id, props.hotel.name)}
        className="favoritesBtn"
      > 
        <FontAwesomeIcon icon={faHeart} className="favorites_icon font-s" />
      </button>
      <div className="white_letter card-body">
        <div className="hotel_title_section d-fle">
          <h5 className="font-xs">{props.hotel.name}</h5>
          <span className="hotel_stars">
            <FontAwesomeIcon className="stars" icon={faHeart} />
            4.6
          </span>
        </div> 
        <hr />
        <p className="card-text">{props.hotel.location}</p>
        <p>{props.hotel.price}€ per night</p>
        <div className="hotel_listing_btnCotainer mg-1 dp-grid dp-g-center">
          <Link to={`/hotel/${props.hotel.id}`}>
            <button className="btn btn-primary general_button red_Btn">
              View details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;

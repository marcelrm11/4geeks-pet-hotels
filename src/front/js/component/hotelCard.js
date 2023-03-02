import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const HotelCard = (props) => {
  const { store, actions } = useContext(Context);
  let userFavorites = [];
  const [heartClass, setHeartClass] = useState(
    "transparent_bg favorites_icon font-s favoritesBtn"
  );
  // useEffect(() => {
  //   if (store.user.favorites.length > 0) {
  //     console.log("favorites:", store.user.favorites);
  //     for (let fav of store.user.favorites) {
  //       userFavorites.push(fav.hotel_id);
  //     }
  //     const extraClass = userFavorites.includes(props.hotel.id)
  //       ? " red_bg"
  //       : "";
  //     setHeartClass((prev) => prev + extraClass);
  //   } else {
  //     setHeartClass("transparent_bg favorites_icon font-s favoritesBtn");
  //   }
  // }, [store.user.favorites?.length]);
  // console.log("hotel card for:", props.hotel);
  // console.log("store user:", store.user);
  return (
    <div
      key={props.hotel.id}
      className="card card_section"
      style={{ width: "16rem" }}
    >
      <img
        src={`https://picsum.photos/id/${props.hotel.id}/200`}
        className="card-img-top hotel_image"
        alt="..."
      />
      <FontAwesomeIcon
        id="favorites_color"
        icon={faHeart}
        onClick={() => actions.toggleFavorite(props.hotel.id, store.user.id)}
        className={heartClass}
      />
      <div className="white_letter card-body">
        <div className="hotel_title_section d-fle">
          <h5 className="font-xs">{props.hotel.name}</h5>
          <span className="hotel_stars">
            <FontAwesomeIcon className="stars" icon={faHeart} />
            {(Math.random() + 3.5).toFixed(1)}
          </span>
        </div>
        <hr />
        <p className="card-text">{props.hotel.location}</p>
        <p>{props.hotel.base_price}€ per night</p>
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

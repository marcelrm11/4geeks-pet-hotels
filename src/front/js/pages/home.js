import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import landing_image from "../../img/homeLandingImage.jpeg";
import { Link } from "react-router-dom";
import HotelCard from "../component/hotelCard";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const hotelsInfo = [];
  for (let i = 0; i < store.hotels.length && i < 3; i++) {
    hotelsInfo.push(<HotelCard hotel={store.hotels[i]} key={i} index={i} />);
  }

  return (
    <div className="text-center mt-5">
      <h2 className="title-font">
        {store.token ? `Hola, ${store.user.first_name}!` : `Welcome to PetCasa`}
      </h2>
      {store.signupSuccessful ? (
        <h4>signup successful, verify your email and log in</h4>
      ) : (
        ""
      )}

      <section className="home_image_searchbar">
        <figure className="home_img_container">
          <img
            className="home_image"
            src={landing_image}
            alt="dog welcoming image"
          />
          <div className="home_shortcut_btn">
            <Link to="/hotelListing">
              <button className="btn btn-danger addHotel_Btn">
                Hotel list
              </button>
            </Link>
            <Link to="/favorites">
              <button className="btn btn-danger addHotel_Btn">Favorites</button>
            </Link>
          </div>
        </figure>
      </section>

      <section className="home_hotels">{hotelsInfo}</section>

      <section className="home_welcome_info">
        <div>
          <p>
            Ensure your beloved furry companion receives the very best care
            while you're away with our help. We specialize in finding
            pet-friendly hotels that cater to all of your pet's needs, ensuring
            a comfortable and stress-free stay. With our assistance, you can
            rest assured that your furry friend is in good hands and receiving
            the care and attention they deserve.
          </p>
          <hr />
        </div>
      </section>

      <section className="home_value"></section>
    </div>
  );
};

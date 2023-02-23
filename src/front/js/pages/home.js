import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import landing_image from "../../img/homeLandingImage.jpeg";
import HotelCard from "../component/hotelCard";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const [hotelsInfo, setHotelsInfo] = useState([]);

  useEffect(() => {
    for (let i = 0; i < store.hotels.length && i < 3; i++) {
      setHotelsInfo(<HotelCard hotel={store.hotels[i]} key={i} index={i} />);
    }
  }, []);

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

      <section className="w-100 d_flex_col">
        <figure className="home_img_container w-100">
          <img
            className="home_image w-100"
            src={landing_image}
            alt="dog welcoming image"
          />
        </figure>
      </section>

      <section className="home_hotels w-100 d-flex align-items-center">
        {hotelsInfo}
      </section>

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
          <hr className="hr" />
        </div>
      </section>

      <section className="home_value"></section>
    </div>
  );
};

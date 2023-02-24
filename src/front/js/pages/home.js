import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import landing_image from "../../img/homeLandingImage.jpeg";
import HotelCard from "../component/hotelCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHeart,
  faCheck,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const [hotelsInfo, setHotelsInfo] = useState([]);
  const [values, setValues] = useState([
    {
      img: faShieldHeart,
      value: "Commitment to animal welfare",
      description: "Caring for your pet's well-being is our top priority.",
    },
    {
      img: faCheck,
      value: "Ease of use and accessibility",
      description:
        "Book your pet's fast and easy with our user-friendly interface.",
    },
    {
      img: faHeart,
      value: "Trust and security",
      description:
        "Trust us to lovingly care for your pet as if it were our own",
    },
  ]);

  useEffect(() => {
    for (let i = 0; i < store.hotels.length && i < 3; i++) {
      setHotelsInfo(<HotelCard hotel={store.hotels[i]} key={i} index={i} />);
    }
  }, []);

  useEffect(actions.listing, []);

  const bs_values = values.map((item, index) => {
    return (
      <div className="d_flex_col  mg-1 vl-container" key={index}>
        <FontAwesomeIcon
          className="font-l salmon bg-lighter-blue one_pad round_border"
          icon={item.img}
        />
        <h4 className="mg-tb">{item.value}</h4>
        <p>{item.description}</p>
      </div>
    );
  });

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

      <section className="home_value">
        <div className="value_section d_flex_col bg-darkBlue white_letter mg-tb one_pad">
          {bs_values}
        </div>
      </section>
    </div>
  );
};

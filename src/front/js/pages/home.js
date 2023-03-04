import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import landing_image from "../../img/homeLandingImage.jpeg";
import mobile_home from "../../img/mobile_home.jpg";
import HotelCard from "../component/hotelCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../component/button";
import {
  faShieldHeart,
  faCheck,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import dog from "../../img/dog.jpg";
import cat from "../../img/cat.jpg";
import bird from "../../img/bird.jpg";
import vector from "../../img/vector.jpg";
import rodent from "../../img/rodent.jpg";
import more from "../../img/more.jpg";
import { Link } from "react-router-dom";

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

  const pets = [
    {
      name: "Dogs",
      img: dog,
    },
    {
      name: "Cats",
      img: cat,
    },
    {
      name: "Birds",
      img: bird,
    },
    {
      name: "Roedents",
      img: rodent,
    },
    {
      name: "More",
      img: more,
    },
  ];

  const intro_cards = pets.map((item, index) => {
    return (
      <div
        key={index}
        className="card pets_cards mg-1"
        style={{ width: "12rem" }}
      >
        <img src={item.img} className="card-img-top" alt={item.name} />
        <div className="card-body one_pad bg-lighter-blue">
          <p className="card-text">{item.name}</p>
        </div>
      </div>
    );
  });

  useEffect(() => {
    actions.listing();
    console.log("store hotels:", store.hotels);
    for (let i = 0; i < store.hotels.length && i < 3; i++) {
      setHotelsInfo(store.hotels);
    }
  }, [store.hotels.length]);

  const bs_values = values.map((item, index) => {
    return (
      <div className="value_space d_flex_col mg-1 vl-container" key={index}>
        <FontAwesomeIcon
          id="value_icon"
          className="font-l salmon bg-lighter-blue one_pad round_border"
          icon={item.img}
        />
        <h4 className="mg-tb">{item.value}</h4>
        <p>{item.description}</p>
      </div>
    );
  });

  return (
    <div className="text-center">
      {store.signupSuccessful ? (
        <h4>signup successful, verify your email and log in</h4>
      ) : (
        ""
      )}
      <section className="home-bg-light w-100 d_flex_row">
        <div className="mob-none w-75 d_flex_col">
          <div className="home_info one_pad border-style d_flex_col white_letter">
            <h2 className="title-font">{`Welcome to Pet House!`}</h2>
            <p>
              Find the perfect place for your furry friend to stay while you're
              away on vacation.
            </p>
          </div>
        </div>
        <div className="home_images">
          <figure className="home_img_container w-100">
            <img
              className="home_image w-100"
              src={landing_image}
              alt="dog welcoming image"
            />
          </figure>
          <figure className="mobile_img_container">
            <img
              className="mobile_image w-100"
              src={mobile_home}
              alt="dog welcoming image"
            />
          </figure>
        </div>
      </section>

      <div className="space"></div>

      <section className="home_hotels w-100 d_flex_col align-items-center">
        <h4>Explore Our Featured Pet-Friendly Hotels</h4>
        <div className="d-flex w-100 justify-content-evenly">
          {hotelsInfo.map((h, i) => {
            if (i < 3) {
              return <HotelCard hotel={h} key={h.id} />;
            }
          })}
        </div>
      </section>

      <div className="space"></div>

      <section className="home_value">
        <div className="value_section d_flex_col bg-darkBlue white_letter mg-tb one_pad">
          {bs_values}
        </div>
      </section>

      <section className="home_welcome_info d_flex_row">
        <div className="w-50">
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
        <div className="w-50">
          <img className="w-75" src={vector} alt="home pet image" />
        </div>
      </section>

      <section className="pets-cards-section">
        <div className="w-100">
          <p className="w-100 font-s white_letter pets_text_intro">
            Enjoy peace of mind and explore our amazing pet hotels. Make your
            vacation even more fun with Pet House! You can find places for lots
            of pets
          </p>
        </div>
        <div className="pets_introCards">{intro_cards}</div>
      </section>

      <section className="mg-1">
        <h2>Find Your Furry Friend's Perfect Place</h2>
        <Link to="/hotelListing">
          <Button className="btn red_Btn mg-1">
            <span>See Hotels</span>
          </Button>
        </Link>
      </section>
    </div>
  );
};

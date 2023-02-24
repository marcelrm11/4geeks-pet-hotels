import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar_user from "../../img/7309667.jpg";
import avatar_owner from "../../img/7309681.jpg";
import { Button } from "../component/button";
import "../../styles/signup-cards.css";

export const SelectSignup = () => {
  const [selectSignUp, setSelectSignUp] = useState([
    {
      type: "user",
      img: avatar_user,
      welcome:
        "Join our pet hotels page as a registered user to access exclusive deals and discounts, book your pet's stay online, and manage your account from anywhere.",
    },
    {
      type: "owner",
      img: avatar_owner,
      welcome:
        "Welcome to our pet hotels page! We are thrilled to offer you the opportunity to publish your pet hotel on our platform and reach a wider audience of pet owners looking for top-quality pet accommodations.",
    },
  ]);

  const selectCard = selectSignUp.map((item, index) => {
    return (
      <div className="d_flex_col" key={index}>
        <div className={`${item.type}_card border-style one_pad`}>
          <div className={`w-100 d_flex_col`}>
            <p className="cards_title">{item.type}</p>
            <figure className={`${item.type}_img_container`}>
              <img
                className={`w-100 round_border`}
                src={item.img}
                alt={`${item.type} representative image`}
              />
            </figure>
          </div>
          <div className="paragraph_container d_flex_row">
            <p className={`${item.type}_paragraph`}>{item.welcome}</p>
          </div>
          <Link
            to={`/signup/${item.type}`}
            className="white_letter one_pad w-100 d_flex_row"
          >
            <Button buttonClass={"btn btn-primary light_Btn "}>Go!</Button>
          </Link>
        </div>
      </div>
    );
  });

  return <div>{selectCard}</div>;
};

import React from "react";
import { Link } from "react-router-dom";
import avatar_user from "../../img/7309667.jpg";
import avatar_owner from "../../img/7309681.jpg";
import "../../styles/signup-cards.css";

export const SelectSignup = () => {
  return (
    <>
      <div className="cards_section">
        <div className="user_card">
          <div className="user_intro_container">
            <p className="cards_title">User</p>
            <figure className="user_img_container">
              <img src={avatar_user} alt="user representative image" />
            </figure>
          </div>
          <div className="paragraph_container">
            <p className="user_paragraph">
              Join our pet hotels page as a registered user to access exclusive
              deals and discounts, book your pet's stay online, and manage your
              account from anywhere.
            </p>
          </div>
          <Link className="sign_btn_cards" to="/signup">
            <button className="btn btn-danger general_button light_Btn">
              Sign up as user
            </button>
          </Link>
        </div>
        <div className="owner_card">
          <div className="owner_intro_container">
            <p className="cards_title">Owner</p>
            <figure className="owner_img_container">
              <img src={avatar_owner} alt="user representative image" />
            </figure>
          </div>
          <div className="paragraph_container">
            <p className="owner_paragraph">
              Welcome to our pet hotels page! We are thrilled to offer you the
              opportunity to publish your pet hotel on our platform and reach a
              wider audience of pet owners looking for top-quality pet
              accommodations.
            </p>
          </div>
          <Link className="sign_btn_cards" to="/signup/owner">
            <button className="btn btn-danger general_button light_Btn">
              Sign up as owner
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

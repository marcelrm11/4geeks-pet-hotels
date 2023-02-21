import React from "react";
import { Link } from "react-router-dom";
import avatar_user from "../../img/7309667.jpg";
import avatar_owner from "../../img/7309681.jpg";
import "../../styles/signup-cards.css";

export const SelectSignup = () => {
  return (
    <>
      <div>
        <div className="user_card">
          <div className="user_intro_container">
            <p>User</p>
            <figure className="user_img_container">
              <img src={avatar_user} alt="user representative image" />
            </figure>
          </div>
          <div>
            <p>Sign up as user</p>
            <p className="user_paragraph">
              Join our pet hotels page as a registered user to access exclusive
              deals and discounts, book your pet's stay online, and manage your
              account from anywhere.
            </p>
          </div>
          <Link to="/signup">
            <button className="btn btn-danger general_button red_Btn">
              Sign up as user
            </button>
          </Link>
        </div>
        <div className="owner_card">
          <div className="owner_intro_container">
            <p>Owner</p>
            <figure className="owner_img_container">
              <img src={avatar_owner} alt="user representative image" />
            </figure>
          </div>
          <div>
            <p>Sign up as owner</p>
            <p className="owner_paragraph">
              Welcome to our pet hotels page! We are thrilled to offer you the
              opportunity to publish your pet hotel on our platform and reach a
              wider audience of pet owners looking for top-quality pet
              accommodations.
            </p>
          </div>
          <Link to="/signup/owner">
            <button className="btn btn-danger general_button red_Btn">
              Sign up as owner
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

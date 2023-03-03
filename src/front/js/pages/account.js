import React, { useContext, useEffect, useState } from "react";
import "../../styles/account.css";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faAngleRight,
  faHeart,
  faBook,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Account = () => {
  const { store, actions } = useContext(Context);

  const user = store.user;
  console.log("user", store.user);

  const options = [
    {
      name: "Pets",
      icon: faPaw,
      link: "/petProfile",
    },
    {
      name: "Favorites",
      icon: faHeart,
      link: "/favorites",
    },
    {
      name: "Bookings",
      icon: faBook,
      link: "/booking",
    },
  ];
  const icon_buttons = options.map((item, index) => {
    return (
      <Link className="options_account w-100 d-flex" to={item.link}>
        <div className="options_account w-100 d-flex">
          <span>
            <FontAwesomeIcon className="icon_pad" icon={item.icon} />
            {item.name}
          </span>
          <span>
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </div>
      </Link>
    );
  });

  return (
    <>
      <div className="account_section w-100 d_flex_col">
        <section className="account_right_section border-style d_flex_col">
          <div className="account_user_background d_flex_col border-style">
            <div className="account_user_profile d_flex_col">
              <figure>
                <FontAwesomeIcon
                  className="edit_account"
                  icon={faPenToSquare}
                />
                <img src="https://picsum.photos/200" />
              </figure>
              <p>{`${user.first_name} ${user.last_name}`}</p>
            </div>
          </div>
        </section>
        <section className="account_left_section">
          <div className="account_info_background border-style">
            <div className="account_info_profile">
              <p className="little_pad">{user.email}</p>
              <p className="little_pad">{user.country}</p>
            </div>
          </div>
          <div className="options_account_container d_flex_col w-100">
            {icon_buttons}
          </div>
        </section>
      </div>
      <p className="account_log_out">Log out</p>
    </>
  );
};

import React, { useContext, useEffect, useState } from "react";
import "../../styles/account.css";
import { Context } from "../store/appContext";

export const Account = () => {
  const { store, actions } = useContext(Context);

  const user = store.user;
  console.log("user", store.user);

  return (
    <>
      <div className="account_section w-100 d_flex_col">
        <section className="account_right_section d_flex_col">
          <div className="account_user_background d_flex_col border-style">
            <div className="account_user_profile d_flex_col">
              <figure>
                <img src="https://picsum.photos/200" />
              </figure>
              <p>{`${user.first_name} ${user.last_name}`}</p>
              <p>info</p>
            </div>
          </div>
        </section>
        <section className="account_left_section d_flex_col">
          <div className="account_info_background d_flex_col border-style">
            <div className="account_info_profile d_flex_col">
              <h2>your account</h2>
              <p>{user.email}</p>
              <p>Change password</p>
              <p>{user.country}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

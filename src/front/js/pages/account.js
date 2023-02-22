import React from "react";
import "../../styles/account.css";

export const Account = () => {
  return (
    <>
      <div className="account_section">
        <section className="account_right_section">
          <div className="account_user_background">
            <div className="account_user_profile">
              <figure>
                <img src="https://picsum.photos/200" />
              </figure>
              <p>name</p>
              <p>info</p>
            </div>
          </div>
        </section>
        <section className="account_left_section">
          <div className="account_info_background">
            <div className="account_info_profile">
              <h2>your account</h2>
              <p>email</p>
              <p>password</p>
              <p>location</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

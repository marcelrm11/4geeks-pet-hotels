import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Input } from "./input.js";
import { Button } from "./button";
import { Image } from "./image";
import cobayita from "../../img/cobaya.png";

export const AddHotelData = ({ hotelData, handleChange, handleValidate }) => {
  const { store, actions } = useContext(Context);
  const [files, setFiles] = useState([]);

  const uploadImage = (e) => {
    e.preventDefault();
    let body = new FormData();
    body.append("profile_image_url", files[0]);

    const options = {
      body,
      method: "POST",
    };
    fetch(process.env.BACKEND_URL + "/api/hotel/create", options)
      .then((response) => response.json())
      .then((data) => console.log("succes", data))
      .catch((errors) => console.error(errors));
  };

  console.log("this", files);

  return (
    <form
      onSubmit={uploadImage}
      className="signup-input-container input-container"
    >
      <div className="add_hotel_img_container">
        <Image
          className="signUp_image"
          figureClass="signup_img-container add_hotel_img"
          src={cobayita}
          altText="logo"
        />
      </div>
      <div className="signup_info add_hotel">
        <h1 className="signUp_title">Add Hotel</h1>
        <div className="inputs_section">
          {Object.entries(hotelData).map(([field, value]) => {
            return (
              <React.Fragment key={field}>
                <Input
                  type={field.includes("email") ? "email" : "text"}
                  id={field}
                  placeholder={actions.removeUnderscores(
                    actions.capitalize(field)
                  )}
                  value={value}
                  onChange={handleChange}
                  required
                />
                {store.errors[field] && <p>{store.errors[field]}</p>}
              </React.Fragment>
            );
          })}
          <input type="file" onChange={(e) => setFiles(e.target.files)} />
        </div>
        <div className="btn_container add_hotel">
          <Button buttonClass="log-btn access_btn" onClick={handleValidate}>
            <span className="log_color">Add hotel</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

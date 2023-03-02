import React, { useState, useContext } from "react";
import cobaya from "../../img/cobaya.png";
import { DetailBooking } from "./detailBooking";
import { HotelBasicInfo } from "../component/hotelBasicInfo";
import { Context } from "../store/appContext";
import { Button } from "./button";
import { Input } from "./input";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const PlaceDetailsSearch = ({ details, overallRating }) => {
  console.log("details:", details);
  const { store, actions } = useContext(Context);
  const [editModal, setEditModal] = useState(false);
  const [hotelData, setHotelData] = useState(details);
  const toggleModal = () => {
    setEditModal(!editModal);
  };
  const handleChange = (ev) => {
    setHotelData({ ...hotelData, [ev.target.name]: ev.target.value });
  };
  const handleUpdate = async (e, formData) => {
    actions.handleValidateHotelForm(e, formData);
    const response = await fetch(
      process.env.BACKEND_URL + `/api/hotel/${formData.id}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "some token", //! al loro!
        },
        body: JSON.stringify(formData),
      }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
  };
  return (
    <div className=" w-100 d_flex_col">
      <div className="hotel_details_images w-100 d_flex_row">
        <figure className="place_detail_img">
          <img
            className="w-100"
            src="https://picsum.photos/700?random=1"
            alt=""
          />
        </figure>
        <figure className="more_detail_images">
          <img src="https://picsum.photos/300?random=2" alt="hotel_images_1" />
          <img src="https://picsum.photos/300?random=3" alt="hotel_images_2" />
        </figure>
      </div>
      <div>
        <p>{overallRating}</p>
      </div>
      <section className="information_section d_flex_col one_pad">
        {store.is_owner || (
          <div className="hotel_detail_preBooking">
            <DetailBooking details={details} />
          </div>
        )}
        <p style={{ color: "red" }}>
          La cajita de booking no se muestra si store.is_owner===true
        </p>
        <br />
        {store.is_owner && <Button onClick={toggleModal}>Edit details</Button>}
        <div className="hotel_detail_information w-100">
          <HotelBasicInfo
            name={details.name}
            address={details.location}
            phone={details.phone_number}
            email={details.email}
          />
        </div>
      </section>
      <EditModal
        isOpen={editModal}
        toggle={toggleModal}
        onUpdate={handleUpdate}
        onInputChange={handleChange}
        hotelData={hotelData}
      />
    </div>
  );
};

const EditModal = ({ isOpen, toggle, hotelData, onInputChange, onUpdate }) => {
  const { store, actions } = useContext(Context);
  console.log("hotel data:", hotelData);
  //! OJO! pet_type y services tienen display: none
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit hotel details</ModalHeader>
      <ModalBody className="text_inputs_container">
        {Object.entries(hotelData).map(([field, value]) => {
          if (
            ![
              "hotel_bookings",
              "hotel_owner_id",
              "id",
              "reviews",
              "rooms",
            ].includes(field)
          ) {
            return (
              <React.Fragment key={field}>
                <Input
                  type={
                    field.includes("photo")
                      ? "file"
                      : field.includes("email")
                      ? "email"
                      : "text"
                  }
                  id={field}
                  placeholder={actions.removeUnderscores(
                    actions.capitalize(field)
                  )}
                  value={value}
                  onChange={onInputChange}
                  required
                />
                {store.errors[field] && <p>{store.errors[field]}</p>}
              </React.Fragment>
            );
          }
        })}
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle} outline="outline">
          Cancel
        </Button>
        <Button onClick={(e) => onUpdate(e, hotelData)}>Save changes</Button>
      </ModalFooter>
    </Modal>
  );
};

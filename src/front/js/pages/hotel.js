import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useLocation, useParams } from "react-router";
import { ImageSlider } from "../component/imageSlider";
import { HotelBasicInfo } from "../component/hotelBasicInfo";
import { HotelServices } from "../component/hotelServices";
import { HotelDescription } from "../component/hotelDescription";
import { HotelReviews } from "../component/hotelReviews";

export const Hotel = () => {
    const { store, actions } = useContext(Context);
    const [details, setDetails] = useState([])
    const [photos, setPhotos] = useState([])
    const location = useLocation()
    const { id } = useParams()
    console.log(location)
    // console.log(photos)
    useEffect(() => {
        fetch(`https://3001-marcelrm11-4geekspethot-ci6d1sfw7t3.ws-eu86.gitpod.io/api${location.pathname}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setDetails(data)
            setPhotos(data.photos)
        })
    }, [])

    const services = () => {
        let servicesList = `${details.services}`
        let splitList = servicesList.split(",")
        return splitList
    }
    console.log(services())

    // const reviews = details.reviews.map((review) => {return <HotelReviews review={review}/>})

    return (
        <div className="text-center mt-5">
            {/* <h1>{details.name}</h1> */}
            <ImageSlider photos={photos} />
            <HotelBasicInfo name={details.name} address={details.location} phone={details.phone_number}/>
            {services().map((service) => {return <HotelServices service={service}/>})}
            <HotelDescription description={details.hotel_description}/>
            <h5>Reviews <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></h5>
            {/* {reviews} */}
        </div>
     );
};

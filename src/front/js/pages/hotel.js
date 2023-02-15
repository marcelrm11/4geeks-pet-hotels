import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useLocation, useParams } from "react-router";
import { ImageSlider } from "../component/imageSlider";
import { HotelBasicInfo } from "../component/hotelBasicInfo";
import { HotelServices } from "../component/hotelServices";
import { HotelDescription } from "../component/hotelDescription";
import { HotelReviews } from "../component/hotelReviews";
import { PlaceDetailsSearch } from "../component/placeDetailsSearch";

export const Hotel = () => {
    const { store, actions } = useContext(Context);
    const [details, setDetails] = useState([])
    const [photos, setPhotos] = useState([])
    const [reviews, setReviews] = useState([])
    const [overallRating, setOverallRating] = useState(0)
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
            setReviews(data.reviews)
            setOverallRating(data.reviews.map((rev)=> rev.rating))
        })
    }, [])

    const services = () => {
        let servicesList = `${details.services}`
        let splitList = servicesList.replace(/,\s+/g, ',').split(",")
        return splitList
    }
    console.log(services())

    // const reviews = reviews.map((review) => {return <HotelReviews review={review}/>})

    return (
        <div className="text-center mt-5">
            {/* <h1>{details.name}</h1> */}
            <ImageSlider photos={photos} />
            <div className="flex-container">
                <div className="component1">
                    <PlaceDetailsSearch details={details} overallRating={overallRating}/>
                </div>
                <div className="components2">
                    <HotelBasicInfo name={details.name} address={details.location} phone={details.phone_number}/>
                    {services().map((service) => {return <HotelServices service={service}/>})}
                </div>
            </div>
            <HotelDescription description={details.hotel_description}/>
            <h5>Reviews <i className="fa-solid fa-star reviewStar"></i><i className="fa-solid fa-star reviewStar"></i><i className="fa-solid fa-star reviewStar"></i><i className="fa-solid fa-star reviewStar"></i></h5>
            {reviews.map((review) => {return <HotelReviews review={review}/>})}
        </div>
     );
};

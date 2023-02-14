import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { SignUpForm } from "../component/signUpForm";
import { Navigate, useLocation, useParams } from "react-router";

export const Hotel = () => {
    const { store, actions } = useContext(Context);
    const [details, setDetails] = useState([])
    const [photos, setPhotos] = useState([])
    const location = useLocation()
    const { id } = useParams()
    console.log(location)

    useEffect(() => {
        fetch(`https://3001-marcelrm11-4geekspethot-ci6d1sfw7t3.ws-eu86.gitpod.io/api${location.pathname}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setDetails(data)
            setPhotos(data.photos)
        })
    }, [])

    return (
        <div className="text-center mt-5">
            <h1>{details.name}</h1>
            <section className="photosSection">
                <div className="detailsPhoto">
                    {photos.map((photo) => {return <div><img src={photo.photo_url} /></div>})}
                </div>
            </section>
        </div>
     );
};

import React, { useState } from "react";

export const ImageSlider = ({ photos }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    console.log(photos)

    const nextSlide = () => {
        if (currentImageIndex < photos.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      } else {
        setCurrentImageIndex(0);
      }
    }

    const previousSlide = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
          } else {
            setCurrentImageIndex(photos.length - 1);
          }
    }
    const accessPhotosUrl = () => {
        let photoUrl = photos.map((photo) => {return photo.photo_url})
        return photoUrl
    }
    console.log(accessPhotosUrl())
    return (
        <section>
            <div className="detailsPhoto">
                {photos && <img src={accessPhotosUrl()[currentImageIndex]}/>}
                <div className="sliderBtns">
                    <button onClick={previousSlide}><i className="fa-solid fa-circle-chevron-left btnIcon"></i></button>
                    <button onClick={nextSlide}><i className="fa-solid fa-circle-chevron-right btnIcon"></i></button>
                </div>
            </div>
    </section>
    )
}
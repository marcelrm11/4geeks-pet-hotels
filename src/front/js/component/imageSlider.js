import React, { useState } from "react";
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr'; 
import { FcPrevious, FcNext } from 'react-icons/fc'; 

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
                    <button onClick={previousSlide}><FcPrevious className="btnIcon" style={{ color: 'red' }}/></button>
                    <button onClick={nextSlide}><FcNext className="btnIcon"/></button>
                </div>
            </div>
    </section>
    )
}
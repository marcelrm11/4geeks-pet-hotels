import React from "react";

export const HotelReviews = ({ review }) => {
    console.log(review)
    return (
        <div className="hotelReview">
            <p>{review.author}</p>
            <p>{review.date}</p>
            <p>{review.review_text}</p>
        </div>
    ) 
}
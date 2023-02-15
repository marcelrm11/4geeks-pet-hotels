import React from "react";

export const PlaceDetailsSearch = ({details, overallRating}) => {
    console.log(overallRating)
    // const averageRating = (overallRating) => {
    //     let sum = 0;
    //     overallRating.map(function (item) {
    //         sum += item;
    //       });
    //     return sum / overallRating.length
    // }
    // console.log(averageRating(overallRating))
    return (
        <div className="hideOnMobile">
            <p>{details.name}</p>
            <p>{overallRating}</p>
        <div className="placeDetailsDateInput">
            <div className="entryDate">
                <label>Llegada</label>
                <input type="date" id="fecha-entrada" name="fecha-entrada" />
            </div>

            <div className="checkoutDate">
                <label>Salida</label>
                <input type="date" id="fecha-salida" name="fecha-salida" />
            </div>
            
        </div>
        <div className="bookedServices">
            <p>Booked services:</p>
        </div>
        <div className="totalEur">
        <p>Total (EUR)</p>
        <p>1500</p>
        </div>
        </div>
    )
}
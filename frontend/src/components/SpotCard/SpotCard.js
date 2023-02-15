import React from "react";
import './SpotCard.css'

export default function SpotCard({spot}) {
    
    return(
        <div className="spot-card">
            <div className="picture-container">
                <img src={spot.previewImage} alt={spot.name}/>
            </div>
            <div className="info-container">
                <div>{spot.state}, {spot.city}</div>
                <div>
                    <i className="fa-solid fa-star"></i>
                    {spot.avgRating} 
                </div>
            </div>
            <div className="price-details">
                ${spot.price} a Night
            </div>
        </div>
    )

}
import React from "react";
import './SpotCard.css'

export default function SpotCard({spot}) {
    const defImage = 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/2389c1f4-1775-4a42-a0b5-126d3c7d6aa6-high-altitude-homes-for-sale-evergreen-co.jpg'
    return(
        <div className="spot-card">
            <img className="preview-image"src={defImage} alt={spot.name}/>
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
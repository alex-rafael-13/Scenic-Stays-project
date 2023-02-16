import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import SingleSpot from "../SingleSpot";
import './SpotCard.css'

export default function SpotCard({spot}) {
    const defImage = 'https://loveincorporated.blob.core.windows.net/contentimages/gallery/2389c1f4-1775-4a42-a0b5-126d3c7d6aa6-high-altitude-homes-for-sale-evergreen-co.jpg'
    const image = spot.previewImage
    return(
        <>
        <NavLink exact to={`/spots/${spot.id}`}>
            <div className="spot-card">
                <img className="preview-image"src={image} alt={spot.name}/>
                <div className="info-container">
                    <div>{spot.name}</div>
                    <div>
                        <i className="fa-solid fa-star"></i>
                        {spot.avgRating ? (parseFloat(spot.avgRating).toFixed(1)): ('New!')} 
                    </div>
                </div>
                <div className="price-details">
                    ${parseFloat(spot.price).toFixed(2)} a Night
                </div>
            </div>
        </NavLink>
        </>
    )

}
import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import SingleSpot from "../SingleSpot";
import './SpotCard.css'

export default function SpotCard({spot}) {
    
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
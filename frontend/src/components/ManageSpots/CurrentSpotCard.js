import { NavLink, useHistory } from "react-router-dom"
import DeleteSpotFormModal from "../DeleteSpotFormModal"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import OpenModalButton from "../OpenModalButton"
import UpdateSpot from "../UpdateSpotForm"


export default function CurrentSpotCard({spot}){
    const image = spot.previewImage
    const history = useHistory()

    const updateSpot = () => {
        <UpdateSpot spot={spot}/>
        history.push(`/spots/${spot.id}/edit`, {spot})
    }

    return(
        <>
        <div className="spot-card">
            <NavLink exact to={`/spots/${spot.id}`}>
                <img className="preview-image"src={image} alt={spot.name}/>
                <div className="info-container">
                    <div>{spot.name}</div>
                    <div>
                        <i className="fa-solid fa-star"></i>
                        {spot.avgRating ? (parseFloat(spot.avgRating).toFixed(1)): ('New!')} 
                    </div>
                </div>
            </NavLink>
            <div className="price-and-buttons">
                <NavLink exact to={`/spots/${spot.id}`}>
                    <div className="price-details">
                        ${parseFloat(spot.price).toFixed(2)} a Night
                    </div>
                </NavLink>
                <div className="button-container">
                    <button className='manage-button' onClick={updateSpot}>Update</button>
                    <div className='delete-button'>
                    <OpenModalButton 
                        className='delete-button'
                        buttonText='Delete'
                        modalComponent={<DeleteSpotFormModal id={spot.id}/>}
                    />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
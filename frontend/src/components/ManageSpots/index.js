import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveUserSpots } from "../../store/spots"
import CurrentSpotCard from "./CurrentSpotCard"
import './ManageSpots.css'


export default function ManageSpots(){
    const spots = useSelector(state => state.spots.userSpots)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(retrieveUserSpots())
    }, [dispatch])
    console.log(spots)
    return(
        <div className="manage-spots-page">
            <div className="manage-header">
                <div className="manage-title">Manage Your Spots</div>
                <button className="create-button">Create a New Spot</button>
            </div>
            <div className="manage-spot-list">
                {spots?.map(spot => (
                    <CurrentSpotCard key={spot.id} spot={spot}/>
                ))}
            </div>
        </div>

    )
}
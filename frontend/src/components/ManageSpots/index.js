import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { retrieveUserSpots } from "../../store/spots"
import CurrentSpotCard from "./CurrentSpotCard"
import './ManageSpots.css'


export default function ManageSpots(){
    const spots = useSelector(state => state.spots.userSpots)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(retrieveUserSpots())
    }, [dispatch])
        
    const createSpot = e => {
        e.preventDefault()
        history.push('/spots/new')
    }

    return(
        <div className="manage-spots-page">
            <div className="manage-header">
                <div className="manage-title">Manage Your Spots</div>
                <button className="create-button" onClick={createSpot}>Create a New Spot</button>
            </div>
            <div className="manage-spots-list">
                {spots?.map(spot => (
                    <CurrentSpotCard key={spot.id} spot={spot}/>
                ))}
            </div>
        </div>

    )
}
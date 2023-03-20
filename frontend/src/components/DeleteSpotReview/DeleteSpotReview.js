import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { deleteSpotReview } from "../../store/reviews"
import { retrieveSingleSpot } from "../../store/spots"
import './DeleteSpotReview.css'


export default function DeleteSpotReview({spotId,reviewId}){
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = () => {
        dispatch(deleteSpotReview(reviewId, spotId))
        .then(closeModal)
        .then(dispatch(retrieveSingleSpot(spotId)))

        history.push(`/spots/${spotId}`)
    }

    return (
        <div className="delete-spot-modal">
            <h1 className="delete-spot-title">Confirm Delete</h1>
            <div className="delete-spot-description">Are you sure you want to delete this review?</div>
            <button className="delete-review-button" onClick={handleDelete}>Yes</button>
            <button className="keep-review-button" onClick={closeModal}>No</button>
        </ div>
    )
}
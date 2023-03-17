import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { deleteSpotReview } from "../../store/reviews"


export default function DeleteSpotReview({spotId,reviewId}){
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = () => {
        dispatch(deleteSpotReview(reviewId, spotId))
        .then(closeModal())

        history.push(`/spots/${spotId}`)
    }

    return (
        <div>
            <h1>Confirm Delete</h1>
            <div>Are you sure you want to delete this review?</div>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={closeModal}>No</button>
        </ div>
    )
}
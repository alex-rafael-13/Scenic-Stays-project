import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { deleteSpot } from "../../store/spots"


export default function DeleteSpotFormModal({id}){
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()

    const removeSpot = () => {
        dispatch(deleteSpot(id))
        closeModal()
        history.push('/spots/current')
    }

    const keepSpot = () => {
        closeModal()
    }
    return(
        <div className="delete-spot-modal">
            <div className="delete-spot-title">Confirm Delete</div>
            <div className="delete-spot-description">Are you sure you want to remove this spot from the listings?</div>
            <button className="delete-spot" onClick={removeSpot}>Yes (Delete Spot)</button>
            <button className="keep-spot" onClick={keepSpot}>No (Keep Spot)</button>
        </div>
    )
}
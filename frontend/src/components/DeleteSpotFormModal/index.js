import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import { deleteSpot } from "../../store/spots"
import './DeleteSpotModal.css'


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
            <h2 className="delete-spot-title">Confirm Delete</h2>
            <div className="delete-spot-description">Are you sure you want to remove this spot from the listings?</div>
            <div className='button-layout'>
                <button className="delete-spot-button" onClick={removeSpot}>Yes (Delete Spot)</button>
                <button className="keep-spot-button" onClick={keepSpot}>No (Keep Spot)</button>
            </div>
        </div>
    )
}
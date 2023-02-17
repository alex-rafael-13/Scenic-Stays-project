

export default function DeleteSpotFormModal({id}){
    return(
        <div className="delete-spot-modal">
            <div className="delete-spot-title">Confirm Delete</div>
            <div className="delete-spot-description">Are you sure you want to remove this spot from the listings?</div>
            <button className="delete-spot">Yes (Delete Spot)</button>
            <button className="keep-spot">No (Keep Spot)</button>
        </div>
    )
}
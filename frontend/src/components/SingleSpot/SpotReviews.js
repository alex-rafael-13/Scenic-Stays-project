import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveSpotReviews } from "../../store/spots"

export default function SpotReviews({id}){
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.spots.spotReviews)

    useEffect(() =>{
        dispatch(retrieveSpotReviews(id))
    }, [dispatch])

    // console.log(reviews?.Reviews)

    const setDate = (date) => {
        const newDate = new Date(date)

        return(<>{newDate.getMonth() + 1} / {newDate.getFullYear()} </>)

    }

    return(
        <>
            {reviews?.Reviews.map(review => (
                <div key={review.id} className="review-card">
                    <div className="review-user">{review.User.firstName}</div>
                    <div className="review-date">{setDate(review.createdAt)}</div>
                    <div className="review-content">
                        {review.review}
                    </div>
                </div>
            ))}
        
        </>
    )
}
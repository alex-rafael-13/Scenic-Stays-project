import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveSpotReviews } from "../../store/spots"

export default function SpotReviews({id}){
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.spots.spotReviews)

    useEffect(() =>{
        dispatch(retrieveSpotReviews(id))
    }, [dispatch])

    console.log(reviews?.Reviews)

    const setDate = (date) => {
        const newDate = new Date(date)

        return(<>{newDate.getMonth() + 1}/{newDate.getFullYear()} </>)

    }

    return(
        <>
            {reviews?.Reviews.map(review => (
                <div key={review.id} className="review-card">
                    <h3 className="review-user">{review.User.firstName}</h3>
                    <h3 className="review-date">{setDate(review.createdAt)}</h3>
                    <div className="review-content">
                        {review.review}
                    </div>
                </div>
            ))}
        
        </>
    )
}
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveSpotReviews } from "../../store/reviews"
import CreateReviewModal from "../CreateReviewModal"
import OpenModalButton from "../OpenModalButton"

export default function SpotReviews({id, spot, user}){
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews.spotReviews)

    useEffect(() =>{
        dispatch(retrieveSpotReviews(id))
    }, [dispatch])

    console.log(reviews)

    let reviewObj = {}
    const reviewData = reviews.Reviews

    reviewData?.forEach(review => {
        reviewObj[review.userId] = review
    })
    
    // if(reviews.length > 0){
    // }

    console.log('Checking if own property works:',reviewObj.hasOwnProperty(user?.id))
    

    const setDate = (date) => {
        const newDate = new Date(date)
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        return(<>{months[newDate.getMonth()]} {newDate.getFullYear()} </>)

    }

    const reviewCount = (reviewNum) => {
        if(reviewNum === 1){
            return (<>
            {parseFloat(spot?.avgStarRating).toFixed(1)} 
            <i className="fa-solid fa-circle"></i> 
            {reviewNum} Review</>)
        }
        else{
            return (<>
            {parseFloat(spot?.avgStarRating).toFixed(1)} 
            <i className="fa-solid fa-circle"></i> 
            {reviewNum} Reviews</>)
        }
    }

    const setReviewHeader = (reviewNum) => {
        if(reviewNum === 0){
            return (
                <>
                    <i className="fa-solid fa-star"></i>
                    <div> New! </div>
                </>
            )
        } else{
            return(
                <>
                    <i className="fa-solid fa-star"></i>
                    {reviewCount(spot?.numReviews)}
                </>
            )
        }
    }

    return(
        <>
            <div className="reviews-info-header">
                {setReviewHeader(spot?.numReviews)}
            </div>
            {user && !(reviewObj.hasOwnProperty(user?.id)) && 
        <OpenModalButton 
            buttonText='Post Your Review'
            modalComponent={<CreateReviewModal userId={user?.id} spotId={spot?.id}/>}
        
        />}
            <div className="review-container">
                {reviews?.Reviews?.length > 0 ? (reviews?.Reviews?.map(review => (
                    <div key={review.id} className="review-card">
                        <div className="review-user">{review.User.firstName}</div>
                        <div className="review-date">{setDate(review.createdAt)}</div>
                        <div className="review-content">
                            {review.review}
                        </div>
                        {user?.id === review?.userId && <button>Delete Review</button>}
                    </div>
                ))) : (<>Be the first one to post!</>)}
            
            </ div>
        </>
    )
}
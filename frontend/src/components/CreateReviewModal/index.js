import { useModal } from "../../context/Modal";
import {Rating} from 'react-simple-star-rating'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createSpotReview } from "../../store/reviews";
import { useHistory } from "react-router-dom";
import './createReviewModal.css'
import { retrieveSingleSpot } from "../../store/spots";

export default function CreateReviewModal({userId, spotId}){
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [disableButton, setDisableButton] = useState(true)
    const [errors, setErrors] = useState([]) 
    const history = useHistory()

    const handleRating = (rate) => {
        setStars(rate)
    }

    //Checking if credentials are met to submit
    useEffect(() => {
        if(review.length >= 10 && stars >= 1){
            setDisableButton(false)
        } else setDisableButton(true)
    }, [review, stars])

    //Handle submit
    const handleSubmit = () => {
        const reviewInfo = {
            spotId,
            userId,
            stars,
            review
        }

        dispatch(createSpotReview(reviewInfo))
            .then(closeModal)
            .then(dispatch(retrieveSingleSpot(spotId)))
            // .then(dispatch(retrieveSingleSpot(spotId)))
            .catch(
                async (res) => {
                    const data = await res.json()
                    if(data && data.errors) setErrors(data.errors)
                }
            );
            history.push(`/spots/${spotId}`)
    }   
    
    return(
        <div className="create-review-modal">
            <h1>How was your stay?</h1>
            {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
            ))}
            <textarea 
                className="review-text-input"
                rows='6'
                value={review}
                onChange={e => setReview(e.target.value)}
            />
            <div className="stars-cont">
                <Rating
                    // allowFraction={true}
                    initialValue={stars}
                    onClick={handleRating}
                    fillColor='#5E8A75'
                />
            </div>
            <button
                className="review-submit-button" 
                onClick={handleSubmit}
                disabled={disableButton}
            >Submit Your Review</button>
        </ div>
    )
}
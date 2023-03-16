import {csrfFetch} from './csrf'

const GET_SPOT_REVIEWS = 'spots/SPOT_REVIEWS'
const CREATE_SPOT_REVIEW = 'spots/CREATE_REVIEW'

const loadSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    }
}

const addSpotReview = (review) => {
    return {
        type: CREATE_SPOT_REVIEW,
        review
    }
}

//Thunk action creators
export const retrieveSpotReviews = id => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    if(response.ok){
        const data = await response.json()
        console.log('data',data)
        dispatch(loadSpotReviews(data))
    }
}

export const createSpotReview = (reviewInfo) => async dispatch => {
    const {
        userId,
        spotId,
        review,
        stars
    } = reviewInfo

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId,
            spotId,
            review,
            stars
        })
    })
        if(response.ok){
            const data = await response.json()
            dispatch(addSpotReview(data))
        }
        return response
}

export const deleteSpotReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
        method: 'DELETE'
    })

    if(response.ok){
        dispatch(loadSpotReviews())
    }

    return response
}

const initialState = {spotReviews: []}
export default function reviewsReducer(state = initialState, action){
    let newState
    switch(action.type){
        case GET_SPOT_REVIEWS:{
            newState = {...state}
            const reviewInfo = {...action.reviews}
            newState.spotReviews = {...reviewInfo}
            return newState
        }
        case CREATE_SPOT_REVIEW:{
            newState = {...state}
            const newReview = action.review
            newState.spotReviews.Reviews.push(newReview)
            return newState
        }
        default:
            return state
    }
}


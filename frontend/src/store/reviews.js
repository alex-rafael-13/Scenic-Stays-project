import {csrfFetch} from './csrf'

const GET_SPOT_REVIEWS = 'spots/SPOT_REVIEWS'

const loadSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
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
        default:
            return state
    }
}


import {csrfFetch} from './csrf'

const GET_ALL_SPOTS = 'spots/ALL_SPOTS'
const GET_ONE_SPOT = 'spots/SINGLE_SPOT'
const GET_SPOT_REVIEWS = 'spots/SPOT_REVIEWS'
const RESET_SPOT = 'spots/RESET_SPOT'
const CREATE_SPOT = 'spot/CREATE'

//Regular action creators
const getAllSpots = (spots) => {
    return{
        type: GET_ALL_SPOTS,
        spots
    }
}

const loadSingleSpot = (spot) => {
    return {
        type: GET_ONE_SPOT,
        spot
    }
}

const loadSpotReviews = (reviews) => {
    return {
        type:GET_SPOT_REVIEWS,
        reviews
    }
}

export const resetSpot = () => {
    return {
        type: RESET_SPOT
    }
}

const createSpot = (spot) => {
    return{
        type: CREATE_SPOT,
        spot
    }
}

//Thunk action creators
export const retrieveAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    if(response.ok){
        const data =  await response.json()
        dispatch(getAllSpots(data.Spots))
    }
}

export const retrieveSingleSpot = id => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`)
    // console.log(response)
    if(response.ok){
        const data = await response.json()
        console.log('data',data)
        dispatch(loadSingleSpot(data))
    }
}

export const retrieveSpotReviews = id => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    if(response.ok){
        const data = await response.json()
        console.log('data',data)
        dispatch(loadSpotReviews(data))
    }
}

export const createNewSpot = spotInfo => async dispatch => {
    const { address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        images
    } = spotInfo

    const spotResponse = await csrfFetch('/api/spots',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
        })
    })
    
    const spotData = await spotResponse.json()
    spotData.SpotImages = []
    for(let image of images){
        const imageResponse = await csrfFetch(`/api/spots/${spotData.id}/images`,{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(image)
        })

        const newImage = await imageResponse.json()
        spotData.SpotImages.push(newImage)
    }
    console.log(spotData)
    dispatch(createSpot(spotData))
    return spotData
}

const initialState = {spots: null, singleSpot: null}
export default function spotsReducer(state = initialState, action){
    let newState;
    switch(action.type){
        case GET_ALL_SPOTS:{
            newState = {...state}
            newState.spots = action.spots
            return newState
        }
        case GET_ONE_SPOT:{
            newState = {...state}
            const newObj = {...action.spot}
            
            newState.singleSpot = {...newObj}

            return newState
        }
        case GET_SPOT_REVIEWS:{
            newState = {...state}
            const reviewInfo = {...action.reviews}
            newState.spotReviews = {...reviewInfo}
            return newState
        }
        case RESET_SPOT:{
            newState = {...state}
            newState.singleSpot = {}
            return newState
        }
        case CREATE_SPOT:{
            newState = {...state}
            console.log(newState)
            newState.spots.push(action.spot)
            return newState
        }
        default:
            return state
    }
}
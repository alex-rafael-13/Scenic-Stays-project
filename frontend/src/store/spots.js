import {csrfFetch} from './csrf'

const GET_ALL_SPOTS = 'spots/ALL_SPOTS'
const GET_ONE_SPOT = 'spots/SINGLE_SPOT'
const RESET_SPOT = 'spots/RESET_SPOT'
const CREATE_SPOT = 'spot/CREATE'
const CURRENT_USER_SPOTS = 'spots/CURRENT_USER'
const DELETE_SPOT = 'spot/DELETE'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'

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

const loadUserSpots = (spots) => {
    return {
        type: CURRENT_USER_SPOTS,
        spots
    }
}

const removeSpot = (id) => {
    return {
        type: DELETE_SPOT,
        id
    }
}

//Thunk action creators
export const retrieveAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    if(response.ok){
        const data =  await response.json()
        dispatch(getAllSpots(data.Spots))
    }
    return response
}

export const retrieveUserSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')

    if(response.ok){
        const data =  await response.json()
        dispatch(loadUserSpots(data.Spots))
    }
}

export const retrieveSingleSpot = id => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`)
    // console.log(response)
    if(response.ok){
        const data = await response.json()
        // console.log('data',data)
        dispatch(loadSingleSpot(data))
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
    dispatch(createSpot(spotData))
    return spotData
}

export const updateSpot = (spotId, spotInfo) => async dispatch => {
        const { address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = spotInfo

    const response = await csrfFetch(`/api/spots/${spotId}`,{
    method:'PUT',
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

    if(response.ok){
        const data = await response.json()
        dispatch(retrieveSingleSpot(data.id))
        return data
    }
}

export const deleteSpot = id => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })

    if(response.ok){
        dispatch(removeSpot(id))
    }
}

const initialState = {spots: [], singleSpot: null, userSpots: []}
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
            // console.log('--------one spot', newObj)

            return newState
        }
        case RESET_SPOT:{
            newState = {...state}
            newState.singleSpot = null
            return newState
        }
        case CREATE_SPOT:{
            newState = {...state}
            newState.spots.push(action.spot)
            return newState
        }
        case CURRENT_USER_SPOTS:{
            newState = {...state}
            newState.userSpots = action.spots
            return newState
        }
        case DELETE_SPOT:{
            let obj = {}
            newState = {...state}
            newState.userSpots.forEach(spot => {
                obj[spot.id] = spot
            })

            delete obj[action.id]
            let arr = Object.values(obj)

            newState.userSpots = arr
            console.log(newState)
            return newState
        }
        default:
            return state
    }
}
import {csrfFetch} from './csrf'

const GET_ALL_SPOTS = 'spots/ALL_SPOTS'
const GET_ONE_SPOT = 'spots/SINGLE_SPOT'

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

const initialState = {spots: null}
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
        default:
            return state
    }
}
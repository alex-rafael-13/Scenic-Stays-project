import {csrfFetch} from './csrf'

const GET_ALL_SPOTS = 'spots/ALL_SPOTS'

//Regular action creators
const getAllSpots = (spots) => {
    return{
        type: GET_ALL_SPOTS,
        spots
    }
}

//Thunk action creators
export const retrieveAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots')

    if(response.ok){
        const data =  await response.json()
        dispatch(getAllSpots(data.Spots))
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
        default:
            return state
    }
}
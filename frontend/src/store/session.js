import { csrfFetch } from './csrf';

const LOGIN_USER = 'session/LOGIN'
const LOGOUT_USER = 'session/LOGOUT'

//normal action creators
const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        user
    }
}

const logoutUser = () => {
    return {
        type: LOGOUT_USER,
    }
}

//thunk action creators
export const login = (user) => async (dispatch) => {
    const {credential, password} = user
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });

    if(response.ok){
        const data = await response.json()
        dispatch(loginUser(data.user));
        return response
    }
}

//Session reducer
const initialState = {user: null}
function sessionReducer (state = initialState, action){
    let newState;
    switch(action.type){
        case LOGIN_USER:{
            newState = {...state}
            newState.user = action.user
            return newState
        }
        case LOGOUT_USER:{
            newState = {...state}
            newState.user = null
            return newState
        }
        default:
            return state
    }
} 

export default sessionReducer
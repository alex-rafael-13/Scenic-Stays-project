import { csrfFetch } from "./csrf"

const USER_BOOKINGS = 'bookings/USER'

const setUserBookings = (bookings) => {
    return {
        type: USER_BOOKINGS,
        bookings
    }
}

export const userBookings = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/current')

    if(response.ok){
        const data = await response.json()
        dispatch(setUserBookings(data.Bookings))
    }
}



export const createBooking = (booking, spotId) => async dispatch => {
    const {startDate, endDate} = booking

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`,{
        method: 'POST',
        body: JSON.stringify({
            startDate,
            endDate
        })
    })

    if(response.ok){
        const bookingData = await response.json()
        return bookingData
    }
}

export const deleteBooking = (bookingId) => async dispatch => {

    const response = await csrfFetch(`/api/bookings/${bookingId}`,{
        method: 'DELETE'
    })

    if(response.ok){
        dispatch(userBookings())
    }

    return response
}

const initialState = {spotBookings: [], booking: null, userBookings:[]}
export default function bookingsReducer(state = initialState, action){
    let newState;
    switch(action.type){
        case USER_BOOKINGS:{
            newState = {...state}
            newState.userBookings = action.bookings
            return newState
        }
        default:
            return state
    }
}
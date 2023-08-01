import { useDispatch } from "react-redux"
import { csrfFetch } from "./csrf"


// export const createBooking = (booking, spotId) => async dispatch => {
//     const {startDate,
//         endDate
//     } = booking

//     console.log(startDate)
// }

export const createBooking = (booking, spotId) => async dispatch => {
    const {startDate, endDate} = booking

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`,{
        method: 'POST',
        body: JSON.stringify({
            startDate,
            endDate
        })
    })

    return response

}



const initialState = {spotBookings: [], booking: null, userBookings:[]}
export default function bookingsReducer(state = initialState, action){
    let newState;
    switch(action.type){
        default:
            return state
    }
}
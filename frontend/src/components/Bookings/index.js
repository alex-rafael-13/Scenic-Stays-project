import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userBookings } from "../../store/bookings"
import BookingCard from "./booking-card"
import './bookings.css'
import { useHistory } from "react-router-dom"


export default function Bookings(){
    const bookings = useSelector(state => state.bookings.userBookings)
    const dispatch = useDispatch()
    const history = useHistory()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(userBookings())
            .then(() => setLoaded(true))
    }, [dispatch])

    return(
    <div className="bookings-page">
        {loaded &&
            <>
                <h1>Your Upcoming Bookings</h1>
                {bookings.length ? (
                    <div className="bookings-list">
                        {bookings.map(booking => (
                            <BookingCard key={booking.id} booking={booking}/>
                        ))}
                    </div>
                ) :(
                    <>
                        <div>No Upcoming Bookings</div>
                        <button className="create-button" onClick={() => history.push('/')}>Back Home</button>
                    </>
                )}
            </>
        }
    </div>)
}
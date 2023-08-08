import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userBookings } from "../../store/bookings"
import BookingCard from "./booking-card"
import './bookings.css'


export default function Bookings(){
    const bookings = useSelector(state => state.bookings.userBookings)
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(userBookings())
            .then(() => setLoaded(true))
    }, [dispatch])

    return(
    <div className="bookings-page">
        <h1>Your Bookings</h1>
        {loaded &&
            <>
            {bookings.length ? (
                <div className="bookings-list">
                    {bookings.map(booking => (
                        <BookingCard key={booking.id} booking={booking}/>
                    ))}
                </div>
            ) :(
                <div>No Bookings</div>
            )}
            </>
        }
    </div>)
}
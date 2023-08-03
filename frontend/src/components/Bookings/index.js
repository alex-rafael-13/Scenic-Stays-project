import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userBookings } from "../../store/bookings"


export default function Bookings(){
    const booking = useSelector(state => state.bookings.userBookings)
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(userBookings())
            .then(() => setLoaded(true))
    }, [dispatch])

    return(
    <>
        {loaded &&
            <div>testing</div>
        }
    </>)
}
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteBooking } from "../../store/bookings"

//Helper function for date format
const formatDate = date => {

    //Create new date
    const unformatted = new Date(date)

    const month = unformatted.toLocaleString('default', {month: 'long'})
    const day = unformatted.getDate()
    const year = unformatted.getFullYear()

    //Format date
    const formattedDate = `${month} ${day}, ${year}`

    return formattedDate
}


export default function BookingCard({booking}){
    const dispatch = useDispatch()
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')  
    const history = useHistory()  
    const spotId = booking.Spot.id
    const imgUrl = booking.Spot.previewImage

    //Set formatted dates
    useEffect(() => {
        setStart(formatDate(booking.startDate))
        setEnd(formatDate(booking.endDate))
    }, [dispatch])

    const handleClick = () => {
        history.push(`/spots/${spotId}`)
    }

    const handleCancel = () => {
        dispatch(deleteBooking(booking.id))
    }


    return(
        <div className="booking-card">
            <img className='preview-img' src={imgUrl} onClick={handleClick}/>
            {/* <div className="img-cont">
            </div> */}
            <div className="booking-info" onClick={handleClick}>
                <div className="spot-info">
                    <div className="booking-name">{booking.Spot.name}</div>
                    <div>{booking.Spot.city}, {booking.Spot.state}, {booking.Spot.country}</div>
                </div>
                <div className="booking-dates">
                    <div>Check in: {start}</div>
                    <div>Check out: {end}</div>
                </div>
            </div>
            <div className="cancel-booking">
                <div onClick={handleCancel}>
                    Cancel
                </div>
            </div>
        </div>
    )
}
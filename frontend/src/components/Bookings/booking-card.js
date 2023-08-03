

export default function BookingCard({booking}){

    const imgUrl = booking.Spot.previewImage
    return(
        <div className="booking-card">
            <div className="img-cont">
                <img src={imgUrl} />
            </div>
            <div className="booking-info">
                <div>{booking.Spot.name}</div>
                <div>Check in: {booking.startDate}</div>
                <div>Check out: {booking.endDate}</div>
            </div>
            <div>
                Cancel
            </div>
        </div>
    )
}
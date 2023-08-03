

export default function BookingCard({booking}){

    const imgUrl = booking.Spot.previewImage
    return(
        <div className="booking-card">
            <img className='preview-img' src={imgUrl} />
            {/* <div className="img-cont">
            </div> */}
            <div className="booking-info">
                <div className="spot-info">
                    <div className="booking-name">{booking.Spot.name}</div>
                    <div>{booking.Spot.city}, {booking.Spot.state}, {booking.Spot.country}</div>
                </div>
                <div className="booking-dates">
                    <div>Check in: {booking.startDate}</div>
                    <div>Check out: {booking.endDate}</div>
                </div>
            </div>
            <div className="cancel-booking">
                <div>
                    Cancel
                </div>
            </div>
        </div>
    )
}
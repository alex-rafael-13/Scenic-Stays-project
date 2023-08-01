import { useState } from "react";
import { createBooking } from "../../store/bookings";
import { useDispatch } from "react-redux";

function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}

//Getting default dates
const day = new Date()
const fiveDays = new Date(day.getTime() + 432000000)
const today = formatDateToYYYYMMDD(day)
const secondDate =  formatDateToYYYYMMDD(fiveDays)
/* -------------------------------------------------------- */

export default function CreateBooking({spot}){
    const [startDate, setStartDate] = useState(today)
    const [endDate, setEndDate] = useState(secondDate)
    const dispatch = useDispatch()


    const handleSubmit = e => {
        e.preventDefault()
        const booking = {
            startDate,
            endDate
        }

        dispatch(createBooking(booking, spot.id))
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="date-picks">
                <div className="date">
                    <label>
                        Start Date
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        /> 
                    </label> 
                </div>
                <div className="date">
                    <label>
                        End Date
                        <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div className="lower-box">
                <button type="submit">Reserve</button>
            </div>
        </form>
        </>
    )
}
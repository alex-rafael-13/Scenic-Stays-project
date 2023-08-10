import { useState } from "react";
import { createBooking } from "../../store/bookings";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './createBooking.css'

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
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
        const booking = {
            startDate,
            endDate
        }

        return dispatch(createBooking(booking, spot.id))
            .then(() => {
                history.push('/bookings/current')
            }    
            )
            .catch(async res => {
                const data = await res.json()
                if(data && data.errors) setErrors(data.errors)
            })
    }       

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="date-picks">
                {errors?.format && 
                    <div className='error-message'>{errors.format}</div>
                }
                <div className="date">
                    <label>
                        <div className='title-error'>
                            <div>Start Date:</div>
                            {errors?.startDate &&
                                <div className='error-message' >{errors.startDate}</div>
                            }
                        </div>
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        /> 
                    </label> 
                </div>
                <div className="date">
                    <label>
                    <div className='title-error'>
                            <div>End Date:</div>
                            {errors?.endDate &&
                                <div className='error-message' >{errors.endDate}</div>
                            }
                        </div>
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        /> 
                        {/* End Date
                        {errors?.endDate && 
                            <div>{errors.endDate}</div>
                        }
                        <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        /> */}
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
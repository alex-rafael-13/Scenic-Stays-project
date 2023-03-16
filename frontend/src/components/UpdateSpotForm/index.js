import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewSpot, retrieveSingleSpot } from "../../store/spots"
import {Redirect, useHistory, useParams} from 'react-router-dom'
import UpdateSpotForm from "./UpdateSpotForm"

export default function UpdateSpot({}){
    const {spotId} = useParams()
    const dispatch = useDispatch()
    const [data, setData] = useState({})
    const targetSpot = useSelector(state => state.spots.singleSpot)
    
    useEffect(() => {
        dispatch(retrieveSingleSpot(spotId))
    }, [dispatch])

    if(typeof targetSpot === 'object'){
        return(
         <UpdateSpotForm spot={targetSpot} spotId={spotId}/>
        )
    }

}




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spots'
import SpotCard from "../SpotCard/SpotCard";
import './SpotList.css'

export default function SpotList(){
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.spots)

    useEffect(() => {
        dispatch(spotActions.retrieveAllSpots())
    }, [dispatch])
    
    console.log(spots)


    return(
        <div className="spotList">
            {spots?.map(spot => (
                <SpotCard spot={spot}/>
            ))}
        </ div>
    )
}
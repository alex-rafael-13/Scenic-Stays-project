import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from '../../store/spots'
import SpotCard from "../SpotCard/SpotCard";
import {NavLink} from 'react-router-dom'
import './SpotList.css'
import { Switch, Route } from "react-router-dom";
import SingleSpot from "../SingleSpot/index";

export default function SpotList(){
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.spots)
    const [spotsErr, setSpotsErr] = useState({})
    
    // useEffect(() => {
    //     dispatch(spotActions.resetSpot())
    // }, [])

    useEffect(() => {
        dispatch(spotActions.retrieveAllSpots())
            .catch(
                async res => {
                    const data = await res.json()
                    if(data && data.statusCode >= 400 ){
                        setSpotsErr(data)
                    }
                }                              
            )
        dispatch(spotActions.resetSpot())
    }, [dispatch])

    // if(!spots || spots.length === 0){
    //     return(
    //         <h1></h1>
    //     )
    // }
    
    return( 
        <>
        {spotsErr.statusCode >= 400 && <h1>Unable to retrieve spots. Please try again shortly</h1>}
        {spots &&
            <div className="spot-list">
                {spots?.map(spot => (
                    <SpotCard key={spot.id} spot={spot}/>
                    ))}
            </ div>
        }
        </>
    )    
}
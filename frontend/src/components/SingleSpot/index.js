import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { restoreUser } from "../../store/session"
import { retrieveSingleSpot } from "../../store/spots"
import { retrieveSpotReviews } from "../../store/reviews"
import './SingleSpot.css'
import SpotReviews from "./SpotReviews"

export default function SingleSpot(){
    const {spotId} = useParams()
    const dispatch = useDispatch()
    let spot = useSelector(state => state.spots.singleSpot)
    let spotData = useSelector(state => state.spots.singleSpot)
    // const [spot, setSpot] = useState({})
    const user = useSelector(state => state.session.user)

    // useEffect(() => {
    //     setSpot(spotData)
    // }, [spotData])


    useEffect(() => {
        dispatch(retrieveSingleSpot(spotId))
            .catch(
                async res => {
                    const data = await res.json
                    if(data && !data.ok){
                        // console.log('in here')
                        return (
                            <h1>Unable to Retrieve Details. Please Try Again Later</h1>
                        )
                    }
                }                              
            )
    }, [dispatch])
    
    useEffect(() => {
        dispatch(restoreUser())
    },[dispatch])

    // console.log('user ------- ',user)

    const handleClick = () => {
        alert('FEATURE COMING SOON...')
    }

    if(!spot){
        return (
            <h1></h1>
        )
    }

    // if(Object.values(spot).length === 0){
    //     return (
    //         <h1></h1>
    //     )
    // }

    let preview;
    let spotImages = []
    let images = spot?.SpotImages
    // console.log('----------spot', spot)
    
    for(let image of images){
        if(image.preview === true){
            preview = image
        } else {
            spotImages.push(image)
        }
    }
    

    const reviewCount = (reviewNum) => {
        if(reviewNum === 0){
            return(<>New!</>)
        }
        else if(reviewNum === 1){
            return (<>
            {parseFloat(spot?.avgStarRating).toFixed(1)} 
            <i className="fa-solid fa-circle"></i> 
            {reviewNum} Review</>)
        }
        else{
            return (<>
            {parseFloat(spot?.avgStarRating).toFixed(1)} 
            <i className="fa-solid fa-circle"></i> 
            {reviewNum} Reviews</>)
        }
    }



    return(
        <div className="spot-page">

            <div className="spot-header">
                <div className="spot-name">
                    {spot?.name}
                </div>
                <div className="spot-location">
                    {spot?.city}, {spot?.state}, {spot?.country}
                </div>
            </div>

            <div className="spot-images">
                <img className="single-image" src={preview?.url} alt='house image'/>
                <div className="image-group">
                        {spotImages?.map(image => (
                            <img key={image?.id}className='little-image'src={image?.url} />
                        ))}
                </div>
            </div>

            <div className="information-section">
                <div className="spot-info">
                    <div className="spot-host">
                        Hosted by {spot?.Owner.firstName} {spot?.Owner.lastName} 
                    </div>
                    <p className="spot-description">
                        {spot?.description}
                    </p>
                </div>
                <div className="spot-reservation">
                    <div className="reservation-box">
                        <div className="upper-box">
                            <nav className="price">${parseFloat(spot?.price).toFixed(2)} a Night</nav>
                            <nav className="review-info">
                                <i className="fa-solid fa-star"></i>
                                {reviewCount(spot?.numReviews)}
                            </nav>
                        </div>
                        <div className="lower-box">
                            <button onClick={handleClick}>Reserve</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="review-section">
                <SpotReviews id={spotId} spot={spot} user={user}/>
            </div>

        </div>
    )
}
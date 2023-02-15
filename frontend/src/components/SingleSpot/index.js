import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { retrieveSingleSpot } from "../../store/spots"
import './SingleSpot.css'

export default function SingleSpot(){
    const {spotId} = useParams()
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots.singleSpot)

    //demo
    let demoImages = []
    for(let i = 0; i < 5; i++){
        demoImages.push('https://loveincorporated.blob.core.windows.net/contentimages/gallery/2389c1f4-1775-4a42-a0b5-126d3c7d6aa6-high-altitude-homes-for-sale-evergreen-co.jpg')
    }

    let previewImg = demoImages[0]
    let newImgArr = demoImages.slice(1)
    console.log(newImgArr)

    useEffect(() => {
        dispatch(retrieveSingleSpot(spotId))
    }, [dispatch])

    const handleClick = () => {
        alert('FEATURE COMING SOON...')
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
                <img className="single-image" src={previewImg} alt='house image'/>
                <div className="image-group">
                        {newImgArr.map(image => (
                            <img className='little-image'src={image} />
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
                            <nav className="price">${spot?.price} a Night</nav>
                            <nav className="review-info">
                                <i className="fa-solid fa-star"></i>
                                {spot?.avgStarRating} 
                                <i class="fa-solid fa-circle"></i> 
                                {spot?.numReviews} {spot?.numReviews === 1 ?
                                ('Review'): ('Reviews')}
                            </nav>
                        </div>
                        <div className="lower-box">
                            <button onClick={handleClick}>Reserve</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
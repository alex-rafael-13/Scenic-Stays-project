import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewSpot } from "../../store/spots"
import {Redirect, useHistory} from 'react-router-dom'
import './CreateSpot.css'

export default function CreateSpot(){
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    // const [lat, setLat] = useState(0)
    // const [lng, setLong] = useState(0)
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [imageArr, setImageArr] = useState([])
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()
    const spots = useSelector(state => state.spots.spots)

    //HANDLE SUBMIT FORM 
    const handleSubmit = async e =>{
        e.preventDefault()
        let submitErrors = {}
        //CHECKING FOR ERRORS
        
        if(!country.length){
            submitErrors.country = 'Country Required' 
        }
        if(!address.length){
            submitErrors.address = 'Address is required'
        }
        if(!city.length){
            submitErrors.city = 'City is required'
        }
        if(!state.length){
            submitErrors.state = 'State is required'
        }
        if(!name.length){
            submitErrors.name = 'Name is required'
        }
        for(let spot of spots){
            // console.log(spot)
            if(name.length > 0 && name === spot.name){
                submitErrors.name = 'Name must be unique'
            }
        }
        // if(!lat.length || Number.isNaN(lat) || lat >= 90 || lat <= -90){
        //     submitErrors.lat = 'Latitude not valid'
        // }
        // if(!lng.length || Number.isNaN(lng) || lat >= 180 || lat <= -180){
        //     submitErrors.lng = 'Longitude not valid'
        // }
        if(description.length < 30){
            submitErrors.description = 'Description needs at least 30 characters '
        }
        if(!price.length || isNaN(price)){
            submitErrors.price = 'Invalid price'
        }
        if(!previewImage.length){
            submitErrors.previewImage = 'Preview image is required'
        }

        let images = []
        if(previewImage.length){
            if(previewImage.endsWith('.png') || previewImage.endsWith('.jpg') || previewImage.endsWith('.jpeg')){
                let previewImg = {
                    url: previewImage,
                    preview: true
                }
                images.push(previewImg)
            }else{
                submitErrors.previewImage = 'Preview image must end in .png, .jpg, or .jpeg'
            }
        }
        if(image1.length){
            if(image1.endsWith('.png') || image1.endsWith('.jpeg') || image1.endsWith('.jpg')){
                let image = {
                    url: image1,
                    preview: false
                }
                images.push(image)
            }else{
                submitErrors.image1 = 'Image URL must end in .png, .jpg, or .jpeg'
            }
        }
        if(image2.length){
            if(image2.endsWith('.png') || image2.endsWith('.jpeg') || image2.endsWith('.jpg')){
                let image = {
                    url: image2,
                    preview: false
                }
                images.push(image)
            }else{
                submitErrors.image2 = 'Image URL must end in .png, .jpg, or .jpeg'
            }
        }
        if(image3.length){
            if(image3.endsWith('.png') || image3.endsWith('.jpeg') || image3.endsWith('.jpg')){
                let image = {
                    url: image3,
                    preview: false
                }
                images.push(image)
            }else{
                submitErrors.image3 = 'Image URL must end in .png, .jpg, or .jpeg'
            }
        }
        if(image4.length){
            if(image4.endsWith('.png') || image4.endsWith('.jpeg') || image4.endsWith('.jpg')){
                let image = {
                    url: image4,
                    preview: false
                }
                images.push(image)
            }else{
                submitErrors.image4 = 'Image URL must end in .png, .jpg, or .jpeg'
            }
        }
        setImageArr(images)

        if(Object.values(submitErrors).length === 0){
            let spotInfo = { address,
                city,
                state,
                country,
                lat: 0,
                lng: 0,
                name,
                description,
                price,
                images
            }
    
            let newSpot = await dispatch(createNewSpot(spotInfo))
            // console.log('----------------------Back to spots:',newSpot)
            if(newSpot){
                history.push(`/spots/${newSpot.id}`)
            }
        }

        setErrors(submitErrors)
    }

    //CLASS NAMES TO AVOID MISTYPES
    const filloutSections = 'fillout-sections'
    const sectionDetails = 'section-details'
    const detailsTitle = 'details-title'
    const labelTitle = 'label-title'
    const errClassName = 'create-spot-errors'

    return(
        <div className="create-spot-page">

            <div className="create-page-title">
                Create a New Spot
            </div>

            <form onSubmit={handleSubmit}>
                <div className={sectionDetails}>
                    <div className={detailsTitle}>Where is your place located</div>
                    <div>Guests will only get your exact address once they booked a reservation</div>
                </div>
                <label className={filloutSections}>
                    <div className={labelTitle}>
                        <div>Country</div>
                        {errors.country &&
                            <div className={errClassName}>{errors.country}</div>
                        }
                    </div>
                    <input 
                    type='text'
                    placeholder="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    />
                </label>
                
                <label className={filloutSections}>
                    <div className={labelTitle}>
                        <div>Street Address</div>
                        {errors.address &&
                            <div className={errClassName}>{errors.address}</div>
                        }
                    </div>
                    <input
                    type='text'
                    placeholder="Address"
                    onChange={e => setAddress(e.target.value)}
                    value={address}
                    />
                </label>
                <div className="city-state-fillout">
                    <div className="city-fillout">
                    <label className={filloutSections}>
                        <div className={labelTitle}>
                            <div>City</div>
                            {errors.city &&
                                <div className={errClassName}>{errors.city}</div>
                            }
                        </div>
                        <input
                            type='text'
                            placeholder="City"
                            onChange={e => setCity(e.target.value)}
                            value={city}
                        />
                    </label>
                    </div> ,
                    <div className="state-fillout">    
                        <label className={filloutSections}>
                            <div className={labelTitle}>
                                <div>State</div>
                                {errors.state &&
                                    <div className={errClassName}>{errors.state}</div>
                                }
                            </div>
                            <input
                                type='text'
                                placeholder="STATE"
                                onChange={e => setState(e.target.value)}
                                value={state}
                            />
                        </label>
                    </div>
                </div>
                {/* <div className="lat-long-fillout"> 
                    <label className={filloutSections}>
                        <div className={labelTitle}>
                            <div>Latitude</div>
                            {errors.lat &&
                                <div className={errClassName}>{errors.lat}</div>
                            }
                        </div> 
                        <input
                            type='text'
                            placeholder="Latitude"
                            onChange={e => setLat(e.target.value)}
                            value={lat}
                        />
                    </label>
                    <label className={filloutSections}>
                        <div className={labelTitle}>
                            <div>Longitude</div>
                            {errors.lng &&
                                <div className={errClassName}>{errors.lng}</div>
                            }
                        </div>
                        <input
                            type='text'
                            placeholder="Longitude"
                            onChange={e => setLong(e.target.value)}
                            value={lng}
                        />
                    </label>
                </div> */}

                <hr/>

                <div className={sectionDetails}>
                    <div className={detailsTitle}>Describe your place to guest</div>
                    <div>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about your neighborhood</div>
                </div>
                <label className={filloutSections}>
                    <textarea
                        className="description-box"
                        type='text'
                        placeholder="Please write at least 30 characters"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        cols='5'
                        rows='10'
                    />
                    {errors.description &&
                        <div className={errClassName}>{errors.description}</div>
                    }
                </label>

                <hr />

                <div className={sectionDetails}>
                    <div className={detailsTitle}>Create a title for your spot</div>
                    <div>
                        Catch guests' attention with a spot title that highlights what makes your place special
                    </div>
                </div>
                <label className={filloutSections}>
                    <input
                        type='text'
                        placeholder="Name of your spot"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    {errors.name &&
                        <div className={errClassName}>{errors.name}</div>
                    }
                </label>

                <hr />

                <div className={sectionDetails}>
                    <div className={detailsTitle}>Set a base price for your spot</div>
                    <div>
                        Competitive pricing can help your listing stand out and rank higher in search results
                    </div>
                </div>
                <label className={filloutSections}>
                    <div className="price-fillout">
                        $
                        <input className="price-input"
                            type='text'
                            placeholder="Price per night (USD)"
                            onChange={e => setPrice(e.target.value)}
                            value={price}
                        />
                    </div>
                    {errors.price &&
                        <div className={errClassName}>{errors.price}</div>
                    }
                </label>

                <hr/>

                <div className={sectionDetails}>
                    <div className={detailsTitle}>Liven up your spot with photos</div>
                    <div>
                        Submit a link to at least one photo to publish your spot
                    </div>
                </div>
                <label className={filloutSections}>
                    <div className='photo-inputs'>
                        <input
                            type='text'
                            placeholder="Preview image URL"
                            onChange={e => setPreviewImage(e.target.value)}
                            value={previewImage}
                        />
                        {errors.previewImage &&
                            <div className={errClassName}>{errors.previewImage}</div>
                        }
                        <input 
                            type='text'
                            placeholder="Image URL"
                            onChange={e => setImage1(e.target.value)}
                            value={image1}
                        />
                        {errors.image1 &&
                            <div className={errClassName}>{errors.image1}</div>
                        }
                        <input 
                            type='text'
                            placeholder="Image URL"
                            onChange={e => setImage2(e.target.value)}
                            value={image2}
                        />
                        {errors.image2 &&
                            <div className={errClassName}>{errors.image2}</div>
                        }
                        <input 
                            type='text'
                            placeholder="Image URL"
                            onChange={e => setImage3(e.target.value)}
                            value={image3}
                        />
                        {errors.image3 &&
                            <div className={errClassName}>{errors.image3}</div>
                        }
                        <input 
                            type='text'
                            placeholder="Image URL"
                            onChange={e => setImage4(e.target.value)}
                            value={image4}
                        />
                        {errors.image4 &&
                            <div className={errClassName}>{errors.image4}</div>
                        }
                    </div>
                   
                </label>

                <hr/>

                <div className='create-spot-button-holder'>
                    <button type="submit">Create Spot</button>
                </div>

            </form>
        </div>

    )
}
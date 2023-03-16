import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNewSpot, retrieveSingleSpot, updateSpot } from "../../store/spots"
import {Redirect, useHistory, useParams} from 'react-router-dom'

export default function UpdateSpotForm({spot, spotId}){
    console.log(spot)
    const history = useHistory()
    const dispatch = useDispatch()
    const [country, setCountry] = useState(spot?.country)
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    // const [lat, setLat] = useState(0)
    // const [lng, setLong] = useState(0)
    const [description, setDescription] = useState(spot?.description)
    const [name, setName] = useState(spot?.name)
    const [price, setPrice] = useState(spot?.price)
    const [errors, setErrors] = useState({})

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
        // if(!lat.length || Number.isNaN(lat) || lat >= 90 || lat <= -90){
        //     submitErrors.lat = 'Latitude not valid'
        // }
        // if(!lng.length || Number.isNaN(lng) || lat >= 180 || lat <= -180){
        //     submitErrors.lng = 'Longitude not valid'
        // }
        if(description.length < 30){
            submitErrors.description = 'Description needs at least 30 characters '
        }
        if(!price.length || Number.isNaN(price)){
            submitErrors.price = 'Invalid price'
        }
        
        if(Object.values(submitErrors).length === 0){
            let spotInfo = { address,
                city,
                state,
                country,
                lat: 0,
                lng: 0,
                name,
                description,
                price
            }
    
            let updatedSpot = await dispatch(updateSpot(spotId, spotInfo))
            if(updatedSpot){
                history.push(`/spots/${updatedSpot.id}`)
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
                Update Spot
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
                    // defaultValue={spot?.country}
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

                {/* <div className={sectionDetails}>
                    <div className={detailsTitle}>Liven up your spot with photos</div>
                    <div>
                        Submit a link to at least one photo to publish your spot
                    </div>
                </div> */}

                {/* <label className={filloutSections}>
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
                   
                </label> */}

                <hr/>

                <div className='create-spot-button-holder'>
                    <button type="submit">Edit Spot</button>
                </div>

            </form>
        </div>
    )
}
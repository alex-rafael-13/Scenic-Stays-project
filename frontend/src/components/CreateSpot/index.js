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
    const [previewImage, setPreviewImage] = useState(null)
    const [images, setImages] = useState(null)
    // const [image2, setImage2] = useState('')
    // const [image3, setImage3] = useState('')
    // const [image4, setImage4] = useState('')
    const [otherImages, setOtherImages] = useState([])
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()
    const spots = useSelector(state => state.spots.spots)

    const handleSubmit = async e =>{
        e.preventDefault()

        //Image array setup
        let allImages = []
        if(previewImage !== null) allImages.push(previewImage)


        let spotInfo = { address,
            city,
            state,
            country,
            lat: 0,
            lng: 0,
            name,
            description,
            price,
            previewImage,
            otherImages
        }
        
        return dispatch(createNewSpot(spotInfo))
            .then()
            .catch(
                async res => {
                    const data = await res.json()
                    console.log(data.errors)
                    if(data && data.errors) setErrors(data.errors)
                }
            )
    }

    const updatePreview = e => {
        console.log(e.target.files)
        const file = e.target.files[0];
        if (file) setPreviewImage(file);
    };

    const updateImages = e => {
        console.log(e.target.files)
        const files = e.target.files;
        if (files) setOtherImages(files);
    };

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

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className={sectionDetails}>
                    <div className={detailsTitle}>Where is your place located</div>
                    <div>Guests will only get your exact address once they booked a reservation</div>
                </div>
                <label className={filloutSections}>
                    <div className={labelTitle}>
                        <div>Country</div>
                        {errors?.country &&
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
                        {errors?.address &&
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
                            {errors?.city &&
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
                                {errors?.state &&
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

                {/*Will implement once google maps api is added*/}
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
                    {errors?.description &&
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
                    {errors?.name &&
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
                    {errors?.price &&
                        <div className={errClassName}>{errors.price}</div>
                    }
                </label>

                <hr/>

                <div className={sectionDetails}>
                    <div className={detailsTitle}>Add a preview image</div>
                    <div>
                        Upload an preview image to show off your place  
                    </div>
                </div>
                <label className={filloutSections}>
                    <div className='photo-inputs'>
                        <input
                            type='file'
                            accept="image/*"
                            onChange={updatePreview}
                        />
                        {errors?.images &&
                            <div className={errClassName}>{errors.images}</div>
                        }
                        
                    </div>
                </label>
                <hr />
                { previewImage &&
                <>
                    <div className={sectionDetails}>
                        <div className={detailsTitle}>More images?</div>
                        <div>
                            Got more to show? You can import up to 4 more images here!  
                        </div>
                    </div>
                    <label className={filloutSections}>
                        <div className='photo-inputs'>
                            <input
                                type='file'
                                onChange={updateImages}
                                accept="image/*"
                                multiple
                            />
                            {errors?.images &&
                                <div className={errClassName}>{errors.images}</div>
                            }
                            {}
                            
                        </div>
                    </label>
                    <hr/>
                </>
                }

                <div className='create-spot-button-holder'>
                    <button type="submit">Create Spot</button>
                </div>

            </form>
        </div>

    )
}
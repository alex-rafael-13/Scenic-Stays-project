//Init express router
const express = require('express');
const router = express.Router();

//Import middleware from utils folder and Validation library
const { restoreUser ,requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check, withMessage } = require('express-validator');

//Import models needed
const { Spot, Review, SpotImage, User } = require('../../db/models');

//Create validation middleware for creating and editing spots
const validateSpot = [
    check('address', 'Street address is required')
        .notEmpty()
        .bail()
        .isString(),
    check('city', 'City is required')
        .notEmpty()
        .bail()
        .isString(),
    check('state', 'State is required')
        .notEmpty()
        .bail()
        .isString(),
    check('country', 'Country is required')
        .notEmpty()
        .bail()
        .isString(),
    check('lat', 'Latitude is not valid')
        .isDecimal()
        .bail()
        .custom(value => {return (value <= 90 && value >= -90)}),
    check('lng','Longitude is not valid')
        .isDecimal()
        .bail()
        .custom(value => {return (value <= 180 && value >= -180)}),
    check('name', 'Name must be less than 50 characters')
        .isString() 
        .bail()
        .notEmpty()
        .bail()
        .isLength({max: 50}),
    check('description', 'Description is required')
        .notEmpty()
        .bail()
        .isString(),
    check('price', 'Price per day is required')
        .notEmpty()
        .bail()
        .isDecimal()
    ,handleValidationErrors
]

/* Get all spots, it does not need authentication
    - GET /api/spots
    - Does not require body
    - Include avgRating and and one previewImage
*/
router.get('/', async (req, res) => {
    //get all spots from db as POJOS
    const spots = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage }
        ]
    });

    //Create a spots list array
    let spotsList = []
    //Iterate through spots to make it into a POJO using .toJSON()
    for(let spot of spots){
        spotsList.push(spot.toJSON())
    }

    // console.log(spotsList)
    //iterate through each spot to find avgRating
    for(let spot of spotsList){
        //If no reviews, avgRating will be set to 0
        let avgRating = 0
        let totalStars = await Review.sum('stars', {where:{
            spotId: spot.id
        }})
        let totalReviews = await Review.count({
            where:{
                spotId: spot.id
            }
        })
        //If spot has stars & reviews, find avgRating 
        if(totalStars && totalReviews){
            avgRating = parseFloat(totalStars / totalReviews).toFixed(1)
            avgRating = parseFloat(avgRating)
        } 
        //save avgRating to spot Object
        spot.avgRating = avgRating

        //remove Reviews
        delete spot.Reviews;
    }

    //iterate spotsList to find previewImages
    for(let spot of spotsList){
        //iterate through each image to see where preview === true
        spot.SpotImages.forEach(image => {
            if(image.preview === true){
                spot.previewImage = image.url
            }
        })
        //if no previewImage, set it to not found
        if(!spot.previewImage){
            spot.previewImage = "NOT FOUND"
        }

        //delete SpotImages
        delete spot.SpotImages
    }

    res.json({Spots: spotsList})
})


/* Get all spots owned by the current user
    - GET /api/spots
    - Does not require body
    - Include avgRating and and one previewImage
    - Auth required 
*/
router.get('/current', [restoreUser, requireAuth], async (req, res) => {

    //get user info
    const { user } = req
    const spots = await Spot.findAll({
        where:{
            ownerId: user.id
        },
        include: [
            { model: Review },
            { model: SpotImage }
        ]
    });

    //Create a spots list array
    let spotsList = []
    //Iterate through spots to make it into a POJO using .toJSON()
    for(let spot of spots){
        spotsList.push(spot.toJSON())
    }

    // console.log(spotsList)
    //iterate through each spot to find avgRating
    for(let spot of spotsList){
        //If no reviews, avgRating will be set to 0
        let avgRating = 0
        let totalStars = await Review.sum('stars', {where:{
            spotId: spot.id
        }})
        let totalReviews = await Review.count({
            where:{
                spotId: spot.id
            }
        })
        //If spot has stars & reviews, find avgRating 
        if(totalStars && totalReviews){
            avgRating = parseFloat(totalStars / totalReviews).toFixed(1)
            avgRating = parseFloat(avgRating)
        } 
        //save avgRating to spot Object
        spot.avgRating = avgRating

        //remove Reviews
        delete spot.Reviews;
    }

    //iterate spotsList to find previewImages
    for(let spot of spotsList){
        //iterate through each image to see where preview === true
        spot.SpotImages.forEach(image => {
            if(image.preview === true){
                spot.previewImage = image.url
            }
        })
        //if no previewImage, set it to not found
        if(!spot.previewImage){
            spot.previewImage = "NOT FOUND"
        }

        //delete SpotImages
        delete spot.SpotImages
    }

    res.json({Spots: spotsList})
});

/* Get all spots by id in req.params
    - GET /api/spots/:spotId
    - Does not require body
    - Include avgRating and and one previewImage
    - Include SpotImages
    - Auth not required
*/

router.get('/:spotId', async (req, res, next) => {
    //get id from parms
    const id = req.params.spotId

    const spots = await Spot.findByPk(id , {
        include: [
            { model: Review },
            { 
                model: SpotImage,
                attributes: ['id', 'url', 'preview'],
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']   
            }
        ]
    });

    if(!spots){
        let err = {
            message: "Spot couldn't be found",
            status: 404
        }
        next(err)
    }else{
        //Create a spots list array
        const spot = spots.toJSON()
        
        let avgRating = 0
        let totalStars = await Review.sum('stars', {where:{
            spotId: spot.id
        }})
        let totalReviews = await Review.count({
            where:{
                spotId: spot.id
            }
        })
        //If spot has stars & reviews, find avgRating 
        if(totalStars && totalReviews){
            avgRating = parseFloat(totalStars / totalReviews).toFixed(1)
            avgRating = parseFloat(avgRating)
        } 
        //save totalReviews attributes
        spot.numReviews = totalReviews

        //save avgRating to spot Object
        spot.avgStarRating = avgRating

        //remove Reviews
        delete spot.Reviews;
       
    
       
        
            //If no reviews, avgRating will be set to 0
        
    
        res.json(spot)
    }
});




/*Create a spot owned by the signed in user
    - POST /api/spots
    - restoreUser checks if a valid JWT cookie exists, 
        then requireAuth checks if user is logged in 
    - get user.id from req.user created by restoreUser
    - use validateSpot middleware to validate req.body
*/
router.post('/', [restoreUser, requireAuth, validateSpot], async (req, res, next) => {
    //extract user from req.user attr created by restoreUser
    const { user } = req
    //extract spot info from body
    const { address, city, state, country,
    lat, lng, name, description, price} = req.body
    
    const newSpot = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.json(newSpot)
});

/* Edit a spot using its id but only if the signed in user owns it
    - PUT /api/spots/:spotId
    - Make sure user is logged in 
    - Get user Id using restoreUser middleware
    - use validateSpot middleware to validate req.body
*/
router.put('/:spotId', [restoreUser, requireAuth, validateSpot], async (req, res, next) => {

    //extract necessary data
    const { user } = req
    const id = req.params.spotId
    const { address, city, state, country,
    lat, lng, name, description, price} = req.body

    const spot = await Spot.findByPk(id)

    //Check if spot exists
    if(!spot){  
        let err = {
            message: "Spot couldn't be found",
            status: 404
        }
        next(err)
    }
    //Check if userId equals ownerId to auth edit
    else if(spot.ownerId !== user.id){
        let err = {
            message: "Forbidden",
            status: 403
        }
        next(err)
    }
    //If both pass, update the spot
    else{
        await Spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price            
        }, {where: {id}});

        const editedSpot = await Spot.findByPk(id)
        res.json(editedSpot)
    }
});














module.exports = router

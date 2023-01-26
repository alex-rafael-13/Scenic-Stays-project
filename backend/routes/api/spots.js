//Init express router
const express = require('express');
const router = express.Router();

//Import middleware from utils folder and Validation library
const { restoreUser ,requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check, withMessage } = require('express-validator');

//Import models needed
const { User, Spot } = require('../../db/models');

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
            message: "Authentication required - Not the owner",
            status: 401
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
})














module.exports = router

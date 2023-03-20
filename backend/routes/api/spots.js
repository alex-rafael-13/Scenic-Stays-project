//Init express router
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize')

//Import middleware from utils folder and Validation library
const { restoreUser ,requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check, withMessage } = require('express-validator');

//Import models needed
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const { query } = require('express');

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
router.get('/', async (req, res, next) => {
    let errMessages = {}

    // Phase 2A: Use query params for page & size
    // Your code here
    let {page, size} = req.query

    const pagination = {}
    
    if(!page) page = 1
    if(!size) size = 20

    page = Number(page)
    size = Number(size)

    //Checking if page and size are numbers
    if(isNaN(page) || page <= 0){
        // throw new Error('Requires valid page and size params')
        errMessages.page = "Page must be greater than or equal to 1"
    }
    if(isNaN(size) || size <= 0){
        errMessages.size = "Size must be greater than or equal to 1"
    }
    if(page > 10) page = 10
    if(size > 20) size = 20

    if(page >= 1 && size >= 1){
        pagination.limit = size
        pagination.offset = size * (page - 1)
    }

    const where = {}

    if(req.query.minLat){
        if(req.query.minLat <= 90 && req.query.minLat >= -90){
            where.lat = {[Op.gt]: req.query.minLat}
        } else{
            errMessages.minLat = "Minimum latitude is invalid"
        }
    }

    if(req.query.maxLat){
        if(req.query.maxLat <= 90 && req.query.maxLat >= -90){
            where.lat = {[Op.lt]: req.query.maxLat}
        } else{
            errMessages.maxLat = "Maximum latitude is invalid"
        }
    }

    if(req.query.minLng){
        if(req.query.minLng <= 180 && req.query.minLng >= -180){
            where.lng = {[Op.gt]: req.query.minLng}
        } else{
            errMessages.minLng = "Minimum longitude is invalid"
        }
    }

    if(req.query.maxLng){
        if(req.query.maxLng <= 180 && req.query.maxLng >= -180){
            where.lng = {[Op.lt]: req.query.maxLng}
        } else{
            errMessages.maxLng = "Maximum longitude is invalid"
        }
    }
    if(req.query.minPrice){
        if(req.query.minPrice >= 0){
            where.price = {[Op.gt]: req.query.minPrice}
        } else{
            errMessages.minPrice = "Minimum price must be greater than or equal to 0"
        }
    }
    if(req.query.maxPrice){
        if(req.query.maxPrice >= 0){
            where.price = {[Op.lt]: req.query.maxPrice}
        } else{
            errMessages.maxPrice = "Maximum price must be greater than or equal to 0"
        }
    }



    //Check if any errors occur
    if(Object.keys(errMessages).length !== 0){
        const err = Error("Validation Error")
        err.status = 400
        err.errors = errMessages

        next(err)
    } else {
        //get all spots from db as POJOS
        const spots = await Spot.findAll({
            include: [
                { model: Review },
                { model: SpotImage }
            ],
            where,
            ...pagination
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
    
        res.json({Spots: spotsList, page: page, size: size})

    }
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

/* Delete a spot using its id but only if the signed in user owns it
    - DELETE /api/spots/:spotId
    - Make sure user is logged in 
    - Get user Id using restoreUser middleware
    - use validateSpot middleware to validate req.body
*/
router.delete('/:spotId', [restoreUser, requireAuth], async (req, res, next) => {
    //Get user and spotId data
    const { user } = req
    const id = req.params.spotId

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
    } else{
        //Delete spot
        await Spot.destroy({where:{id: spot.id}})

        //send message that it was deleted
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
})

//------------------------------- BOOKINGS -------------------------------//

/* GET all Bookings of a spot by spotId 
    - GET /:spotId/bookings
    - Require Auth
    - If not owner, see just booking info
    - If owner, see user that booked it plus createdAt and updatedAT
*/
router.get('/:spotId/bookings',[restoreUser, requireAuth], async (req, res, next) => {
    //get necessary data
    const { user } = req
    const id = req.params.spotId


    const bookings = await Booking.findAll({
        where:{
            spotId: id
        }
    })
    
    //find spot data
    const spot = await Spot.findByPk(id)  

    if(!spot){
        const err = {}
        err.message = "Spot couldn't be found"
        err.status = 404

        next(err)
    } else{
        //Turn into POJO
        let bookingsArr = []
        for(let booking of bookings){
            bookingsArr.push(booking.toJSON())
        }
        
        //check if user is owner of the spot
        for(let booking of bookingsArr){
            if(spot.ownerId === user.id){
                const user = await User.findByPk(booking.userId,{
                    attributes: ['id', 'firstName', 'lastName']
                })
                
                booking.User = user
            } else{
                delete booking.id
                delete booking.userId
                delete booking.createdAt
                delete booking.updatedAt
            }   
        }
        res.json({Bookings: bookingsArr})
    }
})

/* Create a Booking using the spot spotId 
    - POST /:spotId/bookings
    - Require Auth
    - If not owner, see just booking info
    - If owner, see user that booked it plus createdAt and updatedAT
*/
router.post('/:spotId/bookings', [restoreUser, requireAuth], async (req, res, next) => {
    //Get necessary data
    const { user } = req
    const {startDate, endDate} = req.body
    const spotId = req.params.spotId

    const spot = await Spot.findByPk(spotId)
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()

    //Check if spot exists
    if(!spot){
        const err = Error('Couldn\'t find a Spot with the specified id')
        err.message = "Spot couldn't be found",
        err.status = 404 

        next(err)
    } 
    //Check if spot is owned by user
    else if(spot.ownerId === user.id){
        const err = Error('User role error')
        err.message = "Forbidden"
        err.status = 403

        next(err)
    } 
    //Check if start date is after end date
    else if(start > end){
        const err = Error('Validation error')
        err.message = "endDate cannot be on or before startDate"
        err.status = 400

        next(err)
    } 
    else{
        //Get data
        const bookings = await Booking.findAll({
            where:{
                spotId: spotId
            }
        })
        // const renter = await User.findByPk(user.id)

        //Check if dates are available
        let errMessages = {}
        for(let booking of bookings){
            const startBooking = new Date(booking.startDate).getTime()
            const endBooking = new Date(booking.endDate).getTime()

            if(start >= startBooking && start <= endBooking ){
                errMessages.startDate = "Start date conflicts with an existing booking"
            } 
            if(end >= startBooking && end <= endBooking ){
                errMessages.endDate = "End date conflicts with an existing booking"

            }
            if(start < startBooking && end > endBooking){
                errMessages.startDate = "Start date conflicts with an existing booking"   
                errMessages.endDate = "End date conflicts with an existing booking"
            }
        }
        //Check if there is error messafes
        if(Object.keys(errMessages).length !== 0){
            const err = Error('Booking conflict')
            err.status = 403
            err.errors = errMessages

            next(err)
        } 
        //If not, create a booking
        else {

            const newBooking = await Booking.create({
                spotId: parseInt(spotId),
                userId: parseInt(user.id),
                startDate: startDate,
                endDate: endDate
            });

            res.json(newBooking)
        }
    }
})

/* GET reviews by spotId
    - NO Auth required
    - GET /api/spots/:spotId/review
*/
router.get('/:spotId/reviews', async(req,res, next) => {
    const spotId = req.params.spotId

    const spot = await Spot.findByPk(spotId)
    if(!spot){
        const err = Error('Couldn\'t find a Spot with the specified id')
        err.message = "Spot couldn't be found",
        err.status = 404 

        next(err)
    } else{
        const reviews = await Review.findAll({
            where:{
                spotId: spot.id
            },
            order:[['id', 'DESC']]
        });

        // console.log(reviews)

        //Turn reviews into POJO
        let reviewList = []
        for(let review of reviews){
            reviewList.push(review.toJSON())
        }

        for(let review of reviewList){
            const user = await User.findByPk(review.userId, {
                attributes: ['id', 'firstName', 'lastName']
            })
            const reviewImages = await ReviewImage.findAll({
                where:{
                    reviewId: review.id
                },
                attributes: ['id', 'url']
            })

            review.User = user
            review.reviewImages = reviewImages
        }

        res.json({Reviews:reviewList})
    }
})

const valReview = [
    check('review', 'Review text is required')
        .notEmpty()
        .bail()
        .isString(),
    check('stars', 'Stars must be an integer from 1 to 5')
        .isInt()
        .bail() 
        .custom(value => {return (value <= 5 && value >= 1)}),
    handleValidationErrors
]

/* Post a review using spotId
    - POST /api/spots/:spotId/reviews 
    - Auth required
*/
router.post('/:spotId/reviews', [restoreUser, requireAuth, valReview], async(req, res, next) => {
    const { user } = req
    const { review, stars } = req.body
    const spotId = req.params.spotId

    const spot = await Spot.findByPk(spotId)
    const checkReview = await Review.findOne({
        where: {
            spotId: spotId,
            userId: user.id
        }
    })

    //Check if spot exists
    if(!spot){
        const err = Error('Couldn\'t find a Spot with the specified id')
        err.message = "Spot couldn't be found",
        err.status = 404 

        next(err)
    } 
    //Check if user already has a review
    else if(checkReview){
        const err = Error('User already has a review for this spot')
        err.message = "User already has a review for this spot",
        err.status = 403

        next(err)
    } else{
        const newReview = await Review.create({
            userId: user.id,
            spotId: spot.id,
            review: review,
            stars: stars
        })

        res.json(newReview)
    }

})

const valImage = [
    check('url', 'URL needed')
        .notEmpty()
        .bail()
        .isString(),
    check('preview', 'Preview needs to be a boolean')
        .notEmpty()
        .bail()
        .isBoolean(),
    handleValidationErrors
]

/* Add image to spot using its id
    - Logged in user needs to be logged in
    - POST /:spotId/images
    - Auth required
*/
router.post('/:spotId/images', [restoreUser, requireAuth, valImage], async(req, res, next) => {
    const { user } = req
    const { url, preview } = req.body
    const spotId = req.params.spotId

    const spot = await Spot.findByPk(spotId)
    
    if(!spot){
        const err = Error('Couldn\'t find a Spot with the specified id')
        err.message = "Spot couldn't be found",
        err.status = 404 

        next(err)
    } else if(spot.ownerId !== user.id){
        const err = Error('Forbidden')
        err.message = "Forbidden",
        err.status = 403 

        next(err)
    } else {
        const image = await SpotImage.create({
            spotId: spotId,
            url: url,
            preview: preview
        })

        let newImage = image.toJSON()
        delete newImage.spotId
        delete newImage.createdAt
        delete newImage.updatedAt

        res.json(newImage)
    }


})





module.exports = router


